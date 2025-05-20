import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { phone, newPassword } = await req.json();

  if (!phone || !newPassword) {
    return NextResponse.json({ error: 'Phone and new password are required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { phone },
    data: {
      password: hashed,
      resetCode: null,
      resetCodeExpiry: null,
    },
  });

  return NextResponse.json({ message: 'Password reset successful' });
}
