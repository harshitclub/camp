"use client";

import { useState, useEffect } from "react";
import AdminGuard from "@/components/admin/AdminGuard/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader/AdminHeader";
import styles from "./admin.module.css";

export default function AdminLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // Default state is closed (mini icons only) as requested
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("campussutras_admin_sidebar_collapsed");
      if (saved !== null) {
        setIsSidebarCollapsed(saved === "true");
      }
    } catch (e) {}
  }, []);

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("campussutras_admin_sidebar_collapsed", String(next));
      } catch (e) {}
      return next;
    });
  };

  return (
    <AdminGuard>
      <div className={styles.adminContainer}>
        {/* Collapsible Sidebar */}
        <AdminSidebar 
          mobileOpen={mobileSidebarOpen} 
          onCloseMobile={() => setMobileSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />

        {/* Main Content Area */}
        <div className={`${styles.mainWrapper} ${isSidebarCollapsed ? styles.mainWrapperCollapsed : ""}`}>
          <AdminHeader 
            onToggleMobile={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleCollapse}
          />

          <main className={styles.contentArea}>
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
