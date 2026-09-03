import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import HeroSection from "@/components/HeroSection";
import ServicesPreview from "@/components/ServicesPreview";
import PropertiesPreview from "@/components/PropertiesPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/components/Seo";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Gestimmo Digital",
    alternateName: "Gestimmo Digital Kinshasa",
    description:
      "Agence immobilière et de marketing digital à Kinshasa : gestion et vente de biens, création de sites web, applications web, automatisation, analyse de données et conseil stratégique en RDC.",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    image: `${SITE_URL}/favicon.png`,
    telephone: "+243829791356",
    email: "contact.gestimmodigital@gmail.com",
    priceRange: "$$",
    currenciesAccepted: "USD, CDF",
    paymentAccepted: "Cash, Mobile Money, M-Pesa",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kinshasa",
      addressRegion: "Kinshasa",
      addressCountry: "CD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -4.3219,
      longitude: 15.3119,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+243829791356",
      email: "contact.gestimmodigital@gmail.com",
      contactType: "customer service",
      availableLanguage: ["fr"],
      areaServed: "CD",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
    areaServed: [
      { "@type": "City", name: "Kinshasa" },
      { "@type": "Country", name: "République démocratique du Congo" },
    ],
    knowsAbout: [
      "Gestion immobilière à Kinshasa",
      "Vente et location de biens immobiliers en RDC",
      "Marketing digital à Kinshasa",
      "Création de sites web à Kinshasa",
      "Applications web",
      "Automatisation et intelligence artificielle",
      "Analyse de données",
      "Conseil stratégique",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gestimmo Digital",
    url: SITE_URL,
    inLanguage: "fr",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Gestimmo Digital | Agence immobilière & marketing digital à Kinshasa, RDC"
        description="Agence immobilière et de marketing digital à Kinshasa : gestion et vente de biens, création de sites web, applications web, automatisation, analyse de données et conseil stratégique en RDC."
        path="/"
        keywords="agence immobilière Kinshasa, gestion immobilière Kinshasa, marketing digital Kinshasa, création de sites web Kinshasa, applications web, automatisation, analyse de données, conseil stratégique Kinshasa, immobilier RDC, Congo"
        jsonLd={jsonLd}
      />
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <PropertiesPreview />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
