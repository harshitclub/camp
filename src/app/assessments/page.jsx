import AssessmentHub from "@/components/assessments/AssessmentHub/AssessmentHub";

export const metadata = {
  title: "Skill Assessment Hub — Free Online Practice Tests",
  description: "Take free, timed practice tests across Technical, Business, English, Soft Skills, and Marketing with instant scores, accuracy analysis, and complete solutions.",
  keywords: "free skill tests, online assessment, aptitude test, soft skills test, english assessment, technical skill test, campussutras practice tests",
  alternates: {
    canonical: "/assessments",
  },
  openGraph: {
    title: "Skill Assessment Hub — Free Online Practice Tests | Campussutras",
    description: "Take free, timed practice tests with instant scorecards and complete question-by-question solutions.",
    url: "https://campussutras.com/assessments",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skill Assessment Hub — Free Online Practice Tests | Campussutras",
    description: "Take free, timed practice tests with instant scorecards and complete question-by-question solutions.",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://campussutras.com";

const assessmentHubSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Skill Assessment Hub — Free Online Practice Tests | Campussutras",
  description: "Take free, timed practice tests across Technical, Business, English, Soft Skills, and Marketing with instant scorecards and solutions.",
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
