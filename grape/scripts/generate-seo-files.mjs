// robots.txt + sitemap.xml 을 한 번에 생성 (통합 SEO 파일 생성기).
// 사용: node scripts/generate-seo-files.mjs [BASE_URL]
//   예: node scripts/generate-seo-files.mjs https://www.safegai.co.kr
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE_URL = (process.argv[2] || process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://www.thingswell.co.kr').replace(/\/+$/, '');
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
];

const outPath = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

// ---------- robots.txt ----------
const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /login
Disallow: /forgot-password

Sitemap: ${BASE_URL}/sitemap.xml
`;
writeFileSync(outPath('robots.txt'), robots, 'utf8');

// ---------- sitemap.xml ----------
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
writeFileSync(outPath('sitemap.xml'), xml, 'utf8');

console.log('✅ SEO 파일 생성 완료');
console.log(`   robots.txt   → public/robots.txt`);
console.log(`   sitemap.xml  → public/sitemap.xml (${ROUTES.length} routes × ${LANGS.length} langs = ${ROUTES.length * LANGS.length} URLs)`);
console.log(`   BASE_URL=${BASE_URL}`);
