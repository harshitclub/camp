"use client";

import { useState } from "react";
import styles from "./ProfileSecurityTab.module.css";
import { 
  Lock, 
  Eye, 
  EyeOff, 
  KeyRound, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Shield, 
  Clock, 
  Mail,
  Fingerprint
} from "lucide-react";

export default function ProfileSecurityTab({ user, onPasswordUpdated }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const createdDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })
    : "Active";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-type.");
      return;
    }

    setIsLoading(true);

    try {
      if (onPasswordUpdated) {
        await onPasswordUpdated(password);
      }
      setSuccessMessage("Password has been successfully changed!");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.warn("[Password Change Error]:", err?.message || err);
      setErrorMessage(err?.message || "Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Change Password Card */}
      <div className={styles.tabContentCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerIconWrap}>
            <KeyRound size={22} className={styles.headerIcon} />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Change Password</h2>
            <p className={styles.sectionDesc}>
              Update your account password. We recommend choosing a strong password with letters, numbers, and special symbols.
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className={styles.alertError}>
            <AlertCircle size={18} className={styles.alertIcon} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className={styles.alertSuccess}>
            <CheckCircle2 size={18} className={styles.alertIconSuccess} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <label htmlFor="newPassword" className={styles.label}>
                New Password <span className={styles.reqStar}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.fieldIcon} />
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeBtn}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmNewPassword" className={styles.label}>
                Confirm New Password <span className={styles.reqStar}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.fieldIcon} />
                <input
                  id="confirmNewPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.actionsRow}>
            <button
              type="submit"
              disabled={isLoading || !password}
              className={`btn btn-primary ${styles.submitBtn}`}
            >
              {isLoading ? (
                <span className={styles.loadingWrap}>
                  <span className={styles.spinner}></span>
                  <span>Updating Password...</span>
                </span>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Account Security Overview Card */}
      <div className={styles.securityMetaCard}>
        <h3 className={styles.metaCardTitle}>
          <Fingerprint size={18} />
          <span>Account Security Information</span>
        </h3>
        
        <div className={styles.metaList}>
          <div className={styles.metaItem}>
            <div className={styles.metaItemIcon}>
              <Mail size={16} />
            </div>
            <div className={styles.metaItemBody}>
              <span className={styles.metaItemLabel}>Primary Authentication Email</span>
              <span className={styles.metaItemValue}>{user?.email || "N/A"}</span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <div className={styles.metaItemIcon}>
              <Clock size={16} />
            </div>
            <div className={styles.metaItemBody}>
              <span className={styles.metaItemLabel}>Account Registered On</span>
              <span className={styles.metaItemValue}>{createdDate}</span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <div className={styles.metaItemIcon}>
              <Shield size={16} />
            </div>
            <div className={styles.metaItemBody}>
              <span className={styles.metaItemLabel}>Session Provider</span>
              <span className={styles.metaItemValue}>Supabase Secure Auth (PKCE)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
