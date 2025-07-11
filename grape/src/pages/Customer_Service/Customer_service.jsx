import React from 'react';
import SolutionCard from '../../components/SolutionCard.jsx';

const Customer_service = () => {

  
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section">
              <SolutionCard subtitle="Customer Service" title="고객지원" description="고객지원" showButton={false} link="/solutions/detail" className="custom-solution-card" variant="hero" reverse={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer_service;