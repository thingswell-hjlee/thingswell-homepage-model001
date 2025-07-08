import React, { useState } from 'react';

const FormCard = ({ title, subtitle, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    // 폼 제출 후 초기화
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  return (
    <div className="applicationdate-card">
      <div className="application-period-flex">
        <div className="application-period-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">이름 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="이름을 입력해주세요"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일 *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="이메일을 입력해주세요"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">연락처 *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="연락처를 입력해주세요"
              />
            </div>
            </div>
            <div className="form-container">
            <div className="form-group">
              <label htmlFor="company">회사명</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="회사명을 입력해주세요"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">문의사항</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="문의사항을 입력해주세요"
                rows="4"
              />
            </div>

            <button type="submit" className="submit-btn">
              제출하기
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCard; 