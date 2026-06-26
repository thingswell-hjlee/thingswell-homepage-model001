import React from "react";
import ProductList from '../../pages/Products/ProductList';
import useTranslation from "../../hooks/useTranslation";
import "./CertificateSection.css";

// Certificate imports
import patentCertificate1 from "../../assets/patent_certificate_10-2404374.png";
import patentCertificate2 from "../../assets/patent_certificate_10-2424407.png";
import patentCertificate3 from "../../assets/patent_certificate_10-2529240.png";
import patentCertificate4 from "../../assets/patent_certificate_10-2825255.png";
import softwareBusinessOperatorCertificate from "../../assets/software_business_operator_certificate.png";
import factoryRegistrationCertificate from "../../assets/factory_registration_certificate.png";
import corporateResearchInstituteCertificate from "../../assets/corporate_research_institute_certificate.png";
import ventureEnterpriseCertificate from "../../assets/venture_enterprise_certificate.png";
import informationCommunicationBusinessCertificate from "../../assets/information_communication_business_certificate.png"; 

import copyright1 from "../../assets/about/copyright1.png";
import copyright2 from "../../assets/about/copyright2.png";
import copyright3 from "../../assets/about/copyright3.png";
import copyright4 from "../../assets/about/copyright4.png";
import copyright5 from "../../assets/about/copyright5.png";
import copyright6 from "../../assets/about/copyright6.png";
import copyright7 from "../../assets/about/copyright7.png";
import copyright8 from "../../assets/about/copyright8.png";
import copyright9 from "../../assets/about/copyright9.png";
import copyright10 from "../../assets/about/10.png";
import copyright11 from "../../assets/about/11.png";
import copyright12 from "../../assets/about/copyright12.png";

const CertificateSection = () => {
  const { t } = useTranslation();
  // 인증서 이미지(import 바인딩)는 JSON에 담을 수 없으므로 순서대로 별도 배열 유지
  const certificateImages = [
    copyright12,
    informationCommunicationBusinessCertificate,
    softwareBusinessOperatorCertificate,
    factoryRegistrationCertificate,
    ventureEnterpriseCertificate,
    corporateResearchInstituteCertificate,
    patentCertificate1,
    patentCertificate2,
    patentCertificate3,
    patentCertificate4,
    copyright10,
    copyright11,
    copyright9,
    copyright8,
    copyright1,
    copyright4,
    copyright2,
    copyright6,
    copyright7,
    copyright5,
    copyright3
  ];
  const certificateData = t('aboutPage.certificate.items').map((c, i) => ({
    ...c,
    image: certificateImages[i]
  }));

  return (
    <div id="certificate" className="certificate-section">
      <div className="certificate-container">
        <div className="certificate-section-title-container">
          <div className="certificate-subtitle">Certificate</div>
          <div className="certificate-title">{t('aboutPage.certificate.sectionTitle')}</div>
        </div>
        <div className="certificate-cards">
          <ProductList
            embedded
            title={t('aboutPage.certificate.listTitle')}
            subtitle={t('aboutPage.certificate.listSubtitle')}
            breadcrumbs={["Home", "About", "Certificates"]}
            hideSearch={true}
            disableScrollOnPageChange={true}
            hidePagination={true}
            itemsPerPage={999}
            cols={5}
            products={certificateData.map((c, idx) => ({
              name: c.title,
              title: c.label,
              img: c.image,
              desc: c.imageAlt,
              category: c.category,
              link: undefined,
              organization: c.organization,
              date: c.date
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateSection;
