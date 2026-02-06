import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, Clock, ExternalLink } from "lucide-react";

export default function Assignments() {
  const [user, setUser] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [response, setResponse] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
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

  const { data: assignments = [] } = useQuery({
    queryKey: ['assignments'],
    queryFn: () => base44.entities.Assignment.list('order'),
    enabled: !!user,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ['submissions', user?.email],
    queryFn: () => base44.entities.HomeworkSubmission.filter({ userEmail: user?.email }, '-created_date'),
    enabled: !!user,
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      let fileUrl = null;
      if (file) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        fileUrl = file_url;
      }

      return base44.entities.HomeworkSubmission.create({
        assignmentName: selectedAssignment.title,
        response,
        fileUrl,
        userEmail: user.email
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      setSelectedAssignment(null);
      setResponse("");
      setFile(null);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssignment || !response) return;
    
    setUploading(true);
    try {
      await submitMutation.mutateAsync();
    } finally {
      setUploading(false);
    }
  };

  const hasCompletedAssignment = (assignmentTitle) => {
    return submissions.some(sub => sub.assignmentName === assignmentTitle);
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
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Assignments
            </h1>
            <p className="text-lg text-black/60 font-light">
              Submit your reflections and work
            </p>
          </motion.div>

          {/* Available Assignments */}
          <div className="mb-12">
            <h2 
              className="text-2xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Available Assignments
            </h2>
            
            {assignments.length === 0 ? (
              <p className="text-black/40">No assignments available yet.</p>
            ) : (
              <div className="grid gap-4">
                {assignments.map((assignment) => {
                  const isCompleted = hasCompletedAssignment(assignment.title);
                  
                  return (
                    <Card 
                      key={assignment.id} 
                      className={`border-black/10 ${isCompleted ? 'bg-neutral-50' : ''}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium">{assignment.title}</h3>
                              {isCompleted && (
                                <Badge className="bg-green-600 text-white">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Completed
                                </Badge>
                              )}
                            </div>
                            {assignment.description && (
                              <p className="text-sm text-black/60 mb-3">{assignment.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-black/50">
                              {assignment.phaseTag && (
                                <Badge variant="outline" className="text-xs">
                                  {assignment.phaseTag}
                                </Badge>
                              )}
                              {assignment.timeEstimate && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{assignment.timeEstimate}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {assignment.googleDocUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(assignment.googleDocUrl, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Open Assignment
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setResponse("");
                              setFile(null);
                            }}
                            className="bg-black hover:bg-black/80"
                          >
                            Submit Response
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Submission Modal/Form */}
          {selectedAssignment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Card className="border-black/20 border-2">
                <CardHeader>
                  <CardTitle>Submit: {selectedAssignment.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-sm text-black/60 mb-2 block">Your Response</label>
                      <Textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Share your insights, reflections, or completed work..."
                        className="h-48"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm text-black/60 mb-2 block">Attach File (Optional)</label>
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="block w-full text-sm text-black/60 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:text-white file:text-sm file:cursor-pointer hover:file:bg-black/80"
                      />
                    </div>

                    {submitted && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Assignment submitted successfully</span>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={uploading || !response}
                        className="flex-1 bg-black hover:bg-black/80"
                      >
                        {uploading ? 'Submitting...' : 'Submit Assignment'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedAssignment(null);
                          setResponse("");
                          setFile(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Previous Submissions */}
          <div>
            <h2 
              className="text-2xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Submissions
            </h2>
            
            {submissions.length === 0 ? (
              <p className="text-black/40">No submissions yet.</p>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id} className="border-black/10">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{submission.assignmentName}</h3>
                        <span className="text-xs text-black/40">
                          {new Date(submission.created_date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-black/60 line-clamp-3 mb-3">
                        {submission.response}
                      </p>
                      {submission.fileUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(submission.fileUrl, '_blank')}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          View Attachment
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}