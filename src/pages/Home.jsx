import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Calendar, Clock, PlayCircle, FileText, CheckSquare, Users, TrendingUp, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AddTaskDialog from "@/components/admin/AddTaskDialog";

// Marketing sections
import HeroSection from "@/components/home/HeroSection";
import DefinitionSection from "@/components/home/DefinitionSection";
import ProblemSection from "@/components/home/ProblemSection";
import MethodSection from "@/components/home/MethodSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import OffersSection from "@/components/home/OffersSection";
import FocusGroupSection from "@/components/home/FocusGroupSection";
import ReferralSection from "@/components/home/ReferralSection";
import CredibilitySection from "@/components/home/CredibilitySection";
import Footer from "@/components/home/Footer";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const isFocusGroup = user?.cohort_type === 'focus_group' || !user?.cohort_type;
  const isSprint = user?.cohort_type === 'sprint';
  const isAdvisory = user?.cohort_type === 'advisory';
  const isAdminUser = user?.role === 'admin';

  const { data: tierAssignments = [] } = useQuery({
    queryKey: ['tier-assignments'],
    queryFn: () => base44.entities.TierAssignment.list(),
    enabled: !!isAdminUser,
  });

  const { data: sprintOnboardings = [] } = useQuery({
    queryKey: ['sprint-onboardings'],
    queryFn: () => base44.entities.SprintOnboarding.list(),
    enabled: !!isAdminUser,
  });

  const { data: advisoryApplications = [] } = useQuery({
    queryKey: ['advisory-applications'],
    queryFn: () => base44.entities.AdvisoryApplication.list(),
    enabled: !!isAdminUser,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ['submissions'],
    queryFn: () => base44.entities.HomeworkSubmission.list(),
    enabled: !!isAdminUser,
  });

  const { data: adminTasks = [] } = useQuery({
    queryKey: ['adminTasks'],
    queryFn: async () => {
      const currentUser = await base44.auth.me();
      return base44.entities.AdminTask.filter({ adminEmail: currentUser.email }, '-created_date');
    },
    enabled: !!isAdminUser,
  });

  // Real-time subscriptions for admin dashboard
  React.useEffect(() => {
    if (!isAdminUser) return;

    const unsubscribeTier = base44.entities.TierAssignment.subscribe(() => {
      queryClient.invalidateQueries({ queryKey: ['tier-assignments'] });
    });

    const unsubscribeSprint = base44.entities.SprintOnboarding.subscribe(() => {
      queryClient.invalidateQueries({ queryKey: ['sprint-onboardings'] });
    });

    const unsubscribeAdvisory = base44.entities.AdvisoryApplication.subscribe(() => {
      queryClient.invalidateQueries({ queryKey: ['advisory-applications'] });
    });

    const unsubscribeSubmissions = base44.entities.HomeworkSubmission.subscribe(() => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    });

    const unsubscribeTasks = base44.entities.AdminTask.subscribe(() => {
      queryClient.invalidateQueries({ queryKey: ['adminTasks'] });
    });

    return () => {
      unsubscribeTier();
      unsubscribeSprint();
      unsubscribeAdvisory();
      unsubscribeSubmissions();
      unsubscribeTasks();
    };
  }, [isAdminUser, queryClient]);

  const toggleTask = async (taskId, currentDone) => {
    try {
      await base44.entities.AdminTask.update(taskId, { done: !currentDone });
      queryClient.invalidateQueries({ queryKey: ['adminTasks'] });
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!confirm('Delete this task?')) return;
    try {
      await base44.entities.AdminTask.delete(taskId);
      queryClient.invalidateQueries({ queryKey: ['adminTasks'] });
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Show loading state briefly
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

  // If user is admin, show Admin Command Center
  if (isAdminUser) {
    const pendingOnboardings = tierAssignments.filter(t => t.status === 'assigned').length;
    const pendingSubmissions = submissions.length;
    const pendingApplications = advisoryApplications.filter(a => a.status === 'submitted').length;
    const proBonoNotActivated = tierAssignments.filter(t => t.isProBono && t.status === 'assigned').length;

    const sprintActive = tierAssignments.filter(t => t.tier === 'sprint_6500').length;
    const advisoryActive = tierAssignments.filter(t => t.tier === 'advisory_10000' || t.tier === 'infrastructure_25000').length;
    const focusGroupCompleted = sprintOnboardings.length;

    return (
      <div className="min-h-screen bg-white">
        <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 
                className="text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Admin Command Center
              </h1>
              <p className="text-lg text-black/60 font-light">
                Your daily operational checklist
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Block 1: Today's Admin Focus */}
              <Card className="border-black/10">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-5 h-5" />
                      Today's Admin Focus
                    </div>
                    <AddTaskDialog onTaskCreated={() => queryClient.invalidateQueries({ queryKey: ['adminTasks'] })} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {adminTasks.length === 0 ? (
                      <p className="text-sm text-black/40 text-center py-4">No tasks yet. Add your first task!</p>
                    ) : (
                      adminTasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-3 group">
                          <Checkbox
                            checked={task.done}
                            onCheckedChange={() => toggleTask(task.id, task.done)}
                          />
                          <label 
                            className={`text-sm cursor-pointer flex-1 ${task.done ? 'line-through text-black/40' : 'text-black/70'}`}
                            onClick={() => toggleTask(task.id, task.done)}
                          >
                            {task.text}
                          </label>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 text-black/40 hover:text-red-600 transition-opacity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Block 2: Action Queue */}
              <Card className="border-black/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Action Queue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black/70">Users Waiting Onboarding Completion</span>
                      <span className="text-lg font-medium">{pendingOnboardings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black/70">Homework Submissions Awaiting Review</span>
                      <span className="text-lg font-medium">{pendingSubmissions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black/70">New Applications Pending</span>
                      <span className="text-lg font-medium">{pendingApplications}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black/70">Pro Bono Users Not Yet Activated</span>
                      <span className="text-lg font-medium">{proBonoNotActivated}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black/70">Upcoming Office Hours</span>
                      <Link 
                        to={createPageUrl("OfficeHours")}
                        className="text-sm text-black hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Block 3: Are Things Moving? */}
              <Card className="border-black/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Are Things Moving?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Focus Group</h4>
                      <p className="text-sm text-black/60">Participants Completed: <span className="font-medium text-black">{focusGroupCompleted}</span></p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Sprint</h4>
                      <p className="text-sm text-black/60">Active Participants: <span className="font-medium text-black">{sprintActive}</span></p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Advisory</h4>
                      <p className="text-sm text-black/60">Active Clients: <span className="font-medium text-black">{advisoryActive}</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Block 4: Quick Navigation */}
              <Card className="border-black/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="w-5 h-5" />
                    Quick Navigation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to={createPageUrl("AdminTierManagement")}>
                      <Button variant="outline" className="w-full">Users</Button>
                    </Link>
                    <Link to={createPageUrl("AdminTierManagement")}>
                      <Button variant="outline" className="w-full">Onboarding Forms</Button>
                    </Link>
                    <Link to={createPageUrl("AdminContentManagement")}>
                      <Button variant="outline" className="w-full">Homework Portal</Button>
                    </Link>
                    <Link to={createPageUrl("AdminTierManagement")}>
                      <Button variant="outline" className="w-full">Applications</Button>
                    </Link>
                    <Link to={createPageUrl("AdminContentManagement")}>
                      <Button variant="outline" className="w-full">Content Management</Button>
                    </Link>
                    <Link to={createPageUrl("AdminTierManagement")}>
                      <Button variant="outline" className="w-full">Invite User</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is logged in, but not admin, show user dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-white">
        <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 text-center"
            >
              <h1 
                className="text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Authority Infrastructure™
              </h1>
              <p className="text-lg text-black/60 font-light max-w-3xl mx-auto">
                {isFocusGroup && "This portal hosts your Focus Group materials. Review the content and come prepared to reflect."}
                {isSprint && "This portal supports structured execution. Complete what is assigned, when it is assigned."}
                {isAdvisory && "Your custom advisory portal. Materials and next steps will be shared as we progress."}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Current Phase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-black/10 h-full">
                  <CardContent className="p-8">
                    <h2 
                      className="text-2xl mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {isFocusGroup && "Program Context"}
                      {isSprint && "Current Phase"}
                      {isAdvisory && "Engagement Type"}
                    </h2>
                    <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded">
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                      <span className="text-lg font-medium">
                        {isFocusGroup && "Focus Group Intensive"}
                        {isSprint && "28-Day Guided Sprint"}
                        {isAdvisory && "Private Advisory"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Important Dates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-black/10 h-full">
                  <CardContent className="p-8">
                    <h2 
                      className="text-2xl mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Important Dates
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-black/60 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Live Session</p>
                          <p className="text-black/60">Feb 28, 12:00 PM EST</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Clock className="w-4 h-4 text-black/60 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">
                            {isFocusGroup && "Completion Target"}
                            {isSprint && "Office Hours Window"}
                            {isAdvisory && "Next Check-In"}
                          </p>
                          <p className="text-black/60">
                            {isFocusGroup && "Before live session"}
                            {isSprint && "Tue–Thu"}
                            {isAdvisory && "TBD"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* What To Do Today */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <Card className="border-black/20 border-2">
                <CardContent className="p-8">
                  <h2 
                    className="text-3xl mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    What To Do Today
                  </h2>
                  <div className="space-y-4">
                    <Link
                      to={createPageUrl("VideoLibrary")}
                      className="flex items-center gap-4 p-4 bg-neutral-50 hover:bg-neutral-100 rounded transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0 group-hover:bg-black/20 transition-colors">
                        <PlayCircle className="w-6 h-6 text-black/60" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">Watch: Day 3 – Law of Averages</p>
                        <p className="text-sm text-black/60">12 minutes</p>
                      </div>
                    </Link>
                    
                    {isFocusGroup && (
                      <Link
                        to={createPageUrl("VideoLibrary")}
                        className="flex items-center gap-4 p-4 bg-neutral-50 hover:bg-neutral-100 rounded transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0 group-hover:bg-black/20 transition-colors">
                          <FileText className="w-6 h-6 text-black/60" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">Reflect: Offer Signal Check</p>
                          <p className="text-sm text-black/60">Optional preparation</p>
                        </div>
                      </Link>
                    )}
                    
                    {(isSprint || isAdvisory) && (
                      <Link
                        to={createPageUrl("Assignments")}
                        className="flex items-center gap-4 p-4 bg-neutral-50 hover:bg-neutral-100 rounded transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0 group-hover:bg-black/20 transition-colors">
                          <FileText className="w-6 h-6 text-black/60" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">Complete: Assignment – Offer Signal Check</p>
                          <p className="text-sm text-black/60">10 minutes</p>
                        </div>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rules of Engagement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-black/10">
                <CardContent className="p-8">
                  <h2 
                    className="text-2xl mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {isFocusGroup && "How This Session Works"}
                    {(isSprint || isAdvisory) && "Rules of Engagement"}
                  </h2>
                  <ul className="space-y-3">
                    {isFocusGroup && (
                      <>
                        <li className="flex items-start gap-3 text-black/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-2 flex-shrink-0"></span>
                          <span>Come prepared with reflections from the material</span>
                        </li>
                        <li className="flex items-start gap-3 text-black/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-2 flex-shrink-0"></span>
                          <span>This is not a brainstorming session</span>
                        </li>
                        <li className="flex items-start gap-3 text-black/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-2 flex-shrink-0"></span>
                          <span>Questions should relate to clarity, not customization</span>
                        </li>
                        <li className="flex items-start gap-3 text-black/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-2 flex-shrink-0"></span>
                          <span>Coaching support begins in the full program</span>
                        </li>
                      </>
                    )}
                    {(isSprint || isAdvisory) && (
                      <>
                        <li className="flex items-start gap-3 text-black/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-2 flex-shrink-0"></span>
                          <span>No brainstorming during sessions</span>
                        </li>
                        <li className="flex items-start gap-3 text-black/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-2 flex-shrink-0"></span>
                          <span>Office hours require completed assignments</span>
                        </li>
                        <li className="flex items-start gap-3 text-black/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-2 flex-shrink-0"></span>
                          <span>No DM coaching</span>
                        </li>
                        <li className="flex items-start gap-3 text-black/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-2 flex-shrink-0"></span>
                          <span>This is execution, not ideation</span>
                        </li>
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, show marketing site
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <HeroSection />
      <DefinitionSection />
      <ProblemSection />
      <MethodSection />
      <CaseStudiesSection />
      <OffersSection />
      <FocusGroupSection />
      <ReferralSection />
      <CredibilitySection />
      <Footer />
    </div>
  );
}