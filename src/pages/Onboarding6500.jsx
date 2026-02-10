import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Onboarding6500() {
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [formData, setFormData] = useState({
    hasMethod: null,
    methodName: "",
    noMethodName: false,
    methodComponents: ["", "", "", "", "", "", "", ""],
    existingAssets: [],
    primaryAudience: "",
    audienceLocation: "",
    highestPrice: "",
    hasLowerTier: null,
    capacityLimits: [],
    credentials: ["", "", "", ""],
    outcomes: ["", "", ""],
    weeklyClientHours: "",
    weeklyAdminHours: "",
    deliveryFormat: [],
    toolWebsite: "",
    toolDocuments: "",
    toolEmail: "",
    toolScheduling: "",
    toolForms: "",
    ipAcknowledgement: false,
    executionAcknowledgement: false
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        base44.auth.redirectToLogin();
      }
    };
    loadUser();
  }, []);

  const { data: existingOnboarding } = useQuery({
    queryKey: ['sprintOnboarding', user?.email],
    queryFn: () => base44.entities.SprintOnboarding.filter({ userEmail: user?.email }),
    enabled: !!user,
  });

  useEffect(() => {
    if (existingOnboarding && existingOnboarding.length > 0) {
      setSubmitted(true);
    }
  }, [existingOnboarding]);

  const submitMutation = useMutation({
    mutationFn: () => base44.entities.SprintOnboarding.create({
      userEmail: user.email,
      hasMethod: formData.hasMethod,
      methodName: formData.noMethodName ? undefined : (formData.methodName || undefined),
      methodComponents: formData.methodComponents.filter(c => c.trim() !== ""),
      existingAssets: formData.existingAssets,
      primaryAudience: formData.primaryAudience || undefined,
      audienceLocation: formData.audienceLocation || undefined,
      highestPrice: parseFloat(formData.highestPrice) || 0,
      hasLowerTier: formData.hasLowerTier,
      capacityLimits: formData.capacityLimits,
      credentials: formData.credentials.filter(c => c.trim() !== "").join("; ") || undefined,
      outcomes: formData.outcomes.filter(o => o.trim() !== ""),
      weeklyClientHours: formData.weeklyClientHours || undefined,
      weeklyAdminHours: formData.weeklyAdminHours || undefined,
      deliveryFormat: formData.deliveryFormat,
      toolWebsite: formData.toolWebsite || undefined,
      toolDocuments: formData.toolDocuments || undefined,
      toolEmail: formData.toolEmail || undefined,
      toolScheduling: formData.toolScheduling || undefined,
      toolForms: formData.toolForms || undefined,
      ipAcknowledgement: formData.ipAcknowledgement,
      clientIpAcknowledgement: true,
      executionAcknowledgement: formData.executionAcknowledgement
    }),
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = () => {
    if (!formData.ipAcknowledgement || !formData.executionAcknowledgement) {
      alert("Please acknowledge all required terms.");
      return;
    }
    submitMutation.mutate();
  };

  const handleNext = () => {
    if (currentCard < totalCards - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handleBack = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleAssetToggle = (asset) => {
    setFormData(prev => ({
      ...prev,
      existingAssets: prev.existingAssets.includes(asset)
        ? prev.existingAssets.filter(a => a !== asset)
        : [...prev.existingAssets, asset]
    }));
  };

  const handleCapacityToggle = (limit) => {
    setFormData(prev => ({
      ...prev,
      capacityLimits: prev.capacityLimits.includes(limit)
        ? prev.capacityLimits.filter(l => l !== limit)
        : [...prev.capacityLimits, limit]
    }));
  };

  const handleDeliveryToggle = (format) => {
    setFormData(prev => ({
      ...prev,
      deliveryFormat: prev.deliveryFormat.includes(format)
        ? prev.deliveryFormat.filter(f => f !== format)
        : [...prev.deliveryFormat, format]
    }));
  };

  const totalCards = 17;

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-green-600" />
            <h1 className="text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Onboarding Complete
            </h1>
            <p className="text-black/60">
              Your $6,500 Implementation Sprint onboarding has been submitted. You'll receive further instructions via email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    // CARD 0 - METHOD SNAPSHOT
    <Card key="card-0">
      <CardHeader>
        <CardTitle>Method Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>Do you currently use a repeatable method, process, or approach in your work?</Label>
        <RadioGroup 
          value={formData.hasMethod === true ? "yes" : formData.hasMethod === false ? "no" : ""}
          onValueChange={(val) => setFormData(prev => ({ ...prev, hasMethod: val === "yes" }))}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="method-yes" />
            <Label htmlFor="method-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="method-no" />
            <Label htmlFor="method-no">No (my delivery varies based on the client)</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>,

    // CARD 1 - METHOD NAME
    <Card key="card-1">
      <CardHeader>
        <CardTitle>Method Name (Optional)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label>Working name of your method or approach (if you have one)</Label>
          <Input 
            value={formData.methodName}
            onChange={(e) => setFormData(prev => ({ ...prev, methodName: e.target.value }))}
            placeholder='Example: "4-Step Reset," "XYZ Method"'
            className="mt-2"
            disabled={formData.noMethodName}
          />
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={formData.noMethodName}
              onCheckedChange={(checked) => setFormData(prev => ({ 
                ...prev, 
                noMethodName: checked,
                methodName: checked ? "" : prev.methodName
              }))}
              id="no-method-name"
            />
            <Label htmlFor="no-method-name" className="text-sm text-black/60">No formal name yet</Label>
          </div>
        </div>
      </CardContent>
    </Card>,

    // CARD 2 - METHOD COMPONENTS
    <Card key="card-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Method Components
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-black/40 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">These can be steps, phases, or recurring elements. Names only — no explanations.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>List the main parts, phases, or components of how you work (names only)</Label>
        {formData.methodComponents.map((comp, idx) => (
          <Input
            key={idx}
            value={comp}
            onChange={(e) => {
              const newComps = [...formData.methodComponents];
              newComps[idx] = e.target.value;
              setFormData(prev => ({ ...prev, methodComponents: newComps }));
            }}
            placeholder={`Component ${idx + 1}${idx > 2 ? ' (optional)' : ''}`}
            className="mt-2"
          />
        ))}
      </CardContent>
    </Card>,

    // CARD 3 - EXISTING ASSETS
    <Card key="card-3">
      <CardHeader>
        <CardTitle>Existing Assets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>Which of the following currently exist in any form?</Label>
        <p className="text-sm text-black/60">Select all that apply</p>
        <div className="mt-3 space-y-2">
          {[
            "Course",
            "Program",
            "Workshop",
            "Workbook / Guide",
            "E-book or digital material",
            "Coaching / Consulting service",
            "Training / Speaking material",
            "None yet (delivery is mostly live or informal)"
          ].map(asset => (
            <div key={asset} className="flex items-center space-x-2">
              <Checkbox 
                checked={formData.existingAssets.includes(asset)}
                onCheckedChange={() => handleAssetToggle(asset)}
              />
              <Label>{asset}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // CARD 4 - CURRENT AUDIENCE
    <Card key="card-4">
      <CardHeader>
        <CardTitle>Current Audience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Who do you primarily serve right now?</Label>
          <Input
            value={formData.primaryAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, primaryAudience: e.target.value }))}
            placeholder="Role, situation, or life context (e.g. solo founders, educators, women post-divorce)"
            className="mt-2"
          />
          <p className="text-sm text-black/60 mt-2">Describe who they are, not who you want them to be.</p>
        </div>
      </CardContent>
    </Card>,

    // CARD 5 - WHERE THEY EXIST
    <Card key="card-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Where They Exist
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-black/40 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">Examples: LinkedIn + associations, Conferences, Online groups, Companies or institutions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Where do these people already gather or participate?</Label>
          <Input
            value={formData.audienceLocation}
            onChange={(e) => setFormData(prev => ({ ...prev, audienceLocation: e.target.value }))}
            placeholder="Platforms, organizations, communities, events"
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>,

    // CARD 6 - PRICING REALITY
    <Card key="card-6">
      <CardHeader>
        <CardTitle>Pricing Reality</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Highest price you currently charge (or have charged)</Label>
          <Input
            type="number"
            value={formData.highestPrice}
            onChange={(e) => setFormData(prev => ({ ...prev, highestPrice: e.target.value }))}
            placeholder="Enter amount (e.g., $500, $2,500, $10,000)"
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>,

    // CARD 7 - LOWER-TIER OPTIONS
    <Card key="card-7">
      <CardHeader>
        <CardTitle>Lower-Tier Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>Do you currently offer a lower-tier or entry-level option?</Label>
        <RadioGroup 
          value={formData.hasLowerTier === true ? "yes" : formData.hasLowerTier === false ? "no" : ""}
          onValueChange={(val) => setFormData(prev => ({ ...prev, hasLowerTier: val === "yes" }))}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="tier-yes" />
            <Label htmlFor="tier-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="tier-no" />
            <Label htmlFor="tier-no">No</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>,

    // CARD 8 - CAPACITY CONSTRAINTS
    <Card key="card-8">
      <CardHeader>
        <CardTitle>Capacity Constraints</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>What most limits your capacity right now?</Label>
        <p className="text-sm text-black/60">Select all that apply</p>
        <div className="mt-3 space-y-2">
          {["Time", "Delivery format", "Energy", "Systems", "Availability"].map(limit => (
            <div key={limit} className="flex items-center space-x-2">
              <Checkbox 
                checked={formData.capacityLimits.includes(limit)}
                onCheckedChange={() => handleCapacityToggle(limit)}
              />
              <Label>{limit}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // CARD 9 - AUTHORITY SIGNALS
    <Card key="card-9">
      <CardHeader>
        <CardTitle>Authority Signals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>Relevant credentials, certifications, licenses, or formal training</Label>
        <p className="text-sm text-black/60">List what is active or completed</p>
        {formData.credentials.map((cred, idx) => (
          <Input
            key={idx}
            value={cred}
            onChange={(e) => {
              const newCreds = [...formData.credentials];
              newCreds[idx] = e.target.value;
              setFormData(prev => ({ ...prev, credentials: newCreds }));
            }}
            placeholder={`Credential ${idx + 1}`}
            className="mt-2"
          />
        ))}
      </CardContent>
    </Card>,

    // CARD 10 - CLIENT OUTCOMES
    <Card key="card-10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Client Outcomes
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-black/40 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">Outcomes can be behavioral (what changed) or numerical (counts, timelines, results). Examples: decisions made, habits changed, boundaries set, revenue, retention, completion, etc.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>List up to three outcomes you've helped clients achieve</Label>
        {formData.outcomes.map((outcome, idx) => (
          <Textarea
            key={idx}
            value={outcome}
            onChange={(e) => {
              const newOutcomes = [...formData.outcomes];
              newOutcomes[idx] = e.target.value;
              setFormData(prev => ({ ...prev, outcomes: newOutcomes }));
            }}
            placeholder={`Outcome ${idx + 1}`}
            className="mt-2"
            rows={2}
          />
        ))}
      </CardContent>
    </Card>,

    // CARD 11 - TIME INVESTMENT (CLIENT WORK)
    <Card key="card-11">
      <CardHeader>
        <CardTitle>Time Investment: Client Work</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>How many hours per week are you actively delivering client work?</Label>
          <Input
            value={formData.weeklyClientHours}
            onChange={(e) => setFormData(prev => ({ ...prev, weeklyClientHours: e.target.value }))}
            placeholder="e.g. 5–10, ~12, varies"
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>,

    // CARD 12 - TIME INVESTMENT (ADMIN)
    <Card key="card-12">
      <CardHeader>
        <CardTitle>Time Investment: Admin & Operations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>How many hours per week are spent on admin / operations?</Label>
          <Input
            value={formData.weeklyAdminHours}
            onChange={(e) => setFormData(prev => ({ ...prev, weeklyAdminHours: e.target.value }))}
            placeholder="e.g. 3–5, ~8, not sure"
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>,

    // CARD 13 - DELIVERY FORMAT
    <Card key="card-13">
      <CardHeader>
        <CardTitle>Delivery Format</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>How do you currently deliver your work?</Label>
        <p className="text-sm text-black/60">Select all that apply</p>
        <div className="mt-3 space-y-2">
          {["1:1", "Group", "Asynchronous / Self-paced", "Live workshops", "Mixed"].map(format => (
            <div key={format} className="flex items-center space-x-2">
              <Checkbox 
                checked={formData.deliveryFormat.includes(format)}
                onCheckedChange={() => handleDeliveryToggle(format)}
              />
              <Label>{format}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // CARD 14 - TOOLS IN USE
    <Card key="card-14">
      <CardHeader>
        <CardTitle>Tools in Use</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>What tools do you currently use to deliver your work?</Label>
        <p className="text-sm text-black/60">List only what you actively use. "None" is a valid answer.</p>
        <div className="space-y-3 mt-4">
          <div>
            <Label className="text-sm text-black/60">Website / Platform</Label>
            <Input
              value={formData.toolWebsite}
              onChange={(e) => setFormData(prev => ({ ...prev, toolWebsite: e.target.value }))}
              placeholder="Enter name or 'none'"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-black/60">Documents / Workbooks</Label>
            <Input
              value={formData.toolDocuments}
              onChange={(e) => setFormData(prev => ({ ...prev, toolDocuments: e.target.value }))}
              placeholder="Google Docs, PDFs, etc."
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-black/60">Email</Label>
            <Input
              value={formData.toolEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, toolEmail: e.target.value }))}
              placeholder="Flodesk, Gmail, etc."
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-black/60">Scheduling</Label>
            <Input
              value={formData.toolScheduling}
              onChange={(e) => setFormData(prev => ({ ...prev, toolScheduling: e.target.value }))}
              placeholder="Calendly, Wix, etc."
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-black/60">Forms / Intake</Label>
            <Input
              value={formData.toolForms}
              onChange={(e) => setFormData(prev => ({ ...prev, toolForms: e.target.value }))}
              placeholder="Google Forms, Typeform, etc."
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>,

    // CARD 15 - INTELLECTUAL PROPERTY & CONFIDENTIALITY
    <Card key="card-15">
      <CardHeader>
        <CardTitle>Intellectual Property & Confidentiality Acknowledgment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded text-sm leading-relaxed space-y-3">
          <p>By checking the box below, I acknowledge and agree to the following:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>All materials, frameworks, prompts, templates, processes, and system logic provided by Sarah Wilkes / Heartset LLC / Authority Infrastructure™ as part of this sprint are proprietary and protected intellectual property.</li>
            <li>I am granted a limited, non-transferable license to use these materials solely within my own business for implementation purposes. I agree not to copy, distribute, resell, teach, publish, or repurpose these materials outside of my personal business use.</li>
            <li>Any information, responses, or materials I submit during this sprint remain my intellectual property and will be used only to support my participation in this program.</li>
            <li>I understand that this sprint focuses on organizing, validating, and executing existing work, not creating new ideas, custom development, or bespoke strategy.</li>
          </ul>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox 
            checked={formData.ipAcknowledgement}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, ipAcknowledgement: checked }))}
            id="ip-ack"
          />
          <Label htmlFor="ip-ack" className="text-sm leading-relaxed font-medium">
            I acknowledge and agree to the terms above
          </Label>
        </div>
      </CardContent>
    </Card>,

    // CARD 16 - SCOPE CONFIRMATION
    <Card key="card-16">
      <CardHeader>
        <CardTitle>Scope Confirmation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox 
            checked={formData.executionAcknowledgement}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, executionAcknowledgement: checked }))}
            id="exec-ack"
          />
          <Label htmlFor="exec-ack" className="text-sm leading-relaxed">
            I understand this Sprint focuses on organizing, validating, and executing existing work, not creating new ideas or custom development.
          </Label>
        </div>
      </CardContent>
    </Card>
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            $6,500 Implementation Sprint
          </h1>
          <p className="text-lg text-black/60 mb-8">
            This onboarding captures your current assets, experience, and operating reality so the Sprint can begin from an accurate baseline.
          </p>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-black/60 mb-2">
              <span>Card {currentCard + 1} of {totalCards}</span>
              <span>{Math.round(((currentCard + 1) / totalCards) * 100)}%</span>
            </div>
            <div className="w-full bg-black/10 rounded-full h-2">
              <div 
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCard + 1) / totalCards) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Card */}
          <div className="mb-8">
            {cards[currentCard]}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button
              onClick={handleBack}
              disabled={currentCard === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex gap-2">
              {currentCard === totalCards - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  className="bg-black hover:bg-black/80 text-white"
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-black hover:bg-black/80 text-white flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}