import UserDirectory from "@/components/admin/UserDirectory/UserDirectory";

export const metadata = {
  title: "User & Student Directory | Admin Command Center",
  description: "Manage registered members, inspect verification credentials, and review assessment histories.",
};

export default function AdminUsersPage() {
  return <UserDirectory />;
}
