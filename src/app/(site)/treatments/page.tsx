import Link from 'next/link';
import ContactBand from '@/components/ContactBand';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { TREATMENTS } from '@/constants/treatments';
import { breadcrumbJsonLd, therapiesJsonLd } from '@/lib/seo/jsonLd';
import { createPageMetadata } from '@/lib/seo/metadata';
import ClinicPrograms from './components/ClinicPrograms';
import TreatmentNav from './components/TreatmentNav';
import TreatmentSection from './components/TreatmentSection';
import styles from './Treatments.module.scss';

const CRUMBS = [{ name: '진료항목', path: '/treatments' }];

export const metadata = createPageMetadata({
  title: '진료항목',
  description:
    '해득금천한의원 진료항목 — 교통사고 치료(자동차보험), 추나요법, 약침·봉침, 통증매선, 체질 맞춤 한약, 365일 입원 치료를 안내합니다.',
  path: '/treatments',
  keywords: ['교통사고 한의원', '자동차보험 한의원', '추나요법', '약침', '봉침', '매선', '한약', '한방 입원'],
});

export default function TreatmentsPage() {
  return (
    <>
      <PageHeader
        title="진료항목"
        description="교통사고 후유증과 통증 치료, 체질 한약, 입원 치료를 합니다."
        crumbs={CRUMBS}
      />
      <TreatmentNav />
      <div className={styles.treatments}>
        {TREATMENTS.map((treatment, index) => (
          <TreatmentSection key={treatment.id} treatment={treatment} isReversed={index % 2 === 1} />
        ))}
        <p className={styles.treatments__note}>
          치료 방법과 기간은 진찰 결과에 따라 달라질 수 있습니다. 비급여 항목의 비용은{' '}
          <Link href="/fees">비급여 진료비용</Link>에서 확인하실 수 있습니다.
        </p>
      </div>
      <ClinicPrograms />
      <ContactBand />
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
      <JsonLd data={therapiesJsonLd(TREATMENTS)} />
    </>
  );
}
