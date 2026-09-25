import Link from "next/link";
import styles from "./AboutSection.module.css";
import { ArrowRight, GraduationCap, Laptop, Briefcase, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={`container ${styles.aboutGrid}`}>
        {/* Left Column: Image Card */}
        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <img
              src="https://res.cloudinary.com/dwg0cqk12/image/upload/f_auto,q_auto,w_800/v1726573276/campushome/etwyebddmdltnm57av92.jpg"
              alt="Campussutras Real Campus Training and Engineering Workshop"
              className={styles.aboutImg}
              loading="lazy"
              decoding="async"
            />

            <div className={styles.floatingExperienceCard}>
              <div className={styles.expYears}>50K+</div>
              <div className={styles.expText}>
                Students Trained<br />Across 50+ Colleges
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mission & Highlights */}
        <div className={styles.contentCol}>
          <div className={styles.eyebrow}>Campus to Corporate • Multi-Disciplinary Training</div>
          
          <h2 className={styles.title}>
            Taking Students from College Classrooms to High-Growth Corporate Careers
          </h2>

          <p className={styles.description}>
            Founded in 2023, Campussutras bridges the critical gap between traditional college degrees and modern corporate expectations. Whether you are pursuing <strong>B.Tech, BCA, MCA, MBA, BBA, PGDM, Law, or Commerce</strong>, we replace passive lectures with intensive 90-day training sprints, real industry tools, and project-based internships. Having trained over <strong>50,000+ students across 50+ partner colleges in India</strong>, we equip learners with practical skills, workplace communication, and verified credentials.
          </p>

          <div className={styles.pointsGrid}>
            <div className={styles.pointCard}>
              <GraduationCap size={20} className={styles.pointIcon} />
              <div>
                <div className={styles.pointTitle}>Multi-Stream Campus Programs</div>
                <div className={styles.pointText}>
                  Hands-on cohorts across B.Tech, BCA, MCA, MBA, BBA, PGDM, Law &amp; Commerce.
                </div>
              </div>
            </div>

            <div className={styles.pointCard}>
              <Laptop size={20} className={styles.pointIcon} />
              <div>
                <div className={styles.pointTitle}>Project &amp; Case-Study Driven</div>
                <div className={styles.pointText}>
                  Work on real production codebases, live business dashboards, and corporate assignments that recruiters value.
                </div>
              </div>
            </div>

            <div className={styles.pointCard}>
              <Briefcase size={20} className={styles.pointIcon} />
              <div>
                <div className={styles.pointTitle}>Soft Skills &amp; Corporate Polish</div>
                <div className={styles.pointText}>
                  Business communication, presentation skills, mock interviews, and corporate etiquette for every stream.
                </div>
              </div>
            </div>

            <div className={styles.pointCard}>
              <CheckCircle2 size={20} className={styles.pointIcon} />
              <div>
                <div className={styles.pointTitle}>Central Verifiable Credentials</div>
                <div className={styles.pointText}>
                  Tamper-proof digital certificates verifiable in real time via our online credential registry.
                </div>
              </div>
            </div>
          </div>

          <Link href="/about" className="btn btn-primary">
            <span>Our Story &amp; Educational Philosophy</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
