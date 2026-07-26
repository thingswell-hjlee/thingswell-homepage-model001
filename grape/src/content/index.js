// v2 콘텐츠 레이어 로더.
// 절대 조건: 기존 pages/·components/ 는 이 모듈을 import하지 않는다.
// 소비자는 components/v2/·pagesV2/ 뿐이다. (기존 번들 영향 0)
//
// 값의 원본: docs/DATA-SOURCE.md — 원장에 없는 특허·실적·센서·수치는 슬롯에 넣지 않는다.
import patents from './slots/patents.json';
import rnd from './slots/rnd.json';
import certificates from './slots/certificates.json';
import cases from './slots/cases.json';
import products from './slots/products.json';
import sensorWhitelist from './schema/sensor-whitelist.json';
import axesData from './schema/axes.json';

const slots = { patents, rnd, certificates, cases, products };

export function getSlot(slotType) {
  const slot = slots[slotType];
  if (!slot) throw new Error(`알 수 없는 슬롯: ${slotType}`);
  return slot;
}

// 게재 가능 항목만 반환한다 — 화면(v2)은 반드시 이 함수를 통해서만 슬롯을 읽는다.
//   - draft 슬롯 → 빈 배열 (미확정 데이터의 화면 유출 방지)
//   - rejected 특허 → 필터 (CLAUDE.md §2: 어떤 형태로도 화면에 노출하지 않는다)
//   - customerFacing === false 항목 → 필터 (예: 사이버폭력 R&D — 회사소개·IR 전용.
//     IR 화면에서 필요하면 { includeInternal: true } 로 명시적으로 요청)
export function getPublishableItems(slotType, { includeInternal = false } = {}) {
  const slot = getSlot(slotType);
  if (slot.status !== 'ready') return [];
  return slot.items.filter((item) => {
    if (item.legalStatus === 'rejected') return false;
    if (!includeInternal && item.customerFacing === false) return false;
    return true;
  });
}

// 언어별 필드 접근 헬퍼. bilingual 필드({ko, en})에서 현재 언어 값을 꺼낸다.
// en 미확정(null)이면 ko로 폴백한다 (미확정 영문은 _todo로 추적).
export function pick(field, lang) {
  if (field == null) return null;
  if (typeof field === 'string') return field;
  return field[lang] ?? field.ko ?? null;
}

// 특허 표기 헬퍼 — CLAUDE.md §2 특허 표기 규칙의 코드화.
// registered만 '등록특허', pending은 반드시 '출원 중' 병기. (표기 문구 자체는 i18n v2.* 키로)
export function patentBadgeKey(item) {
  if (item.legalStatus === 'registered') return 'v2.patents.badgeRegistered';
  if (item.legalStatus === 'pending') return 'v2.patents.badgePending';
  return null;
}

export const sensors = sensorWhitelist.allowed;
export const axes = axesData.axes;
export const siteConditions = axesData.siteConditions;

export default slots;
