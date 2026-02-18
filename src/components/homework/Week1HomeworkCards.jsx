import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Info, Save, CheckCircle2, Download, Copy, Clock, Upload, Mic } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const questions = {
  tab1: {
    title: "Time & Capacity Audit",
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
    title: "Market Identity",
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
    title: "Method Structure",
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
    title: "Asset & Proof Inventory",
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
    title: "Delivery & Offer Stack",
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
      },
      {
        id: "5.8",
        label: "Offer Outcome Definition",
        prompt: "For each tier (Core/Mid/Low), define: Timeframe, Business Metric, Emotional State achieved.",
        tooltip: "Example: '90 days, $50K in new sales, feels confident in sales process.' Be specific and measurable."
      }
    ]
  },
  tab6: {
    title: "Market & Tech Baseline",
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
    title: "Execution Intent",
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
      },
      {
        id: "7.3",
        label: "Revenue Sprint Target",
        prompt: "What is your revenue goal for the next 90 days? Be specific with the dollar amount.",
        tooltip: "This anchors your outreach volume and contact targeting. Don't inflate—be realistic based on your capacity."
      },
      {
        id: "7.4",
        label: "Reverse Outreach Calculation",
        prompt: "Based on your revenue target, how many Core sales do you need? How large does your room need to be? How much outreach is required?",
        tooltip: "Use the Participation Modeling Calculator in 'Reverse Target' mode to calculate these numbers. This is your execution roadmap."
      },
      {
        id: "7.5",
        label: "100 Contact Criteria Definition",
        prompt: "Define your ideal contact profile across these filters:\n\nA. Revenue Reality: Can they afford your Core offer? What revenue range?\nB. Authority Fit: Do they have decision-making power? What title/role?\nC. Platform: Where do they gather? (LinkedIn, industry events, communities)\nD. Hard Qualification Filters: Industry, geography, company size, tech stack, certification requirements.",
        tooltip: "This is not 'niching'—it's qualification logic. You're defining WHO can participate, WHO can afford it, and WHERE to find them."
      }
    ]
  }
};

