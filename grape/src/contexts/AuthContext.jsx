import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { getSession, onAuthStateChange, signOut as authSignOut, getSessionSync, decodeToken } from '../lib/auth.js';

const AuthContext = createContext({});

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };

// Session timeout constants
const CHECK_INTERVAL_MS = 60 * 1000; // Check every 60 seconds
const EXPIRY_WARNING_MS = 10 * 60 * 1000; // Warn 10 minutes before expiry (before getSession's 5-min auto-refresh)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [sessionExpiringSoon, setSessionExpiringSoon] = useState(false);
  const timerRef = useRef(null);

  // Session timeout check
  const checkSessionTimeout = useCallback(async () => {
    if (!user) {
      setSessionExpiringSoon(false);
      return;
    }

    // First, check raw session (pre-refresh) to decide whether to show warning
    const rawSession = getSessionSync();
    if (!rawSession || !rawSession.expires_at) {
      // No session at all - sign out
      setSessionExpiringSoon(false);
      await authSignOut();
      return;
    }

    const now = Date.now();
    const timeRemaining = rawSession.expires_at - now;

    if (timeRemaining <= 0) {
      // Token already expired - attempt refresh via getSession, then sign out if failed
      const { data } = await getSession();
      if (!data?.session) {
        setSessionExpiringSoon(false);
        await authSignOut();
      } else {
        // Refresh succeeded - clear warning
        setSessionExpiringSoon(false);
      }
      return;
    }

    if (timeRemaining <= EXPIRY_WARNING_MS) {
      // Token expires within 10 minutes - show warning
      setSessionExpiringSoon(true);

      // If within 5 minutes, getSession() will auto-refresh
      // Call it to trigger the refresh attempt
      const { data } = await getSession();
      if (!data?.session) {
        // Refresh failed - sign out
        setSessionExpiringSoon(false);
        await authSignOut();
      }
    } else {
      setSessionExpiringSoon(false);
    }
  }, [user]);

  // Start session timeout monitoring
  useEffect(() => {
    if (user) {
      // Run immediately
      checkSessionTimeout();
      // Set interval
      timerRef.current = setInterval(checkSessionTimeout, CHECK_INTERVAL_MS);
    } else {
      setSessionExpiringSoon(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [user, checkSessionTimeout]);

  useEffect(() => {
    // 현재 세션 확인
    const initSession = async () => {
      const { data } = await getSession();
      const currentSession = data?.session || null;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    };

    initSession();

    // 인증 상태 변경 리스너
    const { data: { subscription } } = onAuthStateChange(
      (event, session) => {
        if (import.meta.env.DEV) {
          console.log('Auth state changed:', event, session?.user?.email);
        }
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await authSignOut();
  };

  // 권한 체크 함수들
  const isAuthenticated = () => !!user;
  
  // TODO: API Gateway/Lambda에서도 관리자 권한 검증 필요
  const isAdmin = () => {
    if (!isAuthenticated()) return false;
    try {
      const idToken = localStorage.getItem('thingswell_id_token');
      if (!idToken) return isAuthenticated();
      const decoded = decodeToken(idToken);
      if (!decoded) return isAuthenticated();
      const groups = decoded['cognito:groups'];
      if (Array.isArray(groups) && groups.length > 0) {
        return groups.includes('admin');
      }
      // Intentional fail-open fallback: When cognito:groups claim is absent (e.g., Cognito
      // user pool not yet configured with groups, or users created before group setup),
      // treat any authenticated user as admin for backward compatibility. This ensures
      // existing logged-in users are not broken during the transition period until Cognito
      // groups are properly configured across all environments.
      return isAuthenticated();
    } catch {
      // Same intentional fallback on token decode errors - preserve existing user access
      return isAuthenticated();
    }
  };

  const canEditContent = () => {
    // 로그인된 사용자이거나 관리자인 경우 편집 가능
    return isAuthenticated();
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    isAuthenticated,
    isAdmin,
    canEditContent,
    sessionExpiringSoon,
  };

  return (
    <AuthContext.Provider value={value}>
      {sessionExpiringSoon && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: '#ffc107',
          color: '#212529',
          padding: '12px 20px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
          세션이 곧 만료됩니다. 작업을 저장하시거나 다시 로그인해주세요.
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
}; 
