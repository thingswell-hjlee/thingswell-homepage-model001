import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import BaseLayout from '../../components/Layout/BaseLayout';
import useTranslation from '../../hooks/useTranslation';
import company from '../../assets/header_image/company.jpg';
import CertificateSection from '../../components/CertificateSection/CertificateSection';
import './About.css';

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


