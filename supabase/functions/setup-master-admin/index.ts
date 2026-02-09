import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { setup_secret } = await req.json();

    // Validate setup secret to prevent unauthorized master admin creation
    const expectedSecret = Deno.env.get('BLOG_ADMIN_CODE');
    if (!expectedSecret || setup_secret !== expectedSecret) {
      return new Response(
        JSON.stringify({ error: 'Invalid setup secret' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const masterEmail = 'masteradmin@paymall.com';
    const masterPassword = 'MasterAdmin@2026!';

    // Check if master admin already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingMaster = existingUsers?.users?.find(u => u.email === masterEmail);

    let userId: string;

    if (existingMaster) {
      userId = existingMaster.id;
    } else {
      // Create the master admin user
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: masterEmail,
        password: masterPassword,
        email_confirm: true,
      });

      if (createError) {
        return new Response(
          JSON.stringify({ error: createError.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      userId = newUser.user.id;
    }

    // Check if admin role already assigned
    const { data: existingRole } = await supabaseAdmin
      .from('user_roles')
      .select('id')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (!existingRole) {
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({ user_id: userId, role: 'admin' });

      if (roleError) {
        return new Response(
          JSON.stringify({ error: roleError.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Master admin created successfully',
        credentials: { email: masterEmail, password: masterPassword },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
