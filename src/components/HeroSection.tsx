import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-realestate.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Gestimmo Digital - Immobilier à Kinshasa"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-dark/70" />
      </div>
      <div className="relative z-10 container text-center px-4">
        <p className="text-primary font-body font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up">
          Immobilier & Marketing Digital
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in-up text-dark-foreground leading-tight">
          Gestimmo <span className="text-primary">Digital</span>
        </h1>
        <p className="text-lg md:text-xl text-dark-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in-up font-light">
          Votre partenaire de confiance en gestion immobilière et marketing digital à Kinshasa.
          Nous transformons vos projets en succès.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Nous contacter <ArrowRight size={18} />
          </Link>
          <Link
            to="/biens"
            className="inline-flex items-center gap-2 border border-dark-foreground/30 text-dark-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm hover:bg-dark-foreground/10 transition-colors"
          >
            Voir nos biens
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
