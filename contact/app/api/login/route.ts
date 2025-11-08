import { generateToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest) {
  await connectDB();
  const { email, password } = await request.json();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = generateToken(user._id);
  const response = NextResponse.json({ message: 'Logged in' });
  response.cookies.set('auth-token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
  return response;
}