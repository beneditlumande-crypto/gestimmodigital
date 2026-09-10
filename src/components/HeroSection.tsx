import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-gratte-ciels.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[86vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Gratte-ciels modernes, symbole d’immobilier premium et de solutions digitales"
          className="h-full w-full object-cover object-center animate-fade-in"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/65 via-dark/25 to-dark/75" />
      </div>
      <div className="relative z-10 container text-center px-5 pt-36 pb-16 md:pt-40">
        <p className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.5)] bg-dark/40 px-4 py-1.5 text-[0.7rem] md:text-xs font-body font-semibold tracking-[0.16em] uppercase text-[hsl(45,80%,72%)] mb-7 animate-fade-in-up">
          Immobilier &amp; Marketing Digital
        </p>
        <h1 className="text-[2.1rem] sm:text-5xl lg:text-[4.2rem] font-display font-bold mb-6 animate-fade-in-up text-dark-foreground leading-[1.08] max-w-4xl mx-auto text-balance drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]">
          Votre partenaire en <span className="text-[hsl(210,100%,72%)]">Immobilier</span> &amp; Solutions Digitales
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
