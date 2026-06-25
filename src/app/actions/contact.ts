'use server'

import { z } from 'zod'
import { createHash } from 'node:crypto'
import { headers } from 'next/headers'
import { createLead } from '@/lib/leads'
import { sendLeadEmail, sendLeadAutoreply } from '@/lib/email'
import { whatsappLink } from '@/data/business'

/**
 * Contact form Server Action (server-only).
 * Validates (Zod) → blocks spam (honeypot) → persists (Prisma) → notifies by
 * email (Resend/Nodemailer, env-gated) → returns a WhatsApp deep-link so the
 * lead can continue the conversation instantly. Persistence/email failures are
 * caught so the user always gets a successful, recoverable response.
 */
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80),
  email: z.string().trim().email('Enter a valid email address.'),
  subject: z.string().trim().min(2, 'Please add a subject.').max(120),
  message: z.string().trim().min(5, 'Please write a short message.').max(2000),
})

export type ContactState = {
  ok: boolean
  message?: string
  whatsappUrl?: string
  errors?: Partial<Record<'name' | 'email' | 'subject' | 'message', string>>
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real users never fill the hidden "company" field.
  if (formData.get('company')) {
    return { ok: true, message: 'Thank you! We will reach out shortly.' }
  }

  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    const errors: ContactState['errors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState['errors']>
      if (key && !errors[key]) errors[key] = issue.message
    }
    return { ok: false, errors }
  }

  const data = parsed.data

  // Request metadata for abuse triage (hash the IP — never store it raw).
  let ipHash: string | null = null
  let userAgent: string | null = null
  try {
    const h = await headers()
    userAgent = h.get('user-agent')
    const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip')
    if (ip) ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 32)
  } catch {
    /* headers unavailable — ignore */
  }

  // 1) Persist the lead (don't fail the user if the DB hiccups).
  let leadId: string | undefined
  try {
    const lead = await createLead({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      source: 'contact',
      ipHash,
      userAgent,
    })
    leadId = lead.id
  } catch (err) {
    console.error('[contact] failed to persist lead:', err)
  }

  // 2) Notify the studio + auto-reply to the enquirer (both env-gated; never throw).
  const lead = {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    leadId,
  }
  await Promise.all([sendLeadEmail(lead), sendLeadAutoreply(lead)])

  // 3) WhatsApp deep-link with a prefilled message for instant follow-up.
  const whatsappUrl = whatsappLink(
    `Hi RGL Decors, I'm ${data.name}. ${data.subject}: ${data.message}`,
  )

  return {
    ok: true,
    message: "Thank you! We've received your enquiry and will reach out shortly.",
    whatsappUrl,
  }
}
