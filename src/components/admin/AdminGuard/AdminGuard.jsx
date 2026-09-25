"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "./AdminGuard.module.css";
import { ShieldAlert, LogIn, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

export default function AdminGuard({ children }) {
  const { user, profile, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner}></div>
        <span className={styles.loadingText}>Verifying Admin Privileges...</span>
      </div>
    );
  }

  // Not logged in or not an admin
  if (!user || !isAdmin) {
    return (
      <div className={styles.unauthorizedWrapper}>
        <div className={styles.unauthorizedCard}>
          <div className={styles.iconWrap}>
            <ShieldAlert size={36} color="#dc2626" />
          </div>

          <span className={styles.tag}>Restricted Access</span>
          <h1 className={styles.title}>Admin Privileges Required</h1>
          <p className={styles.description}>
            The <strong>Campussutras Command Center</strong> is restricted to verified administrators. 
            {!user ? " Please sign in with an authorized administrator account." : " Your current account does not have administrator clearance."}
          </p>

          <div className={styles.metaBox}>
            <div className={styles.metaRow}>
              <span>Current Account:</span>
              <strong>{user?.email || "Not Signed In"}</strong>
            </div>
            <div className={styles.metaRow}>
              <span>Assigned Role:</span>
              <strong>{profile?.user_type || user?.user_metadata?.user_type || "Guest"} {isAdmin ? "(Admin)" : "(Non-Admin)"}</strong>
            </div>
          </div>

          <div className={styles.actions}>
            {!user ? (
              <Link href="/login?redirect=/admin" className={`btn btn-primary ${styles.actionBtn}`}>
                <LogIn size={16} />
                <span>Sign In as Administrator</span>
              </Link>
            ) : (
              <Link href="/profile" className={`btn btn-primary ${styles.actionBtn}`}>
                <ArrowLeft size={16} />
                <span>Return to Member Profile</span>
              </Link>
            )}

            <Link href="/" className={`btn btn-secondary ${styles.actionBtn}`}>
              <span>Back to Public Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
