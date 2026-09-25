import styles from "./HireDomains.module.css";
import { 
  Code2, 
  TrendingUp, 
  BarChart3, 
  Scale, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from "lucide-react";

const domainsData = [
  {
    id: "tech",
    icon: "Code2",
    badge: "Engineering & Tech",
    title: "Software & Cloud Engineers",
    degrees: "B.Tech • BCA • MCA",
    roles: [
      "Full Stack Developers (React / Next.js / Node)",
      "Backend & API Engineers (PostgreSQL / Redis)",
      "Java Enterprise & Microservices Developers",
      "Cloud & DevOps Associates (Docker / CI/CD)"
    ],
    skills: ["React / Next.js", "Node.js & Express", "PostgreSQL & Prisma", "Docker & Redis", "Python & AI APIs"]
  },
  {
    id: "analytics",
    icon: "BarChart3",
    badge: "Data & BI",
    title: "Business & Data Analysts",
    degrees: "MBA • BBA • B.Com • MCA",
    roles: [
      "Business Intelligence (BI) Developers",
      "Power BI Dashboard Specialists",
      "SQL & Operations Data Analysts",
      "Financial Spreadsheet Modelers"
    ],
    skills: ["Power BI & DAX", "Advanced SQL & CTEs", "Financial Modeling", "Excel Automation", "Cohort Analysis"]
  },
  {
    id: "growth",
    icon: "TrendingUp",
    badge: "Growth & Media",
    title: "Performance & Growth Marketers",
    degrees: "MBA • BBA • Media Studies",
    roles: [
      "Growth Marketing Associates",
      "Paid Performance Specialists (Meta / Google)",
      "SEO & Generative Engine Optimizers",
      "Product Growth & Funnel Strategists"
    ],
    skills: ["Meta Ads Manager", "Google Ads (PMax)", "Google Analytics 4", "Zapier & Automations", "AI Copywriting"]
  },
  {
    id: "legal",
    icon: "Scale",
    badge: "Legal & Corporate",
    title: "Corporate Law & Compliance",
    degrees: "LL.B • B.A. LL.B • B.B.A. LL.B",
    roles: [
      "Corporate Legal Associates",
      "Contract Drafting & Vetting Analysts",
      "Data Privacy & Compliance Officers",
      "Legal Tech & Research Trainees"
    ],
    skills: ["Contract Drafting", "DPDP Act / GDPR", "Corporate Governance", "Legal Due Diligence", "Legaltech AI"]
  }
];

export default function HireDomains() {
  const getIcon = (icon) => {
    switch (icon) {
      case "Code2":
        return <Code2 size={26} />;
      case "BarChart3":
        return <BarChart3 size={26} />;
      case "TrendingUp":
        return <TrendingUp size={26} />;
      default:
        return <Scale size={26} />;
    }
  };

  return (
    <section id="talent-streams" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <Sparkles size={14} className={styles.eyebrowIcon} />
            <span>Multi-Disciplinary Talent Pool</span>
          </div>
          <h2 className={styles.title}>What Roles Can You Hire From Campussutras?</h2>
          <p className={styles.subtitle}>
            Our learners don&apos;t just memorize definitions. Every candidate completes 90 days of live mentor sprints, rigorous evaluations, and portfolio-grade project deliverables across 4 specialized streams.
          </p>
        </div>

        <div className={styles.grid}>
          {domainsData.map((d) => (
            <div key={d.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>{getIcon(d.icon)}</div>
                <span className={styles.badge}>{d.badge}</span>
              </div>

              <h3 className={styles.cardTitle}>{d.title}</h3>
              <div className={styles.degrees}>{d.degrees}</div>

              <div className={styles.rolesBlock}>
                <div className={styles.blockLabel}>Available Job Roles:</div>
                <ul className={styles.rolesList}>
                  {d.roles.map((r, idx) => (
                    <li key={idx} className={styles.roleItem}>
                      <CheckCircle2 size={14} className={styles.checkIcon} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.skillsBlock}>
                <div className={styles.blockLabel}>Verified Skill Arsenal:</div>
                <div className={styles.skillTags}>
                  {d.skills.map((s, idx) => (
                    <span key={idx} className={styles.tag}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
