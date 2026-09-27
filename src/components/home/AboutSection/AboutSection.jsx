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
          <div className={styles.eyebrow}>Campus to Corporate Training</div>
          
          <h2 className={styles.title}>
            Helping Students Move from College Classrooms to Great Careers
          </h2>

          <p className={styles.description}>
            Founded in 2023, Campussutras bridges the gap between college studies and actual job requirements. Whether you are studying <strong>B.Tech, BCA, MCA, MBA, BBA, PGDM, Law, or Commerce</strong>, we replace textbook theory with hands-on practice, modern industry tools, and live projects. Having trained over <strong>50,000+ students across 50+ colleges in India</strong>, we help learners build real skills, confident communication, and verified certificates.
          </p>

          <div className={styles.pointsGrid}>
            <div className={styles.pointCard}>
              <GraduationCap size={20} className={styles.pointIcon} />
              <div>
                <div className={styles.pointTitle}>Programs for All Degree Streams</div>
                <div className={styles.pointText}>
                  Hands-on training for B.Tech, BCA, MCA, MBA, BBA, PGDM, Law &amp; Commerce.
                </div>
              </div>
            </div>

            <div className={styles.pointCard}>
              <Laptop size={20} className={styles.pointIcon} />
              <div>
                <div className={styles.pointTitle}>Real Projects &amp; Case Studies</div>
                <div className={styles.pointText}>
                  Work on live projects, business dashboards, and real assignments that recruiters value.
                </div>
              </div>
            </div>

            <div className={styles.pointCard}>
              <Briefcase size={20} className={styles.pointIcon} />
              <div>
                <div className={styles.pointTitle}>Interview &amp; Communication Skills</div>
                <div className={styles.pointText}>
                  Resume building, mock interviews, presentation practice, and workplace communication tips.
                </div>
              </div>
            </div>

            <div className={styles.pointCard}>
              <CheckCircle2 size={20} className={styles.pointIcon} />
              <div>
                <div className={styles.pointTitle}>Online Verified Certificates</div>
                <div className={styles.pointText}>
                  Get a digital certificate that recruiters can verify online in seconds.
                </div>
              </div>
            </div>
          </div>

          <Link href="/about" className="btn btn-primary">
            <span>Learn More About Us</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
