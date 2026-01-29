import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Blog } from '@/hooks/useBlogs';

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

const BlogCard = ({ blog, featured = false }: BlogCardProps) => {
  const formattedDate = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  // Estimate reading time (200 words per minute)
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Link
      to={`/blog/${blog.slug}`}
      className={`group block bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        featured ? 'md:flex md:h-64' : ''
      }`}
    >
      {blog.featured_image && (
        <div
          className={`relative overflow-hidden ${
            featured ? 'md:w-2/5 h-48 md:h-full' : 'h-48'
          }`}
        >
          <img
            src={blog.featured_image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {blog.is_featured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
      )}

      <div className={`p-6 ${featured ? 'md:w-3/5 flex flex-col justify-center' : ''}`}>
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <h3
          className={`font-display font-bold text-foreground group-hover:text-primary transition-colors mb-2 ${
            featured ? 'text-xl md:text-2xl' : 'text-lg'
          }`}
        >
          {blog.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime} min read
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
