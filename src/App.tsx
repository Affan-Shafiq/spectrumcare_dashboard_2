import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { DashboardHome } from "./pages/DashboardHome";
import { UserActivityPage } from "./pages/UserActivityPage";
import { MLReportsPage } from "./pages/MLReportsPage";
import { CommunityModerationPage } from "./pages/CommunityModerationPage";
import { ContentManagementPage } from "./pages/ContentManagementPage";
import { TherapistVerificationPage } from "./pages/TherapistVerificationPage";
import { AdminLayout } from "./components/Layout/AdminLayout";
import { LandingPage } from "./landing/LandingPage";
import { isAuthenticated, logout, verifyToken } from "./services/authService";
import { auth } from "./config/firebase";

const queryClient = new QueryClient();

const AppContent = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated on mount
    const checkAuth = async () => {
      const hasToken = isAuthenticated();

      if (hasToken) {
        try {
          // Verify token with backend
          await verifyToken();
          setIsAuth(true);
        } catch (error) {
          console.error('Token verification failed:', error);
          // Token expired or invalid, clear it
          await logout();
          setIsAuth(false);
          if (location.pathname.startsWith('/dashboard') || 
              location.pathname.startsWith('/user-activity') ||
              location.pathname.startsWith('/ml-reports') ||
              location.pathname.startsWith('/community') ||
              location.pathname.startsWith('/content') ||
              location.pathname.startsWith('/therapists')) {
            navigate('/', { replace: true });
          }
        }
      } else {
        setIsAuth(false);
      }

      setIsLoading(false);
    };

    checkAuth();

    // Listen for Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user && isAuth) {
        // User logged out from Firebase
        setIsAuth(false);
        navigate('/', { replace: true });
      }
    });

    return () => unsubscribe();
  }, [isAuth, navigate]);

  const handleLogin = () => {
    setIsAuth(true);
    // Navigate to dashboard after login
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuth(false);
      // Navigate to landing page and clear URL
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spectrum-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Sonner />
      {!isAuth ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <AdminLayout onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/user-activity" element={<UserActivityPage />} />
            <Route path="/ml-reports" element={<MLReportsPage />} />
            <Route path="/community" element={<CommunityModerationPage />} />
            <Route path="/content" element={<ContentManagementPage />} />
            <Route path="/therapists" element={<TherapistVerificationPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AdminLayout>
      )}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
