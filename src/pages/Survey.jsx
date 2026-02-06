import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { CheckCircle2, Lock } from "lucide-react";

export default function Survey() {
  const [user, setUser] = useState(null);
  const [accessCode, setAccessCode] = useState("");
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {activeSurvey.title}
            </h1>
            {activeSurvey.description && (
              <p className="text-lg text-black/60 font-light">
                {activeSurvey.description}
              </p>
            )}
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {activeSurvey.questions.map((question, idx) => (
                <Card key={idx} className="border-black/10">
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">
                      {idx + 1}. {question.text}
                      {question.required && <span className="text-red-600 ml-1">*</span>}
                    </h3>

                    {question.type === 'text' && (
                      <Input
                        value={responses[question.id] || ''}
                        onChange={(e) => updateResponse(question.id, e.target.value)}
                        placeholder="Your answer"
                        required={question.required}
                      />
                    )}

                    {question.type === 'textarea' && (
                      <Textarea
                        value={responses[question.id] || ''}
                        onChange={(e) => updateResponse(question.id, e.target.value)}
                        placeholder="Your answer"
                        className="h-32"
                        required={question.required}
                      />
                    )}

                    {question.type === 'radio' && (
                      <RadioGroup
                        value={responses[question.id]}
                        onValueChange={(value) => updateResponse(question.id, value)}
                        required={question.required}
                      >
                        {question.options.map((option, optIdx) => (
                          <div key={optIdx} className="flex items-center space-x-2 mb-2">
                            <RadioGroupItem value={option} id={`q${idx}-opt${optIdx}`} />
                            <Label htmlFor={`q${idx}-opt${optIdx}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-black hover:bg-black/80"
              >
                {submitMutation.isPending ? 'Submitting...' : 'Submit Survey'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}