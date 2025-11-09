import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = verifyToken(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const contact = await prisma.contact.findFirst({ where: { id: parseInt(params.id), userId } })
  if (!contact) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(contact)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = verifyToken(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, email, phone } = await req.json()
  const contact = await prisma.contact.updateMany({
    where: { id: parseInt(params.id), userId },
    data: { name, email, phone },
  })
  if (contact.count === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ message: 'Updated' })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = verifyToken(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const contact = await prisma.contact.deleteMany({ where: { id: parseInt(params.id), userId } })
  if (contact.count === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ message: 'Deleted' })
}