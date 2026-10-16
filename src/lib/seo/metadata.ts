import { SITE_KEYWORDS, SITE_NAME } from '@/constants/site';
import type { Metadata } from 'next';

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
}

// 페이지 메타데이터 한 벌: canonical · Open Graph · Twitter 를 같은 값으로 맞춘다.
// OG 이미지는 각 경로의 opengraph-image.tsx 가 자동으로 붙는다.
export function createPageMetadata({ title, description, path, keywords = [] }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    keywords: [...keywords, ...SITE_KEYWORDS],
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      siteName: SITE_NAME,
      url: path,
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
