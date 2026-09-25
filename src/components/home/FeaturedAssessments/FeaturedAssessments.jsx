import Link from "next/link";
import styles from "./FeaturedAssessments.module.css";
import { assessmentsList } from "@/data/assessmentsData";
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  HelpCircle, 
  Award, 
  Brain, 
  Code2, 
  Cpu, 
  BarChart3, 
  FileSpreadsheet, 
  Megaphone,
  CheckCircle2
} from "lucide-react";

// 6 Flagship assessments
const FEATURED_IDS = [
  "generative-ai-agents",
  "full-stack-web-development",
  "data-structures-algorithms",
  "power-bi-data-visualization",
  "advanced-excel-business-modeling",
  "digital-marketing-social-media-ads"
];

// Clean light-mode icon styling map
const ICON_MAP = {
  "generative-ai-agents": {
    icon: Brain,
    bg: "#f5f3ff",
    color: "#7c3aed",
    border: "#ddd6fe",
  },
  "full-stack-web-development": {
    icon: Code2,
    bg: "#f0f9ff",
    color: "#0284c7",
    border: "#bae6fd",
  },
  "data-structures-algorithms": {
    icon: Cpu,
    bg: "#eef2ff",
    color: "#4f46e5",
    border: "#c7d2fe",
  },
  "power-bi-data-visualization": {
    icon: BarChart3,
    bg: "#fffbeb",
    color: "#d97706",
    border: "#fde68a",
  },
  "advanced-excel-business-modeling": {
    icon: FileSpreadsheet,
    bg: "#ecfdf5",
    color: "#059669",
    border: "#a7f3d0",
  },
  "digital-marketing-social-media-ads": {
    icon: Megaphone,
    bg: "#fff1f2",
    color: "#e11d48",
    border: "#fecdd3",
  },
};

export default function FeaturedAssessments() {
  const featuredAssessments = FEATURED_IDS
    .map((id) => assessmentsList.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <section className={styles.assessmentsSection}>
      <div className="container">
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div>
            <div className={styles.eyebrow}>
              <Sparkles size={13} className={styles.eyebrowIcon} />
              <span>Skill Benchmarking &amp; Diagnostics</span>
            </div>
            <h2 className={styles.title}>
              Test Your Knowledge with Free Skill Assessments
            </h2>
          </div>

          <Link href="/assessments" className={styles.viewAllBtn}>
            <span>Explore All 30 Assessments</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 6-Card Light Minimalist Grid */}
        <div className={styles.grid}>
          {featuredAssessments.map((item) => {
            const config = ICON_MAP[item.id] || {
              icon: Brain,
              bg: "#f0f5fc",
              color: "#002255",
              border: "#e2e8f0",
            };
            const IconComponent = config.icon;

            return (
              <Link
                key={item.id}
                href={`/assessments/${item.id}`}
                className={styles.card}
              >
                {/* Top Row: Icon & Category Tag */}
                <div className={styles.cardHeader}>
                  <div 
                    className={styles.iconBox}
                    style={{ 
                      backgroundColor: config.bg,
                      color: config.color,
                      borderColor: config.border
                    }}
                  >
                    <IconComponent size={18} />
                  </div>

                  <span className={styles.categoryTag}>
                    {item.category_name}
                  </span>
                </div>

                {/* Title */}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                
                {/* 2-line Clamped Description */}
                <p className={styles.cardDesc}>{item.description}</p>

                {/* Meta Row: 15 Mins • 15 Questions • 60% Passing */}
                <div className={styles.metaRow}>
                  <span className={styles.metaPill}>
                    <Clock size={11} />
                    <span>{item.duration_minutes} Mins</span>
                  </span>
                  <span className={styles.metaPill}>
                    <HelpCircle size={11} />
                    <span>{item.total_questions} Questions</span>
                  </span>
                  <span className={styles.metaPill}>
                    <Award size={11} />
                    <span>{item.passing_percentage}% Pass</span>
                  </span>
                </div>

                {/* Card Bottom: Instant Certificate & CTA */}
                <div className={styles.cardFooter}>
                  <div className={styles.instantBadge}>
                    <CheckCircle2 size={13} className={styles.checkIcon} />
                    <span>Instant Result</span>
                  </div>

                  <span className={styles.startLink}>
                    <span>Start Test</span>
                    <ArrowRight size={14} className={styles.arrowIcon} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All CTA */}
        <div className={styles.mobileCta}>
          <Link href="/assessments" className="btn btn-primary btn-block">
            <span>Explore All 30 Assessments</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
