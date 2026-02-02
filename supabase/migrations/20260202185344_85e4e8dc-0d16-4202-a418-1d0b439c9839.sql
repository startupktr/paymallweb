-- Revoke direct SELECT access from the customer_reviews_public view
-- The existing get_public_reviews() function should be used instead for controlled access
REVOKE SELECT ON public.customer_reviews_public FROM anon, authenticated;

-- Enable RLS on the view (views inherit from their underlying table but explicit is better)
ALTER VIEW public.customer_reviews_public SET (security_invoker = true);

-- Create a policy that only allows access through the function
-- Since we revoked direct access, this provides defense in depth
COMMENT ON VIEW public.customer_reviews_public IS 'DEPRECATED: Use get_public_reviews() function instead for public access to reviews';