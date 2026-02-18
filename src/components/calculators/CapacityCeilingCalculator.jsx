import React, { useState } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function CapacityCeilingCalculator() {
  // Inputs
  const [availableMonthlyHours, setAvailableMonthlyHours] = useState(140);
  const [requiredHoursPerClient, setRequiredHoursPerClient] = useState(8);
  const [focusGroupHours, setFocusGroupHours] = useState(20);
  const [adminHours, setAdminHours] = useState(15);
  const [groupPrice, setGroupPrice] = useState(2500);
  const [projectedGroupSales, setProjectedGroupSales] = useState(12);
  const [corePrice, setCorePrice] = useState(10000);

  // Calculations
  const max1to1Clients = Math.floor((availableMonthlyHours - focusGroupHours - adminHours) / requiredHoursPerClient);
  const max1to1Revenue = max1to1Clients * corePrice;
  const focusGroupRevenuePotential = projectedGroupSales * groupPrice;
  const totalRevenueAtCapacity = max1to1Revenue + focusGroupRevenuePotential;
  const timeRemaining = availableMonthlyHours - (max1to1Clients * requiredHoursPerClient) - focusGroupHours - adminHours;
  const scalabilityRatio = max1to1Revenue > 0 ? (focusGroupRevenuePotential / max1to1Revenue) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* LEFT PANEL - INPUTS (40%) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Time Allocation */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Time Allocation</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Available Monthly Hours</Label>
                <Input
                  type="number"
                  min="0"
                  value={availableMonthlyHours}
                  onChange={(e) => setAvailableMonthlyHours(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Required Hours Per Client</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={requiredHoursPerClient}
                  onChange={(e) => setRequiredHoursPerClient(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Focus Group Hours</Label>
                <Input
                  type="number"
                  min="0"
                  value={focusGroupHours}
                  onChange={(e) => setFocusGroupHours(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Admin Hours</Label>
                <Input
                  type="number"
                  min="0"
                  value={adminHours}
                  onChange={(e) => setAdminHours(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Pricing</h3>
            
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
                <Label className="text-sm font-medium text-black/70 mb-2">Group Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={groupPrice}
                  onChange={(e) => setGroupPrice(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Projected Group Sales (#)</Label>
                <Input
                  type="number"
                  min="0"
                  value={projectedGroupSales}
                  onChange={(e) => setProjectedGroupSales(Number(e.target.value))}
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
              {/* Capacity Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">MAX 1:1 CLIENTS</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Maximum number of 1:1 clients you can serve at capacity.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {max1to1Clients}
                  </p>
                  <p className="text-xs text-black/30 mt-1">Clients at {requiredHoursPerClient} hrs each</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">TIME REMAINING</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Unused hours after all allocations.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {timeRemaining.toFixed(1)}
                  </p>
                  <p className="text-xs text-black/30 mt-1">Hours available</p>
                </div>
              </div>

              <div className="border-t border-black/5"></div>

              {/* Revenue Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">MAX 1:1 REVENUE</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Revenue from maximum 1:1 client capacity.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${max1to1Revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-black/30 mt-1">{max1to1Clients} × ${corePrice.toLocaleString()}</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">GROUP REVENUE POTENTIAL</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Projected revenue from group/cohort offer.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${focusGroupRevenuePotential.toLocaleString()}
                  </p>
                  <p className="text-xs text-black/30 mt-1">{projectedGroupSales} × ${groupPrice.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t border-black/5"></div>

              {/* Total & Ratio */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">TOTAL REVENUE AT CAPACITY</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Combined revenue from 1:1 and group at full capacity.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${totalRevenueAtCapacity.toLocaleString()}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">SCALABILITY RATIO</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Revenue potential from scalable infrastructure vs. manual 1:1 labor.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {scalabilityRatio.toFixed(1)}%
                  </p>
                  <p className="text-xs text-black/30 mt-1">
                    {scalabilityRatio < 25 ? 'Manual labor dependent' : 
                     scalabilityRatio <= 75 ? 'Transitioning to scale' : 
                     'Infrastructure-ready'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-neutral-100 border-l-2 border-black/20 p-6 mt-8">
            <p className="text-sm text-black/70 font-light leading-relaxed">
              At capacity, you can serve {max1to1Clients} 1:1 clients generating ${max1to1Revenue.toLocaleString()}, 
              plus ${focusGroupRevenuePotential.toLocaleString()} from group delivery. 
              Your {scalabilityRatio.toFixed(1)}% scalability ratio shows you're {scalabilityRatio > 75 ? 'infrastructure-ready' : scalabilityRatio >= 25 ? 'transitioning to scale' : 'manual labor dependent'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}