CREATE TABLE public.consultation_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) <= 100),
  email TEXT NOT NULL CHECK (char_length(email) <= 255),
  phone TEXT CHECK (char_length(phone) <= 30),
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL CHECK (char_length(appointment_time) <= 20),
  amount_usd NUMERIC NOT NULL DEFAULT 50,
  payment_method TEXT NOT NULL DEFAULT 'M-Pesa' CHECK (char_length(payment_method) <= 50),
  payer_number TEXT CHECK (char_length(payer_number) <= 30),
  proof_path TEXT,
  comment TEXT CHECK (char_length(comment) <= 2000),
  payment_status TEXT NOT NULL DEFAULT 'en_attente' CHECK (payment_status IN ('en_attente','valide','refuse')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.consultation_payments TO authenticated;
GRANT ALL ON public.consultation_payments TO service_role;

ALTER TABLE public.consultation_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view consultation payments"
ON public.consultation_payments FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update consultation payments"
ON public.consultation_payments FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_consultation_payments_updated_at
BEFORE UPDATE ON public.consultation_payments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Public can upload payment proofs"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Admins can read payment proofs"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'payment-proofs' AND public.has_role(auth.uid(), 'admin'));