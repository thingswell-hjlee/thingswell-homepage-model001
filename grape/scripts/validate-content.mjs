// 콘텐츠 슬롯 검증기 — 특허 허위표시·근거 없는 센서·글자수 초과를 빌드 단계에서 차단.
// 사용: node scripts/validate-content.mjs
// 빌드 체인: npm run validate:content → npm run seo → npm run build (역순 금지)
//
// 정책:
//   status=draft  → 위반은 경고만 (골격/이관 중 슬롯을 막지 않는다)
//   status=ready  → 위반 1건이라도 있으면 exit 1 (빌드 차단)
// 외부 의존성 0 (Node 내장 모듈만 — 신규 npm 의존성은 사전 승인 대상이므로).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(here, '..', 'src', 'content');
const slotsDir = path.join(contentDir, 'slots');
const assetsDir = path.join(here, '..', 'src', 'assets');

const SLOT_TYPES = ['patents', 'rnd', 'certificates', 'cases', 'products'];
const STATUSES = ['draft', 'ready'];
const LEGAL_STATUSES = ['출원', '공개', '등록', '거절', '소멸'];
// 웹 게재 가능한 법적 상태 — 거절·소멸 특허 게재 및 출원의 등록 표기를 막는다.
const PUBLISHABLE_LEGAL = ['출원', '공개', '등록'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// 필드 글자수 상한(초과 시 위반). 슬롯 화면 설계 확정 시 조정.
const MAX_LEN = { title: 80, name: 60, category: 30, organization: 60 };

const whitelistPath = path.join(contentDir, 'schema', 'sensor-whitelist.json');
const sensorWhitelist = existsSync(whitelistPath)
  ? JSON.parse(readFileSync(whitelistPath, 'utf8')).allowed ?? []
  : [];

let errors = 0;
let warnings = 0;

function report(level, file, msg) {
  if (level === 'error') { errors += 1; console.error(`  ❌ [${file}] ${msg}`); }
  else { warnings += 1; console.warn(`  ⚠️  [${file}] ${msg}`); }
}

// bilingual 필드({ko,en} 또는 string/null)에서 검사 대상 문자열들을 꺼낸다.
function textsOf(field) {
  if (field == null) return [];
  if (typeof field === 'string') return [field];
  return [field.ko, field.en].filter((v) => typeof v === 'string');
}

function validateSlot(fileName, slot) {
  // level: ready 슬롯의 위반은 error(차단), draft는 warn(통지만)
  const level = slot.status === 'ready' ? 'error' : 'warn';
  const f = fileName;

  // ---- 슬롯 공통 계약 ----
  if (!SLOT_TYPES.includes(slot.slotType)) report('error', f, `slotType이 유효하지 않음: ${slot.slotType}`);
  if (!STATUSES.includes(slot.status)) report('error', f, `status가 유효하지 않음: ${slot.status} (draft|ready)`);
  if (!DATE_RE.test(slot.updatedAt ?? '')) report('error', f, `updatedAt 형식 오류: ${slot.updatedAt} (YYYY-MM-DD)`);
  if (!Array.isArray(slot.items)) { report('error', f, 'items가 배열이 아님'); return; }

  const ids = new Set();
  for (const item of slot.items) {
    const tag = item.id ?? '(id 없음)';
    if (!item.id) report('error', f, 'id 없는 항목 존재');
    else if (ids.has(item.id)) report('error', f, `id 중복: ${item.id}`);
    ids.add(item.id);

    // ---- ready 승격 조건: 근거 필수, TODO 잔존 금지 ----
    if (slot.status === 'ready') {
      if (!item._evidence) report('error', f, `${tag}: status=ready인데 _evidence(근거) 없음`);
      if (item._todo?.length) report('error', f, `${tag}: status=ready인데 _todo 미해결 ${item._todo.length}건: ${item._todo.join(', ')}`);
    }

    // ---- 특허 legalStatus (허위표시 방지 핵심) ----
    if (slot.slotType === 'patents') {
      if (item.legalStatus != null && !LEGAL_STATUSES.includes(item.legalStatus))
        report('error', f, `${tag}: legalStatus 값 오류: ${item.legalStatus} (${LEGAL_STATUSES.join('|')})`);
      if (item.legalStatus != null && !PUBLISHABLE_LEGAL.includes(item.legalStatus))
        report('error', f, `${tag}: 게재 불가 법적 상태(${item.legalStatus}) — 거절·소멸 특허는 웹 게재 금지`);
      if (slot.status === 'ready' && item.legalStatus == null)
        report('error', f, `${tag}: status=ready인데 legalStatus 미확정 — 원문 확인 전 게재 불가`);
      // '등록' 아닌 항목이 등록번호 형식 표기를 쓰는지는 원문 대조 사안이라 여기선 미검사(_evidence로 담보)
    }

    // ---- 센서 화이트리스트 ----
    if (Array.isArray(item.sensors) && sensorWhitelist.length > 0) {
      for (const s of item.sensors) {
        if (!sensorWhitelist.includes(s))
          report(level, f, `${tag}: 화이트리스트에 없는 센서 주장: "${s}"`);
      }
    } else if (Array.isArray(item.sensors) && item.sensors.length > 0 && sensorWhitelist.length === 0) {
      report(level, f, `${tag}: 센서 화이트리스트가 비어 있는데 센서 주장 존재 — 화이트리스트 확정 필요`);
    }

    // ---- 글자수 상한 ----
    for (const [field, max] of Object.entries(MAX_LEN)) {
      for (const text of textsOf(item[field])) {
        if (text.length > max)
          report(level, f, `${tag}: ${field} 글자수 초과 (${text.length} > ${max}): "${text.slice(0, 30)}…"`);
      }
    }

    // ---- 날짜 형식 ----
    if (item.date != null && !DATE_RE.test(item.date))
      report(level, f, `${tag}: date 형식 오류: ${item.date} (YYYY-MM-DD)`);

    // ---- 이미지 파일 실존 ----
    if (item.image != null) {
      if (!existsSync(path.join(assetsDir, item.image)))
        report('error', f, `${tag}: 이미지 파일 없음: src/assets/${item.image}`);
    }
  }
}

// ---------- 실행 ----------
console.log('🔍 콘텐츠 슬롯 검증 시작');
const files = readdirSync(slotsDir).filter((n) => n.endsWith('.json')).sort();
if (files.length === 0) { console.error('❌ 슬롯 파일이 없습니다:', slotsDir); process.exit(1); }

for (const name of files) {
  let slot;
  try {
    slot = JSON.parse(readFileSync(path.join(slotsDir, name), 'utf8'));
  } catch (e) {
    report('error', name, `JSON 파싱 실패: ${e.message}`);
    continue;
  }
  validateSlot(name, slot);
}

console.log(`\n검증 완료: 슬롯 ${files.length}개, 오류 ${errors}건, 경고 ${warnings}건`);
if (errors > 0) {
  console.error('❌ 오류가 있어 빌드를 차단합니다. 위 항목을 해결하거나 해당 슬롯을 status=draft로 되돌리세요.');
  process.exit(1);
}
console.log('✅ 통과 (경고는 draft 슬롯의 미확정 항목 통지이며 빌드를 막지 않습니다)');
