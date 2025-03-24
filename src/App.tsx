
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient();

// Protected route component for admin-only pages
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Protected route component for authenticated pages
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
