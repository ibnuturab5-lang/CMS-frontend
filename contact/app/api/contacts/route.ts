
import { getUserFromCookie } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await connectDB();
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const contacts = await Contact.find();
  return NextResponse.json(contacts);
}

export async function POST(request: NextRequest) {
  await connectDB();
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

}