// 홈 hero 인트로 비주얼 — "다중센서 신호가 SafeGAI 코어로 모여 안전 경보가 되는" 모티프.
// 순수 SVG + CSS 애니메이션 (신규 의존성 0, 자산 파일 0).
// 센서 라벨은 원장 §3 화이트리스트 내에서만 사용. 스타일은 tw2- 스코프 (home-v2.css).
import useTranslation from '../../hooks/useTranslation';

// 궤도 위 센서 노드 (각도는 12시 기준 시계방향)
const SENSOR_NODES = [
  { code: 'radar', angle: -30, ko: '레이더', en: 'Radar' },
  { code: 'camera', angle: 45, ko: '카메라', en: 'Camera' },
  { code: 'audio', angle: 135, ko: '음향', en: 'Audio' },
  { code: 'air', angle: 215, ko: '공기질', en: 'Air quality' },
];

const ORBIT_R = 118;
const CX = 160;
const CY = 160;

function polar(angleDeg, r) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function HeroVisual() {
  const { currentLang } = useTranslation();

  return (
    <div className="tw2-hero-visual" aria-hidden="true">
      <svg viewBox="0 0 320 320" role="presentation">
        {/* 레이더 링 */}
        {[52, 85, ORBIT_R].map((r) => (
          <circle key={r} className="tw2-hv-ring" cx={CX} cy={CY} r={r} />
        ))}

        {/* 레이더 스윕 */}
        <g className="tw2-hv-sweep">
          <path
            d={`M ${CX} ${CY} L ${CX} ${CY - ORBIT_R} A ${ORBIT_R} ${ORBIT_R} 0 0 1 ${polar(50, ORBIT_R).x} ${polar(50, ORBIT_R).y} Z`}
            fill="url(#tw2-hv-sweep-grad)"
          />
        </g>

        {/* 센서 → 코어 연결선 + 유입 펄스 */}
        {SENSOR_NODES.map((s, i) => {
          const p = polar(s.angle, ORBIT_R);
          return (
            <g key={s.code}>
              <line className="tw2-hv-link" x1={p.x} y1={p.y} x2={CX} y2={CY} />
              <circle className="tw2-hv-pulse" r="3.5" style={{ animationDelay: `${i * 0.9}s` }}>
                <animateMotion
                  dur="3.6s"
                  begin={`${i * 0.9}s`}
                  repeatCount="indefinite"
                  path={`M ${p.x} ${p.y} L ${CX} ${CY}`}
                />
              </circle>
            </g>
          );
        })}

        {/* 코어 */}
        <circle className="tw2-hv-core-halo" cx={CX} cy={CY} r="34" />
        <circle className="tw2-hv-core" cx={CX} cy={CY} r="26" />
        <text className="tw2-hv-core-label" x={CX} y={CY - 2} textAnchor="middle">SafeGAI</text>
        <text className="tw2-hv-core-sub" x={CX} y={CY + 12} textAnchor="middle">Platform</text>

        {/* 경보 파동 (코어에서 바깥으로) */}
        <circle className="tw2-hv-alert" cx={CX} cy={CY} r="26" />
        <circle className="tw2-hv-alert tw2-hv-alert-2" cx={CX} cy={CY} r="26" />

        {/* 센서 노드 + 라벨 */}
        {SENSOR_NODES.map((s) => {
          const p = polar(s.angle, ORBIT_R);
          const label = currentLang === 'en' ? s.en : s.ko;
          const outer = polar(s.angle, ORBIT_R + 22);
          return (
            <g key={s.code}>
              <circle className="tw2-hv-node" cx={p.x} cy={p.y} r="7" />
              <text className="tw2-hv-node-label" x={outer.x} y={outer.y + 4} textAnchor="middle">
                {label}
              </text>
            </g>
          );
        })}

        <defs>
          <linearGradient id="tw2-hv-sweep-grad" gradientUnits="userSpaceOnUse"
            x1={CX} y1={CY - ORBIT_R} x2={polar(50, ORBIT_R).x} y2={polar(50, ORBIT_R).y}>
            <stop offset="0%" stopColor="rgba(56,189,248,0)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0.28)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default HeroVisual;
