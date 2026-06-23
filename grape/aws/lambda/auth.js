/**
 * Auth Lambda Handler (Optional/Reference)
 * 
 * 프론트엔드에서 AWS Cognito SDK (amazon-cognito-identity-js)를 직접 사용하여
 * 인증을 처리하므로, 별도의 인증 Lambda는 필요하지 않습니다.
 * 
 * 이 파일은 참고용으로, 만약 서버사이드 인증 프록시가 필요한 경우 사용할 수 있습니다.
 * 
 * 프론트엔드 인증 흐름:
 *   1. 로그인: Cognito SDK로 직접 signIn
 *   2. 토큰 관리: Cognito SDK가 자동으로 처리 (localStorage)
 *   3. API 호출: Authorization 헤더에 ID Token 포함
 *   4. 로그아웃: Cognito SDK로 직접 signOut
 * 
 * API Gateway의 Cognito Authorizer가 토큰 검증을 자동으로 처리합니다.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Content-Type': 'application/json',
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}

/**
 * 이 핸들러는 현재 사용되지 않습니다.
 * 프론트엔드에서 Cognito SDK를 직접 사용합니다.
 * 
 * 향후 서버사이드 세션 관리가 필요한 경우 활성화할 수 있습니다.
 */
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return response(200, {});
  }

  return response(200, {
    message: 'Auth is handled client-side via Cognito SDK.',
    info: 'This endpoint is reserved for future server-side auth needs.',
  });
};
