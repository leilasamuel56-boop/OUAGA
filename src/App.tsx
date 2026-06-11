import React, { useState, useEffect } from 'react';
import { SpaService, Booking, BlockedDay } from './types';
import { INITIAL_AVAILABILITIES } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Presentation from './components/Presentation';
import Services from './components/Services';
import BookingSystem from './components/BookingSystem';
import LoyaltySystem from './components/LoyaltySystem';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { Sparkles, ArrowRight, ShieldAlert, Check } from 'lucide-react';

export default function App() {
  // Navigation mode state between standard user 'guest' vs 'admin'
  const [currentView, setCurrentView] = useState<'guest' | 'admin'>('guest');

  // Load and preserve bookings from localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const raw = localStorage.getItem('rituels_bookings');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (err) {
        return [];
      }
    }
    return []; // Start empty so users can try adding their own booking!
  });

  // Load and preserve blocked dates from localStorage
  const [blockedDays, setBlockedDays] = useState<BlockedDay[]>(() => {
    const raw = localStorage.getItem('rituels_blocked_days');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (err) {
        return [];
      }
    }
    // Add one default blocked day for mock demo presentation!
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 3);
    const dateStr = tomorrow.toISOString().split('T')[0];
    return [
      {
        id: 'block-init',
        date: dateStr,
        reason: 'Maintenance technique annuelle des filtrations et vidange des spas.',
      },
    ];
  });

  // Load and preserve available hours from localStorage
  const [availabilities, setAvailabilities] = useState<string[]>(() => {
    const raw = localStorage.getItem('rituels_timeslots');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (err) {
        return INITIAL_AVAILABILITIES();
      }
    }
    return INITIAL_AVAILABILITIES();
  });

  // Preselected service when user clicks "Réserver" on a service card
  const [selectedService, setSelectedService] = useState<SpaService | null>(null);

  // Quick helper to scroll to the booking section
  const handleScrollToBooking = () => {
    setCurrentView('guest');
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pre-select service card and glide view to Reservation form
  const handleSelectServiceForBooking = (service: SpaService) => {
    setSelectedService(service);
    handleScrollToBooking();
  };

  return (
    <div className="bg-beige-bg min-h-screen text-gray-800 antialiased selection:bg-gold-light/40 selection:text-gold-dark">
      
      {/* Absolute high-end warning ribbon to guide testing admin dashboard */}
      <div className="bg-gold-dark text-white/90 text-center py-2 px-4 text-[11px] uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5 z-40 relative">
        <Sparkles size={13} className="text-gold-light animate-pulse" />
        <span>RITUELS OUAGA 2000 — ESPACE DE BIEN-ÊTRE DE PRESTIGE</span>
        <button
          onClick={() => setCurrentView(currentView === 'guest' ? 'admin' : 'guest')}
          className="underline hover:text-white transition decoration-white/50 text-[10px] font-bold bg-white/10 px-2.5 py-0.5 rounded ml-2"
        >
          {currentView === 'admin' ? 'Retourner au Site' : 'Entrer en Administration'}
        </button>
      </div>

      {/* Luxury Sticky Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onBookNow={handleScrollToBooking}
      />

      {/* RENDER VIEW ACCORDING TO STATE CONTROLS */}
      {currentView === 'guest' ? (
        <main className="animate-fade-in">
          {/* Section 1: Hero */}
          <Hero onBookNow={handleScrollToBooking} />

          {/* Section 2: Presentation */}
          <Presentation />

          {/* Section 3: Services */}
          <Services onSelectServiceForBooking={handleSelectServiceForBooking} />

          {/* Section 4 & 5: Advanced Booking Wizard */}
          <BookingSystem
            selectedService={selectedService}
            onBookingComplete={() => {
              // Scroll to result view inside Booking System directly
            }}
            bookings={bookings}
            setBookings={setBookings}
            blockedDays={blockedDays}
          />

          {/* Section 6: Loyalty Program */}
          <LoyaltySystem bookings={bookings} />

          {/* Section 7: Testimonials Slider */}
          <Testimonials />

          {/* Section 8: Premium Gallery */}
          <Gallery />

          {/* Section 9: FAQ */}
          <FAQ />

          {/* Section 11: Contact */}
          <Contact />
        </main>
      ) : (
        /* Espace Administration Views */
        <main className="pt-20">
          <AdminPanel
            bookings={bookings}
            setBookings={setBookings}
            blockedDays={blockedDays}
            setBlockedDays={setBlockedDays}
            availabilities={availabilities}
            setAvailabilities={setAvailabilities}
          />
        </main>
      )}

      {/* Section 12: Footer */}
      <Footer />
    </div>
  );
}
