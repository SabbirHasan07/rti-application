import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {

const authHeader = req.headers.get('authorization');
if (!authHeader || !authHeader.startsWith('Bearer ')) {
return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

const token = authHeader.split(' ')[1];

try {
const decoded = verifyToken(token);
const user = await prisma.user.findFirst({where: {
    id: decoded.id
}});

if (!user) {
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}

return NextResponse.json(user);
} catch (err) {
    console.error(err)
return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
}
}