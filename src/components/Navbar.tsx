import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/gestimmo-logo.jpg.asset.json";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Biens", href: "/biens" },
  { label: "Devis", href: "/devis" },
  { label: "Rendez-vous", href: "/rendez-vous" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border shadow-card">
      {/* Brand / Logo section */}
      <div className="border-b border-border/70">
        <div className="container px-4 py-3 sm:py-4 flex items-center justify-between md:justify-center gap-3">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <img
              src={logoAsset.url}
              alt="Gestimmo Digital"
              width={200}
              height={200}
              loading="eager"
              decoding="async"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = "1";
                  img.src = "/favicon.png";
                }
              }}
              className="h-11 w-11 sm:h-14 sm:w-14 shrink-0 rounded-full object-contain bg-white p-0.5 ring-1 ring-border"
            />
            <div className="font-display text-base sm:text-xl font-bold text-primary flex flex-col leading-tight min-w-0">
              <span className="truncate">
                Gestimmo <span className="text-foreground">Digital</span>
              </span>
              <span className="text-[10px] sm:text-xs font-normal text-muted-foreground tracking-wide">
                Benedit
              </span>
            </div>
          </Link>
          <button
            className="md:hidden shrink-0 text-foreground p-1"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="hidden md:block container px-4 h-14 items-center">
        <div className="flex items-center justify-center gap-9 w-full h-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`relative text-[0.9rem] font-body font-medium tracking-wide transition-colors py-2 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-transform after:duration-300 after:origin-left ${
                location.pathname === item.href
                  ? "text-primary after:bg-primary after:scale-x-100"
                  : "text-foreground/80 hover:text-primary after:bg-primary after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>


      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-5 py-2 flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={`text-base font-medium py-3 border-b border-border/60 last:border-b-0 transition-colors ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-foreground/85 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
