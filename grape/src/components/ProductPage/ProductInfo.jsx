import React from 'react';
import Breadcrumbs from '../Breadcrumbs';
import './ProductInfo.css';

const ProductInfo = ({ 
  productName = "XCN-3000",
  productTitle = "어드밴스드 통합제어기",
  description = "산업 자동화 및 스마트 시스템 통합을 위한 다목적 인터페이스 제어 모듈로, 다양한 환경에서 안정적인 연결성과 정밀한 제어를 제공하며, 효율적인 관리와 운영을 가능하게 합니다.",
  breadcrumbs = ["Home", "Products", "Control system"]
}) => {
  return (
    <div className="product-info">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="product-name">{productName}</h1>

    </div>
  );
};

export default ProductInfo;
