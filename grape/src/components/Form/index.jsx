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
import useTranslation from '../../hooks/useTranslation';

const Form = forwardRef((props, ref) => {
  const { t } = useTranslation();
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
            <h1>{t('ui1.form.title')} </h1>
            <p>{t('ui1.form.intro1')} <br />{t('ui1.form.intro2')}</p>
          </div>
          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-container">
              <div className="form-group-container">
                <div className="form-group">
                  <label htmlFor="name">{t('ui1.form.labelName')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('ui1.form.placeholderName')}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('ui1.form.labelEmail')}</label>
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
                  <label htmlFor="company">{t('ui1.form.labelCompany')}</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('ui1.form.placeholderCompany')}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t('ui1.form.labelPhone')}</label>
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
                <label htmlFor="message">{t('ui1.form.labelMessage')}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </div>    
              <div className="privacy-info">
                <strong>{t('ui1.form.privacyTitle')}</strong>
                <ul>
                  <li>
                    <strong>{t('ui1.form.privacyItem1Title')}</strong>
                    <ul>
                      <li>{t('ui1.form.labelName')}</li>
                      <li>{t('ui1.form.labelEmail')}</li>
                      <li>{t('ui1.form.labelCompany')}</li>
                      <li>{t('ui1.form.labelPhone')}</li>
                      <li>{t('ui1.form.labelMessage')}</li>
                    </ul>
                  </li>
                  <li>
                    <strong>{t('ui1.form.privacyItem2Title')}</strong>
                    <div>{t('ui1.form.privacyItem2Desc')}</div>
                  </li>
                  <li>
                    <strong>{t('ui1.form.privacyItem3Title')}</strong>
                    <div>
                      {t('ui1.form.privacyItem3Desc1')}<br />
                      {t('ui1.form.privacyItem3Desc2')}
                    </div>
                  </li>
                  <li>
                    <strong>{t('ui1.form.privacyItem4Title')}</strong>
                    <div>
                      {t('ui1.form.privacyItem4Desc1')}<br />
                      {t('ui1.form.privacyItem4Desc2')}
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
                <label htmlFor="privacy-agree">{t('ui1.form.privacyAgree')}</label>
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
                <label htmlFor="privacy-disagree">{t('ui1.form.privacyDisagree')}</label>
              </div>
            </div>
            </div>
            <button type="submit" className="submit-btn">{t('ui1.form.title')}</button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Form; 