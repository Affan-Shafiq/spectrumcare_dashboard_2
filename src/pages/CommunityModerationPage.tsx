import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockCommunityPosts } from "@/data/mockData";
import { useEffect, useState, useCallback } from "react";
import { getCommunityStats, CommunityStats, getCommunityReports, ReportedPost, moderatePost, getAllPosts } from "@/services/communityService";
import {
  MessageSquare,
  Flag,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  User as UserIcon,
  MoreVertical,
  Reply,
  LayoutGrid,
  Scroll
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CommunityModerationPage = () => {
  const [reportedPosts, setReportedPosts] = useState<ReportedPost[]>([]);
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingQueue, setIsLoadingQueue] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [selectedPost, setSelectedPost] = useState<ReportedPost | null>(null);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const { toast } = useToast();

  const fetchStats = useCallback(async () => {
    try {
      const data = await getCommunityStats();
      setStats(data);
    } catch (error) {
      toast({
        title: "Error fetching statistics",
        description: "Could not load community moderation data.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingStats(false);
    }
  }, [toast]);

  const fetchQueue = useCallback(async () => {
    setIsLoadingQueue(true);
    try {
      const data = await getCommunityReports(statusFilter);
      setReportedPosts(data);
    } catch (error: any) {
      toast({
        title: "Error fetching moderation queue",
        description: error.message || "Could not load posts for moderation.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingQueue(false);
    }
  }, [statusFilter, toast]);

  const fetchFeed = useCallback(async () => {
    setIsLoadingFeed(true);
    try {
      const data = await getAllPosts();
      setAllPosts(data);
      setIsFeedModalOpen(true);
    } catch (error: any) {
      toast({
        title: "Error fetching community feed",
        description: error.message || "Could not load posts.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingFeed(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  const handleApprove = async (postId: string) => {
    try {
      await moderatePost(postId, 'approve');
      toast({
        title: "Post approved",
        description: "The post has been approved and is now visible to users."
      });
      // Refresh both stats and queue
      fetchStats();
      fetchQueue();
    } catch (error: any) {
      toast({
        title: "Failed to approve post",
        description: error.message || "An error occurred during moderation.",
        variant: "destructive"
      });
    }
  };

  const handleRemove = async (postId: string) => {
    try {
      await moderatePost(postId, 'remove');
      toast({
        title: "Post removed",
        description: "The post has been removed and moved to the archive.",
        variant: "destructive"
      });
      // Refresh both stats and queue
      fetchStats();
      fetchQueue();
    } catch (error: any) {
      toast({
        title: "Failed to remove post",
        description: error.message || "An error occurred during moderation.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string, flagged: boolean) => {
    if (flagged) {
      return <Badge variant="destructive" className="gap-1">
        <Flag className="h-3 w-3" />
        Flagged
      </Badge>;
    }

    switch (status) {
      case 'approved':
        return <Badge variant="default" className="gap-1 bg-spectrum-accent-success">
          <CheckCircle className="h-3 w-3" />
          Approved
        </Badge>;
      case 'pending':
        return <Badge variant="secondary" className="gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>;
      case 'removed':
        return <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          Removed
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTagsBadge = (tag: string) => {
    const colors: Record<string, string> = {
      question: 'bg-blue-100 text-blue-700 border-blue-200',
      experience: 'bg-green-100 text-green-700 border-green-200',
      support: 'bg-purple-100 text-purple-700 border-purple-200',
      resource: 'bg-orange-100 text-orange-700 border-orange-200',
      sensory: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      social: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      tips: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };
    
    const colorClass = colors[tag.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200';
    
    return (
      <Badge variant="outline" className={`${colorClass} font-medium px-2 py-0.5`}>
        {tag.charAt(0).toUpperCase() + tag.slice(1)}
      </Badge>
    );
  };



  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-spectrum-text-primary">
          Community Moderation
        </h1>
        <p className="text-muted-foreground mt-2">
          Review and moderate community posts to ensure a safe and supportive environment.
        </p>
      </div>

      {/* Moderation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card 
          className="spectrum-card cursor-pointer hover:shadow-md transition-all hover:border-spectrum-primary/20 relative overflow-hidden"
          onClick={fetchFeed}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-spectrum-accent-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-text-primary">
              {isLoadingStats ? "..." : stats?.totalPosts ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              All community posts
            </p>
          </CardContent>
          {isLoadingFeed && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px] z-10">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-spectrum-primary"></div>
            </div>
          )}
        </Card>

        <Card className="spectrum-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-spectrum-accent-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-accent-primary">
              {isLoadingStats ? "..." : stats?.pendingReview ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card className="spectrum-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Removed Posts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {isLoadingStats ? "..." : stats?.removedPosts ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              User reports
            </p>
          </CardContent>
        </Card>

        <Card className="spectrum-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-spectrum-accent-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-accent-success">
              {isLoadingStats ? "..." : stats?.approvedPosts ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Reviewed & Cleared
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="spectrum-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Post Moderation Queue
          </CardTitle>
          <CardDescription>
            Review, approve, or remove community posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="removed">Removed Posts</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground">
                Showing {reportedPosts.length} posts
              </div>
            </div>
          </div>

          {isLoadingQueue ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-spectrum-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Content Preview</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportedPosts.map((post) => (
                  <TableRow 
                    key={post.id} 
                    className="cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setSelectedPost(post)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-spectrum-primary/10 text-spectrum-primary text-xs font-bold">
                            {post.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-700">{post.userName}</span>
                          {post.authorRole === 'therapist' && (
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-medium w-fit">Therapist</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={post.content}>
                        {post.content.length > 80
                          ? `${post.content.substring(0, 80)}...`
                          : post.content}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTagsBadge(post.category)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(post.status, false)}
                    </TableCell>
                    <TableCell>
                      {post.reportCount > 0 ? (
                        <span className="text-red-600 font-medium">{post.reportCount}</span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(post.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2">
                        {post.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleApprove(post.id)}
                              className="gap-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRemove(post.id)}
                              className="gap-1"
                            >
                              <XCircle className="h-3 w-3" />
                              Remove
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!isLoadingQueue && reportedPosts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No reported posts in this queue.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Moderation Guidelines */}
      <Card className="spectrum-card">
        <CardHeader>
          <CardTitle>Moderation Guidelines</CardTitle>
          <CardDescription>
            Guidelines for reviewing and moderating community content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-spectrum-accent-success mb-3">✓ Approve Posts That:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Share helpful experiences or advice</li>
                <li>• Ask genuine questions about autism support</li>
                <li>• Provide useful resources or information</li>
                <li>• Offer emotional support to community members</li>
                <li>• Follow community guidelines and tone</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-600 mb-3">✗ Remove Posts That:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Contain inappropriate or offensive language</li>
                <li>• Share misinformation about autism</li>
                <li>• Include personal attacks or harassment</li>
                <li>• Violate user privacy or confidentiality</li>
                <li>• Promote harmful or dangerous advice</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Detailed Post View Modal */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl bg-white p-0 overflow-hidden rounded-2xl border-none">
          {selectedPost && (
            <div className="flex flex-col">
              <div className="p-6 space-y-6">
                {/* Post Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border border-slate-100">
                      <AvatarFallback className="bg-slate-50 text-slate-400 text-lg font-bold">
                        {selectedPost.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-lg">{selectedPost.userName}</span>
                        {selectedPost.authorRole === 'therapist' && (
                          <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-medium">Therapist</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                        <span>{new Date(selectedPost.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap py-2">
                  {selectedPost.content}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2 pb-4">
                  {selectedPost.topics?.map(topic => (
                    <Badge key={topic} variant="secondary" className="bg-slate-50 text-slate-500 border-none px-3 py-1 text-sm font-normal rounded-lg capitalize">
                      {topic}
                    </Badge>
                  ))}
                  {(!selectedPost.topics || selectedPost.topics.length === 0) && (
                    <Badge variant="secondary" className="bg-slate-50 text-slate-500 border-none px-3 py-1 text-sm font-normal rounded-lg capitalize">
                      {selectedPost.category}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Moderation Actions at the Bottom */}
              {selectedPost.status === 'pending' && (
                <div className="bg-slate-50 p-4 flex justify-end gap-3 border-t border-slate-100">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPost(null)}
                    className="rounded-xl px-6"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      handleRemove(selectedPost.id);
                      setSelectedPost(null);
                    }}
                    className="rounded-xl px-6 gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Remove Post
                  </Button>
                  <Button 
                    variant="success" 
                    onClick={() => {
                      handleApprove(selectedPost.id);
                      setSelectedPost(null);
                    }}
                    className="rounded-xl px-6 gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve Post
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Community Feed Modal */}
      <Dialog open={isFeedModalOpen} onOpenChange={setIsFeedModalOpen}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col bg-white p-0 overflow-hidden rounded-2xl border-none">
          <DialogHeader className="p-8 pb-4 border-b border-slate-50">
            <DialogTitle className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <LayoutGrid className="h-8 w-8 text-spectrum-primary" />
              Community Feed
            </DialogTitle>
            <DialogDescription className="text-base">
              Viewing the latest posts from the Spectrum community
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 px-8">
            <div className="py-6 space-y-0">
              {allPosts.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No posts found in the community.</p>
                </div>
              ) : (
                allPosts.map((post, index) => (
                  <div key={post.id}>
                    <div className="py-8 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-white shadow-sm">
                            <AvatarFallback className="bg-slate-50 text-slate-400 font-bold">
                              {post.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800">{post.userName}</span>
                              {post.authorRole === 'therapist' && (
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-medium">Therapist</span>
                              )}
                            </div>
                            <span className="text-slate-400 text-xs">
                              {new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                           {post.topics?.map((topic: string) => (
                              <Badge key={topic} variant="outline" className="bg-white text-slate-400 border-slate-100 text-[10px] uppercase tracking-wider font-normal">
                                {topic}
                              </Badge>
                           ))}
                        </div>
                      </div>
                      <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap mb-4 pl-[52px]">
                        {post.content}
                      </div>
                      <div className="flex items-center gap-6 pt-4 pl-[52px]">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Reply className="h-4 w-4" />
                          <span className="text-[11px] font-medium">{post.replyCount || 0} Replies</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-[11px] font-medium">{post.likesCount || 0} Likes</span>
                        </div>
                        {post.moderationStatus === 'removed' && (
                          <Badge variant="destructive" className="ml-auto text-[10px] h-5 px-2">REMOVED</Badge>
                        )}
                      </div>
                    </div>
                    {index < allPosts.length - 1 && (
                      <hr className="border-slate-100" />
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};