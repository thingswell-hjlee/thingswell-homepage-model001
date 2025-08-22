import React from 'react';
import SolutionCard from '../../components/SolutionCard';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import rndHeader from '../../assets/header_image/rnd.jpg';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import FeatureDescription from '../../components/FeatureDescription';
import ContactInfo from '../../components/ContactInfo';

/**
 * 솔루션 상세 공통 레이아웃
 */
export default function SolutionDetailPage({
  solutionData,
  solutionVariant = 'compact',
  blocks = [],
}) {
  return (
    <div className="page-container">
      <ProductHeader image={rndHeader} />
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section">
              {solutionData && (
                <SolutionCard {...solutionData} variant={solutionVariant} />
              )}

              {blocks.map((block, idx) => {
                if (block.type === 'applicationCards') {
                  return (
                    <ApplicationCardsSection
                      key={idx}
                      applicationCardsData={block.data}
                      {...(block.props || {})}
                    />
                  );
                }
                if (block.type === 'features') {
                  return block.data.map((feature, fIdx) => (
                    <FeatureDescription
                      key={`${idx}-${fIdx}`}
                      {...feature}
                    />
                  ));
                }
                return null;
              })}

              {/* Form 제거됨 */}
              
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


