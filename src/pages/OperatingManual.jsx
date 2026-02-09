import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Calendar, CheckCircle2 } from "lucide-react";

export default function OperatingManual() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("part1");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [searching, setSearching] = useState(false);

  const queryClient = useQueryClient();

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        window.location.href = '/';
      }
    };
    loadUser();
  }, []);

  const { data: reviews = [] } = useQuery({
    queryKey: ['manual-reviews', user?.email],
    queryFn: () => base44.entities.ManualReview.filter({ user_email: user?.email }, '-review_date'),
    enabled: !!user,
  });

  const confirmReviewMutation = useMutation({
    mutationFn: async (reviewType) => {
      await base44.entities.ManualReview.create({
        review_type: reviewType,
        review_date: new Date().toISOString(),
        user_email: user.email
      });
      
      await base44.functions.invoke('createManualReviewCalendarEvent', { review_type: reviewType });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manual-reviews'] });
    },
  });

  const handleAISearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a navigation assistant for the Authority Infrastructure™ Operating Procedure Manual.

USER QUESTION: "${searchQuery}"

RULES:
- Only help locate sections by referencing exact section numbers and titles
- Never summarize, interpret, or paraphrase policy
- Never provide advice, recommendations, opinions, or examples
- Response format: "See Part X.Y.Z — [Exact Section Title]"
- If multiple sections are relevant, list them briefly
- If the question cannot be answered with a section reference, say "This question cannot be answered by referencing a specific section."

