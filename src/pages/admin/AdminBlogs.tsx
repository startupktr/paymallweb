import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, LogOut, ExternalLink, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAllBlogs, useDeleteBlog, useUpdateBlog } from '@/hooks/useBlogs';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import logo from '@/assets/logo.png';

const AdminBlogs = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const { data: blogs, isLoading } = useAllBlogs();
  const deleteBlog = useDeleteBlog();
  const updateBlog = useUpdateBlog();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteBlog.mutateAsync(id);
    setDeletingId(null);
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    await updateBlog.mutateAsync({
      id,
      is_published: !currentStatus,
      published_at: !currentStatus ? new Date().toISOString() : null,
    });
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    await updateBlog.mutateAsync({
      id,
      is_featured: !currentStatus,
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-primary-foreground py-4 sticky top-0 z-50">
        <div className="container px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                <img src={logo} alt="PayMall" className="w-full h-full object-cover rounded-sm" />
              </div>
              <span className="text-xl font-display font-bold">PayMall</span>
            </Link>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/management">
              <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Users className="w-4 h-4 mr-2" />
                Manage Admins
              </Button>
            </Link>
            <Link to="/blog" target="_blank">
              <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Blog
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        {/* Title & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Blog Management</h1>
            <p className="text-muted-foreground mt-1">Create, edit, and manage your blog posts</p>
          </div>
          <Link to="/admin/blogs/new">
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : blogs && blogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{blog.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                          {blog.excerpt}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={blog.is_published ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => togglePublish(blog.id, blog.is_published)}
                        className="gap-1"
                      >
                        {blog.is_published ? (
                          <>
                            <Eye className="w-3 h-3" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            Draft
                          </>
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={blog.is_featured ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => toggleFeatured(blog.id, blog.is_featured)}
                      >
                        <Star className={`w-4 h-4 ${blog.is_featured ? 'fill-current' : ''}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/blogs/${blog.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(blog.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {deletingId === blog.id ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No blog posts yet</p>
              <Link to="/admin/blogs/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminBlogs;
