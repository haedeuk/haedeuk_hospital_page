// 한의원 기본 정보 — 화면·푸터·메타데이터·구조화 데이터가 모두 여기서 읽는다.

export const CLINIC = {
  name: '해득금천한의원',
  nameEn: 'Haedeuk Geumcheon Korean Medicine Clinic',
  ceo: '김혜인',
  businessNumber: '568-90-01753',
  phone: '02-6952-3988',
  phoneHref: 'tel:02-6952-3988',
  phoneInternational: '+82-2-6952-3988',
  address: {
    full: '서울시 금천구 금하로 631, 2층·3층 (시흥동)',
    street: '금하로 631, 2층·3층',
    locality: '금천구',
    region: '서울특별시',
    neighborhood: '시흥동',
    landmark: '시흥사거리',
  },
  // 지도 중심과 마커는 건물 입구 기준으로 살짝 다르다 (기존 사이트 값 유지).
  geo: {
    center: { lat: 37.45452665665286, lng: 126.90146820175917 },
    marker: { lat: 37.45493418758089, lng: 126.90125575147492 },
  },
} as const;

export const CLINIC_LINKS = {
  naverPlace: 'https://map.naver.com/p/entry/place/1669555615',
  naverBooking: 'https://m.booking.naver.com/booking/13/bizes/969360',
  naverTalk: 'https://talk.naver.com/w4eocy',
  naverBlog: 'https://blog.naver.com/365gcsh',
  kakaoDirections: `https://map.kakao.com/link/to/${encodeURIComponent(CLINIC.name)},${CLINIC.geo.marker.lat},${CLINIC.geo.marker.lng}`,
} as const;

// 찾아오는 길 — 네이버 플레이스에 병원이 직접 등록한 정보 (2026-10 기준)
export const CLINIC_ACCESS = {
  landmark: '시흥사거리 현대시장 입구, IBK기업은행 오른쪽 건물',
  subway: { line: '1호선', station: '금천구청역', exit: '1번 출구', walk: '도보 약 10분' },
  bus: { stop: '시흥사거리·대명시장', walk: '도보 1분' },
  parking: {
    place: '한의원 옆 IBK기업은행 건물(와이즈플레이스) 기계식 주차장',
    support: '최대 2시간 지원',
    note: '주차증을 꼭 가져와 주세요.',
  },
  payments: ['지역화폐(카드·모바일·지류)', '제로페이', '간편결제'],
  amenities: ['예약', '무선 인터넷', '대기공간', '주차'],
} as const;

// 네이버 플레이스에 병원이 소개한 클리닉
export const CLINIC_PROGRAMS = [
  { group: '통증과 재활', items: ['교통사고 후유증', '목·허리디스크', '관절통증', '봉약침'] },
  { group: '체질과 보약', items: ['체질별 보약', '산후 보약', '체질 다이어트', '수험생과 성장기'] },
  { group: '수면과 두통', items: ['불면증', '두통', '어지럼증'] },
  { group: '마음 건강', items: ['우울', '불안과 공황', '화병'] },
] as const;

export interface OpeningHours {
  label: string;
  open: string;
  close: string;
  // schema.org dayOfWeek
  days: readonly string[];
}

export const OPENING_HOURS: readonly OpeningHours[] = [
  {
    label: '평일',
    open: '08:00',
    close: '21:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  {
    label: '주말·공휴일',
    open: '08:00',
    close: '17:00',
    days: ['Saturday', 'Sunday', 'PublicHolidays'],
  },
];

export const LUNCH_BREAK = { label: '점심시간', open: '13:00', close: '14:00' } as const;

export const NAVER_SITE_VERIFICATION = 'bf3316e9a4d964f052f2d472b3a45c22c4a56e69';
