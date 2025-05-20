import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { phone, code } = await req.json();

    if (!phone || !code) {
        return NextResponse.json({ error: 'Phone and code are required' }, { status: 400 });
    }

    const record = await prisma.phoneVerification.findUnique({ where: { phone } });

    if (!record || record.code !== code) {
        return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
    }

    if (new Date() > record.expiresAt) {
        return NextResponse.json({ error: 'Code has expired' }, { status: 400 });
    }

    await prisma.phoneVerification.update({
        where: { phone },
        data: {
            isVerified: true
        }
    });

    return NextResponse.json({ message: 'Phone number verified' });
}
