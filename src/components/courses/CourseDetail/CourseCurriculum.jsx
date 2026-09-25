"use client";

import { useState } from "react";
import styles from "./CourseCurriculum.module.css";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  FolderCheck, 
  Clock, 
  Sparkles,
  Maximize2,
  Minimize2
} from "lucide-react";

export default function CourseCurriculum({ curriculum = [], courseTitle = "" }) {
  // Open the first module by default
  const [openModules, setOpenModules] = useState({ 0: true });

  const toggleModule = (index) => {
    setOpenModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const expandAll = () => {
    const all = {};
    curriculum.forEach((_, idx) => {
      all[idx] = true;
    });
    setOpenModules(all);
  };

  const collapseAll = () => {
    setOpenModules({});
  };

  const allExpanded = curriculum.length > 0 && Object.keys(openModules).length === curriculum.length && Object.values(openModules).every(Boolean);

  if (!curriculum || curriculum.length === 0) return null;

  return (
    <div className={styles.curriculumWrap} id="curriculum">
      <div className={styles.headerRow}>
        <div>
          <div className="section-eyebrow" style={{ alignSelf: 'flex-start', marginBottom: '0.4rem' }}>
            Structured Industry Roadmap
          </div>
          <h2 className={styles.sectionTitle}>Curriculum &amp; Milestone Breakdown</h2>
          <p className={styles.sectionSubtitle}>
            Our industry-aligned syllabus is partitioned into 4 high-impact milestones, taking you systematically from core concepts to enterprise deployment.
          </p>
        </div>

        <div className={styles.headerControls}>
          <button 
            type="button" 
            onClick={allExpanded ? collapseAll : expandAll} 
            className={styles.toggleAllBtn}
          >
            {allExpanded ? (
              <>
                <Minimize2 size={14} />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <Maximize2 size={14} />
                <span>Expand All Modules</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={styles.modulesList}>
        {curriculum.map((mod, idx) => {
          const isOpen = !!openModules[idx];
          return (
            <div key={idx} className={`${styles.moduleCard} ${isOpen ? styles.moduleOpen : ""}`}>
              <button
                type="button"
                className={styles.moduleHeader}
                onClick={() => toggleModule(idx)}
                aria-expanded={isOpen}
              >
                <div className={styles.moduleHeaderLeft}>
                  <div className={styles.moduleNumberBadge}>
                    <span>Module {mod.moduleNumber || idx + 1}</span>
                  </div>
                  <div className={styles.moduleMeta}>
                    <div className={styles.moduleDuration}>
                      <Clock size={13} />
                      <span>{mod.duration}</span>
                    </div>
                    <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  </div>
                </div>

                <div className={styles.moduleHeaderRight}>
                  <span className={styles.topicsCount}>{mod.topics?.length || 0} Key Topics</span>
                  <div className={styles.chevronWrap}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className={styles.moduleContent}>
                  {mod.description && (
                    <p className={styles.moduleDesc}>{mod.description}</p>
                  )}

                  {mod.topics && mod.topics.length > 0 && (
                    <div className={styles.topicsBox}>
                      <h4 className={styles.topicsHeading}>What You Will Cover:</h4>
                      <ul className={styles.topicsList}>
                        {mod.topics.map((topic, tIdx) => (
                          <li key={tIdx} className={styles.topicItem}>
                            <CheckCircle2 size={16} className={styles.topicIcon} />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {mod.deliverable && (
                    <div className={styles.deliverableBanner}>
                      <div className={styles.deliverableIconWrap}>
                        <FolderCheck size={18} />
                      </div>
                      <div className={styles.deliverableText}>
                        <span className={styles.deliverableLabel}>Hands-on Milestone Deliverable:</span>
                        <strong className={styles.deliverableValue}>{mod.deliverable}</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
