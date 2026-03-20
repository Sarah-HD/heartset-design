import React, { useState } from "react";

const serif = { fontFamily: "'Playfair Display', serif" };

export default function RevenueRhythmCalculator() {
  const [price, setPrice] = useState(6950);
  const [capacity, setCapacity] = useState(100);

  const qualified = Math.round(capacity * 0.10);
  const floor = Math.max(1, Math.round(qualified * 0.20));
  const target = Math.max(1, Math.round(qualified * 0.30));
  const floorRevenue = floor * price;
  const targetRevenue = target * price;
  const annualizedFloor = floorRevenue * 4;
  const annualizedTarget = targetRevenue * 4;

  const fmt = (n) => '$' + n.toLocaleString('en-US');

  return (
    <div className="border border-black/15 bg-white mt-8">
      {/* Top rule */}
      <div className="h-[2px] bg-black w-full" />

      <div className="px-6 py-6">
        <p className="text-xs tracking-[0.25em] uppercase text-black/30 mb-1">Revenue Rhythm Calculator</p>
        <h3 className="text-xl mb-5" style={serif}>Model Your Yield</h3>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-black/40 mb-1.5">
              Installation Price
            </label>
            <div className="flex items-center border border-black/15 focus-within:border-black/40 transition-colors">
              <span className="pl-3 pr-1 text-sm text-black/40">$</span>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex-1 py-2 pr-3 text-sm text-black bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-black/40 mb-1.5">
              Outreach Capacity
            </label>
            <div className="flex items-center border border-black/15 focus-within:border-black/40 transition-colors">
              <input
                type="number"
                value={capacity}
                onChange={e => setCapacity(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 py-2 pl-3 text-sm text-black bg-transparent outline-none"
              />
              <span className="pr-3 text-xs text-black/40">contacts</span>
            </div>
          </div>
        </div>

        {/* Logic trace */}
        <div className="border-t border-black/8 pt-4 mb-5">
          <p className="text-xs text-black/30 tracking-[0.12em] uppercase mb-3">Yield Model</p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-black/50">
              <span>{capacity} outreach → ~10% qualified</span>
              <span className="font-medium text-black/70">{qualified} entrants</span>
            </div>
            <div className="flex justify-between text-xs text-black/50">
              <span>Floor install rate (20% of qualified)</span>
              <span className="font-medium text-black/70">{floor} installs</span>
            </div>
            <div className="flex justify-between text-xs text-black/50">
              <span>Target install rate (30% of qualified)</span>
              <span className="font-medium text-black/70">{target} installs</span>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/[0.03] p-4">
            <p className="text-xs tracking-[0.12em] uppercase text-black/35 mb-1">Floor (Conservative)</p>
            <p className="text-2xl font-light text-black" style={serif}>{fmt(floorRevenue)}</p>
            <p className="text-xs text-black/35 mt-1">{floor} install{floor !== 1 ? 's' : ''} × {fmt(price)}</p>
          </div>
          <div className="bg-black/[0.03] p-4">
            <p className="text-xs tracking-[0.12em] uppercase text-black/35 mb-1">Target</p>
            <p className="text-2xl font-light text-black" style={serif}>{fmt(targetRevenue)}</p>
            <p className="text-xs text-black/35 mt-1">{target} install{target !== 1 ? 's' : ''} × {fmt(price)}</p>
          </div>
        </div>

        {/* Annualized */}
        <div className="mt-3 border border-black/10 p-4">
          <p className="text-xs tracking-[0.12em] uppercase text-black/35 mb-2">Annualized Rhythm (4 Cycles)</p>
          <div className="flex items-baseline gap-4">
            <div>
              <p className="text-xs text-black/35">Floor</p>
              <p className="text-xl font-light" style={serif}>{fmt(annualizedFloor)}</p>
            </div>
            <span className="text-black/20 text-sm">→</span>
            <div>
              <p className="text-xs text-black/35">Target</p>
              <p className="text-xl font-light" style={serif}>{fmt(annualizedTarget)}</p>
            </div>
          </div>
          <p className="text-xs text-black/30 italic mt-2">Predictability &gt; Volume</p>
        </div>
      </div>

      <div className="px-6 pb-3">
        <p className="text-[10px] text-black/20">© Heartset Design 2026. Proprietary yield model. For planning purposes only.</p>
      </div>
    </div>
  );
}