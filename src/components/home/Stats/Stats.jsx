import styles from "./Stats.module.css";
import { statsData } from "@/data/stats";
import { Users, BookOpen, Briefcase, Award, Building2 } from "lucide-react";

export default function Stats() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Users":
        return <Users size={22} />;
      case "Building2":
        return <Building2 size={22} />;
      case "BookOpen":
        return <BookOpen size={22} />;
      case "Briefcase":
        return <Briefcase size={22} />;
      case "Award":
      default:
        return <Award size={22} />;
    }
  };

  return (
    <section className={styles.statsSection}>
      <div className={`container ${styles.statsGrid}`}>
        {statsData.map((stat) => (
          <div key={stat.id} className={styles.statCard}>
            <div className={styles.statIconBox}>
              {getIcon(stat.icon)}
            </div>
            <div className={styles.statNumber}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statDesc}>{stat.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
