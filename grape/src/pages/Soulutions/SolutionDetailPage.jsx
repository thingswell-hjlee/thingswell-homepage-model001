import React from 'react';
import SolutionCard from '../../components/SolutionCard';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import FeatureDescription from '../../components/FeatureDescription';
import Form from '../../components/Form';

/**
 * 솔루션 상세 공통 레이아웃
 */
export default function SolutionDetailPage({
  solutionData,
  solutionVariant = 'compact',
  blocks = [],
  formData,
}) {
  return (
    <div className="page-container">
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
                      reverse={fIdx % 2 === 1}
                    />
                  ));
                }
                return null;
              })}

              <Form {...(formData || {})} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


