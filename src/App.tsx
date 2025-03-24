
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import KaaboExperience from "./pages/KaaboExperience";
import Vision from "./pages/Vision";
import Catalogue from "./pages/Catalogue";
import SummerTech from "./pages/SummerTech";
import OctoberTech from "./pages/OctoberTech";
import FashionWeek from "./pages/FashionWeek";
import LagosArtventure from "./pages/LagosArtventure";
import BehindTheScenes from "./pages/BehindTheScenes";
import DettyDecember from "./pages/DettyDecember";
import NotFound from "./pages/NotFound";
import Enroll from "./pages/Enroll";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AuthDialogProvider } from "./contexts/AuthDialogProvider";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Check for auth token in URL and save it to localStorage
const CheckAuthToken = () => {
  const location = useLocation();
  const { token, refreshUserData } = useAuth();
  
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const authToken = query.get('auth_token');
    
    if (authToken && !token) {
      console.log('Found auth token in URL, restoring session');
      localStorage.setItem('auth_token', authToken);
      refreshUserData();
      
      // Remove the token from the URL to avoid exposing it
      const newUrl = window.location.pathname + 
        (location.search ? location.search.replace(/(&|\?)auth_token=[^&]+/, '') : '');
      window.history.replaceState({}, '', newUrl);
    }
  }, [location, token, refreshUserData]);
  
  return null;
};

// Protected route component for admin-only pages
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    } else if (!isAdmin) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate, location]);
  
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  return <>{children}</>;
};

// Protected route component for authenticated pages
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/experience" element={<KaaboExperience />} />
      <Route path="/vision" element={<Vision />} />
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/catalogue/summer-tech" element={<SummerTech />} />
      <Route path="/catalogue/october-tech" element={<OctoberTech />} />
      <Route path="/catalogue/fashion-week" element={<FashionWeek />} />
      <Route path="/catalogue/lagos-artventure" element={<LagosArtventure />} />
      <Route path="/catalogue/behind-the-scenes" element={<BehindTheScenes />} />
      <Route path="/catalogue/detty-december" element={<DettyDecember />} />
      <Route path="/enroll" element={<Enroll />} />
      <Route path="/enroll/:step" element={<Enroll />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AuthDialogProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <CheckAuthToken />
            <AppRoutes />
          </BrowserRouter>
        </AuthDialogProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
