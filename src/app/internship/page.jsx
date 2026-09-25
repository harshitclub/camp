import {
  InternshipHero,
  InternshipWhyChoose,
  InternshipPerks,
  InternshipFaq,
} from "@/components/internship";
import { CtaBanner } from "@/components/home";

export const metadata = {
  title: "Project-Based Internship Programs for College Students",
  description: "Join Campussutras' 2–3 month Summer Internship & Training programs in Full Stack Development, Generative AI, Data Analytics (Excel/Power BI), DSA, Digital Marketing, and Graphic Designing. Gain hands-on project experience, 1:1 mentorship, and verified credentials.",
  keywords: "Summer internship, college internship, full stack web development internship, generative ai internship, power bi data analytics internship, DSA in Java internship, digital marketing internship, graphic designing internship, campussutras internship",
  alternates: {
    canonical: "/internship",
  },
  openGraph: {
    title: "Summer Internship & Training Programs 2026 | Campussutras",
    description: "Hands-on 2–3 month mentor-led technical internships with live production capstones and verified credentials.",
    url: "https://campussutras.com/internship",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Summer Internship & Training Programs 2026 | Campussutras",
    description: "Hands-on 2–3 month mentor-led technical internships with live production capstones and verified credentials.",
  },
};

export default function InternshipPage() {
  return (
    <>
      {/* 1. Header with Side-by-Side Quick Application Form & Program Highlights */}
      <InternshipHero />

      {/* 2. Why Choose Campussutras */}
      <InternshipWhyChoose />

      {/* 3. Key Deliverables & Outcomes */}
      <InternshipPerks />

      {/* 4. Frequently Asked Questions */}
      <InternshipFaq />

      {/* 5. Bottom Quick CTA */}
      <CtaBanner />
    </>
  );
}
