import path from 'node:path';
import type { NextConfig } from 'next';

// 의사 사진은 Supabase Storage 공개 버킷에서 온다. next/image 가 최적화할 수 있게 호스트를 연다.
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  // SCSS 에서 "styles/..." 로 토큰을 가져오기 위한 로드 경로. sass 는 tsconfig paths 를 모른다.
  sassOptions: {
    loadPaths: [path.join(process.cwd(), 'src')],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: supabaseHost
      ? [{ protocol: 'https', hostname: supabaseHost, pathname: '/storage/v1/object/public/doctor-photos/**' }]
      : [],
  },

  experimental: {
    // 의사 사진 업로드(최대 5MB) + multipart 여유분.
    serverActions: { bodySizeLimit: '6mb' },
  },

  async redirects() {
    // 기존 사이트의 비급여 주소를 검색엔진이 기억하고 있다.
    return [{ source: '/cost', destination: '/fees', permanent: true }];
  },

  async headers() {
    // 관리자 화면은 어떤 경로로 들어와도 색인되지 않게 한다. robots.txt 에는 적지 않는다(경로가 드러난다).
    return [
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ];
  },

  poweredByHeader: false,
  devIndicators: { position: 'bottom-right' },
};

export default nextConfig;
