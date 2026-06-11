import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
}

export default function Hero({ onBookNow }: HeroProps) {
  const handleWhatsApp = () => {
    window.open('https://wa.me/22672317272?text=Bonjour,%20je%20souhaite%20réserver%20un%20soin%20au%20spa%20Rituels%20Ouaga%202000.', '_blank');
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Slow Zoom effect of standard CSS or pure premium styling */}
      <div className="absolute inset-0 z-0">
        <picture>
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000"
            alt="Spa Rituels Ouaga 2000"
            className="w-full h-full object-cover scale-105 animate-[pulse_10s_infinite_alternate] brightness-[0.45]"
            loading="eager"
          />
        </picture>
        {/* Elegant overlay to match the premium, calm identity */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-sage-dark/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Floating botanical elements or particles simulated elegantly in design */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 text-xs tracking-[0.3em] uppercase cursor-pointer animate-bounce">
        <span>Faire défiler</span>
        <div className="w-[1px] h-8 bg-white/30" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Small gold label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-text/30 bg-black/30 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-text animate-pulse" />
          <span className="text-gold-light font-sans text-xs sm:text-sm uppercase tracking-[0.3em] font-medium">
            L'excellence du bien-être au Burkina Faso
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-luxury text-white tracking-wide leading-tight mb-6"
        >
          Votre parenthèse de <br className="hidden sm:inline" />
          <span className="italic text-gold-light">bien-être</span> à Ouaga 2000
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-white/85 font-sans font-light tracking-wide max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Découvrez un univers de relaxation, de beauté et de sérénité conçu pour votre équilibre.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={onBookNow}
            className="w-full sm:w-auto px-8 py-4 bg-gold-text text-white hover:bg-gold-dark hover:shadow-gold-text/10 rounded-full text-sm uppercase tracking-[0.2em] font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform active:translate-y-0 flex items-center justify-center gap-3"
            id="hero-book-btn"
          >
            <Calendar size={16} />
            <span>Réserver maintenant</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/40 hover:border-white hover:bg-white/10 text-white rounded-full text-sm uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-3"
            id="hero-whatsapp-btn"
          >
            <Phone size={16} className="text-emerald-400 fill-emerald-400/20" />
            <span>WhatsApp +226 72 31 72 72</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
