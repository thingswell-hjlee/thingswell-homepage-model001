/**
 * Footer 컴포넌트
 *
 * 웹사이트의 하단 푸터를 렌더링하는 컴포넌트입니다.
 * 회사 정보, 링크, 저작권 정보를 포함합니다.
 * React Router Link를 사용하여 SPA 내부 네비게이션을 처리합니다.
 */
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo_white.png";
import useTranslation from "../../hooks/useTranslation";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, currentLang } = useTranslation();

  const sitemapData = useMemo(() => [
    {
      label: t('footer.company'),
      path: `/${currentLang}/about`,
      submenu: [
        { label: t('footer.companyIntro'), path: `/${currentLang}/about/company` },
        { label: t('footer.history'), path: `/${currentLang}/about/history` },
        { label: t('footer.licenses'), path: `/${currentLang}/about/licenses` },
        { label: t('footer.directions'), path: `/${currentLang}/about/directions` },
        { label: t('footer.board'), path: `/${currentLang}/customer-service/announcement` },
      ]
    },
    {
      label: t('footer.solutions'),
      path: `/${currentLang}/solutions/overview`,
      submenu: [
        { label: t('footer.solutionIndustrial'), path: `/${currentLang}/solutions/overview` },
        { label: t('footer.solutionElderly'), path: `/${currentLang}/solutions/chemical` },
        { label: t('footer.solutionIntegrated'), path: `/${currentLang}/solutions/manufacturing` },
      ]
    },
    {
      label: t('footer.rnd'),
      path: `/${currentLang}/rnd/multimodal-awareness`,
      submenu: [
        { label: t('footer.rndMultimodal'), path: `/${currentLang}/rnd/multimodal-awareness` },
        { label: t('footer.rndOnDevice'), path: `/${currentLang}/rnd/on-device-ai` },
        { label: t('footer.rndRAGLLM'), path: `/${currentLang}/rnd/rag-llm` },
        { label: t('footer.rndEarlyDetection'), path: `/${currentLang}/rnd/embedded-system` },
        { label: t('footer.rndAssistive'), path: `/${currentLang}/rnd/smart-assistive-technology` },
        { label: t('footer.rndAirQuality'), path: `/${currentLang}/rnd/air-quality-management` },
      ]
    },
    {
      label: t('footer.products'),
      path: `/${currentLang}/products/safety`,
      submenu: [
        { label: t('footer.productSafety'), path: `/${currentLang}/products/safety` },
        { label: t('footer.productMonitoring'), path: `/${currentLang}/products/monitoring` },
        { label: t('footer.productControl'), path: `/${currentLang}/products/control/list` },
      ]
    },
    {
      label: t('footer.cases'),
      path: `/${currentLang}/cases/smart-safety`,
      submenu: [
        { label: t('footer.caseSmartSafety'), path: `/${currentLang}/cases/smart-safety` },
        { label: t('footer.caseIntegratedControl'), path: `/${currentLang}/cases/integrated-control` },
        { label: t('footer.caseInfoComm'), path: `/${currentLang}/cases/information-communication` },
      ]
    }
  ], [t, currentLang]);

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
              <img src={logo} alt={t('footer.logoAlt')} className="logo" />
              <div className="footer-copyright">
                <div className="footer-info">
                  <p className="footer-company-name">{t('footer.companyName')}</p>
                  <p>{t('footer.address')}</p>
                  <p>{t('footer.phone')}</p>
                  <p>{t('footer.email')}</p>
                </div>
                <p>
                  &copy; {currentYear} {t('footer.copyright')}
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
