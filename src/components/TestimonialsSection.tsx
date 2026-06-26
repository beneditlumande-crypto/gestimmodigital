import { Star } from "lucide-react";
import Reveal from "@/components/Reveal";

const testimonials = [
  {
    name: "Patrick Muamba",
    role: "Propriétaire",
    text: "Gestimmo Digital a géré la vente de mon appartement avec un professionnalisme exemplaire. Je recommande vivement !",
    rating: 5,
  },
  {
    name: "Carine Kabongo",
    role: "Entrepreneuse",
    text: "Leur équipe de marketing digital a transformé la visibilité de mon entreprise en ligne. Résultats impressionnants !",
    rating: 5,
  },
  {
    name: "Jean-Pierre Lumumba",
    role: "Investisseur",
    text: "Un service fiable et transparent pour la gestion de mes propriétés à Kinshasa. Partenaire de confiance.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-2">Témoignages</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Ce que disent nos clients
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 150}>
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
