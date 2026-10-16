import { CheckIcon } from '@/components/Icons';
import styles from './SavedNotice.module.scss';

export default function SavedNotice() {
  return (
    <p className={styles.notice} role="status">
      <CheckIcon size={18} />
      저장했습니다. 홈페이지에도 바로 반영됩니다.
    </p>
  );
}
