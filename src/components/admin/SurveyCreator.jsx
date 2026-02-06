import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SurveyCreator() {
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);

  const createDefaultSurvey = async () => {
    setCreating(true);
    try {
      await base44.entities.Survey.create({
        title: "Focus Group Survey",
        description: "Help us understand your business infrastructure and next steps.",
        isActive: true,
        accessCode: "FOCUS2026",
        questions: [
          // Section 0
          { id: "access_code", sectionTitle: "Section 0: Access Confirmation", text: "Access Code", type: "text", required: true },
          { id: "attendance", text: "Attendance Integrity", type: "radio", required: true, options: ["I attended the live session", "I joined late but stayed until the end", "It was shared with me afterward"] },
          
          // Section 1
          { id: "primary_monetization", sectionTitle: "Section 1: Participant Profile", text: "Primary Monetization", type: "radio", required: true, options: ["Coaching / Consulting", "Programs / Courses", "Professional Services", "Speaking / Facilitation", "Licensing / Institutional Work", "Not currently monetizing"] },
          { id: "target_market", text: "Target Market", type: "radio", required: true, options: ["Individuals (B2C)", "Organizations (B2B)", "Institutions / Government", "Mixed / Unsure"] },
          { id: "offer_price", text: "Average Offer Price", type: "radio", required: true, options: ["Under $500", "$500–$2,000", "$2,000–$5,000", "$5,000–$10,000", "$10,000+", "I don't know yet"] },
          
          // Section 2
          { id: "active_infrastructure", sectionTitle: "Section 2: System Maturity", text: "Active Infrastructure (Check all that apply)", type: "checkbox", required: true, options: ["Website (Wix / WordPress / Other)", "Email platform (manual or automated)", "CRM or Lead Tracker", "Scheduling / Calendar System", "None — mostly manual"] },
          { id: "lead_source", text: "Lead Source Efficiency (Check all that apply)", type: "checkbox", required: true, options: ["Referrals", "Social Media Inbound", "Direct Outreach", "Events / Conferences", "Paid Ads", "They don't — it's inconsistent"] },
          { id: "failure_mode", text: "Primary Failure Mode", type: "radio", required: true, options: ["Lead Consistency", "Offer Clarity", "Follow-up / Systems", "Time / Capacity", "Confidence / Pricing", "I'm not sure"] },
          
          // Section 3
          { id: "exercise_completion", sectionTitle: "Section 3: Behavioral Signals", text: "Exercise Completion", type: "radio", required: true, options: ["Completed All", "Completed Most", "Completed Some", "Completed None"] },
          { id: "system_compatibility", text: "System Compatibility", type: "radio", required: true, options: ["Relief — the structure helped me move faster", "Resistance — the structure felt restrictive", "Neutral", "I didn't notice"] },
          
          // Section 4
          { id: "conversion_logic", sectionTitle: "Section 4: Economic Belief", text: "Conversion Logic", type: "radio", required: true, options: ["I clearly understand how volume + quality leads create predictable outcomes", "I understand the concept, but I'm unsure how to apply it consistently", "The math makes sense, but I don't believe it would work for my offer", "I'm still confused about how this translates to real clients", "I did not engage with the exercise"] },
          { id: "systemic_constraint", text: "Systemic Constraint", type: "radio", required: true, options: ["Access to enough qualified leads", "Confidence in pricing / offer value", "Consistency in outreach or follow-up", "Systems to support volume", "Time / Energy", "None — I see a clear path forward"] },
          { id: "predictive_projection", text: "Predictive Projection (90-Day Belief)", type: "radio", required: true, options: ["I would close at least one high-value client", "I would get close but hesitate to close", "I would likely stop before results appeared", "I don't believe the numbers would hold"] },
          
          // Section 5
          { id: "next_step", sectionTitle: "Section 5: Decision Routing", text: "Valuable Next Step", type: "radio", required: true, options: ["28-Day Guided Sprint", "Private / Advisory Support", "DIY / Self-paced", "No next step right now"] },
          { id: "communication_auth", text: "Communication Authorization", type: "radio", required: true, options: ["Yes, please send details", "Yes, email only", "Not at this time"] }
        ]
      });
      
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      alert("Default survey created successfully!");
    } catch (error) {
      alert("Error creating survey: " + error.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Card className="border-black/10">
      <CardHeader>
        <CardTitle>Quick Setup: Focus Group Survey</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-black/60 mb-4">
          Create the pre-configured Focus Group survey with 15 questions across 5 sections.
        </p>
        <Button
          onClick={createDefaultSurvey}
          disabled={creating}
          className="bg-black hover:bg-black/80"
        >
          {creating ? "Creating..." : "Create Focus Group Survey"}
        </Button>
      </CardContent>
    </Card>
  );
}