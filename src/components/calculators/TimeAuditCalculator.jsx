import React, { useState } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function TimeAuditCalculator() {
  // Inputs
  const [weeklyHoursPerClient, setWeeklyHoursPerClient] = useState(3);
  const [activeClients, setActiveClients] = useState(5);
  const [adminHours, setAdminHours] = useState(5);
  const [salesHours, setSalesHours] = useState(4);
  const [contentHours, setContentHours] = useState(3);
  const [buffer, setBuffer] = useState(15);
  const [targetCapacity, setTargetCapacity] = useState(160);
  const [netRevenue, setNetRevenue] = useState(30000); // From Revenue Audit

  // Calculations
  const monthlyClientHours = weeklyHoursPerClient * activeClients * 4.33;
  const monthlyTotalHours = (monthlyClientHours + ((adminHours + salesHours + contentHours) * 4.33)) * (1 + buffer / 100);
  const effectiveHourlyRate = monthlyTotalHours > 0 ? netRevenue / monthlyTotalHours : 0;
  const capacityUtilization = targetCapacity > 0 ? (monthlyTotalHours / targetCapacity) * 100 : 0;
  const availableCapacity = targetCapacity - monthlyTotalHours;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* LEFT PANEL - INPUTS (40%) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Client Delivery */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Client Delivery</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Weekly Hours Per Client</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={weeklyHoursPerClient}
                  onChange={(e) => setWeeklyHoursPerClient(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Active Clients (#)</Label>
                <Input
                  type="number"
                  min="0"
                  value={activeClients}
                  onChange={(e) => setActiveClients(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Operations */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Weekly Operations</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Admin Hours</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={adminHours}
                  onChange={(e) => setAdminHours(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Sales Hours</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={salesHours}
                  onChange={(e) => setSalesHours(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Content Hours</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={contentHours}
                  onChange={(e) => setContentHours(Number(e.target.value))}
                  className="border-black/20"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Capacity Settings */}
          <div className="bg-white border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4 pb-3 border-b border-black/5">Capacity Settings</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Buffer (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="50"
                  value={buffer}
                  onChange={(e) => setBuffer(Number(e.target.value))}
                  className="border-black/20"
                />
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={buffer}
                  onChange={(e) => setBuffer(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-black/70 mb-2">Target Monthly Capacity Hours</Label>
                <Select value={targetCapacity.toString()} onValueChange={(val) => setTargetCapacity(Number(val))}>
                  <SelectTrigger className="border-black/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="160">160 (40 hr/week)</SelectItem>
                    <SelectItem value="200">200 (50 hr/week)</SelectItem>
                    <SelectItem value="240">240 (60 hr/week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm font-medium text-black/70">Net Revenue (from Revenue Audit)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-3.5 h-3.5 text-black/40" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">Enter your Net Revenue from the Revenue Audit calculator.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  type="number"
                  min="0"
                  value={netRevenue}
                  onChange={(e) => setNetRevenue(Number(e.target.value))}
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
              {/* Time Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">MONTHLY CLIENT HOURS</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Total hours per month delivering directly to clients.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {monthlyClientHours.toFixed(1)}
                  </p>
                  <p className="text-xs text-black/30 mt-1">{activeClients} clients × {weeklyHoursPerClient} hrs/week</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-black/40 tracking-wide">MONTHLY TOTAL HOURS</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">All working hours including delivery, admin, sales, content, and buffer.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {monthlyTotalHours.toFixed(1)}
                  </p>
                  <p className="text-xs text-black/30 mt-1">Including {buffer}% buffer</p>
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
                          <p className="text-xs">Net Revenue from Revenue Audit divided by Monthly Total Hours.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${effectiveHourlyRate.toFixed(2)}
                  </p>
                  <p className="text-xs text-black/30 mt-1">Per hour</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-black/40 tracking-wide">CAPACITY UTILIZATION</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-black/30" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">Percentage of your realistic working capacity currently being used.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-5xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {capacityUtilization.toFixed(1)}%
                  </p>
                  <p className="text-xs text-black/30 mt-1">
                    {capacityUtilization > 90 ? 'Near ceiling' : 
                     capacityUtilization >= 70 ? 'High utilization' : 
                     'Capacity available'}
                  </p>
                </div>
              </div>

              <div className="border-t border-black/5"></div>

              {/* Available Capacity */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <p className="text-xs text-black/40 tracking-wide">AVAILABLE CAPACITY</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-3 h-3 text-black/30" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">Remaining hours before hitting manual labor ceiling.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className={`text-5xl font-light ${availableCapacity < 0 ? 'text-red-600' : ''}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                  {availableCapacity.toFixed(1)} hrs
                </p>
                <p className="text-xs text-black/30 mt-1">
                  {availableCapacity < 0 ? 'Over capacity' : 'Available this month'}
                </p>
              </div>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-neutral-100 border-l-2 border-black/20 p-6 mt-8">
            <p className="text-sm text-black/70 font-light leading-relaxed">
              You're working {monthlyTotalHours.toFixed(1)} hours monthly at {capacityUtilization.toFixed(1)}% capacity utilization. 
              Your effective hourly rate is ${effectiveHourlyRate.toFixed(2)}, 
              with {availableCapacity < 0 ? 'no' : availableCapacity.toFixed(1)} hours available before hitting manual labor ceiling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}