import styles from "./AboutTimeline.module.css";
import { milestonesTimeline } from "@/data/about";
import { Calendar, Award, Sparkles, TrendingUp } from "lucide-react";

export default function AboutTimeline() {
  return (
    <section className={styles.section}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <TrendingUp size={14} className={styles.eyebrowIcon} />
            <span>Our Journey &amp; Milestones</span>
          </div>
          <h2 className={styles.title}>From Early Campus Workshops to a Nationwide Tech Launchpad</h2>
          <p className={styles.subtitle}>
            A continuous track record of innovating technical curricula, building campus partnerships, and accelerating student careers across India.
          </p>
        </div>

        {/* Timeline Path */}
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>

          <div className={styles.timelineList}>
            {milestonesTimeline.map((item, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div 
                  key={idx} 
                  className={`${styles.timelineItem} ${isEven ? styles.itemRight : styles.itemLeft}`}
                >
                  {/* Center Node */}
                  <div className={styles.timelineNode}>
                    <span className={styles.nodeYear}>{item.year}</span>
                  </div>

                  {/* Card Content */}
                  <div className={styles.timelineCard}>
                    <div className={styles.cardHeader}>
                      <span className={styles.phaseTag}>{item.tag}</span>
                      <span className={styles.yearBadge}>{item.year}</span>
                    </div>

                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>

                    <div className={styles.cardMetric}>
                      <Award size={15} className={styles.metricIcon} />
                      <span>{item.metrics}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
