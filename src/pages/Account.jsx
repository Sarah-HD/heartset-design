import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { User, LogOut, CheckCircle2 } from "lucide-react";

export default function Account() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ full_name: "" });

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        setFormData({ full_name: currentUser.full_name || "" });
      } catch (error) {
        window.location.href = '/';
      }
    };
    loadUser();
  }, []);

  const updateMutation = useMutation({
    mutationFn: (data) => base44.auth.updateMe(data),
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      setEditing(false);
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateMutation.mutateAsync(formData);
  };

  const { data: submissions = [] } = useQuery({
    queryKey: ['submissions', user?.email],
    queryFn: () => base44.entities.HomeworkSubmission.filter({ userEmail: user?.email }),
    enabled: !!user,
  });

  const handleLogout = () => {
    base44.auth.logout();
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
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Account
            </h1>
            <p className="text-lg text-black/60 font-light">
              Manage your profile and settings
            </p>
          </motion.div>

          <Card className="border-black/10 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Program Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-black/40 mb-1 block">Current Phase</label>
                  <Badge className="bg-black text-white">Focus Group</Badge>
                </div>
                
                <div>
                  <label className="text-sm text-black/40 mb-1 block">Assignments Completed</label>
                  <p className="text-2xl font-medium">{submissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black/10 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Past Completions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submissions.length === 0 ? (
                <p className="text-sm text-black/40">No completed assignments yet.</p>
              ) : (
                <div className="space-y-2">
                  {submissions.slice(0, 5).map((sub) => (
                    <div key={sub.id} className="flex justify-between items-center text-sm">
                      <span className="text-black/70">{sub.assignmentName}</span>
                      <span className="text-xs text-black/40">
                        {new Date(sub.created_date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-black/10 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="text-sm text-black/60 mb-2 block">Full Name</label>
                    <Input
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="bg-black hover:bg-black/80">
                      Save Changes
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setEditing(false);
                        setFormData({ full_name: user.full_name || "" });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-black/40 mb-1 block">Full Name</label>
                    <p className="text-base">{user.full_name || "Not set"}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-black/40 mb-1 block">Email</label>
                    <p className="text-base">{user.email}</p>
                  </div>

                  <div>
                    <label className="text-sm text-black/40 mb-1 block">Role</label>
                    <p className="text-base capitalize">{user.role}</p>
                  </div>

                  <Button 
                    onClick={() => setEditing(true)}
                    variant="outline"
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-black/10">
            <CardContent className="p-6">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}