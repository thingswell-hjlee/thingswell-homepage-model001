import React from "react";
import Board from "../../components/Board";
import SolutionCard from "../../components/SolutionCard";

const Downloads = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section">
              <SolutionCard
                subtitle="Downloads"
                title="싱스웰 자료실"
                description="고객지원"
                showButton={false}
                link="/solutions"
                className="custom-solution-left"
                variant="hero"
                reverse={false}
              />
              <Board tableName="Board_Download" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
