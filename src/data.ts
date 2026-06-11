import { SpaService, Therapist, Testimonial, GalleryItem, LoyaltyReward } from './types';

export const INITIAL_SERVICES: SpaService[] = [
  {
    id: 'm1',
    name: 'Massage femme enceinte',
    description: 'Massage doux et sécurisé, spécialement conçu pour soulager les tensions musculaires, réduire les œdèmes et apporter détente et bien-être à la future maman.',
    duration: 60,
    price: 25000,
    category: 'massage',
    imageUrl: 'https://i.imgur.com/zz8itIw.jpeg'
  },
  {
    id: 'm2',
    name: 'Massage du dos, épaules, cou et tête',
    description: 'Soin ciblé sur les zones de tension les plus fréquentes. Libère les contractures, améliore la circulation et procure une relaxation profonde.',
    duration: 60,
    price: 20000,
    category: 'massage',
    imageUrl: 'https://i.imgur.com/18C8pKM.jpeg',
    options: [
      { label: '60 min', duration: 60, price: 20000 },
      { label: '90 min', duration: 90, price: 28000 }
    ]
  },
  {
    id: 'm3',
    name: 'Massage thaïlandais aux plantes',
    description: 'Technique ancestrale combinant étirements doux et compresses de plantes chaudes pour détoxifier le corps, soulager les douleurs et revitaliser l\'énergie.',
    duration: 90,
    price: 35000,
    category: 'massage',
    imageUrl: 'https://i.imgur.com/hN1L0Ug.jpeg',
    options: [
      { label: '90 min', duration: 90, price: 35000 },
      { label: '120 min', duration: 120, price: 45000 }
    ]
  },
  {
    id: 'm4',
    name: 'Massage épaules, cou et tête',
    description: 'Soin express ou prolongé ciblant les zones de stress quotidien. Idéal seul ou en duo pour se ressourcer rapidement.',
    duration: 30,
    price: 10000,
    category: 'massage',
    imageUrl: 'https://i.imgur.com/Y3A8v4d.jpeg',
    options: [
      { label: '30 min solo', duration: 30, price: 10000 },
      { label: '60 min solo', duration: 60, price: 18000 },
      { label: '60 min duo', duration: 60, price: 32000 }
    ]
  },
  {
    id: 'm5',
    name: 'Massage des pieds',
    description: 'Soin réflexologique et relaxant des pieds, stimulant les points d\'énergie et soulageant la fatigue des jambes. Disponible en solo ou en duo.',
    duration: 60,
    price: 18000,
    category: 'massage',
    imageUrl: 'https://i.imgur.com/fRMhiNT.jpeg',
    options: [
      { label: '60 min solo', duration: 60, price: 18000 },
      { label: '60 min duo', duration: 60, price: 32000 },
      { label: '90 min solo', duration: 90, price: 25000 },
      { label: '90 min duo', duration: 90, price: 45000 }
    ]
  },
  {
    id: 'm6',
    name: 'Massage quatre mains',
    description: 'Expérience unique réalisée par deux thérapeutes en simultané. Synchronisé et enveloppant, il plonge le corps dans un état de relaxation totale et inégalée.',
    duration: 60,
    price: 40000,
    category: 'massage',
    imageUrl: 'https://i.imgur.com/cbL2slw.jpeg',
    options: [
      { label: '60 min', duration: 60, price: 40000 },
      { label: '90 min', duration: 90, price: 55000 },
      { label: '120 min', duration: 120, price: 70000 }
    ]
  },
  {
    id: 'm7',
    name: 'Massage relaxant aux huiles aromatiques',
    description: 'Massage aux huiles essentielles soigneusement sélectionnées pour leurs vertus apaisantes et régénérantes. Un voyage sensoriel complet pour le corps et l\'esprit.',
    duration: 60,
    price: 22000,
    category: 'massage',
    imageUrl: 'https://i.imgur.com/cENAcPK.jpeg',
    options: [
      { label: '60 min solo', duration: 60, price: 22000 },
      { label: '60 min duo', duration: 60, price: 40000 },
      { label: '90 min solo', duration: 90, price: 30000 },
      { label: '90 min duo', duration: 90, price: 55000 },
      { label: '120 min', duration: 120, price: 65000 }
    ]
  },
  {
    id: 'm8',
    name: 'Massage sportif',
    description: 'Massage tonique et profond adapté aux sportifs. Favorise la récupération musculaire, prévient les blessures et améliore les performances physiques.',
    duration: 60,
    price: 25000,
    category: 'massage',
    imageUrl: 'https://i.imgur.com/gDCxaLt.jpeg',
    options: [
      { label: '60 min', duration: 60, price: 25000 },
      { label: '90 min', duration: 90, price: 35000 }
    ]
  },
  {
    id: 'm9',
    name: 'Massage relaxant aux huiles aromatiques chaudes',
    description: 'Alliance du massage aux huiles aromatiques et de la chaleur thérapeutique pour une détente musculaire optimale. La chaleur amplifie les bienfaits des huiles essentielles.',
    duration: 60,
    price: 25000,
    category: 'massage',
    imageUrl: 'https://i.imgur.com/CaSMhl6.jpeg',
    options: [
      { label: '60 min solo', duration: 60, price: 25000 },
      { label: '60 min duo', duration: 60, price: 45000 },
      { label: '90 min solo', duration: 90, price: 35000 },
      { label: '90 min duo', duration: 90, price: 60000 },
      { label: '120 min', duration: 120, price: 75000 }
    ]
  },
  {
    id: 'm10',
    name: 'Gommage et modelage du corps',
    description: 'Soin complet en deux étapes : exfoliation profonde pour éliminer les cellules mortes, suivie d\'un modelage tonifiant pour une peau lisse, douce et lumineuse.',
    duration: 60,
    price: 30000,
    category: 'massage',
    imageUrl: 'https://i.imgur.com/4WmeJf2.jpeg'
  },
  {
    id: 'e1',
    name: 'Épilation jambe entière',
    description: 'Épilation complète des deux jambes à la cire',
    duration: 45,
    price: 12000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/QvoepMd.jpeg'
  },
  {
    id: 'e2',
    name: 'Épilation sourcils',
    description: 'Mise en forme et épilation précise des sourcils',
    duration: 15,
    price: 3000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/YqqfzN4.jpeg'
  },
  {
    id: 'e3',
    name: 'Épilation demi-jambe',
    description: 'Épilation des demi-jambes à la cire douce',
    duration: 30,
    price: 7000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/TW2INXn.jpeg'
  },
  {
    id: 'e4',
    name: 'Épilation aisselles',
    description: 'Épilation des aisselles à la cire',
    duration: 20,
    price: 4000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/NVN1vMf.jpeg'
  },
  {
    id: 'e5',
    name: 'Épilation bras',
    description: 'Épilation complète des bras',
    duration: 30,
    price: 8000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/kOYzCZ6.jpeg'
  },
  {
    id: 'e6',
    name: 'Épilation maillot',
    description: 'Épilation du maillot classique',
    duration: 30,
    price: 6000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/4USfvXj.jpeg'
  },
  {
    id: 'e7',
    name: 'Épilation maillot intégral',
    description: 'Épilation intégrale de la zone maillot',
    duration: 45,
    price: 10000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/a9pEmNQ.jpeg'
  },
  {
    id: 'e8',
    name: 'Épilation moustache',
    description: 'Épilation de la lèvre supérieure',
    duration: 15,
    price: 2500,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/b7abFmE.jpeg'
  },
  {
    id: 'e9',
    name: 'Épilation buste ou dos',
    description: 'Épilation du buste ou du dos',
    duration: 30,
    price: 10000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/v85ZYjp.jpeg'
  },
  {
    id: 'e10',
    name: 'Massage amincissant',
    description: 'Massage drainant ciblé pour affiner la silhouette',
    duration: 60,
    price: 20000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/zYwUGjN.jpeg'
  },
  {
    id: 'e11',
    name: 'Soin du corps',
    description: 'Soin hydratant et restructurant du corps',
    duration: 60,
    price: 18000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/5X3Ew9y.jpeg'
  },
  {
    id: 'e12',
    name: 'Préparation et suivi mariage',
    description: 'Forfait beauté complet pour la mariée',
    duration: 120,
    price: 0,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/QBPisL2.jpeg'
  },
  {
    id: 'e13',
    name: 'Massage relaxant',
    description: 'Massage doux et enveloppant pour se détendre',
    duration: 60,
    price: 20000,
    category: 'esthetique',
    imageUrl: 'https://i.imgur.com/kTY6PmM.jpeg'
  },
  {
    id: 'v1',
    name: 'Soin du visage classique',
    description: 'Nettoyage, exfoliation et hydratation du visage',
    duration: 45,
    price: 12000,
    category: 'visage',
    imageUrl: 'https://i.imgur.com/2rQPNw2.jpeg'
  },
  {
    id: 'v2',
    name: 'Soin anti-âge',
    description: 'Soin raffermissant et lissant pour une peau jeune',
    duration: 60,
    price: 20000,
    category: 'visage',
    imageUrl: 'https://i.imgur.com/S8wrJAw.jpeg'
  },
  {
    id: 'v3',
    name: 'Soin éclat',
    description: 'Masque luminosité + sérum vitaminé',
    duration: 45,
    price: 15000,
    category: 'visage',
    imageUrl: 'https://i.imgur.com/SF5Wd2o.jpeg'
  },
  {
    id: 'v4',
    name: 'Soin purifiant',
    description: 'Traitement des imperfections et pores dilatés',
    duration: 45,
    price: 13000,
    category: 'visage',
    imageUrl: 'https://i.imgur.com/d8PmrN0.jpeg'
  },
  {
    id: 'v5',
    name: 'Épilation du visage',
    description: 'Dépilation complète du contour du visage',
    duration: 30,
    price: 8000,
    category: 'visage',
    imageUrl: 'https://i.imgur.com/TvqYlKE.jpeg'
  },
  {
    id: 'v6',
    name: 'Soin contour des yeux',
    description: 'Soin ciblé anti-cernes et anti-poches',
    duration: 30,
    price: 10000,
    category: 'visage',
    imageUrl: 'https://i.imgur.com/BZhOW6w.jpeg'
  },
  {
    id: 'o1',
    name: 'Pose gel',
    description: 'Application de gel UV pour renforcer et rallonger les ongles avec une finition brillante et durable.',
    duration: 60,
    price: 12000,
    category: 'onglerie',
    imageUrl: 'https://i.imgur.com/mg4wpAo.jpeg'
  },
  {
    id: 'o2',
    name: 'Pose capsules simple',
    description: 'Pose de capsules pour allonger les ongles avec une finition naturelle sans décoration complexe.',
    duration: 45,
    price: 8000,
    category: 'onglerie',
    imageUrl: 'https://i.imgur.com/DPEjdNL.jpeg'
  },
  {
    id: 'o3',
    name: 'Pose vernis permanent',
    description: 'Application d\'un vernis semi-permanent offrant une tenue longue durée et une brillance parfaite.',
    duration: 40,
    price: 6000,
    category: 'onglerie',
    imageUrl: 'https://i.imgur.com/0iUiiPp.jpeg'
  },
  {
    id: 'o4',
    name: 'Pédicure simple',
    description: 'Nettoyage des pieds, coupe et limage des ongles, soin léger pour des pieds propres et soignés.',
    duration: 40,
    price: 5000,
    category: 'onglerie',
    imageUrl: 'https://i.imgur.com/oJZOgiu.jpeg'
  },
  {
    id: 'o5',
    name: 'Manucure simple',
    description: 'Soin des mains comprenant coupe, limage et entretien des ongles naturels.',
    duration: 30,
    price: 4000,
    category: 'onglerie',
    imageUrl: 'https://i.imgur.com/KjD0ClR.jpeg'
  },
  {
    id: 'o6',
    name: 'Pédicure manucure',
    description: 'Soin complet des mains et des pieds avec nettoyage, coupe, limage et finition soignée.',
    duration: 60,
    price: 8000,
    category: 'onglerie',
    imageUrl: 'https://i.imgur.com/QZFRisJ.jpeg'
  },
  {
    id: 'o7',
    name: 'Pose vernis',
    description: 'Application de vernis classique avec la couleur de votre choix.',
    duration: 20,
    price: 3000,
    category: 'onglerie',
    imageUrl: 'https://i.imgur.com/eMwxqbG.jpeg'
  }
];

