import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Trash2, Video as VideoIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoAdmin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: "", description: "", file: null, thumbnail: null });
  
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

  const { data: videos = [], isLoading: videosLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: () => base44.entities.Video.list('-created_date'),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Video.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });

  const handleUpload = async (e) => {
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
        fileUrl: videoUrl,
        thumbnailUrl,
      });

      queryClient.invalidateQueries({ queryKey: ['videos'] });
      setNewVideo({ title: "", description: "", file: null, thumbnail: null });
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 
            className="text-4xl md:text-5xl mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Video Library
          </h1>
          <p className="text-black/50 text-sm">Manage your digital products and video content</p>
        </div>

        {/* Upload Form */}
        <Card className="mb-12 border-black/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload New Video
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-sm text-black/60 mb-2 block">Title*</label>
                <Input
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  placeholder="Enter video title"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm text-black/60 mb-2 block">Description</label>
                <Textarea
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  placeholder="Enter video description"
                  className="h-24"
                />
              </div>

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
                <label className="text-sm text-black/60 mb-2 block">Thumbnail (Optional)</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.files[0] })}
                />
              </div>

              <Button 
                type="submit" 
                disabled={uploading || !newVideo.title || !newVideo.file}
                className="w-full bg-black hover:bg-black/80"
              >
                {uploading ? 'Uploading...' : 'Upload Video'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Videos List */}
        <div>
          <h2 className="text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Uploaded Videos ({videos.length})
          </h2>
          
          {videosLoading ? (
            <p className="text-black/40">Loading videos...</p>
          ) : videos.length === 0 ? (
            <p className="text-black/40">No videos uploaded yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group"
                >
                  <Card className="border-black/10 hover:border-black/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-black/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                        ) : (
                          <VideoIcon className="w-12 h-12 text-black/20" />
                        )}
                      </div>
                      
                      <h3 className="font-medium mb-2 line-clamp-1">{video.title}</h3>
                      {video.description && (
                        <p className="text-sm text-black/50 mb-4 line-clamp-2">{video.description}</p>
                      )}
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(video.fileUrl, '_blank')}
                          className="flex-1"
                        >
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm('Delete this video?')) {
                              deleteMutation.mutate(video.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}