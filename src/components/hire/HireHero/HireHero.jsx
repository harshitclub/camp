import Link from "next/link";
import styles from "./HireHero.module.css";
import { 
  Building2, 
  Users, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Award
} from "lucide-react";

export default function HireHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.ambientGlow} />
      <div className={styles.gridPattern} />

      <div className={`container ${styles.container}`}>
        {/* Top Eyebrow */}
        <div className={styles.eyebrow}>
          <Sparkles size={14} className={styles.eyebrowIcon} />
          <span>Employer Recruitment Hub • Zero Sourcing Fees</span>
        </div>

        {/* Hero Title */}
        <h1 className={styles.title}>
          Hire Job-Ready Freshers &amp; Interns with <br className={styles.hideMobile} />
          <span className={styles.gradientText}>Verified Practical Proof-of-Work</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Stop sifting through hundreds of unverified resumes. Campussutras bridges 50+ partner colleges across India to deliver handpicked, pre-assessed candidates across <strong>Tech, Business Analytics, Management, and Corporate Law</strong> — ready to contribute from Day 1.
        </p>

        {/* Action CTAs */}
        <div className={styles.ctaRow}>
          <a href="#hiring-form" className="btn btn-primary btn-lg">
            <span>Submit Hiring Requirements</span>
            <ArrowRight size={18} />
          </a>
          <a href="#talent-streams" className={`btn btn-secondary btn-lg ${styles.secBtn}`}>
            <Building2 size={18} />
            <span>Explore Talent Streams</span>
          </a>
        </div>

        {/* 4 B2B Value Pillars */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricIconBox}>
              <Users size={22} />
            </div>
            <div>
              <div className={styles.metricValue}>50,000+</div>
              <div className={styles.metricLabel}>Trained Talent Pool</div>
              <div className={styles.metricSub}>Across B.Tech, BCA, MBA &amp; Law</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIconBox}>
              <Building2 size={22} />
            </div>
            <div>
              <div className={styles.metricValue}>50+</div>
              <div className={styles.metricLabel}>Partner Campuses</div>
              <div className={styles.metricSub}>Universities across India</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIconBox}>
              <Clock size={22} />
            </div>
            <div>
              <div className={styles.metricValue}>48 Hours</div>
              <div className={styles.metricLabel}>Shortlist Turnaround</div>
              <div className={styles.metricSub}>Fast-track verified profiles</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIconBox}>
              <Award size={22} />
            </div>
            <div>
              <div className={styles.metricValue}>₹0 Fees</div>
              <div className={styles.metricLabel}>Direct Campus Sourcing</div>
              <div className={styles.metricSub}>Zero agency commissions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
