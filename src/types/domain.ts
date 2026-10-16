import type { FeeCategory } from '@/constants/fees';

export interface Doctor {
  id: string;
  name: string;
  position: string;
  careers: string[];
  photoPath: string | null;
  photoUrl: string | null;
  sortOrder: number;
  isPublished: boolean;
  updatedAt: string;
}

export interface Fee {
  id: string;
  category: FeeCategory;
  name: string;
  amount: number | null;
  pricePrefix: string | null;
  sortOrder: number;
  updatedAt: string;
}

export interface FeeGroup {
  category: FeeCategory;
  fees: Fee[];
}
