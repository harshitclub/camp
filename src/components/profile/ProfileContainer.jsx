"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProfileHero from "./ProfileHero/ProfileHero";
import ProfileVerificationBanner from "./ProfileVerificationBanner/ProfileVerificationBanner";
import ProfileDetailsTab from "./ProfileDetailsTab/ProfileDetailsTab";
import ProfileSecurityTab from "./ProfileSecurityTab/ProfileSecurityTab";
import ProfileAssessmentsTab from "./ProfileAssessmentsTab/ProfileAssessmentsTab";
import styles from "./ProfileContainer.module.css";
import { calculateCompletion } from "@/lib/profileUtils";
import { 
  User, 
  Lock, 
  FileText, 
  LayoutDashboard, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";

export default function ProfileContainer() {
  const { user, profile, isAdmin, updateProfile, updatePassword, refreshProfile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("details"); // "details", "assessments", "security"

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <div className="container" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", color: "var(--text-secondary)" }}>
            <div className={styles.spinner} style={{ width: "32px", height: "32px", border: "3px solid #e2e8f0", borderTopColor: "#0b57d0", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></div>
            <p style={{ fontSize: "0.95rem", fontWeight: "600" }}>Loading member dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.pageWrapper}>
        <div className="container" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", maxWidth: "440px", background: "#ffffff", padding: "2.5rem 2rem", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "var(--mainBlue)", marginBottom: "0.5rem" }}>Sign in to View Profile</h2>
            <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>Please sign in to your account to view your profile, courses, and assessments.</p>
            <Link href="/login" className="btn btn-primary btn-md" style={{ display: "inline-flex", padding: "0.75rem 1.75rem" }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const completionPercentage = calculateCompletion(user, profile);

  const handleProfileUpdate = async (fields) => {
    await updateProfile(fields);
    await refreshProfile();
  };

  const handlePasswordUpdate = async (newPass) => {
    await updatePassword(newPass);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbBar}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <ChevronRight size={14} className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>Member Dashboard</span>
        </div>

        {/* Profile Hero Header */}
        <ProfileHero 
          profile={profile} 
          user={user} 
          completionPercentage={completionPercentage} 
        />

        {/* Verification Status & Resend Link Banner */}
        <ProfileVerificationBanner />

        {/* Navigation Tabs Bar */}
        <div className={styles.tabNavWrapper}>
          <div className={styles.tabNavList}>
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`${styles.tabBtn} ${activeTab === "details" ? styles.tabBtnActive : ""}`}
            >
              <User size={16} />
              <span>Personal Details</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("assessments")}
              className={`${styles.tabBtn} ${activeTab === "assessments" ? styles.tabBtnActive : ""}`}
            >
              <FileText size={16} />
              <span>My Assessments</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`${styles.tabBtn} ${activeTab === "security" ? styles.tabBtnActive : ""}`}
            >
              <Lock size={16} />
              <span>Security &amp; Password</span>
            </button>
          </div>

          {isAdmin && (
            <Link href="/admin" className={styles.adminDirectLink}>
              <LayoutDashboard size={16} />
              <span>Admin Command Center</span>
              <Sparkles size={14} className={styles.adminSparkle} />
            </Link>
          )}
        </div>

        {/* Tab Content Display */}
        <div className={styles.tabPanels}>
          {activeTab === "details" && (
            <ProfileDetailsTab 
              profile={profile} 
              user={user} 
              onProfileUpdated={handleProfileUpdate} 
            />
          )}

          {activeTab === "assessments" && (
            <ProfileAssessmentsTab user={user} />
          )}

          {activeTab === "security" && (
            <ProfileSecurityTab 
              user={user} 
              onPasswordUpdated={handlePasswordUpdate} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
