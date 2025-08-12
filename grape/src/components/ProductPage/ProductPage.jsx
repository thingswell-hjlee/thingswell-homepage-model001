import React, { useState } from 'react';
import ProductHeader from './ProductHeader';
import ProductInfo from './ProductInfo';
import ProductGallery from './ProductGallery';
import ProductTabs from './ProductTabs';
import TabContent from './TabContent';
import ContentBottomBox from './ContentBottomBox';
import './ProductPage.css';

const ProductPage = ({ 
  productData = {
    name: "XCN-3000",
    title: "어드밴스드 통합제어기",
    description: "카트 이동식 태양광 80w 30배 줌 5백만 화소 초 고화질 PTZ 카메라 세트는 비 포장 공사 현장에서도 이동이 용이하며, LTE 라우터를 설치하여 PC 또는 모바일로 원격 관제 합니다.",
    breadcrumbs: ["Home", "Products", "Control system"],
    images: [],
    overview: "XCN-3000은 산업용 통합 제어 시스템으로, 다양한 센서와 장비를 연결하여 실시간 모니터링 및 제어를 제공합니다.",
    keyFeatures: [
      "고성능 멀티코어 프로세서",
      "실시간 데이터 처리",
      "다양한 통신 프로토콜 지원",
      "확장 가능한 모듈식 구조"
    ],
    features: [
      {
        icon: "🔧",
        title: "통합 제어 시스템",
        description: "다양한 장비와 시스템을 통합하여 효율적으로 제어할 수 있습니다."
      },
      {
        icon: "📊",
        title: "실시간 모니터링",
        description: "실시간으로 시스템 상태를 모니터링하고 분석합니다."
      },
      {
        icon: "🛡️",
        title: "보안 기능",
        description: "강력한 보안 기능으로 시스템을 안전하게 보호합니다."
      },
      {
        icon: "⚡",
        title: "고성능 처리",
        description: "고성능 프로세서로 빠른 응답 속도를 제공합니다."
      }
    ],
    specifications: [
      { label: "프로세서", value: "Intel Core i7" },
      { label: "메모리", value: "16GB DDR4" },
      { label: "저장공간", value: "512GB SSD" },
      { label: "네트워크", value: "Gigabit Ethernet" },
      { label: "전원", value: "100-240V AC" },
      { label: "작동온도", value: "-10°C ~ 50°C" }
    ],
    certifications: [
      {
        name: "ISO 9001",
        description: "품질 관리 시스템 인증",
        image: "/placeholder-cert.png"
      },
      {
        name: "CE 인증",
        description: "유럽 안전 표준 인증",
        image: "/placeholder-cert.png"
      },
      {
        name: "FCC 인증",
        description: "미국 연방 통신 위원회 인증",
        image: "/placeholder-cert.png"
      }
    ],
    downloads: [
      {
        title: "제품 매뉴얼",
        description: "XCN-3000 사용자 매뉴얼",
        size: "2.5MB"
      },
      {
        title: "기술 사양서",
        description: "상세 기술 사양 및 데이터시트",
        size: "1.8MB"
      },
      {
        title: "설치 가이드",
        description: "설치 및 설정 가이드",
        size: "3.2MB"
      }
    ],
    videos: [
      {
        title: "제품 소개 영상",
        description: "XCN-3000의 주요 기능과 특징을 소개합니다.",
        thumbnail: "/placeholder-video.png"
      },
      {
        title: "설치 및 설정 가이드",
        description: "단계별 설치 및 설정 방법을 보여줍니다.",
        thumbnail: "/placeholder-video.png"
      },
      {
        title: "사용법 데모",
        description: "실제 사용 사례와 데모를 제공합니다.",
        thumbnail: "/placeholder-video.png"
      }
    ]
  }
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const hasBottomBoxContent = Boolean(
    productData?.bottom_box_title ||
    productData?.bottom_box_description ||
    productData?.bottom_box_photo ||
    (productData?.bottom_box_photos && productData.bottom_box_photos.length > 0)
  );

  const tabs = [
    { id: 'overview', label: '소개', content: 'overview' },
    { id: 'features', label: '주요기능', content: 'features' },
    { id: 'specs', label: '제품스펙', content: 'specs' },
    { id: 'certifications', label: '인증', content: 'certifications' },
    { id: 'downloads', label: '자료 다운로드', content: 'downloads' },
    { id: 'videos', label: '관련영상', content: 'videos' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="product-page">
      <ProductHeader />
      
      <div className="product-page-content">
        <div className="container">
          <ProductInfo 
            productName={productData.name}
            productTitle={productData.title}
            description={productData.description}
            breadcrumbs={productData.breadcrumbs}
          />
          
          <div className="product-main-section">
            <div className="product-tabs-header">
              <ProductTabs 
                productName={productData.name}
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
              {activeTab === 'overview' ? (
                <div className="product-content-section">
                  <div className="product-gallery-section">
                    <ProductGallery 
                      images={productData.images}
                      productName={productData.name}
                      captions={productData?.gallery_captions}
                    />
                  </div>
                  <div className="tab-content-area">
                    <TabContent 
                      tabId={activeTab}
                      productData={productData}
                    />
                  </div>
                  {hasBottomBoxContent && (
                    <ContentBottomBox
                      title={productData?.bottom_box_title || '추가 정보'}
                      description={productData?.bottom_box_description}
                      photo={productData?.bottom_box_photo}
                      photos={productData?.bottom_box_photos}
                      photoCaption={productData?.bottom_box_photo_caption}
                      photoCaptions={productData?.bottom_box_photo_captions}
                    />
                  )}
                </div>
              ) : (
                <div className="tab-content-area">
                  <TabContent 
                    tabId={activeTab}
                    productData={productData}
                  />
                </div>
              )}
            
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
