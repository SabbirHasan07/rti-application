import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { email, phone, password } = body;

 

  // User login (email or phone)
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { phone: phone || undefined },
      ],
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = signToken({ id: user.id, role: user.role });

  return NextResponse.json({
    token,
    role: user.role,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    id: user.id,
    isPhoneNumberVerified: user.isPhoneNumberVerified
  });
}
