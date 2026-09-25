import styles from "./HireProcess.module.css";
import { FileText, Users, UserCheck, ArrowRight, Zap, ShieldCheck } from "lucide-react";

const steps = [
  {
    stepNumber: "01",
    icon: FileText,
    title: "Submit Your Hiring Criteria",
    description: "Fill out the requirement form with your open roles, required tech or analytical stack, employment type (full-time or internship), and expected compensation bracket."
  },
  {
    stepNumber: "02",
    icon: Users,
    title: "Receive Handpicked Profiles in 48h",
    description: "Our placement cell filters the top performers across our 50+ college cohorts, sending you a focused shortlist with verified assessment scores and live project links."
  },
  {
    stepNumber: "03",
    icon: UserCheck,
    title: "Interview & Onboard Top Talent",
    description: "Conduct your interviews directly with candidates. Onboard high-velocity freshers who require minimal ramp-up time — with zero placement agency commission."
  }
];

export default function HireProcess() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <Zap size={14} className={styles.eyebrowIcon} />
            <span>Fast &amp; Seamless Workflow</span>
          </div>
          <h2 className={styles.title}>How Hiring From Campussutras Works</h2>
          <p className={styles.subtitle}>
            From job posting to your first candidate interview in less than 48 hours.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className={styles.stepCard}>
                <div className={styles.stepTop}>
                  <div className={styles.stepBadge}>{s.stepNumber}</div>
                  <div className={styles.iconBox}>
                    <Icon size={24} />
                  </div>
                </div>

                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.description}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.guaranteeBox}>
          <ShieldCheck size={24} className={styles.guaranteeIcon} />
          <div>
            <div className={styles.guaranteeTitle}>The Campussutras Quality Guarantee</div>
            <p className={styles.guaranteeText}>
              Every candidate we recommend has passed our central timed technical assessments, built working projects, and completed workplace communication polish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
