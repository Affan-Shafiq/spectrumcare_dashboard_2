import { apiCall } from './authService';

export interface DailyStat {
    date: string;
    displayDate: string;
    users: number;
    screenings: number;
    posts: number;
}

export interface AnalyticsStats {
    activeUsers: {
        value: number;
        growth: number;
        label: string;
    };
    screenings: {
        value: number;
        growth: number;
        label: string;
    };
    communityPosts: {
        value: number;
        growth: number;
        label: string;
    };
}

export interface UserActivityResponse {
    success: boolean;
    stats: AnalyticsStats;
    chartData: DailyStat[];
}

/**
 * Get User Activity Analytics
 */
export const getUserActivityAnalytics = async (): Promise<UserActivityResponse> => {
    try {
        return await apiCall('/analytics/user-activity', {
            method: 'GET'
        });
    } catch (error) {
        console.error('Error fetching user activity analytics:', error);
        throw error;
    }
};
