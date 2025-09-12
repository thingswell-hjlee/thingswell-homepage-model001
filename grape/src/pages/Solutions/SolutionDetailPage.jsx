import React from 'react';
import SolutionCard from '../../components/SolutionCard';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import FeatureDescription from '../../components/FeatureDescription';
import ContactInfo from '../../components/ContactInfo';
import BaseLayout from '../../components/Layout/BaseLayout';

/**
 * 솔루션 상세 공통 레이아웃
 */
export default function SolutionDetailPage({
  solutionData,
  solutionVariant = 'compact',
  blocks = [],
}) {
  return (
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
  );
}


