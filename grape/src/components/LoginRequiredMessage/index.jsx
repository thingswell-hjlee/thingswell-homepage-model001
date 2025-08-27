import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRequiredMessage.css';

/**
 * LoginRequiredMessage 컴포넌트
 * 
 * 로그인이 필요한 기능에 접근할 때 표시하는 메시지 컴포넌트입니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.title - 메시지 제목 (기본값: "로그인이 필요합니다")
 * @param {string} props.message - 메시지 내용 (기본값: "이 기능을 사용하려면 로그인이 필요합니다")
 * @param {string} props.buttonText - 버튼 텍스트 (기본값: "로그인하기")
 * 
 * 사용법:
 * <LoginRequiredMessage 
 *   title="상세 페이지 접근 제한"
 *   message="고객사례 상세 페이지를 보려면 로그인이 필요합니다."
 * />
 */
const LoginRequiredMessage = ({ 
  title = "로그인이 필요합니다", 
  message = "이 기능을 사용하려면 로그인이 필요합니다",
  buttonText = "로그인하기"
}) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="login-required-message">
      <div className="login-required-content">
        <div className="login-required-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 9H14V4H5V21H19V9Z" fill="currentColor"/>
          </svg>
        </div>
        <h3 className="login-required-title">{title}</h3>
        <p className="login-required-text">{message}</p>
        <button 
          className="login-required-button"
          onClick={handleLoginClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default LoginRequiredMessage;
