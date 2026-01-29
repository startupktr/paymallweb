import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from '@/components/blog/RichTextEditor';
import { useBlogAdmin } from '@/hooks/useBlogAdmin';
import {
  useBlogById,
  useCreateBlog,
  useUpdateBlog,
  generateSlug,
  type BlogInsert,
} from '@/hooks/useBlogs';
import logo from '@/assets/logo.png';

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useBlogAdmin();
  const { data: existingBlog, isLoading: blogLoading } = useBlogById(id || '');
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();

  const isEditMode = !!id;

  const [formData, setFormData] = useState<BlogInsert>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author_name: 'PayMall Team',
    tags: [],
    meta_title: '',
    meta_description: '',
    is_featured: false,
    is_published: false,
  });

  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load existing blog data
  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title,
        slug: existingBlog.slug,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        featured_image: existingBlog.featured_image || '',
        author_name: existingBlog.author_name,
        tags: existingBlog.tags || [],
        meta_title: existingBlog.meta_title || '',
        meta_description: existingBlog.meta_description || '',
        is_featured: existingBlog.is_featured,
        is_published: existingBlog.is_published,
      });
    }
  }, [existingBlog]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditMode && formData.title) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [formData.title, isEditMode]);

  const handleChange = (field: keyof BlogInsert, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags?.includes(tag)) {
      handleChange('tags', [...(formData.tags || []), tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleChange(
      'tags',
      formData.tags?.filter((t) => t !== tagToRemove) || []
    );
  };

  const handleSubmit = async (publish = false) => {
    setIsSaving(true);

    const blogData: BlogInsert = {
      ...formData,
      is_published: publish ? true : formData.is_published,
      published_at: publish || formData.is_published ? new Date().toISOString() : null,
    };

    try {
      if (isEditMode && id) {
        await updateBlog.mutateAsync({ id, ...blogData });
      } else {
        await createBlog.mutateAsync(blogData);
      }
      navigate('/admin/blogs');
    } catch (error) {
      // Error handled by mutation
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || (isEditMode && blogLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-primary-foreground py-4 sticky top-0 z-50">
        <div className="container px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/blogs">
              <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
                <img src={logo} alt="PayMall" className="w-full h-full object-cover rounded-sm" />
              </div>
              <span className="text-lg font-display font-bold">PayMall</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => handleSubmit(false)}
              disabled={isSaving || !formData.title || !formData.content}
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={() => handleSubmit(true)}
              disabled={isSaving || !formData.title || !formData.content || !formData.excerpt}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Publish'}
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter blog title"
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    placeholder="blog-post-url"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleChange('excerpt', e.target.value)}
                    placeholder="Brief summary of the blog post (shown in listings)"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Content *</Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => handleChange('content', content)}
                    placeholder="Write your blog content here..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_featured">Featured Post</Label>
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => handleChange('is_featured', checked)}
                  />
                </div>

                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author_name}
                    onChange={(e) => handleChange('author_name', e.target.value)}
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <Label htmlFor="featured_image">Featured Image URL</Label>
                  <Input
                    id="featured_image"
                    value={formData.featured_image || ''}
                    onChange={(e) => handleChange('featured_image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.featured_image && (
                    <img
                      src={formData.featured_image}
                      alt="Preview"
                      className="mt-2 rounded-lg w-full h-32 object-cover"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  )}
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tag"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeTag(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title || ''}
                    onChange={(e) => handleChange('meta_title', e.target.value)}
                    placeholder="SEO title (defaults to post title)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(formData.meta_title || formData.title).length}/60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description || ''}
                    onChange={(e) => handleChange('meta_description', e.target.value)}
                    placeholder="SEO description (defaults to excerpt)"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(formData.meta_description || formData.excerpt).length}/160 characters
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogEditor;
