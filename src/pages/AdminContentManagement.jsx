import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trash2, Video as VideoIcon, Users, FileText, BarChart3, UserCheck, ArrowLeft } from "lucide-react";
import SurveyCreator from "@/components/admin/SurveyCreator";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AdminContentManagement() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newVideo, setNewVideo] = useState({ 
    title: "", 
    description: "", 
    duration: "",
    phaseTag: "",
    file: null, 
    thumbnail: null 
  });
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    timeEstimate: "",
    googleDocUrl: "",
    phaseTag: "",
    order: 0
  });
  
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        if (currentUser?.role !== 'admin') {
          window.location.href = '/';
          return;
        }
        setUser(currentUser);
      } catch (error) {
        window.location.href = '/';
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const { data: videos = [] } = useQuery({
    queryKey: ['videos'],
    queryFn: () => base44.entities.Video.list('-created_date'),
    enabled: !!user,
  });

  const { data: assignments = [] } = useQuery({
    queryKey: ['assignments'],
    queryFn: () => base44.entities.Assignment.list('order'),
    enabled: !!user,
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list(),
    enabled: !!user,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ['submissions'],
    queryFn: () => base44.entities.HomeworkSubmission.list('-created_date'),
    enabled: !!user,
  });

  const { data: surveyResponses = [] } = useQuery({
    queryKey: ['surveyResponses'],
    queryFn: () => base44.entities.SurveyResponse.list('-created_date'),
    enabled: !!user,
  });

  const deleteVideoMutation = useMutation({
    mutationFn: (id) => base44.entities.Video.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['videos'] }),
  });

  const deleteAssignmentMutation = useMutation({
    mutationFn: (id) => base44.entities.Assignment.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['assignments'] }),
  });

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.file) return;

    setUploading(true);
    try {
      const { file_url: videoUrl } = await base44.integrations.Core.UploadFile({ file: newVideo.file });
      
      let thumbnailUrl = null;
      if (newVideo.thumbnail) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file: newVideo.thumbnail });
        thumbnailUrl = file_url;
      }

      await base44.entities.Video.create({
        title: newVideo.title,
        description: newVideo.description,
        duration: newVideo.duration,
        phaseTag: newVideo.phaseTag,
        fileUrl: videoUrl,
        thumbnailUrl,
      });

      queryClient.invalidateQueries({ queryKey: ['videos'] });
      setNewVideo({ title: "", description: "", duration: "", phaseTag: "", file: null, thumbnail: null });
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAssignmentCreate = async (e) => {
    e.preventDefault();
    if (!newAssignment.title) return;

    try {
      await base44.entities.Assignment.create(newAssignment);
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      setNewAssignment({
        title: "",
        description: "",
        timeEstimate: "",
        googleDocUrl: "",
        phaseTag: "",
        order: 0
      });
    } catch (error) {
      alert('Failed to create assignment: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link to={createPageUrl("AdminHome")} className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Admin Dashboard
            </Link>
            <h1 
              className="text-4xl md:text-5xl mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Content Management
            </h1>
            <p className="text-black/50 text-sm">Manage videos, assignments, users, and surveys</p>
          </div>

          <Tabs defaultValue="videos" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto">
              <TabsTrigger value="videos" className="gap-2">
                <VideoIcon className="w-4 h-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="assignments" className="gap-2">
                <FileText className="w-4 h-4" />
                Assignments
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="submissions" className="gap-2">
                <UserCheck className="w-4 h-4" />
                Submissions
              </TabsTrigger>
              <TabsTrigger value="surveys" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Surveys
              </TabsTrigger>
            </TabsList>

            {/* Videos Tab */}
            <TabsContent value="videos">
              <Card className="border-black/10 mb-8">
                <CardHeader>
                  <CardTitle>Upload New Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVideoUpload} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-black/60 mb-2 block">Title*</label>
                        <Input
                          value={newVideo.title}
                          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                          placeholder="Video title"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm text-black/60 mb-2 block">Duration</label>
                        <Input
                          value={newVideo.duration}
                          onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                          placeholder="e.g., 12 minutes"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-black/60 mb-2 block">Phase Tag</label>
                      <Input
                        value={newVideo.phaseTag}
                        onChange={(e) => setNewVideo({ ...newVideo, phaseTag: e.target.value })}
                        placeholder="e.g., Focus Group Day 1"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-black/60 mb-2 block">Description</label>
                      <Textarea
                        value={newVideo.description}
                        onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                        placeholder="Video description"
                        className="h-24"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-black/60 mb-2 block">Video File*</label>
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setNewVideo({ ...newVideo, file: e.target.files[0] })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm text-black/60 mb-2 block">Thumbnail</label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.files[0] })}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={uploading}
                      className="bg-black hover:bg-black/80"
                    >
                      {uploading ? 'Uploading...' : 'Upload Video'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="border-black/10">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-black/5 rounded mb-4 flex items-center justify-center overflow-hidden">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                        ) : (
                          <VideoIcon className="w-12 h-12 text-black/20" />
                        )}
                      </div>
                      {video.phaseTag && <Badge variant="outline" className="mb-2">{video.phaseTag}</Badge>}
                      <h3 className="font-medium mb-2">{video.title}</h3>
                      {video.duration && <p className="text-xs text-black/50 mb-4">{video.duration}</p>}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => window.open(video.fileUrl, '_blank')}>
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm('Delete this video?')) {
                              deleteVideoMutation.mutate(video.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments">
              <Card className="border-black/10 mb-8">
                <CardHeader>
                  <CardTitle>Create New Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAssignmentCreate} className="space-y-4">
                    <div>
                      <label className="text-sm text-black/60 mb-2 block">Title*</label>
                      <Input
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                        placeholder="Assignment title"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm text-black/60 mb-2 block">Description</label>
                      <Textarea
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                        placeholder="Assignment description"
                        className="h-24"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-black/60 mb-2 block">Time Estimate*</label>
                        <Input
                          value={newAssignment.timeEstimate}
                          onChange={(e) => setNewAssignment({ ...newAssignment, timeEstimate: e.target.value })}
                          placeholder="e.g., 10 minutes"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm text-black/60 mb-2 block">Phase Tag</label>
                        <Input
                          value={newAssignment.phaseTag}
                          onChange={(e) => setNewAssignment({ ...newAssignment, phaseTag: e.target.value })}
                          placeholder="e.g., Focus Group Day 1"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-black/60 mb-2 block">Order*</label>
                        <Input
                          type="number"
                          value={newAssignment.order}
                          onChange={(e) => setNewAssignment({ ...newAssignment, order: parseInt(e.target.value) })}
                          placeholder="Display order"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-black/60 mb-2 block">Google Doc/Form URL</label>
                      <Input
                        value={newAssignment.googleDocUrl}
                        onChange={(e) => setNewAssignment({ ...newAssignment, googleDocUrl: e.target.value })}
                        placeholder="https://docs.google.com/..."
                      />
                    </div>

                    <Button type="submit" className="bg-black hover:bg-black/80">
                      Create Assignment
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <Card key={assignment.id} className="border-black/10">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {assignment.phaseTag && <Badge variant="outline">{assignment.phaseTag}</Badge>}
                            <span className="text-xs text-black/50">{assignment.timeEstimate}</span>
                          </div>
                          <h3 className="font-medium mb-2">{assignment.title}</h3>
                          {assignment.description && <p className="text-sm text-black/60">{assignment.description}</p>}
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm('Delete this assignment?')) {
                              deleteAssignmentMutation.mutate(assignment.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <div className="space-y-4">
                <p className="text-sm text-black/60">Total Users: {users.length}</p>
                {users.map((u) => (
                  <Card key={u.id} className="border-black/10">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{u.full_name || 'No name set'}</p>
                          <p className="text-sm text-black/60">{u.email}</p>
                        </div>
                        <Badge>{u.role}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Submissions Tab */}
            <TabsContent value="submissions">
              <div className="space-y-4">
                <p className="text-sm text-black/60">Total Submissions: {submissions.length}</p>
                {submissions.map((sub) => (
                  <Card key={sub.id} className="border-black/10">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium">{sub.assignmentName}</p>
                          <p className="text-xs text-black/40">by {sub.userEmail}</p>
                        </div>
                        <span className="text-xs text-black/40">
                          {new Date(sub.created_date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-black/60 mb-2">{sub.response}</p>
                      {sub.fileUrl && (
                        <Button size="sm" variant="outline" onClick={() => window.open(sub.fileUrl, '_blank')}>
                          View Attachment
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Survey Results Tab */}
            <TabsContent value="surveys">
              <div className="mb-8">
                <SurveyCreator />
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-black/60">Total Responses: {surveyResponses.length}</p>
                {surveyResponses.map((response) => (
                  <Card key={response.id} className="border-black/10">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-sm font-medium">{response.userEmail}</p>
                        <span className="text-xs text-black/40">
                          {new Date(response.created_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-black/60">
                        <pre className="whitespace-pre-wrap">{JSON.stringify(response.responses, null, 2)}</pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}