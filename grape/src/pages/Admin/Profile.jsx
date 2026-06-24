import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { decodeToken } from '../../lib/auth.js';
import BaseLayout from '../../components/Layout/BaseLayout';
import AdminLayout from '../../components/AdminLayout';
import './Profile.css';

const Profile = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();

  // Extract last login time from token payload
  const getLastLoginTime = () => {
    try {
      if (session?.id_token) {
        const payload = decodeToken(session.id_token);
        if (payload?.auth_time) {
          return new Date(payload.auth_time * 1000).toLocaleString('ko-KR');
        }
        if (payload?.iat) {
          return new Date(payload.iat * 1000).toLocaleString('ko-KR');
        }
      }
    } catch (e) {
      // ignore decode errors
    }
    return '-';
  };

  const breadcrumbs = [
    { label: '홈', path: '/' },
    { label: '관리자', path: '/admin/dashboard' },
    { label: '프로필', path: '/admin/profile' },
  ];

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      title="프로필 / 계정 설정"
      subtitle="계정 정보를 확인하고 관리하세요"
    >
      <AdminLayout>
        <div className="admin-profile">
          {/* Account Info Card */}
          <div className="profile-card">
            <h3 className="profile-card-title">계정 정보</h3>
            <div className="profile-info-list">
              <div className="profile-info-item">
                <span className="profile-info-label">이메일</span>
                <span className="profile-info-value">{user?.email || '-'}</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">이메일 인증</span>
                <span className="profile-info-value">
                  {user?.email_verified ? (
                    <span className="badge badge-success">인증됨</span>
                  ) : (
                    <span className="badge badge-warning">미인증</span>
                  )}
                </span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">마지막 로그인</span>
                <span className="profile-info-value">{getLastLoginTime()}</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">사용자 ID</span>
                <span className="profile-info-value profile-id">{user?.id || '-'}</span>
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className="profile-card">
            <h3 className="profile-card-title">계정 관리</h3>
            <div className="profile-actions">
              <button
                className="profile-action-btn"
                onClick={() => navigate('/admin/change-password')}
              >
                <span className="profile-action-icon">🔒</span>
                <div className="profile-action-content">
                  <span className="profile-action-label">비밀번호 변경</span>
                  <span className="profile-action-description">계정 비밀번호를 변경합니다</span>
                </div>
              </button>
              <button
                className="profile-action-btn"
                onClick={() => navigate('/admin/dashboard')}
              >
                <span className="profile-action-icon">📊</span>
                <div className="profile-action-content">
                  <span className="profile-action-label">대시보드</span>
                  <span className="profile-action-description">관리자 대시보드로 이동합니다</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </BaseLayout>
  );
};

export default Profile;
