import React, { useState } from 'react';
import './ProductCardGroup.css';
import useTranslation from '../../hooks/useTranslation';

const ProductCardGroup = ({
  products = [],
  title,
  subtitle
}) => {
  const { t } = useTranslation();
  title = title ?? t('ui2.defaults.cardGroupTitle');
  subtitle = subtitle ?? t('ui2.defaults.cardGroupSubtitle');
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  if (!products || products.length === 0) {
    return (
      <div className="product-card-group">
        <div className="group-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="no-products">
          <p>{t('ui2.cardGroup.noProducts')}</p>
        </div>
      </div>
    );
  }

  const activeProduct = products[activeProductIndex];

  return (
    <div className="product-card-group">
      <div className="group-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      
      <div className="product-tabs-container">
        <div className="product-tab-buttons">
          {products.map((product, index) => (
            <button
              key={index}
              className={`product-tab-button ${activeProductIndex === index ? 'active' : ''}`}
              onClick={() => setActiveProductIndex(index)}
            >
              <div className="tab-button-content">
                {product.icon && (
                  <div className="product-icon">{product.icon}</div>
                )}
                <div className="product-tab-info">
                  <h3>{product.name}</h3>
                  <p>{product.shortDescription}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="product-tab-content">
          <div className="active-product-card">
            <div className="product-card-header">
              <div className="product-card-title">
                <h3>{activeProduct.name}</h3>
                <p className="product-subtitle">{activeProduct.subtitle}</p>
              </div>
              {activeProduct.badge && (
                <span className="product-badge">{activeProduct.badge}</span>
              )}
            </div>
            
            <div className="product-card-body">
              <div className="product-image-section">
                {activeProduct.image ? (
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.name}
                    className="product-card-image"
                  />
                ) : (
                  <div className="product-image-placeholder">
                    <span>📦</span>
                  </div>
                )}
              </div>
              
              <div className="product-details">
                <p className="product-description">{activeProduct.description}</p>
                
                {activeProduct.features && (
                  <div className="product-features">
                    <h4>{t('ui2.cardGroup.keyFeatures')}</h4>
                    <ul>
                      {activeProduct.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activeProduct.specs && (
                  <div className="product-specs">
                    <h4>{t('ui2.cardGroup.keySpecs')}</h4>
                    <div className="specs-grid">
                      {activeProduct.specs.map((spec, index) => (
                        <div key={index} className="spec-item">
                          <span className="spec-label">{spec.label}:</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="product-card-footer">
              {activeProduct.actions && activeProduct.actions.map((action, index) => (
                <button
                  key={index}
                  className={`action-button ${action.type || 'primary'}`}
                  onClick={action.onClick}
                >
                  {action.icon && <span className="action-icon">{action.icon}</span>}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardGroup;
