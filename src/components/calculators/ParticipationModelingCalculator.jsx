import React, { useState } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ParticipationModelingCalculator() {
  // Outreach Section
  const [outreachVolume, setOutreachVolume] = useState(100);
  const [participationRate, setParticipationRate] = useState(10);

  // Referral Layer
  const [referralParticipation, setReferralParticipation] = useState(50);
  const [referralSlots, setReferralSlots] = useState(2);
  const [referralConversion, setReferralConversion] = useState(40);

  // Sales Allocation
  const [coreConversion, setCoreConversion] = useState(30);
  const [midConversion, setMidConversion] = useState(40);
  const [lowConversion, setLowConversion] = useState(30);

  // Pricing
  const [corePrice, setCorePrice] = useState(10000);
  const [midPrice, setMidPrice] = useState(5000);
  const [lowPrice, setLowPrice] = useState(1500);
  const [fixedCosts, setFixedCosts] = useState(2000);

  // Calculations
  const P0 = Math.round(outreachVolume * (participationRate / 100));
  const R1 = Math.round(P0 * (referralParticipation / 100) * referralSlots * (referralConversion / 100));
  const TR = P0 + R1;

  const coreSales = Math.round(TR * (coreConversion / 100));
  const midSales = Math.round((TR - coreSales) * (midConversion / 100));
  const lowSales = TR - coreSales - midSales;

  const revenue = (coreSales * corePrice) + (midSales * midPrice) + (lowSales * lowPrice);
  const netProfit = revenue - fixedCosts;

  const totalAllocation = coreConversion + midConversion + lowConversion;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* LEFT PANEL - INPUTS (40%) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Outreach */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Outreach</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Outreach Volume</Label>
                <Select value={outreachVolume.toString()} onValueChange={(val) => setOutreachVolume(Number(val))}>
                  <SelectTrigger className="border-black/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                    <SelectItem value="300">300</SelectItem>
                    <SelectItem value="400">400</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                    <SelectItem value="600">600</SelectItem>
                    <SelectItem value="700">700</SelectItem>
                    <SelectItem value="800">800</SelectItem>
                    <SelectItem value="900">900</SelectItem>
                    <SelectItem value="1000">1000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm font-medium text-black/70">Participation Rate (%)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-3.5 h-3.5 text-black/40" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">% of outreach that enters the room (not response rate).</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  type="number"
                  min="5"
                  max="20"
                  value={participationRate}
                  onChange={(e) => setParticipationRate(Number(e.target.value))}
                  className="border-black/20"
                />
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={participationRate}
                  onChange={(e) => setParticipationRate(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Referral Layer */}
          <div className="bg-white border border-black/10 p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-black/5">
              <h3 className="text-lg font-medium">Referral Layer</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-black/40" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">Applies to Wave 1 only in this model.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Referral Participation (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={referralParticipation}
                  onChange={(e) => setReferralParticipation(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Referral Slots</Label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={referralSlots}
                  onChange={(e) => setReferralSlots(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Referral Conversion (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={referralConversion}
                  onChange={(e) => setReferralConversion(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Sales Allocation */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-black/5">Sales Allocation</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Core Conversion (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={coreConversion}
                  onChange={(e) => setCoreConversion(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Mid Conversion (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={midConversion}
                  onChange={(e) => setMidConversion(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Low Conversion (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={lowConversion}
                  onChange={(e) => setLowConversion(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              {totalAllocation > 100 && (
                <p className="text-xs text-red-600 mt-2">
                  Total allocation cannot exceed 100%
                </p>
              )}
            </div>
          </div>

          {/* Section 4: Pricing */}
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
                <Label className="text-sm font-medium text-black/70 mb-2">Fixed Monthly Costs ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(Number(e.target.value))}
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
              {/* Participation Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">INITIAL PARTICIPANTS</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Direct response from outreach. Calculated as Outreach Volume × Participation Rate.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{P0}</p>
                  <p className="text-xs text-black/30 mt-1">{outreachVolume} × {participationRate}%</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">REFERRAL ADDS</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Additional seats from Wave 1 referrals. Calculated from participants who refer × slots × conversion.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{R1}</p>
                  <p className="text-xs text-black/30 mt-1">Wave 1</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">TOTAL ROOM</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Combined total of initial participants and referral adds. This is your full cohort size.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{TR}</p>
                  <p className="text-xs text-black/30 mt-1">P₀ + R₁</p>
                </div>
              </div>

              <div className="border-t border-black/5"></div>

              {/* Sales Breakdown */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">CORE SALES</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">High-intent participants converting to your premium offer. First allocation from total room.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-3xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{coreSales}</p>
                  <p className="text-xs text-black/30 mt-1">{coreConversion}% of {TR}</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">MID SALES</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Mid-tier conversions from remaining participants after core allocation.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-3xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{midSales}</p>
                  <p className="text-xs text-black/30 mt-1">{midConversion}% remaining</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">LOW SALES</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Entry-level offer conversions from remaining participants after core and mid allocation.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-3xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{lowSales}</p>
                  <p className="text-xs text-black/30 mt-1">Remaining</p>
                </div>
              </div>

              <div className="border-t border-black/5"></div>

              {/* Revenue */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">TOTAL REVENUE</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Gross revenue from all three tiers before fixed costs.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${revenue.toLocaleString()}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">NET PROFIT</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Revenue minus fixed costs. This is your margin before tax.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className={`text-5xl font-light ${netProfit < 0 ? 'text-red-600' : ''}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${netProfit.toLocaleString()}
                  </p>
                  <p className="text-xs text-black/30 mt-1">After fixed costs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-neutral-100 border-l-2 border-black/20 p-6 mt-8">
            <p className="text-sm text-black/70 font-light leading-relaxed">
              With {outreachVolume} targeted outreach cycles and a {participationRate}% participation rate, 
              your engine produces {TR} seats. At your current pricing, this yields ${revenue.toLocaleString()} in 
              revenue and ${netProfit.toLocaleString()} in net margin before tax.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}