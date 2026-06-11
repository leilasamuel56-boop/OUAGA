import React, { useState } from 'react';
import { INITIAL_TESTIMONIALS } from '../data';
import { ChevronLeft, ChevronRight, Star, Quote, MessageSquarePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [reviews, setReviews] = useState(INITIAL_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Leave a mock rating states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1)
    );
  };

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1)
    );
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const newRev = {
      id: 'r-' + Math.random(),
      author: newName,
      comment: newComment,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    setCurrentIndex(0);
    setNewName('');
    setNewComment('');
    setNewRating(5);
    setShowAddForm(false);
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-beige-bg relative overflow-hidden">
      {/* Soft color highlights behind slider */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Metric block header stats */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="md:col-span-5 text-center md:text-left">
            <span className="text-gold-text font-serif-luxury text-sm tracking-[0.3em] uppercase block mb-3">La Parole à notre Clientèle</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-wide mb-6 leading-tight">
              Des retours d'exception et de confiance
            </h2>
            <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">
              Rituels Ouaga 2000 fait de la satisfaction de sa clientèle sa quête la plus noble. Chaque témoignage est analysé par nos équipes pour perpétuer notre standard d'excellence.
            </p>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sage-light text-sage-dark border border-sage/20 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-sage hover:text-white transition-all shadow-sm"
            >
              <MessageSquarePlus size={14} />
              <span>Laisser mon avis</span>
            </button>
          </div>

          <div className="md:col-span-7 flex flex-wrap justify-center sm:justify-end gap-6 sm:gap-10">
            {/* Global Rating Card */}
            <div className="bg-beige-sheet p-6 rounded-2xl border border-sage/12 shadow-sm text-center min-w-[160px]">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Moyenne</span>
              <span className="text-4xl text-gold-dark font-accent font-serif font-bold block">4,3 <span className="text-lg text-gray-400">/ 5</span></span>
              <div className="flex justify-center gap-0.5 mt-2 text-gold-text">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" className="opacity-40" />
              </div>
            </div>

            <div className="bg-beige-sheet p-6 rounded-2xl border border-sage/12 shadow-sm text-center min-w-[160px]">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Audités</span>
              <span className="text-4xl text-sage-dark font-serif font-bold block">119</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mt-2">Avis vérifiés</span>
            </div>

            <div className="bg-beige-sheet p-6 rounded-2xl border border-sage/12 shadow-sm text-center min-w-[160px]">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Recommandation</span>
              <span className="text-4xl text-gray-800 font-serif font-bold block">98%</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mt-2">Taux d'éloge</span>
            </div>
          </div>

        </div>

        {/* Conditional review addition form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 p-6 sm:p-10 bg-beige-sheet rounded-2xl border border-gold-text/25 max-w-2xl mx-auto"
          >
            <h4 className="font-serif text-lg text-gray-900 mb-6">Faire part de votre expérience d'évasion d'or</h4>
            <form onSubmit={handleAddReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">Nom / Prénom</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Fatoumata Sawadogo"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-beige-bg border border-sage/25 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">Note d'évaluation</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setNewRating(stars)}
                        className={`p-1.5 rounded transition-colors ${
                          newRating >= stars ? 'text-gold-text' : 'text-gray-300'
                        }`}
                      >
                        <Star size={18} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1.5 font-bold">Votre commentaire précieux</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Qu'avez-vous ressenti au cours de vos soins ? (Ex: Propreté, relaxation profonde des tensions...)"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-beige-bg border border-sage/25 rounded-lg p-3 text-xs text-gray-800 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sage-dark text-white rounded-lg text-xs uppercase tracking-widest font-semibold hover:bg-sage transition-all"
                >
                  Publier l'avis
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Elegant Slider Body */}
        <div className="bg-beige-sheet rounded-3xl border border-sage/12 shadow-xl p-8 sm:p-16 relative overflow-hidden">
          
          {/* Quote icon watermarks */}
          <div className="absolute top-8 left-8 text-gold-light/15">
            <Quote size={120} fill="currentColor" className="stroke-none" />
          </div>

          <div className="min-h-[220px] flex flex-col justify-between relative z-10">
            {/* Active quote slide */}
            <div className="animate-fade-in">
              {/* Stars representation */}
              <div className="flex gap-1 text-gold-text mb-6 justify-center sm:justify-start">
                {Array.from({ length: reviews[currentIndex].rating }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
                {Array.from({ length: 5 - reviews[currentIndex].rating }).map((_, i) => (
                  <Star key={i} size={18} className="opacity-20" />
                ))}
              </div>

              {/* Big quote statement */}
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-gray-900 tracking-wide leading-relaxed italic mb-8 text-center sm:text-left">
                "{reviews[currentIndex].comment}"
              </blockquote>

              {/* Client author name and verified statement */}
              <div className="text-center sm:text-left">
                <span className="font-sans font-semibold text-gray-800 uppercase tracking-widest text-xs block">
                  {reviews[currentIndex].author}
                </span>
                <span className="text-[10px] uppercase text-sage-dark tracking-wider font-semibold block mt-1.5">
                  ✓ Client Vérifié de Rituels Ouaga 2000 — {reviews[currentIndex].date}
                </span>
              </div>
            </div>

            {/* Slider arrows control panel */}
            <div className="flex items-center justify-center sm:justify-end gap-4 mt-8">
              <span className="text-xs font-mono text-gray-400">
                0{currentIndex + 1} / 0{reviews.length}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-sage/20 flex items-center justify-center hover:bg-sage-light duration-200 text-sage-dark cursor-pointer shadow-sm active:scale-95"
                  aria-label="Avis précédent"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-sage/20 flex items-center justify-center hover:bg-sage-light duration-200 text-sage-dark cursor-pointer shadow-sm active:scale-95"
                  aria-label="Avis suivant"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
