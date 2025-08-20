/**
 * ApplicationCard 컴포넌트
 * 
 * 개별 애플리케이션 카드를 렌더링하는 컴포넌트입니다.
 * 이미지, 라벨, 제목을 포함한 카드 형태의 UI 요소입니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.image - 카드 이미지 경로
 * @param {string} props.imageAlt - 이미지 대체 텍스트
 * @param {string} props.label - 카드 라벨 텍스트
 * @param {string} props.title - 카드 제목 텍스트
 * @param {string} props.link - 카드 클릭 시 이동할 링크 (선택사항)
 * 
 * 사용법:
 * <ApplicationCard 
 *   image="/path/to/image.jpg"
 *   imageAlt="이미지 설명"
 *   label="카테고리"
 *   title="카드 제목"
 *   link="/some-path"
 * />
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './ApplicationCard.css';

const ApplicationCard = ({ image, imageAlt, label, title, link, desc, desc2, fullWidthImage = false }) => {
  const [isTitleExpanded, setIsTitleExpanded] = React.useState(false);
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const [isTextLong, setIsTextLong] = React.useState(false);
  const titleRef = React.useRef(null);
  
  const descriptions = Array.isArray(desc)
    ? desc.filter(Boolean)
    : [desc, desc2].filter(Boolean);

  React.useEffect(() => {
    if (titleRef.current) {
      const element = titleRef.current;
      const isOverflow = element.scrollHeight > element.clientHeight;
      setIsOverflowing(isOverflow);
      
      // 텍스트가 컨테이너보다 긴지 확인
      const containerWidth = element.offsetWidth;
      const textWidth = element.scrollWidth;
      const isLong = textWidth > containerWidth;
      console.log('Container width:', containerWidth, 'Text width:', textWidth, 'Is long:', isLong, 'Title:', title);
      setIsTextLong(isLong);
    }
  }, [title]);

  const HIGHLIGHT_TERMS = ["입력 소스", "데이터 정규화"]; 

  const renderHighlighted = (text) => {
    if (!text || typeof text !== 'string') return text;
    let parts = [text];
    HIGHLIGHT_TERMS.forEach((term) => {
      const regex = new RegExp(`(${term}\\s*:)`, 'g');
      parts = parts.flatMap((part, i) => {
        if (typeof part !== 'string') return [part];
        return part.split(regex).map((chunk, idx) => {
          if (idx % 2 === 1) {
            return <strong key={`${term}-${i}-${idx}`}>{chunk}</strong>;
          }
          return chunk;
        });
      });
    });
    return parts;
  };

  const hasLabelStructure = (text) => typeof text === 'string' && /.+:\s*/.test(text);

  const renderAsListIfLabeled = (items) => {
    const allLabeled = items.every((t) => hasLabelStructure(t));
    if (!allLabeled) return null;

    const parsed = items.map((t) => {
      const [label, ...rest] = t.split(/:\s*/);
      const body = rest.join(': ').trim();
      return { label, body };
    });

    const structured = [];
    let currentGroup = null;
    parsed.forEach((it) => {
      if (it.body.length === 0) {
        currentGroup = { label: it.label, children: [] };
        structured.push(currentGroup);
        return;
      }
      if (currentGroup) {
        currentGroup.children.push(it);
      } else {
        structured.push(it);
      }
    });

    return (
      <ul className="application-card-desc-list">
        {structured.map((node, i) => {
          if (node.children) {
            return (
              <li key={`g-${i}`}>
                <span className="application-card-desc-label">{node.label}:</span>
                {node.children.length > 0 && (
                  <ul className="application-card-desc-sublist">
                    {node.children.map((c, j) => (
                      <li key={`c-${i}-${j}`}>
                        <span className="application-card-desc-label">{c.label}:</span>{' '}
                        <span className="application-card-desc-body">{c.body}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }
          return (
            <li key={i}>
              <span className="application-card-desc-label">{node.label}:</span>{' '}
              <span className="application-card-desc-body">{node.body}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  const cardContent = (
    <>
      {title && (
        <div 
          ref={titleRef}
          className={`application-card-title ${isTitleExpanded ? 'expanded' : ''} ${isOverflowing ? 'overflowing' : ''} ${isTextLong ? 'long-text' : ''}`}
          onMouseEnter={() => isOverflowing && setIsTitleExpanded(true)}
          onMouseLeave={() => isOverflowing && setIsTitleExpanded(false)}
        >
          <span>{isTextLong ? `${title} • ${title} • ${title}` : title}</span>
        </div>
      )}
      {image && (
        <div className={`application-card-image-container ${fullWidthImage ? 'fullwidth' : ''}`}>
          <img src={image} alt={imageAlt} />
        </div>
      )}
      <div className="application-card-label">{label}</div>
      {renderAsListIfLabeled(descriptions) ||
        descriptions.map((text, index) => (
          <div key={index} className="application-card-desc">{renderHighlighted(text)}</div>
        ))}
    </>
  );

  return (
    <div className="application-card">
      {link ? (
        <Link to={link}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
};

export default ApplicationCard; 