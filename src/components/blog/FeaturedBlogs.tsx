import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "@/components/ScrollAnimation";
import { useFeaturedBlogs, usePublishedBlogs } from "@/hooks/useBlogs";
import BlogCard from "./BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const FeaturedBlogs = () => {
  const { data: featuredBlogs, isLoading: loadingFeatured } = useFeaturedBlogs(3);
  const { data: latestBlogs, isLoading: loadingLatest } = usePublishedBlogs(3);

  const blogs =
    featuredBlogs && featuredBlogs.length > 0 ? featuredBlogs : latestBlogs;

  const isLoading = loadingFeatured || loadingLatest;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const extendedBlogs =
    blogs && blogs.length > 0
      ? [blogs[blogs.length - 1], ...blogs, blogs[0]]
      : [];

  // Active indicator index
  const realIndex =
    blogs && blogs.length > 0
      ? (currentIndex - 1 + blogs.length) % blogs.length
      : 0;

  // Auto slide
  useEffect(() => {
    if (!blogs || blogs.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [blogs]);

  const handleTransitionEnd = () => {
    if (!blogs || blogs.length === 0) return;

    if (currentIndex === extendedBlogs.length - 1) {
      setTransition(false);
      setCurrentIndex(1);
    }

    if (currentIndex === 0) {
      setTransition(false);
      setCurrentIndex(blogs.length);
    }
  };

  useEffect(() => {
    if (!transition) {
      const timer = setTimeout(() => setTransition(true), 50);
      return () => clearTimeout(timer);
    }
  }, [transition]);

  if (!isLoading && (!blogs || blogs.length === 0)) {
    return null;
  }

  return (
    <section id="blogs" className="py-24 bg-background">
      <div className="container px-4">
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            From Our Blog
          </span>

          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Insights & Updates
          </h2>

          <p className="text-lg text-muted-foreground">
            Stay informed about the future of retail, industry trends, and
            PayMall updates.
          </p>
        </ScrollAnimation>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Mobile Infinite Slider */}
            <div className="md:hidden overflow-hidden relative">
              <div
                className="flex"
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: transition
                    ? "transform 0.7s ease-in-out"
                    : "none",
                }}
              >
                {extendedBlogs.map((blog, index) => (
                  <div key={index} className="min-w-full px-2">
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>

              {/* Bottom Banner Indicator */}
              <div className="flex justify-center items-center gap-3 mt-5">
                {blogs?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTransition(true);
                      setCurrentIndex(index + 1);
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      realIndex === index
                        ? "w-8 h-3 bg-primary"
                        : "w-3 h-3 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <StaggerContainer
              className="hidden md:grid md:grid-cols-3 gap-8"
              staggerDelay={0.15}
            >
              {blogs?.map((blog) => (
                <StaggerItem key={blog.id}>
                  <BlogCard blog={blog} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </>
        )}

        <ScrollAnimation delay={0.3} className="text-center mt-12">
          <Link to="/blog">
            <Button variant="outline" size="lg" className="group">
              <BookOpen className="w-5 h-5 mr-2" />
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
