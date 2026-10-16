import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/seo/ogImage';

export const alt = '해득금천한의원 오시는 길';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: '오시는 길',
    description: '금천구청역 1번 출구에서 걸어서 10분, 주말과 공휴일에도 진료합니다',
  });
}
