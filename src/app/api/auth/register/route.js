import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { fullName, email, phone, password, isPhoneNumberVerified } = body;

  if (!phone || !password || !fullName) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        password: hashedPassword,
        role: 'USER',
        isPhoneNumberVerified
      },
    });

    // Create JWT token
    const token = signToken({ id: user.id, role: user.role });

    return NextResponse.json({
      token,
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isPhoneNumberVerified: user.isPhoneNumberVerified
    });
  } catch (error) {
    return NextResponse.json({ error: 'User exists or error' }, { status: 400 });
  }
}
// check