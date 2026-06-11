import React, { useState } from 'react';
import { Booking, BlockedDay, SpaService, Therapist } from '../types';
import { INITIAL_SERVICES, INITIAL_THERAPISTS } from '../data';
import {
  Calendar, CheckCircle, XCircle, Trash2, Ban, Lock,
  Unlock, Plus, ListFilter, TrendingUp, Users, DollarSign, Percent, Clock
} from 'lucide-react';

interface AdminPanelProps {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  blockedDays: BlockedDay[];
  setBlockedDays: React.Dispatch<React.SetStateAction<BlockedDay[]>>;
  availabilities: string[];
  setAvailabilities: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AdminPanel({
  bookings,
  setBookings,
  blockedDays,
  setBlockedDays,
  availabilities,
  setAvailabilities,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'agenda' | 'stats'>('bookings');

  // Agenda custom forms state
  const [newSlotTime, setNewSlotTime] = useState('');
  const [blockDate, setBlockDate] = useState('');
  const [blockReason, setBlockReason] = useState('');

  // 1. STATS CALCULATIONS (Section 10 Requirements!)
  const services = INITIAL_SERVICES;
  const therapists = INITIAL_THERAPISTS;

  const todayStr = new Date().toISOString().split('T')[0];
  
  // Bookings of today
  const todayBookings = bookings.filter((b) => b.date === todayStr);

  // Bookings of the week
  const getWeekNumber = (d: Date) => {
    const onejan = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
  };
  const weekNumToday = getWeekNumber(new Date());
  
  const weeklyBookings = bookings.filter((b) => {
    const bDate = new Date(b.date);
    return getWeekNumber(bDate) === weekNumToday;
  });

  // Calculate estimated revenue
  const totalRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => {
      const s = services.find((sv) => sv.id === b.serviceId);
      return sum + (s ? s.price : 0);
    }, 0);

  // Cancelled rate and total count
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');
  const totalReservationsCount = bookings.length || 1;
  const cancellationRate = Math.round((cancelledBookings.length / totalReservationsCount) * 100);

  // Top/Most requested services (Section 10)
  const servicePopularity: Record<string, number> = {};
  bookings.forEach((b) => {
    if (b.status !== 'cancelled') {
      servicePopularity[b.serviceId] = (servicePopularity[b.serviceId] || 0) + 1;
    }
  });

  const sortedPopularServices = Object.entries(servicePopularity)
    .map(([id, count]) => ({
      service: services.find((s) => s.id === id)?.name || 'Soin inconnu',
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // Occupancy rate estimate (Simulated percentage of slots booked this week)
  const totalPossibleSlotsThisWeek = therapists.length * availabilities.length * 7;
  const activeWeeklyReservations = weeklyBookings.filter((b) => b.status !== 'cancelled').length;
  const occupancyRate = Math.min(
    100,
    Math.round((activeWeeklyReservations / (totalPossibleSlotsThisWeek || 1)) * 100) || 45
  );

  // Loyal clients list (Section 10 criteria)
  // Gather recurring phone numbers
  const clientVisits: Record<string, { name: string; email: string; count: number; points: number }> = {};
  bookings.forEach((b) => {
    if (b.status !== 'cancelled') {
      const key = b.clientPhone.replace(/\s+/g, '');
      if (!clientVisits[key]) {
        clientVisits[key] = { name: b.clientName, email: b.clientEmail, count: 0, points: 0 };
      }
      clientVisits[key].count += 1;
      clientVisits[key].points += b.pointsAccumulated;
    }
  });

  const loyalClients = Object.entries(clientVisits)
    .map(([phone, info]) => ({
      phone,
      ...info,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // top 5 loyal clients

  // 2. ACTIONS FOR BOOKINGS
  const handleStatusChange = (bookingId: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem('rituels_bookings', JSON.stringify(updated));
  };

  const handleRemoveBooking = (bookingId: string) => {
    if (!window.confirm('Voulez-vous supprimer définitivement cet enregistrement ?')) return;
    const updated = bookings.filter((b) => b.id !== bookingId);
    setBookings(updated);
    localStorage.setItem('rituels_bookings', JSON.stringify(updated));
  };

  // 3. ACTIONS FOR AGENDA (Section 4)
  const handleAddTimeslot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotTime || availabilities.includes(newSlotTime)) return;
    const updated = [...availabilities, newSlotTime].sort();
    setAvailabilities(updated);
    localStorage.setItem('rituels_timeslots', JSON.stringify(updated));
    setNewSlotTime('');
  };

  const handleRemoveTimeslot = (time: string) => {
    if (!window.confirm(`Supprimer le créneau ${time} ?`)) return;
    const updated = availabilities.filter((t) => t !== time);
    setAvailabilities(updated);
    localStorage.setItem('rituels_timeslots', JSON.stringify(updated));
  };

  const handleBlockDay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate) return;
    const newBlock: BlockedDay = {
      id: 'block-' + Date.now(),
      date: blockDate,
      reason: blockReason || 'Fermeture ou maintenance planifiée.',
    };
    const updated = [newBlock, ...blockedDays];
    setBlockedDays(updated);
    localStorage.setItem('rituels_blocked_days', JSON.stringify(updated));
    setBlockDate('');
    setBlockReason('');
  };

  const handleUnblockDay = (id: string) => {
    const updated = blockedDays.filter((day) => day.id !== id);
    setBlockedDays(updated);
    localStorage.setItem('rituels_blocked_days', JSON.stringify(updated));
  };

  return (
    <section id="admin-dashboard-view" className="py-24 sm:py-32 bg-beige-bg animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-sage/12 pb-6 mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold-dark font-serif-luxury text-sm tracking-[0.25em] uppercase">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              CONCIERGERIE INTERNE
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-gray-950 mt-1">
              Tableau de Bord Administrateur
            </h1>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Gérez les disponibilités en temps réel, l'agenda et consultez la rentabilité estimée du spa.
            </p>
          </div>

          {/* Navigation sub tabs */}
          <div className="flex gap-2 bg-beige-sheet p-1 rounded-xl border border-sage/10 self-stretch md:self-auto justify-between">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-sage text-white'
                  : 'text-gray-650 hover:bg-sage-light hover:text-sage-dark'
              }`}
            >
              Réservations
            </button>
            <button
              onClick={() => setActiveTab('agenda')}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'agenda'
                  ? 'bg-sage text-white'
                  : 'text-gray-650 hover:bg-sage-light hover:text-sage-dark'
              }`}
            >
              Agenda Admin
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'stats'
                  ? 'bg-sage text-white'
                  : 'text-gray-650 hover:bg-sage-light hover:text-sage-dark'
              }`}
            >
              Rentabilité (Stats)
            </button>
          </div>
        </div>

        {/* TAB BOARD CONTENT */}

        {/* 1. VIEW ACTIVE USER BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-beige-sheet rounded-3xl border border-sage/12 shadow-md overflow-hidden">
              <div className="p-6 bg-sage-light/30 border-b border-sage/10 flex items-center justify-between">
                <h2 className="font-serif text-lg text-gray-900 tracking-wide">
                  Liste ordonnée de toutes les réservations
                </h2>
                <span className="text-xs font-mono font-medium text-sage-dark bg-white px-3 py-1 rounded-full border border-sage/10">
                  {bookings.length} Demandes d'or
                </span>
              </div>

              {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-beige-bg text-gray-400 uppercase tracking-widest font-semibold border-b border-sage/10 text-[9px]">
                        <th className="py-4 px-6">Client & Téléphone</th>
                        <th className="py-4 px-6">Rituel de soin</th>
                        <th className="py-4 px-6">Date du RDV</th>
                        <th className="py-4 px-6">Heure</th>
                        <th className="py-4 px-6">Esthéticien(ne)</th>
                        <th className="py-4 px-6 text-right">Crédit Fidélité</th>
                        <th className="py-4 px-6">Statut</th>
                        <th className="py-4 px-6 text-right">Actions de Contrôle</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sage/10 text-gray-700">
                      {bookings.map((b) => {
                        const service = services.find((s) => s.id === b.serviceId);
                        const therapist = therapists.find((t) => t.id === b.therapistId);
                        return (
                          <tr key={b.id} className="hover:bg-beige-bg/20 transition-colors">
                            {/* Client card check */}
                            <td className="py-4 px-6">
                              <div className="font-semibold text-gray-900">{b.clientName}</div>
                              <div className="text-gray-450 font-mono text-[10px] mt-0.5">{b.clientPhone}</div>
                              <div className="text-gray-400 font-mono text-[9px] truncate max-w-[150px]">{b.clientEmail}</div>
                            </td>
                            {/* Service and Price details */}
                            <td className="py-4 px-6">
                              <div className="font-medium text-gray-900">{service?.name || 'Soin d\'exception'}</div>
                              <div className="text-gold-dark font-mono font-bold mt-0.5">
                                {service?.price === 0 ? 'Sur devis' : `${service?.price.toLocaleString('fr-FR')} FCFA`}
                              </div>
                            </td>
                            {/* Date */}
                            <td className="py-4 px-6 font-mono text-gray-600 font-semibold">{b.date}</td>
                            {/* Time */}
                            <td className="py-4 px-6 font-mono text-gold-text font-bold">{b.timeSlot}</td>
                            {/* Therapist profile */}
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <img
                                  src={therapist?.imageUrl}
                                  alt=""
                                  className="w-6 h-6 rounded-full object-cover border border-sage/10"
                                />
                                <span className="text-[11px] font-medium text-gray-800">{therapist?.name.split(' ')[0] || 'Praticien'}</span>
                              </div>
                            </td>
                            {/* Loyalty points */}
                            <td className="py-4 px-6 text-right font-bold text-sage">+{b.pointsAccumulated} pts</td>
                            {/* Current dynamic status indicators */}
                            <td className="py-4 px-6">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                b.status === 'confirmed'
                                  ? 'bg-amber-100 text-amber-800'
                                  : b.status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-150 text-red-800 bg-red-50'
                              }`}>
                                {b.status === 'confirmed' && 'Confirmé'}
                                {b.status === 'completed' && 'Soin Fait'}
                                {b.status === 'cancelled' && 'Annulé'}
                              </span>
                            </td>
                            {/* Admin operation click events */}
                            <td className="py-4 px-6 text-right">
                              <div className="flex justify-end gap-1.5">
                                {b.status === 'confirmed' && (
                                  <>
                                    <button
                                      onClick={() => handleStatusChange(b.id, 'completed')}
                                      className="p-1.5 hover:bg-emerald-100 text-emerald-600 rounded transition"
                                      title="Marquer comme complété"
                                    >
                                      <CheckCircle size={15} />
                                    </button>
                                    <button
                                      onClick={() => handleStatusChange(b.id, 'cancelled')}
                                      className="p-1.5 hover:bg-amber-100 text-amber-600 rounded transition"
                                      title="Annuler le rendez-vous"
                                    >
                                      <XCircle size={15} />
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => handleRemoveBooking(b.id)}
                                  className="p-1.5 hover:bg-red-50 text-red-500 rounded transition"
                                  title="Supprimer définitivement"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-gray-450 font-light">
                  Aucune réservation active. Réalisez des réservations côté client pour prévisualiser instantanément ce panneau agenda en temps réel !
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. AGENDA CONTROL (Block days, adjust intervals) */}
        {activeTab === 'agenda' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Block specific days form (Section 4) */}
            <div className="bg-beige-sheet rounded-3xl p-6 sm:p-8 border border-sage/12 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-sage-dark">
                <Lock size={18} />
                <h3 className="font-serif text-lg text-gray-900 tracking-wide">
                  Bloquer un jour exceptionnellement (Fermeture)
                </h3>
              </div>

