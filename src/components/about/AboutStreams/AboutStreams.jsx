import styles from "./AboutStreams.module.css";
import { academicDomains } from "@/data/about";
import { 
  Code2, 
  Laptop, 
  TrendingUp, 
  Scale, 
  BarChart3, 
  Users2, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AboutStreams() {
  const getStreamIcon = (iconName) => {
    switch (iconName) {
      case "Code2":
        return <Code2 size={24} />;
      case "Laptop":
        return <Laptop size={24} />;
      case "TrendingUp":
        return <TrendingUp size={24} />;
      case "Scale":
        return <Scale size={24} />;
      case "BarChart3":
        return <BarChart3 size={24} />;
      default:
        return <Users2 size={24} />;
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <GraduationCap size={15} className={styles.eyebrowIcon} />
            <span>Comprehensive Higher-Ed Training</span>
          </div>
          <h2 className={styles.title}>
            Multi-Disciplinary Programs Across Every Major College Stream
          </h2>
          <p className={styles.subtitle}>
            Campussutras is not limited to a single field. We partner with universities to deliver tailored, practical corporate training across engineering, computer applications, management, business administration, legal studies, and campus-wide soft skills.
          </p>
        </div>

        {/* 6 Streams Grid */}
        <div className={styles.grid}>
          {academicDomains.map((stream) => (
            <div key={stream.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>
                  {getStreamIcon(stream.icon)}
                </div>
                <span className={styles.badge}>{stream.badge}</span>
              </div>

              <div className={styles.degrees}>{stream.degrees}</div>
              <p className={styles.description}>{stream.description}</p>

              <div className={styles.skillsWrapper}>
                <div className={styles.skillsTitle}>Key Training Modules:</div>
                <div className={styles.skillsList}>
                  {stream.skills.map((skill, sIdx) => (
                    <span key={sIdx} className={styles.skillTag}>
                      <CheckCircle2 size={12} className={styles.skillCheck} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className={styles.footerBanner}>
          <div className={styles.footerContent}>
            <div className={styles.footerTitle}>Partner Your Campus With Campussutras</div>
            <p className={styles.footerSub}>
              We run customized 90-day bootcamps, project hackathons, and placement grooming sessions tailored to your department’s curriculum.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            <span>Invite Us to Your Campus</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
