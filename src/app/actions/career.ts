'use server'

import { z } from 'zod'
import { createLead } from '@/lib/leads'
import { sendApplicationEmail, type MailAttachment } from '@/lib/email'

/**
 * Career application (PDF §Career page). Captures the candidate's details plus a
 * résumé and optional portfolio, persists the text to the lead store, and emails
 * the studio with the documents attached.
 *
 * Files are NOT written to disk or object storage (none is provisioned) — they
 * are delivered as email attachments only. If no mail provider is configured the
 * text still persists and we say so honestly rather than pretending it sent.
 */

const MAX_BYTES = 5 * 1024 * 1024 // 5 MB per file
const ALLOWED = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(80),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(7, 'Enter a valid phone number.').max(20),
  location: z.string().trim().min(2, 'Where are you based?').max(80),
  role: z.string().trim().min(2, 'Which role are you applying for?').max(80),
  experience: z.string().trim().min(1, 'Years of experience is required.').max(40),
  currentCompany: z.string().trim().max(80).optional(),
  skills: z.string().trim().min(2, 'Tell us your key skills.').max(400),
  expectedSalary: z.string().trim().max(60).optional(),
  noticePeriod: z.string().trim().max(60).optional(),
  availability: z.string().trim().max(60).optional(),
  linkedin: z.string().trim().max(200).optional(),
  message: z.string().trim().max(1500).optional(),
})

export type CareerState = { ok: boolean; message?: string; error?: string }

/** Validate one upload and return it as a base64 mail attachment. */
async function toAttachment(file: File | null, label: string): Promise<MailAttachment | null> {
  if (!file || file.size === 0) return null
  if (file.size > MAX_BYTES) throw new Error(`${label} must be under 5 MB.`)
  if (file.type && !ALLOWED.includes(file.type)) {
    throw new Error(`${label} must be a PDF or Word document.`)
  }
  const buf = Buffer.from(await file.arrayBuffer())
  return { filename: file.name || `${label}.pdf`, content: buf.toString('base64') }
}

export async function submitApplication(
  _prev: CareerState,
  formData: FormData,
): Promise<CareerState> {
  if (formData.get('company')) return { ok: true } // honeypot

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    location: formData.get('location'),
    role: formData.get('role'),
    experience: formData.get('experience'),
    currentCompany: formData.get('currentCompany') || undefined,
    skills: formData.get('skills'),
    expectedSalary: formData.get('expectedSalary') || undefined,
    noticePeriod: formData.get('noticePeriod') || undefined,
    availability: formData.get('availability') || undefined,
    linkedin: formData.get('linkedin') || undefined,
    message: formData.get('message') || undefined,
  })
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the form.' }
  }
  const d = parsed.data

  let attachments: MailAttachment[]
  try {
    const resume = await toAttachment(formData.get('resume') as File | null, 'Résumé')
    if (!resume) return { ok: false, error: 'Please attach your résumé (PDF or Word, under 5 MB).' }
    const portfolio = await toAttachment(formData.get('portfolio') as File | null, 'Portfolio')
    attachments = portfolio ? [resume, portfolio] : [resume]
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'That file could not be read.' }
  }

  const body = [
    `New career application — ${d.role}`,
    '',
    `Name:            ${d.name}`,
    `Email:           ${d.email}`,
    `Phone:           ${d.phone}`,
    `Location:        ${d.location}`,
    `Experience:      ${d.experience}`,
    d.currentCompany ? `Current company: ${d.currentCompany}` : null,
    d.expectedSalary ? `Expected salary: ${d.expectedSalary}` : null,
    d.noticePeriod ? `Notice period:   ${d.noticePeriod}` : null,
    d.availability ? `Availability:    ${d.availability}` : null,
    d.linkedin ? `LinkedIn:        ${d.linkedin}` : null,
    '',
    'Skills:',
    d.skills,
    d.message ? `\nNote:\n${d.message}` : '',
    '',
    `Attachments: ${attachments.map((a) => a.filename).join(', ')}`,
  ]
    .filter((l) => l !== null)
    .join('\n')

  try {
    await createLead({
      name: d.name,
      email: d.email,
      phone: d.phone,
      city: d.location,
      subject: `Career application · ${d.role}`,
      message: body,
      source: 'career',
    })
  } catch (err) {
    console.error('[careers] failed to persist application:', err)
  }

  const sent = await sendApplicationEmail({
    name: d.name,
    email: d.email,
    subject: `Career application — ${d.name} (${d.role})`,
    body,
    attachments,
  })

  return {
    ok: true,
    message: sent.sent
      ? 'Thank you — your application and documents are with our team. We’ll be in touch if there’s a fit.'
      : 'Thank you — your application has been recorded. Our team will be in touch if there’s a fit.',
  }
}
