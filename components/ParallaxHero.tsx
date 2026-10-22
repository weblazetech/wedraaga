'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { RsvpSummaryMetrics } from '@/lib/wedding-logic';

interface FeaturedShowcaseWedding {
  id: string;
  couple: string;
  dateLabel: string;
  venueName: string;
  location: string;
  primaryImage: string;
  secondaryImage: string;
  storyNote: string;
  guestCountLabel: string;
}

const FEATURED_WEDDINGS: FeaturedShowcaseWedding[] = [
  {
    id: 'ananya-siddharth',
    couple: 'Ananya & Siddharth',
    dateLabel: '24 November 2026 · Muhurtham 09:42 AM',
    venueName: 'Naren Gardens Convention',
    location: 'Miyapur, Hyderabad',
    primaryImage: '/images/wedraaga/hero-wedding-1.jpg',
    secondaryImage: '/images/wedraaga/cat-decoration.jpg',
    storyNote:
      'A three-day Telugu celebration blending heirloom Kanjeevaram traditions with minimalist lotus and brass mandap architecture.',
    guestCountLabel: '650 Guests · 4 Ceremonies',
  },
  {
    id: 'rhea-vikramaditya',
    couple: 'Rhea & Vikramaditya',
    dateLabel: '12 December 2026 · Twilight Sangeet & Pelli',
    venueName: 'Sri Convention Hall',
    location: 'Kukatpally, Hyderabad',
    primaryImage: '/images/wedraaga/hero-wedding-3.jpg',
    secondaryImage: '/images/wedraaga/venue-sri.png',
    storyNote:
      'Candlelit courtyard Sangeet followed by a sacred morning Jeelakarra Bellam ceremony under a custom jasmine canopy.',
    guestCountLabel: '1,100 Guests · 3 Ceremonies',
  },
  {
    id: 'kavya-rohith',
    couple: 'Kavya & Rohith',
    dateLabel: '18 January 2027 · Starlight Garden Reception',
    venueName: 'Swetha Garden & Conventions',
    location: 'Kompally, Hyderabad',
    primaryImage: '/images/wedraaga/gallery-1.jpg',
    secondaryImage: '/images/wedraaga/venue-swetha.jpg',
    storyNote:
      'An open-air botanical celebration with live Carnatic flute ensembles, organic henna artistry, and curated leaf dining.',
    guestCountLabel: '800 Guests · 4 Ceremonies',
  },
];

interface ParallaxHeroProps {
  rsvpMetrics: RsvpSummaryMetrics;
  shortlistedCount: number;
  onNavigateRsvp: () => void;
  onNavigateGallery: () => void;
}

