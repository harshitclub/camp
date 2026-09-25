import styles from "./CourseProjects.module.css";
import { FolderGit2, CheckCircle2, Sparkles, Terminal, ArrowUpRight } from "lucide-react";

export default function CourseProjects({ projects = [], courseTitle = "" }) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className={styles.projectsSection} id="projects">
      <div className={styles.header}>
        <div className="section-eyebrow" style={{ alignSelf: 'flex-start', marginBottom: '0.4rem' }}>
          Portfolio-Ready Capstones
        </div>
        <h2 className={styles.sectionTitle}>Real-World Industry Projects</h2>
        <p className={styles.sectionSubtitle}>
          You will build, test, and deploy production-grade software applications to create a verifiable GitHub portfolio that proves your capabilities to hiring managers.
        </p>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((proj, idx) => (
          <div key={idx} className={styles.projectCard}>
            <div className={styles.cardHeader}>
              <div className={styles.projectIndex}>
                <FolderGit2 size={16} />
                <span>Capstone 0{idx + 1}</span>
              </div>
              <h3 className={styles.projectTitle}>{proj.title}</h3>
              <p className={styles.projectTagline}>{proj.tagline}</p>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.projectDesc}>{proj.description}</p>

              {/* Tech Stack Badges */}
              {proj.techStack && proj.techStack.length > 0 && (
                <div className={styles.techStackWrap}>
                  <span className={styles.techLabel}>Tech Stack:</span>
                  <div className={styles.techPills}>
                    {proj.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className={styles.techPill}>{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Impact Box */}
              {proj.learningImpact && (
                <div className={styles.impactBox}>
                  <div className={styles.impactHeader}>
                    <Sparkles size={14} className={styles.impactIcon} />
                    <span>Recruiter Impact &amp; Skills Verified:</span>
                  </div>
                  <p className={styles.impactText}>{proj.learningImpact}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
