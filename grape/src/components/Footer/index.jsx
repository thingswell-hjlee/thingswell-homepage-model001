/**
 * Footer 컴포넌트
 *
 * 웹사이트의 하단 푸터를 렌더링하는 컴포넌트입니다.
 * 회사 정보, 링크, 저작권 정보를 포함합니다.
 * React Router Link를 사용하여 SPA 내부 네비게이션을 처리합니다.
 */
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo_white.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  const sitemapData = [
    {
      label: '회사',
      path: '/about',
      submenu: [
        { label: '회사소개', path: '/about/company' },
        { label: '연혁', path: '/about/history' },
        { label: '면허인증특허', path: '/about/licenses' },
        { label: '오시는 길', path: '/about/directions' },
        { label: '게시판', path: '/customer-service/announcement' },
      ]
    },
    {
      label: '사업분야',
      path: '/solutions/overview',
      submenu: [
        { label: '산업안전 솔루션', path: '/solutions/chemical' },
        { label: '노인장애인안전 솔루션', path: '/solutions/overview' },
        { label: '통합제어 솔루션', path: '/solutions/manufacturing' },
      ]
    },
    {
      label: '연구개발',
      path: '/rnd/multimodal-awareness',
      submenu: [
        { label: '멀티모달 상황인지', path: '/rnd/multimodal-awareness' },
        { label: '온디바이스 AI', path: '/rnd/on-device-ai' },
        { label: 'RAG 기반 LLM', path: '/rnd/rag-llm' },
        { label: '위험상황 조기감지', path: '/rnd/embedded-system' },
        { label: '인지장애 보조', path: '/rnd/smart-assistive-technology' },
        { label: 'AI 공기질 관리', path: '/rnd/air-quality-management' },
      ]
    },
    {
      label: '제품',
      path: '/products/safety',
      submenu: [
        { label: '스마트안전', path: '/products/safety' },
        { label: '관제시스템', path: '/products/monitoring' },
        { label: '통합제어', path: '/products/control/list' },
      ]
    },
    {
      label: '고객사례',
      path: '/cases/smart-safety',
      submenu: [
        { label: '산업안전자동화', path: '/cases/smart-safety' },
        { label: '스마트통합제어', path: '/cases/integrated-control' },
        { label: '정보통신', path: '/cases/information-communication' },
      ]
    }
  ];

  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-container">
          {/* 사이트맵 섹션 */}
          <div className="footer-sitemap">
            <div className="sitemap-grid">
              {sitemapData.map((category, index) => (
                <div key={index} className="sitemap-category">
                  <h4 className="category-title">
                    <Link to={category.path}>{category.label}</Link>
                  </h4>
                  <ul className="category-list">
                    {category.submenu.map((item, subIndex) => (
                      <li key={subIndex} className="category-item">
                        <Link to={item.path}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="footer-bottom-content">
              <img src={logo} alt="로고" className="logo" />
              <div className="footer-copyright">
                <div className="footer-info">
                  <p>
                    경기 안양시 동안구 학의로 282 금강펜타리움 IT타워 A동
                    1302호
                  </p>
                  <p>1833-7758</p>
                  <p>contact@thingswell.co.kr</p>
                </div>
                <p>
                  &copy; {currentYear} ThingsWell 본 사이트의 모든 컨텐츠는 저작권의
                  보호를 받으며, 무단 복제, 배포, 사용을 금합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
