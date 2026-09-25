import styles from "./AboutMentors.module.css";
import { mentorPillars } from "@/data/about";
import { Code, TrendingUp, Scale, Users, CheckCircle2, Sparkles } from "lucide-react";

export default function AboutMentors() {
  const getPillarIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Code size={26} />;
      case 1:
        return <TrendingUp size={26} />;
      case 2:
        return <Scale size={26} />;
      default:
        return <Users size={26} />;
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <Sparkles size={14} className={styles.eyebrowIcon} />
            <span>Our Mentorship Ecosystem</span>
          </div>
          <h2 className={styles.title}>Guided By Practicing Industry Leaders, Technologists &amp; Corporate Mentors</h2>
          <p className={styles.subtitle}>
            Our learners aren&apos;t taught by outdated textbook theories—they are mentored by active practitioners across technology, business strategy, legal compliance, and corporate talent acquisition who review real work and conduct rigorous mock interviews.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className={styles.grid}>
          {mentorPillars.map((pillar, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconBox}>
                {getPillarIcon(idx)}
              </div>
              <span className={styles.roleBadge}>{pillar.role}</span>
              <h3 className={styles.cardTitle}>{pillar.title}</h3>
              <p className={styles.cardDesc}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
