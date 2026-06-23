/**
 * AWS Cognito 인증 모듈
 * Supabase Auth를 대체하는 Cognito USER_PASSWORD_AUTH 기반 인증
 * 
 * 외부 SDK 없이 Cognito Public API (InitiateAuth)를 직접 호출합니다.
 */

const COGNITO_REGION = import.meta.env.VITE_COGNITO_REGION || 'ap-northeast-2';
const COGNITO_USER_POOL_ID = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;

const COGNITO_ENDPOINT = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/`;

// localStorage 키
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'thingswell_access_token',
  ID_TOKEN: 'thingswell_id_token',
  REFRESH_TOKEN: 'thingswell_refresh_token',
  TOKEN_EXPIRY: 'thingswell_token_expiry',
  USER: 'thingswell_user',
};

// 인증 상태 변경 리스너들
let authListeners = [];

/**
 * Cognito API 호출 헬퍼
 */
const cognitoRequest = async (action, payload) => {
  try {
    const response = await fetch(COGNITO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': `AWSCognitoIdentityProviderService.${action}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || data.__type || '인증 요청 실패';
      return { data: null, error: { message: errorMessage, code: data.__type } };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: { message: error.message || '네트워크 오류' } };
  }
};

/**
 * JWT 토큰에서 페이로드 디코딩
 */
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

/**
 * 토큰 저장
 */
const saveTokens = (authResult) => {
  const { AccessToken, IdToken, RefreshToken, ExpiresIn } = authResult;
  
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, AccessToken);
  localStorage.setItem(STORAGE_KEYS.ID_TOKEN, IdToken);
  if (RefreshToken) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, RefreshToken);
  }
  
  const expiry = Date.now() + (ExpiresIn * 1000);
  localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiry.toString());
  
  // 사용자 정보를 ID 토큰에서 추출
  const decoded = decodeToken(IdToken);
  if (decoded) {
    const user = {
      id: decoded.sub,
      email: decoded.email,
      email_verified: decoded.email_verified,
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }
};

/**
 * 토큰 클리어
 */
const clearTokens = () => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};

/**
 * 인증 상태 변경 알림
 */
const notifyListeners = (event, session) => {
  authListeners.forEach((callback) => {
    try {
      callback(event, session);
    } catch (error) {
      console.error('Auth listener error:', error);
    }
  });
};

/**
 * 로그인
 * @param {string} email - 이메일 주소
 * @param {string} password - 비밀번호
 * @returns {{ data: { user, session }, error }}
 */
export const signIn = async (email, password) => {
  const { data, error } = await cognitoRequest('InitiateAuth', {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  if (error) {
    return { data: null, error };
  }

  if (data.AuthenticationResult) {
    saveTokens(data.AuthenticationResult);
    
    const session = getSessionSync();
    notifyListeners('SIGNED_IN', session);
    
    return {
      data: {
        user: session?.user || null,
        session,
      },
      error: null,
    };
  }

  // Challenge 응답이 필요한 경우 (예: NEW_PASSWORD_REQUIRED)
  if (data.ChallengeName) {
    return {
      data: null,
      error: {
        message: `인증 챌린지가 필요합니다: ${data.ChallengeName}`,
        challengeName: data.ChallengeName,
        session: data.Session,
      },
    };
  }

  return { data: null, error: { message: '알 수 없는 인증 응답' } };
};

/**
 * 로그아웃
 */
export const signOut = async () => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  
  // 서버 측 로그아웃 시도 (실패해도 로컬 토큰은 삭제)
  if (accessToken) {
    await cognitoRequest('GlobalSignOut', {
      AccessToken: accessToken,
    });
  }
  
  clearTokens();
  notifyListeners('SIGNED_OUT', null);
  
  return { error: null };
};

/**
 * 현재 세션 정보를 동기적으로 가져오기 (localStorage 기반)
 */
const getSessionSync = () => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  const idToken = localStorage.getItem(STORAGE_KEYS.ID_TOKEN);
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  const expiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);

  if (!accessToken || !idToken) {
    return null;
  }

  const user = userStr ? JSON.parse(userStr) : null;
  
  return {
    access_token: accessToken,
    id_token: idToken,
    refresh_token: refreshToken,
    expires_at: expiry ? parseInt(expiry) : null,
    user,
  };
};

