import React from 'react';
import SolutionCard from '../../components/SolutionCard';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import ApplicationPeriodCard from '../../components/ApplicationPeriodCard';
import SupportInfoCard from '../../components/SupportInfoCard';
import RestrictionCard from '../../components/RestrictionCard';

/**
 * 정부지원 상세 공통 레이아웃
 */
export default function SupportDetailPage({
  solutionData,
  solutionVariant = 'compact',
  applicationCardsData,
  applicationCardsProps,
  applicationPeriodData,
  supportInfoData,
  restrictionData,
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

              {applicationCardsData && (
                <ApplicationCardsSection
                  applicationCardsData={applicationCardsData}
                  {...(applicationCardsProps || {})}
                />
              )}

              {applicationPeriodData && (
                <ApplicationPeriodCard {...applicationPeriodData} />
              )}

              {supportInfoData && <SupportInfoCard {...supportInfoData} />}

              {restrictionData && <RestrictionCard {...restrictionData} />}

              {/* Form 제거됨 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


