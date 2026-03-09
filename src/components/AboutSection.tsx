import heroImg from "@/assets/hero-restaurant.jpg";

const AboutSection = () => {
  return (
    <section id="apropos" className="py-24 bg-background">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div className="rounded-lg overflow-hidden aspect-[4/5]">
            <img
              src={heroImg}
              alt="Intérieur du restaurant Mabélé"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-primary tracking-[0.3em] uppercase text-xs mb-3">Notre Histoire</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              À Propos
            </h2>
            <div className="w-16 h-0.5 bg-primary mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Fondé en 2020, Mabélé est né de la passion de célébrer les saveurs authentiques du Congo. 
              Notre chef puise dans les recettes ancestrales pour créer une cuisine qui honore nos racines 
              tout en embrassant la modernité.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Situé au cœur de la Gombe, notre restaurant vous accueille dans un cadre chaleureux 
              orné d'art congolais contemporain, pour une expérience qui éveille tous les sens.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-3xl font-display font-bold text-primary">5+</p>
                <p className="text-muted-foreground text-sm">Années</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary">30+</p>
                <p className="text-muted-foreground text-sm">Plats</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary">10K+</p>
                <p className="text-muted-foreground text-sm">Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
