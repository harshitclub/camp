import styles from "./InternshipPerks.module.css";
import { internshipPerks } from "@/data/internships";
import { 
  FolderGit2, 
  ShieldCheck, 
  Users2, 
  Clock4, 
  Gift
} from "lucide-react";

export default function InternshipPerks() {
  const icons = [
    <FolderGit2 size={24} key="1" />,
    <ShieldCheck size={24} key="2" />,
    <Users2 size={24} key="3" />,
    <Clock4 size={24} key="4" />
  ];

  return (
    <section className={styles.perksSection}>
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <Gift size={14} />
            <span>Key Deliverables</span>
          </div>
          <h2 className="section-title">What You Earn from This Program</h2>
          <p className="section-subtitle">
            Every deliverable is crafted to give you a concrete advantage in technical interviews and campus placements.
          </p>
        </div>

        <div className={styles.perksGrid}>
          {internshipPerks.map((perk, idx) => (
            <div key={idx} className={styles.perkCard}>
              <div className={styles.iconCircle}>
                {icons[idx] || <ShieldCheck size={24} />}
              </div>
              <h3 className={styles.perkTitle}>{perk.title}</h3>
              <p className={styles.perkDescription}>{perk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
