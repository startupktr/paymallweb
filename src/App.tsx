import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminBlogs from "./pages/admin/AdminBlogs";
import BlogEditor from "./pages/admin/BlogEditor";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundCancellation from "./pages/RefundCancellation";
import PricingPolicy from "./pages/PricingPolicy";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefundCancellation />} />
          <Route path="/pricing" element={<PricingPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/blogs/new" element={<BlogEditor />} />
          <Route path="/admin/blogs/:id/edit" element={<BlogEditor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
