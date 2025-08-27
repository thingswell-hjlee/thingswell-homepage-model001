import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute 컴포넌트
 * 
 * 로그인하지 않은 사용자의 접근을 차단하고 로그인 페이지로 리다이렉트하는 컴포넌트입니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 보호할 컴포넌트
 * @param {string} props.redirectTo - 로그인 후 리다이렉트할 경로 (기본값: 현재 경로)
 * 
 * 사용법:
 * <ProtectedRoute>
 *   <Case_detail />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children, redirectTo = null }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 로딩 중일 때는 로딩 표시
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        로딩 중...
      </div>
    );
  }

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated()) {
    const targetPath = redirectTo || location.pathname + location.search;
    return <Navigate to={`/login?redirect=${encodeURIComponent(targetPath)}`} replace />;
  }

  // 로그인된 경우 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;
