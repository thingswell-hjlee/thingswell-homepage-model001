import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 현재 세션 확인
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // 인증 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // 권한 체크 함수들
  const isAuthenticated = () => !!user;
  
  const isAdmin = () => {
    // 이메일 기반 관리자 체크 (실제로는 사용자 메타데이터나 별도 테이블에서 관리하는 것이 좋습니다)
    const adminEmails = ['admin@example.com', 'manager@example.com'];
    return user && adminEmails.includes(user.email);
  };

  const canEditContent = () => {
    // 로그인된 사용자이거나 관리자인 경우 편집 가능
    return isAuthenticated() || isAdmin();
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    isAuthenticated,
    isAdmin,
    canEditContent,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 