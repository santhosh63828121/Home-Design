/**
 * Lead notification email — provider-agnostic and env-gated.
 * Order of preference: Resend (REST, no SDK dep) → Nodemailer SMTP → no-op.
 * NEVER throws: email failures must not block lead capture. Server-only.
 */
type LeadEmail = {
  name: string
  email: string
  subject?: string | null
  message: string
  phone?: string | null
  city?: string | null
  leadId?: string
}

function renderBody(lead: LeadEmail) {
  const lines = [
    `New enquiry from the RGL Decors website${lead.leadId ? ` (lead ${lead.leadId})` : ''}:`,
    '',
    `Name:    ${lead.name}`,
    `Email:   ${lead.email}`,
    lead.phone ? `Phone:   ${lead.phone}` : null,
    lead.city ? `City:    ${lead.city}` : null,
    lead.subject ? `Subject: ${lead.subject}` : null,
    '',
    'Message:',
    lead.message,
  ].filter(Boolean)
  return lines.join('\n')
}

/** A short, friendly confirmation sent back to the person who enquired. */
function renderConfirmation(lead: LeadEmail) {
  return [
    `Hi ${lead.name},`,
    '',
    'Thanks for reaching out to RGL Decors — we’ve received your enquiry and a member of our team will get back to you within one working day.',
    '',
    lead.subject ? `Your message (“${lead.subject}”):` : 'Your message:',
    lead.message,
    '',
    'In the meantime, feel free to call or WhatsApp us if it’s urgent.',
    '',
    '— The RGL Decors Team',
  ].join('\n')
}

/**
 * Provider-agnostic delivery. Resend (REST) → Nodemailer SMTP → no-op. NEVER
 * throws. Returns {sent:false} when no provider is configured.
 */
/** A file to attach (résumé / portfolio). `content` is base64-encoded. */
export type MailAttachment = { filename: string; content: string }

async function deliver(opts: {
  to: string
  subject: string
  text: string
  replyTo?: string
  attachments?: MailAttachment[]
}): Promise<{ sent: boolean; via?: string }> {
  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL || 'RGL Decors <onboarding@resend.dev>',
          to: [opts.to],
          ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
          subject: opts.subject,
          text: opts.text,
          // Resend takes base64 in `content`.
          ...(opts.attachments?.length ? { attachments: opts.attachments } : {}),
        }),
      })
      if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
      return { sent: true, via: 'resend' }
    }

    if (process.env.SMTP_HOST) {
      const nodemailer = (await import('nodemailer')).default
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth:
          process.env.SMTP_USER && process.env.SMTP_PASS
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
      })
      await transport.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: opts.to,
        replyTo: opts.replyTo,
        subject: opts.subject,
        text: opts.text,
        // Nodemailer wants a Buffer.
        attachments: opts.attachments?.map((a) => ({
          filename: a.filename,
          content: Buffer.from(a.content, 'base64'),
        })),
      })
      return { sent: true, via: 'smtp' }
    }

    console.info('[lead] No email provider configured (RESEND_API_KEY / SMTP_HOST) — skipping.')
    return { sent: false }
  } catch (err) {
    console.error('[lead] email delivery failed (lead still saved):', err)
    return { sent: false }
  }
}

/**
 * Career application → the studio inbox, with the résumé/portfolio attached.
 * NEVER throws. No-ops (returning {sent:false}) when no provider is configured —
 * the application text is still persisted by the caller.
 */
export async function sendApplicationEmail(args: {
  name: string
  email: string
  subject: string
  body: string
  attachments?: MailAttachment[]
}): Promise<{ sent: boolean; via?: string }> {
  const to = process.env.CAREERS_NOTIFY_EMAIL || process.env.LEAD_NOTIFY_EMAIL
  if (!to) {
    console.info('[careers] No CAREERS_NOTIFY_EMAIL / LEAD_NOTIFY_EMAIL set — skipping email.')
    return { sent: false }
  }
  return deliver({
    to,
    subject: args.subject,
    text: args.body,
    replyTo: args.email,
    attachments: args.attachments,
  })
}

/** Notify the studio of a new enquiry. */
export async function sendLeadEmail(lead: LeadEmail): Promise<{ sent: boolean; via?: string }> {
  const to = process.env.LEAD_NOTIFY_EMAIL
  if (!to) {
    console.info('[lead] LEAD_NOTIFY_EMAIL not set — skipping notification email.')
    return { sent: false }
  }
  return deliver({ to, subject: `New website enquiry — ${lead.name}`, text: renderBody(lead), replyTo: lead.email })
}

/**
 * Auto-reply confirmation to the person who enquired. Off when LEAD_AUTOREPLY is
 * 'off'. NOTE: delivering to arbitrary recipients requires a VERIFIED sender
 * domain (LEAD_FROM_EMAIL on a Resend-verified domain, or SMTP) — until RGL
 * configures that, this safely no-ops.
 */
export async function sendLeadAutoreply(lead: LeadEmail): Promise<{ sent: boolean; via?: string }> {
  if (process.env.LEAD_AUTOREPLY === 'off' || !lead.email) return { sent: false }
  return deliver({
    to: lead.email,
    subject: 'We’ve received your enquiry — RGL Decors',
    text: renderConfirmation(lead),
    replyTo: process.env.LEAD_NOTIFY_EMAIL || process.env.LEAD_FROM_EMAIL,
  })
}
