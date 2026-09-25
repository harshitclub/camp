"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminSidebar.module.css";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  PlusCircle, 
  Inbox,
  Layers, 
  ArrowLeft, 
  ShieldCheck, 
  ExternalLink,
  Settings,
  Sparkles,
  Award
} from "lucide-react";

export default function AdminSidebar({ mobileOpen, onCloseMobile }) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Leads & Inquiries",
      href: "/admin/forms",
      icon: <Inbox size={18} />,
    },
    {
      label: "Certificates",
      href: "/admin/certificates",
      icon: <Award size={18} />,
    },
    {
      label: "User Directory",
      href: "/admin/users",
      icon: <Users size={18} />,
    },
    {
      label: "Assessments",
      href: "/admin/assessments",
      icon: <FileText size={18} />,
    },
    {
      label: "New Assessment",
      href: "/admin/assessments/new",
      icon: <PlusCircle size={18} />,
      isNew: true,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div className={styles.mobileBackdrop} onClick={onCloseMobile}></div>
      )}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarMobileOpen : ""}`}>
        {/* Brand & Admin Badge */}
        <div className={styles.brandHeader}>
          <Link href="/admin" className={styles.logoLink} onClick={onCloseMobile}>
            <img src="/media/logo.png" alt="Campussutras" className={styles.logoImg} />
          </Link>
          <div className={styles.adminBadge}>
            <ShieldCheck size={13} />
            <span>Admin Console</span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className={styles.navSection}>
          <span className={styles.sectionHeader}>MANAGEMENT</span>
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const isActive = item.href === "/admin"
                ? pathname === "/admin"
                : item.href === "/admin/assessments/new"
                ? pathname === "/admin/assessments/new"
                : item.href === "/admin/assessments"
                ? (pathname === "/admin/assessments" || (pathname.startsWith("/admin/assessments/") && pathname !== "/admin/assessments/new"))
                : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                    {item.isNew && (
                      <span className={styles.newBadge}>+New</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Shortcuts */}
        <div className={styles.sidebarFooter}>
          <div className={styles.footerLinks}>
            <Link href="/profile" className={styles.footerLink} onClick={onCloseMobile}>
              <ArrowLeft size={15} />
              <span>My Member Profile</span>
            </Link>

            <Link href="/" className={styles.footerLink} target="_blank" rel="noreferrer">
              <ExternalLink size={15} />
              <span>View Public Portal</span>
            </Link>
          </div>

          <div className={styles.versionTag}>
            <span>Campussutras Engine v2.4</span>
          </div>
        </div>
      </aside>
    </>
  );
}
