import styles from "./EventsHero.module.css";
import { Camera, Users, Calendar, MapPin, Sparkles, Award } from "lucide-react";

export default function EventsHero({ totalEvents = 10, totalPhotos = 52 }) {
  const quickHighlights = [
    { title: "GenAI & LLMs", tag: "Live Sprints" },
    { title: "Power BI & Excel", tag: "Analytics Labs" },
    { title: "Flutter & Mobile", tag: "App Dev" },
    { title: "Summer Training", tag: "400+ Interns" },
    { title: "Placement Aptitude", tag: "Speed Math" },
  ];

  return (
    <section className={styles.heroSection}>
      <div className={styles.ambientGlow}></div>
      <div className={`container ${styles.heroContainer}`}>
        {/* Top Eyebrow */}
        <div className={styles.eyebrow}>
          <Camera size={15} className={styles.eyebrowIcon} />
          <span>Campus Sprints &amp; Workshops Gallery</span>
        </div>

        {/* Title */}
        <h1 className={styles.title}>
          Real Coding Labs, Hackathons &amp;{" "}
          <span className={styles.gradientText}>Campus Moments</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Step inside Campussutras offline masterclasses, industrial training cohorts, and hands-on developer sprints conducted across 50+ top engineering colleges and tech auditoriums.
        </p>

        {/* Floating Quick Filter Tags */}
        <div className={styles.tagsRow}>
          {quickHighlights.map((item, idx) => (
            <div key={idx} className={styles.tagBadge}>
              <span className={styles.tagDot}></span>
              <strong>{item.title}</strong>
              <span className={styles.tagSub}>{item.tag}</span>
            </div>
          ))}
        </div>

        {/* Key Impact Metrics */}
        <div className={styles.impactGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricNumber}>50,000+</div>
            <div className={styles.metricLabel}>Students Trained</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricNumber}>50+</div>
            <div className={styles.metricLabel}>Colleges Partnered</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricNumber}>12</div>
            <div className={styles.metricLabel}>Career Tracks</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricNumber}>100%</div>
            <div className={styles.metricLabel}>Practical Sprints</div>
          </div>
        </div>
      </div>
    </section>
  );
}
