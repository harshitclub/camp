import AssessmentHub from "@/components/assessments/AssessmentHub/AssessmentHub";

export const metadata = {
  title: "Technical Assessment Hub — Free Skill Diagnostics",
  description: "Take free, timed, high-impact technical evaluations across Full Stack Web Development, Generative AI, Python, DSA, and PostgreSQL Architecture with instant scorecards and verified badges.",
  keywords: "free coding assessment, technical skill test, react mcq test, gen ai diagnostic test, campussutras assessments, python test online",
  alternates: {
    canonical: "/assessments",
  },
  openGraph: {
    title: "Technical Assessment Hub — Free Skill Diagnostics | Campussutras",
    description: "Take free, timed technical evaluations with instant scorecards and verified credentials.",
    url: "https://campussutras.com/assessments",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Assessment Hub — Free Skill Diagnostics | Campussutras",
    description: "Take free, timed technical evaluations with instant scorecards and verified credentials.",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://campussutras.com";

const assessmentHubSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Technical Assessment Hub — Free Skill Diagnostics | Campussutras",
  description: "Take free, timed, high-impact technical evaluations across Full Stack Web Development, Generative AI, Python, DSA, and PostgreSQL Architecture with instant scorecards and verified badges.",
  url: `${BASE_URL}/assessments`,
  provider: {
    "@type": "EducationalOrganization",
    name: "Campussutras Private Limited",
    url: BASE_URL,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Assessments Hub",
      item: `${BASE_URL}/assessments`,
    },
  ],
};

export default function AssessmentsPage() {
  return (
    <>
      {/* Schema.org Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(assessmentHubSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <AssessmentHub />
    </>
  );
}
