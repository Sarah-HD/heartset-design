import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users, FileText, ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AdminTierManagement() {
  const [user, setUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("user");
  const [newAssignment, setNewAssignment] = useState({
    userEmail: "",
    tier: "sprint_6500",
    isProBono: false,
    isBypass: false,
    adminNotes: ""
  });
  const [testEmail, setTestEmail] = useState("");
  const [showTestForm, setShowTestForm] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
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
    queryKey: ['tierAssignments'],
    queryFn: () => base44.entities.TierAssignment.list('-created_date'),
    enabled: !!user,
  });

  const { data: sprintOnboardings = [] } = useQuery({
    queryKey: ['sprintOnboardings'],
    queryFn: () => base44.entities.SprintOnboarding.list('-created_date'),
    enabled: !!user,
  });

  const { data: advisoryApplications = [] } = useQuery({
    queryKey: ['advisoryApplications'],
    queryFn: () => base44.entities.AdvisoryApplication.list('-created_date'),
    enabled: !!user,
  });

  const { data: advisoryOnboardings = [] } = useQuery({
    queryKey: ['advisoryOnboardings'],
    queryFn: () => base44.entities.AdvisoryOnboarding.list('-created_date'),
    enabled: !!user,
  });

  const { data: infrastructureOnboardings = [] } = useQuery({
    queryKey: ['infrastructureOnboardings'],
    queryFn: () => base44.entities.InfrastructureOnboarding.list('-created_date'),
    enabled: !!user,
  });

  const { data: legalDocuments = [] } = useQuery({
    queryKey: ['legalDocuments'],
    queryFn: () => base44.entities.LegalDocument.list('-created_date'),
    enabled: !!user,
  });

  const { data: directEntryRequests = [] } = useQuery({
    queryKey: ['directEntryRequests'],
    queryFn: () => base44.entities.DirectEntryRequest.list('-created_date'),
    enabled: !!user,
  });

  const { data: allUsers = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: () => base44.entities.User.list('-created_date'),
    enabled: !!user,
  });

  const addAssignmentMutation = useMutation({
    mutationFn: (data) => base44.entities.TierAssignment.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tierAssignments'] });
      setShowAddForm(false);
      setNewAssignment({
        userEmail: "",
        tier: "sprint_6500",
        isProBono: false,
        isBypass: false,
        adminNotes: ""
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.TierAssignment.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tierAssignments'] });
    },
  });

  const updateApplicationMutation = useMutation({
    mutationFn: ({ id, status, adminReviewNotes }) => 
      base44.entities.AdvisoryApplication.update(id, { status, adminReviewNotes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advisoryApplications'] });
    },
  });

  const inviteUserMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      await base44.users.inviteUser(email, role);
    },
    onSuccess: () => {
      setShowInviteForm(false);
      setInviteEmail("");
      setInviteRole("user");
      alert("Invitation sent! User will receive an email to set their password.");
    },
  });

  const sendSOWMutation = useMutation({
    mutationFn: async ({ userEmail, tierAssignmentId }) => {
      const response = await base44.functions.invoke('generateAndSendSOW', {
        userEmail,
        tierAssignmentId,
        documentType: 'scope_of_work'
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legalDocuments'] });
      alert('Scope of Work generated and sent for signature!');
    },
    onError: (error) => {
      alert('Failed to send SOW: ' + error.message);
    }
  });

  const sendTestEmailsMutation = useMutation({
    mutationFn: async ({ testEmail }) => {
      const response = await base44.functions.invoke('sendTestEmailSequence', { testEmail });
      return response.data;
    },
    onSuccess: () => {
      alert('All 5 test emails sent successfully!');
      setShowTestForm(false);
      setTestEmail("");
    },
    onError: (error) => {
      alert('Failed to send test emails: ' + error.message);
    }
  });

  const updateDirectEntryMutation = useMutation({
    mutationFn: ({ id, status, adminNotes }) => 
      base44.entities.DirectEntryRequest.update(id, { status, adminNotes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directEntryRequests'] });
    },
  });

  const handleAddAssignment = (e) => {
    e.preventDefault();
    addAssignmentMutation.mutate(newAssignment);
  };

  const handleInviteUser = (e) => {
    e.preventDefault();
    inviteUserMutation.mutate({ email: inviteEmail, role: inviteRole });
  };

  const getTierBadge = (tier) => {
    const colors = {
      sprint_6500: "bg-blue-100 text-blue-800",
      advisory_10000: "bg-purple-100 text-purple-800",
      infrastructure_25000: "bg-green-100 text-green-800"
    };
    const labels = {
      sprint_6500: "$6,500 Sprint",
      advisory_10000: "$10,000 Advisory",
      infrastructure_25000: "$25,000 Infrastructure"
    };
    return <Badge className={colors[tier]}>{labels[tier]}</Badge>;
  };

  const getStatusBadge = (status) => {
    const colors = {
      assigned: "bg-yellow-100 text-yellow-800",
      onboarding_complete: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      submitted: "bg-gray-100 text-gray-800",
      under_review: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      declined: "bg-red-100 text-red-800"
    };
    return <Badge className={colors[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>;
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
        <div className="max-w-7xl mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Dashboard
          </Link>
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tier Management
            </h1>
            <div className="flex gap-2">
              <Button onClick={() => setShowTestForm(!showTestForm)} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Mail className="w-4 h-4 mr-2" />
                Test Emails
              </Button>
              <Button onClick={() => setShowInviteForm(!showInviteForm)} variant="outline" className="border-black">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite User
              </Button>
              <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-black hover:bg-black/80">
                <UserPlus className="w-4 h-4 mr-2" />
                Assign to Tier
              </Button>
            </div>
          </div>

          {showTestForm && (
            <Card className="mb-8 border-green-600 border-2">
              <CardHeader>
                <CardTitle>Test Email Sequence</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); sendTestEmailsMutation.mutate({ testEmail }); }} className="space-y-4">
                  <div>
                    <Label>Test Email Address</Label>
                    <Input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="mt-2"
                    />
                    <p className="text-xs text-black/60 mt-2">
                      This will send all 5 automated emails to the specified address for testing purposes.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={sendTestEmailsMutation.isPending}>
                      {sendTestEmailsMutation.isPending ? "Sending..." : "Send All Test Emails"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowTestForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {showInviteForm && (
            <Card className="mb-8 border-black/20 border-2">
              <CardHeader>
                <CardTitle>Invite User (Send Password Setup Email)</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInviteUser} className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="user@example.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Role</Label>
                    <Select 
                      value={inviteRole}
                      onValueChange={(val) => setInviteRole(val)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <p className="text-sm text-black/60">
                    User will receive an automated email to set their password. After login, manually assign them to a tier below.
                  </p>

                  <div className="flex gap-2">
                    <Button type="submit" className="bg-black hover:bg-black/80" disabled={inviteUserMutation.isPending}>
                      {inviteUserMutation.isPending ? "Sending..." : "Send Invitation"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowInviteForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {showAddForm && (
            <Card className="mb-8 border-black/20 border-2">
              <CardHeader>
                <CardTitle>Assign User to Tier</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAssignment} className="space-y-4">
                  <div>
                    <Label>User Email</Label>
                    <Input
                      type="email"
                      value={newAssignment.userEmail}
                      onChange={(e) => setNewAssignment(prev => ({ ...prev, userEmail: e.target.value }))}
                      placeholder="user@example.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Tier</Label>
                    <Select 
                      value={newAssignment.tier}
                      onValueChange={(val) => setNewAssignment(prev => ({ ...prev, tier: val }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sprint_6500">$6,500 Sprint</SelectItem>
                        <SelectItem value="advisory_10000">$10,000 Advisory</SelectItem>
                        <SelectItem value="infrastructure_25000">$25,000 Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={newAssignment.isProBono}
                        onCheckedChange={(checked) => setNewAssignment(prev => ({ ...prev, isProBono: checked }))}
                        id="proBono"
                      />
                      <Label htmlFor="proBono">Pro Bono</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={newAssignment.isBypass}
                        onCheckedChange={(checked) => setNewAssignment(prev => ({ ...prev, isBypass: checked }))}
                        id="bypass"
                      />
                      <Label htmlFor="bypass">Bypass Application</Label>
                    </div>
                  </div>

                  <div>
                    <Label>Admin Notes</Label>
                    <Textarea
                      value={newAssignment.adminNotes}
                      onChange={(e) => setNewAssignment(prev => ({ ...prev, adminNotes: e.target.value }))}
                      placeholder="Optional notes about this assignment"
                      className="mt-2"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="bg-black hover:bg-black/80">
                      Add Assignment
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="assignments" className="space-y-6">
            <TabsList>
              <TabsTrigger value="assignments">
                <Users className="w-4 h-4 mr-2" />
                Tier Assignments
              </TabsTrigger>
              <TabsTrigger value="directEntry">
                <FileText className="w-4 h-4 mr-2" />
                Direct Entry Requests
              </TabsTrigger>
              <TabsTrigger value="applications">
                <FileText className="w-4 h-4 mr-2" />
                Advisory Applications
              </TabsTrigger>
              <TabsTrigger value="onboardings">
                <FileText className="w-4 h-4 mr-2" />
                Onboardings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assignments" className="space-y-4">
              {tierAssignments.length === 0 ? (
                <p className="text-black/40 text-center py-12">No tier assignments yet.</p>
              ) : (
                tierAssignments.map((assignment) => {
                  const linkedOnboarding = sprintOnboardings.find(o => o.userEmail === assignment.userEmail);
                  const effectiveSolution = linkedOnboarding?.adminOverride !== 'none' 
                    ? linkedOnboarding?.adminOverride 
                    : linkedOnboarding?.recommendedSolution;
                  
                  return (
                    <Card key={assignment.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-medium">{assignment.userEmail}</h3>
                              {getTierBadge(assignment.tier)}
                              {getStatusBadge(assignment.status)}
                              {assignment.isProBono && <Badge variant="outline">Pro Bono</Badge>}
                              {assignment.isBypass && <Badge variant="outline">Bypass</Badge>}
                            </div>
                            {effectiveSolution && (
                              <div className="mb-2">
                                <Badge variant="outline" className="text-xs">
                                  Recommended: {effectiveSolution.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              </div>
                            )}
                            {assignment.adminNotes && (
                              <p className="text-sm text-black/60 mb-3">{assignment.adminNotes}</p>
                            )}
                            <p className="text-xs text-black/40">
                              Created: {new Date(assignment.created_date).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => sendSOWMutation.mutate({ 
                                userEmail: assignment.userEmail,
                                tierAssignmentId: assignment.id
                              })}
                              disabled={sendSOWMutation.isPending}
                              className="bg-black hover:bg-black/80"
                            >
                              {sendSOWMutation.isPending ? 'Sending...' : 'Send SOW'}
                            </Button>
                            {assignment.status !== 'active' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStatusMutation.mutate({ 
                                  id: assignment.id, 
                                  status: assignment.status === 'assigned' ? 'onboarding_complete' : 'active' 
                                })}
                              >
                                Mark as {assignment.status === 'assigned' ? 'Complete' : 'Active'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </TabsContent>

            <TabsContent value="directEntry" className="space-y-4">
              {directEntryRequests.length === 0 ? (
                <p className="text-black/40 text-center py-12">No direct entry requests yet.</p>
              ) : (
                directEntryRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium mb-2">{request.fullName}</h3>
                          <p className="text-sm text-black/60 mb-2">{request.userEmail}</p>
                          {getStatusBadge(request.status)}
                        </div>
                        <div className="flex gap-2">
                          {request.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateDirectEntryMutation.mutate({ 
                                  id: request.id, 
                                  status: 'approved',
                                  adminNotes: 'Approved for direct entry'
                                })}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateDirectEntryMutation.mutate({ 
                                  id: request.id, 
                                  status: 'routed_to_focus_group',
                                  adminNotes: 'Routed to Focus Group'
                                })}
                              >
                                Route to FG
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateDirectEntryMutation.mutate({ 
                                  id: request.id, 
                                  status: 'declined',
                                  adminNotes: 'Declined'
                                })}
                              >
                                Decline
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="space-y-3 text-sm">
                        {request.linkedinUrl && (
                          <div>
                            <p className="font-medium text-black/60">LinkedIn/Website:</p>
                            <a href={request.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                              {request.linkedinUrl}
                            </a>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-black/60">Highest Price Point:</p>
                          <p className="text-black/80">${request.highestPrice?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-black/60">Method/Offer Description:</p>
                          <p className="text-black/80">{request.methodDescription}</p>
                        </div>
                        {request.adminNotes && (
                          <div>
                            <p className="font-medium text-black/60">Admin Notes:</p>
                            <p className="text-black/80">{request.adminNotes}</p>
                          </div>
                        )}
                        <p className="text-xs text-black/40">
                          Submitted: {new Date(request.created_date).toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              {advisoryApplications.length === 0 ? (
                <p className="text-black/40 text-center py-12">No applications yet.</p>
              ) : (
                advisoryApplications.map((app) => (
                  <Card key={app.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium mb-2">{app.userEmail}</h3>
                          {getStatusBadge(app.status)}
                        </div>
                        <div className="flex gap-2">
                          {app.status === 'submitted' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateApplicationMutation.mutate({ 
                                  id: app.id, 
                                  status: 'accepted',
                                  adminReviewNotes: 'Accepted'
                                })}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateApplicationMutation.mutate({ 
                                  id: app.id, 
                                  status: 'declined',
                                  adminReviewNotes: 'Declined'
                                })}
                              >
                                Decline
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-medium text-black/60">Application Reason:</p>
                          <p className="text-black/80">{app.applicationReason}</p>
                        </div>
                        {app.priorRevenue && (
                          <div>
                            <p className="font-medium text-black/60">Prior Revenue:</p>
                            <p className="text-black/80">{app.priorRevenue}</p>
                          </div>
                        )}
                        {app.existingFrameworks && (
                          <div>
                            <p className="font-medium text-black/60">Existing Frameworks:</p>
                            <p className="text-black/80">{app.existingFrameworks}</p>
                          </div>
                        )}
                        <p className="text-xs text-black/40">
                          Submitted: {new Date(app.created_date).toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="onboardings" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Sprint Onboardings ({sprintOnboardings.length})
                  </h3>
                  {sprintOnboardings.length === 0 ? (
                    <p className="text-black/40">No sprint onboardings yet.</p>
                  ) : (
                    <div className="grid gap-4">
                      {sprintOnboardings.map((onboarding) => (
                        <Card key={onboarding.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{onboarding.userEmail}</p>
                                <p className="text-sm text-black/60">Method: {onboarding.methodName || 'Not specified'}</p>
                                <p className="text-xs text-black/40 mt-1">
                                  {new Date(onboarding.created_date).toLocaleString()}
                                </p>
                              </div>
                              <Badge className="bg-blue-100 text-blue-800">$6,500 Sprint</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Advisory Onboardings ({advisoryOnboardings.length})
                  </h3>
                  {advisoryOnboardings.length === 0 ? (
                    <p className="text-black/40">No advisory onboardings yet.</p>
                  ) : (
                    <div className="grid gap-4">
                      {advisoryOnboardings.map((onboarding) => (
                        <Card key={onboarding.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{onboarding.userEmail}</p>
                                <p className="text-xs text-black/40 mt-1">
                                  {new Date(onboarding.created_date).toLocaleString()}
                                </p>
                              </div>
                              <Badge className="bg-purple-100 text-purple-800">$10,000 Advisory</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Infrastructure Onboardings ({infrastructureOnboardings.length})
                  </h3>
                  {infrastructureOnboardings.length === 0 ? (
                    <p className="text-black/40">No infrastructure onboardings yet.</p>
                  ) : (
                    <div className="grid gap-4">
                      {infrastructureOnboardings.map((onboarding) => (
                        <Card key={onboarding.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{onboarding.userEmail}</p>
                                <p className="text-xs text-black/40 mt-1">
                                  {new Date(onboarding.created_date).toLocaleString()}
                                </p>
                              </div>
                              <Badge className="bg-green-100 text-green-800">$25,000 Infrastructure</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}