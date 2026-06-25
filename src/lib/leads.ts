import { prisma } from './db'

/** Shape accepted by the lead pipeline (superset of the current contact form). */
export type LeadInput = {
  name: string
  email: string
  message: string
  phone?: string | null
  city?: string | null
  homeType?: string | null
  budget?: string | null
  subject?: string | null
  source?: string
  ipHash?: string | null
  userAgent?: string | null
}

/** Persist a captured enquiry. Returns the created row's id. */
export async function createLead(input: LeadInput): Promise<{ id: string }> {
  const lead = await prisma.lead.create({
    data: {
      name: input.name,
      email: input.email,
      message: input.message,
      phone: input.phone ?? null,
      city: input.city ?? null,
      homeType: input.homeType ?? null,
      budget: input.budget ?? null,
      subject: input.subject ?? null,
      source: input.source ?? 'website',
      ipHash: input.ipHash ?? null,
      userAgent: input.userAgent ?? null,
    },
    select: { id: true },
  })
  return lead
}
