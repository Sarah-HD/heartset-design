import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

export default function Onboarding10000() {
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    frameworkDescriptions: [
      { componentName: "", description: "" },
      { componentName: "", description: "" },
      { componentName: "", description: "" }
    ],
    marketPositioning: "",
    audienceClarity: "",
    refinementGoals: "",
    advisoryExpectations: ""
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
    queryKey: ['advisoryOnboarding', user?.email],
    queryFn: () => base44.entities.AdvisoryOnboarding.filter({ userEmail: user?.email }),
    enabled: !!user,
  });

  useEffect(() => {
    if (existingOnboarding && existingOnboarding.length > 0) {
      setSubmitted(true);
    }
  }, [existingOnboarding]);

  const submitMutation = useMutation({
    mutationFn: () => base44.entities.AdvisoryOnboarding.create({
      userEmail: user.email,
      ...formData
    }),
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate();
  };

  const updateFrameworkDescription = (index, field, value) => {
    const newDescriptions = [...formData.frameworkDescriptions];
    newDescriptions[index][field] = value;
    setFormData(prev => ({ ...prev, frameworkDescriptions: newDescriptions }));
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
              Your $10,000 Advisory onboarding has been submitted. You'll receive further instructions via email.
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
            $10,000 Advisory Onboarding
          </h1>
          <p className="text-lg text-black/60 mb-12">
            This onboarding captures framework refinement needs and positioning clarity.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Framework Descriptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-black/60">
                  Provide one-sentence descriptions for each component of your framework.
                </p>
                {formData.frameworkDescriptions.map((item, idx) => (
                  <div key={idx} className="space-y-3 p-4 border border-black/10 rounded">
                    <div>
                      <Label>Component Name {idx + 1}</Label>
                      <Input
                        value={item.componentName}
                        onChange={(e) => updateFrameworkDescription(idx, 'componentName', e.target.value)}
                        placeholder="e.g., Discovery Phase"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>One-Sentence Description</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => updateFrameworkDescription(idx, 'description', e.target.value)}
                        placeholder="Brief description of this component"
                        className="mt-2"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Positioning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Describe your current market positioning</Label>
                  <Textarea
                    value={formData.marketPositioning}
                    onChange={(e) => setFormData(prev => ({ ...prev, marketPositioning: e.target.value }))}
                    placeholder="How you're currently positioned in the market"
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Audience clarity</Label>
                  <Textarea
                    value={formData.audienceClarity}
                    onChange={(e) => setFormData(prev => ({ ...prev, audienceClarity: e.target.value }))}
                    placeholder="Describe your audience definition and clarity"
                    className="mt-2"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Refinement Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>What needs refining, clarifying, or optimizing?</Label>
                  <Textarea
                    value={formData.refinementGoals}
                    onChange={(e) => setFormData(prev => ({ ...prev, refinementGoals: e.target.value }))}
                    placeholder="Describe what you're looking to refine in this Advisory engagement"
                    className="mt-2"
                    rows={5}
                  />
                </div>

                <div>
                  <Label>Advisory expectations</Label>
                  <Textarea
                    value={formData.advisoryExpectations}
                    onChange={(e) => setFormData(prev => ({ ...prev, advisoryExpectations: e.target.value }))}
                    placeholder="What are you expecting from this Advisory engagement?"
                    className="mt-2"
                    rows={4}
                  />
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