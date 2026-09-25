# 🧪 CampusSutras Platform Testing Suite

Welcome to the automated test suite for **CampusSutras**. This directory contains all testing code organized phase-by-phase according to the master plan in [TESTING_PLAN.md](file:///e:/camp/TESTING_PLAN.md).

---

## 📁 Directory Structure

```text
tests/
├── README.md                      <-- This Guide
├── phase1-unit/                   <-- Phase 1: Unit & Core Logic Testing (100% Offline)
│   ├── 01-assessment-engine.test.js
│   ├── 02-certificate-id-generator.test.js
│   ├── 03-csv-excel-parser.test.js
│   ├── 04-form-validators.test.js
│   └── run-phase1.js             <-- Phase 1 Master Runner
├── phase2-api/                    <-- Phase 2: Database & API Integration Tests
├── phase3-forms/                  <-- Phase 3: Public Forms & SMTP Email Tests
├── phase4-quiz/                   <-- Phase 4: Dynamic Assessment Hub & Quiz Engine
├── phase5-auth/                   <-- Phase 5: Authentication, Profiles & Security
├── phase6-admin/                  <-- Phase 6: Admin Command Center & Studio
└── phase7-e2e/                    <-- Phase 7: End-to-End User Journeys & SEO
```

---

## 🚀 How to Run Tests

### Run Phase 1 (Unit & Core Logic)
```bash
node tests/phase1-unit/run-phase1.js
```
* **Scope:** 
  - Validates all 30 assessment catalogs and all 450 question schemas in `src/data/assessmentsData.js`.
  - Tests scoring math, pass/fail thresholds, timer formatting, and topic analytics.
  - Tests Certificate ID generator, acronym extractor, and Indian degree matching.
  - Tests CSV/Excel quotes parser, column alias matching, UTF-8 BOM, and `isNA` checker.
  - Tests RFC email regex, phone formatting, password rules, and URL validation.
### Run Phase 2 (Database & API Integration)
```bash
node tests/phase2-api/run-phase2.js
```
* **Scope:**
  - Public Certificate verification API (`/api/verify-certificate`) with case-insensitive search and edge cache headers.
  - Admin Certificate CRUD & bulk batch upserting (`/api/admin/certificates`).
  - Admin Assessment authoring & category creation on-the-fly (`/api/admin/assessments` & `/api/admin/categories`).
  - Public Lead Ingestion endpoints (`/api/forms/[type]`) across contact, internship, hire, and course enrollment.
  - Admin Form submissions desk (`/api/admin/forms`).
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
node tests/run-all.js
```

---

*For detailed specifications and checklists, refer to [TESTING_PLAN.md](file:///e:/camp/TESTING_PLAN.md).*
