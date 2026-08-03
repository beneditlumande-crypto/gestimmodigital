import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SERVICE_OPTIONS, TIME_OPTIONS } from "@/lib/services";
import { CalendarClock, Upload, Info } from "lucide-react";

export const CONSULTATION_SERVICE = "Consultation stratégique (60 minutes)";

const schema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Nom trop long"),
  email: z.string().trim().email("Email invalide").max(255, "Email trop long"),
  phone: z.string().trim().max(30, "Téléphone trop long").optional().or(z.literal("")),
  service: z.string().trim().min(1, "Le service est requis").max(150),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide"),
  time: z.string().trim().min(1, "L'heure est requise").max(20),
  comment: z.string().trim().max(2000, "Commentaire trop long").optional().or(z.literal("")),
});

const inputClass =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const empty = { name: "", email: "", phone: "", service: "", date: "", time: "", comment: "" };

const ACCEPTED = ["image/jpeg", "image/png", "application/pdf"];

const RendezVous = () => {
  const { toast } = useToast();
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [payerNumber, setPayerNumber] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const today = new Date().toISOString().slice(0, 10);
  const isConsultation = form.service === CONSULTATION_SERVICE;

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

    if (isConsultation) {
      if (!payerNumber.trim()) {
        toast({ title: "Validation", description: "Indiquez le numéro M-Pesa utilisé pour le paiement.", variant: "destructive" });
        return;
      }
      if (!proofFile) {
        toast({ title: "Preuve requise", description: "Téléversez une capture d'écran ou un PDF de votre paiement.", variant: "destructive" });
        return;
      }
      if (!ACCEPTED.includes(proofFile.type)) {
        toast({ title: "Format non accepté", description: "Formats acceptés : JPG, PNG ou PDF.", variant: "destructive" });
        return;
      }
      if (proofFile.size > 5 * 1024 * 1024) {
        toast({ title: "Fichier trop volumineux", description: "Taille maximale : 5 Mo.", variant: "destructive" });
        return;
      }

      setSubmitting(true);
      const ext = proofFile.name.split(".").pop()?.toLowerCase() ?? "bin";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("payment-proofs")
        .upload(path, proofFile, { contentType: proofFile.type });
      if (upErr) {
        setSubmitting(false);
        console.error("proof upload failed:", upErr);
        toast({ title: "Téléversement impossible", description: "Merci de réessayer ou de nous contacter via WhatsApp.", variant: "destructive" });
        return;
      }
      const { error } = await supabase.functions.invoke("send-consultation-notification", {
        body: { ...parsed.data, payerNumber: payerNumber.trim(), proofPath: path },
      });
      setSubmitting(false);
      if (error) {
        console.error("send-consultation-notification failed:", error);
        toast({ title: "Envoi impossible", description: "Une erreur est survenue. Merci de réessayer ou de nous contacter via WhatsApp.", variant: "destructive" });
        return;
      }
      toast({
        title: "Demande reçue !",
        description: "Nous vérifions votre paiement — votre rendez-vous reste en attente jusqu'à validation.",
      });
      setForm(empty);
      setPayerNumber("");
      setProofFile(null);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.functions.invoke("send-appointment-notification", {
      body: parsed.data,
    });
    setSubmitting(false);
    if (error) {
      console.error("send-appointment-notification failed:", error);
      toast({
        title: "Envoi impossible",
        description: "Une erreur est survenue. Merci de réessayer ou de nous contacter via WhatsApp.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Rendez-vous demandé !",
      description: "Nous vous confirmons votre créneau par email dans les plus brefs délais.",
    });
    setForm(empty);
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-2">Échangeons ensemble</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">Prendre rendez-vous</h1>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Réservez un créneau avec notre équipe à Kinshasa, en présentiel ou en visioconférence.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                <CalendarClock size={22} className="text-accent-foreground" />
              </div>
              <h2 className="text-lg font-display font-bold text-foreground">Votre rendez-vous</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Nom</label>
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
                  <label className="text-sm font-medium text-foreground mb-1 block">Service</label>
                  <select required value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={inputClass}>
                    <option value="">Sélectionner un service</option>
                    <option value={CONSULTATION_SERVICE}>{CONSULTATION_SERVICE} — 50 USD</option>
                    {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
                  <input type="date" required min={today} value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Heure</label>
                  <select required value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className={inputClass}>
                    <option value="">Sélectionner une heure</option>
                    {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Commentaire</label>
                <textarea rows={4} maxLength={2000} value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Précisez le sujet de votre rendez-vous..." />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60">
                {submitting ? "Envoi en cours..." : "Confirmer le rendez-vous"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RendezVous;
