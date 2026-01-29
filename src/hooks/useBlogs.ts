import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author_name: string;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogInsert {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string | null;
  author_name?: string;
  tags?: string[];
  meta_title?: string | null;
  meta_description?: string | null;
  is_featured?: boolean;
  is_published?: boolean;
  published_at?: string | null;
}

// Fetch published blogs for public pages
export const usePublishedBlogs = (limit?: number) => {
  return useQuery({
    queryKey: ['blogs', 'published', limit],
    queryFn: async () => {
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Blog[];
    },
  });
};

// Fetch featured blogs for homepage
export const useFeaturedBlogs = (limit = 3) => {
  return useQuery({
    queryKey: ['blogs', 'featured', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as Blog[];
    },
  });
};

// Fetch single blog by slug
export const useBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data as Blog;
    },
    enabled: !!slug,
  });
};

// Admin: Fetch all blogs (including unpublished)
export const useAllBlogs = () => {
  return useQuery({
    queryKey: ['blogs', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Blog[];
    },
  });
};

// Admin: Fetch single blog by ID
export const useBlogById = (id: string) => {
  return useQuery({
    queryKey: ['blog', 'id', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Blog;
    },
    enabled: !!id,
  });
};

// Admin: Create blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (blog: BlogInsert) => {
      const { data, error } = await supabase
        .from('blogs')
        .insert(blog)
        .select()
        .single();
      
      if (error) throw error;
      return data as Blog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog created successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create blog: ${error.message}`);
    },
  });
};

// Admin: Update blog
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...blog }: Partial<Blog> & { id: string }) => {
      const { data, error } = await supabase
        .from('blogs')
        .update(blog)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Blog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      toast.success('Blog updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update blog: ${error.message}`);
    },
  });
};

// Admin: Delete blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete blog: ${error.message}`);
    },
  });
};

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};
