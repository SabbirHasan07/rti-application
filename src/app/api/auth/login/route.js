import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { email, phone, password } = body;

  // Check fixed admin login
  if (
    (email && email === process.env.ADMIN_EMAIL) ||
    (phone && phone === process.env.ADMIN_PHONE)
  ) {
    const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ role: 'ADMIN', email: email || process.env.ADMIN_EMAIL });

    return NextResponse.json({
      token,
      role: 'ADMIN',
      fullName: 'Admin',
      email: process.env.ADMIN_EMAIL,
      phone: process.env.ADMIN_PHONE,
    });
  }

  // User login (email or phone)
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email || undefined },
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
  });
}
