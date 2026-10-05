# 🏛️ Campussutras — Technology Stack & Architecture Specification

A complete reference of all technologies, libraries, services, SEO systems, and future tooling for the **Campussutras** platform (`https://campussutras.com`).

---

## 1. 🎨 Frontend Layer

| Category | Technology | Version / Spec | Purpose & Implementation |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | `v16.3.5` | React framework with Turbopack, Server Components, SSG, and ISR (`revalidate = 300`). |
| **UI Library** | **React** | `v19.2.8` | Core component model with React 19 Compiler support (`reactCompiler: true`). |
| **DOM Engine** | **React DOM** | `v19.2.8` | Client hydration and high-speed DOM reconciliation. |
| **Styling** | **Vanilla CSS & CSS Modules** | Modern CSS | Modular design system without CSS bloat or Tailwind dependencies. |
| **Typography** | **Google Fonts** (`next/font`) | Inter & Plus Jakarta Sans | Zero-layout-shift font optimization loaded natively via CSS variables (`--font-inter`, `--font-heading`). |
| **Icons** | **Lucide React** | `^1.40.0` | Lightweight SVG icons used across navigation, quiz controls, and admin dashboards. |
| **Image Optimization** | **Cloudinary + Next Image** | `remotePatterns` | High-resolution image CDN (`res.cloudinary.com`) with automated WebP and AVIF modern compression. |
| **QR Code Engine** | **qrcode** | `^1.5.4` | In-browser dynamic QR code generation for digital certificate verification links. |
| **State & Storage** | **React State + Web Storage** | LocalStorage / SessionStorage | Zero-latency offline backup for quiz progress, user attempts, and campus drive session tracking. |

---

## 2. ⚙️ Backend, Database & Serverless Layer

| Category | Technology | Specification | Purpose & Implementation |
| :--- | :--- | :--- | :--- |
| **Database** | **Supabase PostgreSQL** | `PostgreSQL 15` | Relational database hosting `profiles`, `certificates`, `assessments`, `questions`, `assessment_attempts`, and form leads. |
| **Database API** | **PostgREST** | `v12` | High-concurrency HTTP/HTTPS REST layer with built-in connection pooling, eliminating direct TCP socket exhaustion. |
| **Database SDKs** | **@supabase/ssr & @supabase/supabase-js** | `^0.12.5` / `^2.115.0` | Unified server and browser database clients with cookie synchronization. |
| **Edge Middleware** | **Next.js Proxy** (`src/proxy.js`) | Next 16 Edge Proxy | Intercepts requests, protects `/admin` routes, and skips Supabase Auth calls for anonymous public visitors to conserve egress. |
| **Caching Tier** | **MemoryCache (LRU TTL)** | `src/lib/cache.js` | Fast in-memory cache (60s TTL) with tag-based invalidation for assessments, categories, and certificates. |
| **CSV Parser** | **Custom CSV/Excel Engine** | `src/lib/csvParser.js` | Handles UTF-8 BOM, comma-separated quotes, alias column mapping, and bulk certificate upload batches. |
| **Identification** | **Certificate Engine** | `src/lib/certificateUtils.js` | Auto-generates structured sequential credentials (e.g. `CS-FSD-TI-BCA-26-001`) with acronym extraction. |
| **AI Counselor** | **Google Gemini Flash** | `gemini-3.5-flash` / `@google/generative-ai` | Real-time streaming AI chatbot (`/api/chat`) with platform knowledge base, course recommendations, and guardrails. |

---

## 3. 🔐 Authentication & Access Control

| Feature | Implementation | Details |
| :--- | :--- | :--- |
| **Auth Provider** | **Supabase GoTrue (JWT)** | Secure HTTP-only session cookies and access token refresh. |
| **Role-Based Access (RBAC)**| **Custom Claims & Profile Roles** | Differentiates `Student` and `Admin` users with protected admin layouts via `AdminGuard`. |
| **Offline Fallback** | **Local Auth Cookie + State** | Seamless access fallback (`campussutras_auth_user`) allowing unconfirmed students to continue tests uninterrupted. |

