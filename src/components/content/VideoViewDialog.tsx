import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Tag } from "lucide-react";
import { Video } from "@/services/contentService";

interface VideoViewDialogProps {
    video: Video | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const VideoViewDialog = ({ video, open, onOpenChange }: VideoViewDialogProps) => {
    if (!video) return null;

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A';

        try {
            if (timestamp.toDate && typeof timestamp.toDate === 'function') {
                return timestamp.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }

            if (timestamp._seconds !== undefined) {
                const date = new Date(timestamp._seconds * 1000);
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }

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

    const getYouTubeEmbedUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            let videoId = '';

            if (urlObj.hostname.includes('youtube.com')) {
                videoId = urlObj.searchParams.get('v') || '';
            } else if (urlObj.hostname.includes('youtu.be')) {
                videoId = urlObj.pathname.slice(1);
            }

            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        } catch {
            return null;
        }
    };

    const embedUrl = getYouTubeEmbedUrl(video.youtubeLink);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden bg-white border-none rounded-2xl">
                <DialogHeader className="p-6 pb-2 border-b border-slate-50">
                    <DialogTitle className="text-2xl font-bold text-slate-800 pr-8">
                        {video.title}
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1">
                    <div className="p-6 space-y-6">
                        {/* Metadata */}
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(video.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                <Badge variant="outline" className="bg-spectrum-background text-spectrum-text-primary border-spectrum-text-primary/20">
                                    {video.category}
                                </Badge>
                            </div>
                            {video.minAge !== undefined && (
                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none">
                                    Age: {video.minAge}-{video.maxAge}
                                </Badge>
                            )}
                        </div>

                        {/* YouTube Player */}
                        {embedUrl ? (
                            <div className="relative w-full shadow-lg" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                                    src={embedUrl}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <div className="w-full h-64 bg-slate-100 rounded-xl flex items-center justify-center">
                                <p className="text-slate-400">Invalid YouTube URL</p>
                            </div>
                        )}

                        {/* Content Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">English Overview</h3>
                                    <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-3">
                                        <p className="text-sm font-medium text-slate-800">{video.summary}</p>
                                        {video.whyThisHelps && (
                                            <div className="pt-2 border-t border-slate-100">
                                                <p className="text-[11px] text-slate-500 uppercase font-bold mb-1">Why This Helps</p>
                                                <p className="text-sm text-slate-600">{video.whyThisHelps}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {video.displaySource && (
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Source Information</h3>
                                        <div className="text-sm text-slate-600">
                                            <p className="font-bold">{video.displaySource}</p>
                                            {video.sourceCredibility && (
                                                <p className="text-xs opacity-70 italic mt-1">{video.sourceCredibility}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Urdu Version Display */}
                            {video.urduVersion && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 text-right">اردو ورژن</h3>
                                    <div className="bg-green-50/30 p-4 rounded-xl border border-green-100/50 space-y-3 text-right" dir="rtl">
                                        <p className="text-lg font-bold text-slate-800 leading-normal">{video.urduVersion.title}</p>
                                        <p className="text-sm text-slate-700">{video.urduVersion.summary}</p>
                                        <div className="pt-2 border-t border-green-100/50">
                                            <p className="text-[11px] text-green-600 uppercase font-bold mb-1">یہ کیوں مددگار ہے</p>
                                            <p className="text-sm text-slate-600">{video.urduVersion.whyThisHelps}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        {video.tags && video.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {video.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-500 border-none font-normal text-[10px]">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Updated timestamp */}
                        {video.updatedAt && video.createdAt !== video.updatedAt && (
                            <div className="text-xs text-slate-400 pt-4 border-t border-slate-100 text-center mb-4">
                                Last updated: {formatDate(video.updatedAt)}
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
