import Admission2 from '@/assets/images/gallery/admission2.png';
import Doc1 from '@/assets/images/gallery/doc1.png';
import Doc2 from '@/assets/images/gallery/doc2.png';
import Treat1 from '@/assets/images/gallery/treat1.png';
import Injection from '@/assets/images/treatment/medicine.png';
import Needle from '@/assets/images/treatment/treat.png';
import type { StaticImageData } from 'next/image';

// 진료항목 문구 — 네이버 플레이스 소개글을 바탕으로 쓴 초안, 원장님 검수 필요.
// 의료법 제56조(의료광고 금지 사항)에 따라 치료 효과를 보장하거나 다른 기관과 비교하는 표현을 쓰지 않는다.
// 보험 적용·가격·상품명 같은 비용 이야기는 넣지 않고, 치료가 무엇이고 어떻게 진행되는지만 안내한다.
// description 의 \n 은 문장 사이 줄바꿈이다.

export interface Treatment {
  id: string;
  title: string;
  summary: string;
  description: string;
  points: readonly string[];
  image: StaticImageData;
  alt: string;
}

export const TREATMENTS: readonly Treatment[] = [
  {
    id: 'traffic-accident',
    title: '교통사고 치료',
    summary: '사고 뒤에 남은 통증과 불편함을 치료합니다.',
    description:
      '사고 직후에는 괜찮다가 며칠 지나 목과 허리 통증, 두통, 어지럼이 나타나기도 합니다.\n침, 약침, 추나, 한약으로 치료하고 회복될 때까지 재활 치료를 이어 갑니다.',
    points: ['목·허리 통증, 두통, 어지럼', '회복을 돕는 재활 치료', '필요하면 입원 치료'],
    image: Treat1,
    alt: '커튼으로 나뉜 해득금천한의원 개별 치료 베드',
  },
  {
    id: 'chuna',
    title: '추나요법',
    summary: '한의사가 손으로 척추와 관절의 균형을 바로잡는 치료입니다.',
    description:
      '틀어진 자세나 오래 굳은 근육과 관절을 직접 손으로 살피고 바로잡습니다.\n목·허리디스크나 자세 교정이 필요할 때도 함께 진행합니다.',
    points: ['척추·관절 교정', '목·허리디스크', '자세와 생활 습관 안내'],
    image: Doc2,
    alt: '해득금천한의원 추나 치료실의 전동 추나 테이블',
  },
  {
    id: 'pharmacopuncture',
    title: '약침과 봉침',
    summary: '한약재에서 정제한 약액을 경혈이나 아픈 부위에 놓는 치료입니다.',
    description:
      '부위와 증상에 맞는 약침을 골라 놓습니다.\n봉침은 꿀벌의 봉독을 정제해 쓰기 때문에 시술 전에 반응 검사를 먼저 합니다.',
    points: ['증상에 맞춘 약침', '봉약침', '시술 전 반응 확인'],
    image: Injection,
    alt: '한의사가 환자의 무릎 부위에 약침을 놓는 모습',
  },
  {
    id: 'thread-embedding',
    title: '통증매선',
    summary: '몸에 녹는 의료용 실을 경혈이나 근육에 넣는 치료입니다.',
    description:
      '실이 녹는 동안 그 부위에 자극이 이어집니다.\n통증 부위에 하는 통증매선과 얼굴에 하는 안면매선이 있습니다.',
    points: ['통증매선', '안면매선', '시술 후 관리 안내'],
    image: Needle,
    alt: '흰 수건을 덮은 환자의 허리에 가는 침이 꽂혀 있는 모습',
  },
  {
    id: 'herbal-medicine',
    title: '체질 한약',
    summary: '체질과 증상에 맞춰 한약을 처방합니다.',
    description:
      '같은 증상이라도 체질에 따라 처방이 달라집니다.\n체질별 탕약과 보약, 산후 보약을 처방하고, 챙겨 드시기 편한 환제도 있습니다.',
    points: ['체질별 탕약', '보약과 산후 보약', '챙겨 드시기 편한 환제'],
    image: Doc1,
    alt: '진료 책상과 치료 테이블이 놓인 원장 진료실',
  },
  {
    id: 'admission',
    title: '입원 치료',
    summary: '365일 입원실을 운영하며, 당일 입원도 가능합니다.',
    description:
      '통증이 심하거나 통원이 어려우시면 입원해서 치료받으실 수 있습니다.\n입원 전담 케어로 입원하신 동안 상태를 꼼꼼히 살핍니다.',
    points: ['2인실 입원실', '당일 입원, 상시 입원', '입원환자 24시간 모니터링'],
    image: Admission2,
    alt: '침대와 TV가 있는 입원실',
  },
];

export const STRENGTHS = [
  { title: '1:1 맞춤 진료', description: '체질과 증상을 살펴 치료와 처방을 정합니다.' },
  { title: '당일 입원', description: '입원 치료가 필요하시면 그날 바로 입원하실 수 있습니다.' },
  { title: '입원 전담 케어', description: '입원하신 동안 24시간 상태를 살핍니다.' },
] as const;
