import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import BaseLayout from '../../components/Layout/BaseLayout';
import company from '../../assets/header_image/company.jpg';
import CertificateSection from '../../components/CertificateSection/CertificateSection';
import './About.css';

const Licenses = () => {
  return (
    <div className="page-container about-page">
      <ProductHeader image={company} alt="licenses" />
      <BaseLayout breadcrumbs={["Home", "About", "면허인증특허"]} title="면허인증특허">
        <div className="page-content-inner">
          <CertificateSection />
        </div>
      </BaseLayout>
    </div>
  );
};

export default Licenses;


