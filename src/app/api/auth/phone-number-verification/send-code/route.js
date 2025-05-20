import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendSMS } from '@/lib/sendSMS';

export async function POST(req) {
    const { phone } = await req.json();

    if (!phone) {
        return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const phoneExists = await prisma.phoneVerification.findUnique({ where: { phone } });
    if (phoneExists?.isVerified) {
        return NextResponse.json({ error: 'This number is already registered!' }, { status: 404 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    await prisma.phoneVerification.upsert({
        where: { phone },
        update: {
            code,
            expiresAt,
            isVerified: false,
        },
        create: {
            phone,
            code,
            expiresAt,
            isVerified: false,
        },
    });

    console.log('verification code is: ', code)

    const result = await sendSMS(phone, code);

    if (!result.success) {
        return NextResponse.json(
            { error: 'Failed to send SMS', details: result.error || result.data },
            { status: 500 }
        );
    }

    return NextResponse.json({ message: 'Verification code sent.' });
}
