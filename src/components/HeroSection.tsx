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
          className="w-full h-full object-cover scale-110 animate-fade-in"
          style={{ animation: "fade-in 1.2s ease-out forwards, float 12s ease-in-out infinite 1.2s" }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/80 via-dark/60 to-primary/40" />
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
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 hover:gap-3 animate-pulse-glow"
          >
            Nous contacter <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/biens"
            className="inline-flex items-center gap-2 border border-dark-foreground/30 text-dark-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm hover:bg-dark-foreground/10 hover:scale-105 transition-all"
          >
            Voir nos biens
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
