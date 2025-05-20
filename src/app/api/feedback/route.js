// /api/feedback/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// POST: Create feedback (for application or appeal)
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      userId,
      applicationId, // nullable
      appealId,      // nullable
      response,
      infoType,
      isAppeal
    } = body;

    if (!userId || !response || typeof isAppeal !== 'boolean') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        userId,
        response,
        infoType: response === "হ্যা" ? infoType : null,
        isAppeal,
        applicationId: isAppeal ? null : applicationId,
        appealId: isAppeal ? appealId : null,
      },
    });

    return NextResponse.json({ success: true, feedback }, { status: 201 });
  } catch (error) {
    console.error('POST /feedback error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET: Get feedbacks for a user
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const feedbacks = await prisma.feedback.findMany({
      where: userId ? { userId } : {},
      include: {
        application: true,
        appeal: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ feedbacks }, { status: 200 });
  } catch (error) {
    console.error('GET /feedback error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}