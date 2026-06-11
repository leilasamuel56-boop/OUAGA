import React, { useState, useEffect } from 'react';
import { SpaService, Therapist, Booking, AvailabilitySlot, BlockedDay, ReminderLog } from '../types';
import { INITIAL_SERVICES, INITIAL_THERAPISTS, INITIAL_AVAILABILITIES } from '../data';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, AlertCircle, Sparkles, MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingSystemProps {
  selectedService: SpaService | null;
  onBookingComplete: () => void;
  // State from parent to keep in sync
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  blockedDays: BlockedDay[];
}

export default function BookingSystem({
  selectedService,
  onBookingComplete,
  bookings,
  setBookings,
  blockedDays,
}: BookingSystemProps) {
  // Services & therapists
  const services = INITIAL_SERVICES;
  const therapists = INITIAL_THERAPISTS;

  // Form states
  const [serviceId, setServiceId] = useState<string>(selectedService?.id || services[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    // Default to tomorrow for booking
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [therapistId, setTherapistId] = useState<string>('any'); // 'any' or specific therapist id
  const [timeSlot, setTimeSlot] = useState<string>('');
  
  // Client personal details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // Result / Step view state
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Select slots, 2: Client Info, 3: Success Screen with redirection
  const [simulatedLogs, setSimulatedLogs] = useState<ReminderLog[]>([]);
  const [lastCreatedBooking, setLastCreatedBooking] = useState<Booking | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  // Sync state if selectedService changes
  useEffect(() => {
    if (selectedService) {
      setServiceId(selectedService.id);
      setStep(1);
    }
  }, [selectedService]);

  // Handle checking if a specific day is blocked by the admin
  const isDayBlocked = blockedDays.some((day) => day.date === selectedDate);
  const matchedBlockedDayReason = blockedDays.find((day) => day.date === selectedDate)?.reason;

  // Generate 30 days from today for selector (extended as requested)
  const availableDates: { dateStr: string; label: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('fr-FR', { weekday: 'short' });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString('fr-FR', { month: 'short' });
    availableDates.push({
      dateStr,
      label: `${dayName} ${dayNum} ${month}`,
    });
  }

  // Get service object from current ID
  const activeService = services.find((s) => s.id === serviceId) || services[0];

  // Get active therapist object
  const activeTherapist = therapists.find((t) => t.id === therapistId);

  // Generate final list of hourly slots and cross reference with existing bookings
  const rawSlots = INITIAL_AVAILABILITIES();
  
  // Filter slots based on active appointments to avoid double books
  const getSlotsStatus = () => {
    return rawSlots.map((time) => {
      // Find if this therapist has a booking at this time
      let alreadyBooked = false;
      if (therapistId === 'any') {
        // If 'any' therapist is selected, slot is taken only if ALL therapists are booked at this time
        const bookingsAtThisTime = bookings.filter(
          (b) => b.date === selectedDate && b.timeSlot === time && b.status === 'confirmed'
        );
        alreadyBooked = bookingsAtThisTime.length >= therapists.length;
      } else {
        alreadyBooked = bookings.some(
          (b) =>
            b.date === selectedDate &&
            b.timeSlot === time &&
            b.status === 'confirmed' &&
            (b.therapistId === therapistId || b.therapistId === 'any')
        );
      }

      return {
        time,
        disabled: alreadyBooked || isDayBlocked,
      };
    });
  };

  const currentSlots = getSlotsStatus();

  // Pick default slot on date change
  useEffect(() => {
    setTimeSlot('');
  }, [selectedDate, therapistId, serviceId]);

  // Handle final submission of booking and simulate real time triggers immediately
  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientEmail || !timeSlot) {
      return;
    }

    // Auto assign therapist if 'any' is selected
    let finalTherapistId = therapistId;
    if (therapistId === 'any') {
      // Find a therapist that doesn't have an slot overlap
      const busyTherapists = bookings
        .filter((b) => b.date === selectedDate && b.timeSlot === timeSlot && b.status === 'confirmed')
        .map((b) => b.therapistId);
      const freeTherapist = therapists.find((t) => !busyTherapists.includes(t.id));
      finalTherapistId = freeTherapist ? freeTherapist.id : therapists[0].id;
    }

    // Calculations of points based on price (1 point per 100 FCFA spent - very rewarding!)
    const pointsAwarded = Math.round(activeService.price / 100);

    const newBooking: Booking = {
      id: 'B-' + Math.floor(100000 + Math.random() * 900000),
      clientName,
      clientPhone,
      clientEmail,
      serviceId,
      date: selectedDate,
      timeSlot,
      therapistId: finalTherapistId,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      pointsAccumulated: pointsAwarded,
    };

    // Update parent bookings state
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('rituels_bookings', JSON.stringify(updatedBookings));

    // Persist loyalty points to loyalty localStorage for instant history update
    const phoneNormalised = clientPhone.replace(/\s+/g, '');
    const clientHistoryRaw = localStorage.getItem(`loyalty_user_${phoneNormalised}`);
    let clientLoyalty = { phone: phoneNormalised, name: clientName, visits: 0, points: 0 };
    if (clientHistoryRaw) {
      clientLoyalty = JSON.parse(clientHistoryRaw);
    }
    clientLoyalty.visits += 1;
    clientLoyalty.points += pointsAwarded;
    localStorage.setItem(`loyalty_user_${phoneNormalised}`, JSON.stringify(clientLoyalty));

    const formattedDate = new Date(selectedDate).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const mockTherapistName = therapists.find((t) => t.id === finalTherapistId)?.name || 'Votre praticien';

    // WhatsApp Redirection Message Format required by user:
    // "Bonjour, je souhaite confirmer mon rendez-vous pour [Nom du Service] le [Date] à [Heure] avec [Praticien]. Nom du client : [Nom du client]. et enfin l adresse e-mail [adresse e-mail du client ]"
    const messageText = `Bonjour, je souhaite confirmer mon rendez-vous pour ${activeService.name} le ${formattedDate} à ${timeSlot} avec ${mockTherapistName}. Nom du client : ${clientName}. et enfin l adresse e-mail ${clientEmail}`;
    const url = `https://wa.me/22672317272?text=${encodeURIComponent(messageText)}`;
    
    setWhatsappUrl(url);
    setLastCreatedBooking(newBooking);

    // Direct redirection trigger with fallback
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      // ignore
    }
    try {
      window.location.href = url;
    } catch (err) {
      // ignore
    }

    setStep(3);
    onBookingComplete();
  };

  const handleResetBooking = () => {
    setStep(1);
    setTimeSlot('');
    setClientName('');
    setClientPhone('');
    setClientEmail('');
  };

  return (
    <section id="reservation" className="py-24 sm:py-32 bg-beige-bg relative overflow-hidden">
      {/* Decorative blurred rings */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-light/10 rounded-full blur-3xl -ml-20" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-sage/5 rounded-full blur-3xl -mr-20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-text font-serif-luxury text-sm tracking-[0.3em] uppercase block mb-3">CONCIERGERIE PRIVÉE</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-wide mb-4">
            Réserver votre Suite de bien-être
          </h2>
          <p className="text-gray-500 font-light text-sm">
            Configurez votre soin exclusif ci-dessous. Notre agenda en temps réel valide immédiatement la disponibilité de votre cabine et de l'équipe.
          </p>
          <div className="w-12 h-[1px] bg-gold-text mx-auto mt-4" />
        </div>

        {/* Dynamic Wizard Body container */}
        <div className="bg-beige-sheet rounded-3xl border border-sage/15 shadow-xl overflow-hidden">
          
          {/* Header Progress indicator */}
          <div className="flex border-b border-sage/10 bg-sage-light/40">
            <button
              onClick={() => step !== 3 && setStep(1)}
              disabled={step === 3}
              className={`flex-1 py-4 text-center text-xs uppercase tracking-widest font-semibold font-sans transition-all flex items-center justify-center gap-2 ${
                step === 1 ? 'text-sage-dark border-b-2 border-sage-dark' : 'text-gray-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-sage-dark text-white text-[10px] flex items-center justify-center">1</span>
              Le Soin & Le Praticien
            </button>
            <button
              onClick={() => step !== 3 && timeSlot && setStep(2)}
              disabled={step === 3 || !timeSlot}
              className={`flex-1 py-4 text-center text-xs uppercase tracking-widest font-semibold font-sans transition-all flex items-center justify-center gap-2 ${
                step === 2 ? 'text-sage-dark border-b-2 border-sage-dark' : 'text-gray-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-gold-text text-white text-[10px] flex items-center justify-center">2</span>
              Vos Informations
            </button>
            <div
              className={`flex-1 py-4 text-center text-xs uppercase tracking-widest font-semibold font-sans transition-all flex items-center justify-center gap-2 ${
                step === 3 ? 'text-emerald-700 bg-emerald-50' : 'text-gray-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center ${step === 3 ? 'bg-emerald-600' : 'bg-gray-300'}`}>✓</span>
              Confirmation & Rappels
            </div>
          </div>

          <div className="p-6 sm:p-12">
            
            {/* Step 1: Services, therapist and slot selection */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Choose Service */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                    1. Sélectionner votre rituel de prestige
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-beige-bg border border-sage/20 rounded-xl px-4 py-3.5 text-sm font-sans text-gray-800 focus:outline-none focus:border-gold-text focus:ring-1 focus:ring-gold-text"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.duration} min — {s.price === 0 ? 'Sur devis' : `${s.price.toLocaleString('fr-FR')} FCFA`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Choose Therapist */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                    2. Confier votre soin à un Praticien d'exception
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {/* Any Therapist option */}
                    <button
                      type="button"
                      onClick={() => setTherapistId('any')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        therapistId === 'any'
                          ? 'border-gold-text bg-gold-light/20 text-gold-dark font-medium'
                          : 'border-sage/15 hover:border-sage'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-sage-light text-sage-dark flex items-center justify-center mx-auto mb-2 text-xs font-bold font-serif">
                        ALL
                      </div>
                      <span className="text-[11px] block tracking-tight">Premier disponible</span>
                    </button>
                    {/* Individual therapists */}
                    {therapists.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTherapistId(t.id)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          therapistId === t.id
                            ? 'border-gold-text bg-gold-light/20 text-gold-dark font-semibold shadow-sm scale-102'
                            : 'border-sage/15 hover:border-sage'
                        }`}
                      >
                        <img
                          src={t.imageUrl}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover mx-auto mb-2 border border-sage/20"
                        />
                        <span className="text-[11px] block font-medium truncate">{t.name.split(' ')[0]}</span>
                        <span className="text-[9px] uppercase text-gray-400 block tracking-tight truncate">{t.role.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>

                  {therapistId !== 'any' && (
                    <p className="text-[11px] text-sage-dark mt-2.5 font-light">
                      ✨ Vous avez choisi <strong>{activeTherapist?.name}</strong>. Spécialité: {activeTherapist?.specialties.join(', ')} (Note clients: {activeTherapist?.rating}★)
                    </p>
                  )}
                </div>

                {/* Choose Date */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                    3. Choisir le jour idéal
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-3 snap-x select-none">
                    {availableDates.map((d) => (
                      <button
                        key={d.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`px-4 py-3 rounded-xl text-center min-w-[95px] border snap-start transition-all cursor-pointer ${
                          selectedDate === d.dateStr
                            ? 'bg-sage-dark text-white border-sage-dark shadow-md scale-102'
                            : 'bg-beige-bg text-gray-600 border-sage/10 hover:border-sage'
                        }`}
                      >
                        <span className="text-[10px] block uppercase tracking-wider">
                          {d.label.split(' ')[0]}
                        </span>
                        <span className="text-lg block font-serif my-0.5">
                          {d.label.split(' ')[1]}
                        </span>
                        <span className="text-[9px] block uppercase tracking-wider opacity-80">
                          {d.label.split(' ')[2]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slots selection */}
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-sage/10 pb-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                      4. Heure de soin en temps réel
                    </label>
                    <span className="text-[10px] uppercase text-sage-dark tracking-widest font-bold">
                      {isDayBlocked ? 'Jour bloqué par le spa' : 'Fente libre de 90 mn'}
                    </span>
                  </div>

                  {isDayBlocked ? (
                    <div className="bg-amber-50 rounded-xl p-5 border border-amber-200/50 flex items-start gap-3">
                      <AlertCircle className="text-amber-600 mt-0.5 shrink-0" size={16} />
                      <div>
                        <h4 className="text-xs uppercase font-bold text-amber-800 tracking-wider">Ce jour est inaccessible</h4>
                        <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                          Motif de l'administration : {matchedBlockedDayReason || 'Fermeture exceptionnelle ou maintenance générale.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                      {currentSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={slot.disabled}
                          onClick={() => setTimeSlot(slot.time)}
                          className={`py-3.5 px-2 rounded-xl text-xs font-semibold text-center tracking-widest font-mono border transition-all ${
                            timeSlot === slot.time
                              ? 'bg-gold-text text-white border-gold-text shadow-md scale-102'
                              : slot.disabled
                              ? 'bg-gray-100 text-gray-350 border-gray-100 cursor-not-allowed line-through opacity-45'
                              : 'bg-beige-bg text-gray-700 border-sage/10 hover:border-gold-text/50'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Next Step confirmation check */}
                <div className="bg-sage-light/30 rounded-2xl p-5 border border-sage/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Soins séléctionnés</span>
                    <p className="text-sm font-serif text-gray-900 mt-0.5 font-semibold">
                      {activeService.name} le {new Date(selectedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} {timeSlot && `à ${timeSlot}`}
                    </p>
                  </div>
                  <button
                    disabled={!timeSlot || isDayBlocked}
                    onClick={() => setStep(2)}
                    className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                      timeSlot && !isDayBlocked
                        ? 'bg-sage-dark text-white hover:bg-sage shadow-md hover:-translate-y-0.5'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Sélectionner l'heure & Suivant
                  </button>
                </div>

              </div>
            )}

            {/* Step 2: Client personal details form */}
            {step === 2 && (
              <form onSubmit={handleFinalBooking} className="space-y-6 animate-fade-in">
                
                {/* Selected overview summary card */}
                <div className="bg-beige-bg rounded-2xl p-6 border border-sage/10 flex flex-wrap gap-6 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={activeService.imageUrl}
                      alt={activeService.name}
                      className="w-16 h-16 rounded-xl object-cover border border-sage/20"
                    />
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-gold-text font-bold">Votre soin choisi</span>
                      <h4 className="font-serif text-base text-gray-900 mt-0.5">{activeService.name}</h4>
                      <div className="flex gap-4 text-[11px] text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><Clock size={12} /> {activeService.duration} mn</span>
                        <span className="font-serif text-gold-dark font-medium">
                          {activeService.price === 0 ? 'Sur devis' : `${activeService.price.toLocaleString('fr-FR')} FCFA`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-l border-sage/15 pl-6">
                    <span className="text-[9px] uppercase tracking-widest text-sage-dark font-bold">Rendez-vous</span>
                    <p className="text-sm font-serif font-semibold text-gray-900 mt-1">
                      {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    <p className="text-xs font-mono font-medium text-gold-text tracking-widest mt-0.5">à {timeSlot}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nom complet */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-550 font-bold mb-2">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-400">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Alassane Sanou"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-beige-bg border border-sage/20 rounded-xl pl-11 pr-4 py-3 text-sm font-sans text-gray-800 focus:outline-none focus:border-gold-text focus:ring-1 focus:ring-gold-text"
                      />
                    </div>
                  </div>

                  {/* Numéro WhatsApp */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-550 font-bold mb-2">
                      Téléphone WhatsApp (avec indicatif) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-400">
                        <Phone size={16} />
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: +226 72 31 72 72"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-beige-bg border border-sage/20 rounded-xl pl-11 pr-4 py-3 text-sm font-sans text-gray-800 focus:outline-none focus:border-gold-text focus:ring-1 focus:ring-gold-text"
                      />
                    </div>
                    <span className="text-[10px] text-sage block mt-1.5 font-light italic">
                      ✓ Utilisé pour l'envoi instantané de vos rappels d'or.
                    </span>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-550 font-bold mb-2">
                    Adresse Email *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Ex: alassane@gmail.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-beige-bg border border-sage/20 rounded-xl pl-11 pr-4 py-3 text-sm font-sans text-gray-800 focus:outline-none focus:border-gold-text focus:ring-1 focus:ring-gold-text"
                    />
                  </div>
                </div>

                <div className="border-t border-sage/10 pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Previous step trigger */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 font-bold transition-all border border-sage/20 bg-transparent text-center"
                  >
                    Retour aux créneaux
                  </button>

                  {/* Final Submit action button */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-sage-dark hover:bg-sage text-white rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg flex items-center justify-center gap-2.5 active:scale-98"
                    id="submit-booking-form-btn"
                  >
                    <CheckCircle2 size={16} />
                    <span>Confirmer mon rendez-vous</span>
                  </button>
                </div>

              </form>
            )}

            {/* Step 3: WhatsApp Automatic Redirection & Status Fallback */}
            {step === 3 && lastCreatedBooking && (
              <div className="space-y-8 animate-fade-in text-center">
                
                {/* Check/WhatsApp icon */}
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-250 animate-pulse">
                  <MessageCircle size={32} />
                </div>

                <div>
                  <span className="text-[10px] uppercase font-serif-luxury tracking-[0.3em] text-emerald-700 font-bold block mb-2">
                    Réservation Enregistrée !
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-gray-900 tracking-wide mb-3">
                    Redirection vers WhatsApp en cours...
                  </h3>
                  <p className="text-gray-500 font-light text-sm max-w-xl mx-auto leading-relaxed">
                    Votre créneau a été enregistré. Nous vous redirigeons directement vers notre service client au <strong>+226 72 31 72 72</strong> avec votre message pré-rempli pour valider instantanément votre soin.
                  </p>
                </div>

                {/* Direct Action Button */}
                <div className="py-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-lg hover:-translate-y-0.5 active:scale-98"
                  >
                    <MessageCircle size={16} />
                    <span>Ouvrir WhatsApp Manuellement</span>
                  </a>
                  <p className="text-[11px] text-gray-400 mt-3 italic">
                    💡 Si la redirection ne s'ouvre pas automatiquement, veuillez cliquer sur le bouton ci-dessus.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-beige-bg rounded-2xl p-6 border border-sage/10 text-left max-w-md mx-auto divide-y divide-sage/10 text-gray-750">
                  <div className="pb-3 flex justify-between items-center text-xs">
                    <span className="text-gray-400 uppercase tracking-widest">Référence</span>
                    <span className="font-mono font-bold text-gray-850">{lastCreatedBooking.id}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center text-xs">
                    <span className="text-gray-400 uppercase tracking-widest">Soin</span>
                    <span className="font-serif text-gray-850 text-right font-medium">{activeService.name}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center text-xs">
                    <span className="text-gray-400 uppercase tracking-widest">Date & Heure</span>
                    <span className="font-serif text-gray-850 text-right font-medium">
                      {new Date(selectedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} à {timeSlot}
                    </span>
                  </div>
                  <div className="py-3 flex justify-between items-center text-xs">
                    <span className="text-gray-400 uppercase tracking-widest">Client</span>
                    <span className="font-sans text-gray-850 text-right font-medium">{clientName}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center text-xs">
                    <span className="text-gray-400 uppercase tracking-widest">Adresse E-mail</span>
                    <span className="font-sans text-gray-850 text-right font-medium break-all">{clientEmail}</span>
                  </div>
                </div>

                {/* Reset button */}
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={handleResetBooking}
                    className="px-6 py-3 bg-sage-light text-sage-dark hover:bg-sage/10 rounded-full text-xs uppercase tracking-widest font-semibold transition-all border border-sage/20"
                  >
                    Faire une autre réservation
                  </button>
                  <a
                    href="#loyalty"
                    className="px-6 py-3 bg-gold-text text-white hover:bg-gold-dark rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-md text-center"
                  >
                    Consulter mes points Fidélité
                  </a>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
