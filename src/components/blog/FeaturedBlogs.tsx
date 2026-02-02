import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation';
import { useFeaturedBlogs, usePublishedBlogs } from '@/hooks/useBlogs';
import BlogCard from './BlogCard';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedBlogs = () => {
  // Try featured first, fall back to latest published
  const { data: featuredBlogs, isLoading: loadingFeatured } = useFeaturedBlogs(3);
  const { data: latestBlogs, isLoading: loadingLatest } = usePublishedBlogs(3);

  const blogs = featuredBlogs && featuredBlogs.length > 0 ? featuredBlogs : latestBlogs;
  const isLoading = loadingFeatured || loadingLatest;

  // Don't render section if no blogs
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
            Stay informed about the future of retail, industry trends, and PayMall updates.
          </p>
        </ScrollAnimation>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl border border-border/50 overflow-hidden">
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
          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {blogs?.map((blog) => (
              <StaggerItem key={blog.id}>
                <BlogCard blog={blog} />
              </StaggerItem>
            ))}
          </StaggerContainer>
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
