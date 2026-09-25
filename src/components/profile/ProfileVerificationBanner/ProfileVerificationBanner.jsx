"use client";

import { useState } from "react";
import styles from "./ProfileVerificationBanner.module.css";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Mail, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProfileVerificationBanner() {
  const { user, profile, isVerified, resendVerificationEmail, refreshProfile } = useAuth();

  const [isSending, setIsSending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const email = user?.email || "";

  const handleResend = async () => {
    setIsSending(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await resendVerificationEmail();
      setSuccessMsg(`Verification link successfully dispatched to ${email}! Please check your inbox (and spam/junk folder) and click the confirmation link.`);
    } catch (err) {
      console.error("[Resend Verification Error]:", err);
      const msg = err?.message || "";
      if (msg.toLowerCase().includes("rate limit") || err?.status === 429) {
        setErrorMsg("Email request rate limit reached. Please wait 60 seconds before requesting another email.");
      } else if (msg.toLowerCase().includes("already confirmed")) {
        setSuccessMsg("Your email is already confirmed! Please click 'Check Status' to refresh.");
      } else {
        setErrorMsg(msg || "Failed to send verification email. Please verify your SMTP settings in Supabase.");
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await refreshProfile();
      const updatedUser = res?.user || user;
      const isNowVerified = Boolean(
        res?.profile?.is_verified || 
        updatedUser?.email_confirmed_at || 
        updatedUser?.confirmed_at ||
        updatedUser?.user_metadata?.is_verified
      );

      if (isNowVerified) {
        setSuccessMsg("Success! Your email and account are authenticated and verified.");
      } else {
        setErrorMsg("Email is not verified yet. Please check your email inbox and click the confirmation link, then click Check Status.");
      }
    } catch (err) {
      setErrorMsg("Failed to check status. Please reload the page.");
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isVerified) {
    return (
      <div className={styles.verifiedCard}>
        <div className={styles.verifiedIconWrap}>
          <ShieldCheck size={20} />
        </div>
        <div className={styles.verifiedTextWrap}>
          <span className={styles.verifiedTitle}>Account &amp; Email Authenticated</span>
          <span className={styles.verifiedDesc}>
            Your profile is verified. You are eligible for official Bootcamp certificates and assessment transcripts.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.unverifiedCard}>
      <div className={styles.unverifiedContent}>
        <div className={styles.iconWrap}>
          <ShieldAlert size={22} />
        </div>

        <div className={styles.textWrap}>
          <h3 className={styles.title}>Account Verification Pending</h3>
          <p className={styles.desc}>
            Your registered email <strong className={styles.emailHighlight}>{email}</strong> has not been confirmed yet. 
            Confirm your email to secure your account and unlock official assessment transcripts.
          </p>

          {successMsg && (
            <div className={styles.alertSuccess}>
              <CheckCircle2 size={16} className={styles.alertIconSuccess} />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className={styles.alertError}>
              <AlertCircle size={16} className={styles.alertIconError} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actionsGroup}>
        <button
          type="button"
          onClick={handleResend}
          disabled={isSending}
          className={`btn btn-sm ${styles.resendBtn}`}
        >
          {isSending ? (
            <span className={styles.loadingWrap}>
              <span className={styles.spinner}></span>
              <span>Sending Email...</span>
            </span>
          ) : (
            <>
              <Mail size={14} />
              <span>Resend Verification Link</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`btn btn-sm ${styles.checkBtn}`}
        >
          <RefreshCw size={14} className={isRefreshing ? styles.spinning : ""} />
          <span>Check Status</span>
        </button>
      </div>
    </div>
  );
}
