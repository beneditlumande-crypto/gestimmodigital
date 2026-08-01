ALTER TABLE public.biens ENABLE ROW LEVEL SECURITY;

REVOKE INSERT, UPDATE, DELETE ON public.biens FROM anon, authenticated;
GRANT SELECT ON public.biens TO anon, authenticated;
GRANT ALL ON public.biens TO service_role;

DROP POLICY IF EXISTS "Public can view property listings" ON public.biens;
CREATE POLICY "Public can view property listings"
ON public.biens
FOR SELECT
TO anon, authenticated
USING (true);