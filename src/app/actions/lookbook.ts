'use server'

import { z } from 'zod'
import { createLead } from '@/lib/leads'
import { sendLeadEmail, sendLeadAutoreply } from '@/lib/email'
import { LOOKBOOK } from '@/data/lookbook'

const schema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  name: z.string().trim().max(80).optional(),
})

export type LookbookState = { ok: boolean; url?: string | null; message?: string; error?: string }

/** Capture a lookbook request as a lead; return the download only if it exists. */
export async function submitLookbook(_prev: LookbookState, formData: FormData): Promise<LookbookState> {
  if (formData.get('company')) return { ok: true } // honeypot
  const parsed = schema.safeParse({
    email: formData.get('email'),
    name: formData.get('name') || undefined,
  })
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Enter a valid email address.' }
  }

  const lead = {
    name: parsed.data.name || '(lookbook)',
    email: parsed.data.email,
    subject: 'Lookbook request',
    message: LOOKBOOK.available
      ? 'Requested the lookbook download.'
      : 'Joined the lookbook waitlist (PDF not yet published).',
    source: 'lookbook',
  }
  try {
    await createLead(lead)
  } catch (err) {
    console.error('[lookbook] failed to persist:', err)
  }
  await Promise.all([sendLeadEmail(lead), sendLeadAutoreply(lead)])

  return {
    ok: true,
    url: LOOKBOOK.available ? LOOKBOOK.url : null,
    message: LOOKBOOK.available
      ? 'Your lookbook is ready to download.'
      : 'Thank you! We’ll email you the lookbook the moment it’s ready.',
  }
}
