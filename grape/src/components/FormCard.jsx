import React, { useState, forwardRef } from 'react';

const FormCard = forwardRef((props, ref) => {
  const { title, subtitle, onSubmit } = props;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div ref={ref} className="form-card">
      <div className="application-period-flex">
        <div className="application-period-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="홍길동" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="hong@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="company">소속 회사명</label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="(주)그레이프" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">문의 내용</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="문의하실 내용을 자세히 작성해 주세요. 예: 제품 문의, 기술 지원, 견적 요청 등" required />
              </div>
              <button type="submit" className="submit-btn">문의하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default FormCard; 