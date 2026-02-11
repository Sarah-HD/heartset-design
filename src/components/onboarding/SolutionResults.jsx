import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function SolutionResults({ recommendation, onboardingId, userEmail }) {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const handleProceedToSprint = async () => {
    setLoading(true);
    try {
      const response = await base44.functions.invoke('createSquarePaymentLink', {
        userEmail,
        tier: 'sprint_6500',
        tierAssignmentId: onboardingId
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

  const solutions = {
    sprint_6500: {
      title: "Implementation Sprint Recommended",
      description: "Based on what you shared, the $6,500 Implementation Sprint is the most aligned next step for you.",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      ctaText: "Proceed to Implementation Sprint",
      ctaAction: handleProceedToSprint
    },
    custom_advanced: {
      title: "Custom Engagement Recommended",
      description: "Your inputs suggest a higher-touch or custom engagement may be more effective. This typically ranges from $10,000–$25,000 depending on scope.",
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      ctaText: "Request Custom Review",
      ctaAction: () => window.location.href = '/Contact'
    },
    diy_selfguided: {
      title: "Self-Guided Path Recommended",
      description: "A self-guided path may be most supportive before implementation. This allows you to build foundational clarity at your own pace.",
      icon: Sparkles,
      color: "text-green-600",
      bgColor: "bg-green-50",
      ctaText: "View Self-Guided Option",
      ctaAction: () => window.location.href = '/Contact'
    }
  };

  const solution = solutions[recommendation] || solutions.sprint_6500;
  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex items-center justify-center p-6"
    >
      <Card className="max-w-2xl w-full border-2 border-black/10">
        <CardHeader className="text-center">
          <div className={`w-16 h-16 ${solution.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Icon className={`w-8 h-8 ${solution.color}`} />
          </div>
          <CardTitle className="text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {solution.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-black/70 text-center">
            {solution.description}
          </p>

          {recommendation === 'sprint_6500' && (
            <div className="bg-black/5 rounded-lg p-6 space-y-3">
              <h4 className="font-medium">What's included:</h4>
              <ul className="space-y-2 text-sm text-black/70">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                  <span>28-day structured execution sprint</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                  <span>Method organization and validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                  <span>Asset structuring and routing logic</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                  <span>Implementation roadmap delivery</span>
                </li>
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={solution.ctaAction}
              disabled={loading}
              className="w-full bg-black hover:bg-black/80 text-white h-12"
            >
              {loading ? 'Processing...' : solution.ctaText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-xs text-black/40 text-center">
              This is a recommendation based on your survey responses. Admin can adjust if needed.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}