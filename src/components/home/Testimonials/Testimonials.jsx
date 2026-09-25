import styles from "./Testimonials.module.css";
import { testimonialsData } from "@/data/testimonials";

export default function Testimonials() {
  // Duplicate for seamless infinite scrolling loop
  const infiniteList = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  return (
    <section className={styles.testimonialsSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>What Our Students Say</h2>
        </div>
      </div>

      {/* Infinite Horizontal Sliding Marquee */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {infiniteList.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className={styles.card}>
              <p className={styles.quoteText}>&ldquo;{item.quote}&rdquo;</p>

              <div className={styles.authorRow}>
                <div className={styles.avatar}>
                  {item.name.charAt(0)}
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{item.name}</div>
                  <div className={styles.courseName}>{item.course}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
