/**
 * RestrictionCard 컴포넌트
 * 
 * 참여 제한 사유를 카드 형태로 표시하는 컴포넌트입니다.
 * 제목, 부제목, 그리고 제한 사유 목록을 포함합니다.
 * forwardRef를 사용하여 외부에서 ref를 전달받을 수 있습니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.title - 카드 제목
 * @param {string} props.subtitle - 카드 부제목
 * @param {Array} props.restrictions - 제한 사유 배열
 * @param {string} props.restrictions[].main - 주요 제한 사유
 * @param {string} props.restrictions[].sub - 세부 제한 사유 (선택사항)
 * @param {React.Ref} ref - forwardRef를 통해 전달되는 ref
 * 
 * 사용법:
 * <RestrictionCard 
 *   title="참여 제한"
 *   subtitle="다음과 같은 경우 참여가 제한됩니다"
 *   restrictions={[
 *     { main: "기업 규모 제한", sub: "대기업은 제외" },
 *     { main: "업종 제한", sub: "특정 업종만 참여 가능" },
 *     { main: "지역 제한" }
 *   ]}
 * />
 */
import React, { forwardRef } from 'react';
import './RestrictionCard.css';

const RestrictionCard = forwardRef((props, ref) => {
  const { title, subtitle, restrictions } = props;
  return (
    <div ref={ref} className="restriction-card">
      <div className="restriction-card-flex">
        <div className="restriction-card-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="restriction-info-row">
          <div className="restriction-qualification">
            <div className="restriction-info-row-header">
              <h2>참여제한 사유</h2>
            </div>
            <ul className="restriction-limit-list">
              {restrictions.map((restriction, index) => (
                <li key={index}>
                  <span>{restriction.main}</span>
                  {restriction.sub && (
                    <>
                      <br/>
                      <span className="sub">{restriction.sub}</span>
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

export default RestrictionCard; 