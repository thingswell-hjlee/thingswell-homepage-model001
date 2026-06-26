import React, { useState } from 'react';
import './ProductGallery.css';
import ImageWithCaption from '../Common/ImageWithCaption';
import useTranslation from '../../hooks/useTranslation';

const ProductGallery = ({ 
  images = [],
  productName = "XCN-3000",
  captions = [],
  onImageClick,
}) => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="product-gallery">
        <div className="main-image-container">
          <div 
            style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#f8f9fa',
              border: '2px dashed #dee2e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d',
              fontSize: '72px',
              fontWeight: 'bold'
            }}
          >
            ✕
          </div>
        </div>
        <div className="thumbnail-container">
          <div 
            className="thumbnail"
            style={{
              backgroundColor: '#f8f9fa',
              border: '2px dashed #dee2e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d',
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >
            ✕
          </div>
          <div 
            className="thumbnail"
            style={{
              backgroundColor: '#f8f9fa',
              border: '2px dashed #dee2e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d',
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >
            ✕
          </div>
          <div 
            className="thumbnail"
            style={{
              backgroundColor: '#f8f9fa',
              border: '2px dashed #dee2e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d',
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >
            ✕
          </div>
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
        alt={`${productName} - ${t('ui2.gallery.image')} ${selectedImage + 1}`}
        caption={Array.isArray(captions) ? captions[selectedImage] : undefined}
        position="top-left"
        onClick={() => onImageClick && onImageClick(images[selectedImage], Array.isArray(captions) ? captions[selectedImage] : undefined, `${productName} - ${t('ui2.gallery.image')} ${selectedImage + 1}`)}
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
              alt={`${productName} ${t('ui2.gallery.thumbnail')} ${index + 1}`}
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
