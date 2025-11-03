
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import EarningsPage from "./pages/EarningsPage";
import ProfilePage from "./pages/ProfilePage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { OrderNotificationCard } from "./components/orders/OrderNotificationCard";
import { useOrderNotification } from "./hooks/useOrderNotification";

const queryClient = new QueryClient();

const AppContent = () => {
  const { currentNotification, isVisible, handleAccept, handleReject } = useOrderNotification();

  return (
    <>
      <Toaster />
      <Sonner />
      {currentNotification && (
        <OrderNotificationCard
          order={currentNotification}
          isVisible={isVisible}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/orders" element={
            <Layout>
              <OrdersPage />
            </Layout>
          } />
          <Route path="/order/:orderId" element={<OrderDetailsPage />} />
          <Route path="/earnings" element={
            <Layout>
              <EarningsPage />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout>
              <ProfilePage />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
