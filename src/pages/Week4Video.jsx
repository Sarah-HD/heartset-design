import React from "react";

export default function Week4Video() {
  return (
    <div className="min-h-screen bg-white">
      <div>
        <div className="border-b border-black/10">
          <div className="max-w-6xl mx-auto px-6 md:px-16 py-6"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
          <div className="mb-8">
            <h1 
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Week 4: Execution
            </h1>
            <p className="text-lg text-black/60 font-light leading-relaxed">
              Execute with velocity and discipline.
            </p>
          </div>

          <div className="bg-black aspect-video rounded-lg mb-8 flex items-center justify-center">
            <p className="text-white/60 text-sm">Video Player (Week 4 Content)</p>
          </div>

          <div className="bg-neutral-50 border border-black/10 p-6 mb-8">
            <h3 className="text-lg font-medium mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              This Week You Will:
            </h3>
            <ul className="space-y-2 text-sm text-black/60 font-light">
              <li>• Launch outreach campaigns</li>
              <li>• Track participation metrics</li>
              <li>• Optimize conversion flows</li>
              <li>• Lock operational discipline</li>
            </ul>
          </div>
        </div>

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