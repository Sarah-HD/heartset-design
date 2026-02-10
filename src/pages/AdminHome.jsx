import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { CheckSquare, Users, TrendingUp, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AdminHome() {
  const [user, setUser] = useState(null);
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Review Week One Submissions", done: false },
    { id: 2, text: "Send Sprint Welcome Emails", done: false },
    { id: 3, text: "Approve Pro Bono Clients", done: false },
    { id: 4, text: "Review Dashboard", done: false },
  ]);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        if (currentUser.role !== 'admin') {
          window.location.href = '/';
          return;
        }
        setUser(currentUser);
      } catch (error) {
        window.location.href = '/';
      }
    };
    loadUser();
  }, []);

  const { data: tierAssignments = [] } = useQuery({
    queryKey: ['tier-assignments'],
    queryFn: () => base44.entities.TierAssignment.list(),
    enabled: !!user,
  });

  const { data: sprintOnboardings = [] } = useQuery({
    queryKey: ['sprint-onboardings'],
    queryFn: () => base44.entities.SprintOnboarding.list(),
    enabled: !!user,
  });

  const { data: advisoryApplications = [] } = useQuery({
    queryKey: ['advisory-applications'],
    queryFn: () => base44.entities.AdvisoryApplication.list(),
    enabled: !!user,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ['submissions'],
    queryFn: () => base44.entities.HomeworkSubmission.list(),
    enabled: !!user,
  });

  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

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
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5" />
                  Today's Admin Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <Checkbox
                        checked={item.done}
                        onCheckedChange={() => toggleChecklist(item.id)}
                      />
                      <label 
                        className={`text-sm cursor-pointer ${item.done ? 'line-through text-black/40' : 'text-black/70'}`}
                        onClick={() => toggleChecklist(item.id)}
                      >
                        {item.text}
                      </label>
                    </div>
                  ))}
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