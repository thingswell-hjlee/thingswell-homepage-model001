import React, { forwardRef } from 'react';
import './RestrictionCard.css';

const RestrictionCard = forwardRef((props, ref) => {
  const { title, subtitle, restrictions } = props;
  return (
    <div ref={ref} className="restriction-card">
      <div className="restriction-card-flex">
        <div className="restriction-card-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="restriction-info-row">
          <div className="restriction-qualification">
            <div className="restriction-info-row-header">
              <h2>참여제한 사유</h2>
            </div>
            <ul className="restriction-limit-list">
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