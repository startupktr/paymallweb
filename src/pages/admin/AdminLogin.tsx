import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBlogAdmin } from '@/hooks/useBlogAdmin';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

const AdminLogin = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useBlogAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isValid = await login(code);
      
      if (isValid) {
        toast.success('Welcome to Admin Dashboard!');
        navigate('/admin/blogs');
      } else {
        toast.error('Invalid admin code');
      }
    } catch (error) {
      toast.error('Failed to verify admin code');
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center shadow-glow">
            <img src={logo} alt="PayMall" className="w-full h-full object-cover rounded-sm" />
          </div>
          <span className="text-2xl font-display font-bold text-foreground">PayMall</span>
        </Link>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full gradient-hero flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Enter your admin code to manage blog content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-12 text-center text-lg tracking-widest"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full h-12" disabled={isLoading || !code}>
                {isLoading ? 'Verifying...' : 'Access Dashboard'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AdminLogin;
