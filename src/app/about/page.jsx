import {
  AboutHero,
  AboutMission,
  AboutStreams,
  AboutPedagogy,
  AboutTimeline,
  AboutStats,
  AboutMentors,
  AboutGallery,
} from "@/components/about";
import { CtaBanner } from "@/components/home";

export const metadata = {
  title: "About Us — Campus to Corporate Career Accelerator",
  description: "Founded in 2023, Campussutras bridges the gap between college curricula and corporate expectations across B.Tech, BCA, MCA, MBA, BBA, PGDM, Law, and Commerce. Having trained 50,000+ students across 50+ partner colleges in India, we deliver practical 90-day bootcamps and verified internships.",
  keywords: "About Campussutras, Campus to Corporate, college workforce training, BTech, BCA, MCA, MBA, BBA, PGDM, Law, technical bootcamps, business analytics, practical training India",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Campussutras | Campus to Corporate Career Accelerator",
    description: "From Campus to Corporate: Empowering 50,000+ students across 50+ colleges in B.Tech, BCA, MCA, MBA, BBA, PGDM, Law, and Commerce with practical bootcamps and verified credentials.",
    url: "https://campussutras.com/about",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Campussutras | Campus to Corporate Career Accelerator",
    description: "From Campus to Corporate: Empowering 50,000+ students across 50+ colleges with practical bootcamps and verified credentials.",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://campussutras.com";

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Campussutras — Campus to Corporate Career Accelerator",
  description: "Empowering 50,000+ students across 50+ partner colleges in India with practical bootcamps, project-based internships, and verified credentials.",
  publisher: {
    "@type": "EducationalOrganization",
    name: "Campussutras Private Limited",
    url: BASE_URL,
    logo: `${BASE_URL}/media/logo-512.png`,
    address: {
      "@type": "PostalAddress",
      postalCode: "201309",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
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
      name: "About Us",
      item: `${BASE_URL}/about`,
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      {/* Schema.org Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* 1. Hero Section with Core Philosophy & Highlights */}
      <AboutHero />

      {/* 2. Mission, Vision & Core Values Grid */}
      <AboutMission />

      {/* 3. Multi-Disciplinary College Streams We Train (Tech, Business, Law, etc.) */}
      <AboutStreams />

      {/* 4. The Campussutras Pedagogy: Traditional vs 90-Day Model */}
      <AboutPedagogy />

      {/* 4. Journey & Milestones Timeline */}
      <AboutTimeline />

      {/* 5. National Impact Statistics Banner */}
      <AboutStats />

      {/* 6. Mentorship Ecosystem & Leadership Pillars */}
      <AboutMentors />

      {/* 7. Real Campus Auditoriums & Lab Moments */}
      <AboutGallery />

      {/* 8. Pre-footer Enrollment CTA */}
      <CtaBanner />
    </>
  );
}
