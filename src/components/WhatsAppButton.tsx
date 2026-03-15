import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/243829791356"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactez-nous sur WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[hsl(142,70%,45%)] text-[hsl(0,0%,100%)] px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
  >
    <MessageCircle size={24} />
    <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
  </a>
);

export default WhatsAppButton;
