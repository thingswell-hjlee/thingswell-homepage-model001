import React, { useState } from 'react';
import ProductHeader from './ProductHeader';
import ProductInfo from './ProductInfo';
import ProductGallery from './ProductGallery';
import ProductTabs from './ProductTabs';
import Lightbox from '../Common/Lightbox';
import TabContent from './TabContent';
import ContentBottomBox from './ContentBottomBox';
import { marked } from 'marked';
import './ProductPage.css';

// 인라인 편집 컴포넌트
const EditableText = ({ field, value, placeholder, multiline = false, style = {}, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  const startEditing = () => {
    setIsEditing(true);
    setTempValue(value || '');
  };

  const saveEdit = () => {
    if (onSave && tempValue !== value) {
      onSave(field, tempValue);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTempValue(value || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  if (isEditing) {
    const Component = multiline ? 'textarea' : 'input';
    return (
      <Component
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={saveEdit}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          ...style,
          border: '2px solid #007bff',
          borderRadius: '4px',
          padding: '8px',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          background: 'white',
          outline: 'none',
          resize: multiline ? 'vertical' : 'none',
          minHeight: multiline ? '60px' : 'auto',
          width: '100%',
          boxSizing: 'border-box',
          textAlign: 'left'
        }}
        autoFocus
        lang="ko"
        inputMode="text"
        onCompositionStart={(e) => {
          e.target.style.imeMode = 'active';
          e.target.setAttribute('data-composing', 'true');
        }}
        onCompositionEnd={(e) => {
          e.target.style.imeMode = 'auto';
          e.target.removeAttribute('data-composing');
          // 한글 입력 완료 시 최종 값 설정
          setTempValue(e.target.value);
        }}
        onChange={(e) => {
          // 한글 입력 중이 아닐 때만 값 업데이트
          if (!e.target.getAttribute('data-composing')) {
            setTempValue(e.target.value);
          }
        }}
      />
    );
  }

  return (
    <div
      onClick={startEditing}
      style={{
        ...style,
        cursor: 'pointer',
        border: '2px solid transparent',
        borderRadius: '4px',
        padding: '8px',
        transition: 'all 0.2s ease',
        minHeight: multiline ? '60px' : 'auto',
        display: 'flex',
        alignItems: multiline ? 'flex-start' : 'center',
        justifyContent: 'flex-start',
        textAlign: 'left'
      }}
      onMouseEnter={(e) => {
        e.target.style.borderColor = '#e9ecef';
        e.target.style.backgroundColor = '#f8f9fa';
      }}
      onMouseLeave={(e) => {
        e.target.style.borderColor = 'transparent';
        e.target.style.backgroundColor = 'transparent';
      }}
    >
      {value || placeholder}
    </div>
  );
};

// 마크다운을 HTML로 렌더링하는 컴포넌트
const MarkdownRenderer = ({ content }) => {
  if (!content) return null;
  
  try {
    const htmlContent = marked(content);
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        style={{
          lineHeight: '1.6',
          fontSize: '14px'
        }}
      />
    );
  } catch (error) {
    console.error('마크다운 파싱 오류:', error);
    return <div>{content}</div>;
  }
};

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
        title: "문제 해결 가이드",
        description: "일반적인 문제와 해결 방법을 안내합니다.",
        thumbnail: "/placeholder-video.png"
      }
    ]
  },
  isEditMode = false,
  onDataChange = null,
  hideHeader = false,
  isRecordPage = false
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tabsCollapsed, setTabsCollapsed] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, src: '', caption: '', alt: '' });

  const handleDataChange = (field, value) => {
    if (onDataChange) {
      onDataChange(field, value);
    }
  };

  const openLightbox = (src, caption = '', alt = '') => {
    setLightbox({ open: true, src, caption, alt });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, src: '', caption: '', alt: '' });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // 탭 구성 - 제품 페이지와 실적 페이지 구분
  const tabs = isRecordPage ? [
    { id: 'overview', label: '개요', icon: '📋' }
  ] : [
    { id: 'overview', label: '개요', icon: '📋' },
    { id: 'features', label: '주요 기능', icon: '⚡' },
    { id: 'specs', label: '사양', icon: '📊' },
    { id: 'certifications', label: '인증', icon: '🏆' },
    { id: 'downloads', label: '다운로드', icon: '📥' },
    { id: 'videos', label: '동영상', icon: '🎥' }
  ];

  // 탭별 허용 설정
  const allowedTabIdsConfig = isRecordPage ? {
    overview: true
  } : {
    overview: true,
    features: true,
    specs: true,
    certifications: true,
    downloads: true,
    videos: true
  };

  // 최대 표시 탭 수 설정
  const maxVisibleTabsConfig = isRecordPage ? 1 : 6;

  // 하단 박스 콘텐츠 존재 여부 (실적 페이지에서는 제목 제외)
  const hasBottomBoxContent = isRecordPage ? 
    (productData?.bottom_box_description || 
     productData?.bottom_box_photo || 
     productData?.bottom_box_photos?.length) :
    (productData?.bottom_box_title || 
     productData?.bottom_box_description || 
     productData?.bottom_box_photo || 
     productData?.bottom_box_photos?.length);

  return (
    <div className="product-page">
      {!hideHeader && <ProductHeader />}
      
      <div className="product-page-content">
        <div className="container">
          <ProductInfo 
            productName={productData.name}
            productTitle={productData.title}
            description={productData.description}
            breadcrumbs={productData.breadcrumbs}
            isEditMode={isEditMode}
            onDataChange={handleDataChange}
          />
          
          <div className="product-main-section">
            <div className="product-tabs-header">
              <ProductTabs 
                productName={productData.name}
                tabs={tabs}
                allowedTabIds={allowedTabIdsConfig}
                maxVisibleTabs={maxVisibleTabsConfig}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                collapsed={tabsCollapsed}
                onToggleChange={setTabsCollapsed}
                isRecordPage={isRecordPage}
              />
              {activeTab === 'overview' ? (
                <div className="product-content-section">
                  <div className="product-gallery-section">
                    <ProductGallery 
                      images={productData.images}
                      productName={productData.name}
                      captions={productData?.gallery_captions}
                      onImageClick={openLightbox}
                    />
                  </div>
                  <div className="tab-content-area">
                    {isEditMode ? (
                      <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', marginBottom: '20px' }}>
                        <h3 style={{ marginBottom: '15px', color: '#495057' }}>개요 편집</h3>
                        <div style={{ marginBottom: '20px' }}>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#6c757d' }}>개요 제목</label>
                          <EditableText
                            field="overview_title"
                            value={productData.overview_title}
                            placeholder="개요 제목을 입력하세요"
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                            onSave={handleDataChange}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#6c757d' }}>개요 내용</label>
                          <EditableText
                            field="overview"
                            value={productData.overview}
                            placeholder="개요 내용을 입력하세요"
                            multiline={true}
                            style={{ fontSize: '14px', lineHeight: '1.6' }}
                            onSave={handleDataChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <TabContent 
                        tabId={activeTab}
                        productData={productData}
                        featureClickToOpen={true}
                        onFeatureImageClick={openLightbox}
                      />
                    )}
                  </div>
                  {hasBottomBoxContent && (
                    <ContentBottomBox
                      title={productData?.bottom_box_title || '추가 정보'}
                      description={productData?.bottom_box_description}
                      photo={productData?.bottom_box_photo}
                      photos={productData?.bottom_box_photos}
                      photoCaption={productData?.bottom_box_photo_caption}
                      photoCaptions={productData?.bottom_box_photo_captions}
                      isEditMode={isEditMode}
                      onDataChange={handleDataChange}
                      isRecordPage={isRecordPage}
                    />
                  )}
                </div>
              ) : (
                <div className="tab-content-area">
                  <TabContent 
                    tabId={activeTab}
                    productData={productData}
                    featureClickToOpen={true}
                    onFeatureImageClick={openLightbox}
                  />
                </div>
              )}


            </div>
          </div>
        </div>
      </div>
      <Lightbox
        isOpen={lightbox.open}
        src={lightbox.src}
        caption={lightbox.caption}
        alt={lightbox.alt}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default ProductPage;
