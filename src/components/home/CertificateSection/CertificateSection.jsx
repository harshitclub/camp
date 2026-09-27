import Link from "next/link";
import styles from "./CertificateSection.module.css";
import { ShieldCheck, CheckCircle2, QrCode, Share2, ArrowRight, Award } from "lucide-react";

export default function CertificateSection() {
  const features = [
    {
      icon: <QrCode size={20} />,
      title: "Unique ID & Instant QR Code Check",
      description: "Recruiters can scan the QR code or enter your ID to instantly check your certificate details online."
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Proof of Real Project Work",
      description: "Your certificate shows the live projects you built, validating your practical hands-on skills."
    },
    {
      icon: <Share2 size={20} />,
      title: "Easy to Share on LinkedIn & Resume",
      description: "Add your certificate directly to LinkedIn or your resume with a permanent verification link."
    }
  ];

  return (
    <section className={styles.certSection}>
      <div className={`container ${styles.certGrid}`}>
        {/* Left Column: Information & Value */}
        <div className={styles.contentCol}>
          <div className="section-eyebrow">
            Verified Certificates
          </div>

          <h2 className={styles.title}>
            Earn a Verified Certificate That Recruiters Trust
          </h2>

          <p className={styles.subtitle}>
            Simple PDF certificates are often ignored by companies. Campussutras gives you an online verifiable certificate backed by real project work and mentor evaluations.
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
              <span>Verify a Certificate</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/courses" className="btn btn-secondary">
              <span>Explore Certified Programs</span>
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
