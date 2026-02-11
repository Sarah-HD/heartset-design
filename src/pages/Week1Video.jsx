import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Week1HomeworkCards from "@/components/homework/Week1HomeworkCards";

export default function Week1Video() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 md:px-16 py-6">
          <Link
            to={createPageUrl("VideoLibrary")}
            className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Video Library
          </Link>
        </div>
      </div>

      {/* Video Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        <div className="mb-8">
          <h1 
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Week 1: Operational Manual Overview
          </h1>
          <p className="text-lg text-black/60 font-light leading-relaxed">
            Watch this overview to understand how to complete your Operational Manual using the speech-to-text method.
          </p>
        </div>

        {/* Video Player Placeholder */}
        <div className="bg-black aspect-video rounded-lg mb-8 flex items-center justify-center">
          <p className="text-white/60 text-sm">Video Player (Add your video URL here)</p>
        </div>

        <div className="bg-neutral-50 border border-black/10 p-6 mb-8">
          <h3 className="text-lg font-medium mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            What You'll Learn
          </h3>
          <ul className="space-y-2 text-sm text-black/60 font-light">
            <li>• How to use speech-to-text for rapid extraction</li>
            <li>• The 7-tab structure of your Operational Manual</li>
            <li>• How to access your Google Doc template</li>
            <li>• Why "messy first drafts" are exactly what we need</li>
          </ul>
        </div>
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
  );
}