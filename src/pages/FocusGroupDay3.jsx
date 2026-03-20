import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import SlidePlayer from "@/components/focusgroup/SlidePlayer";
import { day3Slides, day3Homework } from "@/components/focusgroup/Day3Slides";
import RevenueRhythmCalculator from "@/components/focusgroup/RevenueRhythmCalculator";

const serif = { fontFamily: "'Playfair Display', serif" };

export default function FocusGroupDay3() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Back nav */}
        <Link
          to="/VideoLibrary"
          className="inline-flex items-center gap-1 text-xs text-black/30 hover:text-black transition-colors mb-10"
        >
          <ChevronLeft className="w-3 h-3" />
          Video Library
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-black/25 mb-3">Focus Group Series</p>
          <h1 className="text-3xl md:text-4xl leading-tight mb-3" style={serif}>
            Day 3 — Industry Intelligence Briefing
          </h1>
          <p className="text-sm text-black/40 font-light">
            Revenue Infrastructure Yield Analysis
          </p>
        </div>

        {/* Slide Player */}
        <SlidePlayer
          slides={day3Slides}
          dayLabel="Day 3 · Revenue Yield Analysis"
          homeworkSlide={day3Homework}
        />

        {/* Revenue Rhythm Calculator */}
        <RevenueRhythmCalculator />

      </div>

      <footer className="border-t border-black/5 py-8 mt-16">
        <p className="text-xs text-black/25 text-center tracking-wide">
          © {new Date().getFullYear()} Heartset Design. All rights reserved.
        </p>
      </footer>
    </div>
  );
}