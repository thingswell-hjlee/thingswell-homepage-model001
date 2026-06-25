import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import { stripLangPrefix } from '../../contexts/LanguageContext';

/**
 * 현재 접속 도메인을 기반으로 baseUrl을 결정합니다.
 * 지원 도메인: thingswell.co.kr, www.thingswell.co.kr, safegai.co.kr, www.safegai.co.kr
 * fallback: https://www.thingswell.co.kr
 */
function getBaseUrl() {
  if (typeof window === 'undefined') return 'https://www.thingswell.co.kr';
  const hostname = window.location.hostname;
  const allowedHosts = [
    'www.thingswell.co.kr',
    'thingswell.co.kr',
    'www.safegai.co.kr',
    'safegai.co.kr',
  ];
  if (allowedHosts.includes(hostname)) {
    return `https://${hostname}`;
  }
  // 로컬 개발 등 기타 환경에서는 기본값 사용
  return 'https://www.thingswell.co.kr';
}

/**
 * 도메인에 따라 사이트명 결정
 */
function getSiteName(hostname) {
  if (hostname && hostname.includes('safegai')) {
    return 'SafeGAI';
  }
  return 'ThingsWell';
}

/**
 * SEOHead component
 * Manages document title, meta description, Open Graph tags,
 * hreflang alternate links, canonical URL, og:image, and twitter:image
 * based on current language, path, and domain.
 */
function SEOHead() {
  const { t, currentLang } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const baseUrl = getBaseUrl();
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    const siteName = getSiteName(hostname);
    const pathWithoutLang = stripLangPrefix(location.pathname);

    // Determine which SEO section to use based on path
    let seoSection = 'home';
    if (pathWithoutLang.startsWith('/about')) seoSection = 'about';
    else if (pathWithoutLang.startsWith('/solutions')) seoSection = 'solutions';
    else if (pathWithoutLang.startsWith('/rnd')) seoSection = 'rnd';
    else if (pathWithoutLang.startsWith('/products')) seoSection = 'products';
    else if (pathWithoutLang.startsWith('/cases')) seoSection = 'cases';
    else if (pathWithoutLang.startsWith('/government-support')) seoSection = 'governmentSupport';

    const title = t(`seo.${seoSection}.title`);
    const description = t(`seo.${seoSection}.description`);
    const ogLocale = currentLang === 'ko' ? 'ko_KR' : 'en_US';
    const pagePath = pathWithoutLang === '/' ? '' : pathWithoutLang;
    const canonicalUrl = `${baseUrl}/${currentLang}${pagePath}`;
    const koUrl = `${baseUrl}/ko${pagePath}`;
    const enUrl = `${baseUrl}/en${pagePath}`;
    const ogImageUrl = `${baseUrl}/og-image.jpg`;

    // Set document title
    document.title = title;

    // Helper to set or create a meta tag
    const setMeta = (attr, attrValue, content) => {
      let el = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Meta description
    setMeta('name', 'description', description);

    // Open Graph tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:locale', ogLocale);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', siteName);
    setMeta('property', 'og:image', ogImageUrl);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');

    // Twitter Card tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImageUrl);

    // Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // Hreflang links
    const setHreflang = (lang, href) => {
      let el = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', lang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setHreflang('ko', koUrl);
    setHreflang('en', enUrl);
    setHreflang('x-default', koUrl);

    // HTML lang attribute
    document.documentElement.lang = currentLang;

  }, [currentLang, location.pathname, t]);

  return null;
}

export default SEOHead;
