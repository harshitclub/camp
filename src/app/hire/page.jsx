import {
  HireHero,
  HireDomains,
  HireProcess,
  HireForm
} from "@/components/hire";

export const metadata = {
  title: "Hire Pre-Trained Technical Talent & Freshers",
  description: "Hire job-ready freshers and interns across B.Tech, BCA, MCA, MBA, BBA, and Law from 50+ partner colleges in India. Handpicked shortlists within 48 hours, verified project portfolios, and zero agency placement fees.",
  keywords: "Hire freshers, campus recruitment India, hire BTech freshers, hire MBA graduates, pre-assessed candidates, hire developers, hire business analysts, corporate hiring portal Campussutras",
  alternates: {
    canonical: "/hire",
  },
  openGraph: {
    title: "Hire From Campussutras | Pre-Trained, Job-Ready Talent",
    description: "Access 50,000+ pre-assessed freshers and interns across 50+ colleges in India with verified proof-of-work. Zero placement fees.",
    url: "https://campussutras.com/hire",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire From Campussutras | Pre-Trained, Job-Ready Talent",
    description: "Access 50,000+ pre-assessed freshers and interns across 50+ colleges in India with verified proof-of-work. Zero placement fees.",
  },
};

export default function HirePage() {
  return (
    <>
      {/* 1. Recruiter B2B Hero Section */}
      <HireHero />

      {/* 2. Roles & Disciplines Available */}
      <HireDomains />

      {/* 3. 3-Step Friction-Free Hiring Process */}
      <HireProcess />

      {/* 4. Employer Requirement Submission Intake Form */}
      <HireForm />
    </>
  );
}
