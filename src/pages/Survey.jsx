import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, ArrowRight, ArrowLeft } from "lucide-react";

export default function Survey() {
  const [user, setUser] = useState(null);
  const [accessCode, setAccessCode] = useState("");
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.log("User not logged in");
      }
    };
    loadUser();
  }, []);

  const { data: surveys = [] } = useQuery({
    queryKey: ['surveys'],
    queryFn: () => base44.entities.Survey.filter({ isActive: true }),
  });

  const { data: existingResponse } = useQuery({
    queryKey: ['surveyResponse', user?.email, activeSurvey?.id],
    queryFn: () => base44.entities.SurveyResponse.filter({ 
      userEmail: user?.email, 
      surveyId: activeSurvey?.id 
    }),
    enabled: !!user && !!activeSurvey,
  });

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      await base44.entities.SurveyResponse.create(data);
      
      // Send confirmation email
      if (user) {
        await base44.integrations.Core.SendEmail({
          to: user.email,
          subject: 'Survey Response Received',
          body: `Thank you for completing the survey.\n\nYour responses have been recorded.\n\nNext steps will be communicated to you shortly.`
        });
      }
    },
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleAccessCode = () => {
    const survey = surveys.find(s => s.accessCode === accessCode);
    if (survey) {
      setActiveSurvey(survey);
      setAccessGranted(true);
    } else {
      alert("Invalid access code");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await submitMutation.mutateAsync({
      surveyId: activeSurvey.id,
      userEmail: user?.email || 'anonymous',
      responses
    });
  };

  const updateResponse = (questionId, value) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const groupQuestionsBySections = (questions) => {
    const sections = [];
    let currentSec = [];
    let currentSecName = "";

    questions.forEach((q, idx) => {
      if (q.sectionTitle) {
        if (currentSec.length > 0) {
          sections.push({ title: currentSecName, questions: currentSec });
        }
        currentSecName = q.sectionTitle;
        currentSec = [q];
      } else {
        currentSec.push(q);
      }
    });

    if (currentSec.length > 0) {
      sections.push({ title: currentSecName, questions: currentSec });
    }

    return sections;
  };

  const canProceed = (section) => {
    return section.questions.every(q => {
      if (!q.required) return true;
      const response = responses[q.id];
      if (q.type === 'checkbox') {
        return response && response.length > 0;
      }
      return response && response.trim() !== '';
    });
  };

  // Auto-select first active survey if user is logged in
  React.useEffect(() => {
    if (surveys.length > 0 && user && !activeSurvey) {
      setActiveSurvey(surveys[0]);
      setAccessGranted(true);
    }
  }, [surveys, user, activeSurvey]);

  if (existingResponse && existingResponse.length > 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Card className="max-w-lg border-black/10">
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 
              className="text-2xl mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Survey Already Completed
            </h2>
            <p className="text-black/60">
              You have already submitted a response to this survey. Thank you for your participation.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Card className="max-w-lg border-black/10">
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 
              className="text-2xl mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Thank You
            </h2>
            <p className="text-black/60 mb-6">
              Your responses have been submitted. Next steps will be communicated to you shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Card className="max-w-md border-black/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Survey Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-black/60 mb-4">
              Enter the access code provided to you to access the survey.
            </p>
            <div className="space-y-4">
              <Input
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code"
                className="text-center text-lg tracking-wider"
              />
              <Button
                onClick={handleAccessCode}
                className="w-full bg-black hover:bg-black/80"
              >
                Access Survey
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!activeSurvey) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">No active surveys available.</p>
      </div>
    );
  }

  const sections = groupQuestionsBySections(activeSurvey.questions);
  const totalSections = sections.length;
  const progressPercent = ((currentSection + 1) / totalSections) * 100;
  const currentSec = sections[currentSection];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 
              className="text-3xl md:text-4xl mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {activeSurvey.title}
            </h1>
            {activeSurvey.description && (
              <p className="text-base text-black/60 font-light">
                {activeSurvey.description}
              </p>
            )}
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-black/50 mb-2">
              <span>Section {currentSection + 1} of {totalSections}</span>
              <span>{Math.round(progressPercent)}% Complete</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Section Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-black/10 mb-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">
                    {currentSec.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentSec.questions.map((question, qIdx) => (
                    <div key={question.id} className="pb-6 border-b border-black/5 last:border-0 last:pb-0">
                      <h3 className="font-medium mb-3 text-base">
                        {question.text}
                        {question.required && <span className="text-red-600 ml-1">*</span>}
                      </h3>

                      {question.type === 'text' && (
                        <Input
                          value={responses[question.id] || ''}
                          onChange={(e) => updateResponse(question.id, e.target.value)}
                          placeholder="Your answer"
                          className="max-w-md"
                        />
                      )}

                      {question.type === 'textarea' && (
                        <Textarea
                          value={responses[question.id] || ''}
                          onChange={(e) => updateResponse(question.id, e.target.value)}
                          placeholder="Your answer"
                          className="h-24"
                        />
                      )}

                      {question.type === 'radio' && (
                        <RadioGroup
                          value={responses[question.id]}
                          onValueChange={(value) => updateResponse(question.id, value)}
                        >
                          <div className="space-y-2">
                            {question.options.map((option, optIdx) => (
                              <div key={optIdx} className="flex items-start space-x-3 p-3 rounded hover:bg-neutral-50 transition-colors cursor-pointer">
                                <RadioGroupItem value={option} id={`q${question.id}-opt${optIdx}`} className="mt-0.5" />
                                <Label htmlFor={`q${question.id}-opt${optIdx}`} className="flex-1 cursor-pointer leading-relaxed">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      )}

                      {question.type === 'checkbox' && (
                        <div className="space-y-2">
                          {question.options.map((option, optIdx) => (
                            <div key={optIdx} className="flex items-start space-x-3 p-3 rounded hover:bg-neutral-50 transition-colors">
                              <Checkbox
                                id={`q${question.id}-opt${optIdx}`}
                                checked={(responses[question.id] || []).includes(option)}
                                onCheckedChange={(checked) => {
                                  const current = responses[question.id] || [];
                                  if (checked) {
                                    updateResponse(question.id, [...current, option]);
                                  } else {
                                    updateResponse(question.id, current.filter(o => o !== option));
                                  }
                                }}
                                className="mt-0.5"
                              />
                              <Label htmlFor={`q${question.id}-opt${optIdx}`} className="flex-1 cursor-pointer leading-relaxed">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {currentSection > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentSection(currentSection - 1)}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>
                )}
                
                {currentSection < totalSections - 1 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentSection(currentSection + 1)}
                    disabled={!canProceed(currentSec)}
                    className="flex-1 bg-black hover:bg-black/80 gap-2"
                  >
                    Next Section
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending || !canProceed(currentSec)}
                    className="flex-1 bg-black hover:bg-black/80"
                  >
                    {submitMutation.isPending ? 'Submitting...' : 'Submit Survey'}
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}