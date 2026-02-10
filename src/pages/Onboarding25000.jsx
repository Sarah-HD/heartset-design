import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

export default function Onboarding25000() {
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullFrameworkDocumentation: "",
    assetLibrary: "",
    deliveryModels: "",
    monetizationStructure: "",
    platformPreferences: "",
    legalConfirmations: "",
    buildPermissions: ""
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
    queryKey: ['infrastructureOnboarding', user?.email],
    queryFn: () => base44.entities.InfrastructureOnboarding.filter({ userEmail: user?.email }),
    enabled: !!user,
  });

  useEffect(() => {
    if (existingOnboarding && existingOnboarding.length > 0) {
      setSubmitted(true);
    }
  }, [existingOnboarding]);

  const submitMutation = useMutation({
    mutationFn: () => base44.entities.InfrastructureOnboarding.create({
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
              Your $25,000 Private Infrastructure onboarding has been submitted. You'll receive further instructions via email.
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
            $25,000 Private Infrastructure
          </h1>
          <p className="text-lg text-black/60 mb-12">
            This onboarding captures everything required for system build and installation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Framework & Asset Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Full framework documentation</Label>
                  <Textarea
                    value={formData.fullFrameworkDocumentation}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullFrameworkDocumentation: e.target.value }))}
                    placeholder="Complete framework details, definitions, and structure"
                    className="mt-2"
                    rows={6}
                  />
                </div>

                <div>
                  <Label>Asset library details</Label>
                  <Textarea
                    value={formData.assetLibrary}
                    onChange={(e) => setFormData(prev => ({ ...prev, assetLibrary: e.target.value }))}
                    placeholder="Existing materials, courses, templates, resources"
                    className="mt-2"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery & Monetization Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Delivery models</Label>
                  <Textarea
                    value={formData.deliveryModels}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliveryModels: e.target.value }))}
                    placeholder="How programs/services are delivered (1:1, group, async, etc.)"
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Monetization structure</Label>
                  <Textarea
                    value={formData.monetizationStructure}
                    onChange={(e) => setFormData(prev => ({ ...prev, monetizationStructure: e.target.value }))}
                    placeholder="Pricing tiers, payment models, offer structure"
                    className="mt-2"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical & Legal Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Platform preferences</Label>
                  <Textarea
                    value={formData.platformPreferences}
                    onChange={(e) => setFormData(prev => ({ ...prev, platformPreferences: e.target.value }))}
                    placeholder="Preferred platforms, tools, and tech stack for infrastructure"
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Legal and IP confirmations</Label>
                  <Textarea
                    value={formData.legalConfirmations}
                    onChange={(e) => setFormData(prev => ({ ...prev, legalConfirmations: e.target.value }))}
                    placeholder="Legal structure, IP ownership, disclaimers, terms"
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Build permissions and access</Label>
                  <Textarea
                    value={formData.buildPermissions}
                    onChange={(e) => setFormData(prev => ({ ...prev, buildPermissions: e.target.value }))}
                    placeholder="Permissions, access credentials, and build requirements"
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