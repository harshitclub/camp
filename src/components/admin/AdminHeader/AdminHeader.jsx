"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "./AdminHeader.module.css";
import { 
  Menu, 
  ShieldCheck, 
  LogOut, 
  ExternalLink, 
  Sparkles,
  User
} from "lucide-react";
import Link from "next/link";

export default function AdminHeader({ onToggleMobile }) {
  const { user, profile, logout } = useAuth();

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Admin";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button
          type="button"
          onClick={onToggleMobile}
          className={styles.mobileMenuBtn}
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className={styles.statusPill}>
          <span className={styles.pulseDot}></span>
          <span className={styles.statusText}>Production Engine Live</span>
        </div>
      </div>

      <div className={styles.headerRight}>
        <Link href="/" target="_blank" className={styles.portalLink}>
          <span>Public Portal</span>
          <ExternalLink size={13} />
        </Link>

        <div className={styles.adminUserPill}>
          <div className={styles.avatarCircle}>{userInitials}</div>
          <div className={styles.adminMeta}>
            <span className={styles.adminName}>{displayName}</span>
            <span className={styles.adminRole}>Super Administrator</span>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className={styles.logoutBtn}
          title="Sign out of Admin Session"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
