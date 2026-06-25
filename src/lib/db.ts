import { PrismaClient } from '@prisma/client'

/**
 * Prisma client singleton — avoids exhausting connections during Next.js dev
 * hot-reloads. Server-only (never imported by a Client Component).
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
