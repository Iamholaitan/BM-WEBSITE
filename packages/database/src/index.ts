import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function connectDatabase(): Promise<PrismaClient> {
  await prisma.$connect();
  console.log('Connected to database');
  return prisma;
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
  console.log('Disconnected from database');
}

export { PrismaClient };
export default prisma;
