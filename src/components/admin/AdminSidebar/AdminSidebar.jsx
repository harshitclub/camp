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
  ArrowLeft, 
  ShieldCheck, 
  ExternalLink,
  Award,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AdminSidebar({ 
  mobileOpen, 
  onCloseMobile, 
  isCollapsed = true, 
  onToggleCollapse 
}) {
  const pathname = usePathname();

  // On mobile drawer, always render full expanded layout with labels and titles.
  // On desktop, obey the isCollapsed state.
  const isEffectivelyCollapsed = isCollapsed && !mobileOpen;

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard size={19} />,
    },
    {
      label: "Leads & Inquiries",
      href: "/admin/forms",
      icon: <Inbox size={19} />,
    },
    {
      label: "Certificates",
      href: "/admin/certificates",
      icon: <Award size={19} />,
    },
    {
      label: "User Directory",
      href: "/admin/users",
      icon: <Users size={19} />,
    },
    {
      label: "Assessments",
      href: "/admin/assessments",
      icon: <FileText size={19} />,
    },
    {
      label: "New Assessment",
      href: "/admin/assessments/new",
      icon: <PlusCircle size={19} />,
      isNew: true,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div className={styles.mobileBackdrop} onClick={onCloseMobile}></div>
      )}

      <aside
        className={`${styles.sidebar} ${
          isEffectivelyCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
        } ${mobileOpen ? styles.sidebarMobileOpen : ""}`}
      >
        {/* Brand & Toggle Header */}
        <div className={styles.brandHeader}>
          <div className={styles.brandTopRow}>
            {isEffectivelyCollapsed ? (
              <Link href="/admin" className={styles.logoMiniLink} title="CampusSutras Admin">
                <span className={styles.logoMarkText}>CS</span>
              </Link>
            ) : (
              <Link href="/admin" className={styles.logoLink} onClick={onCloseMobile}>
                <img src="/media/logo.png" alt="Campussutras" className={styles.logoImg} />
              </Link>
            )}

            {/* Desktop Collapse / Expand Toggle Button */}
            <button
              type="button"
              onClick={onToggleCollapse}
              className={styles.desktopToggleBtn}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onCloseMobile}
              className={styles.mobileCloseBtn}
              aria-label="Close Sidebar"
            >
              <X size={18} />
            </button>
          </div>

          {!isEffectivelyCollapsed && (
            <div className={styles.adminBadge}>
              <ShieldCheck size={13} />
              <span>Admin Console</span>
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav className={styles.navSection}>
          {!isEffectivelyCollapsed && (
            <span className={styles.sectionHeader}>MANAGEMENT</span>
          )}

          <ul className={styles.navList}>
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : item.href === "/admin/assessments/new"
                  ? pathname === "/admin/assessments/new"
                  : item.href === "/admin/assessments"
                  ? pathname === "/admin/assessments" ||
                    (pathname.startsWith("/admin/assessments/") &&
                      pathname !== "/admin/assessments/new")
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href} className={styles.navItem}>
                  <Link
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    title={item.label + (item.isNew ? " (+New)" : "")}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>

                    {!isEffectivelyCollapsed && (
                      <>
                        <span className={styles.navLabel}>{item.label}</span>
                        {item.isNew && (
                          <span className={styles.newBadge}>+New</span>
                        )}
                      </>
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
            <Link
              href="/profile"
              className={styles.footerLink}
              onClick={onCloseMobile}
              title="My Member Profile"
            >
              <ArrowLeft size={16} />
              {!isEffectivelyCollapsed && <span>My Member Profile</span>}
            </Link>

            <Link
              href="/"
              className={styles.footerLink}
              target="_blank"
              rel="noreferrer"
              title="View Public Portal"
            >
              <ExternalLink size={16} />
              {!isEffectivelyCollapsed && <span>View Public Portal</span>}
            </Link>
          </div>

          {!isEffectivelyCollapsed && (
            <div className={styles.versionTag}>
              <span>Campussutras Engine v2.4</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
