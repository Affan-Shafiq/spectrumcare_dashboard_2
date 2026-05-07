import { auth } from '@/config/firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get auth token from localStorage
 */
export const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
};

/**
 * Remove auth token from localStorage
 */
export const removeAuthToken = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};

/**
 * Get fresh token from Firebase
 */
export const getFreshToken = async (): Promise<string | null> => {
    try {
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken(true); // Force refresh
            localStorage.setItem('authToken', token);
            return token;
        }
        return null;
    } catch (error) {
        console.error('Error getting fresh token:', error);
        return null;
    }
};

/**
 * Verify token with backend
 */
export const verifyToken = async (): Promise<any> => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Token verification failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Token verification error:', error);
        throw error;
    }
};

/**
 * Get admin profile
 */
export const getAdminProfile = async (): Promise<any> => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Get profile error:', error);
        throw error;
    }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
    try {
        await auth.signOut();
        removeAuthToken();
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

/**
 * Generic API call helper with auth
 */
export const apiCall = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<any> => {
    try {
        const token = getAuthToken();

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.error?.message || 'API request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};
