import React from 'react';
import './ProductInfo.css';

const ProductInfo = ({ 
  productName = "XCN-3000",
  productTitle = "어드밴스드 통합제어기",
  description = "산업 자동화 및 스마트 시스템 통합을 위한 다목적 인터페이스 제어 모듈로, 다양한 환경에서 안정적인 연결성과 정밀한 제어를 제공하며, 효율적인 관리와 운영을 가능하게 합니다.",
  breadcrumbs = ["Home", "Products", "Control system"]
}) => {
  return (
    <div className="product-info">
      <div className="breadcrumbs">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span className="breadcrumb-item">{crumb}</span>
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator"> &gt; </span>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <h1 className="product-name">{productName}</h1>
      
      <div className="product-details">
        <h2 className="product-title">{productTitle}</h2>
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
