import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Upload, CheckCircle2 } from "lucide-react";

export default function Assignments() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    assignmentName: "",
    response: "",
    file: null
  });
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

  const { data: submissions = [] } = useQuery({
    queryKey: ['submissions', user?.email],
    queryFn: () => base44.entities.HomeworkSubmission.filter({ userEmail: user?.email }, '-created_date'),
    enabled: !!user,
  });

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      let fileUrl = null;
      if (data.file) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file: data.file });
        fileUrl = file_url;
      }

      return base44.entities.HomeworkSubmission.create({
        assignmentName: data.assignmentName,
        response: data.response,
        fileUrl,
        userEmail: user.email
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      setFormData({ assignmentName: "", response: "", file: null });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.assignmentName || !formData.response) return;
    
    setUploading(true);
    try {
      await submitMutation.mutateAsync(formData);
    } finally {
      setUploading(false);
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

          {/* Submission Form */}
          <Card className="border-black/10 mb-12">
            <CardHeader>
              <CardTitle>Submit Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm text-black/60 mb-2 block">Assignment</label>
                  <Select
                    value={formData.assignmentName}
                    onValueChange={(value) => setFormData({ ...formData, assignmentName: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Orientation Reflection">Orientation Reflection</SelectItem>
                      <SelectItem value="Framework Design Exercise">Framework Design Exercise</SelectItem>
                      <SelectItem value="Validation Plan">Validation Plan</SelectItem>
                      <SelectItem value="System Installation Documentation">System Installation Documentation</SelectItem>
                      <SelectItem value="Readiness Assessment">Readiness Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-black/60 mb-2 block">Reflection / Response</label>
                  <Textarea
                    value={formData.response}
                    onChange={(e) => setFormData({ ...formData, response: e.target.value })}
                    placeholder="Share your insights, reflections, or completed work..."
                    className="h-48"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-black/60 mb-2 block">Attach File (Optional)</label>
                  <Input
                    type="file"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                  />
                </div>

                {submitted && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Assignment submitted successfully</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={uploading || !formData.assignmentName || !formData.response}
                  className="w-full bg-black hover:bg-black/80"
                >
                  {uploading ? 'Submitting...' : 'Submit Assignment'}
                </Button>
              </form>
            </CardContent>
          </Card>

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