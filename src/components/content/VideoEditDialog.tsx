import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, UpdateVideoData } from "@/services/contentService";

interface VideoEditDialogProps {
    video: Video | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (id: string, data: UpdateVideoData) => Promise<void>;
}

export const VideoEditDialog = ({ video, open, onOpenChange, onSave }: VideoEditDialogProps) => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [category, setCategory] = useState("");
    const [sourceOrg, setSourceOrg] = useState("");
    const [displaySource, setDisplaySource] = useState("");
    const [whyThisHelps, setWhyThisHelps] = useState("");
    const [sourceCredibility, setSourceCredibility] = useState("");
    const [minAge, setMinAge] = useState<number>(0);
    const [maxAge, setMaxAge] = useState<number>(18);
    const [tags, setTags] = useState("");
    
    // Urdu fields
    const [urduTitle, setUrduTitle] = useState("");
    const [urduSummary, setUrduSummary] = useState("");
    const [urduWhyThisHelps, setUrduWhyThisHelps] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (video) {
            setTitle(video.title);
            setSummary(video.summary || "");
            setYoutubeLink(video.youtubeLink);
            setCategory(video.category);
            setSourceOrg(video.sourceOrg || "");
            setDisplaySource(video.displaySource || "");
            setWhyThisHelps(video.whyThisHelps || "");
            setSourceCredibility(video.sourceCredibility || "");
            setMinAge(video.minAge || 0);
            setMaxAge(video.maxAge || 18);
            setTags(video.tags?.join(", ") || "");
            
            if (video.urduVersion) {
                setUrduTitle(video.urduVersion.title || "");
                setUrduSummary(video.urduVersion.summary || "");
                setUrduWhyThisHelps(video.urduVersion.whyThisHelps || "");
            }
        }
    }, [video]);

    const handleSave = async () => {
        if (!video) return;

        setIsLoading(true);
        try {
            await onSave(video.id, {
                title,
                summary,
                youtubeLink,
                category,
                sourceOrg,
                displaySource,
                whyThisHelps,
                sourceCredibility,
                minAge,
                maxAge,
                tags: tags.split(',').map(t => t.trim()).filter(t => t),
                urduVersion: urduTitle ? {
                    title: urduTitle,
                    summary: urduSummary,
                    whyThisHelps: urduWhyThisHelps
                } : undefined
            });
            onOpenChange(false);
        } catch (error) {
            console.error('Save error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!video) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-spectrum-text-primary">Edit Video</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-video-title">Title</Label>
                            <Input
                                id="edit-video-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter video title"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-video-category">Category</Label>
                            <Input
                                id="edit-video-category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g., emotional_regulation"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-youtube-link">YouTube Link</Label>
                            <Input
                                id="edit-youtube-link"
                                value={youtubeLink}
                                onChange={(e) => setYoutubeLink(e.target.value)}
                                placeholder="https://youtube.com/watch?v=..."
                                type="url"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-tags">Tags</Label>
                            <Input
                                id="edit-tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="tag1, tag2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-min-age">Min Age</Label>
                            <Input
                                id="edit-min-age"
                                type="number"
                                value={minAge}
                                onChange={(e) => setMinAge(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-max-age">Max Age</Label>
                            <Input
                                id="edit-max-age"
                                type="number"
                                value={maxAge}
                                onChange={(e) => setMaxAge(parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-summary">Summary</Label>
                        <Input
                            id="edit-summary"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-urdu-title">Urdu Title</Label>
                        <Input
                            id="edit-urdu-title"
                            value={urduTitle}
                            onChange={(e) => setUrduTitle(e.target.value)}
                            dir="rtl"
                            className="text-right"
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
