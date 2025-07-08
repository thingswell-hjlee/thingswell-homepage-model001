import React, { forwardRef } from 'react';
import ApplicationCard from './ApplicationCard';

const ApplicationCardsSection = forwardRef((props, ref) => {
  const { applicationCardsData } = props;
  return (
    <div ref={ref} className="solution-card application-section-responsive" style={{background: '#000'}}>
      <div className="application-cards no-line responsive-cards">
        {applicationCardsData.map((card, index) => (
          <ApplicationCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
});

export default ApplicationCardsSection; 