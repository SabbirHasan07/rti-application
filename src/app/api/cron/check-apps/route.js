import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendSMS } from '@/lib/sendSMS';

const prisma = new PrismaClient();

export async function GET() {
    const tenMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

    const apps = await prisma.application.findMany({
        where: {
            createdAt: {
                lte: tenMinutesAgo,
            },
            isNotified: false,
        },
    });

    for (const app of apps) {
        const sms = `প্রিয় ${app?.data?.name}, বাংলাদেশ পরিবেশ আইনবিদ সমিতি – বেলার RTI Helpdesk এর মাধ্যমে করা আপনার আবেদনের ফলাফল/মতামত হালনাগাদ করুন। লগইন করে Feedback জমা দিন - https://rti-application.vercel.app/login BELA-BANGLADESH ENVIRONMENTAL LAWYERS ASSOCIATION https://www.belabangla.org`
        if (app?.data?.phone) {
            await sendSMS(app.data.phone, sms);
        }
        await prisma.application.update({
            where: { id: app.id },
            data: { isNotified: true },
        });
    }

    return NextResponse.json({ sent: apps.length });
}
