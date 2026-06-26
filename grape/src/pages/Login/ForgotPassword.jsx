import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword, confirmForgotPassword } from '../../lib/auth.js';
import useTranslation from '../../hooks/useTranslation';
import rndHeader from '../../assets/header_image/rnd.jpg';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import { BaseLayout } from '../../components/Layout';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const { t, currentLang } = useTranslation();
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
        setSuccess(t('ui3.forgotPassword.codeSent'));
        startCooldown();
      }
    } catch (err) {
      setError(t('ui3.forgotPassword.codeRequestError'));
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
        setSuccess(t('ui3.forgotPassword.codeResent'));
        startCooldown();
      }
    } catch (err) {
      setError(t('ui3.forgotPassword.codeRequestError'));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 8) {
      setError(t('ui3.forgotPassword.passwordMinLength'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('ui3.forgotPassword.passwordMismatch'));
      return;
    }

    setLoading(true);

    try {
      const { data, error: resetError } = await confirmForgotPassword(email, code, newPassword);

      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess(t('ui3.forgotPassword.resetSuccess'));
        setStep(3);
      }
    } catch (err) {
      setError(t('ui3.forgotPassword.resetError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={[t('forgotPassword.breadcrumbs.0'), t('forgotPassword.breadcrumbs.1')]}
      title={t('forgotPassword.title')}
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
                        {t('ui3.forgotPassword.step1Description')}
                      </p>
                      <div className="form-group">
                        <label htmlFor="email">{t('ui3.forgotPassword.emailLabel')}</label>
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
                        {loading ? t('ui3.forgotPassword.sending') : t('ui3.forgotPassword.requestCode')}
                      </button>
                      <div className="login-link">
                        <Link to="/login">{t('ui3.forgotPassword.backToLogin')}</Link>
                      </div>
                    </form>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleResetPassword}>
                      <p className="forgot-password-description">
                        {t('ui3.forgotPassword.step2Description')}
                      </p>
                      <div className="form-group">
                        <label htmlFor="code">{t('ui3.forgotPassword.codeLabel')}</label>
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
                        <label htmlFor="newPassword">{t('ui3.forgotPassword.newPasswordLabel')}</label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          minLength={8}
                        />
                        <span className="form-hint">{t('ui3.forgotPassword.minLengthHint')}</span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">{t('ui3.forgotPassword.confirmPasswordLabel')}</label>
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
                        {loading ? t('ui3.forgotPassword.resetting') : t('ui3.forgotPassword.resetPassword')}
                      </button>
                      <button
                        type="button"
                        className="resend-code-btn"
                        disabled={cooldown > 0}
                        onClick={handleResendCode}
                      >
                        {cooldown > 0 ? `${t('ui3.forgotPassword.resendCode')} (${cooldown}${t('ui3.forgotPassword.secondsSuffix')})` : t('ui3.forgotPassword.resendCode')}
                      </button>
                      <div className="login-link">
                        <Link to="/login">{t('ui3.forgotPassword.backToLogin')}</Link>
                      </div>
                    </form>
                  )}

                  {step === 3 && (
                    <div className="reset-complete">
                      <div className="success-message">
                        {t('ui3.forgotPassword.resetSuccess')}
                      </div>
                      <div className="login-link">
                        <Link to="/login">{t('ui3.forgotPassword.goToLogin')}</Link>
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
