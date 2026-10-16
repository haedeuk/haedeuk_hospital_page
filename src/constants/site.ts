import { CLINIC } from './clinic';

// canonical · OG · sitemap 의 절대 주소 기준. 끝의 / 는 뗀다.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://haedeuk-geumcheon.com').replace(/\/$/, '');

export const SITE_NAME = CLINIC.name;

export const SITE_DEFAULT_TITLE = `${CLINIC.name} | 금천구 시흥사거리 한의원 · 교통사고 · 입원`;

export const SITE_DESCRIPTION =
  '365일 진료하는 금천구 시흥사거리 해득금천한의원. 금천구청역 1번 출구 도보 10분, 입원실 보유. 교통사고 후유증, 추나, 약침·봉침, 통증매선, 체질 한약. 평일 오전 8시~오후 9시, 주말·공휴일 오전 8시~오후 5시.';

export const SITE_KEYWORDS = [
  '해득금천한의원',
  '금천구 한의원',
  '시흥동 한의원',
  '시흥사거리 한의원',
  '금천구 교통사고 한의원',
  '금천구청역 한의원',
  '365일 한의원',
  '입원 한의원',
  '추나요법',
  '약침',
  '통증매선',
  '체질 한약',
];