              <form onSubmit={handleBlockDay} className="space-y-4 mb-8">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5">
                    Sélectionner la date de fermeture
                  </label>
                  <input
                    type="date"
                    required
                    value={blockDate}
                    onChange={(e) => setBlockDate(e.target.value)}
                    className="w-full bg-beige-bg border border-sage/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1.5">
                    Motif ou raison publique affichée aux clients
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Formation de notre équipe de praticiens ou jour férié."
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    className="w-full bg-beige-bg border border-sage/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-sage-dark text-white rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-sage transition-all"
                >
                  Bloquer cette date
                </button>
              </form>

              {/* Blocked Date Lists */}
              <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-3">
                Dates de fermetures en cours actives ({blockedDays.length})
              </h4>

              {blockedDays.length > 0 ? (
                <div className="space-y-2">
                  {blockedDays.map((day) => (
                    <div key={day.id} className="p-3 bg-red-50 rounded-xl border border-red-150 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-red-800 font-bold block">{day.date}</span>
                        <span className="text-[11px] text-red-700 block mt-0.5">{day.reason}</span>
                      </div>
                      <button
                        onClick={() => handleUnblockDay(day.id)}
                        className="text-[10px] uppercase tracking-widest font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-white px-2 py-1 rounded"
                      >
                        <Unlock size={12} />
                        Réouvrir
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-beige-bg rounded-xl text-gray-400 text-xs font-light">
                  Aucun jour de fermeture programmé.
                </div>
              )}
            </div>

            {/* General hours and timeslots intervals form */}
            <div className="bg-beige-sheet rounded-3xl p-6 sm:p-8 border border-sage/12 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-sage-dark">
                <Clock size={18} />
                <h3 className="font-serif text-lg text-gray-900 tracking-wide">
                  Créneaux d'heures d'ouverture actifs
                </h3>
              </div>

              <form onSubmit={handleAddTimeslot} className="flex gap-2 mb-8">
                <div className="flex-1">
                  <input
                    type="text"
                    required
                    placeholder="Ex: 11:30 ou 20:15"
                    value={newSlotTime}
                    onChange={(e) => setNewSlotTime(e.target.value)}
                    className="w-full bg-beige-bg border border-sage/15 rounded-xl px-4 py-2.5 text-xs text-center font-mono tracking-widest focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sage-dark text-white rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-sage transition-all flex items-center gap-1.5"
                >
                  <Plus size={14} /> Incorporer
                </button>
              </form>

              {/* Timeslots display with deletions */}
              <div className="grid grid-cols-4 gap-2">
                {availabilities.map((time) => (
                  <div
                    key={time}
                    className="p-2.5 bg-beige-bg border border-sage/10 rounded-xl flex flex-col items-center justify-between group"
                  >
                    <span className="font-mono text-xs text-gray-800 font-bold tracking-widest">{time}</span>
                    <button
                      onClick={() => handleRemoveTimeslot(time)}
                      className="text-[9px] uppercase tracking-wider text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity mt-1.5 flex items-center gap-0.5"
                    >
                      <Trash2 size={9} /> Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 3. BUSINESS ANALYTICS & STATS (Section 10 Requirements!) */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            
            {/* KPI grid row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Card 1: Revenue */}
              <div className="bg-beige-sheet p-6 rounded-2xl border border-sage/12 shadow-sm">
                <div className="flex items-center justify-between text-gold-dark mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold-light/40 flex items-center justify-center">
                    <DollarSign size={18} />
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">LIVE</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Revenus Estimés</span>
                <span className="text-xl sm:text-2xl font-serif text-gray-900 font-bold block mt-1 truncate">
                  {totalRevenue.toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              {/* Card 2: Today's visits */}
              <div className="bg-beige-sheet p-6 rounded-2xl border border-sage/12 shadow-sm">
                <div className="flex items-center justify-between text-sage-dark mb-4">
                  <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center animate-pulse">
                    <Calendar size={18} />
                  </div>
                  <span className="text-[10px] bg-sage-light text-sage-dark px-2 py-0.5 rounded-full font-bold">Aujourd’hui</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Rendez-vous Jour</span>
                <span className="text-xl sm:text-2xl font-serif text-gray-900 font-bold block mt-1">
                  {todayBookings.length} {todayBookings.length > 1 ? 'Soins' : 'Soin'}
                </span>
              </div>

              {/* Card 3: Weekly visits */}
              <div className="bg-beige-sheet p-6 rounded-2xl border border-sage/12 shadow-sm">
                <div className="flex items-center justify-between text-blue-500 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Calendar size={18} />
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">Hebdomadaire</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Visites de la Semaine</span>
                <span className="text-xl sm:text-2xl font-serif text-gray-900 font-bold block mt-1">
                  {weeklyBookings.length} {weeklyBookings.length > 1 ? 'Séances' : 'Séance'}
                </span>
              </div>

              {/* Card 4: Occupancy Rate */}
              <div className="bg-beige-sheet p-6 rounded-2xl border border-sage/12 shadow-sm">
                <div className="flex items-center justify-between text-emerald-600 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Percent size={18} />
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Remplissage</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Taux d'occupation</span>
                <span className="text-xl sm:text-2xl font-serif text-gray-900 font-bold block mt-1">
                  {occupancyRate}%
                </span>
              </div>

            </div>

            {/* Complex charts grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Popular requested service lists */}
              <div className="bg-beige-sheet rounded-3xl p-6 sm:p-8 border border-sage/12 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-gray-900">
                  <TrendingUp size={18} className="text-sage" />
                  <h3 className="font-serif text-lg tracking-wide font-medium">
                    Services les plus demandés à la carte (Rituels d'Or)
                  </h3>
                </div>

                {sortedPopularServices.length > 0 ? (
                  <div className="space-y-4">
                    {sortedPopularServices.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-gray-800">{item.service}</span>
                          <span className="font-bold text-sage-dark">{item.count} {item.count > 1 ? 'visites' : 'visite'}</span>
                        </div>
                        {/* Custom visually accurate HTML css bars */}
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sage-dark"
                            style={{
                              width: `${Math.min(100, (item.count / (bookings.length || 1)) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 text-xs font-light">
                    Aucune statistique de vente.
                  </div>
                )}
              </div>

              {/* Loyal Clients, Cancel Rate Tracker (Section 10) */}
              <div className="bg-beige-sheet rounded-3xl p-6 sm:p-8 border border-sage/12 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-gray-900">
                  <Users size={18} className="text-gold-dark" />
                  <h3 className="font-serif text-lg tracking-wide font-medium">
                    Top 5 de notre Clientèle Fidèle
                  </h3>
                </div>

                {loyalClients.length > 0 ? (
                  <div className="space-y-3 mb-6">
                    {loyalClients.map((client, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-beige-bg rounded-xl border border-sage/10 text-xs">
                        <div>
                          <strong className="text-gray-900 block">{client.name}</strong>
                          <span className="text-[10px] text-gray-400 block mt-0.5 font-mono">{client.phone}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gold-dark block">{client.points} pts d'Or</span>
                          <span className="text-[10px] text-gray-400 block font-light">{client.count} soins réservés</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400 text-xs font-light mb-6">
                    Aucun client récurrent identifié.
                  </div>
                )}

                {/* Cancellations parameters */}
                <div className="border-t border-sage/10 pt-4 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-gray-400 uppercase tracking-widest block font-bold text-[9px]">Rendez-vous annulés</span>
                    <strong className="text-gray-900 text-base font-serif block mt-0.5">{cancelledBookings.length}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 uppercase tracking-widest block font-bold text-[9px]">Taux d'annulation global</span>
                    <strong className="text-gray-900 text-base font-serif block mt-0.5">{cancellationRate}%</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
