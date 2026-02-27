import React, { useState } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function ParticipationModelingCalculator() {
  // Mode Selection
  const [calculatorMode, setCalculatorMode] = useState("forward"); // "forward" or "reverse"
  const [scenarioMode, setScenarioMode] = useState("conservative"); // "conservative", "hybrid", "optimized", "custom"
  
  // Reverse Mode Inputs
  const [revenueTarget, setRevenueTarget] = useState(100000);
  
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

  // Calculations (conservative rounding: round down participants and sales)
  const P0 = Math.floor(outreachVolume * (participationRate / 100));
  const R1 = Math.floor(P0 * (referralParticipation / 100) * referralSlots * (referralConversion / 100));
  const TR = P0 + R1;

  const coreSales = Math.floor(TR * (coreConversion / 100));
  const remainingAfterCore = TR - coreSales;
  const midSales = Math.floor(remainingAfterCore * (midConversion / 100));
  const remainingAfterMid = remainingAfterCore - midSales;
  const lowSales = Math.floor(remainingAfterMid * (lowConversion / 100));

  const revenue = (coreSales * corePrice) + (midSales * midPrice) + (lowSales * lowPrice);
  const netProfit = revenue - fixedCosts;

  const totalAllocation = coreConversion + midConversion + lowConversion;

  // Scenario presets
  React.useEffect(() => {
    if (scenarioMode === "conservative") {
      setParticipationRate(8);
      setReferralParticipation(30);
      setReferralConversion(25);
      setCoreConversion(20);
      setMidConversion(30);
      setLowConversion(20);
    } else if (scenarioMode === "hybrid") {
      setParticipationRate(12);
      setReferralParticipation(40);
      setReferralConversion(35);
      setCoreConversion(25);
      setMidConversion(35);
      setLowConversion(25);
    } else if (scenarioMode === "optimized") {
      setParticipationRate(15);
      setReferralParticipation(50);
      setReferralConversion(45);
      setCoreConversion(30);
      setMidConversion(40);
      setLowConversion(30);
    }
  }, [scenarioMode]);

  // Reverse calculations — solve for room size where blended revenue hits target
  // Revenue per room person = core% × corePrice + mid%(of remaining) × midPrice + low%(of remaining after mid) × lowPrice
  // Simplified: revenuePerPerson = (coreConv/100)*corePrice + (1-coreConv/100)*(midConv/100)*midPrice + (1-coreConv/100)*(1-midConv/100)*(lowConv/100)*lowPrice
  const revenuePerPerson =
    (coreConversion / 100) * corePrice +
    (1 - coreConversion / 100) * (midConversion / 100) * midPrice +
    (1 - coreConversion / 100) * (1 - midConversion / 100) * (lowConversion / 100) * lowPrice;
  const requiredRoomSize = revenuePerPerson > 0 ? Math.ceil(revenueTarget / revenuePerPerson) : 0;
  const requiredOutreach = Math.ceil(requiredRoomSize / (participationRate / 100));
  const requiredCoreSales = Math.floor(requiredRoomSize * (coreConversion / 100));
  const requiredMidSales = Math.floor((requiredRoomSize - requiredCoreSales) * (midConversion / 100));
  const requiredLowSales = Math.floor((requiredRoomSize - requiredCoreSales - requiredMidSales) * (lowConversion / 100));
  const projectedRevenueFromTarget = requiredCoreSales * corePrice + requiredMidSales * midPrice + requiredLowSales * lowPrice;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <p className="text-xs text-black/40 uppercase tracking-widest">Participation Modeling Calculator</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-black/30" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">Use this to <strong>model future revenue</strong> based on outreach volume and conversion rates. Forward mode shows what a given effort level produces. Reverse mode works backwards from a revenue target to show exactly how many people you need to reach.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* Mode Toggle */}
      <div className="mb-8 bg-white border border-black/10 p-6">
        <div className="flex gap-4 mb-4">
          <Button
            onClick={() => setCalculatorMode("forward")}
            variant={calculatorMode === "forward" ? "default" : "outline"}
            className={calculatorMode === "forward" ? "bg-black text-white" : ""}
          >
            Forward Modeling
          </Button>
          <Button
            onClick={() => setCalculatorMode("reverse")}
            variant={calculatorMode === "reverse" ? "default" : "outline"}
            className={calculatorMode === "reverse" ? "bg-black text-white" : ""}
          >
            Reverse Target Modeling
          </Button>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-black/70">Scenario Preset</Label>
          <div className="flex gap-2 flex-wrap">
            {["conservative", "hybrid", "optimized", "custom"].map(mode => (
              <Button
                key={mode}
                onClick={() => setScenarioMode(mode)}
                variant={scenarioMode === mode ? "default" : "outline"}
                size="sm"
                className={scenarioMode === mode ? "bg-black text-white capitalize" : "capitalize"}
              >
                {mode}
              </Button>
            ))}
          </div>
          <p className="text-xs text-black/40">Sets participation rate, referral conversion, and core/mid/low conversion percentages</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* LEFT PANEL - INPUTS (40%) */}
        <div className="lg:col-span-2 space-y-8">
          {calculatorMode === "reverse" && (
            <div className="bg-white border border-black/10 p-6">
              <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Revenue Target</h3>
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Target Revenue ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={revenueTarget}
                  onChange={(e) => setRevenueTarget(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
            </div>
          )}
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
                        <p className="text-xs">% of outreach that enters the room (not response rate). Conservative: 8-10%, Optimized: 15-20%.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  type="number"
                  min="5"
                  max="20"
                  value={participationRate}
                  onChange={(e) => {
                    setParticipationRate(Number(e.target.value));
                    setScenarioMode("custom");
                  }}
                  className="border-black/20"
                  disabled={scenarioMode !== "custom" && calculatorMode === "forward"}
                />
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={participationRate}
                  onChange={(e) => {
                    setParticipationRate(Number(e.target.value));
                    setScenarioMode("custom");
                  }}
                  className="w-full mt-2"
                  disabled={scenarioMode !== "custom" && calculatorMode === "forward"}
                />
                <p className="text-xs text-black/40 mt-1">
                  {participationRate <= 10 ? "Conservative" : participationRate <= 14 ? "Hybrid" : "Optimized"}
                </p>
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
            <h3 className="text-lg font-medium mb-8 pb-3 border-b border-black/5">
              {calculatorMode === "forward" ? "Results" : "Reverse Target Results"}
            </h3>
            
            <div className="space-y-8">
              {calculatorMode === "reverse" && (
                <>
                  <div className="bg-neutral-50 border border-black/10 p-4 mb-2">
                    <p className="text-xs text-black/50 mb-3 font-medium">WHAT YOU NEED TO HIT ${revenueTarget.toLocaleString()}</p>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-black/40 tracking-wide mb-1">REQUIRED OUTREACH</p>
                        <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {requiredOutreach}
                        </p>
                        <p className="text-xs text-black/30 mt-1">{participationRate}% participation rate</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/40 tracking-wide mb-1">REQUIRED ROOM SIZE</p>
                        <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {requiredRoomSize}
                        </p>
                        <p className="text-xs text-black/30 mt-1">Blended conversion model</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/40 tracking-wide mb-1">PROJECTED REVENUE</p>
                        <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                          ${projectedRevenueFromTarget.toLocaleString()}
                        </p>
                        <p className="text-xs text-black/30 mt-1">vs. ${revenueTarget.toLocaleString()} target</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-black/5">
                      <div>
                        <p className="text-xs text-black/40 mb-1">CORE SALES NEEDED</p>
                        <p className="text-2xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{requiredCoreSales}</p>
                        <p className="text-xs text-black/30">@ ${corePrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/40 mb-1">MID SALES NEEDED</p>
                        <p className="text-2xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{requiredMidSales}</p>
                        <p className="text-xs text-black/30">@ ${midPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/40 mb-1">LOW SALES NEEDED</p>
                        <p className="text-2xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{requiredLowSales}</p>
                        <p className="text-xs text-black/30">@ ${lowPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-black/5"></div>
                </>
              )}
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
            {calculatorMode === "forward" ? (
              <p className="text-sm text-black/70 font-light leading-relaxed">
                With {outreachVolume} targeted outreach cycles and a {participationRate}% participation rate, 
                your engine produces {TR} seats. At your current pricing, this yields ${revenue.toLocaleString()} in 
                revenue and ${netProfit.toLocaleString()} in net margin before tax.
              </p>
            ) : (
              <p className="text-sm text-black/70 font-light leading-relaxed">
                To hit your ${revenueTarget.toLocaleString()} target using a <strong>{scenarioMode}</strong> conversion model, 
                you need a room of {requiredRoomSize} participants ({requiredCoreSales} Core, {requiredMidSales} Mid, {requiredLowSales} Low), 
                requiring {requiredOutreach} targeted outreach contacts at {participationRate}% participation.
                Projected blended revenue: ${projectedRevenueFromTarget.toLocaleString()}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}