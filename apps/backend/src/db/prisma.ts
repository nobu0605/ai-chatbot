import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '../config/env';
import pg from 'pg';

const { PrismaClient } = pkg;
type PrismaClientType = InstanceType<typeof PrismaClient>;

const pool = new pg.Pool({
  connectionString: env.databaseUrl || 'postgres://postgres:postgres@localhost:5432/ai_chatbot'
});

const adapter = new PrismaPg(pool);

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClientType | undefined;
}

export const prisma: PrismaClientType =
  globalThis.__prismaClient ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'production' ? [] : ['error', 'warn']
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prismaClient = prisma;
}
