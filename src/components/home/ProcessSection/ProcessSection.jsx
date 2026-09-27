import Link from "next/link";
import styles from "./ProcessSection.module.css";
import { ArrowRight, Code, Cpu, FolderGit2, Trophy } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      timeline: "Step 1: Basics",
      title: "Core Concepts & Practice Labs",
      description: "Master fundamental concepts, problem-solving, and daily exercises with hands-on practical lessons.",
    },
    {
      num: "02",
      timeline: "Step 2: Modern Tools",
      title: "Industry Tech Stacks & Tools",
      description: "Learn modern frameworks, databases, and real-world tools used by companies today.",
    },
    {
      num: "03",
      timeline: "Step 3: Real Projects",
      title: "Live Projects & Sprints",
      description: "Build complete, working projects with mentor guidance to showcase on your resume and GitHub.",
    },
    {
      num: "04",
      timeline: "Step 4: Career Ready",
      title: "Verified Certificate & Job Prep",
      description: "Get your online verified certificate, polish your resume, and prepare for interviews.",
    }
  ];

  return (
    <section className={styles.processSection}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">How You Learn</span>
          <h2 className="section-title">Step-by-Step Learning Roadmap</h2>
          <p className="section-subtitle">
            A structured 4-step path that takes you from basics to building real projects and getting job-ready.
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
              Ready to start your career journey?
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Choose a program and join thousands of students learning practical skills.
            </p>
          </div>
          <Link href="/courses" className="btn btn-primary">
            <span>Browse All Programs</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
