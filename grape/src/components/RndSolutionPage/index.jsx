import React from 'react';
import SolutionDetailPage from '../../pages/rnd/SolutionDetailPage';
import ProductHeader from '../ProductPage/ProductHeader';
import ProductInfo from '../ProductPage/ProductInfo';
import rnd from '../../assets/header_image/rnd.jpg';

const RndSolutionPage = ({ 
  breadcrumbs, 
  solutionData, 
  blocks 
}) => {
  return (
    <>
      <ProductHeader image={rnd} alt="연구개발" />
      <div className="product-page-content">
        <div className="container">
          <ProductInfo
            productName={solutionData.title}
            productTitle={solutionData.title}
            description={solutionData.description}
            breadcrumbs={breadcrumbs}
          />
          <div className="section-title-container" style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
            <h2 style={{ 
              fontSize: 'var(--font-size-4xl)', 
              fontWeight: 'var(--font-weight-bold)', 
              color: 'var(--color-text-primary)',
              margin: 0
            }}>
              핵심 기술
            </h2>
          </div>
          <SolutionDetailPage
            solutionVariant="default"
            blocks={blocks}
          />
        </div>
      </div>
    </>
  );
};

export default RndSolutionPage;
