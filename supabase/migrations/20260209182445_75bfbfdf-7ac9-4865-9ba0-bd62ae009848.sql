
-- Create admin_invite_codes table
CREATE TABLE public.admin_invite_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  used_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  is_used boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  used_at timestamptz
);

ALTER TABLE public.admin_invite_codes ENABLE ROW LEVEL SECURITY;

-- Only admins can manage invite codes
CREATE POLICY "Admins can read invite codes"
ON public.admin_invite_codes
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create invite codes"
ON public.admin_invite_codes
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update invite codes"
ON public.admin_invite_codes
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));
