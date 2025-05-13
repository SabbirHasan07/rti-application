import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/feedback
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, response, infoType, wantToAppeal } = body;

    if (!userId || !response || wantToAppeal === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        userId,
        response,
        infoType: response === 'হ্যা' ? infoType : null,
        appeal: wantToAppeal === 'হ্যাঁ',
      },
    });

    return NextResponse.json({ success: true, feedback }, { status: 201 });

  } catch (error) {
    console.error('POST /feedback error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET /api/feedback?userId=xyz
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId query param' }, { status: 400 });
    }

    const feedbacks = await prisma.feedback.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ feedbacks }, { status: 200 });

  } catch (error) {
    console.error('GET /feedback error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
