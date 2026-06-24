import React from "react";
import { FULL_CONTENT } from "@/lib/contentInventoryText";

const serif = { fontFamily: "'Playfair Display', serif" };

const sections = [
  "I. All Pages & Routes",
  "II. Homepage Marketing Copy (incl. all 7 case studies)",
  "III. Sprint 6500 Page Copy",
  "IV. Sprint Enrollment Page",
  "V. Focus Group Series Cards",
  "VI. Full Slide Scripts — All 3 Days",
  "VII. Homework Form Fields (Days 1–3)",
  "VIII. Research Survey Questions",
  "IX. Focus Group Intake Form — All 8 Steps",
  "X. General Inquiry Form",
  "XI. Referral Intake Form",
  "XII. $10,000 Advisory Application",
  "XIII. Direct Sprint Entry Form",
  "XIV. Session Booking Form",
  "XV. Office Hours Page",
  "XVI. Sprint Week Pages (1–4)",
  "XVII. Contact Page Copy",
  "XVIII. Email Templates (Homework + Survey + Booking)",
  "XIX. Operating Manual — Full Text (All 4 Parts)",
  "XX. Data Entities",
  "XXI. Slide Design Format — Google Fonts & CSS Code",
];

export default function ContentExport() {
  const handleDownload = () => {
    const blob = new Blob([FULL_CONTENT], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Heartset-Design-Platform-Content-Inventory.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="border-b border-black/10 pb-10 mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-black/30 mb-3">Internal Document</p>
          <h1 className="text-4xl mb-3" style={serif}>Platform Content Inventory</h1>
          <p className="text-black/50 font-light text-sm mb-8">
            Complete export of all pages, copy, form questions, full slide scripts, homework,
            survey questions, email templates, operating manual, and slide design CSS + Google Fonts code.
          </p>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-3 text-sm tracking-wide hover:bg-black/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Full Document (.txt)
          </button>
        </div>

        {/* Table of Contents */}
        <div className="mb-12">
          <h2 className="text-xl mb-6" style={serif}>Document Contains</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0">
            {sections.map((item, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-black/5">
                <span className="text-black/20 text-xs mt-0.5 flex-shrink-0">—</span>
                <span className="text-sm text-black/65 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl" style={serif}>Document Preview</h2>
            <button
              onClick={handleDownload}
              className="text-xs text-black/40 hover:text-black transition-colors underline"
            >
              Download full document
            </button>
          </div>
          <pre className="bg-neutral-50 border border-black/10 p-6 text-xs font-mono text-black/55 overflow-auto max-h-80 leading-relaxed whitespace-pre-wrap">
            {FULL_CONTENT.slice(0, 1800)}
            {"\n\n... [Download to view all 21 sections] ..."}
          </pre>
        </div>

        {/* Footer CTA */}
        <div className="pt-8 border-t border-black/10 text-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 text-sm tracking-wide hover:bg-black/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Full Document (.txt)
          </button>
          <p className="text-xs text-black/25 mt-3">© Heartset Design Co. 2026 — Internal Use Only</p>
        </div>

      </div>
    </div>
  );
}