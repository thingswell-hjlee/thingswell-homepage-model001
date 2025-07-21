/**
 * Form 컴포넌트
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
 * <Form 
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
import './Form.css';

const Form = forwardRef((props, ref) => {
  const { title, subtitle, onSubmit } = props;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    privacy: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({ name: '', email: '', company: '', phone: '', message: '', privacy: '' });
  };

  return (
    <div ref={ref} className="form-card">
      <div className="form-card-inner">
        <div>
          <div className="form-title">
            <h1>문의하기 </h1>
            <p>싱스웰에 문의해 주셔서 감사합니다. <br />고객님의 문의 내용을 담당자가 신속하고 정확하게 확인한 후, 빠른 시일 내에 답변드리겠습니다.</p>
          </div>
          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-container">
              <div className="form-group-container">
                <div className="form-group">
                  <label htmlFor="name">이름</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="홍길동"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="hong@company.com"
                    required 
                  />
                </div>
              </div>  
              <div className="form-group-container">
                <div className="form-group">
                  <label htmlFor="company">소속 회사명</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    placeholder="(주)싱스웰"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">연락처</label>
                  <input 
                    type="text" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="010-1234-5678"
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">문의 내용</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </div>    
              <div className="privacy-info">
                <strong>개인정보 수집 및 이용 동의서</strong>
                <ul>
                  <li>
                    <strong>1. 수집하는 개인정보 항목</strong>
                    <ul>
                      <li>이름</li>
                      <li>이메일</li>
                      <li>소속 회사명</li>
                      <li>연락처</li>
                      <li>문의 내용</li>
                    </ul>
                  </li>
                  <li>
                    <strong>2. 개인정보 수집 및 이용 목적</strong>
                    <div>고객 문의에 대한 신속하고 정확한 확인 및 답변 제공</div>
                  </li>
                  <li>
                    <strong>3. 개인정보 보유 및 이용 기간</strong>
                    <div>
                      수집일로부터 1년간 보관 후 파기<br />
                      (단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관)
                    </div>
                  </li>
                  <li>
                    <strong>4. 동의 거부 권리 및 불이익 안내</strong>
                    <div>
                      귀하는 개인정보 수집 및 이용에 동의하지 않을 권리가 있습니다.<br />
                      다만, 동의하지 않을 경우 문의에 대한 답변 제공이 제한될 수 있습니다.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="form-group-container">
              <div className="checkbox-container">
                <input
                  type="radio"
                  id="privacy-agree"
                  name="privacy"
                  value="agree"
                  checked={formData.privacy === "agree"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="privacy-agree">개인정보 수집 및 이용 동의</label>
              </div>
              <div className="checkbox-container">
                <input
                  type="radio"
                  id="privacy-disagree"
                  name="privacy"
                  value="disagree"
                  checked={formData.privacy === "disagree"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="privacy-disagree">개인정보 수집 및 이용 거부</label>
              </div>
            </div>
            </div>
            <button type="submit" className="submit-btn">문의하기</button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Form; 