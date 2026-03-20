import React, { useEffect, useState } from "react";
import SlidePlayer from "@/components/focusgroup/SlidePlayer";
import { day3Slides, day3Homework } from "@/components/focusgroup/Day3Slides";
import HomeworkForm from "@/components/focusgroup/HomeworkForm";
import RevenueRhythmCalculator from "@/components/focusgroup/RevenueRhythmCalculator";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";

const serif = { fontFamily: "'Playfair Display', serif" };

export default function FocusGroupDay3() {
  const [user, setUser] = useState(null);
  useEffect(() => { base44.auth.me().then(setUser).catch(() => {}); }, []);

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
        <p className="text-xs tracking-[0.3em] uppercase text-black/25 mb-3">Day 3 of 3</p>
        <h1 className="text-3xl md:text-4xl mb-3" style={serif}>Revenue Yield & Infrastructure Decision</h1>
        <p className="text-sm text-black/40 font-light">Conservative yield modeling and predictable revenue rhythm.</p>
      </div>

      {/* Slide Player */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
        <SlidePlayer
          slides={day3Slides}
          dayLabel="Day 3 — Revenue Yield & Infrastructure Decision"
          homeworkSlide={day3Homework}
        />
      </div>

      {/* Revenue Rhythm Calculator */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
        <RevenueRhythmCalculator />
      </div>

      {/* Homework Form */}
      <div id="homework" className="max-w-4xl mx-auto px-6 md:px-12 pb-12" style={{ scrollMarginTop: '90px' }}>
        <HomeworkForm day={3} userEmail={user?.email || ''} />
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