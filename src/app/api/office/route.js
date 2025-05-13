import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// POST: Create an office
export async function POST(req) {
  try {
    const { name, designation, district, officeType } = await req.json();

    if (!name || !designation || !district || !officeType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const office = await prisma.office.create({
      data: { name, designation, district, officeType },
    });

    return NextResponse.json({ message: 'Office created', office }, { status: 201 });
  } catch (error) {
    console.error('Office Create Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


// GET: Get all offices
export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(offices);
  } catch (error) {
    console.error('Get Offices Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

//DELETE
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Office ID is required' }, { status: 400 });
    }

    // Check if office exists
    const existingOffice = await prisma.office.findUnique({ where: { id } });

    if (!existingOffice) {
      return NextResponse.json({ error: 'Office not found' }, { status: 404 });
    }

    await prisma.office.delete({ where: { id } });

    return NextResponse.json({ message: 'Office deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete Office Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}