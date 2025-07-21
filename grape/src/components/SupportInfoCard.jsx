/**
 * SupportInfoCard 컴포넌트
 * 
 * 지원 정보를 카드 형태로 표시하는 컴포넌트입니다.
 * 제목, 부제목, 지원 한도, 신청 자격을 포함하며, 지원 한도는 SVG 그래프로 시각화됩니다.
 * forwardRef를 사용하여 외부에서 ref를 전달받을 수 있습니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.title - 카드 제목
 * @param {string} props.subtitle - 카드 부제목
 * @param {Object} props.supportLimit - 지원 한도 정보
 * @param {string} props.supportLimit.year - 지원 연도
 * @param {string} props.supportLimit.amount - 지원 금액
 * @param {string} props.supportLimit.description - 지원 한도 설명
 * @param {Object} props.qualifications - 신청 자격 정보
 * @param {string} props.qualifications.description - 자격 설명
 * @param {Array} props.qualifications.items - 자격 항목 배열
 * @param {string} props.qualifications.items[].main - 주요 자격 요건
 * @param {string} props.qualifications.items[].sub - 세부 자격 요건 (선택사항)
 * @param {React.Ref} ref - forwardRef를 통해 전달되는 ref
 * 
 * 사용법:
 * <SupportInfoCard 
 *   title="지원 정보"
 *   subtitle="2024년 정부지원사업 지원 정보입니다"
 *   supportLimit={{
 *     year: "2024년",
 *     amount: "최대 5천만원",
 *     description: "사업비의 80%까지 지원"
 *   }}
 *   qualifications={{
 *     description: "다음 조건을 만족하는 기업이 신청 가능합니다",
 *     items: [
 *       { main: "중소기업", sub: "대기업 제외" },
 *       { main: "특정 업종", sub: "제조업, IT업종" },
 *       { main: "지역 제한" }
 *     ]
 *   }}
 * />
 */
import React, { forwardRef } from 'react';
import './SupportInfoCard.css';

const SupportInfoCard = forwardRef((props, ref) => {
  const { title, subtitle, supportLimit, qualifications } = props;
  return (
    <div ref={ref} className="support-info-card">
      <div className="support-info-card-flex">
        <div className="support-info-card-header">
        <p>{subtitle}</p>
          <h1>{title}</h1>
        </div>
        <div className="support-info-card-row">
          <div className="support-info-card-limit">
            <div className="support-info-card-row-header">
              <h2>지원한도</h2>
            </div>
            <div className="support-info-card-limit-card">
              <div className="support-info-card-limit-year">{supportLimit.year}</div>
              <div className="support-info-card-limit-graph">
                <svg width="50%" height="180" viewBox="0 0 300 180">
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
              <div className="support-info-card-limit-amount">{supportLimit.amount}</div>
              <div className="support-info-card-limit-desc">{supportLimit.description}</div>
            </div>
          </div>
          <div className="support-info-card-qualification">
            <h2>신청자격</h2>
            <p className="support-info-card-qualification-desc">
              {qualifications.description}
            </p>
            <ul className="support-info-card-limit-list">
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