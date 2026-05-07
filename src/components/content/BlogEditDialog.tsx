import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Blog, UpdateBlogData } from "@/services/contentService";

interface BlogEditDialogProps {
    blog: Blog | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (id: string, data: UpdateBlogData) => Promise<void>;
}

export const BlogEditDialog = ({ blog, open, onOpenChange, onSave }: BlogEditDialogProps) => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorRole, setAuthorRole] = useState("");
    const [authorCredentials, setAuthorCredentials] = useState("");
    const [tags, setTags] = useState("");
    const [audienceType, setAudienceType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setSummary(blog.summary);
            setContent(blog.content);
            setCategory(blog.category);
            setAuthorName(blog.authorName || "Spectrum Admin");
            setAuthorRole("admin");
            setAuthorCredentials(blog.authorCredentials || "");
            setTags(blog.tags?.join(", ") || "");
            setAudienceType("generalized");
        }
    }, [blog]);

    const handleSave = async () => {
        if (!blog) return;

        setIsLoading(true);
        try {
            await onSave(blog.id, {
                title,
                summary,
                content,
                category,
                authorName,
                authorRole,
                authorCredentials,
                tags: tags.split(',').map(t => t.trim()).filter(t => t),
                audienceType
            });
            onOpenChange(false);
        } catch (error) {
            console.error('Save error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!blog) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-spectrum-text-primary">Edit Blog Post</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                                id="edit-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter blog title"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Input
                                id="edit-category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g., ASD Basics"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-author-name">Author Name</Label>
                            <Input
                                id="edit-author-name"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                placeholder="Full name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-audience">Audience Type</Label>
                            <Input
                                id="edit-audience"
                                value={audienceType}
                                disabled
                                className="bg-slate-50 text-slate-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-author-credentials">Author Credentials</Label>
                        <Input
                            id="edit-author-credentials"
                            value={authorCredentials}
                            onChange={(e) => setAuthorCredentials(e.target.value)}
                            placeholder="e.g., Child Speech Therapy"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                        <Input
                            id="edit-tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="#Autism, #ASDBasics"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-summary">Summary</Label>
                        <Textarea
                            id="edit-summary"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            placeholder="Brief summary of the blog post"
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-content">Content</Label>
                        <Textarea
                            id="edit-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Full blog content"
                            rows={10}
                            className="font-mono text-sm"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-spectrum-accent-primary hover:bg-spectrum-accent-primary/90 text-white"
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
