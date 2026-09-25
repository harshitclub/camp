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
                Skip the generic resume pile. Access job-ready candidates across <strong>B.Tech, BCA, MCA, MBA, BBA, and Law</strong> trained on live production tools, verified projects, and workplace soft skills. Zero sourcing fees.
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
                  <span>Zero Agency Fees</span>
                </div>
                <div className={styles.badgeItem}>
                  <CheckCircle2 size={16} className={styles.badgeCheck} />
                  <span>50+ Partner Campuses</span>
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
                  <h3 className={styles.cardHeading}>50,000+ Pre-Assessed Talent Pool</h3>
                  <p className={styles.cardText}>
                    Candidates across 50+ universities nationwide, filtered by technical test percentiles and practical capstone deliverables.
                  </p>
                </div>
              </div>

              <div className={styles.advantageCard}>
                <div className={styles.cardIconBox}>
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className={styles.cardHeading}>Fast 48-Hour Shortlist Delivery</h3>
                  <p className={styles.cardText}>
                    Tell us your tech stack and location budget. We deliver 5 to 10 handpicked, verified candidate profiles ready for immediate interview.
                  </p>
                </div>
              </div>

              <div className={styles.advantageCard}>
                <div className={styles.cardIconBox}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className={styles.cardHeading}>Production Proof-of-Work</h3>
                  <p className={styles.cardText}>
                    No theoretical paper coders. Every candidate has working GitHub repos, live cloud URLs, Power BI dashboards, or corporate case studies.
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
