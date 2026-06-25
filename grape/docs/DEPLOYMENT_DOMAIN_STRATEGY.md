# Deployment & Domain Strategy

## Current Infrastructure

### S3 Bucket
- **Bucket name:** `thingswell-homepage`
- **Hosting:** Static website hosting via S3 + CloudFront

### CloudFront Distributions
| Domain | Distribution ID | Purpose |
|--------|----------------|---------|
| thingswell.co.kr | EQTMTY6FNARD8 | ThingsWell corporate homepage |
| safegai.co.kr | EEWV39QWFGBHW | SafeGAI platform homepage |

### CloudFront Function
- A CloudFront Function (`thingswell-root-to-ko.js`) handles root URL redirect to `/ko` for language-prefixed routing.
- Located at: `grape/aws/cloudfront-functions/thingswell-root-to-ko.js`

---

## Current Short-Term Strategy

Both domains (thingswell.co.kr and safegai.co.kr) share the **same S3 bucket and same `index.html`**. The OG/SEO meta tags in this single `index.html` are configured with ThingsWell-priority metadata:

```html
<meta property="og:title" content="ThingsWell - AI Safety Management Platform" />
<meta property="og:site_name" content="ThingsWell" />
<meta property="og:url" content="https://thingswell.co.kr" />
```

This is a pragmatic short-term approach that prioritizes ThingsWell branding for OG previews on all social platforms and messengers (KakaoTalk, Slack, etc.).

---

## Problem Statement

Since safegai.co.kr shares the same origin (same S3 bucket, same `index.html`), static OG meta tags can only represent one domain. This means:

1. **Sharing safegai.co.kr links** on KakaoTalk or other platforms shows ThingsWell branding instead of SafeGAI branding
2. **SEO canonical URLs** point to thingswell.co.kr regardless of which domain is accessed
3. **Search engine indexing** may treat both domains as duplicates of thingswell.co.kr

The React app dynamically updates OG tags via `SEOHead` component after JavaScript loads, but social crawlers (KakaoTalk, Facebook, Twitter) do not execute JavaScript and only read the initial HTML.

---

## Long-Term Recommendations

### Option 1: Separate S3 Buckets per Domain (Recommended)

Create two distinct S3 buckets with separate builds:

```
s3://thingswell-homepage/     -> CloudFront EQTMTY6FNARD8 (thingswell.co.kr)
s3://safegai-homepage/        -> CloudFront EEWV39QWFGBHW (safegai.co.kr)
```

**Pros:**
- Clean separation of concerns
- Each domain has its own `index.html` with correct OG tags
- Independent deployment cycles
- No Lambda@Edge costs

**Cons:**
- Two build/deploy pipelines needed
- Need to maintain brand-specific build configuration

**Implementation:**
1. Add `VITE_BRAND` environment variable to the Vite build
2. In `index.html`, use conditional OG tags based on brand
3. Create two deploy scripts: `deploy-thingswell.sh` and `deploy-safegai.sh`
4. Each deploys to its respective S3 bucket with brand-specific env vars

---

### Option 2: Lambda@Edge for Domain-Specific index.html

Keep a single S3 bucket but add a Lambda@Edge function on the CloudFront origin-response event:

```javascript
// Lambda@Edge: origin-response
exports.handler = async (event) => {
  const request = event.Records[0].cf.request;
  const response = event.Records[0].cf.response;
  const host = request.headers.host[0].value;

  if (response.headers['content-type']?.[0]?.value?.includes('text/html')) {
    let body = response.body;
    if (host.includes('safegai')) {
      body = body.replace(/og:title" content="[^"]*"/, 'og:title" content="SafeGAI - AI Safety Platform"');
      body = body.replace(/og:url" content="[^"]*"/, 'og:url" content="https://safegai.co.kr"');
      // ... more replacements
    }
    response.body = body;
  }
  return response;
};
```

**Pros:**
- Single build, single bucket
- Dynamic per-domain customization at edge

**Cons:**
- Lambda@Edge has cold-start latency
- More complex debugging
- Additional AWS costs
- Cannot use response body manipulation on cached responses without careful cache-key design

---

### Option 3: Environment-Variable-Based Build (Simplest)

Use a single codebase but produce domain-specific builds via environment variables:

```bash
# ThingsWell build
VITE_BRAND=thingswell VITE_DOMAIN=https://thingswell.co.kr npm run build

# SafeGAI build
VITE_BRAND=safegai VITE_DOMAIN=https://safegai.co.kr npm run build
```

In `index.html` (using Vite HTML env substitution):
```html
<meta property="og:title" content="%VITE_OG_TITLE%" />
<meta property="og:url" content="%VITE_DOMAIN%" />
```

**Pros:**
- Same codebase, no code duplication
- Standard Vite feature (env variables in HTML)
- Works with either single or separate S3 buckets

**Cons:**
- Requires separate build step per domain
- CI/CD pipeline needs to build twice

---

## Kakao OG Cache Clearing Procedure

When OG meta tags are updated, KakaoTalk caches the old preview. To force refresh:

1. **Kakao Developers Console:**
   - Visit: https://developers.kakao.com/tool/debugger/sharing
   - Enter the URL (e.g., `https://thingswell.co.kr`)
   - Click "Clear Cache" (캐시 초기화)

2. **API Method:**
   ```bash
   curl -X POST "https://developers.kakao.com/tool/debugger/sharing" \
     -d "url=https://thingswell.co.kr"
   ```

3. **Verification:**
   - After clearing, share the URL again in KakaoTalk
   - The new OG image and title should appear within minutes

**Note:** Facebook uses its own debugger (https://developers.facebook.com/tools/debug/), and Twitter uses Cards Validator (https://cards-dev.twitter.com/validator).

---

## CloudFront Function: Root-to-/ko Redirect

The CloudFront Function `thingswell-root-to-ko.js` is already deployed and handles:
- Redirecting bare root `/` to `/ko` for the language-prefixed SPA routing
- This ensures users landing on the root URL are directed to the Korean version by default

---

## Recommended Migration Path

1. **Immediate (current state):** Single bucket, ThingsWell-priority OG. SafeGAI links show ThingsWell branding in previews.
2. **Short-term:** Implement Option 3 (env-variable build) + separate S3 buckets (Option 1). This gives clean domain separation with minimal code changes.
3. **Long-term:** If domains diverge significantly in content/branding, consider fully independent repositories.

---

## Deployment Commands (Current)

```bash
# Build
cd grape && npm run build

# Deploy to S3 (current single-bucket approach)
aws s3 sync dist/ s3://thingswell-homepage --delete

# Invalidate CloudFront cache (ThingsWell)
aws cloudfront create-invalidation --distribution-id EQTMTY6FNARD8 --paths "/*"

# Invalidate CloudFront cache (SafeGAI)
aws cloudfront create-invalidation --distribution-id EEWV39QWFGBHW --paths "/*"
```
