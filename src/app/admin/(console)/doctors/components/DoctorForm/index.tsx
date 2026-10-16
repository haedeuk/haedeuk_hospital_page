'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import Field from '@/components/admin/Field';
import FormMessage from '@/components/admin/FormMessage';
import SubmitButton from '@/components/admin/SubmitButton';
import { INITIAL_FORM_STATE } from '@/types/formState';
import { joinCareers } from '@/utils/ts/careers';
import type { Doctor } from '@/types/domain';
import type { FormState } from '@/types/formState';
import { saveDoctor } from '../../actions';
import styles from './DoctorForm.module.scss';
import type { ChangeEvent } from 'react';

interface DoctorFormProps {
  doctor?: Doctor;
  photoFailed?: boolean;
}

const POSITIONS = ['대표원장', '진료원장'];

// 입력값을 상태로 들고 있어야 React 19 의 폼 자동 초기화 뒤에도 오류 화면에서 값이 남는다.
export default function DoctorForm({ doctor, photoFailed = false }: DoctorFormProps) {
  const [name, setName] = useState(doctor?.name ?? '');
  const [position, setPosition] = useState(doctor?.position ?? '진료원장');
  const [careers, setCareers] = useState(joinCareers(doctor?.careers ?? []));
  const [isPublished, setIsPublished] = useState(doctor?.isPublished ?? true);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  const initialState: FormState = photoFailed
    ? { status: 'error', message: '정보는 저장했지만 사진을 올리지 못했습니다. 사진만 다시 올려 주세요.' }
    : INITIAL_FORM_STATE;
  const [state, formAction] = useActionState(async (prev: FormState, formData: FormData) => {
    const result = await saveDoctor(prev, formData);
    // 오류가 나면 파일 칸이 비워지므로 미리보기도 함께 지운다.
    if (result.status === 'error') setSelectedPreview(null);
    return result;
  }, initialState);

  useEffect(() => () => {
    if (selectedPreview) URL.revokeObjectURL(selectedPreview);
  }, [selectedPreview]);

  const onPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedPreview(file ? URL.createObjectURL(file) : null);
    if (file) setRemovePhoto(false);
  };

  const preview = selectedPreview ?? (removePhoto ? null : doctor?.photoUrl ?? null);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.form__head}>
        <Link className={styles.form__back} href="/admin/doctors">
          ← 의료진 목록
        </Link>
        <h1 className={styles.form__title}>{doctor ? `${doctor.name} 정보 수정` : '의사 추가'}</h1>
      </div>

      {doctor && <input type="hidden" name="id" value={doctor.id} />}

      <div className={styles.form__grid}>
        <section className={styles.form__photo} aria-label="사진">
          <div className={styles.form__preview}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="선택한 사진 미리보기" />
            ) : (
              <span className={styles.form__monogram} aria-hidden="true">
                {name.charAt(0) || '?'}
              </span>
            )}
          </div>
          <Field
            id="photo"
            label="사진"
            hint="JPG·PNG·WEBP, 5MB 이하. 얼굴이 위쪽에 오는 세로 사진이 잘 어울립니다."
            errors={errors.photo}
          >
            <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={onPhotoChange} />
          </Field>
          {doctor?.photoUrl && !selectedPreview && (
            <label className={styles.form__check}>
              <input
                type="checkbox"
                name="removePhoto"
                checked={removePhoto}
                onChange={(event) => setRemovePhoto(event.target.checked)}
              />
              사진 지우기 (이니셜로 표시)
            </label>
          )}
        </section>

        <section className={styles.form__fields} aria-label="기본 정보">
          <Field id="name" label="이름" errors={errors.name}>
            <input id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={30} />
          </Field>
          <Field id="position" label="직함" hint="목록에서 고르거나 직접 입력하세요." errors={errors.position}>
            <input
              id="position"
              name="position"
              list="position-options"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
              required
              maxLength={30}
            />
          </Field>
          <datalist id="position-options">
            {POSITIONS.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
          <Field
            id="careers"
            label="학력 · 경력"
            hint="한 줄에 하나씩 적어 주세요. ‘현)’ ‘전)’으로 시작하면 홈페이지에 표시가 붙습니다."
            errors={errors.careers}
          >
            <textarea
              id="careers"
              name="careers"
              rows={12}
              value={careers}
              onChange={(event) => setCareers(event.target.value)}
              placeholder={'현) 해득금천한의원 진료원장\n전) ○○한의원 진료원장\n○○대학교 한의과대학 졸업'}
            />
          </Field>
          <label className={styles.form__check}>
            <input
              type="checkbox"
              name="isPublished"
              checked={isPublished}
              onChange={(event) => setIsPublished(event.target.checked)}
            />
            홈페이지에 노출
          </label>
        </section>
      </div>

      <div className={styles.form__footer}>
        <FormMessage state={state} />
        <div className={styles.form__buttons}>
          <Link className={styles.form__cancel} href="/admin/doctors">
            취소
          </Link>
          <SubmitButton pendingLabel="저장 중…">저장</SubmitButton>
        </div>
      </div>
    </form>
  );
}
