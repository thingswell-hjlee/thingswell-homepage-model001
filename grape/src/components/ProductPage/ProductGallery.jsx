import React, { useState } from 'react';
import './ProductGallery.css';

const ProductGallery = ({ 
  images = [],
  productName = "XCN-3000"
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="product-gallery">
        <div className="main-image-container">
          <div className="placeholder-image">
            <span>제품 이미지</span>
          </div>
        </div>
        <div className="thumbnail-container">
          <div className="thumbnail placeholder-thumbnail"></div>
          <div className="thumbnail placeholder-thumbnail"></div>
          <div className="thumbnail placeholder-thumbnail"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-gallery">
      <div className="main-image-container">
        <img
          src={images[selectedImage]}
          alt={`${productName} - 이미지 ${selectedImage + 1}`}
          className="gallery-main-image"
        />
      </div>
      
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image}
              alt={`${productName} 썸네일 ${index + 1}`}
              className="thumbnail-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
