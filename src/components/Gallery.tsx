import React, { useState } from 'react';
import { INITIAL_GALLERY } from '../data';
import { GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'massage' | 'visage' | 'onglerie' | 'equipe'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Tout voir' },
    { id: 'massage', label: 'Massages' },
    { id: 'visage', label: 'Soin Visage' },
    { id: 'onglerie', label: 'Beauté' },
    { id: 'equipe', label: 'L\'Équipe' },
  ];

  // Active items based on current tab selection
  const filteredItems = INITIAL_GALLERY.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev! - 1
    );
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev! + 1
    );
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-beige-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-text font-serif-luxury text-sm tracking-[0.3em] uppercase block mb-3">L'Écrin Phygital</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 tracking-wide mb-6">
            L'atmosphère de Rituels Ouaga 2000 en images
          </h2>
          <p className="text-gray-500 font-light text-base leading-relaxed">
            Pénétrez visuellement dans nos rituels et profitez de l'harmonie parfaite de notre spa de prestige à Ouagadougou. Des cabines privées luxueuses au calme absolu.
          </p>
          <div className="w-16 h-[1px] bg-gold-text mx-auto mt-6" />
        </div>

        {/* Categories Tab navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto border-b border-sage/10 pb-4">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                activeCategory === tab.id
                  ? 'bg-gold-text text-white shadow-md'
                  : 'bg-beige-sheet text-gray-650 hover:bg-sage-light hover:text-sage-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer bg-beige-sheet border border-sage/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 relative"
            >
              {/* Image Frame */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>

              {/* Title & Description under card */}
              <div className="p-6">
                <span className="text-[9px] uppercase tracking-widest text-gold-text font-bold block mb-1">
                  {item.category === 'massage' && 'Massages de Prestige'}
                  {item.category === 'visage' && 'Soins du Visage'}
                  {item.category === 'onglerie' && 'Beauté & Mains'}
                  {item.category === 'equipe' && 'Notre Équipe'}
                </span>
                <h4 className="font-serif text-base text-gray-900 group-hover:text-gold-dark transition-colors duration-200">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs font-light mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Fullscreen Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center p-4 backdrop-blur-sm"
              id="gallery-lightbox"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                aria-label="Fermer la galerie"
              >
                <X size={24} />
              </button>

              {/* Nav arrows */}
              <button
                onClick={handlePrevLightbox}
                className="absolute left-4 sm:left-10 text-white/70 hover:text-white bg-white/10 p-3.5 rounded-full hover:bg-white/20 transition-all cursor-pointer active:scale-95 z-10"
                aria-label="Image précédente"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNextLightbox}
                className="absolute right-4 sm:right-10 text-white/70 hover:text-white bg-white/10 p-3.5 rounded-full hover:bg-white/20 transition-all cursor-pointer active:scale-95 z-10"
                aria-label="Image suivante"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image Frame content */}
              <div
                className="max-w-4xl max-h-[85vh] flex flex-col items-center select-none"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-2xl animate-scale-up"
                  referrerPolicy="no-referrer"
                />

                <div className="text-center text-white mt-6 max-w-xl">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold-text font-bold block mb-1">
                    {filteredItems[lightboxIndex].category.toUpperCase()}
                  </span>
                  <h3 className="font-serif text-lg tracking-wide">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-gray-400 font-light text-xs mt-2 text-center">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
