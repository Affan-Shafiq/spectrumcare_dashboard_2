import { apiCall } from './authService';

// TypeScript interfaces
export interface Therapist {
    id: string;
    name: string;
    email: string;
    address: string;
    contactNo: string;
    specialization: string;
    experience: number;
    qualifications: string;
    specialties: string[];
    registeringAuthority: string;
    registrationNumber: string;
    bio?: string;
    status: 'requested' | 'pending' | 'approved' | 'rejected';
    isVerified: boolean;
    rating?: number | null;
    createdAt: any;
    updatedAt?: any;
    lastLoginAt?: any;
}

export interface TherapistStats {
    pendingReview: number;
    approvedToday: number;
    rejectedToday: number;
    totalApproved: number;
}

// ==================== THERAPIST SERVICES ====================

/**
 * Get all therapists with optional status filter
 */
export const getAllTherapists = async (status?: string): Promise<Therapist[]> => {
    try {
        const url = status ? `/therapists?status=${status}` : '/therapists';
        const response = await apiCall(url);
        return response.therapists || [];
    } catch (error) {
        console.error('Get all therapists error:', error);
        throw error;
    }
};

/**
 * Get single therapist by ID
 */
export const getTherapistById = async (id: string): Promise<Therapist> => {
    try {
        const response = await apiCall(`/therapists/${id}`);
        return response.therapist;
    } catch (error) {
        console.error('Get therapist by ID error:', error);
        throw error;
    }
};

/**
 * Update therapist status
 */
export const updateTherapistStatus = async (
    id: string,
    status: 'pending' | 'approved' | 'rejected'
): Promise<void> => {
    try {
        await apiCall(`/therapists/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status })
        });
    } catch (error) {
        console.error('Update therapist status error:', error);
        throw error;
    }
};

/**
 * Get therapist statistics
 */
export const getTherapistStats = async (): Promise<TherapistStats> => {
    try {
        const response = await apiCall('/therapists/stats');
        return response.stats;
    } catch (error) {
        console.error('Get therapist stats error:', error);
        throw error;
    }
};
