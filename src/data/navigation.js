export const headerNavLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Internship", href: "/internship" },
  {
    label: "Company",
    isDropdown: true,
    children: [
      {
        label: "Assessments",
        href: "/assessments",
        description: "Timed skill tests & practical domain challenges",
        icon: "FileCheck",
      },
      {
        label: "About Us",
        href: "/about",
        description: "Our story, multi-stream vision & mentorship",
        icon: "Building2",
      },
      {
        label: "Hire From Us",
        href: "/hire",
        description: "Hire pre-vetted freshers & interns at zero fee",
        icon: "Briefcase",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Connect with our admissions & advisory team",
        icon: "Mail",
      },
    ],
  },
];

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "Hire From Us", href: "/hire" },
  { label: "All Bootcamps", href: "/courses" },
  { label: "Assessments", href: "/assessments" },
  { label: "Internship Program", href: "/internship" },
  { label: "Events & Workshops", href: "/events" },
  { label: "About Campussutras", href: "/about" },
  { label: "Verify Certificate", href: "/verify-certificate" },
  { label: "Contact & Support", href: "/contact" },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-and-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Certificate Verification", href: "/verify-certificate" },
];
