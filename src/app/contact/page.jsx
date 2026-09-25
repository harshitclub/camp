import {
  ContactHero,
  ContactMain,
  ContactFaq,
} from "@/components/contact";
import { CtaBanner } from "@/components/home";

export const metadata = {
  title: "Contact Us & Admissions Support",
  description: "Get in touch with Campussutras for Industry Bootcamp admissions, Summer Internship counseling, college training partnerships, and certificate verification. Direct support via info@campussutras.com.",
  keywords: "Campussutras contact, edtech support, bootcamp counseling, college partnerships, certificate verification support, campussutras email, campussutras noida address",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us & Admissions Support | Campussutras",
    description: "Get in touch with Campussutras academic counseling, college partnerships, and corporate hiring support.",
    url: "https://campussutras.com/contact",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us & Admissions Support | Campussutras",
    description: "Get in touch with Campussutras academic counseling, college partnerships, and corporate hiring support.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* 1. Header Banner & Quick Value Badges */}
      <ContactHero />

      {/* 2. Direct Support Channels & Interactive Contact Form */}
      <ContactMain />

      {/* 3. Frequently Asked Questions */}
      <ContactFaq />

      {/* 4. Bottom Enrollment Banner */}
      <CtaBanner />
    </>
  );
}
