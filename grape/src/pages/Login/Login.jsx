import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { signIn } from '../../lib/auth.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import useTranslation from '../../hooks/useTranslation';
import rndHeader from '../../assets/header_image/rnd.jpg';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import { BaseLayout } from '../../components/Layout';
import './Login.css';

const Login = () => {
  const { t, currentLang } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const redirectPath = searchParams.get('redirect') || '/admin/dashboard';

  // 이미 로그인된 사용자는 리다이렉트
  useEffect(() => {
    if (user) {
      navigate(redirectPath);
    }
  }, [user, navigate, redirectPath]);

  // 로그인된 사용자가 접근하면 리다이렉트
  if (user) {
    return null; // 리다이렉트 중에는 아무것도 렌더링하지 않음
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        setError(error.message);
      } else {
        // 로그인 성공 시 리다이렉트
        navigate(redirectPath);
      }
    } catch (error) {
      setError(t('login.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout
    header={() => <ProductHeader image={rndHeader} />}
    breadcrumbs={[t('login.breadcrumbs.0'), t('login.breadcrumbs.1')]}
    title={t('login.title')}
    >
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="login-container">
              <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">{t('login.email')}</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">{t('login.password')}</label>
                        <input 
                          type="password" 
                          id="password" 
                          name="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" disabled={loading}>
                      {loading ? t('login.loading') : t('login.submit')}
                    </button>
                    <div className="login-link">
                      <Link to={`/${currentLang}/forgot-password`}>{t('login.forgotPassword')}</Link>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Login;
