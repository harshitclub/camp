import { ForgotPasswordForm } from "@/components/auth";

export const metadata = {
  title: "Forgot Password | Campussutras",
  description: "Reset your Campussutras student or admin account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div style={{
      minHeight: "calc(100vh - 140px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3.5rem 1.25rem",
      backgroundColor: "var(--bg-page)",
      background: "radial-gradient(circle at 50% 10%, rgba(11, 87, 208, 0.08) 0%, transparent 60%)",
    }}>
      <ForgotPasswordForm />
    </div>
  );
}
