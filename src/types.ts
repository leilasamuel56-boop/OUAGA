export interface PriceOption {
  label: string;
  duration: number;
  price: number;
}

export interface SpaService {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number; // in FCFA (or CFA)
  category: 'massage' | 'visage' | 'onglerie' | 'esthetique';
  imageUrl: string;
  options?: PriceOption[];
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  rating: number;
  imageUrl: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  therapistId: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  pointsAccumulated: number;
}

export interface AvailabilitySlot {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  therapistId: string;
  isBooked: boolean;
}

export interface BlockedDay {
  id: string;
  date: string; // YYYY-MM-DD
  reason: string;
}

export interface Testimonial {
  id: string;
  author: string;
  comment: string;
  rating: number;
  date: string;
}

export interface GalleryItem {
  id: string;
  category: 'massage' | 'visage' | 'onglerie' | 'equipe';
  imageUrl: string;
  title: string;
  description: string;
}

export interface LoyaltyReward {
  id: string;
  pointsRequired: number;
  title: string;
  description: string;
  isUnlocked: boolean;
}

export interface ReminderLog {
  id: string;
  bookingId: string;
  recipientName: string;
  recipientPhone: string;
  messageType: 'whatsapp' | 'email';
  timing: 'confirmation' | '24h_before' | '2h_before';
  status: 'sent' | 'pending';
  content: string;
  sentAt?: string;
}
