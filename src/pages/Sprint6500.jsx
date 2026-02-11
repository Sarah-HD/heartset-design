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
      {/* Hero */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-20 md:py-32">
          <h1 
            className="text-4xl md:text-6xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Authority Infrastructure™
            <br />
            Implementation Sprint
          </h1>
          <p className="text-xl md:text-2xl text-black/70 font-light leading-relaxed">
            A structured 28-day execution sprint for operators with existing expertise.
          </p>
          <p className="text-lg text-black/50 font-light mt-4">
            No pricing hype. No promises.
          </p>
        </div>
      </div>

      {/* Who This Is For */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <h2 
            className="text-3xl md:text-4xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Who This Is For
          </h2>
          <p className="text-lg text-black/70 font-light leading-relaxed">
            This sprint is designed for professionals who already have experience, methods, or assets and need to organize, validate, and route them into a functional system.
          </p>
          <p className="text-lg text-black/70 font-light leading-relaxed mt-4">
            This is not a beginner program and does not involve brainstorming or idea generation.
          </p>
        </div>
      </div>

      {/* What Happens Inside */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <h2 
            className="text-3xl md:text-4xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Happens Inside
          </h2>
          <p className="text-lg text-black/70 font-light leading-relaxed mb-8">
            Participants move through a structured process that focuses on:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-black/40 mt-1">•</span>
              <span className="text-lg text-black/70 font-light leading-relaxed">
                Organizing existing methods and assets
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black/40 mt-1">•</span>
              <span className="text-lg text-black/70 font-light leading-relaxed">
                Validating demand and delivery reality
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black/40 mt-1">•</span>
              <span className="text-lg text-black/70 font-light leading-relaxed">
                Establishing routing logic for offers and next steps
              </span>
            </li>
          </ul>
          <p className="text-lg text-black/70 font-light leading-relaxed mt-8">
            All work is execution-based and time-contained.
          </p>
        </div>
      </div>

      {/* How Entry Works */}
      <div className="border-b border-black/10 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <h2 
            className="text-3xl md:text-4xl mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How Entry Works
          </h2>

          {/* Standard Entry */}
          <div className="bg-white border border-black/10 p-8 mb-8">
            <h3 className="text-xl font-medium mb-4">Standard Entry</h3>
            <p className="text-black/70 font-light leading-relaxed mb-6">
              Most participants enter through the Authority Infrastructure™ Focus Group.
              <br />
              The Focus Group determines readiness and appropriate next steps.
            </p>
            <Link to={createPageUrl("FocusGroup")}>
              <Button className="bg-black text-white hover:bg-black/90 gap-2">
                Join the Focus Group
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Direct Entry */}
          <div className="bg-white border border-black/10 p-8">
            <h3 className="text-xl font-medium mb-4">Direct Entry (Restricted)</h3>
            <p className="text-black/70 font-light leading-relaxed mb-6">
              In limited cases, experienced operators may qualify for direct entry into the Sprint.
              <br />
              <br />
              Direct entry is not public and requires verification.
            </p>
            <Button 
              onClick={() => setShowDirectEntryForm(!showDirectEntryForm)}
              variant="outline"
              className="gap-2"
            >
              {showDirectEntryForm ? "Hide Form" : "Request Direct Entry"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Direct Entry Form */}
      {showDirectEntryForm && (
        <div className="border-b border-black/10 bg-white">
          <div className="max-w-3xl mx-auto px-6 md:px-16 py-16 md:py-24">
            <DirectEntryRequestForm />
          </div>
        </div>
      )}

      {/* What This Is Not */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <h2 
            className="text-3xl md:text-4xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What This Is Not
          </h2>
          <p className="text-lg text-black/70 font-light leading-relaxed mb-8">
            This sprint does not include:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-black/40 mt-1">•</span>
              <span className="text-lg text-black/70 font-light leading-relaxed">
                Custom system builds
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black/40 mt-1">•</span>
              <span className="text-lg text-black/70 font-light leading-relaxed">
                Done-for-you services
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black/40 mt-1">•</span>
              <span className="text-lg text-black/70 font-light leading-relaxed">
                Open-ended consulting
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black/40 mt-1">•</span>
              <span className="text-lg text-black/70 font-light leading-relaxed">
                Emotional processing or mindset coaching
              </span>
            </li>
          </ul>
          <p className="text-lg text-black/70 font-light leading-relaxed mt-8">
            Participation requires independent execution.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-12 text-center">
          <p className="text-sm font-light text-white/60">
            © {new Date().getFullYear()} Heartset Design. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}