export const INITIAL_THERAPISTS: Therapist[] = [
  {
    id: 't1',
    name: 'Aminata Diallo',
    role: 'Praticienne Experte Massages & Soins Holistiques',
    specialties: ['Massage Thaïlandais', 'Réflexologie', 'Massage aux Pierres Chaudes'],
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 't2',
    name: 'Sarah Ouédraogo',
    role: 'Esthéticienne diplômée d\'État, Spécialiste Éclat du Visage',
    specialties: ['Soin Visage Hydralift', 'Soin Pureté', 'Modelage Anti-Âge'],
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 't3',
    name: 'Chantal Sawadogo',
    role: 'Styliste Ongulaire de prestige & Soins de Beauté',
    specialties: ['Manucure Privilège', 'Nail Art', 'Pédicure Royale'],
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 't4',
    name: 'Marc Lawson',
    role: 'Ostéopraticien, Spécialiste Massages de Récupération Profonde',
    specialties: ['Massage deep-tissue', 'Relaxation musculaire', 'Massages aux Huiles Sauvages'],
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'e1',
    author: 'Aïcha Tall',
    comment: 'Très bel endroit, très calme et relaxant. Idéal pour s\'évader du tumulte quotidien de Ouagadougou. Les praticiennes sont merveilleuses et à l\'écoute.',
    rating: 5,
    date: '2026-06-02'
  },
  {
    id: 'e2',
    author: 'Jean-Marc Kaboré',
    comment: 'Cadre féerique et personnel accueillant. Le massage thaïlandais est d\'une qualité exceptionnelle, digne des plus grands palaces asiatiques. Une hygiène irréprochable.',
    rating: 5,
    date: '2026-06-08'
  },
  {
    id: 'e3',
    author: 'Mariam Coulibaly',
    comment: 'Une expérience de détente exceptionnelle. La suite privative avec spa et fruits frais est somptueuse. C\'est désormais mon rendez-vous bien-être bimensuel favori.',
    rating: 5,
    date: '2026-06-10'
  },
  {
    id: 'e4',
    author: 'Dr. David Sankara',
    comment: 'Le personnel est hautement qualifié, et le cadre offre un silence apaisant rare à Ouaga 2000. Le massage de récupération par Marc Lawson est une merveille.',
    rating: 4,
    date: '2026-05-28'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  // Massages
  {
    id: 'g1',
    category: 'massage',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800',
    title: 'Massage ancestral aux Pierres chaudes',
    description: 'Une harmonie thermique et magique pour détendre l\'ensemble du corps.'
  },
  {
    id: 'g2',
    category: 'massage',
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800',
    title: 'Precision du Massage Thaïlandais',
    description: 'Des étirements lents pour libérer toute l\'énergie latente.'
  },
  // Beauté
  {
    id: 'g3',
    category: 'visage',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
    title: 'Masque à base d\'ingrédients précieux',
    description: 'Resserre les pores et illumine le teint naturellement.'
  },
  {
    id: 'g4',
    category: 'onglerie',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800',
    title: 'Beauté complète des mains de prestige',
    description: 'Vernis élégant appliqué avec précision et goût.'
  },
  // Equipe
  {
    id: 'g7',
    category: 'equipe',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    title: 'Aminata & l\'équipe de praticiens',
    description: 'Des visages chaleureux et attentionnés, formés aux protocoles d\'or.'
  }
];

export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'r1',
    pointsRequired: 100,
    title: 'Infusion Sérénité & Gâteaux Fins',
    description: 'Un accueil gustatif prolongé dans notre espace jardin de relaxation.',
    isUnlocked: false
  },
  {
    id: 'r2',
    pointsRequired: 250,
    title: 'Upgrade Huile précieuse d\'Or ou de Jasmin',
    description: 'Substitution gratuite de l\'huile classique par une huile luxueuse d\'or 24k ou jasmin sauvage.',
    isUnlocked: false
  },
  {
    id: 'r3',
    pointsRequired: 500,
    title: 'Soin Express Éclat Regard ou Mains (30 min)',
    description: 'Un mini-soin complémentaire au choix lors de votre prochaine visite.',
    isUnlocked: false
  },
  {
    id: 'r4',
    pointsRequired: 800,
    title: 'Soin Massage Relaxant Signature Complet (60 min)',
    description: 'Un massage d\'une heure entière offert par le spa Rituels Ouaga 2000.',
    isUnlocked: false
  }
];

export const INITIAL_AVAILABILITIES = (): string[] => {
  // Generate timeslots starting from 09:00 and ending at 21:00 by 90-minute increments
  return ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00'];
};
