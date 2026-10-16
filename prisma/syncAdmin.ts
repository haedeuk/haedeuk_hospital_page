// 배포(빌드) 때마다 admins 테이블을 ADMIN_EMAIL 한 명으로 맞춘다.
// 관리자는 한 명으로 강제한다 — 다른 행이 있으면 지운다.

import { config } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

config({ path: '.env.local', quiet: true });

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

  if (!email) throw new Error('ADMIN_EMAIL 이 설정되지 않았습니다. 관리자 계정의 Supabase 이메일을 넣어 주세요.');
  if (!connectionString) throw new Error('DIRECT_URL 또는 DATABASE_URL 이 설정되지 않았습니다.');

  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  try {
    await prisma.$transaction([
      prisma.admin.deleteMany({ where: { email: { not: email } } }),
      prisma.admin.upsert({ where: { email }, create: { email }, update: {} }),
    ]);
    console.log(`관리자 계정을 ${email} 한 명으로 맞췄습니다.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