Respond:`,
      });

      setAiResponse(response);
    } catch (error) {
      setAiResponse("Navigation error. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const lastMonthlyReview = reviews.find(r => r.review_type === 'monthly');
  const lastQuarterlyReview = reviews.find(r => r.review_type === 'quarterly');

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

  const sections = [
    { id: "part1", title: "Part 1: Strategic Foundation & System Intent" },
    { id: "part2", title: "Part 2: Operational Execution & Gating Scripts" },
    { id: "part3", title: "Part 3: Intelligence System, Routing Logic & Enforcement" },
    { id: "part4", title: "Part 4: Eligibility, Escalation & System Integrity Controls" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Authority Infrastructure™
            </h1>
            <p className="text-xl text-black/60 font-light mb-2">Operating Procedure Manual</p>
            <p className="text-sm text-black/40">Prepared by Sarah Wilkes | February 9, 2026</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <Card className="border-black/10 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Navigation</h3>
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                          activeSection === section.id
                            ? 'bg-black text-white'
                            : 'hover:bg-neutral-100'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/10">
                    <h3 className="font-medium mb-4">AI Navigation</h3>
                    <form onSubmit={handleAISearch} className="space-y-3">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Where is eligibility defined?"
                        className="text-sm"
                      />
                      <Button
                        type="submit"
                        size="sm"
                        disabled={searching}
                        className="w-full bg-black hover:bg-black/80"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        {searching ? 'Searching...' : 'Locate'}
                      </Button>
                    </form>
                    {aiResponse && (
                      <div className="mt-4 p-3 bg-neutral-50 rounded text-xs">
                        {aiResponse}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Compliance Banner */}
              <Card className="border-black/20 border-2 mb-8">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Compliance Confirmation
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="monthly"
                        checked={!!lastMonthlyReview}
                        onCheckedChange={(checked) => {
                          if (checked) confirmReviewMutation.mutate('monthly');
                        }}
                      />
                      <div className="flex-1">
                        <label htmlFor="monthly" className="text-sm font-medium cursor-pointer">
                          Monthly Review Completed
                        </label>
                        {lastMonthlyReview && (
                          <p className="text-xs text-black/50 mt-1">
                            Last completed: {new Date(lastMonthlyReview.review_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="quarterly"
                        checked={!!lastQuarterlyReview}
                        onCheckedChange={(checked) => {
                          if (checked) confirmReviewMutation.mutate('quarterly');
                        }}
                      />
                      <div className="flex-1">
                        <label htmlFor="quarterly" className="text-sm font-medium cursor-pointer">
                          Quarterly Audit Completed
                        </label>
                        {lastQuarterlyReview && (
                          <p className="text-xs text-black/50 mt-1">
                            Last completed: {new Date(lastQuarterlyReview.review_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Manual Content */}
              <ManualContent activeSection={activeSection} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManualContent({ activeSection }) {
  const content = {
    part1: <Part1Content />,
    part2: <Part2Content />,
    part3: <Part3Content />,
    part4: <Part4Content />
  };

  return (
    <motion.div
      key={activeSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="prose prose-sm max-w-none"
    >
      {content[activeSection]}
    </motion.div>
  );
}

function Part1Content() {
  return (
    <div className="space-y-8">
      <div>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Part 1: Strategic Foundation & System Intent</h2>
      </div>

      <section>
        <h3>1.0 Command Intent</h3>
        <p>Authority Infrastructure™ is a systems-engineering methodology designed to convert individual expertise into institutional assets. The system eliminates dependence on personality-driven selling, emotional labor, improvisational delivery, and founder-centric execution.</p>
        <p>The system installs decision infrastructure that operates independently of constant founder involvement. This manual governs how expertise is:</p>
        <ul>
          <li>Identified</li>
          <li>Extracted</li>
          <li>Formalized</li>
          <li>Validated</li>
          <li>Routed</li>
          <li>Scaled</li>
        </ul>
        <p>The objective is not personal transformation; the objective is the installation of an operating system that produces repeatable outcomes without increasing founder labor.</p>
      </section>

      <section>
        <h3>1.1 System Definition</h3>
        <p>Authority Infrastructure™ replaces traditional coaching and consulting models with architectural engineering principles.</p>
        <p>The founder operates as a <strong>Systems Architect</strong>, not a teacher, motivator, or service provider.</p>
      </section>

      <section>
        <h3>1.2 Governance Cycle</h3>
        <p>Authority Infrastructure™ governs expertise through six enforced actions. Each action is a bounded system behavior. No action occurs out of sequence.</p>
      </section>

      <section>
        <h3>1.3 Core Methodological Pillars</h3>
        <p>All activity must comply with these pillars. Deviation constitutes system failure.</p>
        <ul>
          <li><strong>Pillar 1: Asset Inventory over Ideation.</strong> No new ideas are generated early. Authority is a balance-sheet asset, not a creative exercise.</li>
          <li><strong>Pillar 2: Placement over Persuasion.</strong> Authority is positioned inside established institutional ecosystems where purchasing already occurs.</li>
          <li><strong>Pillar 3: Math over Motivation.</strong> Hope-based marketing is eliminated. Revenue is modeled using conservative assumptions.</li>
          <li><strong>Pillar 4: Routing over Pitching.</strong> Sales conversations are structurally removed. Data dictates purchase paths.</li>
        </ul>
      </section>

      <section>
        <h3>1.4 Structural Discipline</h3>
        
        <h4>1.4.1 Prohibition on Brainstorming</h4>
        <p>Brainstorming is prohibited in early-stage environments. It creates intellectual property leakage and dependency on founder interpretation.</p>

        <h4>1.4.2 Structured Ideation (Paid Boundary)</h4>
        <p>Structured ideation (extending frameworks or designing adjacent assets) is a controlled, compensated activity.</p>
        <ul>
          <li>$10,000 Advisory: Framework refinement</li>
          <li>$25,000 Infrastructure: System design</li>
          <li>No ideation occurs in Focus Groups or Sprints</li>
        </ul>

        <h4>1.4.3 Efficiency Mandates</h4>
        <ul>
          <li><strong>Time Containment:</strong> Live sessions capped at 30 minutes</li>
          <li><strong>Asynchronous-First:</strong> Minimum 90% of delivery is asynchronous</li>
        </ul>
      </section>

      <section>
        <h3>1.5 Proprietary Gating Mechanism</h3>
        <h4>Section 0: Access Gate</h4>
        <p>Section 0 is a behavioral control located exclusively as the first field of the post-live Intelligence Survey.</p>
        <ul>
          <li><strong>Mechanism:</strong> Requires a live-issued access code shared only during the final minutes of the Day 4 Live Session</li>
          <li><strong>Function:</strong> Governs data entry, offer visibility, and advisory eligibility</li>
          <li><strong>Penalty:</strong> Failure to pass Section 0 automatically disqualifies the participant from further pathways</li>
        </ul>
      </section>

      <section>
        <h3>1.6 Revenue Architecture</h3>
        <p>The system operates through verified escalation, not forced sequencing.</p>
        <p><strong>System Escalation Rule:</strong> Participants do not choose tiers. The system routes them based on asset maturity and execution proof.</p>
      </section>

      <section>
        <h3>1.7 Target User Outcome</h3>
        <p>Upon completion, participants transition from execution (coaches/consultants) to infrastructure control (System Owners/Operators). The system inverts the labor curve: labor remains constant while authority and revenue compound.</p>
      </section>
    </div>
  );
}

function Part2Content() {
  return (
    <div className="space-y-8">
      <div>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Part 2: Operational Execution & Gating Scripts</h2>
        <p>Part 2 defines the tactical execution of the Strategic Foundation. It provides the specific mechanics for the Focus Group, the enforcement of Section 0, and the logic required to route participants into the $6,500 Sprint or the $10,000/$25,000 Advisory tiers.</p>
      </div>

      <section>
        <h3>2.1 Focus Group Structure (Days 1–3)</h3>
        <p>The Focus Group is an <strong>Extraction Environment</strong>. The founder's role is to audit, not to teach.</p>
        <h4>Daily Execution Protocol</h4>
        <ul>
          <li><strong>Asset Auditing:</strong> Participants submit existing methodologies. The founder identifies which assets have "Institutional Weight" (repeatable logic) vs. "Service Weight" (manual labor)</li>
          <li><strong>The "No-New-Ideas" Filter:</strong> If a participant suggests a new concept, the response is: "We are currently in the Extraction phase. We only work with assets that have a history of execution. Save that for a future Advisory tier."</li>
          <li><strong>Constraint Enforcement:</strong> All interactions are asynchronous. Live thinking is a system violation</li>
        </ul>
      </section>

      <section>
        <h3>2.2 The Day 4 Live Reflection Session</h3>
        <p>This is the <strong>Decision Confirmation</strong> event. It is not a Q&A session; it is a verification of readiness.</p>
        <ul>
          <li><strong>Duration:</strong> 30 Minutes (Hard Stop)</li>
          <li><strong>Agenda:</strong>
            <ol>
              <li>Summary of extracted assets across the group</li>
              <li>Clarification of the "Formalization" requirement for the Sprint</li>
              <li>Announcement of Section 0</li>
            </ol>
          </li>
        </ul>
      </section>

      <section>
        <h3>2.3 Section 0: Data Integrity Control</h3>
        <p>Section 0 is the "Proof of Presence" filter.</p>
        <ul>
          <li><strong>Input Field:</strong> "Enter the Live Session Verification Code."</li>
          <li><strong>Validation Logic:</strong> If Input ≠ [LIVE_CODE_XXXX], the survey terminates immediately</li>
          <li><strong>Messaging upon failure:</strong> "Access Denied. Authority Infrastructure requires strict adherence to sequence. Without the verification code, your data cannot be routed."</li>
        </ul>
      </section>

      <section>
        <h3>2.4 Intelligence Survey Routing Logic</h3>
        <p>The survey replaces the sales call. It uses data to determine the participant's trajectory.</p>
        
        <h4>Path A: The $6,500 Implementation Sprint</h4>
        <p><strong>Trigger:</strong> Participant has extracted assets but lacks a formal, repeatable structure or a non-founder-dependent delivery model.</p>

        <h4>Path B: The $10,000 Advisory (Sprint Bypass)</h4>
        <p><strong>Trigger:</strong> Participant demonstrates verified, pre-existing frameworks and a tiered offer suite that only requires refinement or scaling logic.</p>

        <h4>Path C: Disqualification</h4>
        <p><strong>Trigger:</strong> Participant is in "Ideation Mode," lacks professional experience to extract, or failed the Section 0 gate.</p>
      </section>

      <section>
        <h3>2.5 Authority Defense Scripts</h3>
        <p>Use these scripts to maintain structural discipline when participants push for "Brainstorming" or "Customization."</p>
        <ul>
          <li><strong>To stop live ideation:</strong> "That is a 'What If' question. This system operates on 'What Is.' We will stick to the extracted data."</li>
          <li><strong>To deny customization:</strong> "Customization is a labor-heavy service. This is an Infrastructure build. We are building the system to handle the work, not the founder."</li>
          <li><strong>To redirect "How-To" questions:</strong> "The 'How' is embedded in the Formalization phase. If you are in the Sprint, you will receive the sequence. We do not discuss implementation during extraction."</li>
        </ul>
      </section>

      <section>
        <h3>2.6 Revenue Escalation & Capacity Management</h3>
        <ul>
          <li><strong>Sprint Capacity:</strong> Hard cap of 5. No exceptions. Scarcity is a byproduct of the infrastructure, not a marketing tactic</li>
          <li><strong>The $25,000 Trigger:</strong> Move to this conversation only after the framework is refined ($10k tier) and the participant requires the Base44 platform installation</li>
        </ul>
      </section>
    </div>
  );
}

function Part3Content() {
  return (
    <div className="space-y-8">
      <div>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Part 3: Intelligence System, Routing Logic & Enforcement</h2>
      </div>

      <section>
        <h3>3.0 Purpose of Part 3</h3>
        <p>Part 3 defines how Authority Infrastructure™:</p>
        <ul>
          <li>captures proprietary intelligence</li>
          <li>enforces boundaries without conversation</li>
          <li>routes participants without selling</li>
          <li>protects intellectual property</li>
          <li>preserves founder authority at scale</li>
        </ul>
        <p>This section governs how decisions are made, who advances, and what happens when participants deviate.</p>
        <p>No human discretion is required beyond enforcement.</p>
      </section>

      <section>
        <h3>3.1 The Intelligence System</h3>
        <p>The Intelligence System is the decision engine that replaces sales conversations, qualification calls, and subjective judgment.</p>
        <p>It consists of:</p>
        <ul>
          <li>the Focus Group Intake Form</li>
          <li>the Post-Live Intelligence Survey</li>
          <li>the Routing Rules</li>
          <li>the Enforcement Protocols</li>
        </ul>
        <p>The system observes behavior. Behavior determines access.</p>
      </section>

      <section>
        <h3>3.2 Data Collection Layers</h3>
        <p>Authority Infrastructure™ collects data in three controlled layers. Each layer increases signal quality.</p>
      </section>

      <section>
        <h3>3.7 Enforcement Protocols</h3>
        <p>Authority Infrastructure™ enforces structure through absence, not argument.</p>
        
        <h4>3.7.1 Brainstorming Attempts</h4>
        <p>If a participant attempts ideation outside paid scope:</p>
        <p><strong>Response:</strong></p>
        <ul>
          <li>No engagement</li>
          <li>Redirect to assigned reflection</li>
          <li>Or silence</li>
        </ul>
        <p>Explanation is not provided.</p>

        <h4>3.7.2 Scope Expansion Attempts</h4>
        <p>If a participant requests customization beyond system boundaries:</p>
        <p><strong>Response:</strong></p>
        <ul>
          <li>Refer to system rules</li>
          <li>No exceptions</li>
          <li>No justification</li>
        </ul>

        <h4>3.7.3 Emotional Processing Attempts</h4>
        <p>If a participant seeks reassurance, motivation, or validation:</p>
        <p><strong>Response:</strong></p>
        <ul>
          <li>Redirect to assignment</li>
          <li>Or allow disengagement</li>
        </ul>
        <p>Emotional labor is not part of the system.</p>
      </section>

      <section>
        <h3>3.10 Founder Role Clarity</h3>
        <p>The founder does not:</p>
        <ul>
          <li>sell</li>
          <li>convince</li>
          <li>rescue</li>
          <li>negotiate</li>
          <li>ideate for free</li>
        </ul>
        <p>The founder:</p>
        <ul>
          <li>maintains structure</li>
          <li>enforces boundaries</li>
          <li>protects the system</li>
          <li>installs infrastructure</li>
        </ul>
        <p>Any action that compromises these functions is prohibited.</p>
      </section>

      <section>
        <h3>3.11 Failure Conditions</h3>
        <p>The following invalidate participation:</p>
        <ul>
          <li>refusal to follow instructions</li>
          <li>repeated attempts to brainstorm</li>
          <li>pressure for exceptions</li>
          <li>resistance to structure</li>
          <li>non-completion without cause</li>
        </ul>
        <p>Failure does not trigger remediation. It triggers exit.</p>
      </section>
    </div>
  );
}

function Part4Content() {
  return (
    <div className="space-y-8">
      <div>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Part 4: Eligibility, Escalation & System Integrity Controls</h2>
      </div>

      <section>
        <h3>4.0 Purpose of Part 4</h3>
        <p>Part 4 governs who is allowed to move where, when exceptions are permitted, and how system integrity is protected as revenue tiers increase.</p>
        <p>This section exists to:</p>
        <ul>
          <li>prevent underqualified participation</li>
          <li>eliminate emotional decision-making</li>
          <li>protect high-ticket capacity</li>
          <li>preserve intellectual property</li>
          <li>ensure scalability without dilution</li>
        </ul>
        <p>No delivery occurs in this section. Only control logic.</p>
      </section>

      <section>
        <h3>4.1 Eligibility Classes</h3>
        <p>All participants are classified into one of four eligibility classes based on evidence, not intent.</p>
        
        <h4>Class A — Pre-Validated Operators</h4>
        <p><strong>Criteria:</strong></p>
        <ul>
          <li>Documented revenue history</li>
          <li>Existing frameworks or methodologies</li>
          <li>Prior delivery evidence</li>
          <li>Demonstrated operational discipline</li>
        </ul>
        <p><strong>Privileges:</strong></p>
        <ul>
          <li>May bypass the $6,500 Sprint</li>
          <li>Eligible to apply directly for $10,000 Advisory</li>
          <li>May be invited to $25,000 Infrastructure Installation</li>
        </ul>

        <h4>Class B — Practicing Professionals</h4>
        <p><strong>Privileges:</strong></p>
        <ul>
          <li>Eligible for $6,500 Sprint</li>
          <li>Eligible for $10,000 Advisory after Sprint validation</li>
          <li>Not eligible for $25,000 without system readiness</li>
        </ul>

        <h4>Class C — Early-Stage Experts</h4>
        <p><strong>Privileges:</strong></p>
        <ul>
          <li>Focus Group participation only</li>
          <li>No Sprint or Advisory access</li>
        </ul>

        <h4>Class D — Non-Compliant Participants</h4>
        <p><strong>Privileges:</strong> None</p>
      </section>

      <section>
        <h3>4.3 Brainstorming vs Structured Ideation (Formal Definition)</h3>
        
        <h4>Brainstorming (Prohibited)</h4>
        <p>Brainstorming is:</p>
        <ul>
          <li>Open-ended idea generation</li>
          <li>Speculative exploration</li>
          <li>Free intellectual extraction</li>
          <li>Collaborative invention without compensation</li>
        </ul>

        <h4>Structured Ideation (Permitted at Paid Levels)</h4>
        <p>Structured ideation is:</p>
        <ul>
          <li>Constrained</li>
          <li>Goal-bound</li>
          <li>Based on existing material</li>
          <li>Executed within paid containers</li>
        </ul>
        <p>Structured ideation occurs only in:</p>
        <ul>
          <li>$10,000 Advisory (refinement)</li>
          <li>$25,000 Infrastructure Installation (system design)</li>
        </ul>
      </section>

      <section>
        <h3>4.7 System Violations & Removal</h3>
        <p>Immediate disqualification occurs for:</p>
        <ul>
          <li>Boundary violations</li>
          <li>IP extraction attempts</li>
          <li>Repeated non-compliance</li>
          <li>Emotional labor demands</li>
          <li>Instruction avoidance</li>
        </ul>
        <p><strong>Removal requires:</strong></p>
        <ul>
          <li>No explanation</li>
          <li>No refund</li>
          <li>No remediation</li>
        </ul>
        <p>System integrity overrides participant preference.</p>
      </section>

      <section>
        <h3>4.8 Final Governance Statement</h3>
        <p>Authority Infrastructure™ is not a coaching ecosystem.</p>
        <p>It is an institutional operating system.</p>
        <p>Participation is earned through:</p>
        <ul>
          <li>Compliance</li>
          <li>Execution</li>
          <li>Readiness</li>
          <li>Respect for structure</li>
        </ul>
        <p><strong>The system does not adapt to individuals. Individuals adapt to the system.</strong></p>
      </section>

      <section>
        <h3>4.16 Final Enforcement Statement</h3>
        <p>Escalation is not a reward. It is a verification outcome.</p>
        <p>No participant advances based on confidence, credentials, or claims alone.</p>
        <p><strong>Only evidence, compliance, and consistency determine access.</strong></p>
      </section>
    </div>
  );
}