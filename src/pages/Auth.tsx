import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    const { error } = await fn;
    setLoading(false);
    if (error) {
      toast({ title: "Connexion impossible", description: error.message, variant: "destructive" });
      return;
    }
    if (mode === "signup") {
      toast({ title: "Compte créé", description: "Vous pouvez maintenant vous connecter." });
      setMode("signin");
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
            <Lock size={22} className="text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Espace administration</h1>
            <p className="text-muted-foreground text-sm">Gestimmo Digital</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className={inputClass} placeholder="votre@email.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Mot de passe</label>
            <input type="password" required minLength={6} value={password}
              onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60">
            {loading ? "Veuillez patienter..." : mode === "signin" ? "Se connecter" : "Créer le compte"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-sm text-primary hover:underline"
        >
          {mode === "signin" ? "Créer un compte administrateur" : "J'ai déjà un compte"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
