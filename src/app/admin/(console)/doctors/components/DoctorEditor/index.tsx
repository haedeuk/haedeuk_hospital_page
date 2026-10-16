import { notFound } from 'next/navigation';
import { getDoctor } from '@/lib/repository/doctors';
import DoctorForm from '../DoctorForm';

// 수정 화면 컨테이너: 의사를 불러와 폼에 넘긴다.
export default async function DoctorEditor({ id, photoFailed }: { id: string; photoFailed: boolean }) {
  const doctor = await getDoctor(id);

  if (!doctor) notFound();

  return <DoctorForm doctor={doctor} photoFailed={photoFailed} />;
}
