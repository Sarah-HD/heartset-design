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
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";

export default function Onboarding6500() {
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [formData, setFormData] = useState({
    hasMethod: null,
    methodName: "",
    methodComponents: ["", "", "", "", "", ""],
    existingAssets: [],
    assetNames: "",
    primaryAudience: "",
    audienceLocation: "",
    highestPrice: "",
    hasLowerTier: null,
    capacityLimits: [],
    credentials: "",
    outcomes: ["", "", ""],
    weeklyHours: "",
    deliveryFormat: [],
    techStack: "",
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
      ...formData,
      highestPrice: parseFloat(formData.highestPrice) || 0,
      methodComponents: formData.methodComponents.filter(c => c.trim() !== ""),
      outcomes: formData.outcomes.filter(o => o.trim() !== "")
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
        <div>
          <Label>Working name of your method or approach (if you have one)</Label>
          <Input 
            value={formData.methodName}
            onChange={(e) => setFormData(prev => ({ ...prev, methodName: e.target.value }))}
            placeholder='Example: "4-Step Reset," "XYZ Method," or "No formal name yet"'
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>,

    // CARD 2 - METHOD COMPONENTS
    <Card key="card-2">
      <CardHeader>
        <CardTitle>Method Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>List the main parts, phases, or components of your method (names only)</Label>
        <p className="text-sm text-black/60">Leave blank if not applicable</p>
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

    // CARD 4 - ASSET NAMES
    <Card key="card-4">
      <CardHeader>
        <CardTitle>Asset Names</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>List names or working titles of any existing assets</Label>
          <Textarea
            value={formData.assetNames}
            onChange={(e) => setFormData(prev => ({ ...prev, assetNames: e.target.value }))}
            placeholder="Internal names or drafts are fine"
            className="mt-2"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>,

    // CARD 5 - CURRENT AUDIENCE
    <Card key="card-5">
      <CardHeader>
        <CardTitle>Current Audience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Who do you primarily serve right now?</Label>
          <Input
            value={formData.primaryAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, primaryAudience: e.target.value }))}
            placeholder="Role, profession, or situation (factual)"
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>,

    // CARD 6 - WHERE THEY EXIST
    <Card key="card-6">
      <CardHeader>
        <CardTitle>Where They Exist</CardTitle>
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
          <p className="text-sm text-black/60 mt-2">
            Examples: LinkedIn + associations, Conferences, Online groups, Companies or institutions
          </p>
        </div>
      </CardContent>
    </Card>,

    // CARD 7 - PRICING REALITY
    <Card key="card-7">
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

    // CARD 8 - LOWER-TIER OPTIONS
    <Card key="card-8">
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

    // CARD 9 - CAPACITY CONSTRAINTS
    <Card key="card-9">
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

    // CARD 10 - AUTHORITY SIGNALS
    <Card key="card-10">
      <CardHeader>
        <CardTitle>Authority Signals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Relevant credentials, certifications, licenses, or formal training</Label>
          <Textarea
            value={formData.credentials}
            onChange={(e) => setFormData(prev => ({ ...prev, credentials: e.target.value }))}
            placeholder="List what is active or completed"
            className="mt-2"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>,

    // CARD 11 - CLIENT OUTCOMES
    <Card key="card-11">
      <CardHeader>
        <CardTitle>Client Outcomes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>List up to three real outcomes you have helped clients achieve</Label>
        <p className="text-sm text-black/60">
          These can be results you've seen, changes clients reported, or milestones they reached.
        </p>
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

    // CARD 12 - TIME INVESTMENT
    <Card key="card-12">
      <CardHeader>
        <CardTitle>Time Investment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>About how many hours per week are you actively delivering client work?</Label>
          <Input
            value={formData.weeklyHours}
            onChange={(e) => setFormData(prev => ({ ...prev, weeklyHours: e.target.value }))}
            placeholder="Number or range"
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
          {["1:1", "Group", "Asynchronous / digital", "Mixed"].map(format => (
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
        <div>
          <Label>What tools do you currently use to deliver or manage your work?</Label>
          <Input
            value={formData.techStack}
            onChange={(e) => setFormData(prev => ({ ...prev, techStack: e.target.value }))}
            placeholder="Website, documents, email, scheduling, forms (e.g., Wix, Google Docs, Calendly)"
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>,

    // CARD 15 - MUTUAL CONFIDENTIALITY
    <Card key="card-15">
      <CardHeader>
        <CardTitle>Mutual Confidentiality (Important)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-neutral-50 rounded text-sm space-y-4">
          <p>
            I understand that this onboarding collects information solely to support program delivery. 
            My intellectual property remains my own, and any system materials, frameworks, or tools 
            provided inside the Authority Infrastructure™ Sprint are proprietary and for my business use only.
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox 
            checked={formData.ipAcknowledgement}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, ipAcknowledgement: checked }))}
            id="ip-ack"
          />
          <Label htmlFor="ip-ack" className="text-sm leading-relaxed">
            I acknowledge and agree to the Confidentiality & Intellectual Property terms above.
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
            I understand this Sprint focuses on organizing, validating, and executing existing work — not creating new ideas or custom development.
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