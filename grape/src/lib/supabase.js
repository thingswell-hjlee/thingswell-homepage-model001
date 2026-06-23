/**
 * @deprecated 이 파일은 더 이상 사용되지 않습니다.
 * AWS API Gateway + DynamoDB + Cognito로 마이그레이션되었습니다.
 * 
 * 새 코드에서는 다음 모듈을 사용하세요:
 * - API 호출: src/lib/api.js
 * - 인증: src/lib/auth.js
 * - 파일 저장소: src/lib/storage.js
 * 
 * 이 파일은 호환성을 위해 유지되지만, 실제 기능은 제공하지 않습니다.
 */

console.warn(
  '[Deprecated] supabase.js는 더 이상 사용되지 않습니다. ' +
  'src/lib/api.js, src/lib/auth.js, src/lib/storage.js를 사용하세요.'
);

// 더미 supabase 객체 - 사용 시 경고 표시
const createDeprecatedProxy = (path = 'supabase') => {
  return new Proxy({}, {
    get(target, prop) {
      if (prop === 'then' || prop === 'catch' || typeof prop === 'symbol') {
        return undefined;
      }
      console.warn(`[Deprecated] ${path}.${String(prop)} 호출됨. src/lib/api.js를 사용하세요.`);
      return (...args) => {
        console.warn(`[Deprecated] ${path}.${String(prop)}() 호출됨. src/lib/api.js를 사용하세요.`);
        return createDeprecatedProxy(`${path}.${String(prop)}()`);
      };
    }
  });
};

export const supabase = createDeprecatedProxy('supabase');
