import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/seo/ogImage';

export const alt = '해득금천한의원 진료항목';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: '진료항목',
    description: '교통사고 후유증, 추나, 약침과 봉침, 통증매선, 한약, 입원 치료',
  });
}
