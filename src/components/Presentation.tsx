import React from 'react';
import { ShieldAlert, Compass, Sparkles, HeartIcon, Leaf, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function Presentation() {
  const highlights = [
    {
      icon: <Compass className="text-gold-text w-8 h-8" />,
      title: 'Cadre calme d\'exception',
      description: 'Loin du bruit de la capitale, un havre de paix confidentiel pensé autour du calme et de l\'harmonie sensorielle.'
    },
    {
      icon: <Leaf className="text-gold-text w-8 h-8" />,
      title: 'Salles privées de prestige',
      description: 'Chaque cabine de soin est un sanctuaire individuel, insonorisé, muni de lumières tamisées et de douches privatives.'
    },
    {
      icon: <Sparkles className="text-gold-text w-8 h-8" />,
      title: 'Personnel qualifié international',
      description: 'Nos praticiens sont formés aux rituels de massages traditionnels asiatiques, européens et africains d\'excellence.'
    },
    {
      icon: <HeartHandshake className="text-gold-text w-8 h-8" />,
      title: 'Hygiène & Pureté absolues',
      description: 'Des normes strictes de stérilisation, du linge à usage unique en coton biologique et des huiles hypoallergéniques.'
    },
    {
      icon: <HeartIcon className="text-gold-text w-8 h-8" />,
      title: 'Relaxation physique profonde',
      description: 'Des gestuelles profondes qui dénouent les méridiens pour un sentiment d\'apesanteur physique immédiate.'
    },
    {
      icon: <Compass className="text-gold-text w-8 h-8" />,
      title: 'Soins personnalisés',
      description: 'Chaque soin débute par un entretien avec votre praticien pour adapter parfaitement la pression et la senteur de l\'huile.'
    }
  ];

  return (
    <section id="presentation" className="py-24 sm:py-32 bg-beige-bg relative overflow-hidden">
      {/* Background soft design ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-light/10 rounded-full blur-3xl -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual left columns holding premium layered images */}
          <div className="relative">
            <div className="aspect-[4/5] w-full max-w-md mx-auto relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800"
                alt="Massage de prestige Rituels Ouaga 2000"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-gold-light text-xs uppercase tracking-[0.25em] block mb-2">Signature de marque</span>
                <h4 className="font-serif text-xl tracking-wide">Rituels Ancestraux & Luxe Contemporain</h4>
              </div>
            </div>

            {/* Overlap badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-beige-sheet p-6 sm:p-10 rounded-2xl shadow-xl max-w-[280px] border border-sage/10 hidden sm:block">
              <span className="font-serif-luxury text-4xl text-gold-text block mb-1">100%</span>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-medium leading-relaxed">
                De nos huiles & ingrédients de soins du visage sont bio et de qualité thérapeutique supérieure.
              </p>
            </div>
          </div>

          {/* Story & text details */}
          <div>
            <span className="text-gold-text font-serif-luxury text-sm tracking-[0.3em] uppercase block mb-3">La Maison Rituels</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 tracking-wide mb-6 leading-tight">
              Une oasis de sérénité au cœur de Ouaga 2000
            </h2>
            <p className="text-gray-600 font-light text-base leading-relaxed mb-8">
              Rituels Ouaga 2000 transcende le concept traditionnel du spa pour offrir des escapades sensorielles inimitables. 
              Niché au cœur du prestigieux quartier résidentiel de Ouaga 2000, notre établissement est une invitation à ralentir, 
              à respirer, et à se reconnecter avec son bien-être corporel ultime.
            </p>
            <p className="text-gray-600 font-light text-base leading-relaxed mb-10">
              Dans un accord harmonieux combinant l'art du bien-être traditionnel d'Asie et le confort haut de gamme moderne, 
              nos équipes déploient des trésors d'écoute pour sculpter des soins sur-mesure répondant précisément à vos aspirations.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-sage/15 pt-8">
              <div>
                <span className="text-2xl font-serif text-sage-dark">09:00 - 21:00</span>
                <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">Tous les jours sur RDV</p>
              </div>
              <div>
                <span className="text-2xl font-serif text-sage-dark">Ouaga 2000</span>
                <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">Prestige & Parking Gardé</p>
              </div>
            </div>
          </div>

        </div>

        {/* Highlights grid */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sage-dark uppercase tracking-[0.25em] text-xs font-semibold block mb-2">Charte de Qualité</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-gray-900 tracking-wide">
              L'éveil sensoriel à travers 6 engagements d'or
            </h3>
            <div className="w-12 h-[1px] bg-gold-text mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-beige-sheet p-8 rounded-2xl border border-sage/10 hover:border-gold-text/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-6 group-hover:bg-gold-light/40 transition-colors">
                  {item.icon}
                </div>
                <h4 className="font-serif text-lg text-gray-900 mb-3 group-hover:text-gold-dark transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
