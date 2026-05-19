# E-Certificate Specification

## Overview

Upon successful completion of the AI Agent Development course, learners receive a verifiable digital certificate recognizing their achievement.

---

## Certificate Issuance Criteria

### Requirements for Certificate
1. **All module quizzes passed** (minimum passing score per module)
2. **Final assessment passed** (minimum 70% score)
3. **Capstone project submitted and approved** (minimum 70% on rubric)
4. **Minimum engagement:** Accessed all lesson content (tracked by platform)

### Certificate Levels

| Level | Requirements | Badge |
|-------|-------------|-------|
| **Completion** | All quizzes + final exam passed | Bronze |
| **Distinction** | Above + capstone score ≥ 85% + final exam ≥ 85% | Silver |
| **Excellence** | Above + capstone score ≥ 95% + final exam ≥ 95% | Gold |

---

## Certificate Content

### Information Displayed
- **Learner's Full Name** (as registered)
- **Course Title:** "AI Agent Development: From Zero to Production"
- **Certificate Level:** Completion / Distinction / Excellence
- **Date of Completion:** DD Month YYYY (localized format)
- **Unique Certificate ID:** UUID format (e.g., `CERT-2026-AI-AGT-a1b2c3d4`)
- **Issuing Organization:** [Platform Name]
- **Digital Signature:** Platform authority signature
- **QR Code:** Links to verification URL
- **Skills Validated:**
  - AI Agent Architecture & Design
  - LLM Integration & Prompt Engineering
  - Agent Implementation (Python, LangChain, LlamaIndex)
  - Multi-Agent Systems
  - Testing, Deployment & Production Best Practices

### Verification
- Public verification URL: `https://[platform].com/verify/{certificate-id}`
- Displays: Learner name, course, date, level, and validity status
- Blockchain-anchored hash (optional, for tamper-proof verification)

---

## Certificate Design

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              [Platform Logo]                                 │
│                                                             │
│           CERTIFICATE OF [LEVEL]                            │
│                                                             │
│  This certifies that                                        │
│                                                             │
│           [LEARNER'S FULL NAME]                             │
│                                                             │
│  has successfully completed the course                      │
│                                                             │
│     AI Agent Development: From Zero to Production           │
│                                                             │
│  demonstrating proficiency in designing, building,          │
│  and deploying AI agents.                                   │
│                                                             │
│  Date: [DD Month YYYY]          ID: [CERT-XXXX-XXXX]       │
│                                                             │
│  [Digital Signature]            [QR Code]                   │
│                                                             │
│  Skills: AI Architecture • LLM Integration • Python         │
│          Multi-Agent Systems • Production Deployment        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Design Specifications
- **Dimensions:** A4 landscape (297mm × 210mm) for print; responsive for digital
- **Color Scheme:** Professional gradient (navy/gold for Excellence, navy/silver for Distinction, navy/bronze for Completion)
- **Typography:** Serif for headings (e.g., Playfair Display), Sans-serif for body (e.g., Inter)
- **File Format:** PDF (high-res, print-ready) + PNG (social sharing)
- **Resolution:** 300 DPI for PDF, 150 DPI for PNG

---

## Technical Implementation

### Generation Pipeline
1. Learner meets all completion criteria → system triggers certificate generation
2. Template engine populates certificate with learner data
3. PDF generated using Puppeteer/WeasyPrint
4. Unique ID assigned and stored in database
5. QR code generated linking to verification page
6. Certificate emailed to learner + available in dashboard
7. (Optional) Hash anchored to blockchain for verification

### Storage
- Generated PDFs stored in cloud storage (S3/GCS)
- Metadata in PostgreSQL (learner_id, cert_id, level, date, hash)
- CDN-served verification pages

### API Endpoints
```
POST /api/certificates/generate    — Trigger certificate generation
GET  /api/certificates/{id}        — Retrieve certificate metadata
GET  /api/certificates/{id}/pdf    — Download certificate PDF
GET  /api/verify/{id}              — Public verification page
```

---

## Localization

### Certificate Language
- Certificate text rendered in learner's preferred language
- Learner name displayed as registered (supports Unicode/non-Latin scripts)
- Date format localized (e.g., "17 May 2026" in English, "2026年5月17日" in Japanese)
- Dual-language option: Local language + English (for international recognition)

### Supported Scripts
- Latin (English, Spanish, French, German, etc.)
- Cyrillic (Russian, Ukrainian)
- Arabic script (Arabic, Persian, Urdu) — RTL layout
- Devanagari (Hindi)
- Bengali script
- Tamil script
- CJK (Chinese, Japanese, Korean)
- Thai script
- Hebrew — RTL layout

---

## Sharing & Integration

### Social Sharing
- One-click share to LinkedIn, Twitter/X, Facebook
- LinkedIn credential integration (add to profile)
- Open Graph metadata for rich link previews
- Shareable verification link

### Professional Integration
- LinkedIn "Add to Profile" button with pre-filled data
- Credly/Badgr digital badge integration (optional)
- JSON-LD structured data for search engine recognition
- PDF download for traditional resume attachment

---

## Revocation & Validity

- Certificates are valid indefinitely (no expiration)
- Revocation possible in cases of fraud or policy violation
- Revocation reflected on verification page
- Annual "refresher" badge available (optional, for staying current)

---

## Sample Verification Page

```
┌─────────────────────────────────────────────────┐
│  ✓ VERIFIED CERTIFICATE                         │
│                                                 │
│  Name: Jane Smith                               │
│  Course: AI Agent Development                   │
│  Level: Distinction                             │
│  Date: 17 May 2026                              │
│  ID: CERT-2026-AI-AGT-a1b2c3d4                  │
│  Status: ✓ Valid                                │
│                                                 │
│  [Download PDF]  [View on LinkedIn]             │
└─────────────────────────────────────────────────┘
```
