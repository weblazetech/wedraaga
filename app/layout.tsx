import type {Metadata} from 'next';
import {Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono} from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'WedRaaga — Bespoke Wedding Planning & Guest RSVP Studio',
  description:
    'An elegant, minimalist wedding planning platform for WedRaaga featuring curated venues, a dynamic responsive gallery with smooth parallax scrolling, interactive checklist and budget tools, and an integrated guest RSVP management system.',
  openGraph: {
    title: 'WedRaaga — Bespoke Wedding Planning & Guest RSVP Studio',
    description:
      'An elegant, minimalist wedding planning platform for WedRaaga featuring curated venues, a dynamic responsive gallery with smooth parallax scrolling, interactive checklist and budget tools, and an integrated guest RSVP management system.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WedRaaga — Bespoke Wedding Planning & Guest RSVP Studio',
    description:
      'An elegant, minimalist wedding planning platform for WedRaaga featuring curated venues, a dynamic responsive gallery with smooth parallax scrolling, interactive checklist and budget tools, and an integrated guest RSVP management system.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#FAF8F5] text-[#1C1917] font-sans antialiased selection:bg-[#8C2D38]/15 selection:text-[#8C2D38]"
      >
        {children}
      </body>
    </html>
  );
}
