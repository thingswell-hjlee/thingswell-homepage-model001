import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import BaseLayout from '../../components/Layout/BaseLayout';
import useTranslation from '../../hooks/useTranslation';
import company from '../../assets/header_image/company.jpg';
import CertificateSection from '../../components/CertificateSection/CertificateSection';
import './About.css';

// TODO: CertificateSection has hardcoded Korean strings (면허인증특허, category names, certificate titles).
// i18n for CertificateSection should be implemented as a follow-up task.

const Licenses = () => {
  const { t } = useTranslation();
  return (
    <div className="page-container about-page">
      <ProductHeader image={company} alt="licenses" />
      <BaseLayout breadcrumbs={[t('about.breadcrumbs.0'), t('about.licensesBreadcrumb')]} title={t('about.licensesTitle')}>
        <div className="page-content-inner">
          <CertificateSection />
        </div>
      </BaseLayout>
    </div>
  );
};

export default Licenses;


