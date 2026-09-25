import styles from "./AboutGallery.module.css";
import { realCampusGallery } from "@/data/about";
import { Camera, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutGallery() {
  return (
    <section className={styles.section}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <Camera size={14} className={styles.eyebrowIcon} />
            <span>Campus Moments &amp; Real Sprints</span>
          </div>
          <h2 className={styles.title}>Inside Our Engineering Auditoriums &amp; Labs</h2>
          <p className={styles.subtitle}>
            A glimpse into the energy, hands-on coding sessions, and career orientations held at our partner colleges across India.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className={styles.grid}>
          {realCampusGallery.map((item, idx) => (
            <div key={idx} className={styles.galleryCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.galleryImg}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.locationTag}>
                  <MapPin size={12} />
                  <span>{item.location}</span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardCaption}>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to full gallery */}
        <div className={styles.bottomBar}>
          <Link href="/events" className="btn btn-secondary">
            <span>Explore All Campus Events &amp; Workshops</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
