import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { useBlogBySlug, usePublishedBlogs } from '@/hooks/useBlogs';
import BlogCard from '@/components/blog/BlogCard';
import SocialShareButtons from '@/components/blog/SocialShareButtons';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import ReadingProgress from '@/components/blog/ReadingProgress';
import logo from '@/assets/logo.png';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: blog, isLoading, error } = useBlogBySlug(slug || '');
  const { data: relatedBlogs } = usePublishedBlogs(4);

  // Filter out current blog from related
  const otherBlogs = relatedBlogs?.filter((b) => b.slug !== slug).slice(0, 3);

  // Update page title and meta
  useEffect(() => {
    if (blog) {
      document.title = blog.meta_title || `${blog.title} | PayMall Blog`;
      
      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', blog.meta_description || blog.excerpt);
      }
    }
    
    return () => {
      document.title = 'PayMall - Scan Pay & Go';
    };
  }, [blog]);

  if (error) {
    navigate('/blog');
    return null;
  }

  const formattedDate = blog?.published_at
    ? new Date(blog.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const wordCount = blog?.content.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = blog?.title || '';

  return (
    <main className="min-h-screen bg-background">
      {/* Reading Progress */}
      <ReadingProgress />

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
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Articles
            </Button>
          </Link>
        </div>
      </motion.header>

      {isLoading ? (
        <div className="container px-4 py-16 max-w-4xl mx-auto">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-2/3 mb-8" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ) : blog ? (
        <>
          {/* Hero Section with Featured Image */}
          {blog.featured_image && (
            <motion.section 
              className="relative h-[50vh] md:h-[60vh] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </motion.section>
          )}

          {/* Article */}
          <article className={`py-16 ${blog.featured_image ? '-mt-32 relative z-10' : ''}`}>
            <div className="container px-4 max-w-4xl mx-auto">
              <ScrollAnimation>
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </motion.div>
                )}

                {/* Title */}
                <motion.h1 
                  className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {blog.title}
                </motion.h1>

                {/* Meta */}
                <motion.div 
                  className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-bold">
                      {blog.author_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{blog.author_name}</p>
                      <p className="text-sm">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    {readingTime} min read
                  </div>
                </motion.div>

                {/* Content - Sanitized to prevent XSS */}
                <motion.div
                  className="prose prose-lg max-w-none 
                    prose-headings:font-display prose-headings:text-foreground prose-headings:scroll-mt-24
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground 
                    prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                    prose-li:marker:text-primary
                    prose-table:border prose-table:border-border prose-th:bg-muted prose-th:text-foreground prose-td:border-border
                    prose-img:rounded-2xl prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content, {
                    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'pre', 'code', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
                    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                    ALLOW_DATA_ATTR: false
                  }) }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                />

                {/* Share */}
                <motion.div 
                  className="mt-12 pt-8 border-t border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <SocialShareButtons url={shareUrl} title={shareTitle} />
                </motion.div>

                {/* Newsletter Signup */}
                <div className="mt-12">
                  <NewsletterSignup />
                </div>
              </ScrollAnimation>
            </div>
          </article>

          {/* Related Posts */}
          {otherBlogs && otherBlogs.length > 0 && (
            <section className="py-16 gradient-subtle">
              <div className="container px-4">
                <motion.h2 
                  className="font-display text-2xl font-bold text-foreground mb-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  More Articles
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {otherBlogs.map((relatedBlog, index) => (
                    <motion.div
                      key={relatedBlog.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BlogCard blog={relatedBlog} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : null}

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

export default BlogPost;