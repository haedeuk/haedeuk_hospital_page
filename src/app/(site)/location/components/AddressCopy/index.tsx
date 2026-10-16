'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from '@/components/Icons';
import styles from './AddressCopy.module.scss';

export default function AddressCopy({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 권한이 없으면 버튼만 그대로 둔다 — 주소는 화면에 이미 보인다.
    }
  };

  return (
    <button type="button" className={styles.copy} onClick={copy}>
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      <span aria-live="polite">{copied ? '복사했습니다' : '주소 복사'}</span>
    </button>
  );
}
