# SpectrumCare Admin Dashboard - FYP Documentation

## Project Overview

**Project Name**: SpectrumCare: An Autism Screening & Care App  
**Component**: Admin Dashboard  
**Technology Stack**: MERN (MongoDB, Express, React, Node.js)  
**Purpose**: FYP 2 Demonstration (50-70% functionality)  
**Development Phase**: Prototype with Mock Data  

## 1. Project Architecture

### 1.1 Technology Stack
- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui components
- **Charts**: Recharts library
- **Routing**: React Router v6
- **State Management**: React hooks + TanStack Query
- **Development**: Hot module replacement for rapid development

### 1.2 Design System
The dashboard implements a consistent design system based on the SpectrumCare brand:

#### Color Palette
- **#D7DEE5** - Main background (app background, input areas)
- **#F4F5F7** - Card backgrounds (panels, containers, dashboard sections)
- **#2E3039** - Primary text color and dark buttons with white text
- **#FF7700** - Primary accent (call-to-action buttons, highlights)
- **#26694B** - Secondary accent (success states, secondary buttons)
- **#3D9CE1** - Info accent (links, analytics highlights, alternate CTAs)

#### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive sizing** with semantic text classes

#### Components
- Cards with soft shadows and rounded corners
- Gradient buttons for primary actions
- Consistent spacing and typography scale
- Accessible color contrasts
- Responsive grid layouts

## 2. Application Structure

### 2.1 File Organization
```
src/
├── components/
│   ├── Layout/
│   │   ├── AdminSidebar.tsx      # Navigation sidebar
│   │   └── AdminLayout.tsx       # Main layout wrapper
│   └── ui/                       # Reusable UI components
├── data/
│   └── mockData.ts              # Mock data for demonstration
├── pages/
│   ├── LoginPage.tsx            # Authentication page
│   ├── DashboardHome.tsx        # Main dashboard overview  
│   ├── UserActivityPage.tsx     # User analytics & charts
│   ├── MLReportsPage.tsx        # ML model performance
│   └── CommunityModerationPage.tsx # Community management
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
└── App.tsx                      # Main application component
```

### 2.2 Component Architecture

#### Layout Components
- **AdminLayout**: Main wrapper providing sidebar navigation and content area
- **AdminSidebar**: Collapsible navigation with active route highlighting
- **Responsive design**: Works on desktop and tablet devices

#### Page Components
Each page is a self-contained React component with:
- Semantic HTML structure
- Accessible navigation
- Error handling
- Loading states
- Mock data integration

## 3. Features Implementation

### 3.1 Authentication System
**File**: `src/pages/LoginPage.tsx`

**Features**:
- Mock authentication with predefined credentials
- Form validation
- Loading states
- Toast notifications
- Responsive design

**Demo Credentials**:
- Username: `admin@spectrumcare.com`
- Password: `admin123`

**Implementation Details**:
- Uses React hooks for state management
- Simulates API call with setTimeout
- Validates credentials against mock data
- Provides visual feedback for success/error states

### 3.2 Dashboard Home
**File**: `src/pages/DashboardHome.tsx`

**Features**:
- Key metrics overview with trend indicators
- Responsive grid layout
- Icon-based metric cards
- Secondary metrics display
- System status monitoring

**Metrics Displayed**:
- Total registered users (1,247)
- Active users this month (892)
- Completed screenings (2,156)
- Community posts (743)
- ML model accuracy (89.4%)
- New users this week (34)

**Technical Implementation**:
- Reusable MetricCard component
- Dynamic trend calculations
- Icon integration with Lucide React
- Semantic color coding

### 3.3 User Activity Analytics
**File**: `src/pages/UserActivityPage.tsx`

**Features**:
- Interactive charts using Recharts
- Daily user activity trends
- Screening completion metrics
- Community engagement tracking
- Combined activity overview

**Chart Types**:
- Line charts for user activity trends
- Bar charts for screening completion
- Multi-line charts for combined metrics
- Custom tooltips with formatted data

**Data Visualization**:
- 7-day activity window
- Color-coded metrics
- Responsive chart containers
- Accessible data presentation

### 3.4 ML Model Reports
**File**: `src/pages/MLReportsPage.tsx`

**Features**:
- Model performance metrics (Accuracy, Precision, Recall, F1 Score)
- Performance progress bars
- Recent screening results table
- Model metadata display
- Key insights and recommendations

**Performance Metrics**:
- Overall Accuracy: 89.4%
- Precision: 87.2%
- Recall: 91.8%
- F1 Score: 89.4%
- Total Predictions: 2,156

**Technical Features**:
- Dynamic badge colors based on risk levels
- Sortable data tables
- Export functionality (UI only)
- Refresh data controls

### 3.5 Community Moderation
**File**: `src/pages/CommunityModerationPage.tsx`

**Features**:
- Post moderation queue
- Status filtering (All, Pending, Flagged, Approved, Removed)
- Approve/Remove actions
- Content categorization
- Moderation statistics
- Guidelines reference

**Moderation Actions**:
- Approve flagged posts
- Remove inappropriate content
- Restore removed posts
- Track moderation statistics

**Data Management**:
- Local state updates
- Toast notifications for actions
- Real-time UI updates
- Filtering and sorting

## 4. Mock Data Implementation

### 4.1 Data Structure
**File**: `src/data/mockData.ts`

