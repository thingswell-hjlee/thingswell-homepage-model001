import React from "react";
import Board from "../../components/Board";
import SolutionCard from "../../components/SolutionCard";

const Announcement = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section">
              <SolutionCard
                subtitle="Announcement"
                title="싱스웰 공지사항"
                description="고객지원"
                showButton={false}
                link="/solutions/detail"
                className="custom-solution-left"
                variant="hero"
                reverse={false}
              />
              <Board tableName="Board_Announcement" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
