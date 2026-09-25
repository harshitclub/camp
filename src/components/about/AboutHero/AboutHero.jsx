import Link from "next/link";
import styles from "./AboutHero.module.css";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Award, 
  Users, 
  BookOpen, 
  Building2, 
  Briefcase 
} from "lucide-react";

export default function AboutHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.ambientGlow}></div>
      <div className={styles.gridPattern}></div>

      <div className={`container ${styles.heroContainer}`}>
        {/* Top Eyebrow Tag */}
        <div className={styles.eyebrow}>
          <Sparkles size={14} className={styles.eyebrowIcon} />
          <span>Founded in 2023 • Campus to Corporate</span>
        </div>

        {/* Hero Title */}
        <h1 className={styles.title}>
          From Campus to Corporate: Practical Training For <br className={styles.hideMobile} />
          <span className={styles.gradientText}>Modern Professional Careers</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Founded in 2023, Campussutras bridges what colleges teach with what modern companies actually look for. Whether you are pursuing <strong>B.Tech, BCA, MCA, MBA, BBA, PGDM, or Law</strong>, our hands-on 90-day bootcamps, project sprints, and corporate grooming have empowered over <strong>50,000+ students across 50+ partner colleges in India</strong> to launch rewarding corporate careers.
        </p>

        {/* CTA Buttons */}
        <div className={styles.ctaRow}>
          <Link href="/courses" className="btn btn-primary btn-lg">
            <span>Explore Career Tracks</span>
            <ArrowRight size={18} />
          </Link>
          <Link href="/internship" className={`btn btn-secondary btn-lg ${styles.secBtn}`}>
            <Briefcase size={18} />
            <span>Internship Programs</span>
          </Link>
        </div>

        {/* Quick Highlights Bar */}
        <div className={styles.highlightsGrid}>
          <div className={styles.highlightCard}>
            <div className={styles.iconBox}>
              <Users size={20} />
            </div>
            <div>
              <div className={styles.highlightNumber}>50,000+</div>
              <div className={styles.highlightLabel}>Students Trained</div>
            </div>
          </div>

          <div className={styles.highlightCard}>
            <div className={styles.iconBox}>
              <Building2 size={20} />
            </div>
            <div>
              <div className={styles.highlightNumber}>50+</div>
              <div className={styles.highlightLabel}>Partner Colleges</div>
            </div>
          </div>

          <div className={styles.highlightCard}>
            <div className={styles.iconBox}>
              <Award size={20} />
            </div>
            <div>
              <div className={styles.highlightNumber}>12</div>
              <div className={styles.highlightLabel}>Career Tracks</div>
            </div>
          </div>

          <div className={styles.highlightCard}>
            <div className={styles.iconBox}>
              <CheckCircle size={20} />
            </div>
            <div>
              <div className={styles.highlightNumber}>100%</div>
              <div className={styles.highlightLabel}>Project Portfolios</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
