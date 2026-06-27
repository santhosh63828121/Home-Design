'use server'

import { z } from 'zod'
import { createHash } from 'node:crypto'
import { headers } from 'next/headers'
import { createLead } from '@/lib/leads'
import { sendLeadEmail, sendLeadAutoreply } from '@/lib/email'
import { whatsappLink } from '@/data/business'

/**
 * Multi-step consultation form (doc §4.9). Same validated → persisted → emailed →
 * WhatsApp pipeline as the simple contact form, but with light project
 * qualification. The extra fields map onto the existing Lead columns (mobile →
 * phone, location → city, propertyType → homeType, budget) plus a structured
 * `message`, so no schema migration is needed. NEVER throws.
 */
const leadSchema = z.object({
  // Step 3 — contact
  name: z.string().trim().min(2, 'Please enter your name.').max(80),
  mobile: z.string().trim().min(8, 'Enter a valid mobile number.').max(20),
  email: z.string().trim().email('Enter a valid email address.'),
  // Step 1 — project
  projectType: z.string().trim().min(1, 'Select a project type.').max(60),
  propertyType: z.string().trim().max(80).optional(),
  location: z.string().trim().max(80).optional(),
  areaSqft: z.string().trim().max(20).optional(),
  // Step 2 — need
  scope: z.string().trim().min(3, 'Tell us a little about your requirement.').max(2000),
  budget: z.string().trim().max(40).optional(),
  requirementDate: z.string().trim().max(40).optional(),
  howHeard: z.string().trim().max(60).optional(),
})

type FieldErrors = Partial<Record<keyof z.infer<typeof leadSchema>, string>>

export type LeadState = {
  ok: boolean
  message?: string
  whatsappUrl?: string
  errors?: FieldErrors
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot — real users never fill the hidden "company" field.
  if (formData.get('company')) {
    return { ok: true, message: 'Thank you! We will reach out shortly.' }
  }

  const parsed = leadSchema.safeParse({
    name: formData.get('name'),
    mobile: formData.get('mobile'),
    email: formData.get('email'),
    projectType: formData.get('projectType'),
    propertyType: formData.get('propertyType') || undefined,
    location: formData.get('location') || undefined,
    areaSqft: formData.get('areaSqft') || undefined,
    scope: formData.get('scope'),
    budget: formData.get('budget') || undefined,
    requirementDate: formData.get('requirementDate') || undefined,
    howHeard: formData.get('howHeard') || undefined,
  })

  if (!parsed.success) {
    const errors: FieldErrors = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof FieldErrors
      if (key && !errors[key]) errors[key] = issue.message
    }
    return { ok: false, errors }
  }
  const d = parsed.data

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

  const subject = `${d.projectType} enquiry${d.location ? ` · ${d.location}` : ''}`
  const message = [
    `Project type: ${d.projectType}`,
    d.propertyType ? `Property: ${d.propertyType}` : null,
    d.location ? `Location: ${d.location}` : null,
    d.areaSqft ? `Area: ${d.areaSqft} sq.ft` : null,
    d.budget ? `Budget: ${d.budget}` : null,
    d.requirementDate ? `Timeline: ${d.requirementDate}` : null,
    d.howHeard ? `Heard via: ${d.howHeard}` : null,
    '',
    'Requirement:',
    d.scope,
  ]
    .filter((l) => l !== null)
    .join('\n')

  let leadId: string | undefined
  try {
    const lead = await createLead({
      name: d.name,
      email: d.email,
      phone: d.mobile,
      city: d.location ?? null,
      homeType: d.propertyType ?? null,
      budget: d.budget ?? null,
      subject,
      message,
      source: 'consultation',
      ipHash,
      userAgent,
    })
    leadId = lead.id
  } catch (err) {
    console.error('[lead] failed to persist consultation:', err)
  }

  // Notify the studio + auto-reply to the enquirer (both env-gated; never throw).
  const emailLead = { name: d.name, email: d.email, subject, message, phone: d.mobile, city: d.location, leadId }
  await Promise.all([sendLeadEmail(emailLead), sendLeadAutoreply(emailLead)])

  const whatsappUrl = whatsappLink(
    `Hi RGL Decors, I'm ${d.name}. I'm interested in my ${d.projectType} project${
      d.location ? ` in ${d.location}` : ''
    }.`,
  )

  return {
    ok: true,
    message: "Thank you! We've received your enquiry and our team will reach out within one working day.",
    whatsappUrl,
  }
}
