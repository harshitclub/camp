import { ResetPasswordForm } from "@/components/auth";

export const metadata = {
  title: "Set New Password | Campussutras",
  description: "Set a new password for your Campussutras account.",
};

export default function ResetPasswordPage() {
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
      <ResetPasswordForm />
    </div>
  );
}
