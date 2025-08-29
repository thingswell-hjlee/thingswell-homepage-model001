import React, { useEffect } from 'react';

const HTTPSRedirect = ({ children }) => {
  useEffect(() => {
    // 프로덕션 환경에서만 HTTPS 리다이렉트 적용
    // 테스트 환경(TEST_MODE 환경변수)이 설정되어 있으면 리다이렉트하지 않음
    const isProd = typeof import.meta !== 'undefined' && !!import.meta.env && !!import.meta.env.PROD;
    const isTestMode = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_TEST_MODE === 'true') || (typeof process !== 'undefined' && process.env && process.env.REACT_APP_TEST_MODE === 'true');

    if (isProd && !isTestMode && window.location.protocol === 'http:') {
      const httpsUrl = window.location.href.replace('http:', 'https:');
      window.location.replace(httpsUrl);
    }
  }, []);

  return <>{children}</>;
};

export default HTTPSRedirect;


