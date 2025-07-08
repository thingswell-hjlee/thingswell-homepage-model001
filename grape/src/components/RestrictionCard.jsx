import React from 'react';

const RestrictionCard = ({ title, subtitle, restrictions }) => {
  return (
    <div className="applicationdate-card">
      <div className="application-period-flex">
        <div className="application-period-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="support-qualification">
            <h2>참여제한 사유</h2>
            <ul className="support-limit-list">
              {restrictions.map((restriction, index) => (
                <li key={index}>
                  <span>{restriction.main}</span>
                  {restriction.sub && (
                    <>
                      <br/>
                      <span className="sub">{restriction.sub}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestrictionCard; 