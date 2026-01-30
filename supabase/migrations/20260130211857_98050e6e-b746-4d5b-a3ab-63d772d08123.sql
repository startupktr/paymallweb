-- Create app_role enum for admin system
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for proper role management
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Users can only see their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Only admins can manage roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix blogs table: Remove overly permissive policy, add proper admin-only policies
DROP POLICY IF EXISTS "Allow all operations" ON public.blogs;

-- Keep public read for published blogs
-- Policy "Anyone can read published blogs" already exists

-- Only authenticated admins can create blogs
CREATE POLICY "Admins can create blogs"
ON public.blogs
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only authenticated admins can update blogs
CREATE POLICY "Admins can update blogs"
ON public.blogs
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only authenticated admins can delete blogs
CREATE POLICY "Admins can delete blogs"
ON public.blogs
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix customer_reviews: Hide email from public reads
-- First drop existing policy
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.customer_reviews;

-- Create a view that excludes email for public access
CREATE VIEW public.customer_reviews_public AS
SELECT id, name, review, rating, created_at
FROM public.customer_reviews;

-- Grant access to the view
GRANT SELECT ON public.customer_reviews_public TO anon, authenticated;

-- Add admin-only read policy for full review data
CREATE POLICY "Admins can read all review data"
ON public.customer_reviews
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- contact_requests: Explicitly deny SELECT to prevent future misconfigurations
-- The table currently has no SELECT policy which is correct, but let's add admin-only access
CREATE POLICY "Only admins can read contact requests"
ON public.contact_requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));