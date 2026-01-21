-- Create table for customer reviews/feedback
CREATE TABLE public.customer_reviews (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for contact/demo requests
CREATE TABLE public.contact_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    request_type TEXT NOT NULL DEFAULT 'contact',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert reviews (public form)
CREATE POLICY "Anyone can submit reviews"
ON public.customer_reviews
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read reviews (for displaying testimonials)
CREATE POLICY "Anyone can read reviews"
ON public.customer_reviews
FOR SELECT
USING (true);

-- Allow anyone to submit contact requests (public form)
CREATE POLICY "Anyone can submit contact requests"
ON public.contact_requests
FOR INSERT
WITH CHECK (true);