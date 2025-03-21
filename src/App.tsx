
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import KaaboExperience from "./pages/KaaboExperience";
import Vision from "./pages/Vision";
import Catalogue from "./pages/Catalogue";
import SummerTech from "./pages/SummerTech";
import OctoberTech from "./pages/OctoberTech";
import FashionWeek from "./pages/FashionWeek";
import LagosArtventure from "./pages/LagosArtventure";
import BehindTheScenes from "./pages/BehindTheScenes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/catalogue/detty-december" element={<Catalogue />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
