export const DESIGN_EXPORT = `================================================================
HEARTSET DESIGN — HOME / CONTACT / REFERRAL / APPLY
FULL HTML STRUCTURE, CSS, THEME & ASSET EXPORT
================================================================

This document contains the complete JSX/HTML markup (with every Tailwind
class), inline styles, brand colors, font families, and image URLs used to
build the Home, Contact, Referral, and Apply pages — so they can be
rebuilt outside this platform (plain HTML/CSS, or another framework).


================================================================
SECTION 1: BRAND COLORS (HEX / RGBA)
================================================================

Core Palette:
  Black              #000000   (bg-black, text-black, border-black)
  White              #FFFFFF   (bg-white, text-white)
  Neutral 50         #FAFAFA   (bg-neutral-50 — light section backgrounds)
  Neutral 100        #F5F5F5   (bg-neutral-100 — hover states)

Opacity Variants (Tailwind's /NN syntax = rgba with alpha):
  black/5    rgba(0,0,0,0.05)   — hairline borders
  black/10   rgba(0,0,0,0.10)   — standard borders
  black/20   rgba(0,0,0,0.20)   — outline buttons
  black/30   rgba(0,0,0,0.30)   — muted icons/numbers
  black/40   rgba(0,0,0,0.40)   — eyebrow labels, captions
  black/50   rgba(0,0,0,0.50)   — secondary body text
  black/60   rgba(0,0,0,0.60)   — body text on white
  black/70   rgba(0,0,0,0.70)   — emphasized body text
  black/80   rgba(0,0,0,0.80)   — near-solid text

  white/10   rgba(255,255,255,0.10)  — dividers on black bg
  white/20   rgba(255,255,255,0.20)  — outline buttons on black
  white/30   rgba(255,255,255,0.30)  — bullets on black
  white/40   rgba(255,255,255,0.40)  — eyebrow labels on black
  white/50   rgba(255,255,255,0.50)  — secondary text on black
  white/60   rgba(255,255,255,0.60)  — body text on black
  white/70   rgba(255,255,255,0.70)  — emphasized text on black
  white/80   rgba(255,255,255,0.80)  — footer copy on black

Accent / Utility Colors:
  Amber 50           #FFFBEB   (legal notice background)
  Amber 200          #FDE68A   (legal notice border)
  Amber 600          #D97706   (legal notice icon/accent)
  Green 600          #16A34A   (success checkmarks)
  Red 500            #EF4444   (form field error border)
  Red 600            #DC2626   (form error text)

Design Philosophy: Strict black/white monochrome with fractional opacity
for hierarchy (no gray hex values — everything is black or white at
reduced opacity). Amber is the only color accent, reserved for legal
disclaimers.


================================================================
SECTION 2: FONT FAMILIES
================================================================

Google Fonts Import (place in <head> or top of CSS file):

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

Font Roles:
  --font-sans:  'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                Used for: body text, buttons, labels, navigation, forms

  --font-serif: 'Playfair Display', Georgia, serif;
                Used for: all headings (h1/h2/h3), display copy
                Applied via inline style={{ fontFamily: "'Playfair Display', serif" }}
                Weights used: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
                Italic used for emphasis phrases (e.g. "for Expertise That Scales")

Global body style (from src/index.css / Layout):
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html { scroll-behavior: smooth; }
  ::selection { background: black; color: white; }


================================================================
SECTION 3: IMAGES / ASSETS USED
================================================================

Hero Background Image (Home page — HeroSection.jsx):
  https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698234f6159af9c88427982a/617d7af2c_ChatGPTImageFeb5202610_41_29AM1.png

  Applied treatment:
    - object-fit: cover, object-position: center
    - filter: grayscale(100%)
    - opacity: 0.5
    - Gradient overlay on top:
      linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)

No other custom images are used on Home, Contact, Referral, or Apply —
these pages are otherwise built from typography, borders, and color blocks
only (no icons besides lucide-react line icons: ArrowLeft, X).

Brand Wordmark: There is no logo image file — "Heartset Design" is set in
Playfair Display serif type as the wordmark everywhere (nav, footer, hero).


================================================================
SECTION 4: GLOBAL CSS (index.css — relevant excerpt)
================================================================

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --border: 0 0% 89.8%;
  --radius: 0.5rem;
}

* { @apply border-border outline-ring/50; }
body { @apply bg-background text-foreground; }


================================================================
SECTION 5: HOME PAGE — FULL STRUCTURE
================================================================

Route: "/"
Public (logged-out) shell:

  <div class="min-h-screen bg-white text-black font-sans antialiased">
    <HeroSection />
    <DefinitionSection />
    <ProblemSection />
    <MethodSection />
    <CaseStudiesSection />
    <OffersSection />
    <FocusGroupSection />
    <ReferralSection />
    <CredibilitySection />
    <Footer />
  </div>

--- 5.1 HERO SECTION (bg-black, full-bleed image) ---

<section class="min-h-screen bg-black text-white flex flex-col justify-center
                 px-6 md:px-16 lg:px-24 py-20 relative overflow-hidden">

  <!-- Background image layer -->
  <div class="absolute inset-0 z-0">
    <img src="[HERO_IMAGE_URL — see Section 3]"
         class="absolute inset-0 w-full h-full object-cover object-center"
         style="filter: grayscale(100%); opacity: 0.5;" />
    <div class="absolute inset-0"
         style="background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%);" />
  </div>

  <!-- Architectural line accents -->
  <div class="absolute top-0 right-0 w-px h-full bg-white/10 z-10" />
  <div class="absolute top-1/3 right-12 w-24 h-px bg-white/20 hidden lg:block" />

  <div class="max-w-4xl relative z-10">
    <p class="text-xs tracking-[0.3em] uppercase text-white/60 mb-8">
      Heartset Design
    </p>

    <h1 class="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8"
        style="font-family: 'Playfair Display', serif;">
      Authority Infrastructure™<br />
      <span class="italic text-white/70">for Expertise That Scales</span>
    </h1>

    <p class="text-lg md:text-xl text-white/60 max-w-xl lg:max-w-2xl leading-relaxed
              mb-12 font-light">
      We partner with experienced professionals to convert lived expertise into
      proprietary authority systems, validate them through focus groups, and build
      infrastructure prepared for institutional scale. No ads, funnels, or legal risk.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
      <a href="/Sprint6500"
         class="group inline-flex items-center gap-3 bg-white text-black px-8 py-3
                text-sm tracking-wider hover:bg-white/90 transition-all duration-300">
        <span>Start the Validation Sprint →</span>
      </a>

      <a href="/FocusGroup"
         class="inline-flex items-center gap-2 text-white/60 hover:text-white
                text-sm tracking-wide transition-colors duration-300 py-4">
        <span class="w-8 h-px bg-current" />
        <span>Participate in the Focus Group</span>
      </a>
    </div>
  </div>

  <div class="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
</section>

Animation notes (Framer Motion — recreate with CSS transitions or JS):
  - Container: fade + slide up (y: 40→0), duration 1s, ease [0.22,1,0.36,1]
  - Eyebrow label: fade in, delay 0.3s
  - Headline: inherits container animation
  - Body copy: fade in, delay 0.5s
  - CTA row: fade + slide up, delay 0.7s

--- 5.2 DEFINITION SECTION (bg-white) ---

<section class="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-white">
  <div class="max-w-4xl mx-auto">
    <div class="mb-20">
      <div class="border-l-2 border-black pl-8 md:pl-12">
        <h2 class="text-5xl md:text-7xl lg:text-8xl mb-4"
            style="font-family: 'Playfair Display', serif;">
          design
        </h2>
        <p class="text-sm tracking-wide text-black/40 mb-6">
          /dɪˈzaɪn/ <span class="italic">noun</span>
        </p>
        <p class="text-xl md:text-2xl text-black/70 leading-relaxed font-light">
          a system of intention, structure, and consequence, not decoration.
        </p>
      </div>
    </div>

    <div class="space-y-6 text-lg md:text-xl text-black/60 font-light leading-relaxed">
      <p>At Heartset Design, design is not visual.</p>
      <p class="text-black">It is <span class="italic">institutional.</span></p>
      <p class="text-black">It is <span class="italic">legal.</span></p>
      <p class="text-black">It is <span class="italic">operational.</span></p>
    </div>
  </div>
</section>

--- 5.3 PROBLEM SECTION (bg-black) ---

<section class="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-black text-white">
  <div class="max-w-5xl mx-auto">
    <div class="mb-16">
      <p class="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">The Problem</p>
      <h2 class="text-3xl md:text-4xl lg:text-5xl leading-tight"
          style="font-family: 'Playfair Display', serif;">
        Why Experienced Professionals Get Stuck
      </h2>
    </div>

    <div class="grid md:grid-cols-2 gap-x-16 gap-y-8">
      <div class="space-y-6">
        <!-- Repeated for each of 4 problems -->
        <div class="flex items-center gap-4">
          <span class="w-2 h-2 bg-white/30 rounded-full" />
          <p class="text-lg md:text-xl text-white/70 font-light">
            Revenue tied to time and labor
          </p>
        </div>
        <!-- ...Systems that aren't defensible / Launches without validation /
              Authority without leverage -->
      </div>

      <div class="flex items-end">
        <div class="border-t border-white/20 pt-8 mt-8 md:mt-0">
          <p class="text-2xl md:text-3xl text-white/50 font-light leading-relaxed">
            You don't need more content.
          </p>
          <p class="text-2xl md:text-3xl text-white mt-2"
             style="font-family: 'Playfair Display', serif;">
            You need <span class="italic">infrastructure.</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

--- 5.4 METHOD SECTION (bg-white, numbered list) ---

<section class="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-white">
  <div class="max-w-5xl mx-auto">
    <div class="mb-20">
      <p class="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">The Method</p>
      <h2 class="text-3xl md:text-4xl lg:text-5xl leading-tight"
          style="font-family: 'Playfair Display', serif;">
        The Authority Infrastructure™ Method
      </h2>
    </div>

    <div class="space-y-0">
      <!-- One row per step, 01–05 -->
      <div class="group border-t border-black/10 py-8 flex items-baseline gap-8
                  hover:bg-black/[0.02] transition-colors duration-500 px-4 -mx-4">
        <span class="text-xs text-black/30 font-mono w-8">01</span>
        <p class="text-xl md:text-2xl text-black/80 font-light
                  group-hover:text-black transition-colors duration-300">
          Extract the proprietary framework
        </p>
      </div>
      <!-- 02 Validate it with real professionals -->
      <!-- 03 Systematize delivery and outcomes -->
      <!-- 04 Secure legal + IP footing -->
      <!-- 05 Prepare for institutional or scalable adoption -->
      <div class="border-t border-black/10" />
    </div>
  </div>
</section>

--- 5.5 CASE STUDIES SECTION (bg-neutral-50, accordion) ---

<section class="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-neutral-50">
  <div class="max-w-5xl mx-auto">
    <div class="mb-16">
      <p class="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">Case Studies</p>
      <h2 class="text-3xl md:text-4xl lg:text-5xl leading-tight mb-4"
          style="font-family: 'Playfair Display', serif;">
        Proof in Practice
      </h2>
      <p class="text-sm text-black/40 font-light italic max-w-2xl">
        Selected engagements demonstrating revenue generation, institutional
        alignment, and scalable authority systems.
      </p>
    </div>

    <!-- Accordion: 7 case study items, single-collapsible -->
    <div class="space-y-0"> <!-- Accordion root -->
      <div class="border-t border-black/10 last:border-b"> <!-- AccordionItem -->
        <button class="py-8 px-4 hover:bg-black/[0.02] transition-colors duration-300
                       text-left hover:no-underline group w-full flex justify-between items-center">
          <div class="flex-1">
            <div class="flex items-baseline gap-3 mb-1">
              <span class="text-xs font-mono text-black/30">01</span>
              <h3 class="text-lg md:text-xl text-black" style="font-family: 'Playfair Display', serif;">
                Institutional Readiness → Selective Accelerator Acceptance
              </h3>
            </div>
            <p class="text-sm md:text-base text-black/50 font-light ml-8">
              Women.NYC Acceptance
            </p>
          </div>
          <!-- chevron icon -->
        </button>

        <!-- Expanded content (AccordionContent) -->
        <div class="px-4 pb-8 pt-2">
          <div class="ml-8 space-y-6 text-black/70">
            <div>
              <p class="text-xs tracking-wide uppercase text-black/40 mb-2">Client Type</p>
              <p class="text-sm md:text-base font-light">Tech Founder</p>
            </div>
            <div>
              <p class="text-xs tracking-wide uppercase text-black/40 mb-2">Challenge</p>
              <p class="text-sm md:text-base font-light">[challenge text]</p>
            </div>
            <div>
              <p class="text-xs tracking-wide uppercase text-black/40 mb-3">
                Authority Infrastructure Applied
              </p>
              <ul class="space-y-2">
                <li class="flex gap-3 text-sm md:text-base font-light">
                  <span class="text-black/30 mt-1">•</span>
                  <span>[applied item]</span>
                </li>
                <!-- ... -->
              </ul>
            </div>
            <div>
              <p class="text-xs tracking-wide uppercase text-black/40 mb-3">Outcome</p>
              <ul class="space-y-2"><!-- outcome bullets --></ul>
            </div>
            <div class="border-t border-black/5 pt-6 mt-8">
              <p class="text-xs tracking-wide uppercase text-black/40 mb-2">Why This Matters</p>
              <p class="text-base md:text-lg font-light text-black italic">[quote]</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Repeat for all 7 case studies -->
    </div>

    <p class="text-xs text-black/30 text-center mt-12 italic">
      Additional case studies available upon request.
    </p>
  </div>
</section>

(See ContentExport page / Section II of the content inventory doc for the
full text of all 7 case studies.)

--- 5.6 OFFERS SECTION (bg-black, 3-column pricing) ---

<section class="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-black text-white">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl md:text-6xl lg:text-7xl mb-20 leading-tight text-center"
        style="font-family: 'Playfair Display', serif;">
      Authority Infrastructure™<br />Pathways
    </h1>

    <div class="grid md:grid-cols-3 gap-8">
      <!-- Each tier card: -->
      <div class="relative bg-black border border-white/10 text-white p-8 group
                  transition-all duration-300
                  after:content-[''] after:absolute after:bottom-0 after:left-0
                  after:right-0 after:h-[1px] after:bg-white after:scale-x-0
                  after:transition-transform after:duration-300
                  hover:after:scale-x-100">
        <p class="text-xs font-medium text-white/60 tracking-widest uppercase mb-4">
          VALIDATION SPRINT
        </p>
        <h2 class="text-xl md:text-3xl mb-4 leading-tight"
            style="font-family: 'Playfair Display', serif;">
          Authority Infrastructure™
        </h2>
        <p class="text-3xl md:text-4xl mb-6 font-light">$6,950</p>
        <p class="text-base text-white/60 font-light leading-relaxed mb-8">
          Delivered through a credentialed focus group designed to validate and
          convert your existing expertise into a structured authority system.
        </p>
        <a href="/Sprint6500" class="text-white/60 hover:text-white text-sm
                                     tracking-wide transition-colors duration-300">
          Learn More →
        </a>
      </div>

      <!-- Private Advisory card ($10,000) — CTA is solid white button "Join Priority List →" -->
      <!-- Full Infrastructure card (Custom Scope) — CTA is plain text "By Invitation Only" -->
    </div>
  </div>
</section>

--- 5.7 FOCUS GROUP SECTION (bg-white, centered CTA) ---

<section class="py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-white">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight"
        style="font-family: 'Playfair Display', serif;">
      Join the Focus Group
    </h2>
    <p class="text-lg text-black/50 font-light mb-12 max-w-xl mx-auto">
      Our focus groups are working sessions for credentialed professionals
      validating frameworks, language, and delivery models in real time.<br /><br />
      Participation is limited and requires confirmation.
    </p>
    <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <a href="/FocusGroup"
         class="group inline-flex items-center gap-3 bg-black text-white px-10 py-5
                text-sm tracking-wide hover:bg-black/90 transition-all duration-300">
        <span>Join the Focus Group</span>
        <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
      </a>
      <a href="/Apply"
         class="group inline-flex items-center gap-3 border border-black/20 text-black
                px-10 py-5 text-sm tracking-wide hover:border-black transition-all duration-300">
        <span>Apply for Authority Infrastructure™</span>
        <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
      </a>
    </div>
  </div>
</section>

--- 5.8 REFERRAL SECTION (bg-neutral-100) ---

<section class="py-20 px-6 md:px-16 lg:px-24 bg-neutral-100 border-t border-black/5">
  <div class="max-w-4xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <h3 class="text-xl md:text-2xl mb-2" style="font-family: 'Playfair Display', serif;">
          Referred by a Colleague?
        </h3>
        <p class="text-sm text-black/50 font-light max-w-md">
          If you were directed here for a specific engagement (including web,
          systems, or strategic design), submit a referral inquiry below.<br />
          <span class="italic text-black/40">Design engagements are limited and accepted selectively.</span>
        </p>
      </div>
      <a href="/Referral" class="inline-flex items-center gap-2 text-sm text-black/60
                                  hover:text-black transition-colors duration-300 whitespace-nowrap">
        <span class="w-6 h-px bg-current" />
        <span>Referral Intake Form</span>
      </a>
    </div>
  </div>
</section>

--- 5.9 CREDIBILITY SECTION (bg-white) ---

<section class="py-16 px-6 md:px-16 lg:px-24 bg-white border-t border-black/5">
  <div class="max-w-4xl mx-auto text-center">
    <p class="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">Credibility</p>
    <p class="text-lg md:text-xl text-black/70 font-light mb-4">
      ★★★★★ 5-Star Client Rating · Design & Strategy Engagements · 10+ Years
    </p>
    <p class="text-xs text-black/30 italic">Verified reviews available upon request</p>
  </div>
</section>

--- 5.10 FOOTER (bg-black, shared across marketing pages) ---

<footer class="py-16 px-6 md:px-16 lg:px-24 bg-black text-white">
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
      <div>
        <h2 class="text-2xl md:text-3xl mb-4" style="font-family: 'Playfair Display', serif;">
          Heartset Design
        </h2>
        <p class="text-sm text-white/80 font-light">Consulting · Strategy · Systems</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-8 text-sm">
        <a href="/Contact" class="text-white/70 hover:text-white transition-colors duration-300">
          Contact
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
           class="text-white/70 hover:text-white transition-colors duration-300">
          LinkedIn
        </a>
      </div>
    </div>
    <div class="mt-16 pt-8 border-t border-white/10">
      <p class="text-xs text-white/80">© [YEAR] Heartset Design. All rights reserved.</p>
    </div>
  </div>
</footer>


================================================================
SECTION 6: CONTACT PAGE — FULL STRUCTURE
================================================================

Route: "/Contact" | Background: bg-white text-black

<div class="min-h-screen bg-white text-black font-sans antialiased">

  <!-- Header -->
  <header class="px-6 md:px-16 lg:px-24 py-8 border-b border-black/5">
    <a href="/" class="inline-flex items-center gap-2 text-sm text-black/50
                       hover:text-black transition-colors duration-300">
      ← <span>Back to Home</span>
    </a>
  </header>

  <main class="px-6 md:px-16 lg:px-24 py-20 md:py-32">
    <div class="max-w-3xl mx-auto">
      <p class="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">Contact</p>
      <h1 class="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
          style="font-family: 'Playfair Display', serif;">
        General Inquiries
      </h1>
      <p class="text-lg text-black/60 font-light leading-relaxed mb-12 max-w-2xl">
        Heartset Design partners with professionals who already carry expertise
        and are ready to structure it into systems that scale.
      </p>
      <p class="text-base text-black/50 font-light mb-16 max-w-2xl">
        For those still building foundations, we're glad to share referrals
        and resources aligned with your stage.
      </p>

      <div class="h-px bg-black/10 mb-16"></div> <!-- divider, animates scaleX 0→1 -->

      <h2 class="text-2xl md:text-3xl mb-4" style="font-family: 'Playfair Display', serif;">
        Before You Reach Out
      </h2>
      <p class="text-base text-black/50 font-light mb-16 max-w-2xl leading-relaxed">
        Heartset Design builds business strategies around legal support and works
        with credentialed experts developing proprietary frameworks and scalable systems.
        <br /><br />
        For legal services, we refer to our legal partner membership.
        For strategic clarity or framework validation, you may request a
        15-minute session below.
      </p>

      <h3 class="text-xl mb-8" style="font-family: 'Playfair Display', serif;">
        Choose Your Path
      </h3>

      <div class="space-y-6">
        <!-- Path 1: link card to BookSession -->
        <a href="/BookSession"
           class="group block border border-black/10 p-8 hover:border-black/30
                  transition-all duration-500 relative overflow-hidden">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 class="text-lg font-medium mb-2">Book a 15-Minute Strategy Session</h4>
              <p class="text-sm text-black/50 font-light">
                For professionals seeking clarity on frameworks, validation pathways,
                or legal positioning.
              </p>
              <p class="text-xs text-black/30 font-light mt-2 italic">
                This session is for strategic clarity only. It is not a sales call.
              </p>
            </div>
            <span class="text-black/30 group-hover:text-black group-hover:translate-x-1
                         transition-all duration-300">→</span>
          </div>
          <div class="absolute bottom-0 left-0 w-0 h-px bg-black
                     group-hover:w-full transition-all duration-700" />
        </a>

        <!-- Path 2: button that opens General Inquiry modal (Dialog) -->
        <button class="group block border border-black/10 p-8 hover:border-black/30
                       transition-all duration-500 relative overflow-hidden w-full text-left">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 class="text-lg font-medium mb-2">General Inquiry</h4>
              <p class="text-sm text-black/50 font-light">
                For referrals, collaborations, press, or non-program questions.
              </p>
            </div>
            <span class="text-black/30 group-hover:text-black group-hover:translate-x-1
                         transition-all duration-300">→</span>
          </div>
        </button>

        <!-- Path 3: link card to Referral -->
        <a href="/Referral"
           class="group block border border-black/10 p-8 hover:border-black/30
                  transition-all duration-500 relative overflow-hidden">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 class="text-lg font-medium mb-2">Referred for Web or Design Services?</h4>
              <p class="text-sm text-black/50 font-light">
                If you were referred by a colleague specifically for web or design services.
                <br /><span class="italic text-black/40">
                  (Design engagements are limited and accepted selectively.)
                </span>
              </p>
            </div>
            <span class="text-black/30 group-hover:text-black group-hover:translate-x-1
                         transition-all duration-300">→</span>
          </div>
        </a>
      </div>
    </div>
  </main>

  <footer class="px-6 md:px-16 lg:px-24 py-12 border-t border-black/5">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center
               md:justify-between gap-4">
      <p class="text-lg" style="font-family: 'Playfair Display', serif;">Heartset Design</p>
      <p class="text-xs text-black/40">© [YEAR] All rights reserved.</p>
    </div>
  </footer>

  <!-- General Inquiry Dialog (modal), see Section 8 for form markup -->
</div>


================================================================
SECTION 7: REFERRAL PAGE — FULL STRUCTURE
================================================================

Route: "/Referral" | Background: bg-white text-black
(Header/footer identical pattern to Contact page above)

<div class="min-h-screen bg-white text-black font-sans antialiased">
  <header class="px-6 md:px-16 lg:px-24 py-8 border-b border-black/5 bg-white">
    <a href="/" class="inline-flex items-center gap-2 text-sm text-black/50
                       hover:text-black transition-colors duration-300">
      ← <span>Back to Home</span>
    </a>
  </header>

  <main class="px-6 md:px-16 lg:px-24 py-20 md:py-32">
    <div class="max-w-3xl mx-auto">
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">Referral</p>
        <h1 class="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
            style="font-family: 'Playfair Display', serif;">
          Referral<br /><span class="italic text-black/60">Intake Form</span>
        </h1>
        <p class="text-lg text-black/60 font-light leading-relaxed max-w-2xl">
          If you were referred by a colleague for a specific engagement including
          web, systems, strategic design, or legal support, please complete the
          form below.
        </p>
        <p class="text-sm text-black/40 font-light mt-4 italic">
          All engagements are limited and accepted selectively.
        </p>
      </div>

      <!-- Referral Intake Form — see Section 8 -->
    </div>
  </main>

  <footer class="px-6 md:px-16 lg:px-24 py-12 border-t border-black/5 bg-white mt-auto">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center
               md:justify-between gap-4">
      <p class="text-lg" style="font-family: 'Playfair Display', serif;">Heartset Design</p>
      <p class="text-xs text-black/40">© [YEAR] All rights reserved.</p>
    </div>
  </footer>
</div>


================================================================
SECTION 8: FORM MARKUP (General Inquiry + Referral Intake)
================================================================

--- 8.1 GENERAL INQUIRY FORM (used inside Contact page dialog) ---

<form class="space-y-6 p-8">
  <div class="space-y-2">
    <label>Name</label>
    <input class="[shadcn Input: h-9 rounded-md border border-input bg-background
                  px-3 py-1 text-sm shadow-sm]" />
  </div>

  <div class="space-y-2">
    <label>Email</label>
    <input type="email" class="[same Input styling]" />
  </div>

  <div class="space-y-2">
    <label>Reason for reaching out</label>
    <!-- shadcn Select: Collaboration / Referral / Press / Speaking /
         Question about programs / Other -->
  </div>

  <!-- Conditional: if reason === "Referral" -->
  <div class="space-y-2 pl-6 border-l-2 border-black/10">
    <label>Who referred you?</label>
    <input placeholder="Name or relationship" />
  </div>

  <!-- Conditional: if reason === "Question about programs" -->
  <div class="space-y-2 pl-6 border-l-2 border-black/10">
    <label>Have you reviewed the Framework Pathways?</label>
    <!-- Select: Yes / No -->
  </div>

  <div class="space-y-2">
    <label>Message</label>
    <textarea rows="5" placeholder="Tell us about your inquiry..."></textarea>
  </div>

  <div class="flex justify-between pt-6 border-t border-black/10">
    <button type="button" class="[outline button]">Cancel</button>
    <button type="submit" class="bg-black text-white hover:bg-black/90 [button]">
      Submit Inquiry
    </button>
  </div>
</form>

Success state:
  <div class="p-12 text-center">
    <div class="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center
               mx-auto mb-6"><!-- Lock icon --></div>
    <h3 style="font-family: 'Playfair Display', serif;" class="text-2xl mb-4">
      Inquiry Received
    </h3>
    <p class="text-black/70 font-light leading-relaxed max-w-md mx-auto mb-6">
      We'll review your message and respond within 48 hours.
    </p>
    <button class="[outline button]">Close</button>
  </div>

--- 8.2 REFERRAL INTAKE FORM (Referral page, wrapped in bordered card) ---

<div class="bg-white border border-black/10">
  <form class="p-8 md:p-12 space-y-8">

    <div class="space-y-6">
      <h3 class="text-xl pb-4 border-b border-black/10"
          style="font-family: 'Playfair Display', serif;">
        Referral Context
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-2"><label>Name</label><input /></div>
        <div class="space-y-2"><label>Email</label><input type="email" /></div>
      </div>
      <div class="space-y-2">
        <label>Who referred you?</label>
        <input placeholder="Name and email" />
      </div>
      <div class="space-y-2">
        <label>What were you referred for?</label>
        <!-- Select: Web design / Systems·automation / Legal support /
             Strategic advisory / Not sure -->
      </div>
    </div>

    <!-- If "Legal support" selected: amber notice box -->
    <div class="space-y-6 border-l-2 border-amber-600 pl-6">
      <div class="bg-amber-50 border border-amber-200 p-6 space-y-4">
        <div class="flex items-start gap-3">
          <!-- AlertCircle icon, text-amber-600 -->
          <div class="space-y-3">
            <p class="text-sm text-black/80 font-light leading-relaxed">
              Heartset Design does not provide legal services. Legal matters are
              handled by our independent legal service partner.
            </p>
            <p class="text-sm text-black/80 font-light leading-relaxed">
              With your permission, we can facilitate an introduction.
            </p>
          </div>
        </div>
        <div class="pt-4 border-t border-amber-200">
          <div class="flex items-start space-x-3">
            <input type="checkbox" />
            <label class="font-light text-sm leading-relaxed cursor-pointer">
              I understand Heartset Design is not a law firm and does not provide
              legal advice. I am requesting an introduction to an independent
              legal service provider.
            </label>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <label>Would you like to request a 15-minute referral call to discuss next steps?</label>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <input type="checkbox" /><label>Yes, I'd like a referral call</label>
          </div>
          <div class="flex items-center space-x-3">
            <input type="checkbox" /><label>No, just facilitate the introduction</label>
          </div>
        </div>
      </div>

      <!-- If "yes" to referral call: bg-neutral-50 box with "Book Referral Call" button -->
    </div>

    <!-- If non-legal service selected: -->
    <div class="space-y-6">
      <div class="space-y-2"><label>Timeline for engagement</label><input /></div>
      <div class="space-y-2"><label>Budget range (optional)</label><input /></div>
      <div class="space-y-2"><label>Tell us about the engagement</label><textarea rows="5"></textarea></div>
    </div>

    <div class="space-y-2">
      <label>Additional context (optional)</label>
      <textarea rows="3"></textarea>
    </div>

    <div class="flex justify-end pt-6 border-t border-black/10">
      <button type="submit" class="bg-black text-white hover:bg-black/90 px-8 [button]">
        Submit Referral
      </button>
    </div>
  </form>
</div>

Success state:
  <div class="border border-black/10 bg-white p-12 text-center">
    <div class="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center
               mx-auto mb-6"><!-- Lock icon --></div>
    <h3 style="font-family: 'Playfair Display', serif;" class="text-2xl mb-4">
      Referral Received
    </h3>
    <p class="text-black/70 font-light leading-relaxed max-w-md mx-auto">
      [Conditional message based on referredFor === "Legal support"]
    </p>
  </div>


================================================================
SECTION 9: APPLY PAGE — FULL STRUCTURE
================================================================

Route: "/Apply" | Background: bg-black text-white (the ONLY marketing
page besides Hero/Problem/Offers sections that inverts to black background
as its own full page, not just a section)

<div class="min-h-screen bg-black text-white font-sans antialiased">

  <header class="px-6 md:px-16 lg:px-24 py-8 border-b border-white/10">
    <a href="/" class="inline-flex items-center gap-2 text-sm text-white/50
                       hover:text-white transition-colors duration-300">
      ← <span>Back to Home</span>
    </a>
  </header>

  <main class="px-6 md:px-16 lg:px-24 py-20 md:py-32">
    <div class="max-w-3xl mx-auto">
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Application</p>
        <h1 class="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
            style="font-family: 'Playfair Display', serif;">
          Apply for the<br /><span class="italic text-white/70">Framework</span>
        </h1>
        <p class="text-lg text-white/60 font-light leading-relaxed max-w-2xl">
          Complete the application below. We review submissions within 72 hours
          and will reach out if there's alignment.
        </p>
      </div>

      <div class="space-y-8">
        <div class="border border-white/10 p-12 text-center">
          <p class="text-white/50 mb-6">Application form coming soon</p>
          <p class="text-sm text-white/30 font-light">
            In the meantime, reach out via the contact page.
          </p>
          <a href="/Contact"
             class="inline-flex items-center gap-2 mt-8 text-sm text-white/60
                    hover:text-white transition-colors duration-300">
            <span class="w-6 h-px bg-current" />
            <span>Go to Contact</span>
          </a>
        </div>
      </div>
    </div>
  </main>

  <footer class="px-6 md:px-16 lg:px-24 py-12 border-t border-white/10 mt-auto">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center
               md:justify-between gap-4">
      <p class="text-lg" style="font-family: 'Playfair Display', serif;">Heartset Design</p>
      <p class="text-xs text-white/40">© [YEAR] All rights reserved.</p>
    </div>
  </footer>
</div>

Note: This is a placeholder page — it does not yet contain a live
application form. The linked "$10,000 Advisory Application" form (used
elsewhere in the platform, at a different route) has these fields, if you
want to build a full form for this page:
  - Proof of prior revenue or implementation (textarea)
  - Existing frameworks already in market (textarea)
  - Evidence of execution / links / results (textarea)
  - Time availability (textarea)
  - Reason for applying directly (textarea, required)
  Submit button: "Submit Application"
  Success message: "Application Submitted — Your $10,000 Advisory application
  has been submitted. You'll be notified via email once it has been reviewed."
  Card/section styling: standard white bg, black text, Playfair headings,
  shadcn Card component with border, space-y-6 fields.


================================================================
SECTION 10: SHARED UI PRIMITIVES (Buttons, Inputs — Tailwind classes)
================================================================

Primary Button (dark):
  bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-black/80
  (or hover:bg-black/90 / hover:bg-white/90 depending on light/dark section)

Outline Button:
  border border-black/20 text-black px-10 py-5 text-sm tracking-wide
  hover:border-black transition-all duration-300
  (on dark sections: border-white/20 text-white hover:bg-white/10)

Text Link with arrow:
  inline-flex items-center gap-2 text-sm text-black/60 hover:text-black
  transition-colors duration-300
  (arrow "→" animates translate-x-1 on hover via group-hover)

Input (shadcn):
  flex h-9 w-full rounded-md border border-input bg-background px-3 py-1
  text-sm shadow-sm transition-colors placeholder:text-muted-foreground
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring

Card border pattern (all bordered blocks site-wide):
  border border-black/10 hover:border-black/30 transition-all duration-500
  (dark sections: border-white/10)

Divider line:
  h-px bg-black/10  (or bg-white/10 on dark backgrounds)

Eyebrow / label text (used before every section heading):
  text-xs tracking-[0.3em] uppercase text-black/40  (or text-white/40 on dark)

Section heading (all h1/h2):
  style: font-family: 'Playfair Display', serif
  sizes range from text-2xl (small headers) up to text-8xl (Definition
  section "design" word), typically text-3xl md:text-4xl lg:text-5xl for
  standard section headers, text-4xl md:text-6xl lg:text-7xl for hero/page titles

Standard section padding:
  py-32 md:py-48 px-6 md:px-16 lg:px-24  (full marketing sections)
  py-16 to py-20 px-6 md:px-16 lg:px-24  (compact sections: credibility, referral banner)


================================================================
SECTION 11: ANIMATION LIBRARY (Framer Motion → CSS equivalents)
================================================================

If rebuilding outside React/Framer Motion, approximate these with CSS
transitions + an IntersectionObserver (the "isInView" pattern below):

Standard section reveal:
  initial: opacity 0, translateY(40px or 60px)
  animate (on scroll into view, once): opacity 1, translateY(0)
  transition: duration 0.8–1s, easing cubic-bezier(0.22, 1, 0.36, 1)

Staggered list items (Problem section, Method section):
  Each item delays by (0.1s–0.2s × index) after the parent becomes visible

Divider line draw-in:
  initial: scaleX(0), transform-origin: left
  animate: scaleX(1)

Hover micro-interactions (buttons/links):
  arrow translate-x-1 on hover, 300ms
  underline/bottom-border width 0% → 100% on hover, 700ms
  background opacity shifts (hover:bg-black/80, hover:border-black/30, etc.)


================================================================
END OF DOCUMENT
© Heartset Design Co. 2026 — Internal Use Only
================================================================
`;