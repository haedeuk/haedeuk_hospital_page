import { SITE_URL } from '@/constants/site';
import { getPublishedDoctors } from '@/lib/repository/doctors';
import { getFees } from '@/lib/repository/fees';
import { latestUpdatedAt } from '@/utils/ts/groupFees';
import type { MetadataRoute } from 'next';

export const revalidate = 600;

// 관리자 경로는 넣지 않는다.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  // lastModified 는 참고값이다. DB 조회가 실패해도 sitemap 자체는 내보낸다.
  const [doctorsUpdatedAt, feesUpdatedAt] = await Promise.all([
    getPublishedDoctors().then(latestUpdatedAt).catch(() => null),
    getFees().then(latestUpdatedAt).catch(() => null),
  ]);

  const routes: { path: string; priority: number; lastModified?: Date | null }[] = [
    { path: '', priority: 1 },
    { path: '/about', priority: 0.7 },
    { path: '/doctors', priority: 0.9, lastModified: doctorsUpdatedAt },
    { path: '/treatments', priority: 0.9 },
    { path: '/fees', priority: 0.6, lastModified: feesUpdatedAt },
    { path: '/location', priority: 0.8 },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: route.lastModified ?? now,
    changeFrequency: 'monthly',
    priority: route.priority,
  }));
}
