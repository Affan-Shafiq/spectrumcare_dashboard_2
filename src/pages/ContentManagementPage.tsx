import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Play,
  FileText,
  Calendar,
  User,
  Plus
} from "lucide-react";
import {
  Blog,
  Video,
  getAllBlogs,
  getAllVideos,
  createBlog,
  createVideo,
  updateBlog,
  updateVideo,
  toggleBlogVisibility,
  toggleVideoVisibility,
  deleteBlog,
  deleteVideo,
  CreateBlogData,
  CreateVideoData,
  UpdateBlogData,
  UpdateVideoData
} from "@/services/contentService";
import { BlogViewDialog } from "@/components/content/BlogViewDialog";
import { BlogEditDialog } from "@/components/content/BlogEditDialog";
import { VideoViewDialog } from "@/components/content/VideoViewDialog";
import { VideoEditDialog } from "@/components/content/VideoEditDialog";
import { DeleteConfirmDialog } from "@/components/content/DeleteConfirmDialog";
import { AddContentForm } from "@/components/content/AddContentForm";

export const ContentManagementPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("blogs");
  const { toast } = useToast();

  // View dialogs
  const [viewBlog, setViewBlog] = useState<Blog | null>(null);
  const [viewVideo, setViewVideo] = useState<Video | null>(null);

  // Edit dialogs
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [editVideo, setEditVideo] = useState<Video | null>(null);

  // Delete dialogs
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [deleteVideoId, setDeleteVideoId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Don't show loading spinner if we already have data (for refresh operations)
    if (blogs.length === 0 && videos.length === 0) {
      setIsLoading(true);
    }

    try {
      // Fetch both in parallel for faster loading
      const [blogsData, videosData] = await Promise.all([
        getAllBlogs(true),
        getAllVideos(true)
      ]);
      setBlogs(blogsData);
      setVideos(videosData);
    } catch (error) {
      toast({
        title: "Error loading content",
        description: "Failed to fetch blogs and videos",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Blog handlers
  const handleCreateBlog = async (data: CreateBlogData) => {
    try {
      await createBlog(data);
      toast({
        title: "Blog created",
        description: "Blog post has been created successfully"
      });
      await loadData();
    } catch (error) {
      toast({
        title: "Error creating blog",
        description: "Failed to create blog post",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleUpdateBlog = async (id: string, data: UpdateBlogData) => {
    try {
      await updateBlog(id, data);
      toast({
        title: "Blog updated",
        description: "Blog post has been updated successfully"
      });
      await loadData();
    } catch (error) {
      toast({
        title: "Error updating blog",
        description: "Failed to update blog post",
        variant: "destructive"
      });
      throw error;
    }
  };



  const handleDeleteBlog = async () => {
    if (!deleteBlogId) return;

    setIsDeleting(true);
    try {
      await deleteBlog(deleteBlogId);
      toast({
        title: "Blog deleted",
        description: "Blog post has been permanently deleted"
      });
      setDeleteBlogId(null);
      await loadData();
    } catch (error) {
      toast({
        title: "Error deleting blog",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Video handlers
  const handleCreateVideo = async (data: CreateVideoData) => {
    try {
      await createVideo(data);
      toast({
        title: "Video added",
        description: "Video has been added successfully"
      });
      await loadData();
    } catch (error) {
      toast({
        title: "Error adding video",
        description: "Failed to add video",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleUpdateVideo = async (id: string, data: UpdateVideoData) => {
    try {
      await updateVideo(id, data);
      toast({
        title: "Video updated",
        description: "Video has been updated successfully"
      });
      await loadData();
    } catch (error) {
      toast({
        title: "Error updating video",
        description: "Failed to update video",
        variant: "destructive"
      });
      throw error;
    }
  };



  const handleDeleteVideo = async () => {
    if (!deleteVideoId) return;

    setIsDeleting(true);
    try {
      await deleteVideo(deleteVideoId);
      toast({
        title: "Video deleted",
        description: "Video has been permanently deleted"
      });
      setDeleteVideoId(null);
      await loadData();
    } catch (error) {
      toast({
        title: "Error deleting video",
        description: "Failed to delete video",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';

    try {
      // Handle Firestore Timestamp object
      if (timestamp.toDate && typeof timestamp.toDate === 'function') {
        return timestamp.toDate().toLocaleDateString();
      }

      // Handle Firestore server timestamp (seconds and nanoseconds)
      if (timestamp._seconds !== undefined) {
        const date = new Date(timestamp._seconds * 1000);
        return date.toLocaleDateString();
      }

      // Handle regular Date object or string
      const date = new Date(timestamp);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString();
      }

      return 'N/A';
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'N/A';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spectrum-primary mx-auto"></div>
          <p className="mt-4 text-spectrum-text-secondary">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-spectrum-text-primary">Content Management</h1>
        <p className="text-spectrum-text-secondary mt-1">Manage blogs and videos for the SpectrumCare app</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blogs" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Blog Posts</span>
            <span className="sm:hidden">Blogs</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">Video Content</span>
            <span className="sm:hidden">Videos</span>
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Content</span>
            <span className="sm:hidden">Add</span>
          </TabsTrigger>
        </TabsList>

        {/* Blog Posts Tab */}
        <TabsContent value="blogs" className="space-y-4">
          {blogs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-spectrum-text-secondary mb-4" />
                <p className="text-spectrum-text-secondary">No blog posts yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {blogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-spectrum-accent-primary/30"
                  onClick={() => setViewBlog(blog)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{blog.title}</CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {blog.authorName}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(blog.createdAt)}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-spectrum-background text-spectrum-text-primary border-spectrum-text-primary/20">
                          {blog.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className="text-sm text-spectrum-text-secondary line-clamp-2 flex-1">
                        {blog.summary}
                      </p>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>

                        {blog.authorRole === 'admin' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditBlog(blog)}
                            className="text-spectrum-text-primary border-spectrum-text-primary/20 hover:bg-spectrum-background"
                            title="Edit blog"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteBlogId(blog.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          title="Delete blog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Video Content Tab */}
        <TabsContent value="videos" className="space-y-4">
          {videos.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Play className="w-12 h-12 text-spectrum-text-secondary mb-4" />
                <p className="text-spectrum-text-secondary">No videos yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {videos.map((video) => (
                <Card
                  key={video.id}
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-spectrum-accent-primary/30"
                  onClick={() => setViewVideo(video)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{video.title}</CardTitle>
                        <CardDescription className="mt-1">
                          Duration: {video.duration} • Uploaded: {formatDate(video.createdAt)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-spectrum-background text-spectrum-text-primary border-spectrum-text-primary/20">
                          {video.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditVideo(video)}
                        className="text-spectrum-text-primary border-spectrum-text-primary/20 hover:bg-spectrum-background"
                        title="Edit video"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteVideoId(video.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        title="Delete video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Add Content Tab */}
        <TabsContent value="add">
          <AddContentForm
            onCreateBlog={handleCreateBlog}
            onCreateVideo={handleCreateVideo}
          />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <BlogViewDialog
        blog={viewBlog}
        open={!!viewBlog}
        onOpenChange={(open) => !open && setViewBlog(null)}
      />

      <BlogEditDialog
        blog={editBlog}
        open={!!editBlog}
        onOpenChange={(open) => !open && setEditBlog(null)}
        onSave={handleUpdateBlog}
      />

      <VideoViewDialog
        video={viewVideo}
        open={!!viewVideo}
        onOpenChange={(open) => !open && setViewVideo(null)}
      />

      <VideoEditDialog
        video={editVideo}
        open={!!editVideo}
        onOpenChange={(open) => !open && setEditVideo(null)}
        onSave={handleUpdateVideo}
      />

      <DeleteConfirmDialog
        open={!!deleteBlogId}
        onOpenChange={(open) => !open && setDeleteBlogId(null)}
        onConfirm={handleDeleteBlog}
        title="Delete Blog Post"
        description="Are you sure you want to delete this blog post? This action cannot be undone."
        isLoading={isDeleting}
      />

      <DeleteConfirmDialog
        open={!!deleteVideoId}
        onOpenChange={(open) => !open && setDeleteVideoId(null)}
        onConfirm={handleDeleteVideo}
        title="Delete Video"
        description="Are you sure you want to delete this video? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};