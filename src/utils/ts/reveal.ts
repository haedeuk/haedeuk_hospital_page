// 스크롤 등장 애니메이션 표시 — styles/base/_reveal.scss 의 data-reveal 값과 같다
export type RevealVariant = '' | 'fade' | 'zoom' | 'left' | 'right';

// data-reveal 요소에 펼쳐 넣는 속성. <li {...reveal('zoom')}>
// ScrollReveal 은 페이지 본문이 하이드레이션되기 전에도 data-revealed 를 달 수 있다(본문은 Suspense 경계 안이라 늦게 붙는다).
// 그 속성 차이는 의도된 것이므로 이 요소에 한해 React 의 불일치 경고를 끈다. 자식 요소의 검사는 그대로다.
export const reveal = (variant: RevealVariant = '') => ({
  'data-reveal': variant,
  suppressHydrationWarning: true,
});
