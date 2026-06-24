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
 * @param {boolean} props.requireAdmin - true이면 관리자 권한도 필요
 * 
 * 사용법:
 * <ProtectedRoute>
 *   <Case_detail />
 * </ProtectedRoute>
 * 
 * <ProtectedRoute requireAdmin>
 *   <Dashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children, redirectTo = null, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  // 현재 경로에서 언어 접두사 감지
  const getLangPrefix = () => {
    const path = location.pathname;
    if (path.startsWith('/ko')) return '/ko';
    if (path.startsWith('/en')) return '/en';
    return '/ko'; // 기본값
  };

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
    const lang = getLangPrefix();
    const targetPath = redirectTo || location.pathname + location.search;
    return <Navigate to={`${lang}/login?redirect=${encodeURIComponent(targetPath)}`} replace />;
  }

  // requireAdmin이 true인데 관리자가 아닌 경우
  if (requireAdmin && !isAdmin()) {
    const lang = getLangPrefix();
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        fontSize: '18px',
        color: '#666',
        gap: '16px'
      }}>
        <p>접근 권한이 없습니다.</p>
        <a href={`${lang}/`} style={{ color: '#007bff', textDecoration: 'underline' }}>홈으로 돌아가기</a>
      </div>
    );
  }

  // 로그인된 경우 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;
