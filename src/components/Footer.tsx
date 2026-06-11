import React from 'react';
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-sage-dark text-white border-t border-white/5 pt-16 pb-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Column 1: Brand story */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col items-start text-left">
              <span className="font-serif-luxury text-2xl tracking-[0.25em] text-white">RITUELS</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold-light mt-0.5 font-bold font-sans">Ouaga 2000</span>
            </div>
            <p className="text-white/70 font-light text-xs sm:text-sm leading-relaxed max-w-sm">
              Une parenthèse d'absolu bien-être au cœur de la capitale burkinabè. Offrez à votre corps l'excellence de massages ancestraux combinés à des soins d'exception prodigués par les meilleurs spécialistes.
            </p>
            <div className="flex gap-4">
              <div className="text-left">
                <span className="font-serif text-gold-light text-lg block">09:00 - 21:00</span>
                <span className="text-[9px] uppercase tracking-wider text-white/55">Ouvert tous les jours</span>
              </div>
              <div className="border-l border-white/10 pl-4 text-left">
                <span className="font-serif text-gold-light text-lg block">Parking Gardé</span>
                <span className="text-[9px] uppercase tracking-wider text-white/55">Savoir-être & Prestige</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-light font-bold">Liens rapides</h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-white/80">
              <button onClick={() => handleScrollTo('#home')} className="hover:text-white transition duration-200 text-left cursor-pointer">Accueil</button>
              <button onClick={() => handleScrollTo('#presentation')} className="hover:text-white transition duration-200 text-left cursor-pointer">Le Concept</button>
              <button onClick={() => handleScrollTo('#services')} className="hover:text-white transition duration-200 text-left cursor-pointer">Soins & Prix</button>
              <button onClick={() => handleScrollTo('#loyalty')} className="hover:text-white transition duration-200 text-left cursor-pointer">Espace Fidélité</button>
              <button onClick={() => handleScrollTo('#gallery')} className="hover:text-white transition duration-200 text-left cursor-pointer">Galerie Photos</button>
              <button onClick={() => handleScrollTo('#faq')} className="hover:text-white transition duration-200 text-left cursor-pointer">Questions fréquentes</button>
              <button onClick={() => handleScrollTo('#contact')} className="hover:text-white transition duration-200 text-left cursor-pointer">Plan & Itinéraire</button>
            </div>
          </div>

          {/* Column 3: Contact & socials */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-light font-bold">Conciergerie Privée</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold-light shrink-0 mt-0.5" />
                <span>Quartier Résidentiel Ouaga 2000, Ouagadougou, Burkina Faso</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-gold-light shrink-0" />
                <span className="font-mono font-semibold text-gold-light hover:underline cursor-pointer">+226 72 31 72 72</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-gold-light shrink-0" />
                <span className="font-mono hover:underline cursor-pointer">accueil@rituelsouaga2000.com</span>
              </li>
            </ul>

            {/* Social media mockup */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-white/55 block mb-2 font-semibold">Suivez vos Rituels</span>
              <div className="flex gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 hover:border-gold-light text-white hover:text-gold-light flex items-center justify-center transition-colors text-xs font-semibold">
                  IG
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 hover:border-gold-light text-white hover:text-gold-light flex items-center justify-center transition-colors text-xs font-semibold">
                  FB
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 hover:border-gold-light text-white hover:text-gold-light flex items-center justify-center transition-colors text-xs font-semibold">
                  IN
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Lower footer notes (Section 12 details) */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>© {currentYear} Rituels Ouaga 2000 — Tous droits réservés.</p>
          <div className="flex gap-6">
            <button className="hover:text-white transition duration-150 text-left underline underline-offset-1 cursor-pointer">
              Mentions Légales
            </button>
            <button className="hover:text-white transition duration-150 text-left underline underline-offset-1 cursor-pointer">
              Politique de Confidentialité
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