The mock data simulates a realistic autism screening and care platform with:

#### User Data
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  lastActive: string;
  screeningsCompleted: number;
  status: 'active' | 'inactive';
  riskLevel?: 'low' | 'moderate' | 'high';
}
```

#### Screening Results
```typescript
interface ScreeningResult {
  id: string;
  userId: string;
  userName: string;
  date: string;
  score: number;
  riskLevel: 'low' | 'moderate' | 'high';
  accuracy: number;
  duration: number;
}
```

#### Community Posts
```typescript
interface CommunityPost {
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
```

### 4.2 Data Simulation Strategy
- **Realistic Values**: All mock data represents plausible scenarios
- **Varied States**: Mix of approved, pending, and flagged content
- **Time-based Data**: Activity data spans 7 days for trend analysis
- **User Diversity**: Different user types and engagement levels
- **Risk Distribution**: Balanced low, moderate, and high-risk cases

## 5. Technical Implementation Details

### 5.1 State Management
- **React Hooks**: useState, useEffect for local component state
- **Context**: Authentication state managed at app level
- **Local Storage**: Could be added for persistence (not implemented)

### 5.2 Routing Implementation
```typescript
// Main routing structure in App.tsx
<Routes>
  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  <Route path="/dashboard" element={<DashboardHome />} />
  <Route path="/user-activity" element={<UserActivityPage />} />
  <Route path="/ml-reports" element={<MLReportsPage />} />
  <Route path="/community" element={<CommunityModerationPage />} />
  <Route path="*" element={<Navigate to="/dashboard" replace />} />
</Routes>
```

### 5.3 Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid systems**: CSS Grid and Flexbox for layouts
- **Collapsible sidebar** for smaller screens

### 5.4 Accessibility Features
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **ARIA labels**: Screen reader support
- **Keyboard navigation**: Tab order and focus management
- **Color contrast**: WCAG AA compliance
- **Alternative text**: Icons and images have descriptions

## 6. Performance Considerations

### 6.1 Optimization Strategies
- **Code splitting**: React lazy loading for pages (could be implemented)
- **Memoization**: React.memo for expensive components
- **Virtual scrolling**: For large data tables (future enhancement)
- **Image optimization**: Proper sizing and formats

### 6.2 Bundle Size Management
- **Tree shaking**: Unused code elimination
- **Component library**: Only import needed components
- **Chart library**: Recharts provides good performance
- **CSS optimization**: Tailwind purging unused styles

## 7. Development Workflow

### 7.1 Setup Instructions
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 7.2 Development Features
- **Hot Module Replacement**: Instant updates during development
- **TypeScript**: Type safety and better IDE support
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (can be added)

## 8. Future Enhancements (FYP 3)

### 8.1 Backend Integration
- **REST API**: Connect to Express.js backend
- **Database**: MongoDB integration
- **Authentication**: JWT token-based auth
- **Real-time Updates**: WebSocket connections

### 8.2 Advanced Features
- **User Management**: CRUD operations for users
- **Advanced Analytics**: More detailed reporting
- **Notifications**: Real-time admin notifications
- **Audit Logs**: Track all admin actions
- **Export Features**: PDF/CSV report generation

### 8.3 Security Enhancements
- **Role-based Access**: Different admin permission levels
- **Input Validation**: Server-side validation
- **Rate Limiting**: API protection
- **Data Encryption**: Sensitive data protection

## 9. Demonstration Points for FYP 2

### 9.1 Technical Competency
- **React Best Practices**: Functional components, hooks, modern patterns
- **TypeScript Usage**: Type safety and developer experience
- **Responsive Design**: Professional UI that works across devices
- **Component Architecture**: Reusable, maintainable code structure

### 9.2 User Experience
- **Intuitive Navigation**: Clear information architecture
- **Data Visualization**: Meaningful charts and metrics
- **Accessibility**: Inclusive design principles
- **Performance**: Fast loading and smooth interactions

### 9.3 Project Management
- **Code Organization**: Clear file structure and naming
- **Documentation**: Comprehensive technical documentation
- **Version Control**: Git best practices (if using)
- **Scalability**: Architecture ready for future expansion

## 10. Evaluation Criteria Addressed

### 10.1 Functionality (50-70% implemented)
✅ **Authentication System**: Login with mock credentials  
✅ **Dashboard Overview**: Key metrics and system status  
✅ **User Analytics**: Activity tracking and visualization  
✅ **ML Performance**: Model metrics and screening results  
✅ **Content Moderation**: Community post management  

### 10.2 Technical Implementation
✅ **Modern Framework**: React with TypeScript  
✅ **Professional UI**: Consistent design system  
✅ **Responsive Design**: Works on multiple screen sizes  
✅ **Data Management**: Structured mock data approach  
✅ **Code Quality**: Clean, documented, maintainable code  

### 10.3 User Interface
✅ **Professional Appearance**: Healthcare-appropriate design  
✅ **Accessibility**: Screen reader and keyboard friendly  
✅ **Usability**: Intuitive navigation and interactions  
✅ **Visual Hierarchy**: Clear information organization  
✅ **Brand Consistency**: SpectrumCare color scheme and typography  

This documentation provides a comprehensive overview of the SpectrumCare Admin Dashboard implementation for FYP 2 evaluation, demonstrating both technical competency and practical application of modern web development practices.