import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  UserCheck,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import {
  Therapist,
  getAllTherapists,
  updateTherapistStatus,
  getTherapistStats
} from "@/services/therapistService";
import { TherapistDetailDialog } from "@/components/therapists/TherapistDetailDialog";

export const TherapistVerificationPage = () => {
  const [pendingTherapists, setPendingTherapists] = useState<Therapist[]>([]);
  const [approvedTherapists, setApprovedTherapists] = useState<Therapist[]>([]);
  const [stats, setStats] = useState({
    pendingReview: 0,
    approvedToday: 0,
    rejectedToday: 0,
    totalApproved: 0
  });
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showActionsInDialog, setShowActionsInDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (pendingTherapists.length === 0 && approvedTherapists.length === 0) {
      setIsLoading(true);
    }

    try {
      const [pending, approved, statsData] = await Promise.all([
        getAllTherapists('requested'),
        getAllTherapists('approved'),
        getTherapistStats()
      ]);

      setPendingTherapists(pending);
      setApprovedTherapists(approved);
      setStats(statsData);
    } catch (error) {
      toast({
        title: "Error loading therapists",
        description: "Failed to fetch therapist data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await updateTherapistStatus(id, 'approved');
      toast({
        title: "Therapist approved",
        description: "The therapist has been successfully approved"
      });
      setIsDetailOpen(false);
      await loadData();
    } catch (error) {
      toast({
        title: "Error approving therapist",
        description: "Failed to approve therapist",
        variant: "destructive"
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateTherapistStatus(id, 'rejected');
      toast({
        title: "Application rejected",
        description: "The therapist application has been rejected"
      });
      setIsDetailOpen(false);
      await loadData();
    } catch (error) {
      toast({
        title: "Error rejecting application",
        description: "Failed to reject application",
        variant: "destructive"
      });
    }
  };

  const openTherapistDetail = (therapist: Therapist, showActions: boolean) => {
    setSelectedTherapist(therapist);
    setShowActionsInDialog(showActions);
    setIsDetailOpen(true);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';

    try {
      if (timestamp.toDate && typeof timestamp.toDate === 'function') {
        return timestamp.toDate().toLocaleDateString();
      }

      if (timestamp._seconds !== undefined) {
        const date = new Date(timestamp._seconds * 1000);
        return date.toLocaleDateString();
      }

      const date = new Date(timestamp);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString();
      }

      return 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spectrum-primary mx-auto"></div>
          <p className="mt-4 text-spectrum-text-secondary">Loading therapists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-spectrum-text-primary">Therapist Verification</h1>
        <p className="text-spectrum-text-secondary mt-1">Review and approve therapist applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-spectrum-text-secondary">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-spectrum-accent-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-text-primary">{stats.pendingReview}</div>
            <p className="text-xs text-spectrum-text-secondary">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-spectrum-text-secondary">Approved Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-spectrum-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-text-primary">{stats.approvedToday}</div>
            <p className="text-xs text-spectrum-text-secondary">Today's approvals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-spectrum-text-secondary">Rejected Today</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-text-primary">{stats.rejectedToday}</div>
            <p className="text-xs text-spectrum-text-secondary">Today's rejections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-spectrum-text-secondary">Total Approved</CardTitle>
            <UserCheck className="h-4 w-4 text-spectrum-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-text-primary">{stats.totalApproved}</div>
            <p className="text-xs text-spectrum-text-secondary">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-spectrum-accent-primary" />
            Pending Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingTherapists.length === 0 ? (
            <div className="text-center py-8 text-spectrum-text-secondary">
              No pending applications
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Specialization</TableHead>
                    <TableHead className="hidden md:table-cell">Experience</TableHead>
                    <TableHead className="hidden lg:table-cell">Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingTherapists.map((therapist) => (
                    <TableRow
                      key={therapist.id}
                      className="cursor-pointer hover:bg-spectrum-background/50 transition-colors"
                      onClick={() => openTherapistDetail(therapist, true)}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium text-spectrum-text-primary">{therapist.name}</div>
                          <div className="text-sm text-spectrum-text-secondary">{therapist.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="text-sm">{therapist.specialization}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">{therapist.experience} years</div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-sm">{formatDate(therapist.createdAt)}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white border-0">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white h-8"
                            onClick={() => handleApprove(therapist.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 h-8"
                            onClick={() => handleReject(therapist.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approved Therapists Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-spectrum-success" />
            Approved Therapists
          </CardTitle>
        </CardHeader>
        <CardContent>
          {approvedTherapists.length === 0 ? (
            <div className="text-center py-8 text-spectrum-text-secondary">
              No approved therapists yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Specialization</TableHead>
                    <TableHead className="hidden md:table-cell">Experience</TableHead>
                    <TableHead className="hidden lg:table-cell">Approved Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedTherapists.map((therapist) => (
                    <TableRow
                      key={therapist.id}
                      className="cursor-pointer hover:bg-spectrum-background/50 transition-colors"
                      onClick={() => openTherapistDetail(therapist, false)}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium text-spectrum-text-primary">{therapist.name}</div>
                          <div className="text-sm text-spectrum-text-secondary">{therapist.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="text-sm">{therapist.specialization}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">{therapist.experience} years</div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-sm">{formatDate(therapist.updatedAt || therapist.createdAt)}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approved
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Therapist Detail Dialog */}
      <TherapistDetailDialog
        therapist={selectedTherapist}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onApprove={handleApprove}
        onReject={handleReject}
        showActions={showActionsInDialog}
      />
    </div>
  );
};