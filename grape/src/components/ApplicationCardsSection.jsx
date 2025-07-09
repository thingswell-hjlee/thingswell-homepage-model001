import React, { forwardRef } from 'react';
import ApplicationCard from './ApplicationCard';
import './ApplicationCardsSection.css';

const ApplicationCardsSection = forwardRef((props, ref) => {
  const { applicationCardsData } = props;
  return (
    <div ref={ref} className="application-card application-section-responsive">
      <div className="application-cards no-line responsive-cards">
        {applicationCardsData.map((card, index) => (
          <ApplicationCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
});

export default ApplicationCardsSection; 