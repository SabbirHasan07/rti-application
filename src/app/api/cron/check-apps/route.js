// app/api/cron/check-apps/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // your Prisma client
import sendSMS from '@/lib/sendSMS'; // Green Web BD wrapper

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
    const sms = `প্রিয় ${app?.user?.fullName}, বাংলাদেশ পরিবেশ আইনবিদ সমিতি – বেলার RTI Helpdesk এর মাধ্যমে করা আপনার আবেদনের ফলাফল/মতামত হালনাগাদ করুন। লগইন করে Feedback জমা দিন - https://rti-application.vercel.app/login BELA-BANGLADESH ENVIRONMENTAL LAWYERS ASSOCIATION https://www.belabangla.org`
    await sendSMS(app.phone, sms);
    await prisma.application.update({
      where: { id: app.id },
      data: { isNotified: true },
    });
  }

  return NextResponse.json({ sent: apps.length });
}
