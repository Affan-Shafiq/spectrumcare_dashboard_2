import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Award,
    CheckCircle,
    XCircle,
    Briefcase,
    FileText
} from "lucide-react";
import { Therapist } from "@/services/therapistService";

interface TherapistDetailDialogProps {
    therapist: Therapist | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApprove?: (id: string) => void;
    onReject?: (id: string) => void;
    showActions?: boolean;
}

export const TherapistDetailDialog = ({
    therapist,
    open,
    onOpenChange,
    onApprove,
    onReject,
    showActions = false
}: TherapistDetailDialogProps) => {
    if (!therapist) return null;

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[85vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-spectrum-text-primary flex items-center gap-2">
                        <User className="w-6 h-6" />
                        Therapist Profile
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[65vh] pr-4">
                    <div className="space-y-6 py-4">
                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                            <Badge className={
                                therapist.status === 'approved'
                                    ? 'bg-emerald-600 text-white'
                                    : therapist.status === 'rejected'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-indigo-600 text-white'
                            }>
                                {therapist.status === 'requested' || therapist.status === 'pending' ? 'PENDING' : therapist.status.toUpperCase()}
                            </Badge>
                            {therapist.isVerified && (
                                <Badge className="bg-blue-500 text-white">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                </Badge>
                            )}
                        </div>

                        {/* Personal Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-spectrum-text-primary text-lg border-b pb-2">
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-spectrum-text-secondary flex-shrink-0" />
                                    <div>
                                        <span className="text-spectrum-text-secondary">Name:</span>
                                        <span className="ml-2 font-medium">{therapist.name}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-spectrum-text-secondary flex-shrink-0" />
                                    <div>
                                        <span className="text-spectrum-text-secondary">Email:</span>
                                        <span className="ml-2 font-medium break-all">{therapist.email}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-spectrum-text-secondary flex-shrink-0" />
                                    <div>
                                        <span className="text-spectrum-text-secondary">Contact:</span>
                                        <span className="ml-2 font-medium">{therapist.contactNo}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-spectrum-text-secondary flex-shrink-0" />
                                    <div>
                                        <span className="text-spectrum-text-secondary">Address:</span>
                                        <span className="ml-2 font-medium">{therapist.address}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-spectrum-text-secondary flex-shrink-0" />
                                    <div>
                                        <span className="text-spectrum-text-secondary">Applied:</span>
                                        <span className="ml-2 font-medium">{formatDate(therapist.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Details */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-spectrum-text-primary text-lg border-b pb-2">
                                Professional Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-spectrum-text-secondary flex-shrink-0" />
                                    <div>
                                        <span className="text-spectrum-text-secondary">Experience:</span>
                                        <span className="ml-2 font-medium">{therapist.experience} years</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-spectrum-text-secondary flex-shrink-0" />
                                    <div>
                                        <span className="text-spectrum-text-secondary">Specialization:</span>
                                        <span className="ml-2 font-medium">{therapist.specialization}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Qualifications */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-spectrum-text-primary text-lg border-b pb-2">
                                Qualifications
                            </h3>
                            <div className="text-sm">
                                <p className="whitespace-pre-wrap">{therapist.qualifications}</p>
                            </div>
                        </div>

                        {/* Specialties */}
                        {therapist.specialties && therapist.specialties.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="font-semibold text-spectrum-text-primary text-lg border-b pb-2">
                                    Specialties
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {therapist.specialties.map((specialty, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="bg-spectrum-background text-spectrum-text-primary border-spectrum-text-primary/20"
                                        >
                                            {specialty}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Registration Details */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-spectrum-text-primary text-lg border-b pb-2">
                                Registration Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-spectrum-text-secondary flex-shrink-0" />
                                    <div>
                                        <span className="text-spectrum-text-secondary">Authority:</span>
                                        <span className="ml-2 font-medium">{therapist.registeringAuthority}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-spectrum-text-secondary flex-shrink-0" />
                                    <div>
                                        <span className="text-spectrum-text-secondary">Registration #:</span>
                                        <span className="ml-2 font-medium">{therapist.registrationNumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        {therapist.bio && (
                            <div className="space-y-3">
                                <h3 className="font-semibold text-spectrum-text-primary text-lg border-b pb-2">
                                    Bio
                                </h3>
                                <div className="text-sm">
                                    <p className="whitespace-pre-wrap text-spectrum-text-secondary">{therapist.bio}</p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        {showActions && (therapist.status === 'requested' || therapist.status === 'pending') && (
                            <div className="flex gap-3 pt-4 border-t">
                                <Button
                                    onClick={() => onApprove?.(therapist.id)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve Therapist
                                </Button>
                                <Button
                                    onClick={() => onReject?.(therapist.id)}
                                    variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50 flex-1"
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject Application
                                </Button>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
