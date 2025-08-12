import React from 'react';
import './TabContent.css';
import ThreeColumnGrid from '../ThreeColumnGrid';
import ImageWithCaption from '../Common/ImageWithCaption';
import featureImg1 from '../../assets/server.jpg';
import featureImg2 from '../../assets/manufacturing.jpg';
import featureImg3 from '../../assets/construction.jpg';
import featureImg4 from '../../assets/buildings.jpg';

const TabContent = ({ tabId, productData }) => {
  const renderContent = () => {
    switch (tabId) {
      case 'overview':
        return (
          <div className="tab-overview">
            <div className="overview-section">
              <div className="overview-item">
                <div className="overview-item-title">
                  <h1>{productData?.overview_title}</h1>
                  <p>{productData?.description}</p>
                </div>
                <p>{productData?.overview || "제품에 대한 전반적인 개요를 제공합니다."}</p>
              </div>
            </div>
            {(() => {
              const images = Array.isArray(productData?.overview_media)
                ? productData.overview_media
                : (Array.isArray(productData?.overview_images) ? productData.overview_images : []);
              if (!images || images.length === 0) return null;
              const gridClass = `overview-media-grid${images.length === 1 ? ' single' : ''}`;
              return (
                <div className={gridClass}>
                  {images.map((item, idx) => (
                    <ImageWithCaption
                      key={idx}
                      className="overview-media-box"
                      src={item?.image || item?.src || item}
                      alt={item?.title || item?.caption || `overview-${idx}`}
                      caption={item?.title || item?.caption}
                      position="top-left"
                    />
                  ))}
                </div>
              );
            })()}
          </div>
        );
        
      case 'features':
        return (
          <div className="tab-features">
            {(() => {
              const isTextOnly = Boolean(productData?.features_text_only);
              if (isTextOnly) {
                const unifiedFeatures = Array.isArray(productData?.features_media)
                  ? productData.features_media
                  : productData?.features || [];
                const items = Array.isArray(unifiedFeatures) ? unifiedFeatures : [];
                return (
                  <ul className="feature-text-list">
                    {items.map((item, index) => (
                      <li key={index}>{item?.title || item?.caption || String(item)}</li>
                    ))}
                  </ul>
                );
              }
            })()}
            {!productData?.features_text_only && (
              <ThreeColumnGrid>
                {(() => {
                const fallbackImages = [featureImg1, featureImg2, featureImg3, featureImg4];
                const unifiedFeatures = Array.isArray(productData?.features_media)
                  ? productData.features_media
                  : null;
                const sourceFeatures = unifiedFeatures || productData?.features;
                const baseFeatures = (sourceFeatures && sourceFeatures.length > 0)
                  ? sourceFeatures
                  : [
                      {
                        image: featureImg1,
                        title: '통합 제어 시스템',
                        description:
                          '다양한 장비와 시스템을 통합하여 효율적으로 제어할 수 있습니다.',
                      },
                      {
                        image: featureImg2,
                        title: '실시간 모니터링',
                        description:
                          '실시간으로 시스템 상태를 모니터링하고 분석합니다.',
                      },
                      {
                        image: featureImg3,
                        title: '보안 기능',
                        description:
                          '강력한 보안 기능으로 시스템을 안전하게 보호합니다.',
                      },
                      {
                        image: featureImg4,
                        title: '고성능 처리',
                        description:
                          '고성능 프로세서로 빠른 응답 속도를 제공합니다.',
                      },
                    ];
                const featuresWithImages = baseFeatures.map((f, idx) => ({
                  ...f,
                  image: f.image || fallbackImages[idx % fallbackImages.length],
                }));
                return featuresWithImages;
                })().map((feature, index) => (
                  <div key={index} className="feature-card media-with-description">
                    <ImageWithCaption
                      className="feature-media"
                      imgClassName="feature-image"
                      src={feature.image}
                      alt={feature.title || 'feature'}
                      caption={feature.title}
                      position="top-left"
                    />
                    {feature.description ? (
                      <p className="media-description">{feature.description}</p>
                    ) : null}
                  </div>
                ))}
              </ThreeColumnGrid>
            )}
          </div>
        );
        
      case 'specs':
        return (
          <div className="tab-specs">
            {(() => {
              const fallbackImages = [featureImg1, featureImg2, featureImg3, featureImg4];
              const galleryImages = Array.isArray(productData?.images) && productData.images.length > 0
                ? productData.images
                : fallbackImages;

              // 통합 포맷: productData.specs_media
              const specsMedia = productData?.specs_media;
              if (Array.isArray(specsMedia) && specsMedia.length === 1) {
                const onlyItem = specsMedia[0];
                const onlyImage = onlyItem?.image || onlyItem?.src || galleryImages[0];
                const onlyCaption = onlyItem?.title || onlyItem?.caption;
                return (
                  <div className="specs-media-grid single">
                    <ImageWithCaption
                      className="specs-media-box single"
                      src={onlyImage}
                      alt={onlyCaption || 'specs-single'}
                      caption={onlyCaption}
                      position="top-left"
                    />
                  </div>
                );
              }
              let leftItem = null;
              let rightTopItem = null;
              let rightBottomItem = null;

              if (Array.isArray(specsMedia)) {
                leftItem = specsMedia[0] || null;
                rightTopItem = specsMedia[1] || null;
                rightBottomItem = specsMedia[2] || null;
              } else if (specsMedia && typeof specsMedia === 'object') {
                leftItem = specsMedia.left || null;
                rightTopItem = specsMedia.rightTop || null;
                rightBottomItem = specsMedia.rightBottom || null;
              }

              // 하위 호환: 분리 포맷
              const legacyImages = productData?.specs_images;
              const legacyCaptions = productData?.specs_captions;

              const leftImage = (leftItem?.image || leftItem?.src)
                || (Array.isArray(legacyImages) ? legacyImages[0] : legacyImages?.left)
                || galleryImages[0]
                || fallbackImages[0];
              const rightTopImage = (rightTopItem?.image || rightTopItem?.src)
                || (Array.isArray(legacyImages) ? legacyImages[1] : legacyImages?.rightTop)
                || galleryImages[1]
                || fallbackImages[1];
              const rightBottomImage = (rightBottomItem?.image || rightBottomItem?.src)
                || (Array.isArray(legacyImages) ? legacyImages[2] : legacyImages?.rightBottom)
                || galleryImages[2]
                || fallbackImages[2];

              const leftCaption = (leftItem?.caption || leftItem?.title)
                || (Array.isArray(legacyCaptions) ? legacyCaptions[0] : legacyCaptions?.left);
              const rightTopCaption = (rightTopItem?.caption || rightTopItem?.title)
                || (Array.isArray(legacyCaptions) ? legacyCaptions[1] : legacyCaptions?.rightTop);
              const rightBottomCaption = (rightBottomItem?.caption || rightBottomItem?.title)
                || (Array.isArray(legacyCaptions) ? legacyCaptions[2] : legacyCaptions?.rightBottom);

              return (
                <div className="specs-media-grid">
                  <ImageWithCaption
                    className="specs-media-left"
                    src={leftImage}
                    alt="specs-left"
                    caption={leftCaption}
                    position="top-left"
                  />
                  <div className="specs-media-right">
                    <ImageWithCaption
                      className="specs-media-right-item"
                      src={rightTopImage}
                      alt="specs-right-top"
                      caption={rightTopCaption}
                      position="top-left"
                    />
                    <ImageWithCaption
                      className="specs-media-right-item"
                      src={rightBottomImage}
                      alt="specs-right-bottom"
                      caption={rightBottomCaption}
                      position="top-left"
                    />
                  </div>
                </div>
              );
            })()}
            {/** 스펙 표 주석 처리
            <div className="specs-table">
              {productData?.specifications?.map((spec, index) => (
                <div key={index} className="spec-row">
                  <div className="spec-label">{spec.label}</div>
                  <div className="spec-value">{spec.value}</div>
                </div>
              )) || [
                { label: "프로세서", value: "Intel Core i7" },
                { label: "메모리", value: "16GB DDR4" },
                { label: "저장공간", value: "512GB SSD" },
                { label: "네트워크", value: "Gigabit Ethernet" },
                { label: "전원", value: "100-240V AC" },
                { label: "작동온도", value: "-10°C ~ 50°C" }
              ].map((spec, index) => (
                <div key={index} className="spec-row">
                  <div className="spec-label">{spec.label}</div>
                  <div className="spec-value">{spec.value}</div>
                </div>
              ))}
            </div>
            */}
          </div>
        );
        
      case 'certifications':
        return (
          <div className="tab-certifications">
            {(() => {
              const fallbackImages = [featureImg1, featureImg2, featureImg3, featureImg4];
              const unifiedCerts = Array.isArray(productData?.certifications_media)
                ? productData.certifications_media
                : null;
              const certs = (Array.isArray(unifiedCerts) && unifiedCerts.length > 0)
                ? unifiedCerts
                : (Array.isArray(productData?.certifications) && productData.certifications.length > 0)
                  ? productData.certifications
                  : [];

              if (!certs || certs.length === 0) {
                return null;
              }

              const leftCert = certs[0];
              const rightTopCert = certs[1];
              const rightBottomCert = certs[2];

              return (
                <div className="specs-media-grid">
                  {leftCert ? (
                    <div className="media-with-description">
                      <ImageWithCaption
                        className="specs-media-box"
                        src={leftCert?.image || fallbackImages[0]}
                        alt={leftCert?.title || leftCert?.name || 'cert-left'}
                        caption={leftCert?.title || leftCert?.name}
                        position="top-left"
                      />
                      {leftCert?.description ? (
                        <p className="media-description">{leftCert.description}</p>
                      ) : null}
                    </div>
                  ) : null}
                  {(rightTopCert || rightBottomCert) ? (
                    <div className="specs-media-right">
                      {rightTopCert ? (
                        <div className="media-with-description">
                          <ImageWithCaption
                            className="specs-media-box"
                            src={rightTopCert?.image || fallbackImages[1]}
                            alt={rightTopCert?.title || rightTopCert?.name || 'cert-right-top'}
                            caption={rightTopCert?.title || rightTopCert?.name}
                            position="top-left"
                          />
                          {rightTopCert?.description ? (
                            <p className="media-description">{rightTopCert.description}</p>
                          ) : null}
                        </div>
                      ) : null}
                      {rightBottomCert ? (
                        <div className="media-with-description">
                          <ImageWithCaption
                            className="specs-media-box"
                            src={rightBottomCert?.image || fallbackImages[2]}
                            alt={rightBottomCert?.title || rightBottomCert?.name || 'cert-right-bottom'}
                            caption={rightBottomCert?.title || rightBottomCert?.name}
                            position="top-left"
                          />
                          {rightBottomCert?.description ? (
                            <p className="media-description">{rightBottomCert.description}</p>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })()}
          </div>
        );
        
      case 'downloads':
        return (
          <div className="tab-downloads">
            <div className="downloads-list">
              {productData?.downloads?.map((download, index) => (
                <div key={index} className="download-item">
                  <div className="download-info">
                    <h3>{download.title}</h3>
                    <p className="media-description">{download.description}</p>
                    <span className="download-size">{download.size}</span>
                  </div>
                  <button className="download-button">다운로드</button>
                </div>
              )) || [
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
              ].map((download, index) => (
                <div key={index} className="download-item">
                  <div className="download-info">
                    <h3>{download.title}</h3>
                    <p className="media-description">{download.description}</p>
                    <span className="download-size">{download.size}</span>
                  </div>
                  <button className="download-button">다운로드</button>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'videos':
        return (
          <div className="tab-videos">
            <div className="video-embed">
              <iframe
                src="https://www.youtube.com/embed/LGLkdzIt4Jo?si=rD4ovuspBYJcM_U3"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            {productData?.videos && productData.videos[0]?.description ? (
              <p className="media-description">{productData.videos[0].description}</p>
            ) : null}
          </div>
        );
        
      default:
        return <div>콘텐츠를 불러올 수 없습니다.</div>;
    }
  };

  return (
    <div className="tab-content-wrapper">
      {renderContent()}
    </div>
  );
};

export default TabContent;
