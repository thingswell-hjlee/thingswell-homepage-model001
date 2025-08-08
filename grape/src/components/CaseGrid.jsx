import React from 'react';
import { Link } from 'react-router-dom';
import './CaseGrid.css';

const CaseGrid = ({ cases }) => {
  return (
    <div className="cases-grid">
      {cases.map((caseItem) => (
        <div key={caseItem.id} className="case-card">
          <div className="case-content">
            <div className="case-text">
              <div className="case-category">{caseItem.category} /</div>
              <div className="case-company">{caseItem.company}</div>
              <h3 className="case-title">{caseItem.title}</h3>
              <p className="case-description">{caseItem.description}</p>
              <div className="case-industry">
                <span className="bullet">•</span>
                {caseItem.industry}
              </div>
            </div>
            <div className="case-image-section">
              <div className="case-image-container">
                <img src={caseItem.image} alt={caseItem.title} className="case-image" />
                <div className="image-overlay">
                  <div className="detection-box"></div>
                  <div className="safety-lines"></div>
                </div>
              </div>
              <Link to={caseItem.link} className="view-case-btn">
                <span>{caseItem.btnText}</span>
                <div className="btn-icon">→</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseGrid; 