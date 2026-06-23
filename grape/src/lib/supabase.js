/**
 * @deprecated Supabase 클라이언트 - AWS API Gateway로 마이그레이션 중
 * 
 * 새 코드에서는 다음 모듈을 사용하세요:
 * - API 호출: src/lib/api.js
 * - 인증: src/lib/auth.js
 * - 파일 저장소: src/lib/storage.js
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 환경 변수가 없는 경우 경고 (AWS 마이그레이션 중에는 정상)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Deprecated] Supabase 환경 변수가 설정되지 않았습니다. AWS API로 마이그레이션되었습니다.');
  console.warn('아직 Supabase를 사용하는 컴포넌트는 src/lib/api.js로 전환해주세요.');
}

// Supabase 클라이언트 생성 (환경변수 없으면 더미 URL 사용)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
); 