import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Copy, Plus, ArrowLeft, KeyRound, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface InviteCode {
  id: string;
  code: string;
  is_used: boolean;
  created_at: string;
  used_at: string | null;
}

const AdminManagement = () => {
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingCodes, setIsLoadingCodes] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const fetchCodes = async () => {
    const { data, error } = await supabase
      .from('admin_invite_codes')
      .select('id, code, is_used, created_at, used_at')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInviteCodes(data);
    }
    setIsLoadingCodes(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCodes();
    }
  }, [isAuthenticated]);

  const generateCode = async () => {
    setIsGenerating(true);
    const code = crypto.randomUUID().slice(0, 8).toUpperCase();

    const { error } = await supabase
      .from('admin_invite_codes')
      .insert({ code, created_by: (await supabase.auth.getUser()).data.user?.id });

    if (error) {
      toast.error('Failed to generate invite code');
    } else {
      toast.success('Invite code generated!');
      fetchCodes();
    }
    setIsGenerating(false);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Admin Management</h1>
            <p className="text-muted-foreground mt-1">Generate invite codes for new admin registrations</p>
          </div>
          <Link to="/admin/blogs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="w-5 h-5" />
              Invite Codes
            </CardTitle>
            <CardDescription>
              Generate invite codes and share them with new admins. Each code can only be used once.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={generateCode} disabled={isGenerating} className="mb-6">
              <Plus className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate New Code'}
            </Button>

            {isLoadingCodes ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : inviteCodes.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No invite codes generated yet. Click the button above to create one.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inviteCodes.map(ic => (
                    <TableRow key={ic.id}>
                      <TableCell className="font-mono font-bold text-lg">{ic.code}</TableCell>
                      <TableCell>
                        {ic.is_used ? (
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Used
                          </Badge>
                        ) : (
                          <Badge className="gap-1">
                            <Clock className="w-3 h-3" />
                            Available
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(ic.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {!ic.is_used && (
                          <Button variant="ghost" size="sm" onClick={() => copyCode(ic.code)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AdminManagement;
