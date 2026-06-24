import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword, confirmForgotPassword } from '../../lib/auth.js';
import rndHeader from '../../assets/header_image/rnd.jpg';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import { BaseLayout } from '../../components/Layout';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = React.useRef(null);

  const startCooldown = () => {
    setCooldown(60);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          cooldownRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Cleanup cooldown timer on unmount
  React.useEffect(() => {
    return () => {
      if (cooldownRef.current) {
        clearInterval(cooldownRef.current);
      }
    };
  }, []);

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { data, error: forgotError } = await forgotPassword(email);

      if (forgotError) {
        setError(forgotError.message);
      } else {
        setStep(2);
        setSuccess('인증 코드가 이메일로 전송되었습니다.');
        startCooldown();
      }
    } catch (err) {
      setError('인증 코드 요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (cooldown > 0) return;
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { data, error: forgotError } = await forgotPassword(email);

      if (forgotError) {
        setError(forgotError.message);
      } else {
        setSuccess('인증 코드가 이메일로 재전송되었습니다.');
        startCooldown();
      }
    } catch (err) {
      setError('인증 코드 요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

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
      const { data, error: resetError } = await confirmForgotPassword(email, code, newPassword);

      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess('비밀번호가 성공적으로 재설정되었습니다.');
        setStep(3);
      }
    } catch (err) {
      setError('비밀번호 재설정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={["Home", "비밀번호 찾기"]}
      title="비밀번호 찾기"
    >
      <div className="page-container">
        <div className="page-content">
          <div className="page-layout">
            <div className="main-content">
              <div className="forgot-password-container">
                <div className="forgot-password-form">
                  {step === 1 && (
                    <form onSubmit={handleRequestCode}>
                      <p className="forgot-password-description">
                        가입한 이메일 주소를 입력하시면 비밀번호 재설정을 위한 인증 코드를 보내드립니다.
                      </p>
                      <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      {error && <div className="error-message">{error}</div>}
                      {success && <div className="success-message">{success}</div>}
                      <button type="submit" disabled={loading}>
                        {loading ? '전송 중...' : '인증 코드 전송'}
                      </button>
                      <div className="login-link">
                        <Link to="/login">로그인으로 돌아가기</Link>
                      </div>
                    </form>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleResetPassword}>
                      <p className="forgot-password-description">
                        이메일로 전송된 인증 코드와 새 비밀번호를 입력해주세요.
                      </p>
                      <div className="form-group">
                        <label htmlFor="code">인증 코드</label>
                        <input
                          type="text"
                          id="code"
                          name="code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
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
                        {loading ? '재설정 중...' : '비밀번호 재설정'}
                      </button>
                      <button
                        type="button"
                        className="resend-code-btn"
                        disabled={cooldown > 0}
                        onClick={handleResendCode}
                      >
                        {cooldown > 0 ? `코드 재전송 (${cooldown}초)` : '코드 재전송'}
                      </button>
                      <div className="login-link">
                        <Link to="/login">로그인으로 돌아가기</Link>
                      </div>
                    </form>
                  )}

                  {step === 3 && (
                    <div className="reset-complete">
                      <div className="success-message">
                        비밀번호가 성공적으로 재설정되었습니다.
                      </div>
                      <div className="login-link">
                        <Link to="/login">로그인 페이지로 이동</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ForgotPassword;
