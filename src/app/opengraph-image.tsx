import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/seo/ogImage';

export const alt = '해득금천한의원, 체계적인 진료와 체질에 맞춘 처방';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: '체계적인 진료, 체질에 맞춘 처방',
    description: '금천구 시흥사거리에서 365일 진료하고 입원실을 운영합니다',
  });
}
