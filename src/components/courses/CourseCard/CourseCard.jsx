import Link from "next/link";
import styles from "./CourseCard.module.css";
import { Star, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <div className={styles.card}>
      {/* Visual Image Banner with Cloudinary URL */}
      <div className={styles.imageWrapper}>
        <img
          src={course.image}
          alt={course.title}
          className={styles.thumbnailImg}
          loading="lazy"
        />
        <div className={styles.imageBadges}>
          <span className={styles.durationBadge}>{course.duration}</span>
          <span className={styles.categoryBadge}>{course.category}</span>
        </div>
      </div>

      <div className={styles.cardBody}>
        {/* Rating and Level Row */}
        <div className={styles.metaRow}>
          <div className={styles.ratingBox}>
            <Star size={14} fill="#d97706" color="#d97706" />
            <span>{course.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
              ({course.reviewsCount})
            </span>
          </div>
          <span className={styles.levelTag}>{course.level}</span>
        </div>

        {/* Title */}
        <h3 className={styles.title}>{course.title}</h3>

        {/* Description */}
        <p className={styles.description}>{course.shortDescription}</p>

        {/* Skills Pills */}
        <div className={styles.skillsContainer}>
          {course.skills.map((skill, idx) => (
            <span key={idx} className={styles.skillPill}>
              {skill}
            </span>
          ))}
        </div>

        {/* Footer with Deliverable and CTA */}
        <div className={styles.cardFooter}>
          <div className={styles.deliverableText}>
            <CheckCircle2 size={14} />
            <span>{course.projectsCount}</span>
          </div>

          <Link href={course.path} className={styles.viewBtn}>
            <span>View Details</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
