// 스크롤 리빌 래퍼 — 뷰포트 진입 시 한 번 페이드업 (2025 애플 스타일의 절제된 모션).
// IntersectionObserver 기반, 의존성 0. 모션 스타일·reduced-motion 대응은 home-v2.css의 .tw2-reveal.
import { createElement, useEffect, useRef, useState } from 'react';

function Reveal({ as: Tag = 'section', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    Tag,
    { ref, className: `${className} tw2-reveal${shown ? ' tw2-reveal-in' : ''}`, ...rest },
    children
  );
}

export default Reveal;
