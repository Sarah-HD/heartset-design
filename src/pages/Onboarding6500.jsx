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
import { CheckCircle2 } from "lucide-react";

export default function Onboarding6500() {
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    hasMethod: false,
    methodName: "",
    methodComponents: ["", "", "", ""],
    existingAssets: [],
    assetNames: "",
    primaryAudience: "",
    audienceLocation: "",
    highestPrice: "",
    hasLowerTier: false,
    capacityLimits: "",
    credentials: "",
    outcomes: ["", "", ""],
    weeklyHours: "",
    deliveryFormat: "one_on_one",
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
      highestPrice: parseFloat(formData.highestPrice) || 0
    }),
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.ipAcknowledgement || !formData.executionAcknowledgement) {
      alert("Please acknowledge all required terms.");
      return;
    }
    submitMutation.mutate();
  };

  const handleAssetToggle = (asset) => {
    setFormData(prev => ({
      ...prev,
      existingAssets: prev.existingAssets.includes(asset)
        ? prev.existingAssets.filter(a => a !== asset)
        : [...prev.existingAssets, asset]
    }));
  };

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

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            $6,500 Implementation Sprint
          </h1>
          <p className="text-lg text-black/60 mb-12">
            This onboarding captures your current assets, experience, and operating reality so the Sprint can begin from an accurate baseline.
          </p>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Section 1: Method & Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Method & Experience Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Do you currently use a repeatable method, process, or approach?</Label>
                  <RadioGroup 
                    value={formData.hasMethod ? "yes" : "no"}
                    onValueChange={(val) => setFormData(prev => ({ ...prev, hasMethod: val === "yes" }))}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="method-yes" />
                      <Label htmlFor="method-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="method-no" />
                      <Label htmlFor="method-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.hasMethod && (
                  <>
                    <div>
                      <Label>Working name of your method or approach</Label>
                      <Input 
                        value={formData.methodName}
                        onChange={(e) => setFormData(prev => ({ ...prev, methodName: e.target.value }))}
                        placeholder="Enter method name"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>List the primary steps, phases, or components (names only)</Label>
                      {formData.methodComponents.map((comp, idx) => (
                        <Input
                          key={idx}
                          value={comp}
                          onChange={(e) => {
                            const newComps = [...formData.methodComponents];
                            newComps[idx] = e.target.value;
                            setFormData(prev => ({ ...prev, methodComponents: newComps }));
                          }}
                          placeholder={`Step/Phase ${idx + 1}${idx > 2 ? ' (optional)' : ''}`}
                          className="mt-2"
                        />
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Section 2: Existing Assets */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Which assets do you currently have?</Label>
                  <div className="mt-3 space-y-2">
                    {["Course", "Program", "Workshop", "Workbook/Guide", "Coaching/Consulting Service", "Speaking/Training Material"].map(asset => (
                      <div key={asset} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={formData.existingAssets.includes(asset)}
                          onCheckedChange={() => handleAssetToggle(asset)}
                        />
                        <Label>{asset}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>List names of any assets you currently sell or have drafted</Label>
                  <Textarea
                    value={formData.assetNames}
                    onChange={(e) => setFormData(prev => ({ ...prev, assetNames: e.target.value }))}
                    placeholder="Asset names or working titles"
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Audience & Environment */}
            <Card>
              <CardHeader>
                <CardTitle>Audience & Environment Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Who do you primarily serve right now?</Label>
                  <Input
                    value={formData.primaryAudience}
                    onChange={(e) => setFormData(prev => ({ ...prev, primaryAudience: e.target.value }))}
                    placeholder="Brief factual description"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Where do these people already exist?</Label>
                  <Input
                    value={formData.audienceLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, audienceLocation: e.target.value }))}
                    placeholder="Platforms, organizations, communities"
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Monetization Reality */}
            <Card>
              <CardHeader>
                <CardTitle>Monetization Reality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Highest price you currently charge (or have charged)</Label>
                  <Input
                    type="number"
                    value={formData.highestPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, highestPrice: e.target.value }))}
                    placeholder="Amount"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Do you currently offer any lower-tier or entry-level option?</Label>
                  <RadioGroup 
                    value={formData.hasLowerTier ? "yes" : "no"}
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
                </div>

                <div>
                  <Label>What limits your capacity right now?</Label>
                  <Textarea
                    value={formData.capacityLimits}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacityLimits: e.target.value }))}
                    placeholder="Time, delivery format, energy, systems"
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Authority Signals */}
            <Card>
              <CardHeader>
                <CardTitle>Authority Signals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Relevant credentials, certifications, licenses, or training</Label>
                  <Textarea
                    value={formData.credentials}
                    onChange={(e) => setFormData(prev => ({ ...prev, credentials: e.target.value }))}
                    placeholder="List credentials"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>List up to three concrete outcomes you have helped others achieve</Label>
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
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section 6: Time & Delivery */}
            <Card>
              <CardHeader>
                <CardTitle>Time & Delivery Reality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Approximately how many hours per week are you actively delivering work?</Label>
                  <Input
                    value={formData.weeklyHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, weeklyHours: e.target.value }))}
                    placeholder="Number or range"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>How do you currently deliver your work?</Label>
                  <RadioGroup 
                    value={formData.deliveryFormat}
                    onValueChange={(val) => setFormData(prev => ({ ...prev, deliveryFormat: val }))}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one_on_one" id="delivery-1on1" />
                      <Label htmlFor="delivery-1on1">1:1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="group" id="delivery-group" />
                      <Label htmlFor="delivery-group">Group</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="asynchronous" id="delivery-async" />
                      <Label htmlFor="delivery-async">Asynchronous</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mixed" id="delivery-mixed" />
                      <Label htmlFor="delivery-mixed">Mixed</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Tech stack currently in use</Label>
                  <Input
                    value={formData.techStack}
                    onChange={(e) => setFormData(prev => ({ ...prev, techStack: e.target.value }))}
                    placeholder="Wix, Google, etc."
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 7: Acknowledgements */}
            <Card>
              <CardHeader>
                <CardTitle>Legal & IP Acknowledgment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-neutral-50 rounded text-sm space-y-4">
                  <p>By checking the box below, you acknowledge and agree that all materials, frameworks, prompts, and system logic provided inside the Authority Infrastructure™ Sprint are proprietary. You agree not to copy, distribute, or repurpose system materials outside of your personal business use.</p>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    checked={formData.ipAcknowledgement}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, ipAcknowledgement: checked }))}
                    id="ip-ack"
                  />
                  <Label htmlFor="ip-ack" className="text-sm leading-relaxed">
                    I acknowledge and agree to the Intellectual Property & Confidentiality terms above.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    checked={formData.executionAcknowledgement}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, executionAcknowledgement: checked }))}
                    id="exec-ack"
                  />
                  <Label htmlFor="exec-ack" className="text-sm leading-relaxed">
                    I understand that this Sprint focuses on organization, validation, and execution, not ideation or customization.
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full bg-black hover:bg-black/80 text-white"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Onboarding"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}