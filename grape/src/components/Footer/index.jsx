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
          <div className="footer-content sitemap">
            <div className="footer-section">
              <h3 className="footer-subtitle">Services</h3>
              <ul className="footer-links">
                <li><a href="/solutions">솔루션</a></li>
                <li><a href="/products">제품</a></li>
                <li><a href="/cases">납품사례</a></li>
                <li><a href="/customer-service">고객지원</a></li>
                <li><a href="/about">회사소개</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-subtitle">Expertise</h3>
              <ul className="footer-links">
                <li><a href="#">Local SEO</a></li>
                <li><a href="#">National SEO</a></li>
                <li><a href="#">Facebook Ads</a></li>
                <li><a href="#">LinkedIn Ads</a></li>
                <li><a href="#">Instagram Ads</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-subtitle">Useful Tools</h3>
              <ul className="footer-links">
                <li><a href="#">GTMetrix</a></li>
                <li><a href="#">Ubersuggest</a></li>
                <li><a href="#">SEMRush</a></li>
                <li><a href="#">ahrefs</a></li>
                <li><a href="#">Google Search Console</a></li>
              </ul>
            </div>

            <div className="footer-section contact">
              <h3 className="footer-subtitle">HEDLEY</h3>
              <p className="footer-description">Hedley Digital is an industry-leading and top-rated premium digital marketing agency focusing on driving traffic to your website through SEO, PPC and social media ads.</p>
              <div className="footer-contact">
                <p><strong>Email:</strong> <a href="mailto:info@hedleyonline.com">info@hedleyonline.com</a></p>
                <p><strong>Tel:</strong> 02 2097 8120</p>
              </div>
            </div>
          </div>

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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
