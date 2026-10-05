# 🧪 CampusSutras Platform Testing Suite

Welcome to the automated test suite for **CampusSutras**. This directory contains all testing code organized phase-by-phase according to the master plan in [TESTING_PLAN.md](file:///e:/camp/TESTING_PLAN.md).

---

## 📁 Directory Structure

```text
tests/
├── README.md                      <-- This Guide
├── phase1-unit/                   <-- Phase 1: Unit & Core Logic Testing (100% Offline, 116 Tests)
│   ├── 01-assessment-engine.test.js
│   ├── 02-certificate-id-generator.test.js
│   ├── 03-csv-excel-parser.test.js
│   ├── 04-form-validators.test.js
│   ├── 05-cache-system.test.js
│   ├── 06-courses-catalog.test.js
│   ├── 07-company-navigation.test.js
│   └── run-phase1.js             <-- Phase 1 Master Runner
├── phase2-api/                    <-- Phase 2: Database & API Integration Tests (37 Tests)
│   ├── 01-verify-certificate-api.test.js
│   ├── 02-admin-certificates-api.test.js
│   ├── 03-admin-assessments-categories-api.test.js
│   ├── 04-lead-forms-api.test.js
│   ├── 05-admin-forms-api.test.js
│   ├── 06-chat-api.test.js
│   └── run-phase2.js             <-- Phase 2 Master Runner
├── phase3-forms/                  <-- Phase 3: Public Forms & SMTP Email Tests
├── phase4-quiz/                   <-- Phase 4: Dynamic Assessment Hub & Quiz Engine
├── phase5-auth/                   <-- Phase 5: Authentication, Profiles & Security
├── phase6-admin/                  <-- Phase 6: Admin Command Center & Studio
└── phase7-e2e/                    <-- Phase 7: End-to-End User Journeys & SEO
```

---

## 🚀 How to Run Tests

You can run individual test suites via standard npm commands:

### Run Phase 1 (Unit & Core Logic)
```bash
npm run test:unit
# or: node tests/phase1-unit/run-phase1.js
```
* **Scope (116 Assertions):** 
  - Validates all 30 assessment catalogs and all 450 question schemas in `src/data/assessmentsData.js`.
  - Tests scoring math, pass/fail thresholds, timer formatting, and topic analytics.
  - Tests Certificate ID generator, acronym extractor, and Indian degree matching.
  - Tests CSV/Excel quotes parser, column alias matching, UTF-8 BOM, and `isNA` checker.
  - Tests RFC email regex, phone formatting, password rules, and URL validation.
  - Validates all 12 Industry Bootcamp tracks, curriculum modules, prerequisites, career roles, and canonical paths in `src/data/courses.js`.
  - Validates company legal entities, internal canonical link registries, navigation dropdowns, and contact channels.

### Run Phase 2 (Database & API Integration)
```bash
npm run test:api
# or: node tests/phase2-api/run-phase2.js
```
* **Scope (37 Assertions):**
  - Public Certificate verification API (`/api/verify-certificate`) with case-insensitive search and edge cache headers.
  - Admin Certificate CRUD & bulk batch upserting (`/api/admin/certificates`).
  - Admin Assessment authoring & category creation on-the-fly (`/api/admin/assessments` & `/api/admin/categories`).
  - Public Lead Ingestion endpoints (`/api/forms/[type]`) across contact, internship, hire, and course enrollment.
  - Admin Form submissions desk (`/api/admin/forms`).
  - AI Academic Counselor Chatbot API (`/api/chat`), system prompt knowledge grounding, payload sanitization, and heuristic anti-misuse guardrails.
### Run Phase 3 (Public Forms & Lead Ingestion)
```bash
node tests/phase3-forms/run-phase3.js
```
* **Scope:**
  - Contact Us form (`/contact` & `/api/forms/contact`) with ticket ID (`CS-INQ-xxxxxx`).
  - Corporate Hiring form (`/hire` & `/api/forms/hire`) with inquiry ID (`CS-HIRE-xxxxxx`).
  - Internship application modal (`/internship` & `/api/forms/internship`) with application ID (`CS-INT-xxxxxx`).
  - Course enrollment modal (`/courses/[slug]` & `/api/forms/course-enroll`) with registration ID (`CS-REG-xxxxxx`).
  - Admin notification email formatting & security sanitization.
### Run Phase 4 (Dynamic Assessment Hub & Quiz Engine)
```bash
node tests/phase4-quiz/run-phase4.js
```
* **Scope:**
  - Assessment Hub category filtering across all 5 pillars & search query matching.
  - Sticky countdown timer lifecycle, warning/critical color states, and auto-submission on expiry.
  - Dynamic Question Palette Matrix ($1 \dots N$) state tracking (🟢 Answered, 🔵 Current, ⚪ Unanswered, 🟣 Flagged).
  - Scorecard solutions review filters (all, correct, incorrect) and answer explanations.
  - Local attempt snapshot serialization and Supabase submission payload formatting.

### Run Phase 5 (Authentication, Profiles & Security)
```bash
node tests/phase5-auth/run-phase5.js
```
* **Scope:**
  - Authentication and multi-role signup validation rules (Student vs Working Professional).
  - Profile completion progress meter calculation (0%, 57%, 100%).
  - Role-Based Access Control (RBAC) admin clearance and student verification badge logic.
  - Next.js 16 route proxy middleware simulation (`src/proxy.js`) protecting `/admin` and sub-paths.
  - Profile assessment transcripts chronological formatting and score badges.

### Run Phase 6 (Admin Command Center & Studio)
```bash
node tests/phase6-admin/run-phase6.js
```
* **Scope:**
  - Real-time admin dashboard metrics calculation (Users, Assessments, Certificates, Leads).
  - Assessment Studio authoring validation, slug generation, and $N$-question structure integrity.
  - Certificate Manager template generation (Blank CSV with BOM & JSON skeleton) and CSV escaping.
  - User Directory multi-criteria filtering (role, verification status, search query).
  - Form submissions desk status transitions (`new` -> `reviewed` -> `contacted`) and lead search.

### Run Phase 7 (E2E User Journeys, Edge Cases & Benchmarks)
```bash
node tests/phase7-e2e/run-phase7.js
```
* **Scope:**
  - End-to-End complete Student Journey (Registration -> Quiz -> Grading -> Transcripts).
  - End-to-End complete Admin Workflow (Clearance -> ID Gen -> Bulk CSV -> Verification -> Authoring).
  - Edge Cases & Data Integrity (Whitespace trimming, Unicode names, scientific notation `3.44E+12`, multiple commas).
  - SEO, Robots.txt & dynamic `sitemap.xml` URL indexing.
  - API Performance & database response latency benchmarks ($<300\text{ms}$).

---

## ⚡ Run All 7 Phases in One Command

To run the complete platform test suite across all 7 phases with a unified executive scorecard:

```bash
npm test
# or: node tests/run-all.js
```

---

*For detailed specifications and checklists, refer to [TESTING_PLAN.md](file:///e:/camp/TESTING_PLAN.md).*
