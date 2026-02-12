import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock, Zap } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function SprintEnrollment() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const onboardingId = searchParams.get('onboardingId');

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

  const handleSecureSpot = async () => {
    setLoading(true);
    try {
      const response = await base44.functions.invoke('createSquarePaymentLink', {
        userEmail: user.email,
        tier: 'sprint_6500',
        tierAssignmentId: onboardingId || 'enrollment'
      });

      if (response.data.success && response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      console.error('Payment link error:', error);
      alert('Unable to create payment link. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Authority Infrastructure™
            </h1>
            <p className="text-xl text-black/60">
              28-Day Validation Sprint
            </p>
          </div>

          {/* Main Card */}
          <Card className="border-2 border-black/10 mb-8">
            <CardHeader className="text-center border-b border-black/5">
              <CardTitle className="text-2xl mb-2">28-Day Validation Sprint</CardTitle>
              <p className="text-3xl font-bold">$6,950</p>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              {/* What's Included */}
              <div>
                <h3 className="font-medium text-lg mb-4">What's included:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                    <div>
                      <p className="font-medium">Method Organization</p>
                      <p className="text-sm text-black/60">Structure your existing process into a repeatable, scalable framework</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                    <div>
                      <p className="font-medium">Demand Validation</p>
                      <p className="text-sm text-black/60">Test and confirm market readiness for your organized approach</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                    <div>
                      <p className="font-medium">Routing Logic</p>
                      <p className="text-sm text-black/60">Establish clear pathways for how people enter and move through your work</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                    <div>
                      <p className="font-medium">Implementation Roadmap</p>
                      <p className="text-sm text-black/60">Leave with a concrete plan for execution and next steps</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What This Is Not */}
              <div className="bg-black/5 rounded-lg p-6">
                <h3 className="font-medium text-lg mb-3">What this is not:</h3>
                <ul className="space-y-2 text-sm text-black/70">
                  <li>• Not a custom build or done-for-you service</li>
                  <li>• Not strategy creation from scratch</li>
                  <li>• Not mindset coaching or emotional support</li>
                  <li>• Not tech setup or platform management</li>
                </ul>
              </div>

              {/* Timeline & Expectations */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-black/40" />
                  <div>
                    <p className="font-medium">Timeline</p>
                    <p className="text-sm text-black/60">28 days from start date</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 mt-0.5 flex-shrink-0 text-black/40" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-sm text-black/60">Confirmed after payment</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button
                  onClick={handleSecureSpot}
                  disabled={loading}
                  className="w-full bg-black hover:bg-black/80 text-white h-14 text-lg"
                >
                  {loading ? 'Processing...' : 'Secure My Spot'}
                </Button>
                <p className="text-xs text-center text-black/40 mt-4">
                  One-time payment • Secure checkout via Square
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-black/60">
            <Shield className="w-4 h-4" />
            <span>Secure payment processing</span>
          </div>
        </div>
      </div>
    </div>
  );
}