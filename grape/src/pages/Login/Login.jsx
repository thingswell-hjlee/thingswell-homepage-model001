import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../lib/auth.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import rndHeader from '../../assets/header_image/rnd.jpg';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import { BaseLayout } from '../../components/Layout';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  // 이미 로그인된 사용자는 홈페이지로 리다이렉트
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // 로그인된 사용자가 접근하면 홈페이지로 리다이렉트
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
        // 로그인 성공 시 홈페이지로 이동
        navigate('/');
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout
    header={() => <ProductHeader image={rndHeader} />}
    breadcrumbs={["Home", "로그인"]}
    title="로그인"
    >
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="login-container">
              <div className="login-form">
                <form onSubmit={handleSubmit}>
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
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
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
                      {loading ? '로그인 중...' : '로그인'}
                    </button>
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
