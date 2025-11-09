import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest) {
  const userId = verifyToken(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const contacts = await prisma.contact.findMany({ where: { userId } })
  return NextResponse.json(contacts)
}

export async function POST(req: NextRequest) {
  const userId = verifyToken(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, email, phone } = await req.json()
  const contact = await prisma.contact.create({ data: { name, email, phone, userId } })
  return NextResponse.json(contact)
}