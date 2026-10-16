import { CLINIC } from '@/constants/clinic';
import { SITE_DESCRIPTION } from '@/constants/site';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CLINIC.name,
    short_name: '해득금천',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    lang: 'ko',
    background_color: '#FAF9F7',
    theme_color: '#FAF9F7',
    icons: [{ src: '/favicon.ico', sizes: '64x64 32x32 24x24 16x16', type: 'image/x-icon' }],
  };
}
