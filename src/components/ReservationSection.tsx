import { useState } from "react";
import { toast } from "sonner";

const ReservationSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: "2" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Réservation envoyée ! Nous vous confirmerons bientôt.");
    setForm({ name: "", phone: "", date: "", time: "", guests: "2" });
  };

  return (
    <section id="reservation" className="py-24 bg-secondary">
      <div className="container px-4 max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-primary tracking-[0.3em] uppercase text-xs mb-3">Rejoignez-nous</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Réservation
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-6" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              required
              placeholder="Votre nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <input
              required
              placeholder="Téléphone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <input
              required
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <select
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
              className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n} personne{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-sm font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            Réserver maintenant
          </button>
        </form>
        <div className="mt-12 text-center space-y-2">
          <p className="text-muted-foreground text-sm">📍 Avenue du Commerce, Gombe, Kinshasa</p>
          <p className="text-muted-foreground text-sm">📞 +243 81 234 5678</p>
          <p className="text-muted-foreground text-sm">🕐 Lun–Sam : 11h00 – 23h00</p>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
