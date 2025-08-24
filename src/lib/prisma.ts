// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// Ensure the client is properly disconnected when the process exits
process.on('beforeExit', async () => {
  await db.$disconnect();
});

process.on('SIGINT', async () => {
  await db.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await db.$disconnect();
  process.exit(0);
});