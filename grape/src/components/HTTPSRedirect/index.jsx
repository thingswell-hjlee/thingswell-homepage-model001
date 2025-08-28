import React, { useEffect } from 'react';

const HTTPSRedirect = ({ children }) => {
  useEffect(() => {
    // 프로덕션 환경에서만 HTTPS 리다이렉트 적용
    if (import.meta.env.PROD && window.location.protocol === 'http:') {
      const httpsUrl = window.location.href.replace('http:', 'https:');
      window.location.replace(httpsUrl);
    }
  }, []);

  return <>{children}</>;
};

export default HTTPSRedirect;


