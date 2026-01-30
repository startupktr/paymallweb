import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { useBlogBySlug, usePublishedBlogs } from '@/hooks/useBlogs';
import BlogCard from '@/components/blog/BlogCard';
import logo from '@/assets/logo.png';
import { useEffect } from 'react';

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

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };

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
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Articles
            </Button>
          </Link>
        </div>
      </header>

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
          {/* Article */}
          <article className="py-16">
            <div className="container px-4 max-w-4xl mx-auto">
              <ScrollAnimation>
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {blog.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blog.author_name}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {readingTime} min read
                  </span>
                </div>

                {/* Featured Image */}
                {blog.featured_image && (
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    className="w-full h-auto rounded-2xl mb-10 shadow-lg"
                  />
                )}

                {/* Content - Sanitized to prevent XSS */}
                <div
                  className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content, {
                    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'pre', 'code', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
                    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                    ALLOW_DATA_ATTR: false
                  }) }}
                />

                {/* Share */}
                <div className="flex items-center gap-4 mt-12 pt-8 border-t border-border">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Share2 className="w-4 h-4" />
                    Share:
                  </span>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </ScrollAnimation>
            </div>
          </article>

          {/* Related Posts */}
          {otherBlogs && otherBlogs.length > 0 && (
            <section className="py-16 gradient-subtle">
              <div className="container px-4">
                <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                  More Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {otherBlogs.map((relatedBlog) => (
                    <BlogCard key={relatedBlog.id} blog={relatedBlog} />
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
