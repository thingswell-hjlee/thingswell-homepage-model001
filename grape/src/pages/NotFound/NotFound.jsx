import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <span className="error-code">404</span>
        </div>
        <h1 className="not-found-title">페이지를 찾을 수 없습니다</h1>
        <p className="not-found-description">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          <br />
          URL을 다시 확인하거나 아래 버튼을 통해 홈페이지로 이동해주세요.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-button primary">
            홈페이지로 이동
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
