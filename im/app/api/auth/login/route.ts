import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
  const response = NextResponse.json({ message: 'Logged in' })
  response.cookies.set('token', token, { httpOnly: true, secure: true, sameSite: 'strict' })
  return response
}