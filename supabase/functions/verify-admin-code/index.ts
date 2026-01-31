import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (per-instance)
// For production, consider using Redis or database-backed rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getClientIP(req: Request): string {
  // Try various headers for client IP
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  // Fallback to a generic identifier
  return 'unknown';
}

function isRateLimited(clientIP: string): { limited: boolean; remainingAttempts: number; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(clientIP);
  
  if (!record) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + WINDOW_MS });
    return { limited: false, remainingAttempts: MAX_ATTEMPTS - 1 };
  }
  
  // Reset if window has passed
  if (now > record.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + WINDOW_MS });
    return { limited: false, remainingAttempts: MAX_ATTEMPTS - 1 };
  }
  
  // Check if over limit
  if (record.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
    return { limited: true, remainingAttempts: 0, retryAfterSeconds };
  }
  
  // Increment count
  record.count++;
  rateLimitMap.set(clientIP, record);
  return { limited: false, remainingAttempts: MAX_ATTEMPTS - record.count };
}

// Constant-time string comparison to prevent timing attacks
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(req);
    
    // Check rate limit BEFORE processing
    const rateLimit = isRateLimited(clientIP);
    if (rateLimit.limited) {
      console.log(`Rate limited: IP=${clientIP}, retry after ${rateLimit.retryAfterSeconds}s`);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Too many attempts. Please try again later.',
          retryAfter: rateLimit.retryAfterSeconds 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimit.retryAfterSeconds)
          } 
        }
      );
    }

    const { code } = await req.json();
    
    if (!code || typeof code !== 'string') {
      console.log('Invalid request: missing or invalid code');
      return new Response(
        JSON.stringify({ valid: false, error: 'Code is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate against server-side secret
    const adminCode = Deno.env.get('BLOG_ADMIN_CODE');
    
    if (!adminCode) {
      console.error('BLOG_ADMIN_CODE environment variable not set');
      return new Response(
        JSON.stringify({ valid: false, error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use constant-time comparison to prevent timing attacks
    const isValid = secureCompare(code, adminCode);
    
    // Log attempt (without revealing the code)
    console.log(`Admin code verification: IP=${clientIP}, valid=${isValid}, remaining_attempts=${rateLimit.remainingAttempts}`);
    
    return new Response(
      JSON.stringify({ 
        valid: isValid,
        remainingAttempts: rateLimit.remainingAttempts
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error verifying admin code:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Invalid request' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
