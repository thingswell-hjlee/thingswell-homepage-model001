// v2 공용 아이콘 세트 — 순수 SVG 라인 아이콘 (stroke: currentColor).
// hero 레이더 모티프와 같은 시각 언어(가는 라인·시안 포인트)를 전 페이지에서 재사용한다.
// 장식용이므로 기본 aria-hidden. 스타일은 tw2- 클래스로 크기·색만 제어.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

// 산업안전 — 안전모
export function IconIndustrial(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M2.5 15h19" />
      <path d="M10 7.5V4.8a2 2 0 0 1 4 0v2.7" />
      <path d="M6 18.5h12" />
    </svg>
  );
}

// 케어안전 — 심장 + 파동
export function IconCare(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.7-9-9a5 5 0 0 1 9-3.5A5 5 0 0 1 21 11c-2 4.3-9 9-9 9Z" />
      <path d="M7 11h3l1.5-2.5L13 13l1.3-2H17" />
    </svg>
  );
}

// 공간·환경 — 건물 + 잎
export function IconEnvironment(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V7l6-3v16" />
      <path d="M10 20h10" />
      <path d="M14 20v-6a4 4 0 0 1 6-3.5" />
      <path d="M17.5 13.5 20 11" />
    </svg>
  );
}

// 플랫폼 — 중앙 코어 + 노드
export function IconPlatform(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="4.5" cy="6" r="1.6" />
      <circle cx="19.5" cy="6" r="1.6" />
      <circle cx="4.5" cy="18" r="1.6" />
      <circle cx="19.5" cy="18" r="1.6" />
      <path d="M6 7.2 9.6 10M18 7.2 14.4 10M6 16.8 9.6 14M18 16.8 14.4 14" />
    </svg>
  );
}

// 특허 — 인장 리본
export function IconPatent(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m9 14.5-1.5 5L12 17l4.5 2.5-1.5-5" />
      <path d="m9.8 9.4 1.6 1.6 3-3" />
    </svg>
  );
}

// 국가 R&D — 플라스크
export function IconRnd(props) {
  return (
    <svg {...base} {...props}>
      <path d="M10 3h4" />
      <path d="M10.5 3v5.2L5.4 17a2.4 2.4 0 0 0 2.1 3.5h9a2.4 2.4 0 0 0 2.1-3.5l-5.1-8.8V3" />
      <path d="M7.5 14.5h9" />
    </svg>
  );
}

// 수집 — 신호 유입
export function IconCollect(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="17" r="2.6" />
      <path d="M6.3 8.6a8 8 0 0 1 11.4 0" />
      <path d="M8.9 11.8a4.4 4.4 0 0 1 6.2 0" />
    </svg>
  );
}

// 엣지 — 칩 + 번개
export function IconEdge(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3" />
      <path d="m12.8 8.5-2.3 3.5h3l-2.3 3.5" />
    </svg>
  );
}

// RAG 추론 — 두뇌 노드
export function IconBrain(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0V8a4 4 0 0 0-4-4Z" />
      <path d="M8 10h8M8 14h8M12 4v16" />
    </svg>
  );
}

// 안전 — 방패 체크
export function IconShield(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 5.8v5.4c0 4.3 3 7.6 7 8.8 4-1.2 7-4.5 7-8.8V5.8L12 3Z" />
      <path d="m9 11.8 2.2 2.2L15.5 9.5" />
    </svg>
  );
}

// 효율 — 게이지
export function IconGauge(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 18a8.5 8.5 0 1 1 15 0" />
      <path d="m12 14 3.8-4.6" />
      <circle cx="12" cy="14.6" r="1.4" />
    </svg>
  );
}

const AXIS_ICONS = {
  industrial: IconIndustrial,
  care: IconCare,
  environment: IconEnvironment,
  platform: IconPlatform,
};

// 축 코드로 아이콘 선택 (알 수 없는 코드는 플랫폼 아이콘 폴백)
export function AxisIcon({ code, ...props }) {
  const Cmp = AXIS_ICONS[code] ?? IconPlatform;
  return <Cmp {...props} />;
}
