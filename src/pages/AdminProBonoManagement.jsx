import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, UserPlus, FileText, Unlock, MessageSquare, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminProBonoManagement() {
  const [user, setUser] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        if (currentUser?.role !== 'admin') {
          navigate('/');
          return;
        }
        setUser(currentUser);
      } catch (error) {
        navigate('/');
      }
    };
    loadUser();
  }, [navigate]);

  const { data: proBonoAssignments = [], isLoading } = useQuery({
    queryKey: ['proBonoAssignments'],
    queryFn: async () => {
      const assignments = await base44.entities.TierAssignment.filter({ isProBono: true });
      return assignments;
    },
    enabled: !!user,
  });

  const onboardUserMutation = useMutation({
    mutationFn: async ({ email, name }) => {
      const response = await base44.functions.invoke('onboardProBonoUser', {
        userEmail: email,
        userName: name
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proBonoAssignments'] });
      setNewUserEmail("");
      setNewUserName("");
      alert('User onboarded successfully');
    },
    onError: (error) => {
      alert('Error onboarding user: ' + error.message);
    }
  });

  const sendAgreementMutation = useMutation({
    mutationFn: async ({ email }) => {
      const response = await base44.functions.invoke('sendProBonoAgreement', {
        userEmail: email
      });
      return response.data;
    },
    onSuccess: () => {
      alert('Pro bono agreement sent successfully');
    },
    onError: (error) => {
      alert('Error sending agreement: ' + error.message);
    }
  });

  const sendEmailMutation = useMutation({
    mutationFn: async ({ functionName, email, name, extraData }) => {
      const response = await base44.functions.invoke(functionName, {
        userEmail: email,
        userName: name,
        ...extraData
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      alert(`Email sent successfully`);
    },
    onError: (error) => {
      alert('Error sending email: ' + error.message);
    }
  });

  const handleOnboardUser = () => {
    if (!newUserEmail || !newUserName) {
      alert('Please provide both email and name');
      return;
    }
    onboardUserMutation.mutate({ email: newUserEmail, name: newUserName });
  };

  const getUserByEmail = async (email) => {
    const users = await base44.entities.User.filter({ email });
    return users.length > 0 ? users[0] : null;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 
            className="text-4xl mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Pro Bono Pilot Management
          </h1>

          {/* Add New Pro Bono User */}
          <Card className="mb-8 border-black/10">
            <CardHeader>
              <CardTitle>Add New Pro Bono Participant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <Input
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Sarah Johnson"
                    className="border-black/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="border-black/20"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleOnboardUser}
                  disabled={onboardUserMutation.isPending}
                  className="bg-black text-white hover:bg-black/90"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {onboardUserMutation.isPending ? 'Processing...' : 'Onboard User'}
                </Button>
                <Button
                  onClick={() => sendAgreementMutation.mutate({ email: newUserEmail })}
                  disabled={!newUserEmail || sendAgreementMutation.isPending}
                  variant="outline"
                  className="border-black/20"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Send Agreement Only
                </Button>
              </div>
              <p className="text-xs text-black/50">
                Step 1: Send Agreement → Step 2: Once signed, Onboard User → Step 3: Send emails as needed
              </p>
            </CardContent>
          </Card>

          {/* Existing Pro Bono Participants */}
          <div className="space-y-4">
            <h2 className="text-2xl font-medium mb-4">Current Pro Bono Participants</h2>
            
            {isLoading ? (
              <p className="text-black/40">Loading participants...</p>
            ) : proBonoAssignments.length === 0 ? (
              <p className="text-black/40">No pro bono participants yet.</p>
            ) : (
              proBonoAssignments.map((assignment) => (
                <Card key={assignment.id} className="border-black/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{assignment.userEmail}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{assignment.tier}</Badge>
                          <Badge className="bg-blue-100 text-blue-800">Pro Bono</Badge>
                          <Badge variant="outline">{assignment.status}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {assignment.adminNotes && (
                      <p className="text-sm text-black/60 bg-neutral-50 p-3 border border-black/10">
                        {assignment.adminNotes}
                      </p>
                    )}
                    
                    <div className="border-t border-black/10 pt-4">
                      <p className="text-sm font-medium mb-3">Email Sequence:</p>
                      <div className="grid md:grid-cols-3 gap-2">
                        <Button
                          onClick={async () => {
                            const userData = await getUserByEmail(assignment.userEmail);
                            sendEmailMutation.mutate({
                              functionName: 'sendPilotAcceptanceEmail',
                              email: assignment.userEmail,
                              name: userData?.full_name || assignment.userEmail,
                              extraData: { agreementLink: 'https://your-app.base44.com/agreement' }
                            });
                          }}
                          disabled={sendEmailMutation.isPending}
                          variant="outline"
                          size="sm"
                          className="border-black/20"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          1. Acceptance
                        </Button>
                        
                        <Button
                          onClick={async () => {
                            const userData = await getUserByEmail(assignment.userEmail);
                            sendEmailMutation.mutate({
                              functionName: 'sendPilotPlatformAccessEmail',
                              email: assignment.userEmail,
                              name: userData?.full_name || assignment.userEmail,
                              extraData: { loginLink: 'https://your-app.base44.com' }
                            });
                          }}
                          disabled={sendEmailMutation.isPending}
                          variant="outline"
                          size="sm"
                          className="border-black/20"
                        >
                          <Unlock className="w-4 h-4 mr-2" />
                          2. Access
                        </Button>
                        
                        <Button
                          onClick={async () => {
                            const userData = await getUserByEmail(assignment.userEmail);
                            sendEmailMutation.mutate({
                              functionName: 'sendPilotWeek1UnlockEmail',
                              email: assignment.userEmail,
                              name: userData?.full_name || assignment.userEmail
                            });
                          }}
                          disabled={sendEmailMutation.isPending}
                          variant="outline"
                          size="sm"
                          className="border-black/20"
                        >
                          <Unlock className="w-4 h-4 mr-2" />
                          3. Week 1
                        </Button>
                        
                        <Button
                          onClick={async () => {
                            const userData = await getUserByEmail(assignment.userEmail);
                            sendEmailMutation.mutate({
                              functionName: 'sendPilotCheckInEmail',
                              email: assignment.userEmail,
                              name: userData?.full_name || assignment.userEmail
                            });
                          }}
                          disabled={sendEmailMutation.isPending}
                          variant="outline"
                          size="sm"
                          className="border-black/20"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          4. Check-In
                        </Button>
                        
                        <Button
                          onClick={async () => {
                            const userData = await getUserByEmail(assignment.userEmail);
                            sendEmailMutation.mutate({
                              functionName: 'sendPilotFeedbackEmail',
                              email: assignment.userEmail,
                              name: userData?.full_name || assignment.userEmail
                            });
                          }}
                          disabled={sendEmailMutation.isPending}
                          variant="outline"
                          size="sm"
                          className="border-black/20"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          5. Feedback
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}