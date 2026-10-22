'use client';

import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'Before partnering with WedRaaga, coordinating 1,100 guests across our Kompally Sangeet and morning Muhurtham felt overwhelming. Their team secured Naren Gardens, designed a serene lotus mandap, and managed our VIP family table assignments down to the last leaf banquet seat—saving us 140+ hours of vendor coordination.',
    name: 'Dr. Ananya & Siddharth Reddy',
    role: 'Couple · 4-Event Celebration at Naren Gardens Convention, Hyderabad',
    outcome: '1,080 Guests Seated · Zero Ritual Delays · 94% Digital RSVP Completion',
  },
  {
    quote:
      'We wanted our wedding photography and floral decor to feel architectural and unhurried rather than loud. WedRaaga paired us with Akriti Makeup Artists, Sneha Mehendi, and their documentary cinema crew, delivering our full gallery and reception film within 10 days.',
    name: 'Rhea & Vikramaditya Rao',
    role: 'Couple · Ceremony & Reception at Sri Convention Hall, Kukatpally',
    outcome: '650 Guests · ₹4.2L Saved via Curated Venue + Catering Bundle',
  },
];

export default function TestimonialsAndFooter() {
  return (
    <>
      {/* Attributable Client Proof Section */}
      <section className="py-16 lg:py-20 border-b border-[#E7E2DA] bg-[#FAF8F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl space-y-2">
            <div className="text-xs font-medium text-[#8C2D38]">
              05. Verified Couple Outcomes
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-[#1C1917] tracking-tight">
              Celebrations remembered for their warmth and calm execution.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((item) => (
              <blockquote
                key={item.name}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E2DA] flex flex-col justify-between space-y-6"
              >
                <p className="text-sm sm:text-[15px] text-[#1C1917] leading-relaxed">
                  “{item.quote}”
                </p>
                <footer className="pt-4 border-t border-[#E7E2DA] space-y-1">
                  <div className="text-sm font-semibold text-[#1C1917]">{item.name}</div>
                  <div className="text-xs text-[#57534E]">{item.role}</div>
                  <div className="text-xs font-medium text-[#8C2D38] pt-1">
                    {item.outcome}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#FAF8F5] text-[#57534E] py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#E7E2DA]">
            {/* Brand & Mission */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1C1917]">
                <img
                  src="/images/wedraaga/logo-icon-transparent.png"
                  alt="WedRaaga"
                  className="w-6 h-6 object-contain"
                />
                <span>WedRaaga</span>
              </div>
              <p className="text-xs sm:text-sm text-[#57534E] max-w-sm leading-relaxed">
                Your Wedding Destination in Hyderabad, Telangana. Curating exclusive convention
                halls, documentary wedding photography, floral architecture, and seamless guest
                hospitality.
              </p>
              <div className="pt-2 flex flex-col gap-1.5 text-xs text-[#1C1917]">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8C2D38]" />
                  <span>Hyderabad, Telangana, India</span>
                </span>
                <a
                  href="tel:+918897736530"
                  className="inline-flex items-center gap-2 hover:text-[#8C2D38] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8C2D38]" />
                  <span className="font-[family-name:var(--font-mono)] tabular-nums">
                    +91 88977 36530
                  </span>
                </a>
                <a
                  href="mailto:wedraaga@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-[#8C2D38] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8C2D38]" />
                  <span>wedraaga@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Navigation Mirror */}
            <div className="md:col-span-3 space-y-2.5 text-xs">
              <div className="font-semibold text-[#1C1917]">Studio Navigation</div>
              <ul className="space-y-2">
                <li>
                  <a href="#venues" className="hover:text-[#1C1917] transition-colors">
                    Exclusive Venues & Conventions
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#1C1917] transition-colors">
                    Dynamic Memories Gallery
                  </a>
                </li>
                <li>
                  <a href="#planning-studio" className="hover:text-[#1C1917] transition-colors">
                    Checklist & Budget Estimator
                  </a>
                </li>
                <li>
                  <a href="#rsvp-studio" className="hover:text-[#1C1917] transition-colors">
                    Guest RSVP & Seating Registry
                  </a>
                </li>
              </ul>
            </div>

            {/* Curated Categories */}
            <div className="md:col-span-4 space-y-2.5 text-xs">
              <div className="font-semibold text-[#1C1917]">WedRaaga Vendor Disciplines</div>
              <p className="leading-relaxed text-[#57534E]">
                Venues · Candid Photography · Mandap Decoration · Banquet Catering · Bridal Makeup
                Artists · Mehendi Artistry · Temple Jewellery · Bridal Boutique · Wedding Cakes ·
                Pandits · Return Gifts · Honeymoon & Guest Travels
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#57534E]">
            <div>© {new Date().getFullYear()} WedRaaga. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>Inspired by Planning.Wedding · WithJoy · Zola · The Knot</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
