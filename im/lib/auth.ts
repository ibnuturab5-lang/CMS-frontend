import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function verifyToken(req: NextRequest): number | null {
  const token = req.cookies.get('token')?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
    return decoded.userId
  } catch {
    return null
  }
}