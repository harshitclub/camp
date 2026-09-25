import styles from "./AboutStats.module.css";
import { aboutStats } from "@/data/about";
import { Sparkles, Trophy, Globe2, Users, CheckCircle2 } from "lucide-react";

export default function AboutStats() {
  const getStatIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Users size={24} />;
      case 1:
        return <Globe2 size={24} />;
      case 2:
        return <CheckCircle2 size={24} />;
      default:
        return <Trophy size={24} />;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.ambientGlow}></div>
      <div className="container">
        <div className={styles.statsWrapper}>
          <div className={styles.header}>
            <div className={styles.eyebrow}>
              <Sparkles size={14} />
              <span>National Impact Footprint</span>
            </div>
            <h2 className={styles.title}>Numbers That Define Our Educational Reach</h2>
            <p className={styles.subtitle}>
              From our first campus cohort in 2023 to partnering with 50+ colleges across India, our campus-to-corporate approach delivers real, verifiable outcomes.
            </p>
          </div>

          <div className={styles.grid}>
            {aboutStats.map((stat, idx) => (
              <div key={idx} className={styles.statCard}>
                <div className={styles.iconCircle}>
                  {getStatIcon(idx)}
                </div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statSub}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
