import CertificateManagement from "@/components/admin/CertificateManagement/CertificateManagement";

export const metadata = {
  title: "Certificate Management | Campussutras Admin Console",
  description: "Upload, manage, and verify official student certificates stored in Supabase PostgreSQL.",
};

export default function AdminCertificatesPage() {
  return <CertificateManagement />;
}
