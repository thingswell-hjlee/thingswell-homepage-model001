// 콘텐츠 슬롯 검증기 — 특허 허위표시·근거 없는 센서·글자수 초과를 빌드 단계에서 차단.
// 사용: node scripts/validate-content.mjs
// 빌드 체인: npm run validate:content → npm run seo → npm run build (역순 금지)
//
// 값의 원본은 docs/DATA-SOURCE.md (검증된 사실 원장). 이 검증기는 원장의 규칙을 코드로 강제한다:
//   - legalStatus: registered | pending | rejected (rejected는 로더가 필터, 화면 노출 금지)
//   - 센서: sensor-whitelist.json의 code만 허용 (forbidden 목록은 즉시 차단)
//   - R&D role: '주관' | '참여연구개발기관' ('참여'의 '주관' 격상 방지)
//   - 연구비·임의 수치 필드 금지 (DATA-SOURCE §2 표기 주의, §7)
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
const LEGAL_STATUSES = ['registered', 'pending', 'rejected'];
const RND_ROLES = ['주관', '참여연구개발기관'];
const AXES = ['industrial', 'care', 'environment', 'platform'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const PERIOD_RE = /^\d{4}-\d{2} ~ \d{4}-\d{2}$/;

// 연구비·임의 수치 유입 방지: 슬롯 항목에 등장하면 차단하는 필드명
const FORBIDDEN_FIELDS = ['budget', 'funding', 'amount', '연구비', '금액'];

// 필드 글자수 상한(초과 시 위반). 영문 번역 대체 정책(DATA-SOURCE §1)에 따라
// 공식 명칭 번역이 한글보다 길어지는 것을 감안한 값.
const MAX_LEN = { title: 200, name: 80, category: 40, organization: 80, ministry: 60 };

const whitelist = JSON.parse(readFileSync(path.join(contentDir, 'schema', 'sensor-whitelist.json'), 'utf8'));
const ALLOWED_SENSORS = (whitelist.allowed ?? []).map((s) => s.code);
const FORBIDDEN_SENSORS = whitelist.forbidden ?? [];

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

    // ---- ready 승격 조건: 근거 필수, 항목 TODO 잔존 금지 ----
    if (slot.status === 'ready') {
      if (!item._evidence) report('error', f, `${tag}: status=ready인데 _evidence(근거) 없음`);
      if (item._todo?.length) report('error', f, `${tag}: status=ready인데 _todo 미해결 ${item._todo.length}건: ${item._todo.join(', ')}`);
    }

    // ---- 금지 필드(연구비·임의 수치) ----
    for (const key of Object.keys(item)) {
      if (FORBIDDEN_FIELDS.some((bad) => key.toLowerCase().includes(bad)))
        report('error', f, `${tag}: 금지 필드 "${key}" — 연구비·수치는 화면 표시 금지 (DATA-SOURCE §2·§7)`);
    }

    // ---- 특허 legalStatus (허위표시 방지 핵심) ----
    if (slot.slotType === 'patents') {
      if (item.legalStatus != null && !LEGAL_STATUSES.includes(item.legalStatus))
        report('error', f, `${tag}: legalStatus 값 오류: ${item.legalStatus} (${LEGAL_STATUSES.join('|')})`);
      if (slot.status === 'ready' && item.legalStatus == null)
        report('error', f, `${tag}: status=ready인데 legalStatus 미확정 — 원장 확인 전 게재 불가`);
      if (item.legalStatus === 'registered' && !item.regNumber)
        report('error', f, `${tag}: registered인데 regNumber(등록번호) 없음`);
      if (item.legalStatus === 'pending' && item.regNumber)
        report('error', f, `${tag}: pending(출원 중)인데 regNumber 표기 — 등록 표기 금지, pubNumber를 사용`);
      // rejected 항목의 데이터 보존은 허용하되, 로더(getPublishableItems)가 화면에서 필터한다.
      if (item.legalStatus === 'rejected')
        report('warn', f, `${tag}: rejected — 데이터 보존용. 화면 노출 금지(로더 필터 확인)`);
    }

    // ---- R&D role·period·axis ----
    if (slot.slotType === 'rnd') {
      if (item.role != null && !RND_ROLES.includes(item.role))
        report('error', f, `${tag}: role 값 오류: "${item.role}" (${RND_ROLES.join('|')}) — '참여'는 '참여연구개발기관'으로 정확 표기`);
      if (item.period != null && !PERIOD_RE.test(item.period))
        report(level, f, `${tag}: period 형식 오류: ${item.period} (YYYY-MM ~ YYYY-MM)`);
    }
    if (item.axis != null && !AXES.includes(item.axis))
      report('error', f, `${tag}: axis 값 오류: ${item.axis} (${AXES.join('|')})`);

    // ---- 센서 화이트리스트 (코드 기준) ----
    if (Array.isArray(item.sensors)) {
      for (const s of item.sensors) {
        if (FORBIDDEN_SENSORS.includes(s))
          report('error', f, `${tag}: 사용 금지 센서 "${s}" — 근거 미확인 (DATA-SOURCE §3)`);
        else if (!ALLOWED_SENSORS.includes(s))
          report('error', f, `${tag}: 화이트리스트에 없는 센서 주장: "${s}" (허용: ${ALLOWED_SENSORS.join(', ')})`);
      }
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
console.log('🔍 콘텐츠 슬롯 검증 시작 (원장: docs/DATA-SOURCE.md)');
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
console.log('✅ 통과 (경고는 통지용이며 빌드를 막지 않습니다)');