export default function Week1HomeworkCards() {
  const [user, setUser] = useState(null);
  const [responses, setResponses] = useState({});
  const [savedQuestions, setSavedQuestions] = useState(new Set());
  const [savingQuestions, setSavingQuestions] = useState(new Set());
  const [qualificationFilters, setQualificationFilters] = useState({
    industry: false,
    geography: false,
    companySize: false,
    techStack: false,
    certification: false,
    revenue: false
  });
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [completed, setCompleted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isListening, setIsListening] = useState({});

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

  React.useEffect(() => {
    let interval;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      setPomodoroTime(25 * 60);
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime]);

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

  const handleExportBlank = () => {
    let markdown = "# Week 1 Operational Manual - Blank Template\n\n";
    
    Object.entries(questions).forEach(([key, tab]) => {
      markdown += `## ${tab.title}\n\n`;
      tab.questions.forEach(q => {
        markdown += `### ${q.id} ${q.label}\n`;
        markdown += `${q.prompt}\n\n`;
        markdown += `**Your Answer:**\n\n---\n\n`;
      });
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Week1-Blank-Template.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportFilled = () => {
    let markdown = "# Week 1 Operational Manual - My Answers\n\n";
    
    Object.entries(questions).forEach(([key, tab]) => {
      markdown += `## ${tab.title}\n\n`;
      tab.questions.forEach(q => {
        markdown += `### ${q.id} ${q.label}\n`;
        markdown += `${q.prompt}\n\n`;
        markdown += `**Your Answer:**\n${responses[q.id] || '[Not answered yet]'}\n\n---\n\n`;
      });
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Week1-Filled-Template.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateBlueprintDraft = () => {
    let markdown = "# Operational Blueprint Draft\n\n";
    markdown += "**Generated:** " + new Date().toLocaleDateString() + "\n\n";
    markdown += "---\n\n";
    
    Object.entries(questions).forEach(([key, tab]) => {
      markdown += `## ${tab.title}\n\n`;
      tab.questions.forEach(q => {
        markdown += `### ${q.label}\n`;
        markdown += `${responses[q.id] || '[Not answered]'}\n\n`;
      });
      markdown += "---\n\n";
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Blueprint-Draft.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setUploadedFile(file_url);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const startSpeechToText = (questionId) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(prev => ({ ...prev, [questionId]: true }));
    };

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setResponses(prev => ({ ...prev, [questionId]: transcript }));
    };

    recognition.onerror = () => {
      setIsListening(prev => ({ ...prev, [questionId]: false }));
    };

    recognition.onend = () => {
      setIsListening(prev => ({ ...prev, [questionId]: false }));
    };

    if (isListening[questionId]) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleCopyProspectPrompt = () => {
    const promptText = `Based on my business profile, help me refine my LinkedIn prospect search criteria:

Revenue Target: ${responses['7.3'] || '[Not specified]'}
Core Offer Price: ${responses['5.5'] || '[Not specified]'}
Target Client: ${responses['2.2'] || '[Not specified]'}

Please extract and refine:
1. Specific job titles that match decision-making authority
2. Industries that align with this problem
3. Company size range (by revenue or employee count)
4. Geographic focus (if any)
5. Any technical or certification requirements

Output the refined criteria as a structured list I can use for LinkedIn Sales Navigator or prospecting tools.`;

    navigator.clipboard.writeText(promptText);
    alert("Prompt copied! Paste into ChatGPT or Claude to refine your targeting.");
  };

  const renderQuestion = (question, tabKey) => {
    // Special rendering for 7.5 (100 Contact Criteria)
    if (question.id === '7.5') {
      return (
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
          <CardContent className="space-y-4">
            <p className="text-sm text-black/60 font-light whitespace-pre-line">{question.prompt}</p>
            
            <div className="bg-neutral-50 border border-black/10 p-4 space-y-3">
              <p className="text-xs font-medium text-black/70">D. Hard Qualification Filters (Check all that apply):</p>
              <div className="space-y-2">
                {Object.entries(qualificationFilters).map(([key, checked]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(val) => setQualificationFilters(prev => ({ ...prev, [key]: val }))}
                    />
                    <label className="text-sm text-black/70 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  </div>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Define your A, B, C filters here..."
              value={responses[question.id] || ""}
              onChange={(e) => setResponses(prev => ({ ...prev, [question.id]: e.target.value }))}
              rows={8}
              className="font-light"
            />

            <div className="bg-blue-50 border border-blue-200 p-4 space-y-3">
              <p className="text-sm font-medium text-blue-900">AI Refinement Tool (Optional)</p>
              <p className="text-xs text-blue-800 font-light">Copy this prompt and paste it into ChatGPT or Claude to refine your targeting criteria based on your answers above.</p>
              <Button
                onClick={handleCopyProspectPrompt}
                variant="outline"
                size="sm"
                className="w-full border-blue-300 text-blue-900 hover:bg-blue-100"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Prospect Intelligence Prompt
              </Button>
            </div>

            <div className="flex justify-end gap-2">
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
    }

    // Default rendering for all other questions
    return (
      <Card key={question.id} className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            {question.id} {question.label}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-black/40 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm bg-black text-white p-4">
                  <p className="text-sm font-light leading-relaxed">
                    {question.tooltip || "Answer this question based on your current business operations and experience."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-black/60 font-light">{question.prompt}</p>
          <div className="relative">
            <Textarea
              placeholder="Type your answer or use speech-to-text..."
              value={responses[question.id] || ""}
              onChange={(e) => setResponses(prev => ({ ...prev, [question.id]: e.target.value }))}
              rows={6}
              className="font-light pr-12"
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => startSpeechToText(question.id)}
              className={`absolute right-2 top-2 ${isListening[question.id] ? 'text-red-600' : 'text-black/40'}`}
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
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
  };

  return (
    <div className="w-full bg-neutral-50 border-t border-black/10 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Operational Skeleton Builder
            </h2>
            <Button
              onClick={() => {
                if (pomodoroActive) {
                  setPomodoroActive(false);
                } else {
                  setPomodoroTime(25 * 60);
                  setPomodoroActive(true);
                }
              }}
              variant="outline"
              size="sm"
              className="border-black/20"
            >
              <Clock className="w-4 h-4 mr-2" />
              {pomodoroActive ? formatTime(pomodoroTime) : "Start 25-Min Focus Block"}
            </Button>
          </div>
          <div className="bg-white border border-black/10 p-6 mb-6">
            <h3 className="text-base font-medium mb-3">Execution Protocol</h3>
            <p className="text-sm text-black/60 font-light leading-relaxed mb-2">
              Do not overthink.
            </p>
            <p className="text-sm text-black/60 font-light leading-relaxed mb-2">
              Use speech-to-text.
            </p>
            <p className="text-sm text-black/60 font-light leading-relaxed mb-2">
              Answer fast.
            </p>
            <p className="text-sm text-black/60 font-light leading-relaxed mb-2">
              This is extraction - not performance.
            </p>
            <p className="text-sm text-black/70 font-medium leading-relaxed mt-4">
              We do not store or review your responses.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                onClick={handleExportBlank}
                variant="outline"
                size="sm"
                className="border-black/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Blank Questions
              </Button>
              <Button
                onClick={handleGenerateBlueprintDraft}
                variant="default"
                size="sm"
                className="bg-black text-white hover:bg-black/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Generate My Blueprint Draft
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="tab1" className="w-full">
          <TabsList className="grid w-full grid-cols-7 gap-1 mb-8">
            <TabsTrigger value="tab1" className="text-xs px-2">Time & Capacity</TabsTrigger>
            <TabsTrigger value="tab2" className="text-xs px-2">Market Identity</TabsTrigger>
            <TabsTrigger value="tab3" className="text-xs px-2">Method</TabsTrigger>
            <TabsTrigger value="tab4" className="text-xs px-2">Assets</TabsTrigger>
            <TabsTrigger value="tab5" className="text-xs px-2">Delivery</TabsTrigger>
            <TabsTrigger value="tab6" className="text-xs px-2">Market & Tech</TabsTrigger>
            <TabsTrigger value="tab7" className="text-xs px-2">Execution</TabsTrigger>
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

        <div className="bg-white border border-black/10 p-6 mt-8">
          <h3 className="text-lg font-medium mb-4">Week 1 Completion</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={completed}
                onCheckedChange={setCompleted}
                className="mt-1"
              />
              <label className="text-sm text-black/70 font-light">
                I completed all 7 sections
              </label>
            </div>
            <div>
              <label className="text-sm text-black/70 font-medium mb-2 block">
                Upload 1-page summary OR screenshot of your drafted document
              </label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
                className="border-black/20"
              />
              {uploadedFile && (
                <p className="text-xs text-green-600 mt-2">File uploaded successfully</p>
              )}
            </div>
            <Button
              disabled={!completed || !uploadedFile}
              className="bg-black text-white hover:bg-black/90"
            >
              Submit Week 1
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}