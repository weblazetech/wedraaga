const fs = require('fs');
const path = require('path');

// Load images as base64
const logoPath = path.join(__dirname, '../public/images/wedraaga/logo-icon-transparent.png');
const hero1Path = path.join(__dirname, '../public/images/wedraaga/hero-wedding-1.jpg');
const decorPath = path.join(__dirname, '../public/images/wedraaga/cat-decoration.jpg');

const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const hero1Base64 = fs.readFileSync(hero1Path).toString('base64');
const decorBase64 = fs.readFileSync(decorPath).toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    position: relative;
    background: #0B080A;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #FAF8F5;
  }

  /* Radial ambient glow lights */
  .bg-glow-crimson {
    position: absolute;
    top: -60px;
    left: -40px;
    width: 650px;
    height: 520px;
    background: radial-gradient(circle, rgba(157, 30, 37, 0.38) 0%, rgba(140, 45, 56, 0.15) 45%, transparent 70%);
    pointer-events: none;
  }

  .bg-glow-gold {
    position: absolute;
    bottom: -100px;
    right: 180px;
    width: 680px;
    height: 520px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.26) 0%, rgba(197, 168, 128, 0.08) 50%, transparent 75%);
    pointer-events: none;
  }

  .bg-glow-center {
    position: absolute;
    top: 50%;
    left: 42%;
    transform: translate(-50%, -50%);
    width: 750px;
    height: 480px;
    background: radial-gradient(ellipse, rgba(140, 45, 56, 0.14) 0%, transparent 65%);
    pointer-events: none;
  }

  /* Outer Double Bezel Luxury Border */
  .frame-border {
    position: absolute;
    top: 22px;
    left: 22px;
    right: 22px;
    bottom: 22px;
    border: 1px solid rgba(212, 175, 55, 0.32);
    border-radius: 20px;
    pointer-events: none;
  }

  .frame-inner-border {
    position: absolute;
    top: 28px;
    left: 28px;
    right: 28px;
    bottom: 28px;
    border: 1px solid rgba(212, 175, 55, 0.14);
    border-radius: 16px;
    pointer-events: none;
  }

  /* Corner Ornaments */
  .corner-ornament {
    position: absolute;
    width: 16px;
    height: 16px;
    border-color: #D4AF37;
    border-style: solid;
    pointer-events: none;
  }
  .tl { top: 22px; left: 22px; border-width: 2px 0 0 2px; border-top-left-radius: 20px; }
  .tr { top: 22px; right: 22px; border-width: 2px 2px 0 0; border-top-right-radius: 20px; }
  .bl { bottom: 22px; left: 22px; border-width: 0 0 2px 2px; border-bottom-left-radius: 20px; }
  .br { bottom: 22px; right: 22px; border-width: 0 2px 2px 0; border-bottom-right-radius: 20px; }

  /* Main Container Grid */
  .container {
    position: relative;
    z-index: 10;
    width: 1200px;
    height: 630px;
    padding: 46px 54px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  /* Left Column */
  .left-col {
    width: 610px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 24px;
  }

  /* Eyebrow Pill */
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(212, 175, 55, 0.4);
    border-radius: 100px;
    width: fit-content;
    margin-bottom: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }
  .eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #D4AF37;
    box-shadow: 0 0 8px #D4AF37;
  }
  .eyebrow-text {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #E8C582;
  }

  /* Brand Lockup */
  .brand-lockup {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }
  /* High contrast ivory seal for the crimson logo */
  .logo-icon-box {
    width: 62px;
    height: 62px;
    border-radius: 16px;
    background: linear-gradient(145deg, #FFFDF9 0%, #F5EEE6 100%);
    border: 1.5px solid #D4AF37;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.8);
    flex-shrink: 0;
  }
  .logo-icon-box img {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }
  .brand-text-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .brand-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.01em;
    color: #FAF8F5;
  }
  .brand-title .gold {
    color: #E5C07B;
    background: linear-gradient(135deg, #FFF1D4 0%, #E5C07B 50%, #C99E3D 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .brand-subtitle {
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #C5A880;
    margin-top: 5px;
  }

  /* Main Headline */
  .headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px;
    font-weight: 600;
    line-height: 1.15;
    color: #FAF8F5;
    margin-bottom: 12px;
    letter-spacing: -0.01em;
  }
  .headline em {
    font-style: italic;
    color: #E8C582;
  }

  /* Description */
  .description {
    font-size: 14.5px;
    line-height: 1.55;
    color: #D6D0C7;
    margin-bottom: 20px;
    max-width: 550px;
  }

  /* Feature Badges Grid */
  .features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 22px;
  }
  .feature-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(212, 175, 55, 0.22);
    border-radius: 10px;
    backdrop-filter: blur(10px);
  }
  .feature-icon-circle {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(157, 30, 37, 0.3);
    border: 1px solid rgba(212, 175, 55, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #E8C582;
    flex-shrink: 0;
  }
  .feature-text {
    font-size: 12.5px;
    font-weight: 500;
    color: #FAF8F5;
    letter-spacing: 0.01em;
  }

  /* Bottom Details Bar */
  .bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 14px;
    border-top: 1px solid rgba(212, 175, 55, 0.18);
  }
  .domain-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(157, 30, 37, 0.3);
    border: 1px solid rgba(212, 175, 55, 0.45);
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #FFFFFF;
    letter-spacing: 0.04em;
    box-shadow: 0 4px 12px rgba(157, 30, 37, 0.35);
  }
  .domain-pill .arrow {
    color: #E8C582;
    font-size: 14px;
  }
  .meta-tagline {
    font-size: 11.5px;
    color: #B8B0A5;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  /* Right Column (Visual Gallery / Double-Bezel Card) */
  .right-col {
    width: 460px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Double-Bezel Card Outer Shell */
  .photo-outer-shell {
    width: 420px;
    height: 520px;
    padding: 7px;
    border-radius: 24px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(212, 175, 55, 0.22) 50%, rgba(157, 30, 37, 0.25) 100%);
    box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(212, 175, 55, 0.4);
    position: relative;
  }

  /* Double-Bezel Card Inner Core */
  .photo-inner-core {
    width: 100%;
    height: 100%;
    border-radius: 17px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.3);
  }

  .main-bride-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  /* Gradient Overlays on Image */
  .photo-overlay-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: linear-gradient(to bottom, rgba(11, 8, 10, 0.65) 0%, transparent 100%);
  }

  .photo-overlay-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(to top, rgba(11, 8, 10, 0.96) 0%, rgba(11, 8, 10, 0.65) 55%, transparent 100%);
  }

  /* Floating Info Card (Bottom of Main Image) */
  .photo-caption-card {
    position: absolute;
    bottom: 14px;
    left: 14px;
    right: 14px;
    padding: 12px 16px;
    background: rgba(16, 12, 15, 0.88);
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 14px;
    backdrop-filter: blur(16px);
  }
  .caption-venue {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 700;
    color: #FAF8F5;
    line-height: 1.2;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .caption-sub {
    font-size: 11.5px;
    color: #C5A880;
    margin-top: 3px;
    letter-spacing: 0.04em;
  }

  /* Floating Secondary Thumbnail (Mandap) - Inset carefully within bounds */
  .floating-thumbnail {
    position: absolute;
    top: 10px;
    right: -12px;
    width: 154px;
    height: 105px;
    border-radius: 14px;
    padding: 3.5px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.8) 0%, rgba(157, 30, 37, 0.6) 100%);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(212, 175, 55, 0.4);
    z-index: 20;
  }
  .floating-thumb-inner {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  .floating-thumb-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .floating-thumb-badge {
    position: absolute;
    bottom: 4px;
    left: 4px;
    right: 4px;
    padding: 3px 6px;
    background: rgba(11, 8, 10, 0.9);
    border-radius: 6px;
    font-size: 9px;
    font-weight: 600;
    color: #FAF8F5;
    letter-spacing: 0.03em;
    text-align: center;
    border: 1px solid rgba(212, 175, 55, 0.3);
  }

  /* Verified Heritage Badge */
  .verified-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(11, 8, 10, 0.8);
    border: 1px solid rgba(212, 175, 55, 0.45);
    padding: 5px 11px;
    border-radius: 8px;
    font-size: 10.5px;
    font-weight: 600;
    color: #E8C582;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    backdrop-filter: blur(8px);
    z-index: 5;
  }
