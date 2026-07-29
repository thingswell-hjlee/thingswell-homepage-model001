// How-it-works 파이프라인 그래픽 — hero 레이더 모티프와 같은 시각 언어.
// 수집 → 엣지 대응 → RAG 추론 → 안전/효율 분기. 펄스가 좌→우로 흐른다.
// 텍스트 라벨은 아래 카드가 담당하므로 그래픽은 아이콘·흐름만 (장식, aria-hidden).
// 순수 SVG+CSS — 의존성·자산 파일 0. 스타일은 home-v2.css의 tw2-pl-* (tw2 스코프).

const NODES = [
  { x: 60, kind: 'collect' },
  { x: 220, kind: 'edge' },
  { x: 380, kind: 'brain' },
];

function NodeIcon({ kind, x, y }) {
  const s = { transform: `translate(${x - 12}px, ${y - 12}px)` };
  if (kind === 'collect')
    return (
      <g style={s} className="tw2-pl-icon">
        <circle cx="12" cy="17" r="2.6" />
        <path d="M6.3 8.6a8 8 0 0 1 11.4 0" />
        <path d="M8.9 11.8a4.4 4.4 0 0 1 6.2 0" />
      </g>
    );
  if (kind === 'edge')
    return (
      <g style={s} className="tw2-pl-icon">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="m12.8 8.5-2.3 3.5h3l-2.3 3.5" />
      </g>
    );
  if (kind === 'brain')
    return (
      <g style={s} className="tw2-pl-icon">
        <path d="M12 4a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0V8a4 4 0 0 0-4-4Z" />
        <path d="M8 10h8M8 14h8" />
      </g>
    );
  if (kind === 'shield')
    return (
      <g style={s} className="tw2-pl-icon">
        <path d="M12 3 5 5.8v5.4c0 4.3 3 7.6 7 8.8 4-1.2 7-4.5 7-8.8V5.8L12 3Z" />
        <path d="m9 11.8 2.2 2.2L15.5 9.5" />
      </g>
    );
  return (
    <g style={s} className="tw2-pl-icon">
      <path d="M4.5 18a8.5 8.5 0 1 1 15 0" />
      <path d="m12 14 3.8-4.6" />
      <circle cx="12" cy="14.6" r="1.4" />
    </g>
  );
}

function PipelineGraphic() {
  const MID = 70;
  return (
    <div className="tw2-pipeline" aria-hidden="true">
      <svg viewBox="0 0 560 140" role="presentation">
        {/* 본선 + 분기선 */}
        <path className="tw2-pl-line" d="M 60 70 H 380" />
        <path className="tw2-pl-line" d="M 380 70 C 430 70 440 40 500 40" />
        <path className="tw2-pl-line" d="M 380 70 C 430 70 440 100 500 100" />

        {/* 흐르는 펄스 */}
        <circle className="tw2-pl-pulse" r="3.2">
          <animateMotion dur="4.2s" repeatCount="indefinite"
            path="M 60 70 H 380 C 430 70 440 40 500 40" />
        </circle>
        <circle className="tw2-pl-pulse" r="3.2">
          <animateMotion dur="4.2s" begin="2.1s" repeatCount="indefinite"
            path="M 60 70 H 380 C 430 70 440 100 500 100" />
        </circle>

        {/* 처리 노드 3개 */}
        {NODES.map((n) => (
          <g key={n.kind}>
            <circle className="tw2-pl-node" cx={n.x} cy={MID} r="24" />
            <NodeIcon kind={n.kind} x={n.x} y={MID} />
          </g>
        ))}

        {/* 결과 노드 2개 (안전 / 효율) */}
        <circle className="tw2-pl-node tw2-pl-node-out" cx="500" cy="40" r="20" />
        <NodeIcon kind="shield" x={500} y={40} />
        <circle className="tw2-pl-node tw2-pl-node-out" cx="500" cy="100" r="20" />
        <NodeIcon kind="gauge" x={500} y={100} />
      </svg>
    </div>
  );
}

export default PipelineGraphic;
