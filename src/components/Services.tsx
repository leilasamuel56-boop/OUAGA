import React, { useState } from 'react';
import { SpaService, PriceOption } from '../types';
import { INITIAL_SERVICES } from '../data';
import { Clock, Tag, CalendarDays, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  onSelectServiceForBooking: (service: SpaService) => void;
}

function ServiceCard({
  service,
  index,
  onSelectServiceForBooking,
  formatPrice,
}: {
  service: SpaService;
  index: number;
  onSelectServiceForBooking: (service: SpaService) => void;
  formatPrice: (price: number) => string;
  key?: React.Key;
}) {
  // If the service has multiple price options, default to the first one. Otherwise, null.
  const [selectedOption, setSelectedOption] = useState<PriceOption | null>(
    service.options && service.options.length > 0 ? service.options[0] : null
  );

  const displayPrice = selectedOption ? selectedOption.price : service.price;
  const displayDuration = selectedOption ? selectedOption.duration : service.duration;

  const handleBooking = () => {
    if (selectedOption) {
      // Create a customized service object with the selected option details
      // so that the booking form and calculations reflect the correct choices perfectly.
      const customizedService: SpaService = {
        ...service,
        name: `${service.name} (${selectedOption.label})`,
        price: selectedOption.price,
        duration: selectedOption.duration,
      };
      onSelectServiceForBooking(customizedService);
    } else {
      onSelectServiceForBooking(service);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-beige-bg rounded-3xl overflow-hidden border border-sage/12 hover:border-gold-text/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group h-full p-5"
    >
      {/* 1. Image on top (object-fit: cover, height: 220px, width: 100%, rounded corners) */}
      <div className="relative h-[220px] w-full rounded-2xl overflow-hidden mb-6">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Premium badge category */}
        <div className="absolute top-4 right-4 bg-beige-sheet/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sage/15 shadow-sm">
          <span className="text-[10px] uppercase tracking-widest font-bold text-sage-dark">
            {service.category === 'massage' && 'Massage'}
            {service.category === 'visage' && 'Soins Visage'}
            {service.category === 'onglerie' && 'Beauté & Mains'}
            {service.category === 'esthetique' && 'Soin Esthétique'}
          </span>
        </div>
      </div>

      {/* 2. Service Body */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Nom du massage */}
          <h3 className="font-serif text-xl text-gray-900 group-hover:text-gold-dark transition-colors mb-3 leading-snug">
            {service.name}
          </h3>
          
          {/* Description détaillée */}
          <p className="text-gray-500 font-light text-sm leading-relaxed mb-5">
            {service.description}
          </p>

          {/* Interactive Option Selector Chips if options exist */}
          {service.options && service.options.length > 0 && (
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold block mb-2.5">
                Formules & Tarifs
              </span>
              <div className="flex flex-wrap gap-1.5">
                {service.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedOption(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs tracking-wider transition-all duration-250 cursor-pointer ${
                      selectedOption?.label === opt.label
                        ? 'bg-sage-dark text-white font-semibold shadow-sm border border-transparent'
                        : 'bg-beige-sheet text-gray-600 hover:bg-sage-light hover:text-sage-dark border border-sage/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Price, Duration & CTA Action Button */}
        <div className="border-t border-sage/10 pt-5 mt-auto">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gray-500 font-medium mb-5">
            {/* Durée */}
            <span className="flex items-center gap-1.5 bg-sage-light px-3 py-1 rounded-lg text-sage-dark font-semibold">
              <Clock size={13} className="text-sage" />
              {displayDuration} Min
            </span>
            {/* Prix */}
            <span className="text-lg font-serif text-gold-dark font-bold tracking-tight">
              {formatPrice(displayPrice)}
            </span>
          </div>

          {/* Bouton "Sélectionner & Réserver" */}
          <button
            onClick={handleBooking}
            className="w-full py-3.5 bg-beige-sheet border border-sage/20 hover:border-gold-text text-sage-dark hover:text-white hover:bg-gold-text text-xs uppercase tracking-widest font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
            id={`btn-book-${service.id}`}
          >
            <CalendarDays size={14} className="group-hover:scale-110 transition-transform" />
            <span>Sélectionner & Réserver</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services({ onSelectServiceForBooking }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'massage' | 'visage' | 'onglerie' | 'esthetique'>('all');

  const filteredServices = INITIAL_SERVICES.filter(
    (service) => activeTab === 'all' || service.category === activeTab
  );

  const tabs = [
    { id: 'all', label: 'Tous les soins' },
    { id: 'massage', label: 'Massages d\'Exception' },
    { id: 'visage', label: 'Rituels Visage' },
    { id: 'onglerie', label: 'Beauté & Mains' },
    { id: 'esthetique', label: 'Soins Esthétiques' },
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return 'Sur devis';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF', // West African CFA Franc
      maximumFractionDigits: 0,
    }).format(price).replace('XOF', 'FCFA');
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-beige-sheet relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-text font-serif-luxury text-sm tracking-[0.3em] uppercase block mb-3 font-semibold">La Carte des Soins</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 tracking-wide mb-6">
            L'excellence sensorielle sur-mesure
          </h2>
          <p className="text-gray-500 font-light text-base leading-relaxed">
            Parcourez nos rituels sacrés de massages, soins régénérants du visage et parenthèses de bien-être pour hommes et femmes. Chaque soin est une invitation exclusive à déposer l'esprit et rééquilibrer le corps.
          </p>
          <div className="w-16 h-[1px] bg-gold-text mx-auto mt-6" />
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-4xl mx-auto border-b border-sage/10 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm uppercase tracking-widest font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-sage-dark text-white shadow-md font-semibold'
                  : 'bg-beige-bg text-gray-600 hover:bg-sage-light hover:text-sage-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelectServiceForBooking={onSelectServiceForBooking}
              formatPrice={formatPrice}
            />
          ))}
        </div>

        {/* Direct contact WhatsApp callout for details */}
        <div className="mt-20 border border-gold-text/20 rounded-3xl p-8 sm:p-12 text-center bg-beige-bg shadow-sm max-w-4xl mx-auto">
          <span className="text-sm uppercase tracking-[0.25em] text-gold-text block mb-2 font-medium">Besoins de conseils personnalisés ?</span>
          <h4 className="font-serif text-xl sm:text-2xl text-gray-900 mb-4">
            Laissez-nous vous guider vers le soin parfait
          </h4>
          <p className="text-gray-500 font-light text-sm max-w-2xl mx-auto mb-6">
            Nos hôtesses sont à votre disposition par WhatsApp pour vous conseiller selon vos besoins corporels ou préparer un bon cadeau de prestige pour un proche.
          </p>
          <a
            href="https://wa.me/22672317272?text=Bonjour,%20je%20voudrais%20des%20conseils%20sur%20les%20soins%20de%20votre%20spa."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-dark hover:text-gold-light font-bold duration-200 border-b border-gold-dark"
          >
            Discuter sur WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
