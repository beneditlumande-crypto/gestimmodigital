import heroImg from "@/assets/hero-restaurant.jpg";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Restaurant Mabélé - Intérieur élégant"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>
      <div className="relative z-10 container text-center px-4">
        <p className="text-primary font-body tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in-up">
          Cuisine Congolaise Raffinée
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-fade-in-up text-gradient-gold leading-tight">
          Mabélé
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in-up font-light">
          Une expérience culinaire unique au cœur de Kinshasa, où la tradition rencontre l'élégance.
        </p>
        <a
          href="#reservation"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-sm font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors animate-fade-in-up"
        >
          Réserver une table
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
