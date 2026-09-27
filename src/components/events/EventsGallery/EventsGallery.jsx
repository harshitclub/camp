"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./EventsGallery.module.css";
import { eventCategories, allEvents } from "@/data/events";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  LayoutGrid, 
  Film, 
  Search, 
  Images,
  Sparkles,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import Link from "next/link";

// Helper to serve WebP/AVIF, quality-compressed, and bounded width images from Cloudinary
function optimizeCloudinary(url, width = 800) {
  if (!url || typeof url !== "string") return url;
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
}

export default function EventsGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("showcase"); // 'showcase' | 'masonry'
  
  // Per-card active image index map { [eventId]: activeImageIndex }
  const [activeCardImages, setActiveCardImages] = useState({});

  // Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Filter events based on active category and search
  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory;
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate category count
  const getCategoryCount = (catId) => {
    if (catId === "all") return allEvents.length;
    return allEvents.filter((e) => e.category === catId).length;
  };

  // Flattened photos for masonry view
  const allFlattenedPhotos = filteredEvents.flatMap((event) => 
    event.images.map((img) => ({
      ...img,
      eventTitle: event.title,
      eventCategory: event.categoryLabel,
      eventDate: event.date,
      eventId: event.id,
      eventObject: event,
    }))
  );

  // In-Card Image Switcher Handler
  const handleCardImageSelect = (eventId, imgIdx) => {
    setActiveCardImages((prev) => ({
      ...prev,
      [eventId]: imgIdx,
    }));
  };

  // Lightbox Handlers
  const openLightbox = (event, index = 0) => {
    setCurrentEvent(event);
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentEvent(null);
    setPhotoIndex(0);
  };

  const nextPhoto = useCallback(() => {
    if (!currentEvent) return;
    setPhotoIndex((prev) => (prev + 1) % currentEvent.images.length);
  }, [currentEvent]);

  const prevPhoto = useCallback(() => {
    if (!currentEvent) return;
    setPhotoIndex((prev) => (prev - 1 + currentEvent.images.length) % currentEvent.images.length);
  }, [currentEvent]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextPhoto, prevPhoto]);

  // Lock background scroll when modal open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  return (
    <section className={styles.gallerySection}>
      <div className="container">
        {/* Navigation Toolbar */}
        <div className={styles.controlsBar}>
          {/* Categories Tab Row */}
          <div className={styles.categoryTabs}>
            {eventCategories.map((cat) => {
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`${styles.tabBtn} ${activeCategory === cat.id ? styles.tabBtnActive : ""}`}
                >
                  <span>{cat.label}</span>
                  <span className={styles.countBadge}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search and Layout Switcher */}
          <div className={styles.toolsRow}>
            <div className={styles.searchWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search event topics, technologies, or venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={styles.clearSearchBtn}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className={styles.viewSwitch}>
              <button
                type="button"
                onClick={() => setViewMode("showcase")}
                className={`${styles.switchBtn} ${viewMode === "showcase" ? styles.switchBtnActive : ""}`}
              >
                <Film size={15} />
                <span>Showcase View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("masonry")}
                className={`${styles.switchBtn} ${viewMode === "masonry" ? styles.switchBtnActive : ""}`}
              >
                <LayoutGrid size={15} />
                <span>Photo Wall ({allFlattenedPhotos.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className={styles.emptyCard}>
            <Images size={44} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No Matching Events</h3>
            <p className={styles.emptyText}>
              No events matched &quot;{searchQuery}&quot;. Please try a different category or search keyword.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '1rem' }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* View Mode 1: Interactive Showcase View */}
        {viewMode === "showcase" && filteredEvents.length > 0 && (
          <div className={styles.showcaseGrid}>
            {filteredEvents.map((event) => {
              const activeIdx = activeCardImages[event.id] || 0;
              const activeImg = event.images[activeIdx] || event.images[0];

              return (
                <div key={event.id} className={styles.showcaseCard}>
                  {/* Left Column: Interactive Main Photo Stage with Thumbnails */}
                  <div className={styles.stageCol}>
                    <div 
                      className={styles.mainStageWrap}
                      onClick={() => openLightbox(event, activeIdx)}
                    >
                      <img
                        src={optimizeCloudinary(activeImg.url, 900)}
                        alt={activeImg.caption || event.title}
                        className={styles.stageImg}
                        loading="lazy"
                      />

                      {/* Glassmorphic Overlay Tags */}
                      <div className={styles.stageTopTags}>
                        <span className={styles.stageCatPill}>{event.categoryLabel}</span>
                        <span className={styles.stageCounter}>
                          Photo {activeIdx + 1} / {event.images.length}
                        </span>
                      </div>

                      <div className={styles.stageBottomOverlay}>
                        <div className={styles.stageCaption}>
                          {activeImg.caption || `${event.title} - Live Session`}
                        </div>
                        <div className={styles.zoomPill}>
                          <Maximize2 size={13} />
                          <span>Click to Zoom</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Thumbnail Carousel Strip */}
                    <div className={styles.thumbsStrip}>
                      {event.images.map((img, idx) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => handleCardImageSelect(event.id, idx)}
                          className={`${styles.thumbBtn} ${idx === activeIdx ? styles.thumbBtnActive : ""}`}
                          aria-label={`Show photo ${idx + 1}`}
                        >
                          <img src={optimizeCloudinary(img.url, 180)} alt={`Thumbnail ${idx + 1}`} className={styles.thumbMiniImg} loading="lazy" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Event Narrative & Information */}
                  <div className={styles.infoCol}>
                    <div className={styles.headerRow}>
                      <span className={styles.eventHighlightBadge}>{event.badge}</span>
                      <span className={styles.dateTag}>{event.date}</span>
                    </div>

                    <h3 className={styles.cardTitle}>{event.title}</h3>
                    <div className={styles.cardSubtitle}>{event.subtitle}</div>

                    <div className={styles.metaRow}>
                      <div className={styles.metaItem}>
                        <MapPin size={14} className={styles.metaIcon} />
                        <span>{event.location}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <Users size={14} className={styles.metaIcon} />
                        <span>{event.attendees}</span>
                      </div>
                    </div>

                    <p className={styles.cardDescription}>{event.description}</p>

                    <div className={styles.cardFooterActions}>
                      <button
                        type="button"
                        onClick={() => openLightbox(event, activeIdx)}
                        className={`btn btn-primary ${styles.openGalleryBtn}`}
                      >
                        <Images size={16} />
                        <span>View All {event.images.length} Photos</span>
                      </button>

                      <Link href="/contact" className={styles.inviteLink}>
                        <span>Host Workshop at Your Campus →</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode 2: Pinterest / Masonry Photo Wall */}
        {viewMode === "masonry" && allFlattenedPhotos.length > 0 && (
          <div className={styles.masonryWall}>
            {allFlattenedPhotos.map((photo, idx) => (
              <div
                key={`${photo.eventId}-${photo.id}-${idx}`}
                className={styles.masonryCard}
                onClick={() => {
                  const targetEvent = allEvents.find((e) => e.id === photo.eventId);
                  const imgIdx = targetEvent.images.findIndex((img) => img.id === photo.id);
                  openLightbox(targetEvent, imgIdx >= 0 ? imgIdx : 0);
                }}
              >
                <img
                  src={optimizeCloudinary(photo.url, 600)}
                  alt={photo.caption || photo.eventTitle}
                  className={styles.masonryImg}
                  loading="lazy"
                />
                <div className={styles.masonryHoverOverlay}>
                  <div className={styles.masonryTop}>
                    <span className={styles.masonryBadge}>{photo.eventCategory}</span>
                    <span className={styles.masonryZoomBtn}>
                      <Maximize2 size={14} />
                    </span>
                  </div>
                  <div className={styles.masonryBottom}>
                    <div className={styles.masonryTitle}>{photo.eventTitle}</div>
                    <div className={styles.masonryCaption}>{photo.caption}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && currentEvent && (
        <div className={styles.lightboxBackdrop} onClick={closeLightbox}>
          <div 
            className={styles.lightboxDialog} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Bar */}
            <div className={styles.dialogHeader}>
              <div className={styles.dialogTitleGroup}>
                <span className={styles.dialogBadge}>{currentEvent.categoryLabel}</span>
                <h3 className={styles.dialogTitle} title={currentEvent.title}>
                  {currentEvent.title}
                </h3>
              </div>

              <div className={styles.dialogActions}>
                <span className={styles.counterText}>
                  {photoIndex + 1} / {currentEvent.images.length}
                </span>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className={styles.closeModalBtn}
                  aria-label="Close Preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Stage */}
            <div className={styles.dialogStage}>
              <button
                type="button"
                onClick={prevPhoto}
                className={`${styles.navControl} ${styles.prevControl}`}
                aria-label="Previous Photo"
              >
                <ChevronLeft size={26} />
              </button>

              <div className={styles.stageFrame}>
                <img
                  src={optimizeCloudinary(currentEvent.images[photoIndex].url, 1400)}
                  alt={currentEvent.images[photoIndex].caption || currentEvent.title}
                  className={styles.dialogImg}
                />
              </div>

              <button
                type="button"
                onClick={nextPhoto}
                className={`${styles.navControl} ${styles.nextControl}`}
                aria-label="Next Photo"
              >
                <ChevronRight size={26} />
              </button>
            </div>

            {/* Caption & Thumbnails Tray */}
            <div className={styles.dialogFooter}>
              <p className={styles.dialogCaption}>
                {currentEvent.images[photoIndex].caption || `${currentEvent.title} (${currentEvent.date})`}
              </p>

              <div className={styles.thumbsTray}>
                {currentEvent.images.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setPhotoIndex(idx)}
                    className={`${styles.trayThumb} ${idx === photoIndex ? styles.trayThumbActive : ""}`}
                  >
                    <img src={optimizeCloudinary(img.url, 140)} alt={`Photo ${idx + 1}`} className={styles.trayImg} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
