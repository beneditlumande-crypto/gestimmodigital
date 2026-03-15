import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Building2, Home, Landmark, Globe, TrendingUp, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Gestion des Biens Immobiliers",
    description:
      "Nous assurons la gestion complète de vos propriétés : suivi des locataires, maintenance, encaissement des loyers et reporting régulier. Votre investissement entre de bonnes mains.",
  },
  {
    icon: Home,
    title: "Location et Vente de Biens",
    description:
      "Grâce à notre réseau étendu et notre expertise du marché kinois, nous vous accompagnons dans la location ou la vente de vos biens immobiliers avec efficacité et transparence.",
  },
  {
    icon: Landmark,
    title: "Promotion Immobilière",
    description:
      "De la conception à la livraison, nous développons des projets immobiliers modernes qui répondent aux standards de qualité et aux besoins du marché local.",
  },
  {
    icon: Globe,
    title: "Création de Sites Web",
    description:
      "Nous concevons des sites web professionnels, responsifs et optimisés pour le référencement, afin de donner à votre entreprise une présence en ligne à la hauteur de vos ambitions.",
  },
  {
    icon: TrendingUp,
    title: "Marketing Digital pour Entreprises",
    description:
      "Stratégies de marketing digital sur mesure : réseaux sociaux, SEO, publicité en ligne, branding — nous boostons la visibilité et la croissance de votre entreprise.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-2">Nos expertises</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Nos Services
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Gestimmo Digital combine expertise immobilière et savoir-faire digital pour offrir des solutions complètes à ses clients.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                  <s.icon size={28} className="text-accent-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <h2 className="font-display font-bold text-foreground text-lg mb-3">{s.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Discuter de votre projet <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
