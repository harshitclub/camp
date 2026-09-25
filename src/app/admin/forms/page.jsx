import FormSubmissions from "@/components/admin/FormSubmissions/FormSubmissions";

export const metadata = {
  title: "Form Inquiries & Leads | Admin Command Center",
  description: "View, inspect, export, and delete candidate submissions across Contact Inquiries, Internship Applications, Corporate Hiring Requests, and Course Registrations on Campussutras.",
};

export default function AdminFormsPage() {
  return <FormSubmissions />;
}
