import BootSplash from '@/components/BootSplash';
import NavigationProgress from '@/components/NavigationProgress';
import { NAVER_SITE_VERIFICATION } from '@/constants/clinic';
import { SITE_DEFAULT_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_URL } from '@/constants/site';
import '@/styles/index.scss';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  category: 'health',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE_NAME,
    url: '/',
    title: SITE_DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: SITE_DEFAULT_TITLE, description: SITE_DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: { other: { 'naver-site-verification': NAVER_SITE_VERIFICATION } },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFBF9' },
    { media: '(prefers-color-scheme: dark)', color: '#0F1512' },
  ],
};

// 첫 페인트 전에 실행되는 준비 스크립트. JS 가 없으면 아무것도 숨기지 않는다.
//  1) 스크롤 등장 애니메이션 준비 — 관찰자가 3초 안에 뜨지 않으면 숨김을 풀어 내용이 사라진 채로 남지 않게 한다.
//  2) 첫 방문 보딩화면 — 같은 방문(sessionStorage)에서 처음 한 번만. 무슨 일이 있어도 5초 뒤에는 걷힌다.
const BOOTSTRAP = [
  'var d=document.documentElement;',
  'd.classList.add(\'reveal-ready\');',
  'setTimeout(function(){if(!window.__revealReady)d.classList.remove(\'reveal-ready\')},3000);',
  'try{if(!sessionStorage.getItem(\'hd-booted\')){d.classList.add(\'booting\');',
  'setTimeout(function(){d.classList.add(\'booted\');setTimeout(function(){d.classList.remove(\'booting\',\'booted\')},600)},5000)}}catch(e){}',
].join('');

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-scroll-behavior: 페이지를 옮길 때는 부드러운 스크롤을 끄고 바로 맨 위로 보낸다(Next 가 읽는 표시)
    <html lang="ko" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />
      </head>
      <body>
        <BootSplash />
        <NavigationProgress />
        {children}
      </body>
    </html>
  );
}
