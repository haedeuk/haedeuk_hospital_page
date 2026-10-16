'use client';

import ButtonLink from '@/components/ButtonLink';
import ErrorState from '@/components/ErrorState';
import { PhoneIcon } from '@/components/Icons';
import { CLINIC } from '@/constants/clinic';
import styles from './SiteError.module.scss';

// 공개 페이지의 데이터를 받지 못했을 때. 헤더·푸터는 그대로 두고 본문만 바꾼다.
// 환자분이 막히지 않도록 전화 문의를 늘 함께 보여 준다.
export default function SiteError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <ErrorState
      title="정보를 잠시 불러오지 못했습니다"
      description={'잠시 후 다시 시도해 주세요.\n급하신 경우 전화로 문의해 주시면 바로 안내해 드립니다.'}
      offlineDescription={'인터넷 연결을 확인한 뒤 다시 시도해 주세요.\n전화 문의는 언제든 가능합니다.'}
      code={error.digest}
      actions={
        <>
          <button type="button" className={styles.retry} onClick={() => retry()}>
            다시 시도
          </button>
          <ButtonLink href={CLINIC.phoneHref} variant="secondary" icon={<PhoneIcon size={18} />}>
            {CLINIC.phone}
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            홈으로
          </ButtonLink>
        </>
      }
    />
  );
}
