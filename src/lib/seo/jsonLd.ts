import { CLINIC, CLINIC_ACCESS, CLINIC_LINKS, OPENING_HOURS } from '@/constants/clinic';
import { SITE_DESCRIPTION, SITE_URL } from '@/constants/site';
import type { Treatment } from '@/constants/treatments';
import type { Doctor } from '@/types/domain';

const CLINIC_ID = `${SITE_URL}/#clinic`;

// 검색엔진이 지역 의료기관으로 인식하도록 하는 기본 정보 (모든 공개 페이지)
export function clinicJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': CLINIC_ID,
    name: CLINIC.name,
    alternateName: CLINIC.nameEn,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    telephone: CLINIC.phoneInternational,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLINIC.address.street,
      addressLocality: CLINIC.address.locality,
      addressRegion: CLINIC.address.region,
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CLINIC.geo.marker.lat,
      longitude: CLINIC.geo.marker.lng,
    },
    openingHoursSpecification: OPENING_HOURS.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.days.map((day) => `https://schema.org/${day}`),
      opens: hours.open,
      closes: hours.close,
    })),
    hasMap: CLINIC_LINKS.naverPlace,
    paymentAccepted: CLINIC_ACCESS.payments.join(', '),
    amenityFeature: CLINIC_ACCESS.amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    sameAs: [CLINIC_LINKS.naverPlace, CLINIC_LINKS.naverBlog],
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: '홈', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export function physiciansJsonLd(doctors: readonly Doctor[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': doctors.map((doctor) => ({
      '@type': 'Person',
      name: doctor.name,
      jobTitle: `${doctor.position} (한의사)`,
      description: doctor.careers.slice(0, 5).join(', '),
      ...(doctor.photoUrl ? { image: doctor.photoUrl } : {}),
      worksFor: { '@id': CLINIC_ID },
    })),
  };
}

export function therapiesJsonLd(treatments: readonly Treatment[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: treatments.map((treatment, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/treatments#${treatment.id}`,
      item: {
        '@type': 'MedicalTherapy',
        name: treatment.title,
        description: treatment.summary,
      },
    })),
  };
}
