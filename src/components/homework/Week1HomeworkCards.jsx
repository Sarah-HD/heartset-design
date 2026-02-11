import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Save, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const questions = {
  tab1: {
    title: "Capacity & Time Reality Audit",
    questions: [
      {
        id: "1.1",
        label: "Weekly Time Breakdown",
        prompt: "List hours spent on: delivering paid work, admin, marketing, lead follow-up, content creation, non-revenue activity, and total work hours per week.",
        tooltip: "Don't guess. Pull up your calendar from last week. We need to see where your time actually went, not where you wish it went."
      },
      {
        id: "1.2",
        label: "Revenue Density Check",
        prompt: "What activity generates the most revenue per hour? What generates the least? What drains you most?",
        tooltip: "We are looking for your 'Money Makers.' If you spend 5 hours on something that makes $0, that's a system leak we're going to fix."
      },
      {
        id: "1.3",
        label: "Scalability Check",
        prompt: "Which part of your delivery could be: Systemized? Grouped? Automated? Eliminated?",
        tooltip: "If you had 100 clients tomorrow, what parts of your work would stay the same? That's what we want to automate."
      }
    ]
  },
  tab2: {
    title: "Operator Identity & Positioning",
    questions: [
      {
        id: "2.1",
        label: "Market Role",
        prompt: "What do you currently call what you do? (Title, role, identity in market)",
        tooltip: "How do you introduce yourself at a conference? Give us the 'elevator pitch' title you use right now."
      },
      {
        id: "2.2",
        label: "Target Client",
        prompt: "Who do you primarily serve right now? (Be specific: role, situation, stage)",
        tooltip: null
      },
      {
        id: "2.3",
        label: "The Problem Gap",
        prompt: "What problem do they believe they have vs. what you know they actually have?",
        tooltip: "Your clients think they have a 'leaky faucet' (the symptom). You know they have 'bad plumbing' (the real problem). List both."
      },
      {
        id: "2.4",
        label: "The Transformation",
        prompt: "What transformation do people walk away with after working with you?",
        tooltip: null
      }
    ]
  },
  tab3: {
    title: "Method Extraction",
    questions: [
      {
        id: "3.1",
        label: "Framework Status",
        prompt: "Do you use a repeatable method or framework? (Yes / No / Informal)",
        tooltip: null
      },
      {
        id: "3.2",
        label: "Framework Name",
        prompt: "Working name of your framework.",
        tooltip: null
      },
      {
        id: "3.3",
        label: "The Pillars",
        prompt: "List the steps, phases, or pillars of your method (Up to 6).",
        tooltip: "Speech-to-text trick: Just record yourself explaining how you get a client from A to B. Then, pick out the 3–6 main 'milestones' you always hit."
      },
      {
        id: "3.4",
        label: "Pillar Logic",
        prompt: "For each step, write one sentence explaining what happens there.",
        tooltip: null
      },
      {
        id: "3.5",
        label: "Documentation Level",
        prompt: "Which parts are documented vs. delivered verbally?",
        tooltip: "Be honest—if it's only in your head, that's fine. This manual is the first step in getting it out so you don't have to repeat yourself forever."
      }
    ]
  },
  tab4: {
    title: "Asset Inventory & Evidence",
    questions: [
      {
        id: "4.1",
        label: "Existing Assets",
        prompt: "Which do you have? (Course / Program / Workshop / Workbook / Templates / Coaching / Certification / Speaking)",
        tooltip: null
      },
      {
        id: "4.2",
        label: "Asset Registry",
        prompt: "List the names/titles of all existing assets.",
        tooltip: null
      },
      {
        id: "4.3",
        label: "Asset Performance",
        prompt: "Which generates the highest revenue? Which consumes the most time?",
        tooltip: null
      },
      {
        id: "4.4",
        label: "Authority Marks",
        prompt: "List relevant credentials, certifications, or training.",
        tooltip: null
      },
      {
        id: "4.5",
        label: "Outcome Evidence",
        prompt: "List three specific outcomes you've helped someone achieve.",
        tooltip: "What is the #1 thing people thank you for? List three times you've made that happen for someone else."
      },
      {
        id: "4.6",
        label: "Proof Types",
        prompt: "What proof currently exists? (Testimonials / Case studies / Screenshots / Revenue data)",
        tooltip: "We're looking for 'Social Proof.' If you have a screenshot of a happy text or a LinkedIn testimonial, that's an institutional asset."
      }
    ]
  },
  tab5: {
    title: "Operational Reality & Offers",
    questions: [
      {
        id: "5.1",
        label: "Delivery Load",
        prompt: "Hours per week on client work vs. admin/operations.",
        tooltip: null
      },
      {
        id: "5.2",
        label: "Delivery Format",
        prompt: "How do you deliver work? (1:1 / Group / Asynchronous / Mixed)",
        tooltip: null
      },
      {
        id: "5.3",
        label: "Growth Constraints",
        prompt: "What currently limits your growth? (Time / Energy / Systems / Positioning / Leads / Offer)",
        tooltip: null
      },
      {
        id: "5.4",
        label: "Offer Suite",
        prompt: "List current offers and price points.",
        tooltip: null
      },
      {
        id: "5.5",
        label: "Premium Tier",
        prompt: "What is your highest priced offer?",
        tooltip: null
      },
      {
        id: "5.6",
        label: "Offer Structure",
        prompt: "Do you have Low-ticket / Mid-tier / High-ticket tiers?",
        tooltip: null
      },
      {
        id: "5.7",
        label: "The Breaking Point",
        prompt: "If you doubled your prices tomorrow, what would break first?",
        tooltip: null
      }
    ]
  },
  tab6: {
    title: "Market Validation & Technical Baseline",
    questions: [
      {
        id: "6.1",
        label: "Market Gathering",
        prompt: "Where do your ideal clients already gather?",
        tooltip: null
      },
      {
        id: "6.2",
        label: "Demand History",
        prompt: "Have you tested demand? (Focus group / Beta / Pilot / Paid launch)",
        tooltip: null
      },
      {
        id: "6.3",
        label: "Client Voice",
        prompt: "What language do clients use to describe their problem?",
        tooltip: "What exact words do they use when they're complaining about their problem? Use their language, not your 'expert' language."
      },
      {
        id: "6.4",
        label: "Objection Handling",
        prompt: "What objections do you hear most often?",
        tooltip: null
      },
      {
        id: "6.5",
        label: "Tech Stack",
        prompt: "Website, Domain, Email, Payment, and CRM platforms.",
        tooltip: null
      },
      {
        id: "6.6",
        label: "Ownership",
        prompt: "Do you currently own your tech stack?",
        tooltip: "If your web guy disappeared tomorrow, could you still log in? We need to ensure you have full 'Infrastructure Control'."
      }
    ]
  },
  tab7: {
    title: "Intent & Execution",
    questions: [
      {
        id: "7.1",
        label: "Success Metric",
        prompt: "What would make this Sprint successful for you?",
        tooltip: "What is the ONE thing that, if finished by day 30, would make this a win? Don't say 'scaling'—be specific, like 'My manual is 100% complete'."
      },
      {
        id: "7.2",
        label: "The 30-Day Bound",
        prompt: "What are you willing to execute vs. what are you not willing to do?",
        tooltip: "This is your 'Operating Constraint.' If you aren't willing to do live sales calls, we need to know that now so we can engineer the 'Routing Logic' to handle the work for you."
      }
    ]
  }
};

