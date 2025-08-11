import React from 'react';
import './TabContent.css';

const TabContent = ({ tabId, productData }) => {
  const renderContent = () => {
    switch (tabId) {
      case 'overview':
        return (
          <div className="tab-overview">
            <div className="overview-grid">
              <div className="overview-item">
                <h3>제품 개요</h3>
                <p>{productData?.overview || "제품에 대한 전반적인 개요를 제공합니다."}</p>
              </div>
              <div className="overview-item">
                <h3>주요 특징</h3>
                <ul>
                  {productData?.keyFeatures?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  )) || [
                    "고성능 처리 능력",
                    "안정적인 연결성",
                    "정밀한 제어 기능",
                    "확장 가능한 구조"
                  ].map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
        
      case 'features':
        return (
          <div className="tab-features">
            <div className="features-grid">
              {productData?.features?.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon || "⚡"}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              )) || [
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
              ].map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'specs':
        return (
          <div className="tab-specs">
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
          </div>
        );
        
      case 'certifications':
        return (
          <div className="tab-certifications">
            <div className="certifications-grid">
              {productData?.certifications?.map((cert, index) => (
                <div key={index} className="certification-card">
                  <img src={cert.image} alt={cert.name} className="certification-image" />
                  <h3>{cert.name}</h3>
                  <p>{cert.description}</p>
                </div>
              )) || [
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
              ].map((cert, index) => (
                <div key={index} className="certification-card">
                  <div className="certification-placeholder">📋</div>
                  <h3>{cert.name}</h3>
                  <p>{cert.description}</p>
                </div>
              ))}
            </div>
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
                    <p>{download.description}</p>
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
                    <p>{download.description}</p>
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
            <div className="videos-grid">
              {productData?.videos?.map((video, index) => (
                <div key={index} className="video-card">
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="play-button">▶</div>
                  </div>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              )) || [
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
              ].map((video, index) => (
                <div key={index} className="video-card">
                  <div className="video-thumbnail">
                    <div className="video-placeholder">🎥</div>
                    <div className="play-button">▶</div>
                  </div>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              ))}
            </div>
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
