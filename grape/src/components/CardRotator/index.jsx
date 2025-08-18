import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./CardRotator.css";

/**
 * CardRotator 컴포넌트
 *
 * 카드들이 자동으로 회전하며 표시되는 컴포넌트입니다.
 * 
 * 주요 기능:
 * - 자동 카드 회전 (7초 간격)
 * - 수동 카드 선택 (점 클릭)
 * - 페이드 인/아웃 애니메이션
 * - 반응형 높이 조정
 * - 접근성 지원 (ARIA 라벨, 키보드 네비게이션)
 * - 배경 이미지 변경 콜백
 *
 * Props:
 * - cards: 카드 데이터 배열
 * - className: 추가 CSS 클래스
 * - onCardChange: 카드 변경 시 호출되는 콜백 함수 (index)
 * - currentIndex: 현재 카드 인덱스
 *
 * 사용법:
 * <CardRotator cards={cardData} onCardChange={handleCardChange} />
 */
function CardRotator({ cards, className = "", onCardChange, currentIndex: externalCurrentIndex }) {
  const [currentIndex, setCurrentIndex] = useState(externalCurrentIndex || 0);
  const [isFading, setIsFading] = useState(true);
  const [maxCardHeight, setMaxCardHeight] = useState(null);
  const rotatorRef = useRef(null);
  const measurementRef = useRef(null);
  const transitionTimeoutRef = useRef(null); // 전환 타이밍을 일관되게 관리
  
  // 외부에서 전달된 currentIndex가 변경되면 내부 상태도 업데이트
  useEffect(() => {
    if (externalCurrentIndex !== undefined && externalCurrentIndex !== currentIndex) {
      // 이전 전환 타이머가 있다면 정리
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
      
      setIsFading(false);
      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentIndex(externalCurrentIndex);
        setIsFading(true);
        transitionTimeoutRef.current = null;
      }, 200);
    }
  }, [externalCurrentIndex]);
  
  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    
    // 이전 전환 타이머가 있다면 정리
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    // 부모 컴포넌트에 즉시 카드 변경 알림
    if (onCardChange) {
      onCardChange(index);
    }
    setIsFading(false);
    transitionTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(true);
      transitionTimeoutRef.current = null;
    }, 750); // 애니메이션의 절반 지점에서 새 카드 시작 (겹치는 효과)
  };

  // 자동 회전 효과
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % cards.length;
      
      // 이전 전환 타이머가 있다면 정리
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      
      // 부모 컴포넌트에 즉시 카드 변경 알림
      if (onCardChange) {
        onCardChange(nextIndex);
      }
      setIsFading(false);
      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsFading(true);
        transitionTimeoutRef.current = null;
      }, 750); // 애니메이션의 절반 지점에서 새 카드 시작 (겹치는 효과)
    }, 7000); // 7초로 변경

    return () => {
      clearInterval(intervalId);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [cards.length, currentIndex, onCardChange]);

  // 카드 중 가장 큰 높이를 계산하여 고정
  useEffect(() => {
    let debounceTimer;
    const debouncedMeasure = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(measure, 150); // 디바운스 시간 증가
    };

    const measure = () => {
      if (!measurementRef.current) return;
      const childElements = Array.from(measurementRef.current.children);
      if (childElements.length === 0) return;
      const heights = childElements.map((el) => el.scrollHeight || el.offsetHeight || 0);
      const max = Math.max(0, ...heights);
      setMaxCardHeight(max);
    };

    // 최초 측정만 실행 (애니메이션 중 재계산 방지)
    measure();
    
    // 리사이즈 시에만 재측정
    window.addEventListener("resize", debouncedMeasure);

    // 폰트 로드 이후 한 번만 재측정
    if (document && 'fonts' in document) {
      document.fonts?.ready.then(() => {
        setTimeout(measure, 100); // 폰트 로드 후 약간의 지연
      }).catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", debouncedMeasure);
      clearTimeout(debounceTimer);
    };
  }, [cards]);

  return (
    <div className={`card-rotator ${className}`} ref={rotatorRef} style={maxCardHeight ? { minHeight: `${maxCardHeight}px` } : undefined}>
      <article
        className={`hero-card ${isFading ? "card-enter" : "card-leave"}`}
        style={maxCardHeight ? { minHeight: `${maxCardHeight}px` } : undefined}
      >
        <p className="hero-eyebrow">{cards[currentIndex].eyebrow}</p>
        <h1 className="hero-title">{cards[currentIndex].title}</h1>
        <p className="hero-desc">{cards[currentIndex].description}</p>
        <div className="hero-cta-row">
          <Link to={cards[currentIndex].ctaHref}>
            <button className="hero-cta">{cards[currentIndex].ctaText}</button>
          </Link>
          <span className="hero-caption">{cards[currentIndex].caption}</span>
        </div>
      </article>
      
      {/* 측정용 숨김 카드들: 레이아웃에 영향 없음 */}
      <div
        ref={measurementRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, visibility: "hidden", pointerEvents: "none", zIndex: -1 }}
      >
        {cards.map((card, index) => (
          <article key={index} className="hero-card">
            <p className="hero-eyebrow">{card.eyebrow}</p>
            <h1 className="hero-title">{card.title}</h1>
            <p className="hero-desc">{card.description}</p>
            <div className="hero-cta-row">
              <button className="hero-cta" type="button">{card.ctaText}</button>
              <span className="hero-caption">{card.caption}</span>
            </div>
          </article>
        ))}
      </div>
      
      <div className="dot-pagination" role="tablist" aria-label="hero pagination">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={currentIndex === index}
            role="tab"
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default CardRotator;
