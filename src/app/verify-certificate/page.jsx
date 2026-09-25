import CertificateVerifier from "@/components/certificate/CertificateVerifier";
import { ShieldCheck, CheckCircle2, Award, Lock } from "lucide-react";
import Link from "next/link";
import styles from "./VerifyCertificate.module.css";

export const metadata = {
  title: "Verify Certificate & Student Credentials",
  description: "Official credential verification portal of Campussutras Private Limited. Enter candidate Certificate ID to validate workshop, internship, and bootcamp credentials instantly.",
  keywords: "verify certificate, campussutras certificate verification, credential lookup, student certificate check, edtech verification",
  alternates: {
    canonical: "/verify-certificate",
  },
  openGraph: {
    title: "Verify Student Certificate | Campussutras Credential Registry",
    description: "Validate the authenticity of Campussutras certificates and credentials with real-time verification.",
    url: "https://campussutras.com/verify-certificate",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Student Certificate | Campussutras Credential Registry",
    description: "Validate the authenticity of Campussutras certificates and credentials with real-time verification.",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://campussutras.com";

const verifySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Verify Certificate & Student Credentials | Campussutras",
  description: "Official credential verification portal of Campussutras Private Limited. Enter candidate Certificate ID to validate workshop, internship, and bootcamp credentials instantly.",
  url: `${BASE_URL}/verify-certificate`,
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
      name: "Verify Certificate",
      item: `${BASE_URL}/verify-certificate`,
    },
  ],
};

export default function VerifyCertificatePage() {
  return (
    <div className={styles.pageWrap}>
      {/* Schema.org Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(verifySchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* 1. Header Banner */}
      <section className={styles.heroBanner}>
        <div className="container">
          <div className={styles.heroContent}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>Verify Certificate</span>
            </nav>

            <div className={styles.eyebrow}>
              <Lock size={13} />
              <span>Tamper-Proof Central Credential Registry</span>
            </div>

            <h1 className={styles.heroTitle}>
              Official Certificate <span className={styles.highlight}>Verification</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Validate student completion credentials, technical workshop certificates, and bootcamp graduation records issued by Campussutras Private Limited.
            </p>

            <div className={styles.trustBar}>
              <div className={styles.trustPill}>
                <ShieldCheck size={16} className={styles.trustIcon} />
                <span>Instant Real-Time Lookup</span>
              </div>
              <div className={styles.trustPill}>
                <CheckCircle2 size={16} className={styles.trustIcon} />
                <span>100% Tamper-Proof</span>
              </div>
              <div className={styles.trustPill}>
                <Award size={16} className={styles.trustIcon} />
                <span>Employer &amp; University Recognized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Verifier Workspace */}
      <main className={`container ${styles.mainWorkspace}`}>
        <CertificateVerifier />
      </main>
    </div>
  );
}
