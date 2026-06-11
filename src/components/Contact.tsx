import React from 'react';
import { Phone, MessageSquare, MapPin, Navigation, Clock, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const handleCall = () => {
    window.location.href = 'tel:+22672317272';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/22672317272?text=Bonjour,%20je%20souhaite%20contacter%20le%20spa%20Rituels%20Ouaga%202000.', '_blank');
  };

  const handleItinerary = () => {
    window.open('https://maps.google.com/?q=Ouaga+2000,+Ouagadougou,+Burkina+Faso', '_blank');
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-beige-sheet relative overflow-hidden">
      {/* Botanical blur circles */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Contact Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-text font-serif-luxury text-sm tracking-[0.3em] uppercase block mb-3 font-semibold">REJOINDRE LA MAISON</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-wide mb-4">
            Demeurer à votre entière disposition
          </h2>
          <p className="text-gray-500 font-light text-sm">
            Niché dans le quartier présidentiel et serein de Ouaga 2000, le spa vous accueille tous les jours pour une parenthèse absolue.
          </p>
          <div className="w-12 h-[1px] bg-gold-text mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Card left detail credentials */}
          <div className="lg:col-span-5 bg-beige-bg rounded-3xl p-8 sm:p-10 border border-sage/12 flex flex-col justify-between">
            <div className="space-y-8">
              
              {/* Brand identifier */}
              <div>
                <span className="font-serif-luxury text-2xl tracking-[0.2em] text-sage-dark block">
                  RITUELS OUAGA 2000
                </span>
                <span className="text-xs tracking-[0.35em] text-gold-text uppercase font-bold block mt-1">
                  Maison de Beauté & d’Harmonie
                </span>
              </div>

              {/* Action details list */}
              <div className="space-y-6">
                
                {/* Address info item */}
                <div className="flex gap-4 items-start text-xs sm:text-sm">
                  <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center text-sage-dark shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block mb-1">Notre Adresse de prestige</span>
                    <p className="text-gray-500 font-light leading-relaxed">
                      Quartier Résidentiel Ouaga 2000, <br />
                      Ouagadougou, Burkina Faso
                    </p>
                  </div>
                </div>

                {/* Telephone item */}
                <div className="flex gap-4 items-start text-xs sm:text-sm">
                  <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center text-sage-dark shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block mb-1 font-bold">Ligne Directe Conciergerie</span>
                    <p className="font-bold text-sage-dark font-mono text-base sm:text-lg">
                      +226 72 31 72 72
                    </p>
                    <p className="text-gray-400 font-light text-xs mt-0.5">Appels et SMS ordinaires</p>
                  </div>
                </div>

                {/* Opening Hours item */}
                <div className="flex gap-4 items-start text-xs sm:text-sm">
                  <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center text-sage-dark shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block mb-1 font-bold">Horaires Exceptionnels</span>
                    <p className="text-gray-500 font-light">
                      Lundi - Dimanche : <strong>09h00 - 21h00</strong> non-stop <br />
                      Uniquement sur rendez-vous privilégié.
                    </p>
                  </div>
                </div>

                {/* Secure / Premium factor details */}
                <div className="flex gap-4 items-start text-xs sm:text-sm">
                  <div className="w-10 h-10 rounded-xl bg-gold-light/40 flex items-center justify-center text-gold-dark shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block mb-1 font-bold">Sécurité & Accessibilité</span>
                    <p className="text-gray-500 font-light text-xs leading-relaxed">
                      Parking privé gardé et sécurisé 24h/24 par des vigiles. Accès PMR optimisé.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Structured action buttons requested directly */}
            <div className="grid grid-cols-3 gap-2 mt-12 pt-6 border-t border-sage/12">
              <button
                onClick={handleCall}
                className="py-3 px-1 rounded-xl bg-sage-dark text-white text-center hover:bg-sage transition-all flex flex-col items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                id="btn-action-call"
              >
                <Phone size={14} />
                <span className="text-[10px] uppercase tracking-wider font-bold">Appeler</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="py-3 px-1 rounded-xl bg-emerald-600 text-white text-center hover:bg-emerald-500 transition-all flex flex-col items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                id="btn-action-whatsapp"
              >
                <MessageSquare size={14} />
                <span className="text-[10px] uppercase tracking-wider font-bold">WhatsApp</span>
              </button>

              <button
                onClick={handleItinerary}
                className="py-3 px-1 rounded-xl bg-beige-sheet hover:bg-white text-gray-800 border border-sage/20 text-center transition-all flex flex-col items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                id="btn-action-itinerary"
              >
                <Navigation size={14} className="text-gold-dark" />
                <span className="text-[10px] uppercase tracking-wider font-bold">Itinéraire</span>
              </button>
            </div>

          </div>

          {/* Map Column container (Section 11 Maps Embedded requirement) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl border border-sage/10 relative min-h-[350px] bg-gray-200">
            {/* Real Interactive Google Maps centered on Ouaga 2000, high contrast, clean */}
            <iframe
              title="Localisation Rituels Ouaga 2000"
              src="https://maps.google.com/maps?q=Ouaga+2000+Ouagadougou+Burkina+Faso&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-none grayscale-[20%] contrast-[110%] saturate-[90%]"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
