import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

export default function Apply10000() {
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    priorRevenue: "",
    existingFrameworks: "",
    executionEvidence: "",
    timeAvailability: "",
    applicationReason: ""
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

  const { data: existingApplication } = useQuery({
    queryKey: ['advisoryApplication', user?.email],
    queryFn: () => base44.entities.AdvisoryApplication.filter({ userEmail: user?.email }),
    enabled: !!user,
  });

  useEffect(() => {
    if (existingApplication && existingApplication.length > 0) {
      setSubmitted(true);
    }
  }, [existingApplication]);

  const submitMutation = useMutation({
    mutationFn: () => base44.entities.AdvisoryApplication.create({
      userEmail: user.email,
      ...formData,
      status: "submitted"
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
              Application Submitted
            </h1>
            <p className="text-black/60">
              Your $10,000 Advisory application has been submitted. You'll be notified via email once it has been reviewed.
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
            $10,000 Advisory Application
          </h1>
          <p className="text-lg text-black/60 mb-12">
            This application evaluates readiness to skip or advance beyond the Sprint tier. Applications are reviewed by admin.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Readiness Signals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Proof of prior revenue or implementation</Label>
                  <Textarea
                    value={formData.priorRevenue}
                    onChange={(e) => setFormData(prev => ({ ...prev, priorRevenue: e.target.value }))}
                    placeholder="Describe revenue history or past implementations"
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Existing frameworks already in market</Label>
                  <Textarea
                    value={formData.existingFrameworks}
                    onChange={(e) => setFormData(prev => ({ ...prev, existingFrameworks: e.target.value }))}
                    placeholder="Describe frameworks currently being used or sold"
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Evidence of execution (links, programs, results)</Label>
                  <Textarea
                    value={formData.executionEvidence}
                    onChange={(e) => setFormData(prev => ({ ...prev, executionEvidence: e.target.value }))}
                    placeholder="Provide links or describe programs and results"
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Time availability</Label>
                  <Textarea
                    value={formData.timeAvailability}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeAvailability: e.target.value }))}
                    placeholder="Describe your time commitment capacity"
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Reason for applying directly to Advisory</Label>
                  <Textarea
                    value={formData.applicationReason}
                    onChange={(e) => setFormData(prev => ({ ...prev, applicationReason: e.target.value }))}
                    placeholder="Why are you applying for Advisory instead of starting with the Sprint?"
                    className="mt-2"
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full bg-black hover:bg-black/80 text-white"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}