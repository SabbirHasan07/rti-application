import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: Create a new appeal
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      userId,
      applicantName,
      address,
      phone,
      referenceNo,
      officerName,
      appealOfficer,
      responseDate,
      details,
      reason,
    } = body;

    const appeal = await prisma.appeal.create({
      data: {
        userId,
        applicantName,
        address,
        phone,
        referenceNo,
        officerName,
        appealOfficer,
        responseDate: new Date(responseDate), // Ensure Date object
        details,
        reason,
      },
    });

    return NextResponse.json({ success: true, appeal }, { status: 201 });
  } catch (error) {
    console.error("Error submitting appeal:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET: Get appeals by userId from query param ?userId=xxx
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId" },
        { status: 400 }
      );
    }

    const appeals = await prisma.appeal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, appeals });
  } catch (error) {
    console.error("Error fetching appeals:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
