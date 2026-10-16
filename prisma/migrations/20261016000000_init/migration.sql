-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "doctors" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(30) NOT NULL,
    "position" VARCHAR(30) NOT NULL,
    "careers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "photo_path" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fees" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "category" VARCHAR(20) NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "amount" INTEGER,
    "price_prefix" VARCHAR(10),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE INDEX "doctors_sort_order_idx" ON "doctors"("sort_order");

-- CreateIndex
CREATE INDEX "fees_category_sort_order_idx" ON "fees"("category", "sort_order");


-- ─────────────────────────────────────────────────────────────────
-- 아래는 Prisma 로 표현할 수 없어 직접 보강한 부분
-- ─────────────────────────────────────────────────────────────────

-- 값 제약
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_name_not_blank" CHECK (char_length(btrim("name")) > 0);
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_position_not_blank" CHECK (char_length(btrim("position")) > 0);
ALTER TABLE "fees" ADD CONSTRAINT "fees_category_check" CHECK ("category" IN ('행위료', '치료재료대', '제증명수수료'));
ALTER TABLE "fees" ADD CONSTRAINT "fees_name_not_blank" CHECK (char_length(btrim("name")) > 0);
ALTER TABLE "fees" ADD CONSTRAINT "fees_amount_non_negative" CHECK ("amount" IS NULL OR "amount" >= 0);

-- Supabase Data API(공개 키로 부르는 REST) 차단.
-- 앱은 서버에서 Prisma(postgres 역할)로만 읽고 쓰므로 anon·authenticated 에게 열어 둘 이유가 없다.
-- RLS 를 켜고 정책을 두지 않으면 Data API 로는 아무것도 보이지 않는다.
ALTER TABLE "doctors" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "fees" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "admins" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON "doctors", "fees", "admins" FROM anon, authenticated;

-- 스토리지 정책이 쓰는 관리자 판별. 로그인한 사람의 이메일이 admins 에 있는지 본다.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admins
    WHERE lower(email) = lower(coalesce((SELECT auth.jwt() ->> 'email'), ''))
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 의사 사진 버킷. 공개 버킷이라 읽기는 공개 URL 로 된다. 쓰기·삭제만 관리자에게 연다.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('doctor-photos', 'doctor-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- 삭제(remove)는 대상 객체를 select 할 수 있어야 동작한다.
CREATE POLICY "doctor_photos_select_admin" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'doctor-photos' AND (SELECT public.is_admin()));

CREATE POLICY "doctor_photos_insert_admin" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'doctor-photos' AND (SELECT public.is_admin()));

CREATE POLICY "doctor_photos_update_admin" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'doctor-photos' AND (SELECT public.is_admin()))
  WITH CHECK (bucket_id = 'doctor-photos' AND (SELECT public.is_admin()));

CREATE POLICY "doctor_photos_delete_admin" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'doctor-photos' AND (SELECT public.is_admin()));
