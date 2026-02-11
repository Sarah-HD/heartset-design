import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DirectEntryRequestForm from "@/components/forms/DirectEntryRequestForm";

export default function Sprint6500() {
  const [showDirectEntryForm, setShowDirectEntryForm] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero - Centered */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-24 md:py-32 text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Authority Infrastructure™
            <br />
            Implementation Sprint
          </h1>
          <p className="text-xl md:text-2xl text-black/60 font-light leading-relaxed max-w-3xl mx-auto">
            A focused 28-day build cycle designed to organize, structure, and operationalize your existing expertise.
          </p>
          <p className="text-lg md:text-xl text-black/40 font-light mt-6 max-w-2xl mx-auto">
            This is a contained execution environment for professionals who are ready to formalize what already exists.
          </p>
        </div>
      </div>

      {/* Who This Is For */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-20 md:py-28">
          <h2 
            className="text-3xl md:text-4xl mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Who This Is For
          </h2>
          <p className="text-lg text-black/60 font-light leading-relaxed mb-8">
            This sprint is designed for operators who:
          </p>
          <div className="space-y-6 text-lg text-black/60 font-light leading-relaxed">
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/30 mt-2.5 flex-shrink-0"></span>
              <span>Already have experience, offers, or client work</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/30 mt-2.5 flex-shrink-0"></span>
              <span>Have a method (formal or informal)</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/30 mt-2.5 flex-shrink-0"></span>
              <span>Are ready to structure and refine their delivery</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/30 mt-2.5 flex-shrink-0"></span>
              <span>Want clarity in how their work flows and routes</span>
            </div>
          </div>
          <p className="text-lg text-black/40 font-light leading-relaxed mt-10 italic">
            This is not about inventing something new.<br />
            It's about structuring what's already there.
          </p>
        </div>
      </div>

      {/* What Happens Inside */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-20 md:py-28">
          <h2 
            className="text-3xl md:text-4xl mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Happens Inside
          </h2>
          <p className="text-lg text-black/60 font-light leading-relaxed mb-8">
            Over 28 days, you will:
          </p>
          <div className="space-y-6 text-lg text-black/60 font-light leading-relaxed">
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/30 mt-2.5 flex-shrink-0"></span>
              <span>Clarify and formalize your method</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/30 mt-2.5 flex-shrink-0"></span>
              <span>Organize current assets and delivery structure</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/30 mt-2.5 flex-shrink-0"></span>
              <span>Align pricing and positioning with reality</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/30 mt-2.5 flex-shrink-0"></span>
              <span>Establish routing logic for offers and next steps</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/30 mt-2.5 flex-shrink-0"></span>
              <span>Build a cleaner execution pathway</span>
            </div>
          </div>
          <p className="text-lg text-black/40 font-light leading-relaxed mt-10">
            The sprint is structured, contained, and time-bound.
          </p>
        </div>
      </div>

      {/* Entry Pathways */}
      <div className="border-b border-black/10 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-20 md:py-28">
          <h2 
            className="text-3xl md:text-4xl mb-16"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Entry Pathways
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Standard Entry */}
            <div className="bg-white border border-black/10 p-10">
              <h3 className="text-2xl font-medium mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Standard Entry
              </h3>
              <p className="text-lg text-black/60 font-light leading-relaxed mb-6">
                Most participants enter through the Authority Infrastructure™ Focus Group.
              </p>
              <p className="text-lg text-black/60 font-light leading-relaxed mb-8">
                The Focus Group helps determine readiness and alignment.
              </p>
              <Link to={createPageUrl("FocusGroup")}>
                <Button className="bg-black text-white hover:bg-black/90 gap-2 w-full md:w-auto">
                  Join the Focus Group
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Direct Entry */}
            <div className="bg-white border border-black/10 p-10">
              <h3 className="text-2xl font-medium mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Direct Entry
              </h3>
              <p className="text-lg text-black/60 font-light leading-relaxed mb-6">
                In select cases, experienced operators may qualify for direct entry into the Sprint.
              </p>
              <p className="text-lg text-black/60 font-light leading-relaxed mb-8">
                This pathway is available for those with demonstrated experience and structured assets.
              </p>
              <Button 
                onClick={() => setShowDirectEntryForm(!showDirectEntryForm)}
                variant="outline"
                className="gap-2 w-full md:w-auto"
              >
                {showDirectEntryForm ? "Hide Form" : "Request Direct Entry"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Entry Form */}
      {showDirectEntryForm && (
        <div className="border-b border-black/10 bg-white">
          <div className="max-w-3xl mx-auto px-6 md:px-16 py-20 md:py-28">
            <DirectEntryRequestForm />
          </div>
        </div>
      )}

      {/* Scope */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-20 md:py-28">
          <h2 
            className="text-3xl md:text-4xl mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Scope
          </h2>
          <p className="text-lg text-black/60 font-light leading-relaxed mb-10">
            This sprint focuses on structured implementation and refinement.
          </p>
          <p className="text-lg text-black/60 font-light leading-relaxed mb-8">
            It does not include:
          </p>
          <div className="space-y-6 text-lg text-black/50 font-light leading-relaxed">
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/20 mt-2.5 flex-shrink-0"></span>
              <span>Custom system builds</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/20 mt-2.5 flex-shrink-0"></span>
              <span>Done-for-you execution</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/20 mt-2.5 flex-shrink-0"></span>
              <span>Ongoing advisory retainers</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-black/20 mt-2.5 flex-shrink-0"></span>
              <span>Therapy, mindset, or emotional processing work</span>
            </div>
          </div>
          <p className="text-lg text-black/40 font-light leading-relaxed mt-10">
            Participants are expected to execute independently within the structure provided.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-12 text-center">
          <p className="text-sm font-light text-white/60">
            © {new Date().getFullYear()} Heartset Design
          </p>
        </div>
      </div>
    </div>
  );
}