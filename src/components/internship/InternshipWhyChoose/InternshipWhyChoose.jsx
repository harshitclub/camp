import styles from "./InternshipWhyChoose.module.css";
import { 
  Code2, 
  ShieldCheck, 
  Users, 
  FileText, 
  Sparkles, 
  Award,
  CheckCircle,
  Briefcase
} from "lucide-react";

export default function InternshipWhyChoose() {
  const pillars = [
    {
      icon: <Code2 size={24} />,
      title: "Real Industry Project Sprints",
      description: "No passive lectures. You write real code, create pull requests, configure databases, and build portfolio-grade capstones from day one."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Tamper-Proof Online Credential",
      description: "Each Certificate of Internship includes an instant online verification link and QR code for HR recruiters and universities."
    },
    {
      icon: <Users size={24} />,
      title: "1:1 Dedicated Mentor Reviews",
      description: "Get structured weekly code reviews, architectural advice, and debugging assistance from practicing senior software engineers."
    },
    {
      icon: <FileText size={24} />,
      title: "Performance-Based LOR",
      description: "Stand out with a formal, personalized Letter of Recommendation highlighting your project contributions, velocity, and work ethic."
    },
    {
      icon: <Briefcase size={24} />,
      title: "Placement & Resume Polish",
      description: "Receive track-specific ATS resume optimization, LinkedIn profile branding, and mock interview questions to ace campus placements."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Flexible Academic Schedule",
      description: "8–12 hours per week designed to comfortably fit around college classes, semester exams, and academic commitments."
    }
  ];

  return (
    <section className={styles.whySection}>
      <div className={`container ${styles.whyGrid}`}>
        {/* Left Content Column */}
        <div className={styles.contentCol}>
          <div className="section-eyebrow">Why Choose Campussutras</div>
          
          <h2 className={styles.title}>
            The Internship Experience Designed for <span className={styles.highlight}>Real Career Velocity</span>
          </h2>

          <p className={styles.subtitle}>
            Most internships leave students with generic certificates and zero practical knowledge. At Campussutras, we combine rigorous mentor-guided engineering sprints with verifiable credentials to make you stand out in competitive job markets.
          </p>

          <div className={styles.pillarsGrid}>
            {pillars.map((pillar, idx) => (
              <div key={idx} className={styles.pillarCard}>
                <div className={styles.iconWrap}>
                  {pillar.icon}
                </div>
                <div className={styles.pillarBody}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarText}>{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual Image & Stats Card */}
        <div className={styles.visualCol}>
          <div className={styles.imageCard}>
            <img
              src="/media/whyChoose.jpg"
              alt="Why Choose Campussutras Internships"
              className={styles.whyImg}
            />

            <div className={styles.floatingStat}>
              <div className={styles.statIcon}>
                <Award size={22} color="#059669" />
              </div>
              <div>
                <div className={styles.statNum}>100% Verified</div>
                <div className={styles.statLabel}>Online Credential & LOR System</div>
              </div>
            </div>

            <div className={styles.floatingColleges}>
              <div className={styles.collegeText}>
                Trusted across <strong>50+ Partner Colleges Across India</strong>
              </div>
              <div className={styles.checkRow}>
                <CheckCircle size={15} color="#38bdf8" />
                <span>Industry Aligned Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
