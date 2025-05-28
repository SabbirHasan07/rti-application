import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// POST handler for creating a new application
export async function POST(req) {
  const body = await req.json();

  try {
    const application = await prisma.application.create({
      data: {
        userId: body.userId,
        data: body.data,
        isNotified: false,
        hasGivenFeedback: false,
      },
      select:{
        id: true
      }
    });

    return Response.json(application);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Create failed' }), { status: 500 });
  }
}

// GET handler for fetching applications with user details included
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const applicationId = searchParams.get('applicationId')



    const applications = await prisma.application.findMany({
      where: userId ? { userId } : applicationId ? {id: applicationId} : {}, // If userId exists, filter
      select:{
        id: true,
        createdAt: true,
        data: true,
        feedbacks: true,
        user: true,
        userId: true,
        hasGivenFeedback: true,
        hasAppealed: true,
      },
      orderBy:{
        createdAt: 'desc'
      }
    });

    return new Response(JSON.stringify(applications), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Fetch failed' }), { status: 500 });
  }
}

// DELETE handler for deleting an application
export async function DELETE(req) {
  const { id } = req.query; // Get the application ID from the request's query parameters

  try {
    // Check if the application exists before deleting
    const application = await prisma.application.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!application) {
      return new Response(JSON.stringify({ error: 'Application not found' }), { status: 404 });
    }

    // Delete the application
    await prisma.application.delete({
      where: { id: parseInt(id, 10) },
    });

    return new Response(JSON.stringify({ message: 'Application deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Delete failed' }), { status: 500 });
  }
}
