"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./AdminHeader.module.css";
import { 
  Menu, 
  PanelLeftClose, 
  PanelLeftOpen, 
  LogOut, 
  ExternalLink,
  Search,
  Bell,
  Clock,
  Plus,
  ChevronDown,
  CheckCircle2,
  Award,
  FileText,
  Users,
  Inbox,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllFormSubmissions } from "@/lib/adminService";

export default function AdminHeader({ 
  onToggleMobile, 
  isSidebarCollapsed = true, 
  onToggleCollapse 
}) {
  const { user, profile, logout } = useAuth();
  const router = useRouter();

  // State for menus & popovers
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Informative data states
  const [currentTime, setCurrentTime] = useState("");
  const [inquiryCount, setInquiryCount] = useState(0);

  const searchContainerRef = useRef(null);
  const createMenuRef = useRef(null);
  const notifMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const searchInputRef = useRef(null);

  // Display Name & Initials
  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Admin";

  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Live Clock (Updates every 10 seconds)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fetch real unread/new inquiries count
  useEffect(() => {
    getAllFormSubmissions()
      .then((res) => {
        if (res?.counts?.total !== undefined) {
          setInquiryCount(res.counts.total);
        }
      })
      .catch(() => {});
  }, []);

  // Keyboard shortcut listener (Ctrl+K / Cmd+K to open search, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsCreateOpen(false);
        setIsNotificationsOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(e.target)) {
        setIsCreateOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Quick navigation items for global search
  const quickNavItems = useMemo(
    () => [
      {
        title: "Create New Assessment",
        category: "Assessments",
        href: "/admin/assessments/new",
        icon: <Plus size={15} />,
        hint: "Studio & questions authoring",
      },
      {
        title: "Manage Test Studio",
        category: "Assessments",
        href: "/admin/assessments",
        icon: <FileText size={15} />,
        hint: "Catalog of 30+ technical tests",
      },
      {
        title: "Certificates Registry",
        category: "Certificates",
        href: "/admin/certificates",
        icon: <Award size={15} />,
        hint: "Single creation & CSV bulk uploads",
      },
      {
        title: "Student Leads & Inquiries",
        category: "Inquiries",
        href: "/admin/forms",
        icon: <Inbox size={15} />,
        hint: "Internship, hire, course registrations",
      },
      {
        title: "User Directory & Verification",
        category: "Users",
        href: "/admin/users",
        icon: <Users size={15} />,
        hint: "Manage student profiles & RBAC",
      },
      {
        title: "Verify Certificate Tool",
        category: "Public Portal",
        href: "/verify-certificate",
        icon: <ShieldCheck size={15} />,
        hint: "Public employer verification lookup",
      },
      {
        title: "Browse Public Platform",
        category: "Public Portal",
        href: "/",
        icon: <ExternalLink size={15} />,
        hint: "Open main student web portal",
      },
    ],
    []
  );

  const filteredNavItems = useMemo(() => {
    if (!searchQuery.trim()) return quickNavItems;
    const q = searchQuery.toLowerCase().trim();
    return quickNavItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q)
    );
  }, [searchQuery, quickNavItems]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredNavItems.length > 0) {
      router.push(filteredNavItems[0].href);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className={styles.header}>
      {/* 1. Header Left: Mobile Button, Collapse Toggle, Status & Real-time Clock */}
      <div className={styles.headerLeft}>
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onToggleMobile}
          className={styles.mobileMenuBtn}
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Sidebar Toggle Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={styles.desktopSidebarToggleBtn}
          title={isSidebarCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar"}
          aria-label="Toggle sidebar collapse"
        >
          {isSidebarCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          <span className={styles.toggleText}>{isSidebarCollapsed ? "Expand" : "Collapse"}</span>
        </button>

        {/* Live Engine Status Pill */}
        <div className={styles.statusPill}>
          <span className={styles.pulseDot}></span>
          <span className={styles.statusText}>Engine Live</span>
          <span className={styles.versionBadge}>v2.4</span>
        </div>

        {/* Real-time Clock Chip */}
        {currentTime && (
          <div className={styles.clockChip} title="Local Server / Client Time">
            <Clock size={12} className={styles.clockIcon} />
            <span>{currentTime}</span>
          </div>
        )}
      </div>

      {/* 2. Header Center: Global Search & Quick-Jump Command Bar */}
      <div className={styles.headerCenter} ref={searchContainerRef}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <Search size={15} className={styles.searchIcon} />
          <input
            ref={searchInputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search tests, certificates, users..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
          />
          {searchQuery ? (
            <button
              type="button"
              className={styles.clearSearchBtn}
              onClick={() => {
                setSearchQuery("");
                searchInputRef.current?.focus();
              }}
            >
              <X size={13} />
            </button>
          ) : (
            <kbd className={styles.searchKbd}>Ctrl K</kbd>
          )}
        </form>

        {/* Search Quick-Jump Dropdown */}
        {isSearchOpen && (
          <div className={styles.searchDropdown}>
            <div className={styles.dropdownHeader}>
              <span>{searchQuery ? "Search Results" : "Quick Jump Commands"}</span>
              <span className={styles.dropdownHint}>Press Esc to close</span>
            </div>

            <div className={styles.searchList}>
              {filteredNavItems.length === 0 ? (
                <div className={styles.noResults}>
                  <p>No matching admin features found.</p>
                </div>
              ) : (
                filteredNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.searchItem}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className={styles.searchItemIcon}>{item.icon}</div>
                    <div className={styles.searchItemContent}>
                      <span className={styles.searchItemTitle}>{item.title}</span>
                      <span className={styles.searchItemHint}>{item.hint}</span>
                    </div>
                    <span className={styles.searchItemCategory}>{item.category}</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile backdrop for dropdowns */}
      {(isCreateOpen || isNotificationsOpen || isUserMenuOpen) && (
        <div
          className={styles.dropdownMobileBackdrop}
          onClick={() => {
            setIsCreateOpen(false);
            setIsNotificationsOpen(false);
            setIsUserMenuOpen(false);
          }}
          aria-hidden="true"
        />
      )}

      {/* 3. Header Right: Quick Create, Inquiries Bell, Public Portal, User Profile */}
      <div className={styles.headerRight}>
        {/* Quick Create Dropdown Menu */}
        <div className={styles.relativeWrap} ref={createMenuRef}>
          <button
            type="button"
            className={styles.quickCreateBtn}
            onClick={() => {
              setIsCreateOpen((prev) => !prev);
              setIsNotificationsOpen(false);
              setIsUserMenuOpen(false);
            }}
            title="Create new admin asset"
          >
            <Plus size={15} />
            <span>Create</span>
            <ChevronDown size={13} className={isCreateOpen ? styles.rotate180 : ""} />
          </button>

          {isCreateOpen && (
            <div className={styles.menuDropdown}>
              <div className={styles.menuDropdownHeader}>
                <span>Quick Create</span>
                <button
                  type="button"
                  className={styles.dropdownCloseBtn}
                  onClick={() => setIsCreateOpen(false)}
                  aria-label="Close Quick Create"
                >
                  <X size={14} />
                </button>
              </div>
              <Link
                href="/admin/assessments/new"
                className={styles.menuItem}
                onClick={() => setIsCreateOpen(false)}
              >
                <FileText size={16} className={styles.menuItemIcon} />
                <div className={styles.menuItemText}>
                  <strong>New Assessment</strong>
                  <span>Create questions & publish module</span>
                </div>
              </Link>
              <Link
                href="/admin/certificates"
                className={styles.menuItem}
                onClick={() => setIsCreateOpen(false)}
              >
                <Award size={16} className={styles.menuItemIcon} />
                <div className={styles.menuItemText}>
                  <strong>Issue Certificate</strong>
                  <span>Single issue or CSV bulk sync</span>
                </div>
              </Link>
              <Link
                href="/admin/users"
                className={styles.menuItem}
                onClick={() => setIsCreateOpen(false)}
              >
                <Users size={16} className={styles.menuItemIcon} />
                <div className={styles.menuItemText}>
                  <strong>User Directory</strong>
                  <span>Review & verify student accounts</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Inquiries Notification Bell */}
        <div className={styles.relativeWrap} ref={notifMenuRef}>
          <button
            type="button"
            className={styles.bellBtn}
            onClick={() => {
              setIsNotificationsOpen((prev) => !prev);
              setIsCreateOpen(false);
              setIsUserMenuOpen(false);
            }}
            title="View new form leads & inquiries"
          >
            <Bell size={17} />
            {inquiryCount > 0 && (
              <span className={styles.bellBadge}>{inquiryCount}</span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className={styles.notifDropdown}>
              <div className={styles.notifHeader}>
                <div className={styles.notifTitleWrap}>
                  <Inbox size={16} />
                  <strong>Student Inquiries</strong>
                  <span className={styles.notifCountBadge}>{inquiryCount} Total</span>
                </div>
                <button
                  type="button"
                  className={styles.dropdownCloseBtn}
                  onClick={() => setIsNotificationsOpen(false)}
                  aria-label="Close Inquiries"
                >
                  <X size={14} />
                </button>
              </div>
              <div className={styles.notifBody}>
                <p className={styles.notifDesc}>
                  {inquiryCount > 0
                    ? `You have ${inquiryCount} student inquiry submissions across internships, courses, and hiring.`
                    : "No new pending inquiries at this moment."}
                </p>
                <Link
                  href="/admin/forms"
                  className={styles.notifActionBtn}
                  onClick={() => setIsNotificationsOpen(false)}
                >
                  <span>Open Inquiries Desk</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Public Portal Link */}
        <Link href="/" target="_blank" className={styles.portalLink} title="Open public student website">
          <span>Public Portal</span>
          <ExternalLink size={13} />
        </Link>

        {/* User Profile Pill & Dropdown */}
        <div className={styles.relativeWrap} ref={userMenuRef}>
          <button
            type="button"
            className={styles.adminUserPill}
            onClick={() => {
              setIsUserMenuOpen((prev) => !prev);
              setIsCreateOpen(false);
              setIsNotificationsOpen(false);
            }}
            title="Account Options"
          >
            <div className={styles.avatarCircle}>{userInitials}</div>
            <div className={styles.adminMeta}>
              <span className={styles.adminName}>{displayName}</span>
              <span className={styles.adminRole}>Super Administrator</span>
            </div>
            <ChevronDown size={13} className={isUserMenuOpen ? styles.rotate180 : ""} />
          </button>

          {isUserMenuOpen && (
            <div className={styles.userDropdown}>
              <div className={styles.userDropdownHeader}>
                <div className={styles.userDropdownTopRow}>
                  <div className={styles.userDropdownInfo}>
                    <span className={styles.userDropName}>{displayName}</span>
                    <span className={styles.userDropEmail}>
                      {user?.email || "admin@campussutras.com"}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.dropdownCloseBtn}
                    onClick={() => setIsUserMenuOpen(false)}
                    aria-label="Close Profile Menu"
                  >
                    <X size={14} />
                  </button>
                </div>
                <span className={styles.userRoleTag}>Super Administrator</span>
              </div>

              <div className={styles.userDropdownLinks}>
                <Link
                  href="/profile"
                  className={styles.userDropLink}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Users size={15} />
                  <span>My Member Profile</span>
                </Link>

                <Link
                  href="/verify-certificate"
                  target="_blank"
                  className={styles.userDropLink}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <ShieldCheck size={15} />
                  <span>Verify Certificate Tool</span>
                </Link>

                <Link
                  href="/"
                  target="_blank"
                  className={styles.userDropLink}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <ExternalLink size={15} />
                  <span>View Public Portal</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logout();
                  }}
                  className={styles.userDropLogoutBtn}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
