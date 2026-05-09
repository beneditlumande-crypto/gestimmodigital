import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message,
    });
    setSubmitting(false);
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message. Réessayez.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-2">Parlons de votre projet</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Contactez-nous
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-6">
                Nos Coordonnées
              </h2>
              <div className="space-y-6">
                <a
                  href="https://wa.me/243829791356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <MessageCircle size={20} className="text-accent-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp</p>
                    <p className="text-muted-foreground text-sm">+243 82 97 91 356</p>
                  </div>
                </a>
                <a href="tel:+243829791356" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <Phone size={20} className="text-accent-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Téléphone</p>
                    <p className="text-muted-foreground text-sm">+243 82 97 91 356</p>
                  </div>
                </a>
                <a href="mailto:beneditlumande@gmail.com" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <Mail size={20} className="text-accent-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground text-sm">beneditlumande@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Adresse</p>
                    <p className="text-muted-foreground text-sm">Kinshasa, République Démocratique du Congo</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-6">
                Envoyez-nous un message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Téléphone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="+243..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {submitting ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
