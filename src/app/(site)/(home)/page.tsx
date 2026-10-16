import { SITE_DEFAULT_TITLE } from '@/constants/site';
import BentoGallery from './components/BentoGallery';
import DoctorPreview from './components/DoctorPreview';
import Hero from './components/Hero';
import Strengths from './components/Strengths';
import TreatmentTiles from './components/TreatmentTiles';
import VisitInfo from './components/VisitInfo';
import WeekHours from './components/WeekHours';
import type { Metadata } from 'next';

// 의사 미리보기가 DB 에서 온다. 관리자 저장 시 즉시 갱신되고, 그 밖의 변경도 10분 안에 반영된다.
export const revalidate = 600;

export const metadata: Metadata = {
  title: { absolute: SITE_DEFAULT_TITLE },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WeekHours />
      <Strengths />
      <TreatmentTiles />
      <DoctorPreview />
      <BentoGallery />
      <VisitInfo />
    </>
  );
}
