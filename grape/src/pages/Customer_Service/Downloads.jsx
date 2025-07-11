import React from 'react';
import Board from '../../components/Board.jsx';
import SolutionCard from '../../components/SolutionCard.jsx';

const Downloads = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
          <div className="solutions-section">
              <SolutionCard subtitle="Downloads" title="싱스웰 자료실" description="고객지원" showButton={false} link="/solutions/detail" className="custom-solution-card" variant="hero" reverse={false} />
            </div>
            <Board />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;  