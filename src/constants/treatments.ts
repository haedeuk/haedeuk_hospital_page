import Admission2 from '@/assets/images/gallery/admission2.png';
import Doc1 from '@/assets/images/gallery/doc1.png';
import Doc2 from '@/assets/images/gallery/doc2.png';
import Treat1 from '@/assets/images/gallery/treat1.png';
import Injection from '@/assets/images/treatment/medicine.png';
import Needle from '@/assets/images/treatment/treat.png';
import type { StaticImageData } from 'next/image';

// 진료항목 문구 — 원장님 검수 전 초안.
// 의료법 제56조(의료광고 금지 사항)에 따라 치료 효과를 보장하거나 다른 기관과 비교하는 표현을 쓰지 않는다.

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
    summary: '자동차보험으로 진료받으실 수 있고, 필요하면 입원 치료도 가능합니다.',
    description:
      '교통사고 직후에는 통증이 뚜렷하지 않다가 며칠 뒤 목·허리 통증, 두통, 어지럼 같은 증상이 나타나기도 합니다. 사고 경위와 현재 상태를 충분히 들은 뒤 침, 약침, 추나, 한약 가운데 필요한 치료를 계획하고, 재활 치료까지 이어서 진행합니다.',
    points: ['자동차보험 진료', '당일 입원과 상시 입원', '평일 오후 9시까지, 주말과 공휴일에도 진료'],
    image: Treat1,
    alt: '커튼으로 나뉜 해득금천한의원 개별 치료 베드',
  },
  {
    id: 'chuna',
    title: '추나요법',
    summary: '한의사가 손으로 척추와 관절, 근육의 균형을 바로잡는 수기 치료입니다.',
    description:
      '틀어진 자세나 반복된 사용으로 굳은 척추·관절 주변 조직을 한의사가 직접 손으로 살피고 교정합니다. 진찰 결과에 따라 건강보험이 적용되는 추나와 비급여 복잡추나 가운데 알맞은 방법을 안내합니다.',
    points: ['건강보험 적용 추나 (급여 기준 해당 시)', '비급여 복잡추나', '자세·생활습관 안내'],
    image: Doc2,
    alt: '해득금천한의원 추나 치료실의 전동 추나 테이블',
  },
  {
    id: 'pharmacopuncture',
    title: '약침과 봉침',
    summary: '한약재에서 추출·정제한 약액을 경혈이나 통증 부위에 주입하는 치료입니다.',
    description:
      '침 자극과 약재의 성분을 함께 쓰는 치료로, 증상과 부위에 따라 약침의 종류를 고릅니다. 봉침은 꿀벌의 봉독을 정제해 쓰는 약침이라 시술 전 반응 검사를 먼저 거칩니다.',
    points: ['봉약침, 자하거, 어혈약침', '지방분해약침, 프리미엄약침', '시술 전 상담과 반응 확인'],
    image: Injection,
    alt: '한의사가 환자의 무릎 부위에 약침을 놓는 모습',
  },
  {
    id: 'thread-embedding',
    title: '통증매선',
    summary: '몸에 녹는 의료용 실을 경혈이나 근육에 넣어 지속적으로 자극하는 치료입니다.',
    description:
      '가는 바늘로 녹는 실을 넣어 두면 실이 흡수되는 동안 해당 부위에 자극이 이어집니다. 부위와 상태에 따라 통증매선과 안면매선으로 나누어 진행하고, 시술 뒤 주의사항을 함께 안내합니다.',
    points: ['통증 부위 매선', '안면매선', '시술 후 관리 안내'],
    image: Needle,
    alt: '흰 수건을 덮은 환자의 허리에 가는 침이 꽂혀 있는 모습',
  },
  {
    id: 'herbal-medicine',
    title: '체질 한약',
    summary: '체질과 증상을 살펴 한 분 한 분에게 맞는 한약을 처방합니다.',
    description:
      '같은 증상이라도 체질과 생활 환경에 따라 처방이 달라집니다. 진찰과 상담을 바탕으로 체질별 탕약, 공진단·경옥고 같은 보약, 일상에서 챙기기 쉬운 환제를 안내합니다.',
    points: ['체질별 맞춤 탕약', '공진단과 경옥고', '상비한약과 환제'],
    image: Doc1,
    alt: '진료 책상과 치료 테이블이 놓인 원장 진료실',
  },
  {
    id: 'admission',
    title: '입원 치료',
    summary: '집중 치료가 필요한 분을 위해 365일 입원실을 운영합니다.',
    description:
      '교통사고 후 통증이 심하거나 일상생활을 하며 통원하기 어려운 분은 입원해 치료받으실 수 있습니다. 필요하면 당일 입원도 가능하며, 입원 전담 케어로 입원 기간 내내 상태를 살핍니다.',
    points: ['2인실 입원실과 입원 전담 케어', '당일 입원, 365일 상시 입원', '입원환자 24시간 모니터링'],
    image: Admission2,
    alt: '침대와 TV가 있는 입원실',
  },
];

export const STRENGTHS = [
  { title: '1:1 맞춤 한방치료', description: '진찰부터 치료 계획까지 한 분 한 분의 상태에 맞춥니다.' },
  { title: '365일 상시 입원', description: '주말과 공휴일에도 입원해 치료받으실 수 있습니다.' },
  { title: '입원환자 24시간 모니터링', description: '입원 기간 내내 상태를 살피고 기록합니다.' },
] as const;
