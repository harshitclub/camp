import styles from "./AboutMission.module.css";
import { aboutMissionData, coreValues } from "@/data/about";
import { 
  Target, 
  Compass, 
  Code2, 
  ShieldCheck, 
  Users2, 
  CheckCircle2, 
  Sparkles,
  Award,
  Zap
} from "lucide-react";

export default function AboutMission() {
  const getIcon = (name) => {
    switch (name) {
      case "Code2":
        return <Code2 size={24} />;
      case "ShieldCheck":
        return <ShieldCheck size={24} />;
      case "Users2":
        return <Users2 size={24} />;
      case "Compass":
        return <Compass size={24} />;
      default:
        return <Award size={24} />;
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <Sparkles size={14} className={styles.eyebrowIcon} />
            <span>{aboutMissionData.eyebrow}</span>
          </div>
          <h2 className={styles.title}>{aboutMissionData.title}</h2>
          <p className={styles.description}>{aboutMissionData.description}</p>
        </div>

        {/* Mission & Vision Twin Cards */}
        <div className={styles.twinGrid}>
          {/* Mission Card */}
          <div className={`${styles.card} ${styles.missionCard}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconContainer} ${styles.missionIcon}`}>
                <Target size={28} />
              </div>
              <div>
                <span className={styles.cardTag}>Core Purpose</span>
                <h3 className={styles.cardTitle}>{aboutMissionData.mission.title}</h3>
              </div>
            </div>
            <p className={styles.cardText}>{aboutMissionData.mission.statement}</p>
            <div className={styles.cardFooter}>
              <CheckCircle2 size={16} className={styles.footerIcon} />
              <span>{aboutMissionData.mission.highlight}</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className={`${styles.card} ${styles.visionCard}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconContainer} ${styles.visionIcon}`}>
                <Compass size={28} />
              </div>
              <div>
                <span className={styles.cardTag}>Future Horizon</span>
                <h3 className={styles.cardTitle}>{aboutMissionData.vision.title}</h3>
              </div>
            </div>
            <p className={styles.cardText}>{aboutMissionData.vision.statement}</p>
            <div className={styles.cardFooter}>
              <CheckCircle2 size={16} className={styles.footerIcon} />
              <span>{aboutMissionData.vision.highlight}</span>
            </div>
          </div>
        </div>

        {/* Guiding Values Section - Modern 2x2 Feature Bento */}
        <div className={styles.valuesSection}>
          <div className={styles.valuesHeader}>
            <div className={styles.valuesEyebrow}>
              <Zap size={14} />
              <span>Foundational Principles</span>
            </div>
            <h3 className={styles.valuesTitle}>Our Guiding Values</h3>
            <p className={styles.valuesSubtitle}>
              The practical standards, corporate rigor, and educational philosophy behind every bootcamp, sprint, and certification we conduct across all college streams.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {coreValues.map((val) => (
              <div key={val.id} className={styles.valCard}>
                <div className={styles.valTopBar}>
                  <div className={styles.valNumberBox}>
                    <span className={styles.valNumber}>{val.number}</span>
                    <span className={styles.valTag}>{val.tag}</span>
                  </div>
                  <div className={styles.valIconBox}>
                    {getIcon(val.icon)}
                  </div>
                </div>

                <h4 className={styles.valTitle}>{val.title}</h4>
                <p className={styles.valDesc}>{val.description}</p>

                <div className={styles.valHighlight}>
                  <CheckCircle2 size={15} className={styles.valCheckIcon} />
                  <span>{val.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
