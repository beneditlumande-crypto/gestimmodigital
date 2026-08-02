-- ROLES
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- updated_at helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- QUOTE REQUESTS
CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  company text CHECK (company IS NULL OR char_length(company) <= 150),
  service text NOT NULL CHECK (char_length(service) BETWEEN 1 AND 150),
  budget text CHECK (budget IS NULL OR char_length(budget) <= 100),
  description text NOT NULL CHECK (char_length(description) BETWEEN 1 AND 3000),
  desired_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.quote_requests TO anon, authenticated;
GRANT SELECT ON public.quote_requests TO authenticated;
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quote request"
ON public.quote_requests FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view quote requests"
ON public.quote_requests FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_quote_requests_updated_at
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- APPOINTMENTS
CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  service text NOT NULL CHECK (char_length(service) BETWEEN 1 AND 150),
  appointment_date date NOT NULL,
  appointment_time text NOT NULL CHECK (char_length(appointment_time) <= 20),
  comment text CHECK (comment IS NULL OR char_length(comment) <= 2000),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.appointments TO anon, authenticated;
GRANT SELECT ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can book an appointment"
ON public.appointments FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view appointments"
ON public.appointments FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- CONTACT MESSAGES: admin read access
CREATE POLICY "Admins can view contact messages"
ON public.contact_messages FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT ON public.contact_messages TO authenticated;