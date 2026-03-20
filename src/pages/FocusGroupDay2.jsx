import React from "react";
import SlidePlayer from "@/components/focusgroup/SlidePlayer";
import { day2Slides, day2Homework } from "@/components/focusgroup/Day2Slides";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', serif" };

export default function FocusGroupDay2() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link to="/VideoLibrary" className="flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <p className="text-xs tracking-[0.25em] uppercase text-black/25">Focus Group Series</p>
        </div>
      </div>

      {/* Page intro */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12 pb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-black/25 mb-3">Day 2 of 3</p>
        <h1 className="text-3xl md:text-4xl mb-3" style={serif}>Revenue Architecture & Mechanism Design</h1>
        <p className="text-sm text-black/40 font-light">From consulting labor to installable infrastructure.</p>
      </div>

      {/* Slide Player */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <SlidePlayer
          slides={day2Slides}
          dayLabel="Day 2 — Revenue Architecture & Mechanism Design"
          homeworkSlide={day2Homework}
        />
      </div>

      {/* Footer */}
      <div className="bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-10 text-center">
          <p className="text-xs text-white/30 font-light">© {new Date().getFullYear()} Heartset Design</p>
        </div>
      </div>
    </div>
  );
}