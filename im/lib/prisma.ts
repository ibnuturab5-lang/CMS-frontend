import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

console.log('DATABASE_URL:', process.env.DATABASE_URL)  // Debug: Check if env var is loaded
console.log('NODE_ENV:', process.env.NODE_ENV)  // Debug: Confirm environment

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],  // Add logging for Prisma operations
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma