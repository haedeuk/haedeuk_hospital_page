import DoctorForm from '../components/DoctorForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '의사 추가' };

export default function NewDoctorPage() {
  return <DoctorForm />;
}
