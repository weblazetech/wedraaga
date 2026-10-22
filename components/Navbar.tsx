'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenRsvpForm: () => void;
}

export default function Navbar({ onOpenRsvpForm }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-14 md:h-16 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2DA]">
      <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand lockup with insignia */}
        <a
          href="#top"
          className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-2xl md:text-[28px] font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C2D38] group"
        >
          <img
            src="/images/wedraaga/logo-icon-transparent.png"
            alt="WedRaaga"
            className="w-7 h-7 object-contain transition-transform group-hover:scale-105"
          />
          <span>WedRaaga</span>
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#57534E]"
        >
          <a
            href="#venues"
            className="hover:text-[#1C1917] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Venues
          </a>
          <a
            href="#gallery"
            className="hover:text-[#1C1917] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Gallery
          </a>
          <a
            href="#planning-studio"
            className="hover:text-[#1C1917] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Planning Studio
          </a>
          <a
            href="#rsvp-studio"
            className="hover:text-[#1C1917] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Guest RSVP
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenRsvpForm}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#8C2D38] rounded-lg hover:bg-[#73222C] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C2D38]"
          >
            Register Guest RSVP
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-[#1C1917] hover:bg-[#F3EFEA] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#FAF8F5] border-b border-[#E7E2DA] px-4 py-3 flex flex-col gap-2 shadow-lg"
        >
          <a
            href="#venues"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-[#1C1917] hover:bg-[#F3EFEA] rounded-md"
          >
            Venues
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-[#1C1917] hover:bg-[#F3EFEA] rounded-md"
          >
            Gallery
          </a>
          <a
            href="#planning-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-[#1C1917] hover:bg-[#F3EFEA] rounded-md"
          >
            Planning Studio
          </a>
          <a
            href="#rsvp-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-[#1C1917] hover:bg-[#F3EFEA] rounded-md"
          >
            Guest RSVP
          </a>
        </nav>
      )}
    </header>
  );
}
