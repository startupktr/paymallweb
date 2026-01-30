import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import type { Blog } from '@/hooks/useBlogs';

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

const BlogCard = ({ blog, featured = false }: BlogCardProps) => {
  const formattedDate = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  if (featured) {
    return (
      <Link to={`/blog/${blog.slug}`}>
        <motion.article
          className="group bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm md:flex md:h-72"
          whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)' }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="relative md:w-2/5 h-48 md:h-full overflow-hidden">
            {blog.featured_image ? (
              <motion.img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <div className="w-full h-full gradient-hero" />
            )}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
            {blog.is_featured && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
          </div>
          <div className="p-6 md:w-3/5 flex flex-col justify-center">
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {blog.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
              {blog.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {blog.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readingTime} min read
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${blog.slug}`}>
      <motion.article
        className="group bg-card rounded-2xl border border-border/50 overflow-hidden h-full flex flex-col shadow-sm"
        whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)' }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          {blog.featured_image ? (
            <motion.img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <div className="w-full h-full gradient-hero" />
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
          
          {/* Arrow indicator */}
          <motion.div 
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ rotate: -45 }}
          >
            <ArrowUpRight className="w-5 h-5 text-foreground" />
          </motion.div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {blog.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-white/90 text-foreground text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
            {blog.excerpt}
          </p>

          {/* Author */}
          <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-xs font-bold">
              {blog.author_name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-foreground">
              {blog.author_name}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard;
