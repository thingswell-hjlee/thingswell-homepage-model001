import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSession, onAuthStateChange, signOut as authSignOut } from '../lib/auth.js';

const AuthContext = createContext({});

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
