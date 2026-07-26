// v2 콘텐츠 레이어 로더.
// 절대 조건: 트랙 B(v2 화면) 이전에는 기존 pages/·components/ 어디에서도 이 모듈을 import하지 않는다.
// (import가 없으므로 Vite 트리셰이킹과 무관하게 기존 번들에 영향 0)
import patents from './slots/patents.json';
import rnd from './slots/rnd.json';
import certificates from './slots/certificates.json';
import cases from './slots/cases.json';
import products from './slots/products.json';

const slots = { patents, rnd, certificates, cases, products };

// status=ready 항목만 화면에 노출한다. draft 슬롯은 프로덕션에서 빈 배열.
export function getSlot(slotType) {
  const slot = slots[slotType];
  if (!slot) throw new Error(`알 수 없는 슬롯: ${slotType}`);
  return slot;
}

export function getReadyItems(slotType) {
  const slot = getSlot(slotType);
  return slot.status === 'ready' ? slot.items : [];
}

// 언어별 필드 접근 헬퍼. bilingual 필드({ko, en})에서 현재 언어 값을 꺼낸다.
export function pick(field, lang) {
  if (field == null) return null;
  if (typeof field === 'string') return field;
  return field[lang] ?? field.ko ?? null;
}

export default slots;
