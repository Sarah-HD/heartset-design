import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Calendar, Clock, PlayCircle, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

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

  // Show loading state briefly
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

  // If user is logged in, show dashboard
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
                This portal supports structured execution. Complete what is assigned, when it is assigned.
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
                      Current Phase
                    </h2>
                    <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded">
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                      <span className="text-lg font-medium">Focus Group</span>
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
                          <p className="font-medium">Office Hours Window</p>
                          <p className="text-black/60">Tue–Thu</p>
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
                    Rules of Engagement
                  </h2>
                  <ul className="space-y-3">
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