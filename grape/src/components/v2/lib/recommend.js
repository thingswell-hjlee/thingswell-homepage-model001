// 진단 위젯 추천 엔진 — 규칙 기반 (개발 방안 결정 ③: AI 위젯은 LLM 없이 시작).
// 데이터 근거는 콘텐츠 슬롯(docs/DATA-SOURCE.md 원장)뿐이다:
//   - 제품: 선택한 축(axis)의 제품군 (§6)
//   - R&D: 같은 축의 고객용(customerFacing) 과제 (§2)
// 현장 조건(§5)은 성능 주장에 쓰지 않고, 상담 전달용 태그로만 취급한다.
import { getPublishableItems } from '../../../content';

export function recommend({ axis, conditions = [] }) {
  if (!axis) return null;
  const products = getPublishableItems('products').filter((p) => p.axis === axis);
  const rnd = getPublishableItems('rnd').filter((r) => r.axis === axis);
  return { axis, conditions, products, rnd };
}

// TODO: RAG/LLM 연동 지점 — 안정화 후 이 인터페이스 뒤에 붙인다.
// 계약: recommendAsync(input)는 recommend(input)와 동일한 형태를 resolve해야 하며,
// 실패 시 규칙 기반 결과로 폴백한다. (백엔드 API 신설은 별도 승인 사안)
export async function recommendAsync(input) {
  return recommend(input);
}
