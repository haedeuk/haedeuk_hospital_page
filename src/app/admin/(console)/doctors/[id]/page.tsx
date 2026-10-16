import DoctorEditor from '../components/DoctorEditor';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '의사 정보 수정' };

interface EditDoctorPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ photo?: string }>;
}

export default async function EditDoctorPage({ params, searchParams }: EditDoctorPageProps) {
  const [{ id }, { photo }] = await Promise.all([params, searchParams]);

  return <DoctorEditor id={id} photoFailed={photo === 'failed'} />;
}
