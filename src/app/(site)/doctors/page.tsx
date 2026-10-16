import ContactBand from '@/components/ContactBand';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { getPublishedDoctors } from '@/lib/repository/doctors';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';
import { createPageMetadata } from '@/lib/seo/metadata';
import DoctorList from './components/DoctorList';
import type { Metadata } from 'next';

const CRUMBS = [{ name: '의료진 소개', path: '/doctors' }];

export const revalidate = 600;

// 설명문에 실제 원장님 이름이 들어가야 이름으로 검색했을 때 이 페이지가 잡힌다.
export async function generateMetadata(): Promise<Metadata> {
  const doctors = await getPublishedDoctors();
  const names = doctors.map((doctor) => `${doctor.name} ${doctor.position}`).join(', ');

  return createPageMetadata({
    title: '의료진 소개',
    description: names
      ? `해득금천한의원 의료진 — ${names}. 원장님들의 학력과 경력을 소개합니다.`
      : '해득금천한의원 원장님들의 학력과 경력을 소개합니다.',
    path: '/doctors',
    keywords: ['해득금천한의원 원장', '금천구 한의사', ...doctors.map((doctor) => doctor.name)],
  });
}

export default function DoctorsPage() {
  return (
    <>
      <PageHeader
        title="의료진 소개"
        description="진료실에서 직접 뵙게 될 해득금천한의원 원장님들을 소개합니다."
        crumbs={CRUMBS}
      />
      <DoctorList />
      <ContactBand />
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
