import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Retry dynamic imports on failure (handles stale chunks after rebuilds)
const lazyRetry = (importFn: () => Promise<any>) =>
  lazy(() =>
    importFn().catch(() => {
      window.location.reload();
      return new Promise(() => {}); // never resolves, page will reload
    })
  );

// Lazy load non-critical routes to reduce initial bundle size
const Blog = lazyRetry(() => import("./pages/Blog"));
const BlogPost = lazyRetry(() => import("./pages/BlogPost"));
const AdminLogin = lazyRetry(() => import("./pages/admin/AdminLogin"));
const AdminBlogs = lazyRetry(() => import("./pages/admin/AdminBlogs"));
const BlogEditor = lazyRetry(() => import("./pages/admin/BlogEditor"));
const TermsConditions = lazyRetry(() => import("./pages/TermsConditions"));
const PrivacyPolicy = lazyRetry(() => import("./pages/PrivacyPolicy"));
const RefundCancellation = lazyRetry(() => import("./pages/RefundCancellation"));
const PricingPolicy = lazyRetry(() => import("./pages/PricingPolicy"));
const Contact = lazyRetry(() => import("./pages/Contact"));
const AboutUs = lazyRetry(() => import("./pages/AboutUs"));
const NotFound = lazyRetry(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
