import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import { stripLangPrefix } from '../../contexts/LanguageContext';

const BASE_URL = 'https://www.thingswell.co.kr';

/**
 * SEOHead component
 * Manages document title, meta description, Open Graph tags,
 * hreflang alternate links, and canonical URL based on current language and path.
 */
function SEOHead() {
  const { t, currentLang } = useTranslation();
  const location = useLocation();

  useEffect(() => {
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
    const canonicalUrl = `${BASE_URL}/${currentLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    const koUrl = `${BASE_URL}/ko${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    const enUrl = `${BASE_URL}/en${pathWithoutLang === '/' ? '' : pathWithoutLang}`;

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
    setMeta('property', 'og:site_name', '싱스웰');
    setMeta('property', 'og:image', 'https://www.thingswell.co.kr/og-image.jpg');
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:type', 'image/jpeg');

    // Twitter Card tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', 'https://www.thingswell.co.kr/og-image.jpg');

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
