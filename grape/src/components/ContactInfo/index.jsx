import React from 'react';
import './index.css';

const ContactInfo = () => {
  return (
    <section className="contact-section">
      <h2 className="contact-section-title">문의하기</h2>
      <div className="contact-card-grid">
        <div className="contact-card">
          <h3 className="contact-card-title">대표번호</h3>
          <p className="contact-card-text-call"><a href="tel:1833-7758">1833-7758</a></p>
        </div>
        <div className="contact-card">
          <h3 className="contact-card-title">이메일</h3>
          <p className="contact-card-text"><a href="mailto:contact@thingswell.co.kr">contact@thingswell.co.kr</a></p>
        </div>
        <div className="contact-card">
          <h3 className="contact-card-title">오시는 길</h3>
          <p className="contact-card-text">14056 경기도 안양시 동안구 학의로 282 금강펜테리움IT타워 A동 1302호</p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;


