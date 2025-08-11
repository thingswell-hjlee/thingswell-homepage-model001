import React from 'react';
import './ProductHeader.css';

const ProductHeader = ({ 
  companyName = "ThingsWell",
  mainNavItems = ["Company", "R&D", "Product", "Consulting", "Reference", "Shop"],
  activeMainNav = "Product",
  subNavItems = ["이동식CCTV", "AI카메라", "통합제어", "공기질센서"],
  activeSubNav = "통합제어",
  companyTags = ["2010년 설립", "글로벌 진출", "AI/ML 전문"]
}) => {
  return (
    <div className="product-header">
      <div className="header-top">
        <div className="company-logo">
          <h1>{companyName}</h1>
        </div>
      </div>
      
      <nav className="main-navigation">
        <ul>
          {mainNavItems.map((item, index) => (
            <li key={index} className={activeMainNav === item ? 'active' : ''}>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>
      </nav>
      
      <nav className="sub-navigation">
        <ul>
          {subNavItems.map((item, index) => (
            <li key={index} className={activeSubNav === item ? 'active' : ''}>
              <a href={`#${item}`}>{item}</a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="company-info">
        <div className="company-tags">
          {companyTags.map((tag, index) => (
            <span key={index} className="company-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