export default function ParallaxHero({
  rsvpMetrics,
  shortlistedCount,
  onNavigateRsvp,
  onNavigateGallery,
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeWeddingIdx, setActiveWeddingIdx] = useState(0);
  const activeWedding = FEATURED_WEDDINGS[activeWeddingIdx];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Compositor-only transform animations for smooth parallax scrolling
  const primaryImageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const secondaryCardY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const textFadeOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.88]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative overflow-hidden border-b border-[#E7E2DA] bg-[#FAF8F5] pt-8 pb-14 lg:pt-14 lg:pb-20"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Editorial Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy & Interactive Celebration Switcher */}
          <motion.div
            style={{ opacity: textFadeOpacity }}
            className="lg:col-span-6 flex flex-col justify-between py-2"
          >
            <div className="space-y-6">
              {/* Quiet unboxed kicker with typographic separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] font-medium text-[#57534E]">
                <span>Hyderabad, Telangana</span>
                <span aria-hidden="true">·</span>
                <span>Bespoke Wedding Planning & Venue Curation</span>
                <span aria-hidden="true">·</span>
                <span>wedraaga.com</span>
              </div>

              <h1
                className="font-[family-name:var(--font-display)] font-semibold text-[#1C1917] tracking-tight leading-[1.08]"
                style={{
                  fontSize: 'clamp(2.35rem, 4.2vw, 3.85rem)',
                  textWrap: 'balance',
                }}
              >
                Timeless Indian weddings, orchestrated with quiet precision.
              </h1>

              <p className="text-[15px] sm:text-base text-[#57534E] leading-[1.68] max-w-[62ch]">
                From Hyderabad’s premier pillarless conventions and starlight lawns to documentary
                photography, floral mandap architecture, and live guest RSVP seating management—plan
                every ritual in one calm, unified studio.
              </p>

              {/* Interactive Couple / Celebration Preview Selector */}
              <div className="pt-2 space-y-3">
                <div className="text-xs font-medium text-[#57534E]">
                  Preview Curated WedRaaga Celebration:
                </div>
                <div
                  role="tablist"
                  aria-label="Featured Wedding Celebrations"
                  className="flex items-center gap-1 p-1 bg-[#F3EFEA] rounded-lg border border-[#E7E2DA] overflow-x-auto max-w-full"
                >
                  {FEATURED_WEDDINGS.map((w, idx) => {
                    const isSelected = idx === activeWeddingIdx;
                    return (
                      <button
                        key={w.id}
                        role="tab"
                        type="button"
                        aria-selected={isSelected}
                        onClick={() => setActiveWeddingIdx(idx)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-white text-[#1C1917] shadow-xs border border-[#E7E2DA]'
                            : 'text-[#57534E] hover:text-[#1C1917]'
                        }`}
                      >
                        {w.couple}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Celebration Editorial Brief */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E7E2DA] space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]">
                    <span className="inline-flex items-center gap-1.5 font-medium text-[#1C1917]">
                      <Calendar className="w-3.5 h-3.5 text-[#8C2D38]" />
                      {activeWedding.dateLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#57534E]">
                      <MapPin className="w-3.5 h-3.5 text-[#8C2D38]" />
                      {activeWedding.venueName} · {activeWedding.location}
                    </span>
                  </div>
                  <p className="text-sm text-[#57534E] leading-relaxed">
                    {activeWedding.storyNote}
                  </p>
                  <div className="text-xs text-[#57534E] pt-1">
                    <span>{activeWedding.guestCountLabel}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>Full-Service WedRaaga Production</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary & Secondary Action Row */}
            <div className="pt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onNavigateRsvp}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#8C2D38] rounded-lg hover:bg-[#73222C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Manage Guest RSVPs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onNavigateGallery}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#1C1917] bg-white border border-[#E7E2DA] rounded-lg hover:bg-[#F3EFEA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore Memories Gallery</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Dual-Layer Smooth Parallax Photography Frame */}
          <div className="lg:col-span-6 relative min-h-[420px] sm:min-h-[500px] lg:h-full flex items-center">
            <div className="relative w-full h-full min-h-[420px] sm:min-h-[500px] rounded-2xl overflow-hidden border border-[#E7E2DA] bg-[#EBE5DC]">
              <motion.div
                style={{ y: primaryImageY }}
                className="absolute inset-0 w-full h-[116%] -top-[8%]"
              >
                <img
                  src={activeWedding.primaryImage}
                  alt={`${activeWedding.couple} — ${activeWedding.venueName} wedding portrait`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-opacity duration-300"
                />
                {/* Measured contrast scrim for bottom caption legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              </motion.div>

              {/* Bottom Left Caption Overlay on Primary Frame (padded right on sm+ so inset card never collides) */}
              <div className="absolute bottom-0 left-0 right-0 sm:pr-64 p-5 sm:p-6 text-white z-10">
                <div className="text-xs text-white/85 mb-1">
                  <span>Featured Celebration</span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>{activeWedding.venueName}</span>
                </div>
                <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-medium tracking-tight">
                  {activeWedding.couple}
                </p>
              </div>
            </div>

            {/* Secondary Parallax Offset Inset Card docked at bottom-right so caption on bottom-left is 100% unobstructed */}
            <motion.div
              style={{ y: secondaryCardY }}
              className="hidden sm:block absolute -bottom-4 right-4 w-52 md:w-56 rounded-xl overflow-hidden bg-white border border-[#E7E2DA] shadow-md z-20 p-2.5"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F3EFEA]">
                <img
                  src={activeWedding.secondaryImage}
                  alt={`${activeWedding.venueName} floral and mandap stage`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2 px-1">
                <div className="text-[11px] text-[#57534E]">
                  <span>Mandap & Stage</span>
                  <span className="mx-1.5" aria-hidden="true">
                    ·
                  </span>
                  <span>WedRaaga Decor</span>
                </div>
                <div className="text-xs font-semibold text-[#1C1917] truncate">
                  {activeWedding.venueName}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof & Live Studio Bar Below the Hero Split */}
        <div className="mt-12 pt-8 border-t border-[#E7E2DA] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="font-[family-name:var(--font-mono)] tabular-nums text-2xl sm:text-3xl font-medium text-[#1C1917]">
              15+ Venues
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[#57534E]">
              Verified convention halls & botanical lawns across Hyderabad (350–2,500 guests)
            </p>
          </div>

          <div>
            <div className="font-[family-name:var(--font-mono)] tabular-nums text-2xl sm:text-3xl font-medium text-[#1C1917]">
              14 Disciplines
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[#57534E]">
              In-house photography, mandap decor, catering, bridal makeup, mehendi & pandits
            </p>
          </div>

          <div>
            <div
              data-testid="hero-confirmed-guests"
              className="font-[family-name:var(--font-mono)] tabular-nums text-2xl sm:text-3xl font-medium text-[#8C2D38]"
            >
              {rsvpMetrics.confirmedHeadcount} Confirmed
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[#57534E]">
              Live RSVP headcount ({rsvpMetrics.attendanceRatePercent}% positive response rate across{' '}
              {rsvpMetrics.totalParties} households)
            </p>
          </div>

          <div>
            <div
              data-testid="hero-shortlisted-count"
              className="font-[family-name:var(--font-mono)] tabular-nums text-2xl sm:text-3xl font-medium text-[#1C1917]"
            >
              {shortlistedCount} Saved
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[#57534E]">
              Curated inspiration frames & venues saved to your personal wedding board
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
