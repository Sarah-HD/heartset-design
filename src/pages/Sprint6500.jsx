import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import DirectEntryRequestForm from "@/components/forms/DirectEntryRequestForm";

export default function Sprint6500() {
  const [showDirectEntryForm, setShowDirectEntryForm] = useState(false);

  const scrollToPathways = () => {
    const pathwaysSection = document.getElementById('pathways');
    if (pathwaysSection) {
      pathwaysSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: HERO */}
      <div className="border-b border-black/20">
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-32">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Authority Infrastructure™
            <br />
            Implementation Sprint
          </h1>
          <p className="text-xl md:text-2xl text-black/70 font-light leading-relaxed max-w-3xl mb-16">
            A 28-day execution cycle that formalizes your expertise into institutional infrastructure—without increasing personal labor.
          </p>

          {/* The Stature Gap */}
          <div className="mb-16">
            <h2 
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Stature Gap
            </h2>
            <p className="text-lg text-black/60 font-light leading-relaxed mb-8">
              Your expertise has outpaced your current infrastructure. When this gap exists, growth depends on personal effort instead of structural leverage.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-black mt-2.5 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-black/80 mb-1">Fragile Momentum:</p>
                  <p className="text-black/60 font-light">Growth slows the moment your output slows.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-black mt-2.5 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-black/80 mb-1">The Capacity Ceiling:</p>
                  <p className="text-black/60 font-light">You have reached the limit of your manual bandwidth. You cannot take more clients without sacrificing your quality of life.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-black mt-2.5 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-black/80 mb-1">Infrastructure Gap:</p>
                  <p className="text-black/60 font-light">You have a practice, but not yet a machine. At your level, that inefficiency compounds.</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={scrollToPathways}
            className="bg-black text-white px-8 py-4 text-sm tracking-wide hover:bg-black/90 transition-colors duration-300 inline-flex items-center gap-3"
          >
            <span>Explore Entry Options</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SECTION 2: Operational Containment */}
      <div className="border-b border-black/20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-28">
          <h2 
            className="text-3xl md:text-4xl mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Commitment Structure
          </h2>
          <p className="text-lg text-black/60 font-light leading-relaxed mb-12">
            This sprint is structured for professionals operating at full capacity. We respect your bandwidth and focus exclusively on high-leverage installation.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-black/10 p-8">
              <p className="font-medium text-black/80 mb-2">Time Requirement:</p>
              <p className="text-black/60 font-light">3–5 focused hours per week.</p>
            </div>
            <div className="bg-white border border-black/10 p-8">
              <p className="font-medium text-black/80 mb-2">Execution Style:</p>
              <p className="text-black/60 font-light">Asynchronous modules. Build on your own schedule.</p>
            </div>
            <div className="bg-white border border-black/10 p-8">
              <p className="font-medium text-black/80 mb-2">Direct Support:</p>
              <p className="text-black/60 font-light">Weekly Live Office Hours (Wednesdays, 2–3 PM).</p>
            </div>
            <div className="bg-white border border-black/10 p-8">
              <p className="font-medium text-black/80 mb-2">Engineering for Completion:</p>
              <p className="text-black/60 font-light">Every task is a direct step toward a functional, documented Blueprint.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Method Origin */}
      <div className="border-b border-black/20">
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-28">
          <div className="bg-neutral-50 border-l-2 border-black/20 pl-8 py-8">
            <h2 
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Proven Execution
            </h2>
            <p className="text-lg text-black/60 font-light leading-relaxed mb-8">
              This protocol was developed through direct implementation across high-stakes sales and advisory environments. It is a refined execution sequence tested with real market assets:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-black/60 mt-2.5 flex-shrink-0"></div>
                <p className="text-black/70 font-light">8+ Months of Live Market Testing</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-black/60 mt-2.5 flex-shrink-0"></div>
                <p className="text-black/70 font-light">Direct Implementation in Insurance and Consulting Environments</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-black/60 mt-2.5 flex-shrink-0"></div>
                <p className="text-black/70 font-light">Iterative Installation with High-Net-Worth Advisory Assets</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-black/60 mt-2.5 flex-shrink-0"></div>
                <p className="text-black/70 font-light">Outcome-Focused Engineering (Not Theory)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: The Tangible Output */}
      <div className="border-b border-black/20 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-28">
          <h2 
            className="text-3xl md:text-4xl mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Tangible Output
          </h2>
          <p className="text-xl text-white/70 font-light leading-relaxed mb-12">
            By Day 28, you will not be "thinking differently." You will have documentation and deployment in place.
          </p>
          <div className="space-y-8">
            <div className="border-l-2 border-white/30 pl-6">
              <p className="font-medium text-white mb-2">A Formalized Authority Blueprint:</p>
              <p className="text-white/60 font-light">Your intellectual property extracted into a repeatable protocol.</p>
            </div>
            <div className="border-l-2 border-white/30 pl-6">
              <p className="font-medium text-white mb-2">A Live Validation Engine:</p>
              <p className="text-white/60 font-light">A system for testing market demand using real-world outreach.</p>
            </div>
            <div className="border-l-2 border-white/30 pl-6">
              <p className="font-medium text-white mb-2">A Scalable Offer Architecture:</p>
              <p className="text-white/60 font-light">A suite of offers designed to grow without increasing your delivery hours.</p>
            </div>
            <div className="border-l-2 border-white/30 pl-6">
              <p className="font-medium text-white mb-2">A Structured Routing Logic:</p>
              <p className="text-white/60 font-light">The data-driven pathway that fixes structural marketing leaks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: Entry Criteria */}
      <div className="border-b border-black/20">
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-28">
          <h2 
            className="text-3xl md:text-4xl mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Institutional Alignment
          </h2>
          <p className="text-lg text-black/60 font-light leading-relaxed mb-12">
            This cycle assumes existing revenue and proven expertise. It is specifically for:
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 bg-black mt-2.5 flex-shrink-0"></div>
              <p className="text-lg text-black/70 font-light">Tenured Professionals & Master Coaches with established IP.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 bg-black mt-2.5 flex-shrink-0"></div>
              <p className="text-lg text-black/70 font-light">Operators with Existing Revenue who have reached a manual capacity ceiling.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 bg-black mt-2.5 flex-shrink-0"></div>
              <p className="text-lg text-black/70 font-light">High-Performers ready to execute a system installation within a 28-day window.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: Entry Pathways */}
      <div id="pathways" className="border-b border-black/20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-28">
          <h2 
            className="text-3xl md:text-4xl mb-16"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Entry Pathways
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Option 1: The Validation Focus Group */}
            <div className="bg-white border-2 border-black/20 p-10">
              <div className="mb-8">
                <p className="text-sm font-medium tracking-wider text-black/50 mb-4">OPTION 1</p>
                <h3 className="text-2xl md:text-3xl font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Validation Focus Group
                </h3>
                <p className="text-sm font-medium text-black/60 mb-6">Recommended Path.</p>
              </div>
              <p className="text-lg text-black/60 font-light leading-relaxed mb-6">
                Enter the diagnostic cycle to validate market demand and identify structural leaks before full installation.
              </p>
              <p className="text-lg text-black/60 font-light leading-relaxed mb-10">
                The Focus Group is a structured diagnostic environment. Most operators begin here.
              </p>
              <Link to={createPageUrl("FocusGroup")}>
                <button className="bg-black text-white px-8 py-4 text-sm tracking-wide hover:bg-black/90 transition-colors duration-300 w-full inline-flex items-center justify-center gap-3">
                  <span>Join the Focus Group</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Option 2: Direct Sprint Entry */}
            <div className="bg-white border border-black/10 p-10">
              <div className="mb-8">
                <p className="text-sm font-medium tracking-wider text-black/40 mb-4">OPTION 2</p>
                <h3 className="text-2xl md:text-3xl font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Direct Sprint Entry
                </h3>
              </div>
              <p className="text-lg text-black/60 font-light leading-relaxed mb-10">
                For experienced operators generating consistent revenue who require immediate precision refinement.
              </p>
              <button 
                onClick={() => setShowDirectEntryForm(!showDirectEntryForm)}
                className="border-2 border-black/20 text-black px-8 py-4 text-sm tracking-wide hover:bg-black/5 transition-colors duration-300 w-full inline-flex items-center justify-center gap-3"
              >
                <span>{showDirectEntryForm ? "Hide Form" : "Apply for Direct Sprint Entry"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Direct Entry Form */}
          {showDirectEntryForm && (
            <div className="bg-white border border-black/10 p-10 md:p-16">
              <DirectEntryRequestForm />
            </div>
          )}
        </div>
      </div>

      {/* SECTION 7: Final Alignment */}
      <div className="border-b border-black/20 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-28 text-center">
          <h2 
            className="text-3xl md:text-4xl mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Limited Enrollment Cycle
          </h2>
          <p className="text-xl text-white/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            When infrastructure is installed, growth becomes structural. If your expertise has outgrown your backend, this is the correction point.
          </p>
          <button
            onClick={scrollToPathways}
            className="bg-white text-black px-10 py-4 text-sm tracking-wide hover:bg-white/90 transition-colors duration-300 inline-flex items-center gap-3"
          >
            <span>Begin Implementation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
            <p 
              className="text-lg text-black"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Heartset Design
            </p>
            <p className="text-sm text-black/40">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}