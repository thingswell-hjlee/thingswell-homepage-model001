import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { changePassword } from '../../lib/auth.js';
import BaseLayout from '../../components/Layout/BaseLayout';
import AdminLayout from '../../components/AdminLayout';
import './ChangePassword.css';

const ChangePassword = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 유효성 검사
    if (newPassword.length < 8) {
      setError('새 비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      const { data, error: changeError } = await changePassword(currentPassword, newPassword);

      if (changeError) {
        setError(changeError.message);
      } else {
        setSuccess('비밀번호가 성공적으로 변경되었습니다.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError('비밀번호 변경 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    { label: '홈', path: '/' },
    { label: '관리자', path: '/admin/dashboard' },
    { label: '비밀번호 변경', path: '/admin/change-password' },
  ];

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      title="비밀번호 변경"
      subtitle="계정 비밀번호를 변경합니다"
    >
      <AdminLayout>
        <div className="change-password-container">
          <div className="change-password-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="currentPassword">현재 비밀번호</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPassword">새 비밀번호</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                      <span className="form-hint">최소 8자 이상</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">새 비밀번호 확인</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <button type="submit" disabled={loading}>
                      {loading ? '변경 중...' : '비밀번호 변경'}
                    </button>
                  </form>
          </div>
        </div>
      </AdminLayout>
    </BaseLayout>
  );
};

export default ChangePassword;
