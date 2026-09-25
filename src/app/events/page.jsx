import { EventsHero, EventsGallery, EventsHostCta } from "@/components/events";
import { CtaBanner } from "@/components/home";

export const metadata = {
  title: "Campus Workshops, Hackathons & Tech Events Gallery",
  description: "Explore real memories and moments from Campussutras' campus bootcamps, Generative AI labs, Power BI data analytics sprints, and placement masterclasses across 50+ partner colleges.",
  keywords: "Campussutras events, campus bootcamps, college workshops, AI masterclasses, Power BI training, Flutter bootcamp, summer training photos, edtech gallery India",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events & Workshops Gallery | Campussutras",
    description: "Visual tour of Campussutras practical bootcamps, hackathons, and campus training sessions.",
    url: "https://campussutras.com/events",
    siteName: "Campussutras",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Workshops Gallery | Campussutras",
    description: "Visual tour of Campussutras practical bootcamps, hackathons, and campus training sessions.",
  },
};

export default function EventsPage() {
  return (
    <>
      {/* 1. Cinematic Dark-Navy Header & Impact Stats */}
      <EventsHero />

      {/* 2. Interactive Workshop Showcase, Category Explorer & Lightbox */}
      <EventsGallery />

      {/* 3. Host a Campus Bootcamp / MoU Partnership Banner */}
      <EventsHostCta />

      {/* 4. Bottom Quick Enrollment Banner */}
      <CtaBanner />
    </>
  );
}
