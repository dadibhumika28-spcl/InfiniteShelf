import { CategoryInfo } from '../types/book';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'classics',
    name: 'Classics',
    tagline: 'Timeless voices that shaped literary civilization.',
    description: 'Masterpieces of world literature, enduring philosophy, and monumental storytelling bound for generational reading.',
    iconName: 'BookMarked',
    theme: {
      bgLight: 'bg-[#F9F5F0]',
      bgPill: 'bg-[#EFE6DC]',
      borderAccent: 'border-[#8B2635]/30',
      textAccent: 'text-[#8B2635]',
      badgeBg: 'bg-[#8B2635]/10',
      badgeText: 'text-[#8B2635]',
      gradientAccent: 'from-[#8B2635]/15 via-transparent to-transparent'
    },
    subcategories: ['Ancient Classics', '19th Century Literature', 'Victorian Novels', 'Philosophical Classics', 'Russian Literature', 'Epic Poetry']
  },
  {
    id: 'history',
    name: 'History',
    tagline: 'Chronicles, archives, and pivotal turning points.',
    description: 'Archival accounts, scholarly biographies, and sweeping chronicles exploring the triumphs and tragedies of civilization.',
    iconName: 'Hourglass',
    theme: {
      bgLight: 'bg-[#F6F2EC]',
      bgPill: 'bg-[#EAE0D3]',
      borderAccent: 'border-[#7F5539]/30',
      textAccent: 'text-[#7F5539]',
      badgeBg: 'bg-[#7F5539]/10',
      badgeText: 'text-[#7F5539]',
      gradientAccent: 'from-[#7F5539]/15 via-transparent to-transparent'
    },
    subcategories: ['World History', 'Indian Heritage', 'Military & Warfare', 'Ancient Civilizations', 'Biographies & Memoirs', 'Cultural History']
  },
  {
    id: 'mystery-thriller',
    name: 'Mystery & Thriller',
    tagline: 'Labyrinths of suspense, deception, and deduction.',
    description: 'Atmospheric noir, intricate psychological puzzles, and heart-racing investigations that defy expectations until the final page.',
    iconName: 'Search',
    theme: {
      bgLight: 'bg-[#F2F4F7]',
      bgPill: 'bg-[#E1E5EB]',
      borderAccent: 'border-[#2C3E50]/30',
      textAccent: 'text-[#1E293B]',
      badgeBg: 'bg-[#1E293B]/10',
      badgeText: 'text-[#1E293B]',
      gradientAccent: 'from-[#1E293B]/15 via-transparent to-transparent'
    },
    subcategories: ['Psychological Thrillers', 'Cozy Mystery', 'Police Procedural', 'Espionage & Crime', 'Nordic Noir', 'Legal Thrillers']
  },
  {
    id: 'romance',
    name: 'Romance',
    tagline: 'Lyrical narratives of devotion, longing, and serendipity.',
    description: 'Subtle elegance, emotional nuance, and heartfelt journeys from slow-burning historic passions to contemporary heartfelt sagas.',
    iconName: 'Heart',
    theme: {
      bgLight: 'bg-[#FBF5F5]',
      bgPill: 'bg-[#F5E6E8]',
      borderAccent: 'border-[#9C6674]/30',
      textAccent: 'text-[#9C6674]',
      badgeBg: 'bg-[#9C6674]/10',
      badgeText: 'text-[#9C6674]',
      gradientAccent: 'from-[#9C6674]/15 via-transparent to-transparent'
    },
    subcategories: ['Historical Romance', 'Contemporary Love', 'Literary Romance', 'Romantic Comedy', 'Enemies to Lovers', 'Regency Sagas']
  },
  {
    id: 'fantasy',
    name: 'Fantasy & Sci-Fi',
    tagline: 'Expansive realms, ancient lore, and celestial wonders.',
    description: 'Immersive mythologies, intricate world-building, magical realism, and interstellar voyages beyond the boundaries of mortal imagination.',
    iconName: 'Sparkles',
    theme: {
      bgLight: 'bg-[#F4F6F9]',
      bgPill: 'bg-[#E3E8F0]',
      borderAccent: 'border-[#3D5A80]/30',
      textAccent: 'text-[#293241]',
      badgeBg: 'bg-[#3D5A80]/10',
      badgeText: 'text-[#3D5A80]',
      gradientAccent: 'from-[#3D5A80]/15 via-transparent to-transparent'
    },
    subcategories: ['High Fantasy', 'Hard Sci-Fi', 'Urban Fantasy', 'Space Opera', 'Magical Realism', 'Dystopian Visions']
  },
  {
    id: 'technology-ai',
    name: 'Technology & AI',
    tagline: 'Frontiers of computing, algorithms, and future systems.',
    description: 'Rigorous treatises on artificial intelligence, systems architecture, human-machine symbiosis, and the architectural bedrock of tomorrow.',
    iconName: 'Cpu',
    theme: {
      bgLight: 'bg-[#F1F6F8]',
      bgPill: 'bg-[#E0EEF3]',
      borderAccent: 'border-[#2B6CB0]/30',
      textAccent: 'text-[#1A4971]',
      badgeBg: 'bg-[#2B6CB0]/10',
      badgeText: 'text-[#1A4971]',
      gradientAccent: 'from-[#2B6CB0]/15 via-transparent to-transparent'
    },
    subcategories: ['Artificial Intelligence', 'Software Architecture', 'Cybersecurity', 'Data Science', 'Human-Computer Interaction', 'Cloud & Networks']
  },
  {
    id: 'science',
    name: 'Science & Cosmos',
    tagline: 'Empirical discovery, astrophysics, and the natural world.',
    description: 'Lucid expositions on quantum reality, evolutionary biology, cosmological physics, and nature written with precision and awe.',
    iconName: 'Atom',
    theme: {
      bgLight: 'bg-[#F0F7F6]',
      bgPill: 'bg-[#DEEFEA]',
      borderAccent: 'border-[#2C7A7B]/30',
      textAccent: 'text-[#234E52]',
      badgeBg: 'bg-[#2C7A7B]/10',
      badgeText: 'text-[#234E52]',
      gradientAccent: 'from-[#2C7A7B]/15 via-transparent to-transparent'
    },
    subcategories: ['Astrophysics', 'Quantum Physics', 'Evolution & Genetics', 'Neuroscience', 'Ecology', 'History of Science']
  },
  {
    id: 'self-help',
    name: 'Self-Help & Mind',
    tagline: 'Quiet wisdom, daily practice, and intentional living.',
    description: 'Calm, grounded frameworks for habit formation, mental clarity, stoic resilience, and mindful personal growth.',
    iconName: 'Compass',
    theme: {
      bgLight: 'bg-[#F7F8F2]',
      bgPill: 'bg-[#EBF0DE]',
      borderAccent: 'border-[#556B2F]/30',
      textAccent: 'text-[#445626]',
      badgeBg: 'bg-[#556B2F]/10',
      badgeText: 'text-[#445626]',
      gradientAccent: 'from-[#556B2F]/15 via-transparent to-transparent'
    },
    subcategories: ['Habits & Routine', 'Stoicism & Philosophy', 'Mindfulness', 'Emotional Intelligence', 'Productivity', 'Communication']
  },
  {
    id: 'business-finance',
    name: 'Business & Finance',
    tagline: 'Strategic leadership, venture creation, and capital wisdom.',
    description: 'Authoritative perspectives from veteran investors, economic thinkers, and operators dissecting market dynamics and wealth creation.',
    iconName: 'TrendingUp',
    theme: {
      bgLight: 'bg-[#F5F6F8]',
      bgPill: 'bg-[#E5E8EE]',
      borderAccent: 'border-[#1E3A8A]/30',
      textAccent: 'text-[#1E3A8A]',
      badgeBg: 'bg-[#1E3A8A]/10',
      badgeText: 'text-[#1E3A8A]',
      gradientAccent: 'from-[#1E3A8A]/15 via-transparent to-transparent'
    },
    subcategories: ['Investing & Wealth', 'Entrepreneurship', 'Corporate Strategy', 'Macroeconomics', 'Leadership', 'Venture Capital']
  },
  {
    id: 'poetry-arts',
    name: 'Poetry & Arts',
    tagline: 'Sensory cadence, visual architecture, and aesthetic expression.',
    description: 'Illuminating monographs on visual design, typography, architectural discourse, and contemplative verse curated with generous white space.',
    iconName: 'Feather',
    theme: {
      bgLight: 'bg-[#F9F4F0]',
      bgPill: 'bg-[#EFE3D8]',
      borderAccent: 'border-[#B45309]/30',
      textAccent: 'text-[#92400E]',
      badgeBg: 'bg-[#B45309]/10',
      badgeText: 'text-[#92400E]',
      gradientAccent: 'from-[#B45309]/15 via-transparent to-transparent'
    },
    subcategories: ['Contemporary Verse', 'Classical Poetry', 'Typography & Design', 'Architecture', 'Art History', 'Photography']
  },
  {
    id: 'children',
    name: 'Children & Young Readers',
    tagline: 'Wonder, gentle curiosity, and the spark of lifelong reading.',
    description: 'Enchanting picture books, illustrated fables, and gentle juvenile novels that instill early wonder and moral empathy.',
    iconName: 'Smile',
    theme: {
      bgLight: 'bg-[#FBF6EE]',
      bgPill: 'bg-[#F5EAD4]',
      borderAccent: 'border-[#D97706]/30',
      textAccent: 'text-[#B45309]',
      badgeBg: 'bg-[#D97706]/10',
      badgeText: 'text-[#B45309]',
      gradientAccent: 'from-[#D97706]/15 via-transparent to-transparent'
    },
    subcategories: ['Picture Books', 'Early Readers', 'Middle Grade', 'Fables & Fairy Tales', 'Illustrated Science', 'Adventure Tales']
  },
  {
    id: 'academic',
    name: 'Academic & Philosophy',
    tagline: 'Rigorous critique, epistemological debate, and scholarly thought.',
    description: 'Scholarly university press publications, critical theory, logic, and comprehensive analytical texts for serious researchers.',
    iconName: 'GraduationCap',
    theme: {
      bgLight: 'bg-[#F4F5F7]',
      bgPill: 'bg-[#E4E6EB]',
      borderAccent: 'border-[#334155]/30',
      textAccent: 'text-[#1E293B]',
      badgeBg: 'bg-[#334155]/10',
      badgeText: 'text-[#1E293B]',
      gradientAccent: 'from-[#334155]/15 via-transparent to-transparent'
    },
    subcategories: ['Epistemology & Logic', 'Political Philosophy', 'Sociology & Culture', 'Linguistics', 'Legal Theory', 'Ethics']
  }
];

