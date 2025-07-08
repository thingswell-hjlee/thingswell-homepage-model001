import React, { forwardRef } from 'react';

const RestrictionCard = forwardRef((props, ref) => {
  const { title, subtitle, restrictions } = props;
  return (
    <div ref={ref} className="applicationdate-card">
      <div className="application-period-flex">
        <div className="application-period-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="support-info-row">
          <div className="support-qualification">
            <div className="support-info-row-header">
              <h2>참여제한 사유</h2>
            </div>
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
});

export default RestrictionCard; 