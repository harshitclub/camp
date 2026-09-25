import { CoursesHero, CoursesCatalog } from "@/components/courses";
import { CtaBanner } from "@/components/home";

export const metadata = {
  title: "Industry Career Bootcamps & Practical Tech Training",
  description: "Browse Campussutras' comprehensive technical bootcamps in Full Stack Engineering, Enterprise Java, Generative AI, Cloud DevOps, Cybersecurity, Data Analytics, and UI/UX Design with live mentor labs, capstone projects, and verified credentials.",
  keywords: "technical courses, industry bootcamps, full stack development, python programming, java enterprise, dsa, generative ai, cloud devops, cyber security, data analytics, power bi, ui ux design, growth marketing, campussutras courses",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "All Industry Bootcamps | Campussutras",
    description: "Explore industry-aligned bootcamps with hands-on projects, 1:1 mentorship, and verified credentials.",
    url: "https://campussutras.com/courses",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Industry Bootcamps | Campussutras",
    description: "Explore industry-aligned bootcamps with hands-on projects, 1:1 mentorship, and verified credentials.",
  },
};

import { Suspense } from "react";

export default function CoursesPage() {
  return (
    <>
      {/* 1. Courses Page Header & Value Propositions */}
      <CoursesHero />

      {/* 2. Search, Filter & 12 Bootcamps Paginated Catalog */}
      <Suspense fallback={<div style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading bootcamps...</div>}>
        <CoursesCatalog />
      </Suspense>

      {/* 3. Enrollment & Counseling CTA */}
      <CtaBanner />
    </>
  );
}
