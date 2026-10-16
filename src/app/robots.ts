import { SITE_URL } from '@/constants/site';
import type { MetadataRoute } from 'next';

// 관리자 경로를 Disallow 로 적지 않는다 — 적는 순간 경로가 공개된다.
// 관리자 화면은 링크가 없고 noindex 헤더·메타로 색인을 막는다.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
