import styles from "./ContactHero.module.css";
import { MessageSquare, Clock, ShieldCheck, Mail } from "lucide-react";

export default function ContactHero() {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.liveDot}></span>
            <span>Get in Touch • Quick Support</span>
          </div>

          <h1 className={styles.title}>
            Have Questions? Let’s Connect &amp; Shape Your{" "}
            <span className={styles.highlight}>Career Trajectory</span>
          </h1>

          <p className={styles.subtitle}>
            Whether you&apos;re a student looking to enroll in an Industry Bootcamp or Summer Internship, a university seeking a campus training partnership, or an employer verifying credentials — our team is ready to assist you.
          </p>

          <div className={styles.badgesBar}>
            <div className={styles.badgeItem}>
              <Clock size={16} className={styles.badgeIcon} />
              <span>Under 24h Response Time</span>
            </div>
            <div className={styles.badgeItem}>
              <Mail size={16} className={styles.badgeIcon} />
              <span>Direct Mentor Counseling</span>
            </div>
            <div className={styles.badgeItem}>
              <ShieldCheck size={16} className={styles.badgeIcon} />
              <span>Official Institutional Desk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
