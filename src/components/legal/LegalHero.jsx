import styles from "./LegalHero.module.css";
import { ShieldCheck, FileText, Calendar } from "lucide-react";

export default function LegalHero({ title, subtitle, lastUpdated, type = "privacy" }) {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.badgeRow}>
            {type === "privacy" ? (
              <ShieldCheck size={16} className={styles.badgeIcon} />
            ) : (
              <FileText size={16} className={styles.badgeIcon} />
            )}
            <span className={styles.badgeText}>Campussutras Official Legal Policies</span>
          </div>

          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          <div className={styles.metaBar}>
            <div className={styles.metaItem}>
              <Calendar size={15} />
              <span>Effective Date: September 2025</span>
            </div>
            <div className={styles.metaDot}>•</div>
            <div className={styles.metaItem}>
              <span>Last Updated: {lastUpdated || "September 2025"}</span>
            </div>
            <div className={styles.metaDot}>•</div>
            <div className={styles.metaItem}>
              <span>Campussutras Private Limited</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
