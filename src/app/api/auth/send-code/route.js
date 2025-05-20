import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  const { phone } = await req.json();

  if (!phone) {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // valid for 5 minutes

  await prisma.user.update({
    where: { phone },
    data: {
      resetCode: code,
      resetCodeExpiry: expiry,
    },
  });

  // 🚨 Mock sending SMS
  console.log(`🔐 Reset code for ${phone}: ${code}`);

  return NextResponse.json({ message: 'Verification code sent.' });
}
