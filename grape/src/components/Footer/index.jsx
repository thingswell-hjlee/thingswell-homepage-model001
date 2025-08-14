/**
 * Footer 컴포넌트
 *
 * 웹사이트의 하단 푸터를 렌더링하는 컴포넌트입니다.
 * 회사 정보, 링크, 저작권 정보, 소셜 미디어 링크를 포함합니다.
 * 현재 연도를 자동으로 표시합니다.
 *
 * 사용법:
 * <Footer />
 *
 * 포함된 정보:
 * - 회사 주소, 연락처, 이메일
 * - 저작권 정보 (현재 연도 자동 업데이트)
 * - 소셜 미디어 링크
 * - 주요 페이지 링크 (솔루션, 제품, 납품사례, 고객지원, 회사소개)
 */
import React from "react";
import "./Footer.css";
import logo from "../../assets/logo_white.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-wrapper">
      
      <footer className="footer">
        
        <div className="footer-container">
          {/* <div className="footer-content">
            <div className="footer-section">
              <a href="/solutions" className="footer-subtitle">
                솔루션
              </a>
            </div>
            <div className="footer-section">
              <a href="/products" className="footer-subtitle">
                제품
              </a>
            </div>
            <div className="footer-section">
              <a href="/cases" className="footer-subtitle">
                납품사례
              </a>
            </div>
            <div className="footer-section">
              <a href="/customer-service" className="footer-subtitle">
                고객지원
              </a>
            </div>
            <div className="footer-section">
              <a href="/about" className="footer-subtitle">
                회사소개
              </a>
            </div>
          </div> */}

          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="footer-bottom-content">
              <img src={logo} alt="로고" className="logo" />
              <div className="footer-copyright">
                <div className="footer-info">
                  <p>
                    경기 안양시 동안구 학의로 2825 금강펜타리움 IT타워 A동
                    1302호
                  </p>
                  <p>1833-7758</p>
                  <p>contact@thingswell.co.kr</p>
                </div>
                <p>
                  © {currentYear} ThingsWell 본 사이트의 모든 컨텐츠는 저작권의
                  보호를 받으며, 무단 복제, 배포, 사용을 금합니다.
                </p>
              </div>
              <div className="footer-social">
                <a href="https://thingswell.tistory.com/" className="social-link">
                  Tstory
                </a>
                <a href="https://sites.google.com/thingswell.co.kr/ucontrol/" className="social-link">
                  Ucontrol
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
