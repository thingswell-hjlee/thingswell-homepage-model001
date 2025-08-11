import React from 'react';
import './OpenStreetMap.css';

const OpenStreetMap = ({ address, companyName }) => {
  // 주소를 URL 인코딩
  const encodedAddress = encodeURIComponent(address);
  
  // 네이버 지도 URL 생성
  const naverMapUrl = `https://map.naver.com/p/search/${encodedAddress}`;

  return (
    <div className="openstreetmap-container">
      <div className="naver-map-placeholder" onClick={() => window.open(naverMapUrl, '_blank')}>
        <div className="map-icon">🗺️</div>
        <h3>{companyName}</h3>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default OpenStreetMap; 