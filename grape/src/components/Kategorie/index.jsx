import React, { forwardRef } from 'react';
import useTranslation from '../../hooks/useTranslation';
import './Kategorie.css';
import ApplicationCard from '../ApplicationCard';
/**
 * Kategorie 컴포넌트
 * 
 * 제품 카테고리를 표시하는 섹션 컴포넌트입니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.title - 카테고리 제목
 * @param {Array} props.items - 카테고리 아이템 배열
 * @param {React.Ref} ref - forwardRef를 통해 전달되는 ref
 * 
 * 사용법:
 * <Kategorie title="제품" items={[...]} />
 */
const Kategorie = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const { title = t('ui3.kategorie.defaultTitle'), items = [] } = props;

  // 기본 아이템 데이터
  const defaultItems = [
    {
      image: "https://via.placeholder.com/300x200",
      imageAlt: t('ui3.kategorie.defaultImageAlt'),
      label: t('ui3.kategorie.defaultLabel'),
      title: t('ui3.kategorie.defaultItemTitle'),
      link: "/product/1"
    }
  ];
  
  const displayItems = items.length > 0 ? items : defaultItems;
  
  return (
    <div ref={ref} className="application-card application-section-responsive">
      <div className="cards-container"> 
        <div className="application-cards no-line responsive-cards">
          {displayItems.map((item, index) => (
            <ApplicationCard 
              key={index}
              image={item.image}
              imageAlt={item.imageAlt}
              label={item.label}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Kategorie;