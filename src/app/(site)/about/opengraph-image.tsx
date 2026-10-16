import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/seo/ogImage';

export const alt = '해득금천한의원 한의원 소개';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: '해득금천한의원',
    description: '맞춤 진료 철학과 시설을 소개합니다',
  });
}
