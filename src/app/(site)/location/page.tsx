import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { CLINIC } from '@/constants/clinic';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';
import { createPageMetadata } from '@/lib/seo/metadata';
import LocationInfo from './components/LocationInfo';

const CRUMBS = [{ name: '오시는 길', path: '/location' }];

export const metadata = createPageMetadata({
  title: '오시는 길과 진료시간',
  description: `${CLINIC.address.full}, ${CLINIC.address.landmark}. 평일 오전 8시~오후 9시, 주말·공휴일 오전 8시~오후 5시 진료. 전화 ${CLINIC.phone}.`,
  path: '/location',
  keywords: ['해득금천한의원 위치', '시흥사거리 한의원', '금하로 한의원', '금천구 야간 한의원', '주말 진료 한의원'],
});

export default function LocationPage() {
  return (
    <>
      <PageHeader title="오시는 길" description={CLINIC.address.full} crumbs={CRUMBS} />
      <LocationInfo />
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
