'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Calculator, Camera, Check, Sparkles, Utensils } from 'lucide-react';
import { CuratedVenue, WEDRAAGA_VENUES } from '@/lib/wedding-data';
import { formatInr } from '@/lib/wedding-logic';

interface VenuesShowcaseProps {
  selectedVenueId: string;
  onSelectVenueForBudget: (venueId: string) => void;
  onFilterGalleryByVenue: (venueName: string) => void;
}

const EXCLUSIVE_SERVICES = [
  {
    index: '01',
    title: 'Exclusive Wedding Venues',
    subtitle: 'Curated on acoustic clarity, guest hospitality & parking capacity',
    description:
      'From Naren Gardens and Sri Convention to Swetha Garden and Rajendra Conventions, we inspect and partner with Hyderabad’s finest conventions and open-air lawns.',
    imageUrl: '/images/wedraaga/cat-venues.jpg',
    meta: '300 to 2,500 Guests · 15+ Verified Properties',
    icon: Sparkles,
  },
  {
    index: '02',
    title: 'Documentary & Candid Photography',
    subtitle: 'Editorial storytelling across Haldi, Sangeet & Muhurtham',
    description:
      'Experienced wedding cinematographers and fine-art photographers who capture unscripted emotion, sacred rituals, and heirloom family portraits.',
    imageUrl: '/images/wedraaga/cat-photography.jpg',
    meta: 'Multi-Camera Cinema · Same-Day Reception Edit',
    icon: Camera,
  },
  {
    index: '03',
    title: 'World-Class Mandap & Floral Decor',
    subtitle: 'Custom architectural stages, lotus urlis & lighting grids',
    description:
      'Bespoke floral installations crafted with fresh Mysore jasmine, Dutch roses, handwoven banana-fiber tapestries, and warm crystal chandeliers.',
    imageUrl: '/images/wedraaga/cat-decoration.jpg',
    meta: '3D Stage Visualization · Custom Floral Rigging',
    icon: Sparkles,
  },
  {
    index: '04',
    title: 'Royal Leaf & Multi-Cuisine Catering',
    subtitle: 'Authentic Telugu pelli bhojanam, Jain counters & live patisserie',
    description:
      'Curated culinary brigades serving traditional banana-leaf Muhurtham feasts, Nizami dawat spreads, and artisanal wedding cakes by Just Bake.',
    imageUrl: '/images/wedraaga/cat-catering.jpg',
    meta: '₹850 – ₹1,600 Per Plate · Dedicated Dietary Counters',
    icon: Utensils,
  },
];

export default function VenuesShowcase({
  selectedVenueId,
  onSelectVenueForBudget,
  onFilterGalleryByVenue,
}: VenuesShowcaseProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bannerParallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '8%']);

  return (
    <section
      id="venues"
      ref={sectionRef}
      className="py-16 lg:py-24 border-b border-[#E7E2DA] bg-[#FAF8F5]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E7E2DA]">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-medium text-[#8C2D38]">
              01. Curated Venues & Signature Services
            </div>
            <h2
              className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1C1917] tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Verified Hyderabad conventions and full-stack wedding craft.
            </h2>
          </div>
          <p className="text-sm sm:text-[15px] text-[#57534E] max-w-md leading-relaxed">
            Every venue and artisan in the WedRaaga directory is vetted for transparent pricing,
            punctual ritual execution, and refined design sensibility.
          </p>
        </div>

        {/* Curated Venues Grid (2x2 Architectural Showcase) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {WEDRAAGA_VENUES.map((venue: CuratedVenue) => {
            const isSelectedForBudget = venue.id === selectedVenueId;
            return (
              <article
                key={venue.id}
                className={`group rounded-2xl bg-white border transition-colors overflow-hidden flex flex-col justify-between ${
                  isSelectedForBudget ? 'border-[#8C2D38]' : 'border-[#E7E2DA]'
                }`}
              >
                <div>
                  {/* Venue Image with subtle hover zoom */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EBE5DC]">
                    <img
                      src={venue.imageUrl}
                      alt={`${venue.name} in ${venue.area}, ${venue.city}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span>
                        {venue.area} · {venue.city}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] tabular-nums">
                        ★ {venue.rating.toFixed(1)} ({venue.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Venue Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1C1917]">
                        {venue.name}
                      </h3>
                      <div className="font-[family-name:var(--font-mono)] tabular-nums text-xs sm:text-sm font-medium text-[#8C2D38]">
                        From {formatInr(venue.basePackageInr)} · {formatInr(venue.perPlateInr)}/plate
                      </div>
                    </div>

                    {/* Zero-pill metadata line */}
                    <div className="text-xs text-[#57534E]">
                      <span>
                        {venue.capacityMin}–{venue.capacityMax} Guests
                      </span>
                      <span className="mx-2" aria-hidden="true">
                        ·
                      </span>
                      <span>{venue.spaces}</span>
                    </div>

                    <p className="text-sm text-[#57534E] leading-relaxed">{venue.description}</p>

                    {/* Highlights as clean inline text items */}
                    <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#1C1917]">
                      {venue.highlights.map((hl) => (
                        <span key={hl} className="inline-flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#8C2D38] shrink-0" />
                          <span>{hl}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#E7E2DA] flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectVenueForBudget(venue.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelectedForBudget
                        ? 'bg-[#8C2D38] text-white'
                        : 'bg-white text-[#1C1917] border border-[#E7E2DA] hover:bg-[#F3EFEA]'
                    }`}
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>
                      {isSelectedForBudget
                        ? 'Active in Budget Estimator'
                        : 'Calculate Venue Budget'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onFilterGalleryByVenue(venue.name.split(' ')[0])}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Inspect in Gallery</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* WedRaaga Exclusive Services Editorial Strip with Parallax Visual Banner */}
        <div className="mt-16 pt-14 border-t border-[#E7E2DA]">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-medium text-[#8C2D38] mb-1">
                WedRaaga Exclusive Services
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                Fourteen specialist categories, one cohesive aesthetic.
              </h3>
            </div>
            <div className="text-xs text-[#57534E]">
              <span>Boutique · Jewellery · Mehendi · Makeup · Pandits · Honeymoon · Gifts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXCLUSIVE_SERVICES.map((srv) => (
              <div
                key={srv.index}
                className="rounded-xl bg-white border border-[#E7E2DA] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[3/2] overflow-hidden bg-[#EBE5DC] relative">
                    <motion.img
                      style={{ y: bannerParallaxY }}
                      src={srv.imageUrl}
                      alt={srv.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-[115%] -top-[7%] relative object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-2.5">
                    <div className="text-xs font-semibold text-[#8C2D38]">
                      {srv.index}. {srv.title}
                    </div>
                    <p className="text-xs font-medium text-[#1C1917]">{srv.subtitle}</p>
                    <p className="text-xs text-[#57534E] leading-relaxed">{srv.description}</p>
                  </div>
                </div>
                <div className="px-5 py-3 border-t border-[#E7E2DA] text-[11px] text-[#57534E] bg-[#FAF8F5]">
                  {srv.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
