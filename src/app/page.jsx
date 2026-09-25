import {
  Hero,
  Stats,
  AboutSection,
  FeaturedCourses,
  FeaturedAssessments,
  WhyChooseUs,
  ProcessSection,
  CertificateSection,
  HireSection,
  Testimonials,
  FaqSection,
  CtaBanner,
} from "@/components/home";
import { faqsData } from "@/data/faqs";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Campussutras Private Limited",
  "alternateName": "Campussutras",
  "url": "https://campussutras.com",
  "logo": "https://campussutras.com/media/logo-512.png",
  "description": "Campussutras is India's premier workforce-training and EdTech platform bridging academia and practical industry expectations through intensive technical bootcamps, project-based internships, and verified credentials.",
  "email": "info@campussutras.com",
  "sameAs": [
    "https://www.linkedin.com/company/campussutras",
    "https://www.instagram.com/campussutras"
  ],
  "address": {
    "@type": "PostalAddress",
    "postalCode": "201309",
    "addressLocality": "Noida",
    "addressRegion": "Uttar Pradesh",
    "addressCountry": "IN"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Campussutras",
  "url": "https://campussutras.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://campussutras.com/courses?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": (faqsData || []).map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function HomePage() {
  return (
    <>
      {/* Schema.org Structured Data (JSON-LD) for Search Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* 1. Hero: Headline, Value Prop & Primary CTAs */}
      <Hero />

      {/* 2. Impact Stats: 50,000+ Students, 50+ Partner Colleges */}
      <Stats />

      {/* 3. Core Offering: Featured 90-Day Bootcamps */}
      <FeaturedCourses />

      {/* 4. Interactive Engagement Hook: Free Diagnostic Assessments */}
      <FeaturedAssessments />

      {/* 5. Differentiator: Why CampusSutras vs Traditional College Theory */}
      <WhyChooseUs />

      {/* 6. Learning Roadmap: 4-Step 90-Day Learning Process */}
      <ProcessSection />

      {/* 7. Credential Proof: Tamper-Proof Certificate Verification Registry */}
      <CertificateSection />

      {/* 8. Social Proof: Student Reviews & Alumni Placement Stories */}
      <Testimonials />

      {/* 9. Outcome Proof & B2B: Corporate Talent & Hiring Showcase */}
      <HireSection />

      {/* 10. Institutional Anchor: About Campussutras & College Vision */}
      <AboutSection />

      {/* 11. Objection Handling: Frequently Asked Questions */}
      <FaqSection />

      {/* 12. Pre-footer Enrollment Call to Action */}
      <CtaBanner />
    </>
  );
}
