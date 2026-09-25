"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./ResetPasswordForm.module.css";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, KeyRound, ArrowRight } from "lucide-react";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { updatePassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await updatePassword(password);
      setSuccessMessage("Your password has been successfully updated! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.warn("[Reset Password Error]:", err?.message || err);
      setErrorMessage(err?.message || "Failed to update password. Please try again or request a new reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.header}>
        <div className={styles.iconCircle}>
          <KeyRound size={26} />
        </div>
        <h1 className={styles.title}>Set New Password</h1>
        <p className={styles.subtitle}>
          Create a strong password for your Campussutras account.
        </p>
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
        <div className={styles.inputGroup}>
          <label htmlFor="new-password" className={styles.label}>
            New Password
          </label>
          <div className={styles.inputWrapper}>
            <Lock size={18} className={styles.fieldIcon} />
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className={styles.input}
              required
              autoFocus
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
          <label htmlFor="confirm-new-password" className={styles.label}>
            Confirm New Password
          </label>
          <div className={styles.inputWrapper}>
            <Lock size={18} className={styles.fieldIcon} />
            <input
              id="confirm-new-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type new password"
              className={styles.input}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`btn btn-primary btn-lg ${styles.submitBtn}`}
        >
          {isLoading ? "Updating Password..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