export const SPECIAL_COLLECTIONS_META = [
  {
    id: 'classics-everyone-should-read',
    title: 'Classics Everyone Should Read',
    subtitle: 'Foundational works that resonate across centuries',
    badge: 'Essential Canon'
  },
  {
    id: 'books-under-299',
    title: 'Books Under ₹299',
    subtitle: 'Exceptional literature curated for every pocket',
    badge: 'Curated Value'
  },
  {
    id: 'award-winning-books',
    title: 'Award-Winning Books',
    subtitle: 'Booker, Pulitzer, and Nobel laureate triumphs',
    badge: 'Acclaimed'
  },
  {
    id: 'beginner-friendly-reads',
    title: 'Beginner-Friendly Reads',
    subtitle: 'Accessible, gripping gateways into lifelong reading',
    badge: 'Starting Point'
  },
  {
    id: 'books-for-students',
    title: 'Books for Students',
    subtitle: 'Deep mental models, study discipline, and critical thinking',
    badge: 'Scholastic'
  },
  {
    id: 'weekend-reads',
    title: 'Weekend Reads',
    subtitle: 'Unputdownable storytelling perfect for a 48-hour retreat',
    badge: 'Immersive'
  },
  {
    id: 'hidden-gems',
    title: 'Hidden Gems',
    subtitle: 'Overlooked masterpieces deserving of your quiet attention',
    badge: 'Rare Finds'
  }
];
