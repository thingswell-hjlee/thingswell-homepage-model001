import React from 'react';

const ApplicationPeriodCard = ({ title, subtitle, period, cards }) => {
  return (
    <div className="applicationdate-card">
      <div className="application-period-flex">
        <div className="application-period-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="application-period-box">
          <div className="application-period-title">
            <p>{period.start}</p>
            <p>{period.end}</p>
          </div>
          <div className="application-period-cards">
            {cards.map((card, index) => (
              <div key={index} className="application-period-card">
                <div className="application-period-date">{card.date}</div>
                <div className="application-period-status">{card.status}</div>
                <div className="application-period-day">{card.day}</div>
                <div className="application-period-time">{card.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPeriodCard; 