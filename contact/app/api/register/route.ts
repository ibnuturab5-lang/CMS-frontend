
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest) {
  await connectDB();
  const { email, password } = await request.json();

 try {
     const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  return NextResponse.json({user, message: 'User registered' });
 } catch (error : any) {
    console.log(error.message)
    return NextResponse.json({message:"server error",error:error.message})
 }
}