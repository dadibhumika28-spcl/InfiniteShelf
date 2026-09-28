export type FormatType = 'Paperback' | 'Hardcover' | 'eBook' | 'Audiobook';

export interface BookFormatOption {
  type: FormatType;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount?: number;
  details?: string;
  isDigital?: boolean;
  fileSizeBytes?: number;
  audioDurationMinutes?: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface SampleChapter {
  chapterNumber: number;
  title: string;
  paragraphs: string[];
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorBio?: string;
  cover: string;
  category: string;
  subcategory: string;
  genre: string[];
  rating: number;
  reviewCount: number;
  formats: BookFormatOption[];
  description: string;
  aboutBook?: string;
  aboutAuthor?: string;
  keyThemes: string[];
  publicationDate: string;
  publisher: string;
  language: string;
  pageCount: number;
  isbn: string;
  sampleContent?: SampleChapter[];
  hasAudioSample?: boolean;
  audioSampleDuration?: string;
  audioNarrator?: string;
  specialCollections: string[];
  frequentlyBoughtTogetherIds?: string[];
  similarBookIds?: string[];
  featuredQuote?: string;
}

export interface CartItem {
  id: string; // unique item cart id
  bookId: string;
  format: FormatType;
  price: number;
  originalPrice?: number;
  quantity: number;
  book: Book;
  isDigital: boolean;
}

export type OrderStatus = 'Ordered' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered';

export interface OrderItem {
  bookId: string;
  title: string;
  author: string;
  cover: string;
  format: FormatType;
  price: number;
  quantity: number;
  isDigital: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  isDigitalOnly: boolean;
  shippingAddress?: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  estimatedDelivery?: string;
}

export interface UserLibraryItem {
  id: string;
  bookId: string;
  book: Book;
  format: 'eBook' | 'Audiobook';
  purchasedDate: string;
  readingProgress: number; // 0 - 100%
  lastReadDate: string;
  currentChapter: number;
  currentParagraph?: number;
  audioPositionSeconds?: number;
  bookmarks: {
    id: string;
    chapterNumber: number;
    title: string;
    date: string;
    note?: string;
  }[];
  notes: {
    id: string;
    chapterNumber: number;
    text: string;
    highlightedText?: string;
    date: string;
  }[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  // Category specific 30% visual personality
  theme: {
    bgLight: string;
    bgPill: string;
    borderAccent: string;
    textAccent: string;
    badgeBg: string;
    badgeText: string;
    gradientAccent: string;
  };
  subcategories: string[];
}
