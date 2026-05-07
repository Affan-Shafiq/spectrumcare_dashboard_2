import { apiCall } from './authService';

export interface CommunityStats {
    totalPosts: number;
    pendingReview: number;
    removedPosts: number;
    approvedPosts: number;
}

/**
 * Fetch community statistics from the backend
 */
export const getCommunityStats = async (): Promise<CommunityStats> => {
    try {
        const response = await apiCall('/community/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching community stats:', error);
        throw error;
    }
};

export interface ReportedPost {
    id: string;
    userName: string;
    authorRole?: string;
    content: string;
    category: string;
    topics?: string[];
    status: 'pending' | 'approved' | 'removed';
    reportCount: number;
    likesCount?: number;
    replyCount?: number;
    isTherapistTargeted?: boolean;
    timestamp: string | Date;
    reports: any[];
    reasons?: string[];
}

/**
 * Fetch moderation queue from the backend
 */
export const getCommunityReports = async (status: string = 'pending'): Promise<ReportedPost[]> => {
    try {
        const response = await apiCall(`/community/reports?status=${status}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching community reports:', error);
        throw error;
    }
};

/**
 * Approve or remove a reported post
 */
export const moderatePost = async (postId: string, action: 'approve' | 'remove'): Promise<void> => {
    try {
        await apiCall(`/community/moderate/${postId}`, {
            method: 'PATCH',
            body: JSON.stringify({ action })
        });
    } catch (error) {
        console.error(`Error moderating post ${postId}:`, error);
        throw error;
    }
};

/**
 * Get all community posts (feed view)
 */
export const getAllPosts = async (): Promise<any[]> => {
    try {
        const response = await apiCall('/community/all-posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching all posts:', error);
        throw error;
    }
};


