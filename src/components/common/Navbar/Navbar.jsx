"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./Navbar.module.css";
import { headerNavLinks } from "@/data/navigation";
import { 
  Menu, 
  X, 
  ShieldCheck, 
  User, 
  LogIn, 
  LogOut, 
  ChevronDown, 
  LayoutDashboard, 
  ShieldAlert,
  FileCheck,
  Building2,
  Mail,
  Briefcase,
  Sparkles,
  ArrowRight,
  Calendar
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(true);

  const companyDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, isAdmin, logout, loading } = useAuth();

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setCompanyDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll on mobile when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close dropdowns on outside click / touch
  useEffect(() => {
    function handleClickOutside(event) {
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
        setCompanyDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setIsOpen(false);
    await logout();
    router.push("/login");
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || "Student";
  const firstName = displayName.trim().split(/\s+/)[0] || displayName;
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Helper icon renderer for dropdown items
  const renderDropdownIcon = (iconName) => {
    switch (iconName) {
      case "FileCheck":
        return <FileCheck size={18} className={styles.itemIcon} />;
      case "Calendar":
        return <Calendar size={18} className={styles.itemIcon} />;
      case "Building2":
        return <Building2 size={18} className={styles.itemIcon} />;
      case "Mail":
        return <Mail size={18} className={styles.itemIcon} />;
      case "Briefcase":
        return <Briefcase size={18} className={styles.itemIcon} />;
      default:
        return <Sparkles size={18} className={styles.itemIcon} />;
    }
  };

  // Do not render public website navbar on Admin portal routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className={styles.navWrapper}>
      <div className={`container ${styles.navContainer}`}>
        {/* Brand Logo */}
        <Link href="/" className={styles.logoLink} aria-label="Campussutras Home">
          <img
            src="/media/logo.png"
            alt="Campus Sutras"
            className={styles.logoImg}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.navMenu} aria-label="Primary Navigation">
          <ul className={styles.navLinks}>
            {headerNavLinks.map((item) => {
              if (item.isDropdown) {
                const isChildActive = item.children?.some(
                  (child) => pathname === child.href || (child.href !== "/" && pathname?.startsWith(child.href))
                );

                return (
                  <li 
                    key={item.label} 
                    className={styles.dropdownContainer}
                    ref={companyDropdownRef}
                    onMouseEnter={() => setCompanyDropdownOpen(true)}
                    onMouseLeave={() => setCompanyDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      className={`${styles.navLink} ${styles.dropdownTrigger} ${
                        isChildActive ? styles.navLinkActive : ""
                      }`}
                      onClick={() => setCompanyDropdownOpen((prev) => !prev)}
                      aria-expanded={companyDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`${styles.dropdownChevron} ${
                          companyDropdownOpen ? styles.dropdownChevronOpen : ""
                        }`}
                      />
                    </button>

                    <div 
                      className={`${styles.megaDropdownMenu} ${
                        companyDropdownOpen ? styles.megaDropdownMenuOpen : ""
                      }`} 
                      role="menu"
                    >
                      <div className={`container ${styles.megaInner}`}>
                        {/* Top Header */}
                        <div className={styles.megaHeader}>
                          <span className={styles.megaLabel}>Campussutras Ecosystem</span>
                          <span className={styles.megaSubText}>50,000+ Learners • 50+ Partner Campuses Across India</span>
                        </div>

                        {/* Parallel Horizontal Grid (5 columns) */}
                        <div className={styles.dropdownGrid}>
                          {item.children.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            const isHire = subItem.href === "/hire";
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`${styles.dropdownLinkCard} ${
                                  isSubActive ? styles.dropdownLinkCardActive : ""
                                } ${isHire ? styles.dropdownLinkCardHire : ""}`}
                                role="menuitem"
                                onClick={() => setCompanyDropdownOpen(false)}
                              >
                                <div className={`${styles.itemIconWrapper} ${isHire ? styles.itemIconHire : ""}`}>
                                  {renderDropdownIcon(subItem.icon)}
                                </div>
                                <div className={styles.itemTextWrapper}>
                                  <div className={styles.itemTitleRow}>
                                    <span className={styles.itemTitle}>{subItem.label}</span>
                                    {isHire && <span className={styles.hiringBadge}>Recruiters</span>}
                                    <ArrowRight size={13} className={styles.itemArrow} />
                                  </div>
                                  <span className={styles.itemDescription}>
                                    {subItem.description}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Bottom Banner */}
                        <div className={styles.megaFooter}>
                          <div className={styles.megaFooterLeft}>
                            <Sparkles size={14} className={styles.megaFooterIcon} />
                            <span>Looking for campus training drives, hackathons, or corporate hiring?</span>
                          </div>
                          <Link 
                            href="/hire" 
                            className={styles.megaFooterLink}
                            onClick={() => setCompanyDropdownOpen(false)}
                          >
                            <span>Hire Talent at ₹0 Fee</span>
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions Container (Equal Height & Balanced Width Action Buttons) */}
        <div className={styles.navActions}>
          <Link
            href="/verify-certificate"
            className={styles.verifyBtn}
            title="Verify Student Certificate Authenticity"
          >
            <ShieldCheck size={16} className={styles.verifyIcon} />
            <span>Verify</span>
          </Link>

          {!loading && (
            <>
              {user ? (
                /* Logged In User Profile Pill */
                <div className={styles.userDropdownWrapper} ref={userDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className={styles.userPillBtn}
                    aria-label="User profile menu"
                    aria-expanded={userDropdownOpen}
                  >
                    <div className={styles.userAvatarInitial}>{userInitials}</div>
                    <div className={styles.userMeta}>
                      <span className={styles.userNameText}>{firstName}</span>
                      {isAdmin && <span className={styles.adminBadge}>Admin</span>}
                    </div>
                    <ChevronDown
                      size={14}
                      className={`${styles.chevronIcon} ${
                        userDropdownOpen ? styles.chevronRotated : ""
                      }`}
                    />
                  </button>

                  {userDropdownOpen && (
                    <div className={styles.userDropdownMenu}>
                      <div className={styles.dropdownHeader}>
                        <div className={styles.dropdownUserName}>{displayName}</div>
                        <div className={styles.dropdownUserEmail}>{user.email}</div>
                        {isAdmin && (
                          <div className={styles.adminNotice}>
                            <ShieldAlert size={12} />
                            <span>Administrator</span>
                          </div>
                        )}
                      </div>

                      <div className={styles.dropdownDivider}></div>

                      <Link
                        href="/profile"
                        className={styles.dropdownItem}
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <User size={15} />
                        <span>Profile</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          className={`${styles.dropdownItem} ${styles.adminLinkItem}`}
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <LayoutDashboard size={15} />
                          <span>Admin Portal</span>
                        </Link>
                      )}

                      <div className={styles.dropdownDivider}></div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className={`${styles.dropdownItem} ${styles.logoutItem}`}
                      >
                        <LogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Logged Out: Solid Sign In Button with matching height */
                <Link
                  href="/login"
                  className={styles.signInBtn}
                  title="Sign in to your student account"
                >
                  <LogIn size={16} />
                  <span>Sign In</span>
                </Link>
              )}
            </>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Down Drawer Navigation */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavList}>
            {headerNavLinks.map((item) => {
              if (item.isDropdown) {
                const isChildActive = item.children?.some(
                  (child) => pathname === child.href || (child.href !== "/" && pathname?.startsWith(child.href))
                );

                return (
                  <li key={item.label} className={styles.mobileDropdownGroup}>
                    <button
                      type="button"
                      className={`${styles.mobileNavLink} ${styles.mobileDropdownTrigger} ${
                        isChildActive ? styles.mobileNavLinkActive : ""
                      }`}
                      onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                    >
                      <span className={styles.mobileGroupTitle}>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`${styles.mobileChevron} ${
                          mobileCompanyOpen ? styles.mobileChevronRotated : ""
                        }`}
                      />
                    </button>

                    {mobileCompanyOpen && (
                      <div className={styles.mobileSubList}>
                        {item.children.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`${styles.mobileSubLink} ${
                                isSubActive ? styles.mobileSubLinkActive : ""
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              <div className={styles.mobileSubIcon}>
                                {renderDropdownIcon(subItem.icon)}
                              </div>
                              <div className={styles.mobileSubText}>
                                <span className={styles.mobileSubTitle}>{subItem.label}</span>
                                <span className={styles.mobileSubDesc}>{subItem.description}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              }

              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.mobileActions}>
            <Link
              href="/verify-certificate"
              className={styles.mobileVerifyBtn}
              onClick={() => setIsOpen(false)}
            >
              <ShieldCheck size={18} color="#059669" />
              <span>Verify Certificate</span>
            </Link>

            {user ? (
              <>
                <Link
                  href="/profile"
                  className={styles.mobileProfileBtn}
                  onClick={() => setIsOpen(false)}
                >
                  <User size={18} />
                  <span>Profile ({firstName})</span>
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    className={styles.mobileAdminBtn}
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    <span>Admin Portal</span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className={styles.mobileLogoutBtn}
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className={styles.mobileSignInBtn}
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

