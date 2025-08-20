import { supabase } from '../lib/supabase';

// RLS 정책 확인 및 설정
export const setupTrackRecordRLS = async () => {
  try {
    // 간단한 테스트 쿼리로 RLS 상태 확인
    const { data, error } = await supabase
      .from('Track_record')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Track_record 테이블 접근 오류:', error);
      
      // RLS 정책이 필요한 경우 안내
      if (error.message.includes('row-level security policy')) {
        console.log('RLS 정책이 필요합니다. 다음 정책을 Supabase 대시보드에서 실행하세요:');
        createTrackRecordPolicies();
        return false;
      }
    } else {
      console.log('Track_record 테이블 접근 성공');
    }

    return true;
  } catch (error) {
    console.error('RLS 설정 확인 중 오류:', error);
    return false;
  }
};

// 임시로 RLS를 비활성화하는 함수 (개발용)
export const disableTrackRecordRLS = async () => {
  try {
    // 이 함수는 Supabase 대시보드에서 직접 실행해야 합니다
    console.log('RLS를 비활성화하려면 Supabase 대시보드에서 다음 SQL을 실행하세요:');
    console.log('ALTER TABLE track_record DISABLE ROW LEVEL SECURITY;');
    
    return false;
  } catch (error) {
    console.error('RLS 비활성화 중 오류:', error);
    return false;
  }
};

// RLS 정책 생성 (Supabase 대시보드에서 실행)
export const createTrackRecordPolicies = () => {
  const policies = [
    // 모든 사용자가 읽기 가능
    `CREATE POLICY "Enable read access for all users" ON "public"."track_record"
     FOR SELECT USING (true);`,
    
    // 인증된 사용자가 삽입 가능
    `CREATE POLICY "Enable insert for authenticated users only" ON "public"."track_record"
     FOR INSERT WITH CHECK (auth.role() = 'authenticated');`,
    
    // 인증된 사용자가 업데이트 가능
    `CREATE POLICY "Enable update for authenticated users only" ON "public"."track_record"
     FOR UPDATE USING (auth.role() = 'authenticated');`,
    
    // 인증된 사용자가 삭제 가능
    `CREATE POLICY "Enable delete for authenticated users only" ON "public"."track_record"
     FOR DELETE USING (auth.role() = 'authenticated');`
  ];

  console.log('Supabase 대시보드에서 다음 SQL을 실행하세요:');
  policies.forEach((policy, index) => {
    console.log(`\n--- 정책 ${index + 1} ---`);
    console.log(policy);
  });

  return policies;
};

// 현재 사용자 인증 상태 확인
export const checkUserAuthStatus = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('사용자 인증 상태 확인 실패:', error);
      return { isAuthenticated: false, user: null, error };
    }
    
    console.log('현재 사용자:', user);
    console.log('인증 상태:', !!user);
    
    return { isAuthenticated: !!user, user, error: null };
  } catch (error) {
    console.error('인증 상태 확인 중 오류:', error);
    return { isAuthenticated: false, user: null, error };
  }
};

// Storage 정책 설정 안내
export const setupStoragePolicies = () => {
  const storagePolicies = [
    // Storage 버킷 생성
    `-- Storage 버킷 생성 (Supabase 대시보드 > Storage에서 실행)
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('track_record', 'track_record', true)
    ON CONFLICT (id) DO NOTHING;`,
    
    // Storage RLS 비활성화 (개발용 - 간단한 해결책)
    `-- Storage RLS 비활성화 (Supabase 대시보드 > SQL Editor에서 실행)
    ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;`,
    
    // 또는 더 간단한 정책 (RLS를 유지하려면)
    `-- 모든 사용자가 모든 작업 가능 (주의: 보안상 위험할 수 있음)
    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    CREATE POLICY "Public Access" ON storage.objects
     FOR ALL USING (bucket_id = 'track_record');`
  ];

  console.log('=== Storage 설정 단계별 가이드 ===');
  console.log('1. Supabase 대시보드 > Storage로 이동');
  console.log('2. "New bucket" 클릭');
  console.log('3. Bucket name: "track_record" 입력');
  console.log('4. "Public bucket" 체크');
  console.log('5. "Create bucket" 클릭');
  console.log('');
  console.log('6. Supabase 대시보드 > SQL Editor로 이동');
  console.log('7. 기존 정책 삭제 후 새로운 정책 생성:');
  console.log('');
  console.log('-- 기존 정책 삭제');
  console.log('DROP POLICY IF EXISTS "Public Access" ON storage.objects;');
  console.log('DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;');
  console.log('');
  console.log('-- 모든 사용자가 track_record 버킷에 업로드 가능');
  console.log('CREATE POLICY "Allow all operations on track_record" ON storage.objects');
  console.log('FOR ALL USING (bucket_id = \'track_record\');');
  console.log('');
  console.log('-- 또는 RLS를 완전히 비활성화 (가장 간단한 방법)');
  console.log('ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;');
  console.log('');
  console.log('⚠️  주의: 개발 환경에서만 사용하세요. 프로덕션에서는 적절한 보안 정책을 설정하세요.');
  
  storagePolicies.forEach((policy, index) => {
    console.log(`\n--- Storage 정책 ${index + 1} ---`);
    console.log(policy);
  });

  return storagePolicies;
};

// 필요한 정책 확인 및 생성 안내
export const checkAndCreateMissingPolicies = async () => {
  try {
    // 실제 테이블 접근 테스트로 정책 상태 확인
    const { data, error } = await supabase
      .from('Track_record')
      .select('*')
      .limit(1);

    if (error) {
      if (error.message.includes('row-level security policy')) {
        console.log('RLS 정책이 필요합니다. 다음 SQL을 Supabase 대시보드에서 실행하세요:');
        console.log(`
-- 1. 모든 사용자가 읽기 가능
CREATE POLICY "Enable read access for all users" ON "public"."track_record"
FOR SELECT USING (true);

-- 2. 인증된 사용자가 삽입 가능
CREATE POLICY "Enable insert for authenticated users only" ON "public"."track_record"
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. 인증된 사용자가 업데이트 가능
CREATE POLICY "Enable update for authenticated users only" ON "public"."track_record"
FOR UPDATE USING (auth.role() = 'authenticated');

-- 4. 인증된 사용자가 삭제 가능
CREATE POLICY "Enable delete for authenticated users only" ON "public"."track_record"
FOR DELETE USING (auth.role() = 'authenticated');
        `);
      } else {
        console.error('테이블 접근 오류:', error);
      }
    } else {
      console.log('Track_record 테이블 접근 성공 - 정책이 올바르게 설정되어 있습니다.');
    }
  } catch (error) {
    console.error('정책 확인 중 오류:', error);
  }
};
