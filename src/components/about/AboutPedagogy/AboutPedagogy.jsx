import styles from "./AboutPedagogy.module.css";
import { pedagogyComparison } from "@/data/about";
import { XCircle, CheckCircle2, Zap, ArrowRight, BookOpen, GitBranch } from "lucide-react";
import Link from "next/link";

export default function AboutPedagogy() {
  return (
    <section className={styles.section}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <Zap size={14} className={styles.eyebrowIcon} />
            <span>{pedagogyComparison.eyebrow}</span>
          </div>
          <h2 className={styles.title}>{pedagogyComparison.title}</h2>
          <p className={styles.subtitle}>{pedagogyComparison.subtitle}</p>
        </div>

        {/* Comparison Dual Cards */}
        <div className={styles.comparisonGrid}>
          {/* Traditional Academic Model */}
          <div className={`${styles.compareCard} ${styles.traditionalCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.crossIconBox}>
                <BookOpen size={22} />
              </div>
              <div>
                <span className={styles.categoryLabel}>The Legacy Model</span>
                <h3 className={styles.cardHeading}>{pedagogyComparison.traditional.title}</h3>
              </div>
            </div>

            <ul className={styles.pointList}>
              {pedagogyComparison.traditional.points.map((point, idx) => (
                <li key={idx} className={styles.pointItem}>
                  <XCircle size={18} className={styles.crossIcon} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Campussutras 90-Day Sprint Formula */}
          <div className={`${styles.compareCard} ${styles.campCard}`}>
            <div className={styles.recommendedBadge}>Recommended for Career Fast-Track</div>
            <div className={styles.cardHeader}>
              <div className={styles.checkIconBox}>
                <GitBranch size={22} />
              </div>
              <div>
                <span className={styles.categoryLabelCamp}>The Modern Approach</span>
                <h3 className={styles.cardHeading}>{pedagogyComparison.campussutras.title}</h3>
              </div>
            </div>

            <ul className={styles.pointList}>
              {pedagogyComparison.campussutras.points.map((point, idx) => (
                <li key={idx} className={styles.pointItem}>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className={styles.cardCta}>
              <Link href="/courses" className="btn btn-primary btn-sm">
                <span>View Bootcamp Curriculum</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
