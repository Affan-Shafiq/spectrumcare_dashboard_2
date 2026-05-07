// Mock Data for SpectrumCare Admin Dashboard
// This data simulates backend responses for FYP demonstration

export interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  lastActive: string;
  screeningsCompleted: number;
  status: 'active' | 'inactive';
  riskLevel?: 'low' | 'moderate' | 'high';
}

export interface ScreeningResult {
  id: string;
  userId: string;
  userName: string;
  date: string;
  score: number;
  riskLevel: 'low' | 'moderate' | 'high';
  accuracy: number;
  duration: number; // in minutes
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  flagged: boolean;
  reports: number;
  status: 'approved' | 'pending' | 'removed';
  category: 'question' | 'experience' | 'support' | 'resource';
}

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  screeningsCompleted: number;
  communityPosts: number;
  avgAccuracy: number;
  newUsersThisWeek: number;
}

export interface MLModelStats {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  totalPredictions: number;
  lastUpdated: string;
}

export interface ActivityData {
  date: string;
  users: number;
  screenings: number;
  posts: number;
}

export interface TherapistProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  experience: number;
  qualifications: string[];
  location: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  documents: {
    license: string;
    certificate: string;
    resume: string;
  };
  rating?: number;
  sessionsCompleted?: number;
}

// Mock Dashboard Metrics
export const dashboardMetrics: DashboardMetrics = {
  totalUsers: 1247,
  activeUsers: 892,
  screeningsCompleted: 2156,
  communityPosts: 743,
  avgAccuracy: 97.8,
  newUsersThisWeek: 34
};

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Abdur Rahman',
    email: 'mani@email.com',
    registrationDate: '2024-01-15',
    lastActive: '2024-01-20',
    screeningsCompleted: 3,
    status: 'active',
    riskLevel: 'moderate'
  },
  {
    id: '2',
    name: 'Hammad',
    email: 'hammad@email.com',
    registrationDate: '2024-01-10',
    lastActive: '2024-01-19',
    screeningsCompleted: 1,
    status: 'active',
    riskLevel: 'low'
  },
  {
    id: '3',
    name: 'Affan',
    email: 'affan@email.com',
    registrationDate: '2024-01-05',
    lastActive: '2024-01-15',
    screeningsCompleted: 5,
    status: 'inactive',
    riskLevel: 'high'
  }
];

// Mock Screening Results
export const mockScreeningResults: ScreeningResult[] = [
  {
    id: 'sc1',
    userId: '1',
    userName: 'Ali',
    date: '2024-01-20',
    score: 65,
    riskLevel: 'moderate',
    accuracy: 92.9,
    duration: 15
  },
  {
    id: 'sc2',
    userId: '2',
    userName: 'Usman',
    date: '2024-01-19',
    score: 35,
    riskLevel: 'low',
    accuracy: 93.7,
    duration: 12
  },
  {
    id: 'sc3',
    userId: '3',
    userName: 'Umer',
    date: '2024-01-18',
    score: 78,
    riskLevel: 'high',
    accuracy: 94.1,
    duration: 18
  }
];

// Mock Community Posts
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post1',
    userId: '1',
    userName: 'Hammad',
    content: 'Looking for advice on helping my child with social interactions at school. Any tips from other parents?',
    timestamp: '2024-01-20T10:30:00Z',
    flagged: false,
    reports: 0,
    status: 'approved',
    category: 'question'
  },
  {
    id: 'post2',
    userId: '2',
    userName: 'Meekal',
    content: 'Great experience with the screening process! Very thorough and helpful.',
    timestamp: '2024-01-19T15:45:00Z',
    flagged: false,
    reports: 0,
    status: 'approved',
    category: 'experience'
  },
  {
    id: 'post3',
    userId: '3',
    userName: 'Anonymous User',
    content: 'This content has been flagged for inappropriate language and requires moderation review.',
    timestamp: '2024-01-18T20:15:00Z',
    flagged: true,
    reports: 3,
    status: 'pending',
    category: 'support'
  },
  {
    id: 'post4',
    userId: '4',
    userName: 'Ammar',
    content: 'Sharing some helpful resources I found for autism support groups in our area.',
    timestamp: '2024-01-17T09:20:00Z',
    flagged: false,
    reports: 0,
    status: 'approved',
    category: 'resource'
  }
];

// Mock ML Model Statistics
export const mockMLStats: MLModelStats = {
  accuracy: 98,
  precision: 97.5,
  recall: 98.7,
  f1Score: 89.4,
  totalPredictions: 1024,
  lastUpdated: '2025-10-09T08:00:00Z'
};

// Mock Activity Data for Charts
export const mockActivityData: ActivityData[] = [
  { date: '2024-01-14', users: 45, screenings: 23, posts: 12 },
  { date: '2024-01-15', users: 52, screenings: 31, posts: 15 },
  { date: '2024-01-16', users: 48, screenings: 28, posts: 9 },
  { date: '2024-01-17', users: 61, screenings: 35, posts: 18 },
  { date: '2024-01-18', users: 55, screenings: 42, posts: 14 },
  { date: '2024-01-19', users: 67, screenings: 38, posts: 21 },
  { date: '2024-01-20', users: 73, screenings: 45, posts: 16 }
];

// Mock Therapist Applications
export const mockTherapists: TherapistProfile[] = [
  {
    id: 'therapist1',
    name: 'Dr. Aisha Malik',
    email: 'aisha.malik@email.com',
    phone: '+92-300-1234567',
    specialization: ['ABA Therapy', 'Speech Therapy', 'Social Skills Training'],
    experience: 8,
    qualifications: ['Ph.D. Clinical Psychology', 'Board Certified Behavior Analyst'],
    location: 'Lahore, Pakistan',
    applicationDate: '2024-01-18',
    status: 'pending',
    documents: {
      license: 'license_aisha.pdf',
      certificate: 'certificate_aisha.pdf',
      resume: 'resume_aisha.pdf'
    }
  },
  {
    id: 'therapist2',
    name: 'Dr. Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+92-321-9876543',
    specialization: ['Occupational Therapy', 'Sensory Integration'],
    experience: 12,
    qualifications: ['M.S. Occupational Therapy', 'Sensory Integration Certification'],
    location: 'Karachi, Pakistan',
    applicationDate: '2024-01-16',
    status: 'approved',
    documents: {
      license: 'license_ahmed.pdf',
      certificate: 'certificate_ahmed.pdf',
      resume: 'resume_ahmed.pdf'
    },
    rating: 4.8,
    sessionsCompleted: 156
  },
  {
    id: 'therapist3',
    name: 'Ms. Fatima Sheikh',
    email: 'fatima.sheikh@email.com',
    phone: '+92-333-5551234',
    specialization: ['Play Therapy', 'Family Counseling'],
    experience: 5,
    qualifications: ['M.A. Psychology', 'Play Therapy Certification'],
    location: 'Islamabad, Pakistan',
    applicationDate: '2024-01-14',
    status: 'under-review',
    documents: {
      license: 'license_fatima.pdf',
      certificate: 'certificate_fatima.pdf',
      resume: 'resume_fatima.pdf'
    }
  }
];
