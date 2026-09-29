import CampusDriveManager from "@/components/admin/CampusDriveManager/CampusDriveManager";

export const metadata = {
  title: "Campus Drives & QR Sessions | Admin Command Center",
  description: "Conduct college campus evaluation drives, project live QR codes, and export 100% clean college assessment results directly to Excel.",
};

export default function AdminCampusDrivesPage() {
  return <CampusDriveManager />;
}
