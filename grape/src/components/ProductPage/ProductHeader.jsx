import React from 'react';
import './ProductHeader.css';
import buildings from '../../assets/buildings.jpg';

const ProductHeader = ({ image = buildings, alt = "ThingsWell" }) => {
  return (
    <div 
      className="product-header"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="header-top">
      </div>
    </div>
  );
};

export default ProductHeader;
