import { supabase } from '../lib/supabase';

// 테이블 존재 여부 확인 (필요한 경우에만 사용)
export const checkTableExists = async (tableName) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST205') {
        console.log(`${tableName} 테이블이 존재하지 않습니다.`);
        return false;
      }
      console.error(`${tableName} 테이블 접근 오류:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`${tableName} 테이블 확인 중 오류:`, error);
    return false;
  }
};

// 특정 테이블의 RLS 정책 확인
export const checkTableRLS = async (tableName) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);

    if (error) {
      if (error.message.includes('row-level security policy')) {
        console.log(`${tableName} 테이블에 RLS 정책이 필요합니다.`);
        return { hasRLS: true, needsPolicy: true };
      }
      return { hasRLS: false, error };
    }

    return { hasRLS: false, needsPolicy: false };
  } catch (error) {
    console.error(`${tableName} RLS 확인 중 오류:`, error);
    return { hasRLS: false, error };
  }
};

// 특정 테이블의 RLS 비활성화 안내 (개발용)
export const disableTableRLS = (tableName) => {
  console.log(`${tableName} 테이블의 RLS를 비활성화하려면 Supabase 대시보드에서 다음 SQL을 실행하세요:`);
  console.log(`ALTER TABLE ${tableName} DISABLE ROW LEVEL SECURITY;`);

  return `ALTER TABLE ${tableName} DISABLE ROW LEVEL SECURITY;`;
};

// createTablePolicies 함수로 대체됨 - 이전 버전과의 호환성 유지
export const createTrackRecordPolicies = () => {
  return createTablePolicies('track_record');
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
    ON CONFLICT (id) DO NOTHING;
    
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('product', 'product', true)
    ON CONFLICT (id) DO NOTHING;`,
    
    // Storage RLS 비활성화 (개발용 - 간단한 해결책)
    `-- Storage RLS 비활성화 (Supabase 대시보드 > SQL Editor에서 실행)
    ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;`,
    
    // 또는 더 간단한 정책 (RLS를 유지하려면)
    `-- 모든 사용자가 모든 작업 가능 (주의: 보안상 위험할 수 있음)
    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    CREATE POLICY "Public Access" ON storage.objects
     FOR ALL USING (bucket_id IN ('track_record', 'product'));`
  ];



  
  storagePolicies.forEach((policy, index) => {
    console.log(`\n--- Storage 정책 ${index + 1} ---`);
    console.log(policy);
  });

  return storagePolicies;
};

// 특정 테이블의 정책 생성 안내
export const createTablePolicies = (tableName) => {
  const policies = [
    // 모든 사용자가 읽기 가능
    `CREATE POLICY "Enable read access for all users" ON "public"."${tableName}"
     FOR SELECT USING (true);`,

    // 인증된 사용자가 삽입 가능
    `CREATE POLICY "Enable insert for authenticated users only" ON "public"."${tableName}"
     FOR INSERT WITH CHECK (auth.role() = 'authenticated');`,

    // 인증된 사용자가 업데이트 가능
    `CREATE POLICY "Enable update for authenticated users only" ON "public"."${tableName}"
     FOR UPDATE USING (auth.role() = 'authenticated');`,

    // 인증된 사용자가 삭제 가능
    `CREATE POLICY "Enable delete for authenticated users only" ON "public"."${tableName}"
     FOR DELETE USING (auth.role() = 'authenticated');`
  ];

  console.log(`${tableName} 테이블에 대한 RLS 정책을 생성하려면 다음 SQL을 실행하세요:`);
  policies.forEach((policy, index) => {
    console.log(`\n--- 정책 ${index + 1} ---`);
    console.log(policy);
  });

  return policies;
};
