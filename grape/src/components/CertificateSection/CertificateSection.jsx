import React from "react";
import ProductList from '../../pages/Products/ProductList';
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
  const certificateData = [
    // 사업등록
    {
      title: "사업자등록증",
      image: copyright12,
      imageAlt: "SW사업자 일반현황관리확인서",
      category: "면허등록증",
      organization: "국세청",
      date: "2025-04-28"
    },
    {
      title: "정보통신공사업등록증",
      image: informationCommunicationBusinessCertificate,
      imageAlt: "정보통신공사업등록증",
      category: "면허등록증",
      organization: "경기도",
      date: "2023-09-14"
    },
    {
      title: "SW사업자 일반현황관리확인서",
      image: softwareBusinessOperatorCertificate,
      imageAlt: "SW사업자 일반현황관리확인서",
      category: "면허등록증",
      organization: "한국소프트웨어산업협회",
      date: "2024-05-30"
    },
    {
      title: "공장등록증명서",
      image: factoryRegistrationCertificate,
      imageAlt: "공장등록증명서",
      category: "면허등록증",
      organization: "한국산업단지공단",
      date: "2025-06-23"
    },
    
    // 기업인증
    {
      title: "벤처기업 확인서",
      image: ventureEnterpriseCertificate,
      imageAlt: "벤처기업 확인서",
      category: "인정서",
      organization: "벤처기업확인기관",
      date: "2025-08-13"
    },
    {
      title: "기업부설연구소 인증서",
      image: corporateResearchInstituteCertificate,
      imageAlt: "기업부설연구소 인증서",
      category: "인정서",
      organization: "한국산업기술진흥협회",
      date: "2025-08-20"
    },
    
    // 특허
    {
      title: "실내외 센서 모듈을 이용한 공기질 관리 방법 및 장치",
      image: patentCertificate1,
      imageAlt: "특허증 - 실내외 센서 모듈을 이용한 공기질 관리 방법 및 장치",
      category: "특허",
      organization: "특허청",
      date: "2022-05-27"
    },      
    {
      title: "AI 기반의 캡슐형 스마트 쉘터",
      image: patentCertificate2,
      imageAlt: "특허증 - AI 기반의 캡슐형 스마트 쉘터",
      category: "특허",
      organization: "특허청",
      date: "2022-07-19"
    },
    {
      title: "사용자 맞춤형 서비스를 제공하는 캡슐형 스마트 쉘터",
      image: patentCertificate3,
      imageAlt: "특허증 - 사용자 맞춤형 서비스를 제공하는 캡슐형 스마트 쉘터",
      category: "특허",
      organization: "특허청",
      date: "2023-04-28"
    },
    {
      title: "레이더와 카메라를 이용한 위급 상황 알람 장치",
      image: patentCertificate4,
      imageAlt: "특허증 - 레이더와 카메라를 이용한 위급 상황 알람 장치",
      category: "특허",
      organization: "특허청",
      date: "2025-06-20"
    },
    {
      title: "상표등록증",
      image: copyright10,
      imageAlt: "상표등록증",
      category: "특허",
      organization: "특허청",
      date: "2020-03-27"
    },
    {
      title: "디자인등록증",
      image: copyright11,
      imageAlt: "디자인등록증",
      category: "특허",
      organization: "특허청",
      date: "2024-07-16"
    },
    
    // 저작권
    {
      title: "티웨스웰 게이트웨이 서버",
      image: copyright9,
      imageAlt: "저작권 등록증 - 티웨스웰 게이트웨이 서버",
      category: "저작권",
      organization: "한국저작권위원회",
      date: "2023-06-14"
    },
    {
      title: "티웨스웰 토스 서버",
      image: copyright8,
      imageAlt: "저작권 등록증 - 티웨스웰 토스 서버",
      category: "저작권",
      organization: "한국저작권위원회",
      date: "2023-06-14"
    },
    {
      title: "다중 동영상 원격제어 소프트웨어",
      image: copyright1,
      imageAlt: "저작권 등록증 - 다중 동영상 원격제어 소프트웨어",
      category: "저작권",
      organization: "한국저작권위원회",
      date: "2024-09-24"
    },
    {
      title: "애니스페이스매니저프로그램",
      image: copyright4,
      imageAlt: "저작권 등록증 - 애니스페이스매니저프로그램",
      category: "저작권",
      organization: "한국저작권위원회",
      date: "2024-01-30"
    },
    {
      title: "레이더 기반 안전 감지 시스템",
      image: copyright2,
      imageAlt: "저작권 등록증 - 레이더 기반 안전 감지 시스템",
      category: "저작권",
      organization: "한국저작권위원회",
      date: "2024-07-31"
    },
    {
      title: "홈케어를 위한 AI 대화 프로그램",
      image: copyright6,
      imageAlt: "저작권 등록증 - 홈케어를 위한 AI 대화 프로그램",
      category: "저작권",
      organization: "한국저작권위원회",
      date: "2024-11-20"
    },
    {
      title: "홈케어용 QnA 쿼리 관리 시스템 프로그램",
      image: copyright7,
      imageAlt: "저작권 등록증 - 홈케어용 QnA 쿼리 관리 시스템 프로그램",
      category: "저작권",
      organization: "한국저작권위원회",
      date: "2024-11-20"
    },
    {
      title: "음성인식을 통한 산업현장 안전사고 대처 프로그램",
      image: copyright5,
      imageAlt: "저작권 등록증 - 음성인식을 통한 산업현장 안전사고 대처 프로그램",
      category: "저작권",
      organization: "한국저작권위원회",
      date: "2025-05-27"
    },
    {
      title: "센서 시험 프로그램",
      image: copyright3,
      imageAlt: "저작권 등록증 - 센서 시험 프로그램",
      category: "저작권",
      organization: "한국저작권위원회",
      date: "2025-05-27"
    }
  ];

  return (
    <div id="certificate" className="certificate-section">
      <div className="certificate-container">
        <div className="certificate-section-title-container">
          <div className="certificate-subtitle">Certificate</div>
          <div className="certificate-title">면허인증특허</div>
        </div>
        <div className="certificate-cards">
          <ProductList
            embedded
            title="인증 및 특허"
            subtitle="회사 보유 인증서와 특허"
            breadcrumbs={["Home", "About", "Certificates"]}
            hideSearch={true}
            disableScrollOnPageChange={true}
            hidePagination={true}
            itemsPerPage={999}
            cols={3}
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
