import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';
import { createPageMetadata } from '@/lib/seo/metadata';
import FeeTable from './components/FeeTable';
import type { Metadata } from 'next';

const CRUMBS = [{ name: '비급여 진료비용', path: '/fees' }];

export const revalidate = 600;

function currentYear() {
  return new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric' }).replace(/\D/g, '');
}

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: `${currentYear()}년 비급여 진료비용`,
    description:
      '해득금천한의원 비급여 진료비용 안내 — 입원실, 한약, 약침, 매선, 추나, 치료재료, 제증명 수수료 항목을 확인하실 수 있습니다.',
    path: '/fees',
    keywords: ['한의원 비급여', '비급여 진료비용'],
  });
}

export default function FeesPage() {
  return (
    <>
      <PageHeader
        title={`${currentYear()}년 비급여 진료비용`}
        description="비급여 항목의 진료비용을 안내해 드립니다."
        crumbs={CRUMBS}
      />
      <FeeTable />
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
