import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Comment réserver un soin à Rituels Ouaga 2000 ?',
      a: 'Vous pouvez réserver vos soins directement en ligne depuis notre site internet en cliquant sur le bouton « Réserver maintenant ». Vous y choisirez votre massage, la date, l\'heure et éventuellement votre praticien préféré. Vous pouvez également nous contacter directement via WhatsApp au +226 72 31 72 72.'
    },
    {
      q: 'Quels sont vos horaires d\'ouverture ?',
      a: 'Nous vous accueillons tous les jours de 09:00 à 21:00 (dimanche inclus), uniquement sur rendez-vous. Nous vous conseillons de vous présenter environ 10 minutes avant votre heure de rendez-vous afin de déguster notre infusion d\'accueil offerte.'
    },
    {
      q: 'Quels types de soins proposez-vous au sein du spa ?',
      a: 'Notre carte de soins haut de gamme comprend des Massages d\'Exception (Massage Thaïlandais Traditionnel, Massage Relaxant aux Étoiles, Massage Impérial aux huiles), des Rituels Visage haut de gamme (Hydralift Absolu, Soin Purifiant & détox) et de la beauté des mains & pieds (Pédicure Royale, Manucure Privilège).'
    },
    {
      q: 'Puis-je modifier ou annuler ma réservation ?',
      a: 'Oui, vous pouvez modifier ou annuler votre réservation gratuitement jusqu\'à 12 heures avant le soin. Pour ce faire, vous pouvez utiliser l\'espace de contact ou simplement cliquer sur le lien WhatsApp de notre conciergerie ou nous téléphoner pour réajuster votre horaire.'
    },
    {
      q: 'Le spa dispose-t-il d\'un parking sécurisé ?',
      a: 'Tout à fait. Rituels Ouaga 2000 est situé dans une zone résidentielle calme et sécurisée de Ouaga 2000. Nous mettons à votre entière disposition un parking privé sécurisé et surveillé par des agents de gardiennage professionnels.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-beige-bg relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQ Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-text font-serif-luxury text-sm tracking-[0.3em] uppercase block mb-3">CONSEILS EN LIGNE</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-wide mb-4">
            Questions fréquentes
          </h2>
          <p className="text-gray-500 font-light text-sm">
            Vous avez des questions sur nos protocoles de soins ou l'organisation de votre visite ? Retrouvez ici toutes nos réponses.
          </p>
          <div className="w-12 h-[1px] bg-gold-text mx-auto mt-4" />
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-beige-sheet border border-sage/12 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-sage-light/20 cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <span className="font-serif text-base sm:text-lg text-gray-800 tracking-wide font-medium">
                    {faq.q}
                  </span>
                  <span className={`text-gold-text shrink-0 transition-transform ${isOpen ? 'rotate-185' : ''}`}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 sm:px-8 border-t border-sage/5 text-gray-500 font-light text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
