import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-realestate.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Gestimmo Digital - Immobilier à Kinshasa"
          className="w-full h-full object-cover scale-110 animate-fade-in"
          style={{ animation: "fade-in 1.2s ease-out forwards, float 14s ease-in-out infinite 1.2s" }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/92 via-dark/75 to-primary/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,hsl(var(--dark)/0.75)_100%)]" />
      </div>
      <div className="relative z-10 container text-center px-5 pt-36 pb-20 md:pt-44">
        <p className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.45)] px-4 py-1.5 text-[0.72rem] md:text-xs font-body font-medium tracking-[0.22em] uppercase text-[hsl(var(--gold))] mb-7 animate-fade-in-up">
          Immobilier &amp; Marketing Digital
        </p>
        <h1 className="text-[2.1rem] sm:text-5xl lg:text-7xl font-display font-bold mb-6 animate-fade-in-up text-dark-foreground leading-[1.08] max-w-4xl mx-auto text-balance">
          Votre partenaire en <span className="text-gradient-blue">Immobilier</span> &amp; Solutions Digitales
        </h1>
        <div className="h-px w-20 rule-gold mx-auto mb-7" />
        <p className="text-base md:text-xl text-dark-foreground/90 max-w-2xl mx-auto mb-10 animate-fade-in-up leading-relaxed">
          Nous accompagnons particuliers, professionnels et entreprises dans leurs projets
          immobiliers et leur transformation digitale à Kinshasa et en RDC.
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center animate-fade-in-up">
          <Link
            to="/devis"
            className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-body font-semibold text-[0.95rem] hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-elegant"
          >
            Demander un devis
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/biens"
            className="inline-flex items-center justify-center gap-2 border border-dark-foreground/35 bg-dark-foreground/5 backdrop-blur-sm text-dark-foreground px-8 py-3.5 rounded-lg font-body font-semibold text-[0.95rem] hover:bg-dark-foreground/15 hover:-translate-y-0.5 transition-all"
          >
            Voir nos biens
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
