import styles from "./CoursesHero.module.css";
import { CheckCircle, ShieldCheck, Award, BookOpen, Clock } from "lucide-react";

export default function CoursesHero() {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot}></span>
            <span>All Programs • Practical Industry Tracks</span>
          </div>

          <h1 className={styles.title}>
            Master In-Demand Tech Skills with <span className={styles.highlight}>Live Industry Bootcamps</span>
          </h1>

          <p className={styles.subtitle}>
            Explore our complete catalog of practical industry bootcamps. Every course is engineered with live hands-on labs, real corporate capstones, 1:1 mentor code evaluations, and verified credentials.
          </p>

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <Clock size={16} className={styles.statIcon} />
              <span>90 Days Intensive Duration</span>
            </div>
            <div className={styles.statItem}>
              <CheckCircle size={16} className={styles.statIcon} />
              <span>100% Practical Project Sprints</span>
            </div>
            <div className={styles.statItem}>
              <ShieldCheck size={16} className={styles.statIcon} />
              <span>Verifiable Credential ID</span>
            </div>
            <div className={styles.statItem}>
              <Award size={16} className={styles.statIcon} />
              <span>Internship & Placement Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
