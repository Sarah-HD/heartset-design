import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import ParticipationModelingCalculator from "@/components/calculators/ParticipationModelingCalculator";
import RevenueAuditCalculator from "@/components/calculators/RevenueAuditCalculator";
import TimeAuditCalculator from "@/components/calculators/TimeAuditCalculator";
import CapacityCeilingCalculator from "@/components/calculators/CapacityCeilingCalculator";

export default function AuthorityEngine() {
  const [activeMode, setActiveMode] = useState("participation");

  const modes = [
    { id: "revenue", label: "Revenue Audit" },
    { id: "time", label: "Time Audit" },
    { id: "participation", label: "Participation Modeling" },
    { id: "capacity", label: "Capacity Ceiling" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-black/10 px-6 md:px-16 lg:px-24 py-6">
        <Link 
          to={createPageUrl("Home")}
          className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors duration-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <div className="mb-8">
          <h1 
            className="text-3xl md:text-4xl mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Authority Infrastructure™ Modeling Engine
          </h1>
          <p className="text-black/60 font-light">
            Model revenue, time, and participation before execution.
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex flex-wrap gap-2">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`px-6 py-2.5 text-sm transition-all duration-200 border ${
                activeMode === mode.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-black/60 border-black/20 hover:border-black/40"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </header>

      {/* Calculator Content */}
      <main className="px-6 md:px-16 lg:px-24 py-12">
        {activeMode === "revenue" && <RevenueAuditCalculator />}
        {activeMode === "time" && <TimeAuditCalculator />}
        {activeMode === "participation" && <ParticipationModelingCalculator />}
        {activeMode === "capacity" && <CapacityCeilingCalculator />}
      </main>
    </div>
  );
}