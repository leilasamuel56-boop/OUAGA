import React, { useState, useEffect } from 'react';
import { LOYALTY_REWARDS, INITIAL_SERVICES } from '../data';
import { Search, Award, Star, History, Gift, Check, Clock, ShieldCheck } from 'lucide-react';
import { Booking } from '../types';

interface LoyaltySystemProps {
  bookings: Booking[];
}

export default function LoyaltySystem({ bookings }: LoyaltySystemProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [profile, setProfile] = useState<{
    phone: string;
    name: string;
    visits: number;
    points: number;
    userBookings: Booking[];
  } | null>(null);

  const [hasSearched, setHasSearched] = useState(false);

  // Search logic
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    const normalisedPhone = phoneNumber.replace(/\s+/g, '');
    setSearchPhone(normalisedPhone);

    // Cross-reference current bookings in store
    const matchedBookings = bookings.filter(
      (b) => b.clientPhone.replace(/\s+/g, '') === normalisedPhone
    );

    // Read from localStorage to check if points exist, or build default profile
    const key = `loyalty_user_${normalisedPhone}`;
    const persisted = localStorage.getItem(key);
    
    if (persisted) {
      const data = JSON.parse(persisted);
      // Synchronize with active matching real bookings
      const calculatedPoints = matchedBookings.reduce((sum, b) => sum + b.pointsAccumulated, 0);
      const finalPoints = Math.max(data.points, calculatedPoints);
      const finalVisits = Math.max(data.visits, matchedBookings.length);
      
      setProfile({
        phone: normalisedPhone,
        name: data.name || matchedBookings[0]?.clientName || 'Membre Privilège',
        visits: finalVisits,
        points: finalPoints,
        userBookings: matchedBookings,
      });
    } else if (matchedBookings.length > 0) {
      const calculatedPoints = matchedBookings.reduce((sum, b) => sum + b.pointsAccumulated, 0);
      setProfile({
        phone: normalisedPhone,
        name: matchedBookings[0].clientName,
        visits: matchedBookings.length,
        points: calculatedPoints,
        userBookings: matchedBookings,
      });
    } else {
      // Return a temporary mock demonstration account if they search "demo" or other numbers so they can test easily!
      if (normalisedPhone.toLowerCase() === 'demo' || normalisedPhone === '72317272' || normalisedPhone === '+22672317272') {
        setProfile({
          phone: normalisedPhone,
          name: 'Alassane Sanou (Compte Démo)',
          visits: 6,
          points: 380,
          userBookings: [
            {
              id: 'B-Demo1',
              clientName: 'Alassane Sanou',
              clientPhone: normalisedPhone,
              clientEmail: 'alassane@gmail.com',
              serviceId: 's1',
              date: '2026-05-10',
              timeSlot: '15:00',
              therapistId: 't1',
              status: 'completed',
              createdAt: '2026-05-09T10:00:00Z',
              pointsAccumulated: 450,
            },
            {
              id: 'B-Demo2',
              clientName: 'Alassane Sanou',
              clientPhone: normalisedPhone,
              clientEmail: 'alassane@gmail.com',
              serviceId: 's4',
              date: '2026-06-01',
              timeSlot: '12:00',
              therapistId: 't2',
              status: 'completed',
              createdAt: '2026-05-31T14:20:00Z',
              pointsAccumulated: 300,
            },
          ],
        });
      } else {
        setProfile(null);
      }
    }
    setHasSearched(true);
  };

  return (
    <section id="loyalty" className="py-24 sm:py-32 bg-beige-sheet relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text and Search input form column (left side) */}
          <div className="lg:col-span-5">
            <span className="text-gold-text font-serif-luxury text-sm tracking-[0.3em] uppercase block mb-3">Le Salon Privilège</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-wide mb-6">
              Votre fidélité couronnée d'or
            </h2>
            <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
              Parce que votre équilibre mérite une attention constante, le club <strong>Rituels Privilège</strong> récompense chacun de vos précieux moments passés à nos côtés.
            </p>
            <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
              Gagnez des points d'or à chaque visite (<strong>1 point par 100 FCFA dépensé</strong>) et débloquez des avantages exclusifs, des surclassements d'huiles rares et des soins offerts.
            </p>

            {/* Account check search box */}
            <form onSubmit={handleSearch} className="bg-beige-bg p-4 rounded-2xl border border-sage/12">
              <label className="block text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-2">
                Consulter mon solde de points & avantages
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-3.5 text-gray-400">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Entrez votre numéro WhatsApp ou 'demo'"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white border border-sage/15 rounded-xl pl-10 pr-3 py-2.5 text-xs font-sans text-gray-800 focus:outline-none focus:border-gold-text"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sage-dark text-white rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-sage transition-all"
                >
                  Valider
                </button>
              </div>
              <p className="text-[9px] text-gray-400 mt-2 font-light">
                ⚡ Astuce: Tapez <strong>demo</strong> pour prévisualiser un compte avec points déjà acquis.
              </p>
            </form>
          </div>

          {/* Interactive Profile details column (right side) */}
          <div className="lg:col-span-7">
            
            {hasSearched ? (
              profile ? (
                <div className="bg-beige-bg rounded-3xl p-6 sm:p-10 border border-gold-text/25 shadow-xl animate-fade-in relative overflow-hidden">
                  
                  {/* Floating gold coin decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-light/20 rounded-full blur-2xl -mr-10 -mt-10" />

                  {/* Profile Header */}
                  <div className="flex items-start justify-between border-b border-sage/10 pb-6 mb-8 relative z-10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded bg-gold-light/40 border border-gold-text/20 text-[10px] uppercase font-bold tracking-widest text-gold-dark">
                          Rituels Privilège Or
                        </span>
                        <ShieldCheck className="text-gold-text w-4 h-4" />
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl text-gray-900 mt-2">
                        {profile.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">{profile.phone}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">Solde d'or</span>
                      <span className="text-3xl sm:text-4xl font-serif text-gold-dark font-bold block mt-1">
                        {profile.points} <span className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-widest">pts</span>
                      </span>
                    </div>
                  </div>

                  {/* Visit Stats grids */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-beige-sheet p-4 rounded-xl border border-sage/10">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">Séances complétées</span>
                      <span className="text-2xl font-serif text-sage-dark font-bold block mt-1">
                        {profile.visits} {profile.visits > 1 ? 'Visites' : 'Visite'}
                      </span>
                    </div>
                    <div className="bg-beige-sheet p-4 rounded-xl border border-sage/10">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold block">Prochain palier de cadeau</span>
                      <span className="text-2xl font-serif text-gold-dark block mt-1 font-semibold">
                        {profile.points >= 800 ? 'Palier Max' : `${Math.max(100, Math.ceil(profile.points / 100) * 100 - profile.points)} pts`}
                      </span>
                    </div>
                  </div>

                  {/* Progress thresholds to rewards */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2 text-xs">
                      <span className="text-gray-500 uppercase tracking-widest">Progression vers Cadeau Suivant</span>
                      <span className="font-bold text-sage-dark">{Math.min(100, Math.round((profile.points / 800) * 100))}%</span>
                    </div>
                    
                    {/* Progress Bar container */}
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
                      <div
                        className="h-full bg-gradient-to-r from-gold-text to-sage rounded-full"
                        style={{ width: `${Math.min(100, (profile.points / 800) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* List of rewards and unlock states */}
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                    <Gift size={13} className="text-gold-text" />
                    Vos Récompenses débloquées
                  </h5>

                  <div className="space-y-3 mb-8">
                    {LOYALTY_REWARDS.map((reward) => {
                      const isUnlocked = profile.points >= reward.pointsRequired;
                      return (
                        <div
                          key={reward.id}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-4 transition-colors ${
                            isUnlocked
                              ? 'bg-emerald-50/40 border-emerald-200/50 text-gray-800'
                              : 'bg-beige-sheet/50 border-sage/10 opacity-70 text-gray-400'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                              isUnlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {isUnlocked ? <Check size={16} /> : <Award size={16} />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h6 className={`text-xs font-semibold ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                                  {reward.title}
                                </h6>
                                <span className="text-[9px] font-mono font-bold bg-black/5 px-1.5 py-0.5 rounded">
                                  {reward.pointsRequired} pts
                                </span>
                              </div>
                              <p className="text-[11px] font-light mt-0.5 leading-relaxed">{reward.description}</p>
                            </div>
                          </div>

                          <div>
                            {isUnlocked ? (
                              <span className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-700 whitespace-nowrap">
                                Débloqué !
                              </span>
                            ) : (
                              <span className="text-[9px] uppercase tracking-widest font-semibold text-gray-400 whitespace-nowrap">
                                Verrouillé
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Visit History Log (Section 6) */}
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                    <History size={13} className="text-sage" />
                    Historique de vos visites sérénité
                  </h5>

                  {profile.userBookings.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {profile.userBookings.map((bk) => (
                        <div key={bk.id} className="bg-white p-3 rounded-xl border border-sage/10 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-serif font-semibold block text-gray-800">
                              {bookings.find((b) => b.id === bk.id)?.serviceId
                                ? INITIAL_SERVICES.find((s) => s.id === bk.serviceId)?.name
                                : 'Soin Rituels d\'Exception'}
                            </span>
                            <span className="text-[10px] text-gray-400 block mt-0.5 font-mono">ID: {bk.id}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-gray-600 block">{bk.date}</span>
                            <span className={`text-[9px] uppercase font-semibold inline-block px-1.5 py-0.5 rounded mt-1 ${
                              bk.status === 'confirmed' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {bk.status === 'confirmed' ? 'À venir' : 'Complété'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-white rounded-xl border border-dashed border-sage/20 text-xs text-gray-400">
                      Aucune séance historique enregistrée sur ce navigateur. Les réservations que vous effectuez s'afficheront instantanément ici !
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-beige-bg rounded-3xl p-10 border border-sage/15 text-center shadow-md animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                    <Search size={28} />
                  </div>
                  <h4 className="font-serif text-lg text-gray-800 tracking-wide mb-2">Compte introuvable</h4>
                  <p className="text-gray-500 font-light text-xs max-w-sm mx-auto mb-6">
                    Aucun compte n'est encore associé au numéro <strong>"{phoneNumber}"</strong>. Effectuez votre première réservation en ligne pour initier automatiquement votre programme fidélité !
                  </p>
                  <button
                    onClick={() => {
                      setPhoneNumber('demo');
                      // Trigger a search automatically
                      const ev = { preventDefault: () => {} } as React.FormEvent;
                      setSearchPhone('demo');
                      setProfile({
                        phone: 'demo',
                        name: 'Alassane Sanou (Compte Démo)',
                        visits: 6,
                        points: 380,
                        userBookings: [
                          {
                            id: 'B-Demo1',
                            clientName: 'Alassane Sanou',
                            clientPhone: 'demo',
                            clientEmail: 'alassane@gmail.com',
                            serviceId: 's1',
                            date: '2026-05-10',
                            timeSlot: '15:00',
                            therapistId: 't1',
                            status: 'completed',
                            createdAt: '2026-05-09T10:00:00Z',
                            pointsAccumulated: 450,
                          },
                          {
                            id: 'B-Demo2',
                            clientName: 'Alassane Sanou',
                            clientPhone: 'demo',
                            clientEmail: 'alassane@gmail.com',
                            serviceId: 's4',
                            date: '2026-06-01',
                            timeSlot: '12:00',
                            therapistId: 't2',
                            status: 'completed',
                            createdAt: '2026-05-31T14:20:00Z',
                            pointsAccumulated: 300,
                          },
                        ],
                      });
                      setHasSearched(true);
                    }}
                    className="px-5 py-2.5 bg-sage text-white rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-sage-dark transition-colors"
                  >
                    Essayer le compte de Démo
                  </button>
                </div>
              )
            ) : (
              /* Beautiful welcome card when not searched yet */
              <div className="bg-beige-bg rounded-3xl p-10 border border-sage/12 shadow-md flex flex-col items-center justify-center text-center group min-h-[400px]">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gold-light/40 flex items-center justify-center border border-gold-text/30 group-hover:scale-105 transition-transform duration-300">
                    <Star className="text-gold-dark w-10 h-10 stroke-1" />
                  </div>
                  <Award className="absolute -bottom-1 -right-1 text-gold-dark fill-gold-light/70 w-7 h-7" />
                </div>

                <h4 className="font-serif text-xl text-gray-800 mt-6 tracking-wide">
                  En attente de consultation
                </h4>
                <p className="text-gray-500 font-light text-xs max-w-sm mt-3 leading-relaxed">
                  Entrez votre numéro de téléphone WhatsApp dans le formulaire ci-contre pour charger votre espace personnalisé ou utilisez le compte "demo" pour essayer en temps réel de débloquer les récompenses.
                </p>

                <div className="mt-8 pt-6 border-t border-sage/10 w-full grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <span className="font-serif text-lg text-sage-dark font-bold block">100%</span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block mt-1">Sécurisé</span>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <span className="font-serif text-lg text-sage-dark font-bold block">10 FCFA</span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block mt-1">= 1 point</span>
                  </div>
                  <div className="text-center">
                    <span className="font-serif text-lg text-sage-dark font-bold block">4 Paliers</span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block mt-1">De Cadeaux</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
