import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// 로컬은 .env.local 을 읽는다. Vercel 빌드에서는 환경변수가 이미 process.env 에 있다.
config({ path: '.env.local', quiet: true });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: {
    // 마이그레이션은 세션 풀러(DIRECT_URL, 5432). 앱 실행은 트랜잭션 풀러(DATABASE_URL, 6543).
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
