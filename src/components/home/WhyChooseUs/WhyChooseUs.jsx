import styles from "./WhyChooseUs.module.css";
import { ShieldCheck, Target, Users, Terminal, Sparkles, Award } from "lucide-react";

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: <Target size={22} />,
      title: "Job-Oriented Learning",
      description: "Learn practical skills that companies look for in interviews, instead of just watching passive videos."
    },
    {
      icon: <Terminal size={22} />,
      title: "Real Industry Projects",
      description: "Build live projects using modern tools, real datasets, and actual company workflows."
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Online Verified Certificates",
      description: "Get a unique certificate link that HR and recruiters can easily verify online."
    },
    {
      icon: <Users size={22} />,
      title: "1:1 Mentor Guidance",
      description: "Get direct help, project reviews, and career advice from experienced industry mentors."
    }
  ];

  return (
    <section className={styles.whySection}>
      <div className={`container ${styles.whyGrid}`}>
        {/* Left Column: Content */}
        <div className={styles.contentCol}>
          <div className="section-eyebrow" style={{ alignSelf: 'flex-start' }}>
            Why Campussutras
          </div>

          <h2 className={styles.title}>
            Built to Help College Students Get Job-Ready
          </h2>

          <p className={styles.subtitle}>
            College exams focus on theory, but companies look for practical skills. Campussutras gives you real hands-on experience so you can clear interviews with confidence.
          </p>

          <div className={styles.pillarsGrid}>
            {pillars.map((pillar, idx) => (
              <div key={idx} className={styles.pillarCard}>
                <div className={styles.pillarIconWrap}>
                  {pillar.icon}
                </div>
                <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                <p className={styles.pillarText}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Frame */}
        <div className={styles.imageCol}>
          <div className={styles.imageCard}>
            <img
              src="/media/whyChoose.jpg"
              alt="Why Choose Campussutras"
              className={styles.whyImg}
            />

            <div className={styles.trustOverlay}>
              <div className={styles.trustText}>
                Trusted by <span className={styles.trustHighlight}>50,000+ Students</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38bdf8' }}>
                <Award size={18} />
                <span style={{ fontSize: '0.825rem', fontWeight: 700 }}>Industry Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
