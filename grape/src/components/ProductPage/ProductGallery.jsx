import React, { useState } from 'react';
import './ProductGallery.css';
import ImageWithCaption from '../Common/ImageWithCaption';

const ProductGallery = ({ 
  images = [],
  productName = "XCN-3000",
  captions = [],
  onImageClick,
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
      <ImageWithCaption
        className="main-image-container"
        imgClassName="gallery-main-image"
        src={images[selectedImage]}
        alt={`${productName} - 이미지 ${selectedImage + 1}`}
        caption={Array.isArray(captions) ? captions[selectedImage] : undefined}
        position="top-left"
        onClick={() => onImageClick && onImageClick(images[selectedImage], Array.isArray(captions) ? captions[selectedImage] : undefined, `${productName} - 이미지 ${selectedImage + 1}`)}
      />
      
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <ImageWithCaption
              src={image}
              alt={`${productName} 썸네일 ${index + 1}`}
              className="thumbnail__inner"
              imgClassName="thumbnail-image"
              caption={Array.isArray(captions) ? captions[index] : undefined}
              position="top-left"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
