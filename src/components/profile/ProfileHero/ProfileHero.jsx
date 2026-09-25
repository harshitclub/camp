"use client";

import styles from "./ProfileHero.module.css";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  Calendar, 
  Mail, 
  UserCheck, 
  Award,
  Building2,
  Briefcase
} from "lucide-react";

export default function ProfileHero({ profile, user, completionPercentage = 75 }) {
  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";
  const userType = profile?.user_type || user?.user_metadata?.user_type || "Student";
  const isVerified = Boolean(
    profile?.is_verified || 
    user?.email_confirmed_at || 
    user?.confirmed_at || 
    user?.user_metadata?.is_verified
  );
  const isAdmin = Boolean(profile?.is_admin);
  const email = user?.email || "";
  
  // Format member since date
  const memberSince = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Recent";

  // Initials
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isEmployee = userType === "Employee" || userType === "Working Professional";
  const orgOrCollege = isEmployee 
    ? (profile?.company || "Company not specified") 
    : (profile?.college_name || "College not specified");
  const courseDisplay = profile?.course || profile?.degree_branch || null;

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroCard}>
        {/* Background glow effects */}
        <div className={styles.glow1}></div>
        <div className={styles.glow2}></div>

        <div className={styles.heroContent}>
          {/* Avatar Section */}
          <div className={styles.avatarSection}>
            <div className={styles.avatarBadgeWrap}>
              <div className={styles.avatarPill}>
                {initials}
              </div>
              {isVerified ? (
                <div className={styles.verifiedIconBadge} title="Verified Authentic Member">
                  <ShieldCheck size={18} color="#ffffff" />
                </div>
              ) : (
                <div className={styles.pendingIconBadge} title="Verification Pending">
                  <ShieldAlert size={16} color="#ffffff" />
                </div>
              )}
            </div>

            <div className={styles.userMainInfo}>
              <div className={styles.nameRow}>
                <h1 className={styles.userName}>{displayName}</h1>
                <div className={styles.badgeRow}>
                  <span className={`${styles.roleBadge} ${styles[`role_${userType.replace(/\s+/g, "_")}`] || styles.role_Student}`}>
                    {userType}
                  </span>
                  {isAdmin && (
                    <span className={styles.adminBadge}>
                      <Sparkles size={12} />
                      <span>Administrator</span>
                    </span>
                  )}
                  {isVerified ? (
                    <span className={styles.verifiedTextBadge}>
                      <ShieldCheck size={13} />
                      <span>Verified Authentic</span>
                    </span>
                  ) : (
                    <span className={styles.pendingTextBadge}>
                      <ShieldAlert size={13} />
                      <span>Pending Verification</span>
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaItem}>
                  <Mail size={14} className={styles.metaIcon} />
                  <span>{email}</span>
                </span>
                <span className={styles.metaDivider}>•</span>
                <span className={styles.metaItem}>
                  <Building2 size={14} className={styles.metaIcon} />
                  <span>{orgOrCollege}</span>
                </span>
                {courseDisplay && (
                  <>
                    <span className={styles.metaDivider}>•</span>
                    <span className={styles.metaItem}>
                      <Briefcase size={14} className={styles.metaIcon} />
                      <span>{courseDisplay}</span>
                    </span>
                  </>
                )}
                <span className={styles.metaDivider}>•</span>
                <span className={styles.metaItem}>
                  <Calendar size={14} className={styles.metaIcon} />
                  <span>Member since {memberSince}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Profile Completion Meter Card */}
          <div className={styles.completionCard}>
            <div className={styles.completionHeader}>
              <div className={styles.completionTitleWrap}>
                <Award size={16} className={styles.awardIcon} />
                <span className={styles.completionTitle}>Profile Strength</span>
              </div>
              <span className={styles.completionPercent}>{completionPercentage}%</span>
            </div>

            <div className={styles.progressBarTrack}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>

            <p className={styles.completionTip}>
              {completionPercentage < 100 
                ? "Complete your profile details to unlock verified assessment certificates." 
                : "Your profile is fully completed and optimized!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
