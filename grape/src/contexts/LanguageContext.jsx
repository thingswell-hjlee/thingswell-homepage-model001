import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import koLocale from '../locales/ko.json';
import enLocale from '../locales/en.json';

const locales = { ko: koLocale, en: enLocale };
const SUPPORTED_LANGS = ['ko', 'en'];
const DEFAULT_LANG = 'ko';
const STORAGE_KEY = 'lang';

const LanguageContext = createContext({
  currentLang: DEFAULT_LANG,
  setLanguage: () => {},
  t: (key) => key,
});

/**
 * Extract language prefix from a pathname.
 * Returns the language code if the path starts with /ko or /en, otherwise null.
 */
function getLangFromPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && SUPPORTED_LANGS.includes(segments[0])) {
    return segments[0];
  }
  return null;
}

/**
 * Remove the language prefix from a pathname.
 * e.g., "/ko/about/company" => "/about/company"
 */
function stripLangPrefix(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && SUPPORTED_LANGS.includes(segments[0])) {
    const rest = segments.slice(1).join('/');
    return '/' + rest;
  }
  return pathname;
}

/**
 * Add language prefix to a pathname.
 * e.g., "/about/company" with lang "en" => "/en/about/company"
 */
function addLangPrefix(pathname, lang) {
  const stripped = stripLangPrefix(pathname);
  if (stripped === '/') {
    return `/${lang}`;
  }
  return `/${lang}${stripped}`;
}

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine initial language from URL > localStorage > default
  const getInitialLang = () => {
    const pathLang = getLangFromPath(location.pathname);
    if (pathLang) return pathLang;

    const storedLang = localStorage.getItem(STORAGE_KEY);
    if (storedLang && SUPPORTED_LANGS.includes(storedLang)) return storedLang;

    return DEFAULT_LANG;
  };

  const [currentLang, setCurrentLang] = useState(getInitialLang);

  // Sync language when URL changes
  useEffect(() => {
    const pathLang = getLangFromPath(location.pathname);
    if (pathLang && pathLang !== currentLang) {
      setCurrentLang(pathLang);
      localStorage.setItem(STORAGE_KEY, pathLang);
    }
  }, [location.pathname, currentLang]);

  // On initial load, if URL has no language prefix, redirect to the correct one
  useEffect(() => {
    const pathLang = getLangFromPath(location.pathname);
    if (!pathLang) {
      const lang = currentLang || DEFAULT_LANG;
      const newPath = addLangPrefix(location.pathname, lang);
      navigate(newPath + location.search + location.hash, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Switch language and navigate to the equivalent path with the new prefix.
   */
  const setLanguage = useCallback((lang) => {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    setCurrentLang(lang);
    localStorage.setItem(STORAGE_KEY, lang);

    // Navigate to same page with new language prefix
    const currentPathWithoutLang = stripLangPrefix(location.pathname);
    const newPath = addLangPrefix(currentPathWithoutLang, lang);
    navigate(newPath + location.search + location.hash, { replace: true });
  }, [location.pathname, location.search, location.hash, navigate]);

  /**
   * Translation function - supports nested dot-notation keys.
   * e.g., t('nav.company') => locales[currentLang].nav.company
   * Returns the key itself as fallback if not found.
   */
  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = locales[currentLang];
    for (const k of keys) {
      if (value === undefined || value === null) return key;
      value = value[k];
    }
    if (value === undefined || value === null) return key;
    return value;
  }, [currentLang]);

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, getLangFromPath, stripLangPrefix, addLangPrefix, SUPPORTED_LANGS, DEFAULT_LANG };
export default LanguageContext;