export default function Week1HomeworkCards() {
  const [user, setUser] = useState(null);
  const [responses, setResponses] = useState({});
  const [savedQuestions, setSavedQuestions] = useState(new Set());
  const [savingQuestions, setSavingQuestions] = useState(new Set());

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    loadUser();
  }, []);

  const handleSave = async (questionId, tabKey) => {
    if (!user || !responses[questionId]) return;

    setSavingQuestions(prev => new Set(prev).add(questionId));

    try {
      const tab = questions[tabKey];
      const question = tab.questions.find(q => q.id === questionId);
      
      await base44.entities.HomeworkSubmission.create({
        assignmentName: `Week 1 - ${tab.title} - ${question.label}`,
        response: responses[questionId],
        userEmail: user.email
      });

      setSavedQuestions(prev => new Set(prev).add(questionId));
      
      setTimeout(() => {
        setSavedQuestions(prev => {
          const newSet = new Set(prev);
          newSet.delete(questionId);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSavingQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }
  };

  const renderQuestion = (question, tabKey) => (
    <Card key={question.id} className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {question.id} {question.label}
          {question.tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-black/40 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm bg-black text-white p-4">
                  <p className="text-sm font-light leading-relaxed">{question.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-black/60 font-light">{question.prompt}</p>
        <Textarea
          placeholder="Use speech-to-text (microphone icon on your keyboard) or type your answer here..."
          value={responses[question.id] || ""}
          onChange={(e) => setResponses(prev => ({ ...prev, [question.id]: e.target.value }))}
          rows={6}
          className="font-light"
        />
        <div className="flex justify-end">
          <Button
            onClick={() => handleSave(question.id, tabKey)}
            disabled={!responses[question.id] || savingQuestions.has(question.id) || savedQuestions.has(question.id)}
            className="bg-black text-white hover:bg-black/90"
            size="sm"
          >
            {savedQuestions.has(question.id) ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {savingQuestions.has(question.id) ? "Saving..." : "Save Answer"}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full bg-neutral-50 border-t border-black/10 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Week 1 Homework: Operational Manual Template
          </h2>
          <div className="bg-white border border-black/10 p-6 mb-6">
            <p className="text-sm text-black/60 font-light leading-relaxed mb-3">
              <strong>Pro Tip:</strong> Don't type—just talk. Open your Notes app, hit the microphone, and answer these cards. Then, copy and paste that "raw" brain-dump into your Manual.
            </p>
            <p className="text-sm text-black/60 font-light leading-relaxed">
              This is <strong>Extraction</strong>, not creative writing. Speed over perfection.
            </p>
          </div>
        </div>

        <Tabs defaultValue="tab1" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            <TabsTrigger value="tab4">Tab 4</TabsTrigger>
            <TabsTrigger value="tab5">Tab 5</TabsTrigger>
            <TabsTrigger value="tab6">Tab 6</TabsTrigger>
            <TabsTrigger value="tab7">Tab 7</TabsTrigger>
          </TabsList>

          {Object.entries(questions).map(([key, tab]) => (
            <TabsContent key={key} value={key}>
              <div className="mb-6">
                <h3 className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {tab.title}
                </h3>
              </div>
              {tab.questions.map(q => renderQuestion(q, key))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}