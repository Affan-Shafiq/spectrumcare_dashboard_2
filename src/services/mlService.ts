import { apiCall } from './authService';

export interface MLStats {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    avgConfidence: number;
    totalPredictions: number;
    totalEvaluated: number;
    lastUpdated: string;
    modelVersion: string;
    modelType: string;
}

export interface ScreeningResult {
    id: string;
    childId: string;
    userName?: string; 
    date: string;
    score: number;
    riskLevel: string;
    accuracy: number;
    duration?: number;
    hasGroundTruth: boolean;
}

export interface MLStatsResponse {
    success: boolean;
    stats: MLStats;
    confusionMatrix: {
        tp: number;
        tn: number;
        fp: number;
        fn: number;
    };
}

export interface MLResultsResponse {
    success: boolean;
    results: ScreeningResult[];
}

/**
 * Get ML Performance Statistics
 */
export const getMLStats = async (): Promise<MLStatsResponse> => {
    try {
        return await apiCall('/ml/stats', {
            method: 'GET'
        });
    } catch (error) {
        console.error('Error fetching ML stats:', error);
        throw error;
    }
};

/**
 * Get Recent Screening Results
 */
export const getRecentMLResults = async (): Promise<MLResultsResponse> => {
    try {
        return await apiCall('/ml/recent-results', {
            method: 'GET'
        });
    } catch (error) {
        console.error('Error fetching recent ML results:', error);
        throw error;
    }
};
