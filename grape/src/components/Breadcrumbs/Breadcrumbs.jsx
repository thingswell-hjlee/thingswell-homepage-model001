import React from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import './Breadcrumbs.css';

const Breadcrumbs = ({ breadcrumbs = [] }) => {
  const { currentLang } = useTranslation();
  // breadcrumbs가 배열이 아닌 경우 빈 배열로 처리
  const breadcrumbsArray = Array.isArray(breadcrumbs) ? breadcrumbs : [];

  // 문자열 배열과 {label, path} 객체 배열을 모두 허용 — 객체를 그대로 렌더하면
  // React가 크래시함 (관리자 페이지 블랙 화면 원인, 2026-07-28 수정)
  const labelOf = (crumb) =>
    crumb && typeof crumb === 'object' ? crumb.label ?? '' : crumb;

  return (
    <div className="breadcrumbs">
      {breadcrumbsArray.map((crumb, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <Link to={`/${currentLang}/`} className="breadcrumb-item breadcrumb-home">
              {labelOf(crumb)}
            </Link>
          ) : (
            <span className="breadcrumb-item">{labelOf(crumb)}</span>
          )}
          {index < breadcrumbsArray.length - 1 && (
            <span className="breadcrumb-separator"> &gt; </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
