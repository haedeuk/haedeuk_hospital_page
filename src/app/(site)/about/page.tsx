import ContactBand from '@/components/ContactBand';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';
import { createPageMetadata } from '@/lib/seo/metadata';
import Facilities from './components/Facilities';
import Philosophy from './components/Philosophy';

const CRUMBS = [{ name: '한의원 소개', path: '/about' }];

export const metadata = createPageMetadata({
  title: '한의원 소개',
  description:
    '개개인의 맞춤 진료를 철학으로 하는 금천구 시흥동 해득금천한의원. 진료 원칙과 로비·진료실·치료실·입원실 등 시설을 소개합니다.',
  path: '/about',
  keywords: ['해득금천한의원 소개', '금천구 한의원 시설', '한의원 입원실'],
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="해득금천한의원"
        description={'한 분 한 분에게 맞춘 진료로 최선을 다하는 것,\n해득금천의 진료 철학입니다.'}
        crumbs={CRUMBS}
      />
      <Philosophy />
      <Facilities />
      <ContactBand />
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
