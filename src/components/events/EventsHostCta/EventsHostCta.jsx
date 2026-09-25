import styles from "./EventsHostCta.module.css";
import Link from "next/link";
import { Sparkles, Building2, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

export default function EventsHostCta() {
  return (
    <section className={styles.hostSection}>
      <div className="container">
        <div className={styles.hostCard}>
          <div className={styles.contentCol}>
            <div className={styles.eyebrow}>
              <Sparkles size={14} className={styles.sparkleIcon} />
              <span>For Colleges, Universities &amp; Student Clubs</span>
            </div>

            <h2 className={styles.title}>
              Want to Host a Practical Tech Bootcamp at Your Campus?
            </h2>

            <p className={styles.description}>
              We collaborate directly with HODs, TPO cells, and student developer clubs to deliver intensive 2 to 5-day hands-on workshops in <strong>Generative AI, Power BI Data Analytics, Flutter App Engineering, Full Stack Web Development</strong>, and <strong>Placement Aptitude</strong>.
            </p>

            <div className={styles.perksRow}>
              <div className={styles.perk}>
                <ShieldCheck size={16} className={styles.perkIcon} />
                <span>Industry Expert Mentors</span>
              </div>
              <div className={styles.perk}>
                <Building2 size={16} className={styles.perkIcon} />
                <span>Customized Curriculum</span>
              </div>
              <div className={styles.perk}>
                <GraduationCap size={16} className={styles.perkIcon} />
                <span>Verified Certificates for Students</span>
              </div>
            </div>

            <div className={styles.actionRow}>
              <Link href="/contact" className={`btn btn-primary ${styles.ctaBtn}`}>
                <span>Request Campus Workshop Proposal</span>
                <ArrowRight size={16} />
              </Link>
              <a href="mailto:info@campussutras.com?subject=Campus%20Workshop%20Inquiry" className={`btn btn-secondary ${styles.emailBtn}`}>
                <span>Direct MoU Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