---

## 4. 📬 Email & Communications

| Component | Service / Package | Details |
| :--- | :--- | :--- |
| **SMTP Mailer** | **Nodemailer** (`^10.0.9`) | Connects via SSL/TLS (Port 465) to custom domain mail servers (`mail.campussutras.com`). |
| **Notification Engine** | `src/lib/mailer.js` | Dispatches branded HTML email notifications for Contact Inquiries, Hiring Requests, and Internship Applications. |
| **Template Design** | **HTML Email Builder** | Pre-styled responsive email templates with Campussutras corporate color tokens. |

---

## 5. 🔍 SEO, Social Sharing & Search Engine Indexing

| Area | Feature | Implementation File |
| :--- | :--- | :--- |
| **Dynamic Sitemap** | Full indexing of static pages, 19+ courses, and 30+ assessments | [`src/app/sitemap.js`](file:///e:/camp/src/app/sitemap.js) |
| **Robots Rules** | Crawler allow rules with strict disallow on `/admin`, `/api/`, `/profile` | [`src/app/robots.js`](file:///e:/camp/src/app/robots.js) |
| **Metadata API** | Canonical URLs, dynamic titles, meta descriptions, and keywords | [`src/app/layout.jsx`](file:///e:/camp/src/app/layout.jsx) & dynamic routes |
| **Social Cards** | OpenGraph & Twitter Large Image summary cards (`opengraph-image.png`) | Pre-rendered for LinkedIn, WhatsApp, and Twitter sharing |
| **Structured Data** | **Schema.org JSON-LD:**<br>• `Organization` & `WebSite`<br>• `Course` & `EducationalOrganization`<br>• `FAQPage` & `BreadcrumbList`<br>• `Credential` & Verification | Integrated into Homepage, Course details, Assessments, and Verify Certificate pages |

---

## 6. 📊 Production Infrastructure, Security & Analytics (Current Active)

| Tool | Role | Benefit to Campussutras |
| :--- | :--- | :--- |
| **Vercel** | Production Hosting | Global edge deployment, automated SSL, zero-downtime git deployments. |
| **Cloudflare** | CDN, DNS & DDoS Defense | 100% free edge caching, fast DNS, Bot Fight Mode, and Turnstile (invisible bot protection). |
| **UptimeRobot** | Uptime & Keep-Alive | 24/7 uptime monitoring + automated ping preventing Supabase 7-day database auto-pause. |
| **Microsoft Clarity** | Behavior Analytics | 100% free unlimited heatmaps and student session recordings (zero performance impact). |
| **Google Search Console** | Search Indexation | Submits sitemaps, monitors search impressions and keyword ranking on Google. |
| **Bing Webmaster Tools** | Search Indexation | Submits sitemaps to Bing, Yahoo, and DuckDuckGo via IndexNow. |
| **Vercel Analytics** | Core Web Vitals | Tracks real-world LCP, CLS, and FID page load metrics directly in the host dashboard. |

---

## 7. 🚀 Future Tools & Scaling Roadmap

As Campussutras scales to thousands of daily students, these tools are planned for seamless integration:

* **Transactional Email API (Resend / Brevo):** Upgrade from basic SMTP to modern API-based transactional mail for 99.9% inbox delivery.
* **Payment Gateway (Razorpay / Cashfree):** When paid certification tracks or premium bootcamp cohorts are introduced.
* **File Upload Service (UploadThing / AWS S3):** For student PDF resume uploads on internship forms without database bloat.
* **Error Tracking (Sentry):** Dedicated application performance and crash telemetry once daily active users exceed 5,000+.
* **WhatsApp Business Cloud API:** Automated instant test scorecards and certificate links delivered directly to students' WhatsApp.

---

<sub>Maintained by Campussutras Engineering • Version 2.4.0</sub>