import React from "react";
import Week1HomeworkCards from "@/components/homework/Week1HomeworkCards";
import Week1RevenueCalculator from "@/components/calculators/Week1RevenueCalculator";

export default function Week1Video() {
  return (
    <div className="min-h-screen bg-white">
      <div>
        {/* Header */}
        <div className="border-b border-black/10">
          <div className="max-w-6xl mx-auto px-6 md:px-16 py-6"></div>
        </div>

      {/* Video Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        <div className="mb-8">
          <h1 
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Week 1: Blueprint Lock
          </h1>
          <p className="text-lg text-black/60 font-light leading-relaxed">
            Define structure before movement.
          </p>
        </div>

        {/* Video Player Placeholder */}
        <div className="bg-black aspect-video rounded-lg mb-8 flex items-center justify-center">
          <p className="text-white/60 text-sm">Video Player (Add your video URL here)</p>
        </div>

        <div className="bg-neutral-50 border border-black/10 p-6 mb-8">
          <h3 className="text-lg font-medium mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            This Week You Will:
          </h3>
          <ul className="space-y-2 text-sm text-black/60 font-light">
            <li>• Extract your operational reality</li>
            <li>• Identify margin leaks</li>
            <li>• Define authority positioning</li>
            <li>• Map structural constraints</li>
          </ul>
        </div>
      </div>

      {/* Week 1 Revenue Calculator */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12 border-t border-black/10">
        <div className="mb-8">
          <h2 className="text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Revenue Target Calculator
          </h2>
          <p className="text-sm text-black/50 font-light">Work backward from your revenue goal. Stress-test with scenario presets.</p>
        </div>
        <Week1RevenueCalculator />
      </div>

      {/* Homework Cards Section */}
      <Week1HomeworkCards />

        {/* Footer */}
        <div className="bg-black text-white">
          <div className="max-w-4xl mx-auto px-6 md:px-16 py-12 text-center">
            <p className="text-sm font-light text-white/60">
              © {new Date().getFullYear()} Heartset Design
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}