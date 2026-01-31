-- Add RLS policy to allow admins to read ALL blogs (including unpublished)
CREATE POLICY "Admins can read all blogs" 
ON public.blogs 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Ensure contact_requests has no public SELECT access (explicit deny for non-admins)
-- The existing policy "Only admins can read contact requests" already restricts this,
-- but we add a comment to clarify the security model is correct