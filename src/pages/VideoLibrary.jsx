import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function VideoLibrary() {
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: () => base44.entities.Video.list('-created_date'),
  });

  const sections = [
    { name: "Orientation", videos: [] },
    { name: "Framework Design", videos: [] },
    { name: "Validation & Pilots", videos: [] },
    { name: "System Installation", videos: [] },
    { name: "Readiness & Scale", videos: [] }
  ];

  // Group videos by section based on title prefix or just show all for now
  const allVideos = videos;

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Authority Infrastructure™
            </h1>
            <p className="text-xl text-black/60 font-light">Video Library</p>
          </motion.div>

          {isLoading ? (
            <p className="text-black/40">Loading videos...</p>
          ) : allVideos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-black/40">No videos available yet.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {sections.map((section, idx) => {
                const sectionVideos = allVideos; // For now, show all videos in each section
                
                return (
                  <motion.div
                    key={section.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <h2 
                      className="text-2xl md:text-3xl mb-8 pb-4 border-b border-black/10"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {section.name}
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sectionVideos.map((video) => (
                        <Card key={video.id} className="border-black/10 hover:border-black/20 transition-all group">
                          <CardContent className="p-0">
                            <div className="aspect-video bg-black/5 relative overflow-hidden">
                              {video.thumbnailUrl ? (
                                <img 
                                  src={video.thumbnailUrl} 
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Play className="w-12 h-12 text-black/20" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <Button
                                  onClick={() => window.open(video.fileUrl, '_blank')}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black hover:bg-white/90"
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Watch
                                </Button>
                              </div>
                            </div>
                            
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-3">
                                {video.phaseTag && (
                                  <Badge variant="outline" className="text-xs">
                                    {video.phaseTag}
                                  </Badge>
                                )}
                                {video.duration && (
                                  <div className="flex items-center gap-1 text-xs text-black/50">
                                    <Clock className="w-3 h-3" />
                                    <span>{video.duration}</span>
                                  </div>
                                )}
                              </div>
                              <h3 className="font-medium mb-2 line-clamp-2">{video.title}</h3>
                              {video.description && (
                                <p className="text-sm text-black/50 line-clamp-2 mb-4">
                                  {video.description}
                                </p>
                              )}
                              <Link
                                to={createPageUrl("Assignments")}
                                className="inline-flex items-center gap-2 text-xs font-medium bg-black text-white px-4 py-2 hover:bg-black/80 transition-colors"
                              >
                                <span>Complete Assignment</span>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}