</style>
</head>
<body>

  <!-- Background Lighting Effects -->
  <div class="bg-glow-crimson"></div>
  <div class="bg-glow-gold"></div>
  <div class="bg-glow-center"></div>

  <!-- Decorative Double Frame Borders -->
  <div class="frame-border"></div>
  <div class="frame-inner-border"></div>
  <div class="corner-ornament tl"></div>
  <div class="corner-ornament tr"></div>
  <div class="corner-ornament bl"></div>
  <div class="corner-ornament br"></div>

  <div class="container">
    <!-- Left Column: Branding, Typography, Features -->
    <div class="left-col">
      <div>
        <!-- Eyebrow Tag -->
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          <span class="eyebrow-text">Heritage & Contemporary Celebrations</span>
        </div>

        <!-- Brand Identity: User Logo Icon + WedRaaga Wordmark -->
        <div class="brand-lockup">
          <div class="logo-icon-box">
            <img src="data:image/png;base64,${logoBase64}" alt="WedRaaga Insignia" />
          </div>
          <div class="brand-text-wrap">
            <div class="brand-title">Wed<span class="gold">Raaga</span></div>
            <div class="brand-subtitle">Bespoke Wedding Planning & Guest RSVP Studio</div>
          </div>
        </div>

        <!-- Editorial Headline -->
        <h1 class="headline">
          Every sacred Muhurtham, <em>choreographed with timeless grace.</em>
        </h1>

        <!-- High-Impact Description -->
        <p class="description">
          Hyderabad's curated digital wedding atelier. Seamlessly explore premier convention venues, bespoke artisan directories, immersive parallax galleries, and real-time VIP guest RSVP management.
        </p>

        <!-- Feature Chips -->
        <div class="features-grid">
          <div class="feature-chip">
            <div class="feature-icon-circle">🏛️</div>
            <span class="feature-text">Curated Luxury Venues</span>
          </div>
          <div class="feature-chip">
            <div class="feature-icon-circle">✨</div>
            <span class="feature-text">Parallax Visual Showcase</span>
          </div>
          <div class="feature-chip">
            <div class="feature-icon-circle">📊</div>
            <span class="feature-text">Smart Budget & Checklist</span>
          </div>
          <div class="feature-chip">
            <div class="feature-icon-circle">💌</div>
            <span class="feature-text">Live VIP Guest RSVP Suite</span>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="bottom-bar">
        <div class="domain-pill">
          <span>wedraaga.com</span>
          <span class="arrow">↗</span>
        </div>
        <div class="meta-tagline">
          Hyderabad · Naren Gardens · Sri Convention · Swetha Garden
        </div>
      </div>
    </div>

    <!-- Right Column: Dual Photo Card Showcase -->
    <div class="right-col">
      <!-- Main Photo Double Bezel -->
      <div class="photo-outer-shell">
        <div class="photo-inner-core">
          <div class="verified-badge">✨ Telugu Bridal Heirloom</div>
          <img class="main-bride-img" src="data:image/jpeg;base64,${hero1Base64}" alt="WedRaaga Telugu Bride" />
          <div class="photo-overlay-top"></div>
          <div class="photo-overlay-bottom"></div>

          <!-- Bottom Caption on Photo -->
          <div class="photo-caption-card">
            <div class="caption-venue">
              <span>Ananya & Siddharth</span>
              <span style="font-size: 13px; font-family: 'Plus Jakarta Sans'; color: #4ADE80; font-weight: 600;">● Confirmed</span>
            </div>
            <div class="caption-sub">
              Naren Gardens Convention · 650 Guests · Muhurtham
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Overlapping Thumbnail (Floral Stage Mandap) -->
      <div class="floating-thumbnail">
        <div class="floating-thumb-inner">
          <img src="data:image/jpeg;base64,${decorBase64}" alt="Floral Mandap" />
          <div class="floating-thumb-badge">Lotus Mandap Architecture</div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>`;

const outHtmlPath = path.join(__dirname, '../scratch/og-card.html');
fs.writeFileSync(outHtmlPath, htmlContent);
console.log('Updated OG card HTML in:', outHtmlPath);
