import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { getSession, onAuthStateChange, signOut as authSignOut } from '../lib/auth.js';

const AuthContext = createContext({});

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };

// Session timeout constants
const CHECK_INTERVAL_MS = 60 * 1000; // Check every 60 seconds
const EXPIRY_WARNING_MS = 5 * 60 * 1000; // Warn 5 minutes before expiry

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

    // Call getSession() which handles token refresh automatically
    const { data } = await getSession();
    const currentSession = data?.session;

    if (!currentSession) {
      // Session could not be refreshed - sign out
      setSessionExpiringSoon(false);
      await authSignOut();
      return;
    }

    const expiresAt = currentSession.expires_at;
    if (!expiresAt) return;

    const now = Date.now();
    const timeRemaining = expiresAt - now;

    if (timeRemaining <= EXPIRY_WARNING_MS) {
      // Token expires within 5 minutes - show warning
      setSessionExpiringSoon(true);
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
        console.log('Auth state changed:', event, session?.user?.email);
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
