import React from 'react';
import './OpenStreetMap.css';

const OpenStreetMap = ({ address, companyName }) => {
  // 주소를 URL 인코딩
  const encodedAddress = encodeURIComponent(address);
  
  // OpenStreetMap URL 생성
  const mapUrl = `https://www.openstreetmap.org/search?query=${encodedAddress}`;
  
  // iframe으로 지도 표시
  const iframeUrl = `https://www.openstreetmap.org/export/embed.html?bbox=126.97,37.56,126.98,37.57&layer=mapnik&marker=37.5665,126.978`;

  return (
    <div className="openstreetmap-container">
      <iframe
        title="회사 위치 지도"
        src={iframeUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        className="openstreetmap-iframe"
      />
      <div className="map-overlay">
        <button 
          className="map-external-button"
          onClick={() => window.open(mapUrl, '_blank')}
        >
          OpenStreetMap에서 보기
        </button>
      </div>
    </div>
  );
};

export default OpenStreetMap; 