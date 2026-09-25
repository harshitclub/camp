import styles from "./CourseOutcomes.module.css";
import { 
  CheckCircle2, 
  Briefcase, 
  Users, 
  Wrench, 
  HelpCircle, 
  Sparkles, 
  Award, 
  BookCheck,
  ShieldCheck
} from "lucide-react";

export default function CourseOutcomes({ course }) {
  if (!course) return null;

  return (
    <div className={styles.outcomesContainer}>
      {/* 1. Course Overview & Narrative */}
      {course.overview && course.overview.length > 0 && (
        <section className={styles.sectionBlock} id="overview">
          <div className="section-eyebrow" style={{ alignSelf: 'flex-start', marginBottom: '0.4rem' }}>
            About The Program
          </div>
          <h2 className={styles.sectionTitle}>Course Overview &amp; Learning Philosophy</h2>
          
          <div className={styles.overviewText}>
            {course.overview.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Key Program Highlights Grid */}
          {course.highlights && course.highlights.length > 0 && (
            <div className={styles.highlightsCard}>
              <h3 className={styles.cardHeaderSmall}>
                <Sparkles size={16} className={styles.highlightHeaderIcon} />
                <span>What Makes This Bootcamp Unique:</span>
              </h3>
              <div className={styles.highlightsGrid}>
                {course.highlights.map((item, idx) => (
                  <div key={idx} className={styles.highlightItem}>
                    <CheckCircle2 size={16} className={styles.highlightCheck} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 2. Key Learning Outcomes */}
      {course.keyOutcomes && course.keyOutcomes.length > 0 && (
        <section className={styles.sectionBlock}>
          <div className="section-eyebrow" style={{ alignSelf: 'flex-start', marginBottom: '0.4rem' }}>
            Skill Mastery
          </div>
          <h2 className={styles.sectionTitle}>What You Will Be Able to Build &amp; Execute</h2>
          <div className={styles.outcomesGrid}>
            {course.keyOutcomes.map((outcome, idx) => (
              <div key={idx} className={styles.outcomeCard}>
                <div className={styles.outcomeIconWrap}>
                  <BookCheck size={18} />
                </div>
                <p className={styles.outcomeText}>{outcome}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Tools & Technologies Learned */}
      {course.toolsAndTechnologies && course.toolsAndTechnologies.length > 0 && (
        <section className={styles.sectionBlock}>
          <div className="section-eyebrow" style={{ alignSelf: 'flex-start', marginBottom: '0.4rem' }}>
            Industry Standard Tech Stack
          </div>
          <h2 className={styles.sectionTitle}>Tools &amp; Technologies You Will Master</h2>
          <div className={styles.toolsWrap}>
            {course.toolsAndTechnologies.map((tool, idx) => (
              <div key={idx} className={styles.toolBadge}>
                <Wrench size={13} className={styles.toolIcon} />
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Target Audience & Career Opportunities (2-Column Grid) */}
      <section className={styles.dualSectionBlock}>
        {/* Who is this for */}
        {course.targetAudience && course.targetAudience.length > 0 && (
          <div className={styles.infoBox}>
            <div className={styles.boxHeader}>
              <Users size={18} className={styles.boxIcon} />
              <h3 className={styles.boxTitle}>Who Is This Program For?</h3>
            </div>
            <ul className={styles.boxList}>
              {course.targetAudience.map((item, idx) => (
                <li key={idx} className={styles.boxItem}>
                  <CheckCircle2 size={15} className={styles.boxCheck} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Target Career Roles */}
        {course.careerRoles && course.careerRoles.length > 0 && (
          <div className={styles.infoBox}>
            <div className={styles.boxHeader}>
              <Briefcase size={18} className={styles.boxIcon} />
              <h3 className={styles.boxTitle}>Target Career Roles</h3>
            </div>
            <div className={styles.rolesGrid}>
              {course.careerRoles.map((role, idx) => (
                <div key={idx} className={styles.roleChip}>
                  <span className={styles.roleDot}></span>
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 5. Prerequisites */}
      {course.prerequisites && course.prerequisites.length > 0 && (
        <section className={styles.prereqBlock}>
          <div className={styles.prereqHeader}>
            <ShieldCheck size={18} className={styles.prereqIcon} />
            <h3 className={styles.prereqTitle}>Program Prerequisites &amp; System Requirements</h3>
          </div>
          <ul className={styles.prereqList}>
            {course.prerequisites.map((req, idx) => (
              <li key={idx} className={styles.prereqItem}>
                <span className={styles.prereqDot}>•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
