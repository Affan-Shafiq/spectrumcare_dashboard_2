import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Play } from "lucide-react";
import { CreateBlogData, CreateVideoData } from "@/services/contentService";

interface AddContentFormProps {
    onCreateBlog: (data: CreateBlogData) => Promise<void>;
    onCreateVideo: (data: CreateVideoData) => Promise<void>;
}

export const AddContentForm = ({ onCreateBlog, onCreateVideo }: AddContentFormProps) => {
    const [contentType, setContentType] = useState<"blog" | "video" | "">("");
    const [isLoading, setIsLoading] = useState(false);

    // Blog fields
    const [blogTitle, setBlogTitle] = useState("");
    const [blogSummary, setBlogSummary] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [authorName, setAuthorName] = useState("Spectrum Admin");
    const [authorRole, setAuthorRole] = useState("admin");
    const [authorCredentials, setAuthorCredentials] = useState("");
    const [blogTags, setBlogTags] = useState("");
    const [audienceType, setAudienceType] = useState("generalized");

    // Video fields
    const [videoTitle, setVideoTitle] = useState("");
    const [videoSummary, setVideoSummary] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [videoCategory, setVideoCategory] = useState("");
    const [sourceOrg, setSourceOrg] = useState("");
    const [displaySource, setDisplaySource] = useState("");
    const [whyThisHelps, setWhyThisHelps] = useState("");
    const [sourceCredibility, setSourceCredibility] = useState("");
    const [minAge, setMinAge] = useState<number>(0);
    const [maxAge, setMaxAge] = useState<number>(18);
    const [videoTags, setVideoTags] = useState("");
    
    // Video Urdu fields
    const [urduTitle, setUrduTitle] = useState("");
    const [urduSummary, setUrduSummary] = useState("");
    const [urduWhyThisHelps, setUrduWhyThisHelps] = useState("");

    const resetForm = () => {
        setBlogTitle("");
        setBlogSummary("");
        setBlogContent("");
        setBlogCategory("");
        setAuthorName("Spectrum Admin");
        setAuthorRole("admin");
        setAuthorCredentials("");
        setBlogTags("");
        setAudienceType("generalized");
        
        setVideoTitle("");
        setVideoSummary("");
        setYoutubeLink("");
        setVideoCategory("");
        setSourceOrg("");
        setDisplaySource("");
        setWhyThisHelps("");
        setSourceCredibility("");
        setMinAge(0);
        setMaxAge(18);
        setVideoTags("");
        setUrduTitle("");
        setUrduSummary("");
        setUrduWhyThisHelps("");
        
        setContentType("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (contentType === "blog") {
                await onCreateBlog({
                    title: blogTitle,
                    summary: blogSummary,
                    content: blogContent,
                    category: blogCategory,
                    authorName,
                    authorRole,
                    authorCredentials,
                    tags: blogTags.split(',').map(t => t.trim()).filter(t => t),
                    audienceType
                });
            } else if (contentType === "video") {
                await onCreateVideo({
                    title: videoTitle,
                    summary: videoSummary,
                    youtubeLink,
                    category: videoCategory,
                    sourceOrg,
                    displaySource,
                    whyThisHelps,
                    sourceCredibility,
                    minAge,
                    maxAge,
                    tags: videoTags.split(',').map(t => t.trim()).filter(t => t),
                    urduVersion: urduTitle ? {
                        title: urduTitle,
                        summary: urduSummary,
                        whyThisHelps: urduWhyThisHelps
                    } : undefined
                });
            }
            resetForm();
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-spectrum-text-primary">Add New Content</CardTitle>
                <CardDescription>Create a new blog post or add a video resource</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Content Type Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="content-type">Content Type *</Label>
                        <Select value={contentType} onValueChange={(value: "blog" | "video") => setContentType(value)}>
                            <SelectTrigger id="content-type">
                                <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blog">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        <span>Blog Post</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="video">
                                    <div className="flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        <span>Video Content</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Blog Form Fields */}
                    {contentType === "blog" && (
                        <div className="space-y-4 animate-in fade-in-50 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="blog-title">Title *</Label>
                                    <Input
                                        id="blog-title"
                                        value={blogTitle}
                                        onChange={(e) => setBlogTitle(e.target.value)}
                                        placeholder="Enter blog title"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="blog-category">Category *</Label>
                                    <Input
                                        id="blog-category"
                                        value={blogCategory}
                                        onChange={(e) => setBlogCategory(e.target.value)}
                                        placeholder="e.g., ASD Basics"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="author-name">Author Name *</Label>
                                    <Input
                                        id="author-name"
                                        value={authorName}
                                        onChange={(e) => setAuthorName(e.target.value)}
                                        placeholder="Full name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="author-role">Author Role</Label>
                                    <Select value={authorRole} onValueChange={setAuthorRole} disabled>
                                        <SelectTrigger id="author-role" className="bg-slate-50 text-slate-500">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="therapist">Therapist</SelectItem>
                                            <SelectItem value="parent">Parent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="audience-type">Audience Type</Label>
                                    <Select value={audienceType} onValueChange={setAudienceType} disabled>
                                        <SelectTrigger id="audience-type" className="bg-slate-50 text-slate-500">
                                            <SelectValue placeholder="Select audience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="generalized">Generalized (Public)</SelectItem>
                                            <SelectItem value="personalized">Personalized (Targeted)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="author-credentials">Author Credentials</Label>
                                <Input
                                    id="author-credentials"
                                    value={authorCredentials}
                                    onChange={(e) => setAuthorCredentials(e.target.value)}
                                    placeholder="e.g., Child Speech Therapy • 5 years experience"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="blog-tags">Tags (comma separated)</Label>
                                <Input
                                    id="blog-tags"
                                    value={blogTags}
                                    onChange={(e) => setBlogTags(e.target.value)}
                                    placeholder="#Autism, #ASDBasics"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="blog-summary">Summary *</Label>
                                <Textarea
                                    id="blog-summary"
                                    value={blogSummary}
                                    onChange={(e) => setBlogSummary(e.target.value)}
                                    placeholder="Brief summary of the blog post"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="blog-content">Content *</Label>
                                <Textarea
                                    id="blog-content"
                                    value={blogContent}
                                    onChange={(e) => setBlogContent(e.target.value)}
                                    placeholder="Full blog content (markdown supported)"
                                    rows={10}
                                    className="font-mono text-sm"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Video Form Fields */}
                    {contentType === "video" && (
                        <div className="space-y-6 animate-in fade-in-50 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="video-title">Title *</Label>
                                    <Input
                                        id="video-title"
                                        value={videoTitle}
                                        onChange={(e) => setVideoTitle(e.target.value)}
                                        placeholder="Enter video title"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="video-category">Category *</Label>
                                    <Input
                                        id="video-category"
                                        value={videoCategory}
                                        onChange={(e) => setVideoCategory(e.target.value)}
                                        placeholder="e.g., emotional_regulation"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="youtube-link">YouTube Link *</Label>
                                    <Input
                                        id="youtube-link"
                                        type="url"
                                        value={youtubeLink}
                                        onChange={(e) => setYoutubeLink(e.target.value)}
                                        placeholder="https://youtube.com/watch?v=..."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="video-tags">Tags (comma separated)</Label>
                                    <Input
                                        id="video-tags"
                                        value={videoTags}
                                        onChange={(e) => setVideoTags(e.target.value)}
                                        placeholder="care_pathway, support"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="source-org">Source Organization</Label>
                                    <Input
                                        id="source-org"
                                        value={sourceOrg}
                                        onChange={(e) => setSourceOrg(e.target.value)}
                                        placeholder="e.g., Psychiatry Clinic"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="display-source">Display Source</Label>
                                    <Input
                                        id="display-source"
                                        value={displaySource}
                                        onChange={(e) => setDisplaySource(e.target.value)}
                                        placeholder="e.g., Psychiatry Clinic (Urdu Awareness)"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="min-age">Min Age</Label>
                                    <Input
                                        id="min-age"
                                        type="number"
                                        value={minAge}
                                        onChange={(e) => setMinAge(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="max-age">Max Age</Label>
                                    <Input
                                        id="max-age"
                                        type="number"
                                        value={maxAge}
                                        onChange={(e) => setMaxAge(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="video-summary">Summary *</Label>
                                <Textarea
                                    id="video-summary"
                                    value={videoSummary}
                                    onChange={(e) => setVideoSummary(e.target.value)}
                                    placeholder="Brief summary of the video"
                                    rows={2}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="why-helps">Why This Helps</Label>
                                    <Textarea
                                        id="why-helps"
                                        value={whyThisHelps}
                                        onChange={(e) => setWhyThisHelps(e.target.value)}
                                        placeholder="Benefit to the user"
                                        rows={2}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="source-credibility">Source Credibility</Label>
                                    <Textarea
                                        id="source-credibility"
                                        value={sourceCredibility}
                                        onChange={(e) => setSourceCredibility(e.target.value)}
                                        placeholder="e.g., Trusted clinical guidelines"
                                        rows={2}
                                    />
                                </div>
                            </div>

                            {/* Urdu Version Section */}
                            <div className="pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-spectrum-accent-primary" />
                                    Urdu Translation (Optional)
                                </h3>
                                <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                    <div className="space-y-2">
                                        <Label htmlFor="urdu-title" className="text-slate-600">Urdu Title</Label>
                                        <Input
                                            id="urdu-title"
                                            value={urduTitle}
                                            onChange={(e) => setUrduTitle(e.target.value)}
                                            placeholder="اردو عنوان"
                                            dir="rtl"
                                            className="text-right"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="urdu-summary" className="text-slate-600">Urdu Summary</Label>
                                        <Textarea
                                            id="urdu-summary"
                                            value={urduSummary}
                                            onChange={(e) => setUrduSummary(e.target.value)}
                                            placeholder="اردو خلاصہ"
                                            dir="rtl"
                                            className="text-right"
                                            rows={2}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="urdu-why-helps" className="text-slate-600">Urdu Why This Helps</Label>
                                        <Textarea
                                            id="urdu-why-helps"
                                            value={urduWhyThisHelps}
                                            onChange={(e) => setUrduWhyThisHelps(e.target.value)}
                                            placeholder="یہ کیوں مددگار ہے"
                                            dir="rtl"
                                            className="text-right"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    {contentType && (
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetForm}
                                disabled={isLoading}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-spectrum-accent-primary hover:bg-spectrum-accent-primary/90 text-white"
                            >
                                {isLoading ? "Creating..." : `Create ${contentType === "blog" ? "Blog Post" : "Video"}`}
                            </Button>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};
