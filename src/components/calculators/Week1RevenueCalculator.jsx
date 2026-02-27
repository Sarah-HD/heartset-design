import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SCENARIOS = {
  conservative: { responseRate: 10, closeRate: 15, label: "Conservative" },
  hybrid:       { responseRate: 20, closeRate: 25, label: "Hybrid" },
  optimized:    { responseRate: 30, closeRate: 40, label: "Optimized" },
};

export default function Week1RevenueCalculator() {
  const [revenueGoal, setRevenueGoal] = useState(50000);
  const [offerPrice, setOfferPrice] = useState(6950);
  const [scenario, setScenario] = useState("hybrid");
  const [customMode, setCustomMode] = useState(false);
  const [responseRate, setResponseRate] = useState(20);
  const [closeRate, setCloseRate] = useState(25);

  const activeResponseRate = customMode ? responseRate : SCENARIOS[scenario].responseRate;
  const activeCloseRate    = customMode ? closeRate    : SCENARIOS[scenario].closeRate;

  const requiredClients       = offerPrice > 0 ? Math.ceil(revenueGoal / offerPrice) : 0;
  const requiredCalls         = activeCloseRate > 0 ? Math.ceil(requiredClients / (activeCloseRate / 100)) : 0;
  const requiredOutreach      = activeResponseRate > 0 ? Math.ceil(requiredCalls / (activeResponseRate / 100)) : 0;
  const hundredContactOk      = requiredOutreach <= 100;
  const outreachGap           = requiredOutreach - 100;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-8">

        {/* INPUTS */}
        <div className="lg:col-span-2 space-y-6">
          {/* Goal & Offer */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-5 pb-3 border-b border-black/5">Your Numbers</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2 block">Revenue Goal ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={revenueGoal}
                  onChange={(e) => setRevenueGoal(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2 block">Core Offer Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
            </div>
          </div>

          {/* Scenario Toggle */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-5 pb-3 border-b border-black/5">Scenario</h3>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {Object.entries(SCENARIOS).map(([key, s]) => (
                <button
                  key={key}
                  onClick={() => { setScenario(key); setCustomMode(false); }}
                  className={`py-2 px-3 text-xs font-medium border transition-colors ${
                    !customMode && scenario === key
                      ? "bg-black text-white border-black"
                      : "bg-white text-black/60 border-black/20 hover:border-black/40"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-xs text-black/50">Response Rate</Label>
                  <span className="text-xs font-medium">{activeResponseRate}%</span>
                </div>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={activeResponseRate}
                  onChange={(e) => { setCustomMode(true); setResponseRate(Number(e.target.value)); }}
                  className="border-black/20 h-8 text-sm"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-xs text-black/50">Close Rate</Label>
                  <span className="text-xs font-medium">{activeCloseRate}%</span>
                </div>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={activeCloseRate}
                  onChange={(e) => { setCustomMode(true); setCloseRate(Number(e.target.value)); }}
                  className="border-black/20 h-8 text-sm"
                />
              </div>
            </div>
            {customMode && (
              <p className="text-xs text-black/40 mt-3">Custom mode — select a preset to reset.</p>
            )}
          </div>
        </div>

        {/* OUTPUTS */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-black/10 p-8">
            <h3 className="text-lg font-medium mb-8 pb-3 border-b border-black/5">To Hit ${revenueGoal.toLocaleString()}</h3>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs text-black/40 tracking-wide mb-1">CLIENTS NEEDED</p>
                <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {requiredClients}
                </p>
                <p className="text-xs text-black/30 mt-1">at ${offerPrice.toLocaleString()} each</p>
              </div>
              <div>
                <p className="text-xs text-black/40 tracking-wide mb-1">CALLS NEEDED</p>
                <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {requiredCalls}
                </p>
                <p className="text-xs text-black/30 mt-1">at {activeCloseRate}% close rate</p>
              </div>
              <div>
                <p className="text-xs text-black/40 tracking-wide mb-1">CONVERSATIONS</p>
                <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {requiredCalls}
                </p>
                <p className="text-xs text-black/30 mt-1">discovery → proposal</p>
              </div>
              <div>
                <p className="text-xs text-black/40 tracking-wide mb-1">OUTREACH VOLUME</p>
                <p className={`text-5xl font-light ${!hundredContactOk ? 'text-red-600' : 'text-green-700'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                  {requiredOutreach}
                </p>
                <p className="text-xs text-black/30 mt-1">at {activeResponseRate}% response rate</p>
              </div>
            </div>

            {/* 100 Contact Feasibility */}
            <div className={`border-l-4 p-5 ${hundredContactOk ? 'border-green-600 bg-green-50' : 'border-red-500 bg-red-50'}`}>
              <p className="text-xs tracking-wide font-medium mb-2 uppercase" style={{ color: hundredContactOk ? '#15803d' : '#dc2626' }}>
                100 Contact Check
              </p>
              {hundredContactOk ? (
                <p className="text-sm text-black/70 font-light leading-relaxed">
                  ✓ Your goal is achievable within 100 contacts. You need {requiredOutreach} outreach contacts — leaving {100 - requiredOutreach} contacts of runway.
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-black/70 font-light leading-relaxed">
                    ✗ You need {requiredOutreach} contacts — {outreachGap} more than the 100-contact sprint window.
                  </p>
                  <p className="text-xs text-black/50 font-light">To fix this: raise your price, improve your close rate, or increase your response rate.</p>
                </div>
              )}
            </div>
          </div>

          {/* Insight */}
          <div className="bg-neutral-100 border-l-2 border-black/20 p-5">
            <p className="text-sm text-black/60 font-light leading-relaxed">
              On the <strong>{customMode ? 'custom' : SCENARIOS[scenario].label.toLowerCase()}</strong> scenario: {requiredClients} clients × ${offerPrice.toLocaleString()} = ${(requiredClients * offerPrice).toLocaleString()} — requiring {requiredOutreach} contacts to generate {requiredCalls} qualified conversations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}