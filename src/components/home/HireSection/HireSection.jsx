import Link from "next/link";
import styles from "./HireSection.module.css";
import { 
  Building2, 
  ArrowRight, 
  Users, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Briefcase
} from "lucide-react";

export default function HireSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.bannerWrapper}>
          {/* Background ambient accents */}
          <div className={styles.ambientGlow} />

          <div className={styles.contentGrid}>
            {/* Left Column: Heading & Value Proposition */}
            <div className={styles.leftCol}>
              <div className={styles.eyebrow}>
                <Sparkles size={14} className={styles.eyebrowIcon} />
                <span>For Employers &amp; Hiring Managers</span>
              </div>

              <h2 className={styles.title}>
                Looking to Hire Pre-Trained Freshers &amp; Interns?
              </h2>

              <p className={styles.description}>
                Save time on screening hundreds of resumes. Hire trained freshers across <strong>B.Tech, BCA, MCA, MBA, BBA, and Law</strong> with real project experience and verified skills. 100% free hiring support.
              </p>

              <div className={styles.ctaGroup}>
                <Link href="/hire#hiring-form" className="btn btn-primary btn-lg">
                  <span>Post Hiring Requirements</span>
                  <ArrowRight size={18} />
                </Link>
                <Link href="/hire" className={`btn btn-secondary btn-lg ${styles.secBtn}`}>
                  <Briefcase size={18} />
                  <span>Explore Talent Pool</span>
                </Link>
              </div>

              <div className={styles.trustBadges}>
                <div className={styles.badgeItem}>
                  <CheckCircle2 size={16} className={styles.badgeCheck} />
                  <span>48h Shortlists</span>
                </div>
                <div className={styles.badgeItem}>
                  <CheckCircle2 size={16} className={styles.badgeCheck} />
                  <span>Zero Hiring Fees</span>
                </div>
                <div className={styles.badgeItem}>
                  <CheckCircle2 size={16} className={styles.badgeCheck} />
                  <span>50+ Partner Colleges</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Corporate Advantage Cards */}
            <div className={styles.rightCol}>
              <div className={styles.advantageCard}>
                <div className={styles.cardIconBox}>
                  <Users size={22} />
                </div>
                <div>
                  <h3 className={styles.cardHeading}>50,000+ Pre-Screened Candidates</h3>
                  <p className={styles.cardText}>
                    Students from 50+ partner colleges across India, evaluated through practical tests and real project performance.
                  </p>
                </div>
              </div>

              <div className={styles.advantageCard}>
                <div className={styles.cardIconBox}>
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className={styles.cardHeading}>Quick 48-Hour Shortlist</h3>
                  <p className={styles.cardText}>
                    Share your job requirements. We will send 5 to 10 verified profiles ready for interviews in 48 hours.
                  </p>
                </div>
              </div>

              <div className={styles.advantageCard}>
                <div className={styles.cardIconBox}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className={styles.cardHeading}>Real Project Proof</h3>
                  <p className={styles.cardText}>
                    Every candidate has live projects, working GitHub code, Power BI dashboards, or practical business case studies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
