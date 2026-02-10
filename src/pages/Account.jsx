import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { User, LogOut } from "lucide-react";

export default function Account() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    linkedin_url: "",
    website_url: ""
  });

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        setFormData({
          full_name: currentUser.full_name || "",
          linkedin_url: currentUser.linkedin_url || "",
          website_url: currentUser.website_url || ""
        });
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

                  <div>
                    <label className="text-sm text-black/60 mb-2 block">LinkedIn URL (Optional)</label>
                    <Input
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-black/60 mb-2 block">Website URL (Optional)</label>
                    <Input
                      value={formData.website_url}
                      onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                      placeholder="https://yourwebsite.com"
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
                        setFormData({
                          full_name: user.full_name || "",
                          linkedin_url: user.linkedin_url || "",
                          website_url: user.website_url || ""
                        });
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

                  {user.linkedin_url && (
                    <div>
                      <label className="text-sm text-black/40 mb-1 block">LinkedIn</label>
                      <a 
                        href={user.linkedin_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-base text-black hover:underline"
                      >
                        {user.linkedin_url}
                      </a>
                    </div>
                  )}

                  {user.website_url && (
                    <div>
                      <label className="text-sm text-black/40 mb-1 block">Website</label>
                      <a 
                        href={user.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-base text-black hover:underline"
                      >
                        {user.website_url}
                      </a>
                    </div>
                  )}

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