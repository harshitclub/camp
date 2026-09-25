"use client";

import { useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader/AdminHeader";
import styles from "./admin.module.css";

export default function AdminLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <AdminGuard>
      <div className={styles.adminContainer}>
        {/* Fixed Sidebar */}
        <AdminSidebar 
          mobileOpen={mobileSidebarOpen} 
          onCloseMobile={() => setMobileSidebarOpen(false)} 
        />

        {/* Main Content Area */}
        <div className={styles.mainWrapper}>
          <AdminHeader 
            onToggleMobile={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
          />

          <main className={styles.contentArea}>
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
