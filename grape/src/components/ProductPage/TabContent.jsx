import React, { useState } from 'react';
import './TabContent.css';
import ThreeColumnGrid from '../ThreeColumnGrid';
import ImageWithCaption from '../Common/ImageWithCaption';
import { marked } from 'marked';
import featureImg1 from '../../assets/server.jpg';
import featureImg2 from '../../assets/manufacturing.jpg';
import featureImg3 from '../../assets/construction.jpg';
import featureImg4 from '../../assets/buildings.jpg';

const TabContent = ({ tabId, productData, featureClickToOpen = false, onFeatureImageClick }) => {
  const [openedFeatureIndex, setOpenedFeatureIndex] = useState(null);
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
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: productData?.overview ? marked(productData.overview) : "제품에 대한 전반적인 개요를 제공합니다." 
                  }}
                  style={{
                    lineHeight: '1.6',
                    fontSize: '14px'
                  }}
                />
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
            {/* 주요 기능 목록 */}
            {productData?.keyFeatures && productData.keyFeatures.length > 0 && (
              <div className="key-features-description" style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px', color: '#495057' }}>주요 기능</h3>
                <ul className="feature-text-list">
                  {productData.keyFeatures.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '8px', fontSize: '16px', lineHeight: '1.5' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* 주요 기능 이미지들 */}
            {productData?.keyFeaturesImages && productData.keyFeaturesImages.length > 0 && (
              <div className="key-features-images">
                <ThreeColumnGrid>
                  {productData.keyFeaturesImages.map((imageObj, index) => (
                    <div key={index} className="feature-card">
                      <ImageWithCaption
                        className="feature-media"
                        imgClassName="feature-image"
                        src={imageObj.url}
                        alt={`주요 기능 ${index + 1}`}
                        caption={imageObj.caption}
                        position="top-left"
                        onClick={() => {
                          if (onFeatureImageClick) {
                            onFeatureImageClick(imageObj.url, imageObj.caption, `주요 기능 ${index + 1}`);
                          }
                        }}
                      />
                    </div>
                  ))}
                </ThreeColumnGrid>
              </div>
            )}
            
            {/* 기존 기능 카드들 (keyFeaturesImages가 없을 때) */}
            {(!productData?.keyFeaturesImages || productData.keyFeaturesImages.length === 0) && (
              <ThreeColumnGrid>
                {(() => {
                const fallbackImages = [featureImg1, featureImg2, featureImg3, featureImg4];
                const unifiedFeatures = Array.isArray(productData?.features_media)
                  ? productData.features_media
                  : null;
                const sourceFeatures = unifiedFeatures || productData?.features;
                const baseFeatures = (sourceFeatures && sourceFeatures.length > 0)
                  ? sourceFeatures
                  : [];
                const featuresWithImages = baseFeatures.map((f, idx) => ({
                  ...f,
                  image: f.image || fallbackImages[idx % fallbackImages.length],
                }));
                return featuresWithImages;
                })().map((feature, index) => {
                  const isOpen = featureClickToOpen && openedFeatureIndex === index;
                  const handleClick = () => {
                    if (!featureClickToOpen) return;
                    setOpenedFeatureIndex(isOpen ? null : index);
                  };
                  const handleKeyDown = (e) => {
                    if (!featureClickToOpen) return;
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenedFeatureIndex(isOpen ? null : index);
                    }
                  };
                  return (
                    <div
                      key={index}
                      className={`feature-card media-with-description${isOpen ? ' open' : ''}`}
                      onClick={handleClick}
                      role={featureClickToOpen ? 'button' : undefined}
                      tabIndex={featureClickToOpen ? 0 : undefined}
                      onKeyDown={handleKeyDown}
                    >
                      <ImageWithCaption
                        className="feature-media"
                        imgClassName="feature-image"
                        src={feature.image}
                        alt={feature.title || 'feature'}
                        caption={feature.title}
                        position="top-left"
                        onClick={() => {
                          if (onFeatureImageClick) {
                            onFeatureImageClick(feature.image, feature.title, feature.title || 'feature');
                          }
                        }}
                      />
                      {feature.description ? (
                        isOpen ? (
                          <p className="media-description">{feature.description}</p>
                        ) : null
                      ) : null}
                    </div>
                  );
                })}
              </ThreeColumnGrid>
            )}
          </div>
        );
        
      case 'specs':
        return (
          <div className="tab-specs">
            {/* 사양 이미지들 */}
            {productData?.specifications && productData.specifications.length > 0 && (
              <div className="specs-images">
                <ThreeColumnGrid>
                  {productData.specifications.map((imageObj, index) => (
                    <div key={index} className="spec-card">
                      <ImageWithCaption
                        className="spec-media"
                        imgClassName="spec-image"
                        src={imageObj.url}
                        alt={`사양 ${index + 1}`}
                        caption={imageObj.caption}
                        position="top-left"
                        onClick={() => {
                          if (onFeatureImageClick) {
                            onFeatureImageClick(imageObj.url, imageObj.caption, `사양 ${index + 1}`);
                          }
                        }}
                      />
                    </div>
                  ))}
                </ThreeColumnGrid>
              </div>
            )}
            
            {/* 기존 사양 표시 (specifications가 없을 때) */}
            {(!productData?.specifications || productData.specifications.length === 0) && (
              <div>
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
                    || galleryImages[0];
                  const rightTopImage = (rightTopItem?.image || rightTopItem?.src)
                    || (Array.isArray(legacyImages) ? legacyImages[1] : legacyImages?.rightTop)
                    || galleryImages[1];
                  const rightBottomImage = (rightBottomItem?.image || rightBottomItem?.src)
                    || (Array.isArray(legacyImages) ? legacyImages[2] : legacyImages?.rightBottom)
                    || galleryImages[2];

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
              </div>
            )}
          </div>
        );
        
      case 'certifications':
        return (
          <div className="tab-certifications">
            {/* 인증 이미지들 */}
            {productData?.certifications && productData.certifications.length > 0 && (
              <div className="certifications-images">
                <ThreeColumnGrid>
                  {productData.certifications.map((imageObj, index) => (
                    <div key={index} className="cert-card">
                      <ImageWithCaption
                        className="cert-media"
                        imgClassName="cert-image"
                        src={imageObj.url}
                        alt={`인증 ${index + 1}`}
                        caption={imageObj.caption}
                        position="top-left"
                        onClick={() => {
                          if (onFeatureImageClick) {
                            onFeatureImageClick(imageObj.url, imageObj.caption, `인증 ${index + 1}`);
                          }
                        }}
                      />
                    </div>
                  ))}
                </ThreeColumnGrid>
              </div>
            )}
            
            {/* 기존 인증 표시 (certifications가 없을 때) */}
            {(!productData?.certifications || productData.certifications.length === 0) && (
              <div>
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
                            src={leftCert?.image}
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
                                src={rightTopCert?.image}
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
                                src={rightBottomCert?.image}
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
            )}
          </div>
        );
        
      case 'downloads':
        return (
          <div className="tab-downloads">
            <div className="downloads-list">
              {productData?.downloads?.filter(download => 
                download.title && download.title.trim() !== '' && 
                download.description && download.description.trim() !== '' && 
                download.link && download.link.trim() !== ''
              ).map((download, index) => (
                <div key={index} className="download-item">
                  <div className="download-info">
                    <h3>{download.title}</h3>
                    <p className="media-description">{download.description}</p>
                  </div>
                  <a 
                    href={download.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="download-button"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    다운로드
                  </a>
                </div>
              )) || []}
            </div>
          </div>
        );
        
      case 'videos':
        return (
          <div className="tab-videos">
            {/* 동영상 링크들 */}
            {productData?.videos && productData.videos.length > 0 ? (
              <div className="videos-list">
                {productData.videos.map((videoUrl, index) => {
                  // YouTube 링크를 임베드 링크로 변환
                  const getEmbedUrl = (url) => {
                    if (url.includes('youtube.com/watch?v=')) {
                      const videoId = url.split('v=')[1]?.split('&')[0];
                      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
                    } else if (url.includes('youtu.be/')) {
                      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
                      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
                    } else if (url.includes('vimeo.com/')) {
                      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
                      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
                    }
                    return url;
                  };

                  const embedUrl = getEmbedUrl(videoUrl);
                  
                  return (
                    <div key={index} className="video-item" style={{ marginBottom: '30px' }}>
                      <div className="video-embed" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                        <iframe
                          src={embedUrl}
                          title={`동영상 ${index + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        />
                      </div>
                      <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <a 
                          href={videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#007bff', textDecoration: 'none' }}
                        >
                          원본 링크 보기
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>등록된 동영상이 없습니다.</p>
              </div>
            )}
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
