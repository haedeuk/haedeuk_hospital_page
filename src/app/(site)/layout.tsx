import BackToTop from '@/components/BackToTop';
import FloatingCta from '@/components/FloatingCta';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import ScrollReveal from '@/components/ScrollReveal';
import { clinicJsonLd } from '@/lib/seo/jsonLd';
import styles from './SiteLayout.module.scss';
import type { ReactNode } from 'react';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className={styles.skip} href="#main">
        본문 바로가기
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingCta />
      <BackToTop />
      <ScrollReveal />
      <JsonLd data={clinicJsonLd()} />
    </>
  );
}
