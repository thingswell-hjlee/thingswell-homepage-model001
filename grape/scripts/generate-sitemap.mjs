// 공개 라우트를 ko/en × 각 경로로, hreflang(ko/en/x-default) 포함해 sitemap.xml 생성.
// 사용: node grape/scripts/generate-sitemap.mjs [BASE_URL]
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE_URL = (process.argv[2] || process.env.VITE_SITE_URL || 'https://www.thingswell.co.kr').replace(/\/+$/, '');
const LANGS = ['ko', 'en'];

// 공개 라우트(lang prefix 없음). /admin·/login·/forgot-password·동적 :id·와일드카드(*) 제외.
const ROUTES = [
  '/',
  '/about', '/about/company', '/about/organization', '/about/history', '/about/licenses', '/about/directions',
  '/products/safety', '/products/monitoring', '/products/control', '/products/control/list',
  '/solutions/overview', '/solutions/chemical', '/solutions/manufacturing',
  '/cases', '/cases/smart-safety', '/cases/integrated-control', '/cases/information-communication',
  '/rnd/multimodal-awareness', '/rnd/on-device-ai', '/rnd/rag-llm',
  '/rnd/embedded-system', '/rnd/smart-assistive-technology', '/rnd/air-quality-management',
  '/safegai-platform',
  '/government-support',
  '/customer-service/announcement',
  '/contact',            // ⚠️ 현재 미등록 라우트 (병합 전까지 404 — 제거하려면 이 줄 삭제)
  '/sitemap',
];

const loc = (lang, path) => `${BASE_URL}/${lang}${path === '/' ? '' : path}`;
const lastmod = new Date().toISOString().slice(0, 10);

const entries = [];
for (const path of ROUTES) {
  for (const lang of LANGS) {
    const alts = LANGS
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${loc(l, path)}"/>`)
      .join('\n');
    entries.push(
`  <url>
    <loc>${loc(lang, path)}</loc>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc('ko', path)}"/>
    <lastmod>${lastmod}</lastmod>
  </url>`);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

const outPath = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
writeFileSync(outPath, xml, 'utf8');
console.log(`✅ sitemap.xml 생성: ${outPath}`);
console.log(`   BASE_URL=${BASE_URL} · ${ROUTES.length} routes × ${LANGS.length} langs = ${ROUTES.length * LANGS.length} URLs`);
