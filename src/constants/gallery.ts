import Admission from '@/assets/images/gallery/admission.png';
import Admission2 from '@/assets/images/gallery/admission2.png';
import Admission3 from '@/assets/images/gallery/admission3.png';
import Doc1 from '@/assets/images/gallery/doc1.png';
import Doc2 from '@/assets/images/gallery/doc2.png';
import Lobby from '@/assets/images/gallery/lobby.png';
import Stair from '@/assets/images/gallery/stair.png';
import Treat1 from '@/assets/images/gallery/treat1.png';
import type { StaticImageData } from 'next/image';

export interface GalleryItem {
  src: StaticImageData;
  alt: string;
  caption: string;
}

export const GALLERY: readonly GalleryItem[] = [
  { src: Lobby, alt: '대리석 접수 데스크와 금색 로고가 있는 해득금천한의원 로비', caption: '로비와 접수' },
  { src: Stair, alt: '해득금천한의원 간판이 붙은 나무 출입문', caption: '한의원 입구' },
  { src: Doc1, alt: '진료 책상과 추나 테이블이 놓인 원장 진료실', caption: '진료실' },
  { src: Doc2, alt: '추나 치료에 쓰는 전동 추나 테이블', caption: '추나 치료실' },
  { src: Treat1, alt: '커튼으로 나뉜 개별 치료 베드', caption: '치료실' },
  { src: Admission, alt: '입원병동 안내 데스크', caption: '입원병동' },
  { src: Admission2, alt: '침대와 TV가 있는 입원실', caption: '입원실' },
  { src: Admission3, alt: '정돈된 입원실 침상', caption: '입원실 침상' },
];
