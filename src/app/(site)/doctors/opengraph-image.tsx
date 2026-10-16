import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/seo/ogImage';

export const alt = '해득금천한의원 의료진 소개';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: '의료진 소개',
    description: '원장님들의 학력과 경력',
  });
}
