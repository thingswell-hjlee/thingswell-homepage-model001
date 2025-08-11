import React, { forwardRef } from 'react';
import './ApplicationPeriodCard.css';

const ApplicationPeriodCard = forwardRef((props, ref) => {
  const { title, subtitle, period, cards } = props;
  return (
    <div ref={ref} className="applicationdate-card">
        <div className="application-period-header">
        <p>{subtitle}</p>
          <h1>{title}</h1>

        </div>
        <div className="support-info-row">
          <div className="application-period-box">
            <div className="application-period-cards">
              {cards.map((card, index) => (
                <div key={index} className="application-period-card">
                  <div className="application-period-content">
                    <div className="application-period-date">{card.date}</div>
                    <div className="application-period-status">{card.status}</div>
                    <div className="application-period-day">{card.day}</div>
                    <div className="application-period-time">{card.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
});

export default ApplicationPeriodCard; 