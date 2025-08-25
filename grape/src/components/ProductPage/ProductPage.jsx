import React, { useState, useEffect } from 'react';
import ProductHeader from './ProductHeader';
import performanceHeader from '../../assets/header_image/performance.jpg';
import productHeader from '../../assets/header_image/product.jpg';
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
        display: multiline ? 'block' : 'flex',
        alignItems: multiline ? 'flex-start' : 'center',
        justifyContent: 'flex-start',
        textAlign: 'left',
        whiteSpace: multiline ? 'pre-wrap' : 'normal',
        lineHeight: multiline ? '1.5' : 'normal'
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
    keyFeatures: [],
    features: [],
    specifications: [],
    certifications: [],
    downloads: [],
    videos: []
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

  // 탭별 데이터 존재 여부 확인 함수
  const hasTabData = (tabId) => {
    switch (tabId) {
      case 'overview':
        return true; // 개요는 항상 표시
      case 'features':
        return (productData?.keyFeatures && productData.keyFeatures.length > 0) ||
               (productData?.keyFeaturesImages && productData.keyFeaturesImages.length > 0) ||
               (productData?.features && productData.features.length > 0);
      case 'specs':
        return productData?.specifications && productData.specifications.length > 0;
      case 'certifications':
        return productData?.certifications && productData.certifications.length > 0;
      case 'downloads':
        return productData?.downloads && productData.downloads.some(download => 
          download.title && download.title.trim() !== '' && 
          download.description && download.description.trim() !== '' && 
          download.link && download.link.trim() !== ''
        );
      case 'videos':
        return productData?.videos && productData.videos.length > 0;
      default:
        return false;
    }
  };

  // 탭 구성 - 제품 페이지와 실적 페이지 구분, 데이터가 있는 탭만 표시
  const allTabs = isRecordPage ? [
    { id: 'overview', label: '개요', icon: '📋' }
  ] : [
    { id: 'overview', label: '개요', icon: '📋' },
    { id: 'features', label: '주요 기능', icon: '⚡' },
    { id: 'specs', label: '사양', icon: '📊' },
    { id: 'certifications', label: '인증', icon: '🏆' },
    { id: 'downloads', label: '다운로드', icon: '📥' },
    { id: 'videos', label: '동영상', icon: '🎥' }
  ];

  const tabs = allTabs.filter(tab => hasTabData(tab.id));

  // 활성 탭이 필터링된 탭 목록에 없으면 첫 번째 탭으로 변경
  useEffect(() => {
    if (tabs.length > 0 && !tabs.find(tab => tab.id === activeTab)) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

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

  // 최대 표시 탭 수 설정 (필터링된 탭 수에 맞춤)
  const maxVisibleTabsConfig = isRecordPage ? 1 : tabs.length;

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
      {!hideHeader && <ProductHeader image={isRecordPage ? performanceHeader : productHeader} />}
      
      <div className="product-page-content">
        <div className="container">
          <ProductInfo 
            productName={productData.name}
            productTitle={productData.title}
            description={productData.description}
            breadcrumbs={productData.breadcrumbs}
            isEditMode={isEditMode}
            onDataChange={handleDataChange}
            isRecordPage={isRecordPage}
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
                        <div style={{ marginBottom: '20px' }}>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#6c757d' }}>
                            {isRecordPage ? '실적명' : '제품명'}
                          </label>
                          <EditableText
                            field="overview_title"
                            value={productData.overview_title}
                            placeholder={isRecordPage ? "실적명을 입력하세요" : "제품명을 입력하세요"}
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                            onSave={handleDataChange}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#6c757d' }}>
                            {isRecordPage ? '실적 설명' : '제품 설명'}
                          </label>
                          <EditableText
                            field="overview"
                            value={productData.overview}
                            placeholder={isRecordPage ? "실적 설명을 입력하세요" : "제품 설명을 입력하세요"}
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

              {/* Collapsed 상태일 때 다른 탭들의 콘텐츠를 하단에 표시 */}
              {tabsCollapsed && !isRecordPage && tabs.filter(tab => tab.id !== 'overview').length > 0 && (
                <div className="collapsed-content-strip">
                  {tabs.filter(tab => tab.id !== 'overview').map(tab => {
                    if (!hasTabData(tab.id)) return null;
                    return (
                      <div key={tab.id} className="collapsed-item">
                        <h3 style={{ 
                          marginBottom: '15px', 
                          color: '#495057', 
                          fontSize: '18px',
                          fontWeight: 'bold',
                          borderBottom: '2px solid #e5e7eb',
                          paddingBottom: '10px'
                        }}>
                          {tab.label}
                        </h3>
                        <TabContent 
                          tabId={tab.id}
                          productData={productData}
                          featureClickToOpen={true}
                          onFeatureImageClick={openLightbox}
                        />
                      </div>
                    );
                  })}
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
