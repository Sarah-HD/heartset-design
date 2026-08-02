import React from "react";
import { DESIGN_EXPORT } from "@/lib/designExportText";

const serif = { fontFamily: "'Playfair Display', serif" };

const sections = [
  "1. Brand Colors (Hex/RGBA)",
  "2. Font Families (Google Fonts import)",
  "3. Images/Assets Used",
  "4. Global CSS (theme excerpt)",
  "5. Home Page — Full HTML/Tailwind Structure (all 10 sections)",
  "6. Contact Page — Full Structure",
  "7. Referral Page — Full Structure",
  "8. Form Markup (General Inquiry + Referral Intake)",
  "9. Apply Page — Full Structure",
  "10. Shared UI Primitives (buttons, inputs, cards)",
  "11. Animation Library (Framer Motion → CSS equivalents)",
];

export default function DesignExport() {
  const handleDownload = () => {
    const blob = new Blob([DESIGN_EXPORT], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Heartset-Design-HTML-CSS-Theme-Export.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="border-b border-black/10 pb-10 mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-black/30 mb-3">Internal Document</p>
          <h1 className="text-4xl mb-3" style={serif}>HTML / CSS / Theme Export</h1>
          <p className="text-black/50 font-light text-sm mb-8">
            Complete rendered HTML structure, Tailwind classes, custom styles, brand
            colors, font families, and image links for the Home, Contact, Referral,
            and Apply pages.
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
            {DESIGN_EXPORT.slice(0, 1800)}
            {"\n\n... [Download to view all 11 sections] ..."}
          </pre>
        </div>

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