/**
 * 토큰 갱신 (Refresh Token 사용)
 */
const refreshSession = async () => {
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  
  if (!refreshToken) {
    clearTokens();
    notifyListeners('SIGNED_OUT', null);
    return null;
  }

  const { data, error } = await cognitoRequest('InitiateAuth', {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: COGNITO_CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  });

  if (error || !data?.AuthenticationResult) {
    clearTokens();
    notifyListeners('SIGNED_OUT', null);
    return null;
  }

  // Refresh 응답에는 RefreshToken이 포함되지 않을 수 있음
  const authResult = {
    ...data.AuthenticationResult,
    RefreshToken: data.AuthenticationResult.RefreshToken || refreshToken,
  };
  
  saveTokens(authResult);
  const session = getSessionSync();
  notifyListeners('TOKEN_REFRESHED', session);
  
  return session;
};

/**
 * 현재 세션 가져오기 (만료시 갱신 시도)
 * @returns {{ data: { session }, error }}
 */
export const getSession = async () => {
  const session = getSessionSync();
  
  if (!session) {
    return { data: { session: null }, error: null };
  }

  // 토큰 만료 확인 (만료 5분 전에 갱신)
  const now = Date.now();
  const expiresAt = session.expires_at;
  const fiveMinutes = 5 * 60 * 1000;
  
  if (expiresAt && now > expiresAt - fiveMinutes) {
    const refreshed = await refreshSession();
    return { data: { session: refreshed }, error: null };
  }

  return { data: { session }, error: null };
};

/**
 * 현재 액세스 토큰 가져오기 (API 호출용)
 * 만료된 경우 자동으로 갱신을 시도합니다.
 * @returns {string|null}
 */
export const getAccessToken = async () => {
  const { data } = await getSession();
  return data?.session?.access_token || null;
};

/**
 * 현재 사용자 정보 가져오기
 * @returns {{ data: { user }, error }}
 */
export const getUser = async () => {
  const { data } = await getSession();
  const user = data?.session?.user || null;
  return { data: { user }, error: null };
};

/**
 * 인증 상태 변경 리스너 등록
 * Supabase의 onAuthStateChange와 동일한 인터페이스
 * @param {Function} callback - (event, session) => void
 * @returns {{ data: { subscription: { unsubscribe: Function } } }}
 */
export const onAuthStateChange = (callback) => {
  authListeners.push(callback);
  
  // 초기 상태 전달
  const session = getSessionSync();
  if (session) {
    setTimeout(() => callback('INITIAL_SESSION', session), 0);
  }

  return {
    data: {
      subscription: {
        unsubscribe: () => {
          authListeners = authListeners.filter((cb) => cb !== callback);
        },
      },
    },
  };
};

/**
 * 비밀번호 변경 (로그인 상태에서)
 * @param {string} previousPassword - 이전 비밀번호
 * @param {string} proposedPassword - 새 비밀번호
 */
export const changePassword = async (previousPassword, proposedPassword) => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  
  if (!accessToken) {
    return { data: null, error: { message: '로그인이 필요합니다.' } };
  }

  const { data, error } = await cognitoRequest('ChangePassword', {
    AccessToken: accessToken,
    PreviousPassword: previousPassword,
    ProposedPassword: proposedPassword,
  });

  if (error) {
    return { data: null, error };
  }

  return { data: { message: '비밀번호가 변경되었습니다.' }, error: null };
};

// 기본 내보내기: supabase.auth 호환 인터페이스
const auth = {
  signIn,
  signInWithPassword: signIn,
  signOut,
  getSession,
  getUser,
  getAccessToken,
  onAuthStateChange,
  changePassword,
};

export default auth;
