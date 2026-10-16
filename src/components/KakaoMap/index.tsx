'use client';

import { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker, useKakaoLoader, ZoomControl } from 'react-kakao-maps-sdk';
import { MapPinIcon } from '@/components/Icons';
import { CLINIC, CLINIC_LINKS } from '@/constants/clinic';
import styles from './KakaoMap.module.scss';

const APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

function MapFallback({ message }: { message: string }) {
  return (
    <div className={styles.map__fallback}>
      <MapPinIcon size={28} />
      <p>{message}</p>
      <a href={CLINIC_LINKS.naverPlace} target="_blank" rel="noopener noreferrer">
        네이버 지도에서 보기
      </a>
    </div>
  );
}

function MapCanvas({ appKey }: { appKey: string }) {
  const [loading, error] = useKakaoLoader({ appkey: appKey });

  if (error) return <MapFallback message="지도를 불러오지 못했습니다." />;
  if (loading) return <div className={styles.map__loading} aria-hidden="true" />;

  return (
    <Map
      center={CLINIC.geo.center}
      level={3}
      zoomable={false}
      className={styles.map__canvas}
      style={{ width: '100%', height: '100%' }}
    >
      <ZoomControl position="RIGHT" />
      <MapMarker position={CLINIC.geo.marker} title={CLINIC.name} />
      <CustomOverlayMap position={CLINIC.geo.marker} yAnchor={2.4}>
        <span className={styles.map__label}>{CLINIC.name}</span>
      </CustomOverlayMap>
    </Map>
  );
}

// 카카오 SDK 는 무겁다. 지도가 화면 근처에 왔을 때만 불러온다.
export default function KakaoMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !APP_KEY) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNear(true);
        observer.disconnect();
      },
      { rootMargin: '200px' },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.map} ${className ?? ''}`} role="region" aria-label={`${CLINIC.name} 위치 지도`}>
      {!APP_KEY && <MapFallback message={CLINIC.address.full} />}
      {APP_KEY && isNear && <MapCanvas appKey={APP_KEY} />}
    </div>
  );
}
