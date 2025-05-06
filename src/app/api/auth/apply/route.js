import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      userId,
      name,
      father,
      mother,
      presentAddress,
      permanentAddress,
      infoType,
      office,
      method,
      description,
      email,
      phone,
    } = body;

    if (!userId || !name || !phone || !infoType || !method || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    const application = await prisma.application.create({
      data: {
        userId,
        data: {
          name,
          father,
          mother,
          presentAddress,
          permanentAddress,
          infoType,
          office,
          method,
          description,
          email,
          phone,
        },
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });

  } catch (error) {
    console.error('RTI Application Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
