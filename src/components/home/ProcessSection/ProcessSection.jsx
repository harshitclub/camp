import Link from "next/link";
import styles from "./ProcessSection.module.css";
import { ArrowRight, Code, Cpu, FolderGit2, Trophy } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      timeline: "Phase 1: Foundations",
      title: "Core Foundations & Live Labs",
      description: "Deconstruct core syntax, mental models, algorithmic thinking, and best practices through daily coding challenges.",
    },
    {
      num: "02",
      timeline: "Phase 2: Advanced Stacks",
      title: "Advanced Stacks & Architecture",
      description: "Dive deep into modern frameworks, databases, state management, and backend system designs used in tech companies.",
    },
    {
      num: "03",
      timeline: "Phase 3: Live Capstones",
      title: "Live Capstones & Internship Sprints",
      description: "Work on multi-tier production projects, pull requests, automated tests, and real user flows under mentor guidance.",
    },
    {
      num: "04",
      timeline: "Phase 4: Career & Review",
      title: "Verified Credential & Placement",
      description: "Final code defense, portfolio publishing, verified certificate generation, and interview referral pipelines.",
    }
  ];

  return (
    <section className={styles.processSection}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Our Methodology</span>
          <h2 className="section-title">The Proven Roadmap to Mastery</h2>
          <p className="section-subtitle">
            A clear, battle-tested learning path that takes you from college-level fundamentals to job-ready engineering proficiency.
          </p>
        </div>

        <div className={styles.processGrid}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.stepNumberBadge}>{step.num}</div>
              <div className={styles.timelineTag}>{step.timeline}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.processFooterBanner}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--mainBlue)' }}>
              Ready to embark on your learning transformation?
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Select a track and join thousands of students preparing for top tech roles.
            </p>
          </div>
          <Link href="/courses" className="btn btn-primary">
            <span>Browse All Bootcamps</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
