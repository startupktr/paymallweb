import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation';
import { usePublishedBlogs } from '@/hooks/useBlogs';
import BlogCard from '@/components/blog/BlogCard';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import { Skeleton } from '@/components/ui/skeleton';
import logo from '@/assets/logo.png';
import { motion } from 'framer-motion';

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

  // Featured blog (first one)
  const featuredBlog = filteredBlogs?.[0];
  const regularBlogs = filteredBlogs?.slice(1);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="bg-foreground text-primary-foreground py-6 sticky top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.header>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="container px-4 relative z-10">
          <ScrollAnimation className="text-center max-w-3xl mx-auto">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Insights & Innovation</span>
            </motion.div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              PayMall{' '}
              <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover insights on retail technology, checkout innovation, and the future of shopping in India.
            </p>

            {/* Search */}
            <motion.div 
              className="relative max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-2xl border-2 border-border focus:border-primary transition-colors"
              />
            </motion.div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Tags */}
      {allTags.length > 0 && (
        <section className="py-6 border-b border-border bg-background/80 backdrop-blur-sm top-[72px] z-40">
          <div className="container px-4">
            <motion.div 
              className="flex flex-wrap items-center gap-2 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Badge
                variant={selectedTag === null ? 'default' : 'outline'}
                className={`cursor-pointer transition-all px-4 py-2 ${selectedTag === null ? 'shadow-md' : 'hover:bg-muted'}`}
                onClick={() => setSelectedTag(null)}
              >
                All Articles
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all px-4 py-2 ${selectedTag === tag ? 'shadow-md' : 'hover:bg-muted'}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Blog */}
      {!isLoading && featuredBlog && !searchQuery && !selectedTag && (
        <section className="py-12 bg-background">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <BlogCard blog={featuredBlog} featured />
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                  <Skeleton className="h-52 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : regularBlogs && regularBlogs.length > 0 ? (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {(searchQuery || selectedTag ? filteredBlogs : regularBlogs)?.map((blog) => (
                <StaggerItem key={blog.id}>
                  <BlogCard blog={blog} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : filteredBlogs && filteredBlogs.length === 1 && !searchQuery && !selectedTag ? (
            // Only featured blog exists, no regular blogs
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                More articles coming soon!
              </p>
            </div>
          ) : (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">
                  {searchQuery || selectedTag
                    ? 'No articles found matching your criteria.'
                    : 'No articles published yet. Check back soon!'}
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                <img src={logo} alt="PayMall" className="w-full h-full object-cover rounded-sm" />
              </div>
              <span className="text-xl font-display font-bold">PayMall</span>
            </Link>
            <p className="text-sm text-primary-foreground/50">
              © 2024 PayMall. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Blog;