/**
 * FormCard 컴포넌트
 * 
 * 문의 폼을 렌더링하는 카드 형태의 컴포넌트입니다.
 * 이름, 이메일, 회사명, 문의내용을 입력받는 폼을 제공합니다.
 * forwardRef를 사용하여 외부에서 ref를 전달받을 수 있습니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.title - 폼 제목
 * @param {string} props.subtitle - 폼 부제목
 * @param {Function} props.onSubmit - 폼 제출 시 호출되는 콜백 함수
 * @param {React.Ref} ref - forwardRef를 통해 전달되는 ref
 * 
 * 사용법:
 * <FormCard 
 *   title="문의하기"
 *   subtitle="궁금한 점이 있으시면 언제든 문의해주세요"
 *   onSubmit={(formData) => {
 *     console.log('폼 데이터:', formData);
 *     // API 호출 또는 다른 처리
 *   }}
 * />
 * 
 * 폼 필드:
 * - 이름 (필수)
 * - 이메일 (필수)
 * - 소속 회사명 (필수)
 * - 문의 내용 (필수)
 */
import React, { useState, forwardRef } from 'react';
import './FormCard.css';

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
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="company">소속 회사명</label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">문의 내용</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
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