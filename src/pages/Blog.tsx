import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation';
import { usePublishedBlogs } from '@/hooks/useBlogs';
import BlogCard from '@/components/blog/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import logo from '@/assets/logo.png';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { data: blogs, isLoading } = usePublishedBlogs();

  // Get all unique tags
  const allTags = blogs
    ? [...new Set(blogs.flatMap((blog) => blog.tags || []))]
    : [];

  // Filter blogs
  const filteredBlogs = blogs?.filter((blog) => {
    const matchesSearch =
      !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = !selectedTag || blog.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-primary-foreground py-6 sticky top-0 z-50">
        <div className="container px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
              <img src={logo} alt="PayMall" className="w-full h-full object-cover rounded-sm" />
            </div>
            <span className="text-xl font-display font-bold">PayMall</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 gradient-subtle">
        <div className="container px-4">
          <ScrollAnimation className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              PayMall Blog
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover insights on retail technology, checkout innovation, and the future of shopping.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full"
              />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Tags */}
      {allTags.length > 0 && (
        <section className="py-6 border-b border-border">
          <div className="container px-4">
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <Badge
                variant={selectedTag === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : filteredBlogs && filteredBlogs.length > 0 ? (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {filteredBlogs.map((blog) => (
                <StaggerItem key={blog.id}>
                  <BlogCard blog={blog} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {searchQuery || selectedTag
                  ? 'No articles found matching your criteria.'
                  : 'No articles published yet. Check back soon!'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-8">
        <div className="container px-4 text-center">
          <p className="text-sm text-primary-foreground/50">
            © 2024 PayMall. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Blog;
