-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  source TEXT DEFAULT 'blog'
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

-- Prevent read access from public
CREATE POLICY "Only admins can read subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add index for faster email lookups
CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers(email);