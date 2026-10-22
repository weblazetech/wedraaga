'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Expand,
  Grid,
  LayoutGrid,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import {
  GalleryCategory,
  GalleryItem,
  WEDRAAGA_GALLERY_ITEMS,
} from '@/lib/wedding-data';
import { filterGalleryItems } from '@/lib/wedding-logic';

const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Venues & Architecture',
  'Candid Photography',
  'Floral & Mandap Decor',
  'Bridal & Mehendi',
  'Culinary & Banquets',
];

interface DynamicGalleryProps {
  externalSearchQuery: string;
  onClearExternalSearch: () => void;
  shortlistedIds: string[];
  onToggleShortlist: (id: string) => void;
}

export default function DynamicGallery({
  externalSearchQuery,
  onClearExternalSearch,
  shortlistedIds,
  onToggleShortlist,
}: DynamicGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyShortlisted, setOnlyShortlisted] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'compact'>('editorial');
  const [lightboxItemId, setLightboxItemId] = useState<string | null>(null);

  // Sync external search query when user clicks "Inspect in Gallery" from Venues
  useEffect(() => {
    if (externalSearchQuery) {
      setSearchQuery(externalSearchQuery);
      setActiveCategory('All');
      setOnlyShortlisted(false);
    }
  }, [externalSearchQuery]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax offset for middle column on desktop editorial masonry
  const middleColY = useTransform(scrollYProgress, [0, 1], ['0px', '-28px']);

  const filteredItems = filterGalleryItems(
    WEDRAAGA_GALLERY_ITEMS,
    {
      category: activeCategory,
      searchQuery,
      onlyShortlisted,
    },
    shortlistedIds
  );

  const activeLightboxIndex = lightboxItemId
    ? filteredItems.findIndex((item) => item.id === lightboxItemId)
    : -1;
  const activeLightboxItem: GalleryItem | null =
    activeLightboxIndex >= 0
      ? filteredItems[activeLightboxIndex]
      : lightboxItemId
      ? WEDRAAGA_GALLERY_ITEMS.find((i) => i.id === lightboxItemId) ?? null
      : null;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxItemId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItemId(null);
      } else if (e.key === 'ArrowRight' && filteredItems.length > 1) {
        const nextIdx = (activeLightboxIndex + 1) % filteredItems.length;
        setLightboxItemId(filteredItems[nextIdx].id);
      } else if (e.key === 'ArrowLeft' && filteredItems.length > 1) {
        const prevIdx =
          (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
        setLightboxItemId(filteredItems[prevIdx].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItemId, activeLightboxIndex, filteredItems]);

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setOnlyShortlisted(false);
    onClearExternalSearch();
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-16 lg:py-24 border-b border-[#E7E2DA] bg-[#F3EFEA]/60"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-medium text-[#8C2D38]">
              02. Dynamic Memories & Portfolio Gallery
            </div>
            <h2
              className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1C1917] tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Real moments, venues, and floral architecture from WedRaaga.
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#57534E]">
            <span
              data-testid="gallery-visible-count"
              className="font-[family-name:var(--font-mono)] tabular-nums font-medium text-[#1C1917]"
            >
              Showing {filteredItems.length} of {WEDRAAGA_GALLERY_ITEMS.length} frames
            </span>
            <span aria-hidden="true">·</span>
            <span>Click any frame for full-resolution lightbox</span>
          </div>
        </div>

        {/* Interactive Filter & Search Control Bar */}
        <div className="bg-white rounded-xl border border-[#E7E2DA] p-3 sm:p-4 mb-10 space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Category Filter Segmented Buttons (horizontally scrollable on mobile) */}
            <div
              role="tablist"
              aria-label="Gallery Category Filter"
              className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 no-scrollbar"
            >
              {GALLERY_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                const count =
                  category === 'All'
                    ? WEDRAAGA_GALLERY_ITEMS.length
                    : WEDRAAGA_GALLERY_ITEMS.filter((i) => i.category === category).length;
                return (
                  <button
                    key={category}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#8C2D38] text-white'
                        : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFEA]'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`ml-1.5 font-[family-name:var(--font-mono)] tabular-nums text-[11px] ${
                        isActive ? 'text-white/85' : 'text-[#57534E]'
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input, Saved Board Filter & Density Switcher */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  aria-label="Search gallery memories by couple, venue, or style"
                  placeholder="Search couple, venue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] placeholder:text-[#57534E]/70 focus:outline-none focus:border-[#8C2D38]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear gallery search"
                    onClick={() => {
                      setSearchQuery('');
                      onClearExternalSearch();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#57534E] hover:text-[#1C1917]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                aria-pressed={onlyShortlisted}
                onClick={() => setOnlyShortlisted((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  onlyShortlisted
                    ? 'bg-[#1C1917] text-white border-[#1C1917]'
                    : 'bg-[#FAF8F5] text-[#1C1917] border-[#E7E2DA] hover:bg-[#F3EFEA]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved Board</span>
                <span className="font-[family-name:var(--font-mono)] tabular-nums">
                  ({shortlistedIds.length})
                </span>
              </button>

              <div
                role="group"
                aria-label="Gallery layout density"
                className="hidden sm:inline-flex items-center p-0.5 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
              >
                <button
                  type="button"
                  aria-label="Editorial masonry view"
                  aria-pressed={layoutMode === 'editorial'}
                  onClick={() => setLayoutMode('editorial')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    layoutMode === 'editorial'
                      ? 'bg-white text-[#1C1917] shadow-2xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Compact uniform grid view"
                  aria-pressed={layoutMode === 'compact'}
                  onClick={() => setLayoutMode('compact')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    layoutMode === 'compact'
                      ? 'bg-white text-[#1C1917] shadow-2xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State if filters match 0 items */}
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl bg-white border border-[#E7E2DA] p-12 text-center max-w-lg mx-auto my-6 space-y-4">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1C1917]">
              No wedding memories match your current filter.
            </p>
            <p className="text-sm text-[#57534E]">
              Try clearing your search term or switching back to all WedRaaga categories.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#8C2D38] rounded-lg hover:bg-[#73222C] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Gallery Filters</span>
            </button>
          </div>
        ) : (
          /* Responsive Dynamic Gallery Grid */
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              layoutMode === 'editorial'
                ? 'lg:grid-cols-3 gap-6 lg:gap-7'
                : 'lg:grid-cols-4 gap-5'
            }`}
          >
            {filteredItems.map((item, idx) => {
              const isShortlisted = shortlistedIds.includes(item.id);
              const isMiddleColumn = layoutMode === 'editorial' && idx % 3 === 1;

              return (
                <motion.article
                  key={item.id}
                  style={isMiddleColumn ? { y: middleColY } : undefined}
                  className="group rounded-2xl bg-white border border-[#E7E2DA] overflow-hidden flex flex-col justify-between transition-colors hover:border-[#8C2D38]/50"
                >
                  <div>
                    {/* Image Frame */}
                    <div
                      className={`relative overflow-hidden bg-[#EBE5DC] ${
                        layoutMode === 'compact'
                          ? 'aspect-[4/3]'
                          : item.aspect === 'tall'
                          ? 'aspect-[4/4.6]'
                          : item.aspect === 'wide'
                          ? 'aspect-[16/11]'
                          : 'aspect-[4/3.4]'
                      }`}
                    >
                      <img
                        src={item.imageUrl}
                        alt={`${item.title} — ${item.coupleOrVenue} (${item.category})`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />

                      {/* Top Right Bookmark Button */}
                      <button
                        type="button"
                        aria-label={
                          isShortlisted
                            ? `Remove ${item.title} from wedding board`
                            : `Save ${item.title} to wedding board`
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleShortlist(item.id);
                        }}
                        className={`absolute top-3 right-3 z-10 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
                          isShortlisted
                            ? 'bg-[#8C2D38] text-white'
                            : 'bg-black/45 text-white hover:bg-black/70'
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isShortlisted ? 'fill-current' : ''}`}
                        />
                      </button>

                      {/* Bottom Image Caption Overlay */}
                      <div className="absolute bottom-3 left-4 right-4 text-white flex items-end justify-between gap-2">
                        <div>
                          <div className="text-[11px] text-white/80">
                            <span>{item.category}</span>
                            <span className="mx-1.5" aria-hidden="true">
                              ·
                            </span>
                            <span>{item.location}</span>
                          </div>
                          <h3 className="font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-4 sm:p-5 space-y-2">
                      <div className="text-xs text-[#57534E]">
                        <span className="font-medium text-[#1C1917]">{item.coupleOrVenue}</span>
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        <span>{item.photographerOrVendor}</span>
                        {item.guestCapacity && (
                          <>
                            <span className="mx-1.5" aria-hidden="true">
                              ·
                            </span>
                            <span>{item.guestCapacity}</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-4 sm:px-5 py-3 bg-[#FAF8F5] border-t border-[#E7E2DA] flex items-center justify-between">
                    <span className="text-[11px] text-[#57534E]">{item.date}</span>
                    <button
                      type="button"
                      onClick={() => setLightboxItemId(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8C2D38] hover:text-[#73222C] transition-colors cursor-pointer"
                    >
                      <Expand className="w-3.5 h-3.5" />
                      <span>Open Lightbox</span>
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox view: ${activeLightboxItem.title}`}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxItemId(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E7E2DA] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside Modal */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-[#E7E2DA]">
              <div className="text-xs text-[#57534E] truncate">
                <span className="font-semibold text-[#1C1917]">
                  {activeLightboxItem.coupleOrVenue}
                </span>
                <span className="mx-2" aria-hidden="true">
                  ·
                </span>
                <span>{activeLightboxItem.category}</span>
                <span className="mx-2" aria-hidden="true">
                  ·
                </span>
                <span>{activeLightboxItem.location}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onToggleShortlist(activeLightboxItem.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    shortlistedIds.includes(activeLightboxItem.id)
                      ? 'bg-[#8C2D38] text-white border-[#8C2D38]'
                      : 'bg-[#FAF8F5] text-[#1C1917] border-[#E7E2DA] hover:bg-[#F3EFEA]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>
                    {shortlistedIds.includes(activeLightboxItem.id)
                      ? 'Saved to Board'
                      : 'Save to Board'}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label="Close lightbox modal"
                  onClick={() => setLightboxItemId(null)}
                  className="p-1.5 rounded-lg text-[#1C1917] hover:bg-[#F3EFEA] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Viewer */}
            <div className="relative bg-[#141210] aspect-[16/10] max-h-[62vh] w-full flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous gallery image"
                    onClick={() => {
                      const prevIdx =
                        (activeLightboxIndex - 1 + filteredItems.length) %
                        filteredItems.length;
                      setLightboxItemId(filteredItems[prevIdx].id);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next gallery image"
                    onClick={() => {
                      const nextIdx = (activeLightboxIndex + 1) % filteredItems.length;
                      setLightboxItemId(filteredItems[nextIdx].id);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Caption & Metadata Footer */}
            <div className="p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1C1917]">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E]">
                  {activeLightboxItem.description}
                </p>
              </div>
              <div className="text-xs text-[#57534E] shrink-0 sm:text-right space-y-1">
                <div className="font-medium text-[#1C1917]">
                  {activeLightboxItem.photographerOrVendor}
                </div>
                <div>{activeLightboxItem.date} · WedRaaga Archive</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
