import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  MessageCircle,
  ArrowUp,
  Send,
} from "lucide-react";
import logoAsset from "@/assets/gestimmo-logo.jpg.asset.json";
import { SERVICE_OPTIONS, slugifyService } from "@/lib/services";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Biens", href: "/biens" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Devis", href: "/devis" },
  { label: "Rendez-vous", href: "/rendez-vous" },
  { label: "Contact", href: "/contact" },
];

const featuredServices = [
  "Conseil stratégique",
  "Gestion des Biens Immobiliers",
  "Location et Vente de Biens",
  "Promotion Immobilière",
  "Création de Sites Web",
  "Marketing Digital pour Entreprises",
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/243829791356" },
];

const legalLinks = [
  { label: "Politique de confidentialité", href: "#" },
  { label: "Mentions légales", href: "#" },
  { label: "Conditions d'utilisation", href: "#" },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-dark text-dark-foreground">
      {/* Main footer content */}
      <div className="container px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-12">
        {/* Top rule */}
        <div className="h-px w-24 rule-gold mb-10 sm:mb-12" />

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 xl:gap-12">
          {/* Column 1: Identity */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={logoAsset.url}
                alt="Gestimmo Digital"
                width={56}
                height={56}
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = "1";
                    img.src = "/favicon.png";
                  }
                }}
                className="h-14 w-14 shrink-0 rounded-full object-contain bg-white p-1 ring-1 ring-white/25"
              />
              <div>
                <h3 className="font-display text-xl font-bold leading-tight">
                  Gestimmo <span className="text-[hsl(var(--primary-glow))]">Digital</span>
                </h3>
                <p className="text-xs opacity-70 tracking-wide mt-0.5">Benedit</p>
              </div>
            </div>
            <p className="text-sm opacity-85 leading-relaxed max-w-xs">
              Votre partenaire de confiance en immobilier et marketing digital à Kinshasa, en RDC.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[hsl(var(--primary-glow))] hover:text-white transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-base">Navigation</h4>
            <ul className="flex flex-col gap-2.5 text-sm opacity-85">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="inline-flex hover:text-[hsl(var(--primary-glow))] hover:translate-x-1 transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-base">Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm opacity-85">
              {featuredServices.map((service) => (
                <li key={service}>
                  <Link
                    to={`/services#${slugifyService(service)}`}
                    className="inline-flex hover:text-[hsl(var(--primary-glow))] hover:translate-x-1 transition-all duration-300"
                  >
                    {service}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="inline-flex text-[hsl(var(--primary-glow))] font-medium hover:text-white hover:translate-x-1 transition-all duration-300"
                >
                  Voir tous les services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-base">Contact</h4>
            <ul className="flex flex-col gap-3.5 text-sm opacity-85">
              <li>
                <a
                  href="tel:+243829791356"
                  className="flex items-center gap-2.5 group hover:text-[hsl(var(--primary-glow))] transition-colors"
                >
                  <span className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[hsl(var(--primary-glow))] transition-colors">
                    <Phone size={14} />
                  </span>
                  <span>+243 82 97 91 356</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact.gestimmodigital@gmail.com"
                  className="flex items-center gap-2.5 group hover:text-[hsl(var(--primary-glow))] transition-colors"
                >
                  <span className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[hsl(var(--primary-glow))] transition-colors">
                    <Mail size={14} />
                  </span>
                  <span className="break-all">contact.gestimmodigital@gmail.com</span>
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin size={14} />
                  </span>
                  <span>Kinshasa, RDC</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 sm:mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="font-display text-lg sm:text-xl font-semibold mb-2">
                Recevez nos meilleures opportunités
              </h4>
              <p className="text-sm opacity-80 leading-relaxed">
                Inscrivez-vous pour recevoir nos actualités immobilières et digitales à Kinshasa.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse e-mail"
                  required
                  className="w-full h-12 pl-4 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary-glow))] focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-6 rounded-xl bg-[hsl(var(--primary-glow))] text-white font-medium text-sm hover:bg-[hsl(var(--primary-glow))]/90 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 shrink-0"
              >
                <Send size={16} />
                <span>S'inscrire</span>
              </button>
            </form>
          </div>
          {subscribed && (
            <p className="mt-4 text-sm text-[hsl(var(--primary-glow))]">
              Merci pour votre inscription ! Vous recevrez bientôt nos actualités.
            </p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs opacity-60 text-center md:text-left">
              © 2026 Gestimmo Digital. Tous droits réservés.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs opacity-60">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="hover:text-[hsl(var(--primary-glow))] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              onClick={scrollToTop}
              aria-label="Retour en haut"
              className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[hsl(var(--primary-glow))] hover:text-white transition-all duration-300"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
