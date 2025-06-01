import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isOlderThan30Days } from "@/utils/isOlderThan30Days";

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
      appealOfficer,
      apealOfficerAddress,
      responseDate,
      subject, // ✅ নতুন ফিল্ড
      details,
      reason,
      informationGivenOfficer,
      applicationId,
    } = body;

    const application = await prisma.application.findUnique({ where: { id: applicationId } })
    const isOlderThanThirtyDays = isOlderThan30Days(application?.createdAt);
    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found." },
        { status: 404 }
      );
    }

    if (isOlderThanThirtyDays) {
      return NextResponse.json(
        { success: false, message: "This application is no longer available." },
        { status: 410 }
      );
    }

    const existingAppeal = await prisma.appeal.findUnique({
      where: {
        applicationId,
      }
    })

    if (application?.hasAppealed || existingAppeal) {
      return NextResponse.json(
        { success: false, message: "User has already applied against this application." },
        { status: 409 }
      );
    }

    const appeal = await prisma.appeal.create({
      data: {
        userId,
        applicantName,
        address,
        phone,
        referenceNo,
        appealOfficer,
        apealOfficerAddress,
        responseDate: responseDate ? new Date(responseDate) : null,
        subject, // ✅ সেট করলাম
        details,
        reason,
        informationGivenOfficer,
        applicationId,
      },
      select: {
        id: true
      }
    });
    console.log(appeal?.id)
    if (appeal?.id) {
      await prisma.application.update({ where: { id: applicationId }, data: { hasAppealed: true } })
    }

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
    const appealId = searchParams.get("appealId");

    if (!appealId) {
      return NextResponse.json(
        { success: false, message: "Missing appeal id" },
        { status: 400 }
      );
    }

    const appeals = await prisma.appeal.findMany({
      where: { id: appealId }, include: {
        application: true
      }
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

// DELETE: Delete an appeal by ID (from query param ?id=xxx)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing appeal ID" },
        { status: 400 }
      );
    }

    await prisma.appeal.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Appeal deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting appeal:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
