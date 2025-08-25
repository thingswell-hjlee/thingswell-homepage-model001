-- Product 테이블에 is_active 필드 추가
ALTER TABLE "Product" 
ADD COLUMN "is_active" BOOLEAN DEFAULT true;

-- Track_record 테이블에 is_active 필드 추가
ALTER TABLE "Track_record" 
ADD COLUMN "is_active" BOOLEAN DEFAULT true;

-- 기존 데이터는 모두 활성화 상태로 설정
UPDATE "Product" SET "is_active" = true WHERE "is_active" IS NULL;
UPDATE "Track_record" SET "is_active" = true WHERE "is_active" IS NULL;

-- RLS 정책 업데이트 (관리자는 모든 항목을 볼 수 있고, 일반 사용자는 활성화된 항목만 볼 수 있음)
-- Product 테이블 정책
DROP POLICY IF EXISTS "Enable read access for all users" ON "Product";
CREATE POLICY "Enable read access for all users" ON "Product"
FOR SELECT USING (
  "is_active" = true OR 
  auth.role() = 'authenticated'
);

-- Track_record 테이블 정책
DROP POLICY IF EXISTS "Enable read access for all users" ON "Track_record";
CREATE POLICY "Enable read access for all users" ON "Track_record"
FOR SELECT USING (
  "is_active" = true OR 
  auth.role() = 'authenticated'
);
