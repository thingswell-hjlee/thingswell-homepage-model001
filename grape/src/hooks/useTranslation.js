import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

/**
 * Convenience hook for accessing translation utilities.
 * @returns {{ t: (key: string) => string, currentLang: string, setLanguage: (lang: string) => void }}
 */
const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return {
    t: context.t,
    currentLang: context.currentLang,
    setLanguage: context.setLanguage,
  };
};

export default useTranslation;
