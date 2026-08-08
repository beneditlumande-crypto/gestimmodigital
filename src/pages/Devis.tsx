import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SERVICE_OPTIONS, BUDGET_OPTIONS } from "@/lib/services";
import { FileText } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Nom trop long"),
  email: z.string().trim().email("Email invalide").max(255, "Email trop long"),
  phone: z.string().trim().max(30, "Téléphone trop long").optional().or(z.literal("")),
  company: z.string().trim().max(150, "Nom d'entreprise trop long").optional().or(z.literal("")),
  service: z.string().trim().min(1, "Le service est requis").max(150),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  description: z.string().trim().min(1, "La description est requise").max(3000, "Description trop longue"),
  desiredDate: z.string().trim().optional().or(z.literal("")),
});

const inputClass =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const empty = {
  name: "", email: "", phone: "", company: "",
  service: "", budget: "", description: "", desiredDate: "",
};

const Devis = () => {
  const { toast } = useToast();
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Validation",
        description: parsed.error.issues[0]?.message ?? "Données invalides",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.functions.invoke("send-quote-notification", {
      body: parsed.data,
    });
    setSubmitting(false);
    if (error) {
      console.error("send-quote-notification failed:", error);
      toast({
        title: "Envoi impossible",
        description: "Une erreur est survenue. Merci de réessayer ou de nous contacter via WhatsApp.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Demande envoyée !",
      description: "Merci, nous vous enverrons votre devis dans les plus brefs délais.",
    });
    setForm(empty);
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Demande de devis gratuit | Gestimmo Digital RDC"
        description="Recevez un devis gratuit et personnalisé pour vos projets immobiliers, site web, application web, marketing digital ou automatisation à Kinshasa, RDC."
        path="/devis"
        keywords="devis gratuit site web Kinshasa, tarif marketing digital RDC, devis immobilier Kinshasa"
      />
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-2">Estimation gratuite</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">Demande de devis</h1>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Décrivez votre projet et recevez une proposition adaptée à vos besoins et à votre budget.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                <FileText size={22} className="text-accent-foreground" />
              </div>
              <h2 className="text-lg font-display font-bold text-foreground">Votre projet</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Nom complet</label>
                  <input type="text" required maxLength={100} value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass} placeholder="Votre nom" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                  <input type="email" required maxLength={255} value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass} placeholder="votre@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Téléphone</label>
                  <input type="tel" maxLength={30} value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass} placeholder="+243..." />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Entreprise <span className="text-muted-foreground font-normal">(facultatif)</span>
                  </label>
                  <input type="text" maxLength={150} value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={inputClass} placeholder="Nom de votre entreprise" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Service souhaité</label>
                  <select required value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={inputClass}>
                    <option value="">Sélectionner un service</option>
                    {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Budget estimé</label>
                  <select value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className={inputClass}>
                    <option value="">Sélectionner un budget</option>
                    {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Date souhaitée</label>
                <input type="date" value={form.desiredDate}
                  onChange={(e) => setForm({ ...form, desiredDate: e.target.value })}
                  className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Description du projet</label>
                <textarea required rows={5} maxLength={3000} value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Décrivez vos objectifs, vos attentes et le contexte de votre projet..." />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60">
                {submitting ? "Envoi en cours..." : "Envoyer ma demande de devis"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Devis;
