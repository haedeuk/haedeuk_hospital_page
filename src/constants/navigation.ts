export interface NavItem {
  href: string;
  label: string;
}

// 공개 화면 메뉴. 관리자 경로는 어디에도 넣지 않는다.
export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/about', label: '한의원 소개' },
  { href: '/doctors', label: '의료진' },
  { href: '/treatments', label: '진료항목' },
  { href: '/fees', label: '비급여 안내' },
  { href: '/location', label: '오시는 길' },
];
