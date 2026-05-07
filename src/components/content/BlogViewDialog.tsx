import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, User, Tag } from "lucide-react";
import { Blog } from "@/services/contentService";

interface BlogViewDialogProps {
    blog: Blog | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const BlogViewDialog = ({ blog, open, onOpenChange }: BlogViewDialogProps) => {
    if (!blog) return null;

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A';

        try {
            // Handle Firestore Timestamp object
            if (timestamp.toDate && typeof timestamp.toDate === 'function') {
                return timestamp.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }

            // Handle Firestore server timestamp (seconds and nanoseconds)
            if (timestamp._seconds !== undefined) {
                const date = new Date(timestamp._seconds * 1000);
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }

            // Handle regular Date object or string
            const date = new Date(timestamp);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }

            return 'N/A';
        } catch (error) {
            console.error('Date formatting error:', error);
            return 'N/A';
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[85vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-spectrum-text-primary pr-8">
                        {blog.title}
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[70vh] pr-4">
                    <div className="space-y-4">
                        {/* Metadata */}
                        <div className="flex flex-wrap gap-4 text-sm text-spectrum-text-secondary pb-4 border-b border-spectrum-text-primary/10">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span className="font-medium text-spectrum-text-primary">{blog.authorName}</span>
                                    {blog.authorRole && (
                                        <Badge variant="secondary" className="text-[10px] uppercase h-4 px-1.5 bg-blue-50 text-blue-600 border-blue-100">
                                            {blog.authorRole}
                                        </Badge>
                                    )}
                                </div>
                                {blog.authorCredentials && (
                                    <span className="text-xs ml-6 opacity-70">{blog.authorCredentials}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                <Badge variant="outline" className="bg-spectrum-background text-spectrum-text-primary border-spectrum-text-primary/20">
                                    {blog.category}
                                </Badge>
                            </div>
                            {blog.audienceType && (
                                <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-100">
                                    {blog.audienceType}
                                </Badge>
                            )}
                            {blog.qualityScore !== undefined && (
                                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100">
                                    Score: {blog.qualityScore}
                                </Badge>
                            )}

                        </div>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, i) => (
                                    <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600 border-none font-normal">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Summary */}
                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Summary</h3>
                            <p className="text-spectrum-text-primary leading-relaxed">{blog.summary}</p>
                        </div>

                        {/* Content */}
                        <div className="pt-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Blog Content</h3>
                            <div className="prose prose-sm max-w-none text-spectrum-text-primary leading-loose whitespace-pre-wrap font-serif text-lg">
                                {blog.content}
                            </div>
                        </div>

                        {/* Updated timestamp if different from created */}
                        {blog.updatedAt && blog.createdAt !== blog.updatedAt && (
                            <div className="text-xs text-spectrum-text-secondary pt-4 border-t border-spectrum-text-primary/10">
                                Last updated: {formatDate(blog.updatedAt)}
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
