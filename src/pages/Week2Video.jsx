import React from "react";
import Week2HomeworkCards from "@/components/week2/Week2HomeworkCards";

export default function Week2Video() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-8">
          <p className="text-xs tracking-[0.3em] uppercase text-black/30 mb-3">Sprint Week 2</p>
          <h1
            className="text-4xl md:text-5xl mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Build the Validation Environment
          </h1>
          <p className="text-lg text-black/50 font-light">
            Not automation. Not scaling. Just build the engine.
          </p>
        </div>
      </div>

      {/* Objective */}
      <div className="max-w-4xl mx-auto px-6 md:px-16 py-10">
        <div className="grid sm:grid-cols-4 gap-px border border-black/10 bg-black/10">
          {[
            { label: "Week 1", desc: "Align Structure" },
            { label: "Week 2", desc: "Build Environment", active: true },
            { label: "Week 3", desc: "Fill Room" },
            { label: "Week 4", desc: "Run & Convert" },
          ].map((step) => (
            <div
              key={step.label}
              className={`px-5 py-4 ${step.active ? 'bg-black text-white' : 'bg-white'}`}
            >
              <p className={`text-xs tracking-widest uppercase mb-1 ${step.active ? 'text-white/50' : 'text-black/30'}`}>{step.label}</p>
              <p className={`text-sm font-medium ${step.active ? 'text-white' : 'text-black/60'}`}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <Week2HomeworkCards />

      {/* Footer */}
      <div className="bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-10 text-center">
          <p className="text-xs font-light text-white/40">
            © {new Date().getFullYear()} Heartset Design
          </p>
        </div>
      </div>
    </div>
  );
}