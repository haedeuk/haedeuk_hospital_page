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
      '해득금천한의원 비급여 진료비용 고지 — 입원실, 체질 한약, 공진단·경옥고, 약침, 매선, 추나, 치료재료, 제증명 수수료 항목별 금액을 안내합니다.',
    path: '/fees',
    keywords: ['한의원 비급여', '비급여 진료비용', '공진단 가격', '약침 비용', '매선 비용'],
  });
}

export default function FeesPage() {
  return (
    <>
      <PageHeader
        title={`${currentYear()}년 비급여 진료비용`}
        description="의료법 제45조에 따라 비급여 진료비용을 고지합니다."
        crumbs={CRUMBS}
      />
      <FeeTable />
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
