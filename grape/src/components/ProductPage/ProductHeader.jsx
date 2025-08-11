import React from 'react';
import './ProductHeader.css';
import buildings from '../../assets/buildings.jpg';

const ProductHeader = () => {
  return (
    <div className="product-header">
      <div className="header-top">
        <div className="header-top-image">
            <img src={buildings} alt="ThingsWell" />
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
