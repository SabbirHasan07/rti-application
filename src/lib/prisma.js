// lib/prisma.js

import { PrismaClient } from '@prisma/client';

let prisma;

if (typeof global !== 'undefined') {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
}

export { prisma };
