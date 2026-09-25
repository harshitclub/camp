import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/common";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#002255",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://campussutras.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Campussutras | Industry Bootcamps & Practical Tech Training",
    template: "%s | Campussutras",
  },
  description: "Campussutras is India's premier workforce-training and EdTech platform bridging academia and practical industry expectations through intensive 90-day technical bootcamps, project-based internships, and verified credentials.",
  keywords: [
    "EdTech India",
    "Technical Bootcamps",
    "90 Day Coding Bootcamp",
    "Full Stack Web Development",
    "Generative AI Course",
    "Data Analytics Power BI",
    "Python AI Training",
    "Project Based Internships",
    "Campus to Corporate",
    "Certificate Verification",
    "Campussutras"
  ],
  authors: [{ name: "Campussutras Engineering", url: SITE_URL }],
  creator: "Campussutras Private Limited",
  publisher: "Campussutras Private Limited",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Campussutras",
    title: "Campussutras — Bridge the College to Industry Gap",
    description: "Hands-on 90-day technical bootcamps, project-based internships, and verified credentials for university students.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campussutras | Industry Bootcamps & Tech Training",
    description: "Hands-on 90-day technical bootcamps, project-based internships, and verified credentials.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body>
        <AuthProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
