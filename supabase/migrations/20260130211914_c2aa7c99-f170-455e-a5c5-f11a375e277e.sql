-- Fix the security definer view issue by using SECURITY INVOKER instead
DROP VIEW IF EXISTS public.customer_reviews_public;

-- Recreate view with explicit security invoker (default, safe)
CREATE VIEW public.customer_reviews_public 
WITH (security_invoker = true)
AS
SELECT id, name, review, rating, created_at
FROM public.customer_reviews;

-- Grant access to the view
GRANT SELECT ON public.customer_reviews_public TO anon, authenticated;

-- Since we can't use RLS on views directly, we need to allow anon to read the base table
-- but only through our controlled view. Let's add a policy that allows reading non-email fields
-- Actually, let's take a different approach - create a function to safely return reviews

-- Create a function that returns reviews without email
CREATE OR REPLACE FUNCTION public.get_public_reviews()
RETURNS TABLE (
    id uuid,
    name text,
    review text,
    rating integer,
    created_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
    SELECT id, name, review, rating, created_at
    FROM public.customer_reviews
    ORDER BY created_at DESC;
$$;

-- Grant execute on the function
GRANT EXECUTE ON FUNCTION public.get_public_reviews() TO anon, authenticated;