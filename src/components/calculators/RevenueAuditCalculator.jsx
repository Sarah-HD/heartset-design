import React, { useState } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function RevenueAuditCalculator() {
  // Inputs
  const [corePrice, setCorePrice] = useState(10000);
  const [coreClients, setCoreClients] = useState(3);
  const [midPrice, setMidPrice] = useState(5000);
  const [midClients, setMidClients] = useState(2);
  const [lowPrice, setLowPrice] = useState(1500);
  const [lowSales, setLowSales] = useState(5);
  const [fixedCosts, setFixedCosts] = useState(2000);
  const [totalMonthlyHours, setTotalMonthlyHours] = useState(160);

  // Calculations
  const coreRevenue = corePrice * coreClients;
  const midRevenue = midPrice * midClients;
  const lowRevenue = lowPrice * lowSales;
  const grossRevenue = coreRevenue + midRevenue + lowRevenue;
  const netRevenue = grossRevenue - fixedCosts;
  const effectiveHourlyRate = totalMonthlyHours > 0 ? netRevenue / totalMonthlyHours : 0;
  const revenueConcentrationRatio = grossRevenue > 0 ? (coreRevenue / grossRevenue) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <p className="text-xs text-black/40 uppercase tracking-widest">Revenue Audit Calculator</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-black/30" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">Use this to audit your <strong>existing or planned</strong> revenue structure. Enter your actual client counts and prices to see your current gross, net, and hourly efficiency. This is a snapshot of what you already have — not a forecast.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid lg:grid-cols-5 gap-8">
        {/* LEFT PANEL - INPUTS (40%) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Core Tier */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Core Tier</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Core Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={corePrice}
                  onChange={(e) => setCorePrice(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Core Clients (#)</Label>
                <Input
                  type="number"
                  min="0"
                  value={coreClients}
                  onChange={(e) => setCoreClients(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Mid Tier */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Mid Tier</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Mid Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={midPrice}
                  onChange={(e) => setMidPrice(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Mid Clients (#)</Label>
                <Input
                  type="number"
                  min="0"
                  value={midClients}
                  onChange={(e) => setMidClients(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Low Tier */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Low Tier</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Low Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={lowPrice}
                  onChange={(e) => setLowPrice(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Low Sales (#)</Label>
                <Input
                  type="number"
                  min="0"
                  value={lowSales}
                  onChange={(e) => setLowSales(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Fixed Costs & Hours */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Operating Metrics</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Fixed Monthly Costs ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Total Monthly Hours Worked</Label>
                <Input
                  type="number"
                  min="0"
                  value={totalMonthlyHours}
                  onChange={(e) => setTotalMonthlyHours(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - OUTPUTS (60%) */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-black/10 p-8 sticky top-6">
            <h3 className="text-lg font-medium mb-8 pb-3 border-b border-black/5">Results</h3>
            
            <div className="space-y-8">
              {/* Revenue Breakdown */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">CORE REVENUE</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Revenue from highest-tier 1:1 or premium clients.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-3xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${coreRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-black/30 mt-1">{coreClients} × ${corePrice.toLocaleString()}</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">MID REVENUE</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Revenue from mid-tier offer clients.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-3xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${midRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-black/30 mt-1">{midClients} × ${midPrice.toLocaleString()}</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">LOW REVENUE</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Revenue from entry-level or group offer.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-3xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${lowRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-black/30 mt-1">{lowSales} × ${lowPrice.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t border-black/5"></div>

              {/* Gross & Net Revenue */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">GROSS REVENUE</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Total revenue from all tiers before fixed costs.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${grossRevenue.toLocaleString()}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">NET REVENUE</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Revenue after fixed costs, before tax.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className={`text-5xl font-light ${netRevenue < 0 ? 'text-red-600' : ''}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${netRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-black/30 mt-1">After ${fixedCosts.toLocaleString()} fixed costs</p>
                </div>
              </div>

              <div className="border-t border-black/5"></div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">EFFECTIVE HOURLY RATE</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">True hourly earnings after fixed costs, including all working hours.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${effectiveHourlyRate.toFixed(2)}
                  </p>
                  <p className="text-xs text-black/30 mt-1">Per hour</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">REVENUE CONCENTRATION</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Dependency risk. High concentration (&gt;70%) means fragile if core clients leave.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {revenueConcentrationRatio.toFixed(1)}%
                  </p>
                  <p className="text-xs text-black/30 mt-1">
                    {revenueConcentrationRatio > 70 ? 'Fragile dependency' : 
                     revenueConcentrationRatio >= 40 ? 'Balanced' : 
                     'Diversified'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-neutral-100 border-l-2 border-black/20 p-6 mt-8">
            <p className="text-sm text-black/70 font-light leading-relaxed">
              Your current revenue structure generates ${grossRevenue.toLocaleString()} monthly, 
              with {revenueConcentrationRatio.toFixed(1)}% concentrated in core tier. 
              At {totalMonthlyHours} hours monthly, your effective hourly rate is ${effectiveHourlyRate.toFixed(2)}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}