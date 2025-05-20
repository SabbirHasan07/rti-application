import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  const { phone, code } = await req.json();

  if (!phone || !code) {
    return NextResponse.json({ error: 'Phone and code are required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user || user.resetCode !== code || new Date() > user.resetCodeExpiry) {
    return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });
  }

  // Valid code: mark user as verified
  return NextResponse.json({ message: 'Code verified' });
}
