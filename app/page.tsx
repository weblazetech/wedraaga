'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ParallaxHero from '@/components/ParallaxHero';
import VenuesShowcase from '@/components/VenuesShowcase';
import DynamicGallery from '@/components/DynamicGallery';
import PlanningStudio from '@/components/PlanningStudio';
import RsvpManager from '@/components/RsvpManager';
import TestimonialsAndFooter from '@/components/TestimonialsAndFooter';
import {
  GuestRsvpRecord,
  INITIAL_GUEST_RSVPS,
  RsvpStatus,
  WEDRAAGA_VENUES,
} from '@/lib/wedding-data';
import { calculateRsvpMetrics } from '@/lib/wedding-logic';

export default function HomePage() {
  const [guests, setGuests] = useState<GuestRsvpRecord[]>(INITIAL_GUEST_RSVPS);
  const [shortlistedGalleryIds, setShortlistedGalleryIds] = useState<string[]>([
    'gal-1',
    'gal-3',
    'gal-4',
  ]);
  const [selectedVenueId, setSelectedVenueId] = useState<string>(WEDRAAGA_VENUES[0].id);
  const [galleryExternalSearch, setGalleryExternalSearch] = useState<string>('');

  const rsvpMetrics = calculateRsvpMetrics(guests);

  const handleToggleShortlist = (id: string) => {
    setShortlistedGalleryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddGuest = (newGuest: GuestRsvpRecord) => {
    setGuests((prev) => [newGuest, ...prev]);
  };

  const handleUpdateGuestStatus = (guestId: string, status: RsvpStatus) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, status, updatedAt: 'Just now' } : g))
    );
  };

  const handleUpdateGuestTable = (guestId: string, tableNumber: string) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, tableNumber, updatedAt: 'Just now' } : g))
    );
  };

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectVenueForBudget = (venueId: string) => {
    setSelectedVenueId(venueId);
    scrollToSection('planning-studio');
  };

  const handleFilterGalleryByVenue = (venueKeyword: string) => {
    setGalleryExternalSearch(venueKeyword);
    scrollToSection('gallery');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      <Navbar
        onOpenRsvpForm={() => {
          scrollToSection('rsvp-studio');
          const nameInput = document.getElementById('rsvp-full-name');
          if (nameInput) nameInput.focus();
        }}
      />

      <main className="flex-1">
        <ParallaxHero
          rsvpMetrics={rsvpMetrics}
          shortlistedCount={shortlistedGalleryIds.length}
          onNavigateRsvp={() => scrollToSection('rsvp-studio')}
          onNavigateGallery={() => scrollToSection('gallery')}
        />

        <VenuesShowcase
          selectedVenueId={selectedVenueId}
          onSelectVenueForBudget={handleSelectVenueForBudget}
          onFilterGalleryByVenue={handleFilterGalleryByVenue}
        />

        <DynamicGallery
          externalSearchQuery={galleryExternalSearch}
          onClearExternalSearch={() => setGalleryExternalSearch('')}
          shortlistedIds={shortlistedGalleryIds}
          onToggleShortlist={handleToggleShortlist}
        />

        <PlanningStudio
          selectedVenueId={selectedVenueId}
          onSelectVenueId={setSelectedVenueId}
        />

        <RsvpManager
          guests={guests}
          metrics={rsvpMetrics}
          onAddGuest={handleAddGuest}
          onUpdateGuestStatus={handleUpdateGuestStatus}
          onUpdateGuestTable={handleUpdateGuestTable}
        />

        <TestimonialsAndFooter />
      </main>
    </div>
  );
}
