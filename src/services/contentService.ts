import { apiCall } from './authService';

// TypeScript interfaces
export interface Blog {
    id: string;
    title: string;
    summary: string;
    content: string;
    authorName: string;
    authorRole?: string;
    authorCredentials?: string;
    category: string;
    tags?: string[];
    isHidden: boolean;
    publicationStatus?: string;
    qualityScore?: number;
    audienceType?: string;
    createdAt: any;
    updatedAt: any;
    workflow?: {
        state: string;
        reviewDecision?: string;
        reviewedAt?: any;
        publishedAt?: any;
    };
}

export interface Video {
    id: string;
    title: string;
    youtubeLink: string;
    summary: string;
    category: string;
    sourceOrg?: string;
    displaySource?: string;
    whyThisHelps?: string;
    sourceCredibility?: string;
    minAge?: number;
    maxAge?: number;
    isHidden: boolean;
    tags?: string[];
    urduVersion?: {
        title: string;
        summary: string;
        whyThisHelps: string;
    };
    createdAt: any;
    updatedAt: any;
}

export interface CreateBlogData {
    title: string;
    summary: string;
    content: string;
    category: string;
    authorName: string;
    authorRole?: string;
    authorCredentials?: string;
    tags?: string[];
    audienceType?: string;
}

export interface UpdateBlogData extends Partial<CreateBlogData> {}

export interface CreateVideoData {
    title: string;
    youtubeLink: string;
    summary: string;
    category: string;
    sourceOrg?: string;
    displaySource?: string;
    whyThisHelps?: string;
    sourceCredibility?: string;
    minAge?: number;
    maxAge?: number;
    tags?: string[];
    urduVersion?: {
        title: string;
        summary: string;
        whyThisHelps: string;
    };
}

export interface UpdateVideoData extends Partial<CreateVideoData> {}

// ==================== BLOG SERVICES ====================

/**
 * Get all blogs
 */
export const getAllBlogs = async (includeHidden: boolean = true): Promise<Blog[]> => {
    try {
        const response = await apiCall(`/content/blogs?includeHidden=${includeHidden}`);
        return response.blogs || [];
    } catch (error) {
        console.error('Get all blogs error:', error);
        throw error;
    }
};

/**
 * Get single blog by ID
 */
export const getBlogById = async (id: string): Promise<Blog> => {
    try {
        const response = await apiCall(`/content/blogs/${id}`);
        return response.blog;
    } catch (error) {
        console.error('Get blog by ID error:', error);
        throw error;
    }
};

/**
 * Create new blog
 */
export const createBlog = async (data: CreateBlogData): Promise<string> => {
    try {
        const response = await apiCall('/content/blogs', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.blogId;
    } catch (error) {
        console.error('Create blog error:', error);
        throw error;
    }
};

/**
 * Update blog
 */
export const updateBlog = async (id: string, data: UpdateBlogData): Promise<void> => {
    try {
        await apiCall(`/content/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Update blog error:', error);
        throw error;
    }
};

/**
 * Toggle blog visibility
 */
export const toggleBlogVisibility = async (id: string): Promise<boolean> => {
    try {
        const response = await apiCall(`/content/blogs/${id}/toggle-visibility`, {
            method: 'PATCH'
        });
        return response.isHidden;
    } catch (error) {
        console.error('Toggle blog visibility error:', error);
        throw error;
    }
};

/**
 * Delete blog
 */
export const deleteBlog = async (id: string): Promise<void> => {
    try {
        await apiCall(`/content/blogs/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Delete blog error:', error);
        throw error;
    }
};

// ==================== VIDEO SERVICES ====================

/**
 * Get all videos
 */
export const getAllVideos = async (includeHidden: boolean = true): Promise<Video[]> => {
    try {
        const response = await apiCall(`/content/videos?includeHidden=${includeHidden}`);
        return response.videos || [];
    } catch (error) {
        console.error('Get all videos error:', error);
        throw error;
    }
};

/**
 * Get single video by ID
 */
export const getVideoById = async (id: string): Promise<Video> => {
    try {
        const response = await apiCall(`/content/videos/${id}`);
        return response.video;
    } catch (error) {
        console.error('Get video by ID error:', error);
        throw error;
    }
};

/**
 * Create new video
 */
export const createVideo = async (data: CreateVideoData): Promise<string> => {
    try {
        const response = await apiCall('/content/videos', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.videoId;
    } catch (error) {
        console.error('Create video error:', error);
        throw error;
    }
};

/**
 * Update video
 */
export const updateVideo = async (id: string, data: UpdateVideoData): Promise<void> => {
    try {
        await apiCall(`/content/videos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Update video error:', error);
        throw error;
    }
};

/**
 * Toggle video visibility
 */
export const toggleVideoVisibility = async (id: string): Promise<boolean> => {
    try {
        const response = await apiCall(`/content/videos/${id}/toggle-visibility`, {
            method: 'PATCH'
        });
        return response.isHidden;
    } catch (error) {
        console.error('Toggle video visibility error:', error);
        throw error;
    }
};

/**
 * Delete video
 */
export const deleteVideo = async (id: string): Promise<void> => {
    try {
        await apiCall(`/content/videos/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Delete video error:', error);
        throw error;
    }
};
