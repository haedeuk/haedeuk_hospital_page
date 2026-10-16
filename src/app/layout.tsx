import localFont from 'next/font/local';
import { NAVER_SITE_VERIFICATION } from '@/constants/clinic';
import { SITE_DEFAULT_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_URL } from '@/constants/site';
import '@/styles/index.scss';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

// 제목·본문 모두 Pretendard (기존 사이트와 같은 서체)
const pretendard = localFont({
  src: [
    { path: '../assets/fonts/Pretendard-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/Pretendard-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../assets/fonts/Pretendard-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../assets/fonts/Pretendard-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>{children}</body>
    </html>
  );
}
