import Link from "next/link";
import styles from "./CertificateSection.module.css";
import { ShieldCheck, CheckCircle2, QrCode, Share2, ArrowRight, Award } from "lucide-react";

export default function CertificateSection() {
  const features = [
    {
      icon: <QrCode size={20} />,
      title: "Unique Credential ID & Instant QR Verification",
      description: "Recruiters and hiring managers can verify your certificate authenticity and completed project milestones in real-time."
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Proof of Practical Work & Capstones",
      description: "Your credential validates hands-on code contributions, real-world case studies, and engineering sprint evaluations."
    },
    {
      icon: <Share2 size={20} />,
      title: "One-Click LinkedIn & Resume Showcase",
      description: "Directly add verified licenses & certifications to your LinkedIn profile with permanent verification links."
    }
  ];

  return (
    <section className={styles.certSection}>
      <div className={`container ${styles.certGrid}`}>
        {/* Left Column: Information & Value */}
        <div className={styles.contentCol}>
          <div className="section-eyebrow">
            Verified Industry Credentials
          </div>

          <h2 className={styles.title}>
            Earn an Employer-Trusted & Cryptographically Verifiable Certificate
          </h2>

          <p className={styles.subtitle}>
            In today’s competitive tech market, generic completion certificates are ignored. Campussutras issues verifiable credentials backed by completed industry capstone projects and rigorous mentor evaluations.
          </p>

          <div className={styles.featuresList}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.featureItem}>
                <div className={styles.featureIconBox}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureDesc}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.btnGroup}>
            <Link href="/verify-certificate" className="btn btn-primary">
              <ShieldCheck size={16} />
              <span>Verify Any Certificate Now</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/courses" className="btn btn-secondary">
              <span>Explore Certified Bootcamps</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Certificate Preview */}
        <div className={styles.visualCol}>
          <div className={styles.certCardFrame}>
            <img
              src="/media/cert.jpg"
              alt="Campussutras Verified Certificate Preview"
              className={styles.certImg}
              loading="lazy"
              decoding="async"
            />

            <div className={styles.verifiedBadge}>
              <Award size={24} color="#38bdf8" />
              <div>
                <div className={styles.verifiedBadgeTitle}>100% Verifiable</div>
                <div className={styles.verifiedBadgeVal}>Permanent Credential URL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
