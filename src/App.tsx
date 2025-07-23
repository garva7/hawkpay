import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import TransactionHistory from "./pages/TransactionHistory";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/dashboard-layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/payment" element={<DashboardLayout><Payment /></DashboardLayout>} />
          <Route path="/history" element={<DashboardLayout><TransactionHistory /></DashboardLayout>} />
          <Route path="/events" element={<DashboardLayout><Events /></DashboardLayout>} />
          <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
          <Route path="/security" element={<DashboardLayout><Security /></DashboardLayout>} />
          <Route path="/support" element={<DashboardLayout><Support /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
