# Cordoba Corporation - 401(k) Enrollment Guide

## Project
- **Client:** Cordoba Corporation
- **Plan:** 401(k) Plan
- **GitHub:** Fiduciary-Experts/cordoba-401k-enrollment
- **Vercel:** https://cordoba-401k-enrollment.vercel.app
- **Branch:** master

## Architecture
- `index.html` — Shared template (do NOT make client-specific edits here)
- `translations.js` — Shared translations for 9 languages (do NOT make client-specific edits here)
- `client-config.js` — All Cordoba-specific configuration (funds, match, branding, risk profiles)
- `vercel.json` — Shared security headers (X-Frame-Options, CSP, etc.)
- `api/` — Shared Vercel serverless functions (Smartsheet, EmailJS, FMP proxies)

## Key Details
- **Recordkeeper:** Fidelity (NetBenefits)
- **Plan Default (QDIA):** Fidelity Puritan K6 (FPKFX) — 60/40 balanced fund
- **Employer Match:** 50 cents per dollar up to 7% of gross pay (auto-enrolled at 4% pretax)
- **Target Date Series:** American Funds Target Date R6
- **Model Portfolios:** 4 models (Aggressive, Moderate, Balance, Conservative)
- **FPKFX Recommendation:** Only shown for Moderately Conservative investor profile

## Client Config Fields
| Field | Value | Purpose |
|-------|-------|---------|
| `defaultPretax` | `4` | Pretax slider starts at 4% (auto-enrollment default) |
| `fundDataAsOf` | `'12/31/2025'` | Footer disclaimer date for fund performance data |
| `adminPasswordHash` | Set | Required for advisor admin panel access |
| `footerDisclaimer` | `null` | Built dynamically using `fundDataAsOf` |

## Security (April 2026)
- **API Rate Limiting:** All endpoints rate-limited per IP (smartsheet: 60/min, email: 10/min, fmp: 30/min, smartsheet-year: 10/min)
- **Smartsheet Proxy:** sheetId validated (numeric), endpoints restricted to allowlist, filenames sanitized
- **CDN Scripts:** SRI integrity hashes on jspdf, chart.js, emailjs
- **CSP Meta Tag:** Restricts script-src, connect-src, frame-ancestors
- **Security Headers:** X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy
- **Admin Auth:** No hardcoded fallback password; admin disabled if `adminPasswordHash` not set in config
- **localStorage:** PII cleared on admin logout and after successful Smartsheet submission
- **Error Responses:** No stack traces or internal details exposed to client

## UI Features
- **Match Maxed Banner:** Green card highlight and encouraging message when participant contribution reaches full match threshold (7%)
- **Match Warning:** Yellow banner when contribution is below full match, showing how much free money they're missing
- **Real Return Disclosure:** Results disclaimer states all projections use inflation-adjusted returns in today's purchasing power

## Rules
- When updating index.html or translations.js, also update the Master Template and other client projects (Longwood)
- Client-specific changes go ONLY in client-config.js
- Always push to deploy on Vercel after changes
- When updating fund performance data, also update `fundDataAsOf` in client-config.js
