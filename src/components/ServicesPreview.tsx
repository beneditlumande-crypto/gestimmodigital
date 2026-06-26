import { Link } from "react-router-dom";
import { Building2, Home, Globe, TrendingUp, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const services = [
  {
    icon: Building2,
    title: "Gestion Immobilière",
    description: "Administration complète de vos biens immobiliers avec transparence et rigueur.",
  },
  {
    icon: Home,
    title: "Location & Vente",
    description: "Trouvez le bien idéal ou vendez rapidement grâce à notre réseau étendu.",
  },
  {
    icon: Globe,
    title: "Création de Sites Web",
    description: "Des sites web modernes et performants pour donner de la visibilité à votre entreprise.",
  },
  {
    icon: TrendingUp,
    title: "Marketing Digital",
    description: "Stratégies digitales sur mesure pour booster la croissance de votre entreprise.",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-2">Ce que nous faisons</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Nos Services
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <s.icon size={24} className="text-accent-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
          >
            Découvrir tous nos services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
