import styles from "./CourseSidebar.module.css";
import CourseEnrollForm from "./CourseEnrollForm";
import { companyInfo } from "@/data/company";
import { 
  Clock, 
  Layers, 
  FolderGit2, 
  Award, 
  Users, 
  PhoneCall, 
  Mail, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";

export default function CourseSidebar({ course }) {
  if (!course) return null;

  return (
    <aside className={styles.sidebarSticky}>
      {/* 1. Fast Registration Card */}
      <CourseEnrollForm course={course} isSidebar={true} />

      {/* 2. Program Fast Facts & Inclusions */}
      <div className={styles.factsCard}>
        <h4 className={styles.factsTitle}>
          <Sparkles size={16} className={styles.factsIcon} />
          <span>Program Inclusions</span>
        </h4>

        <ul className={styles.factsList}>
          <li className={styles.factItem}>
            <div className={styles.factIconWrap}>
              <Clock size={16} />
            </div>
            <div className={styles.factMeta}>
              <span className={styles.factLabel}>Duration</span>
              <strong className={styles.factValue}>{course.duration} (12 Weeks)</strong>
            </div>
          </li>

          <li className={styles.factItem}>
            <div className={styles.factIconWrap}>
              <Layers size={16} />
            </div>
            <div className={styles.factMeta}>
              <span className={styles.factLabel}>Format</span>
              <strong className={styles.factValue}>{course.mode}</strong>
            </div>
          </li>

          <li className={styles.factItem}>
            <div className={styles.factIconWrap}>
              <FolderGit2 size={16} />
            </div>
            <div className={styles.factMeta}>
              <span className={styles.factLabel}>Portfolio Capstones</span>
              <strong className={styles.factValue}>{course.projectsCount}</strong>
            </div>
          </li>

          <li className={styles.factItem}>
            <div className={styles.factIconWrap}>
              <Award size={16} />
            </div>
            <div className={styles.factMeta}>
              <span className={styles.factLabel}>Credentials</span>
              <strong className={styles.factValue}>Verifiable Digital Certificate</strong>
            </div>
          </li>

          <li className={styles.factItem}>
            <div className={styles.factIconWrap}>
              <Users size={16} />
            </div>
            <div className={styles.factMeta}>
              <span className={styles.factLabel}>Mentorship</span>
              <strong className={styles.factValue}>1:1 Code Reviews &amp; Syncs</strong>
            </div>
          </li>
        </ul>

        <div className={styles.guaranteeBox}>
          <CheckCircle2 size={16} className={styles.guaranteeIcon} />
          <span>Includes verified internship placement assistance and mock interview rounds.</span>
        </div>
      </div>

      {/* 3. Direct Counseling Support Card */}
      <div className={styles.supportCard}>
        <h5 className={styles.supportHeading}>Have Questions Before Applying?</h5>
        <p className={styles.supportSub}>
          Speak with our academic counselors directly for personalized career mapping.
        </p>

        <div className={styles.supportLinks}>
          <a 
            href={`https://wa.me/918949826315?text=Hello%20Campussutras%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(course.title)}%20Bootcamp.`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.supportBtnWa}
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp</span>
          </a>

          <a 
            href="tel:+918949826315"
            className={styles.supportBtnCall}
          >
            <PhoneCall size={15} />
            <span>Call Counselor Desk</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
