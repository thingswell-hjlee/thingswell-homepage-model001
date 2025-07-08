import React, { forwardRef } from 'react';

const SupportInfoCard = forwardRef((props, ref) => {
  const { title, subtitle, supportLimit, qualifications } = props;
  return (
    <div ref={ref} className="applicationdate-card">
      <div className="application-period-flex">
        <div className="application-period-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="support-info-row">
          <div className="support-limit">
            <div className="support-info-row-header">
              <h2>지원한도</h2>
            </div>
            <div className="support-limit-card">
              <div className="support-limit-year">{supportLimit.year}</div>
              <div className="support-limit-graph">
                <svg width="300" height="180" viewBox="0 0 300 180">
                  <defs>
                    <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFD77A"/>
                      <stop offset="80%" stopColor="#F7B53B"/>
                      <stop offset="100%" stopColor="#FFF6E0"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M 40 140 A 100 100 0 0 1 260 140"
                    fill="none"
                    stroke="url(#arcGradient)"
                    strokeWidth={20}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="support-limit-amount">{supportLimit.amount}</div>
              <div className="support-limit-desc">{supportLimit.description}</div>
            </div>
          </div>
          <div className="support-qualification">
            <h2>신청자격</h2>
            <p className="support-qualification-desc">
              {qualifications.description}
            </p>
            <ul className="support-limit-list">
              {qualifications.items.map((item, index) => (
                <li key={index}>
                  <span>{item.main}</span>
                  {item.sub && (
                    <>
                      <br/>
                      <span className="sub">{item.sub}</span>
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

export default SupportInfoCard; 