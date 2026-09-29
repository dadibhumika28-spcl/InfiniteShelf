import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, CartItem, FormatType, Order, UserLibraryItem } from '../types/book';
import { BOOKS_DATA } from '../data/booksData';

export type AppView = 'home' | 'explore' | 'book-detail' | 'cart' | 'library' | 'orders' | 'wishlist';

interface AudioState {
  book: Book;
  isPlaying: boolean;
  currentChapter: number;
  positionSeconds: number;
  playbackRate: number;
}

interface BookstoreContextType {
  // Navigation & Views
  currentView: AppView;
  navigateTo: (view: AppView) => void;
  selectedBookId: string | null;
  navigateToBookDetail: (bookId: string) => void;

  // Search & Exploration
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  activeSpecialCollection: string | null;
  setActiveSpecialCollection: (col: string | null) => void;

  // Books
  books: Book[];
  getBookById: (id: string) => Book | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (book: Book, format: FormatType, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  moveToWishlist: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartDeliveryFee: number;
  cartTotal: number;
  isDigitalOnlyCart: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (shippingAddress: any, paymentMethod: string) => Order;

  // Library (Digital only)
  library: UserLibraryItem[];
  updateReadingProgress: (bookId: string, progress: number, currentChapter: number) => void;
  addBookmark: (bookId: string, chapterNumber: number, title: string, note?: string) => void;
  addNote: (bookId: string, chapterNumber: number, text: string, highlightedText?: string) => void;

  // Active Modals & Players
  activeReadingBook: Book | null;
  openEbookReader: (book: Book) => void;
  closeEbookReader: () => void;

  audioState: AudioState | null;
  openAudiobook: (book: Book, chapter?: number) => void;
  togglePlayAudiobook: () => void;
  seekAudiobook: (seconds: number) => void;
  skipAudiobook: (deltaSeconds: number) => void;
  setAudiobookRate: (rate: number) => void;
  closeAudiobook: () => void;

  previewBook: Book | null;
  openPreview: (book: Book) => void;
  closePreview: () => void;

  quickViewBook: Book | null;
  openQuickView: (book: Book) => void;
  closeQuickView: () => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Chatbot
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  openChat: () => void;

  // Feedback Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const BookstoreContext = createContext<BookstoreContextType | undefined>(undefined);

// Initial Demo Library Items
const INITIAL_LIBRARY: UserLibraryItem[] = [
  {
    id: 'lib-1',
    bookId: 'book-2', // Meditations
    book: BOOKS_DATA[1],
    format: 'eBook',
    purchasedDate: '2026-08-15',
    readingProgress: 42,
    lastReadDate: '2026-09-27',
    currentChapter: 2,
    bookmarks: [
      {
        id: 'bm-1',
        chapterNumber: 2,
        title: 'On the River Gran, Among the Quadi',
        date: '2026-09-27',
        note: 'Crucial reminder about tolerance of others.'
      }
    ],
    notes: [
      {
        id: 'note-1',
        chapterNumber: 2,
        text: 'The Stoic view that others cannot harm my soul unless I assent to evil.',
        highlightedText: 'None of them can hurt me. No one can implicate me in ugliness.',
        date: '2026-09-27'
      }
    ]
  },
  {
    id: 'lib-2',
    bookId: 'book-1', // The Shadow of the Wind
    book: BOOKS_DATA[0],
    format: 'Audiobook',
    purchasedDate: '2026-08-20',
    readingProgress: 18,
    lastReadDate: '2026-09-26',
    currentChapter: 1,
    audioPositionSeconds: 640,
    bookmarks: [],
    notes: []
  }
];

// Initial Demo Orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-98421',
    date: '2026-09-20',
    status: 'Delivered',
    items: [
      {
        bookId: 'book-1',
        title: 'The Shadow of the Wind',
        author: 'Carlos Ruiz Zafón',
        cover: BOOKS_DATA[0].cover,
        format: 'Hardcover',
        price: 799,
        quantity: 1,
        isDigital: false
      },
      {
        bookId: 'book-2',
        title: 'Meditations',
        author: 'Marcus Aurelius',
        cover: BOOKS_DATA[1].cover,
        format: 'eBook',
        price: 99,
        quantity: 1,
        isDigital: true
      }
    ],
    subtotal: 898,
    discount: 0,
    deliveryFee: 0,
    total: 898,
    isDigitalOnly: false,
    shippingAddress: {
      fullName: 'Aarav Sharma',
      phone: '+91 98765 43210',
      street: '42 Heritage Enclave, Civil Lines',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110054'
    },
    paymentMethod: 'UPI (Google Pay)',
    estimatedDelivery: 'Delivered on Sep 24, 2026'
  }
];

export const BookstoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedBookId, setSelectedBookId] = useState<string | null>('book-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeSpecialCollection, setActiveSpecialCollection] = useState<string | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('infinite_shelf_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('infinite_shelf_wishlist');
      return saved ? JSON.parse(saved) : ['book-6', 'book-12'];
    } catch {
      return ['book-6', 'book-12'];
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('infinite_shelf_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Library State
  const [library, setLibrary] = useState<UserLibraryItem[]>(() => {
    try {
      const saved = localStorage.getItem('infinite_shelf_library');
      return saved ? JSON.parse(saved) : INITIAL_LIBRARY;
    } catch {
      return INITIAL_LIBRARY;
    }
  });

  // Modals & Active Viewers
  const [activeReadingBook, setActiveReadingBook] = useState<Book | null>(null);
  const [audioState, setAudioState] = useState<AudioState | null>(null);
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [quickViewBook, setQuickViewBook] = useState<Book | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  };

  // Persist State
  useEffect(() => {
    try {
      localStorage.setItem('infinite_shelf_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('infinite_shelf_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('infinite_shelf_library', JSON.stringify(library));
    } catch (e) {
      console.warn('Failed to save library to localStorage', e);
    }
  }, [library]);

  useEffect(() => {
    try {
      localStorage.setItem('infinite_shelf_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBookDetail = (bookId: string) => {
    setSelectedBookId(bookId);
    setCurrentView('book-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getBookById = (id: string) => {
    return BOOKS_DATA.find((b) => b.id === id);
  };

  // Cart operations
  const addToCart = (book: Book, format: FormatType, quantity: number = 1) => {
    const formatOption = book.formats.find((f) => f.type === format);
    if (!formatOption) {
      showToast(`Format ${format} not available for ${book.title}`);
      return;
    }

    const isDigital = format === 'eBook' || format === 'Audiobook';
    const cartItemId = `${book.id}-${format}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          bookId: book.id,
          format,
          price: formatOption.price,
          originalPrice: formatOption.originalPrice,
          quantity,
          book,
          isDigital
        }
      ];
    });

    showToast(`Added "${book.title}" (${format}) to bag`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const moveToWishlist = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    if (item) {
      if (!wishlist.includes(item.bookId)) {
        setWishlist((prev) => [...prev, item.bookId]);
      }
      removeFromCart(cartItemId);
      showToast(`Moved "${item.book.title}" to your Wishlist`);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SHELF10' || clean === 'READERS10' || clean === 'WELCOME') {
      setAppliedCoupon(clean);
      showToast('Coupon applied: 10% off your purchase!');
      return true;
    }
    showToast('Invalid promo code. Try "SHELF10"');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const cartDiscount = appliedCoupon ? Math.round(cartSubtotal * 0.1) : 0;
  const isDigitalOnlyCart = cart.length > 0 && cart.every((item) => item.isDigital);
  const cartDeliveryFee = isDigitalOnlyCart || cartSubtotal >= 499 || cart.length === 0 ? 0 : 49;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee);

  // Wishlist operations
  const toggleWishlist = (bookId: string) => {
    const book = getBookById(bookId);
    setWishlist((prev) => {
      const exists = prev.includes(bookId);
      if (exists) {
        showToast(book ? `Removed "${book.title}" from Wishlist` : 'Removed from Wishlist');
        return prev.filter((id) => id !== bookId);
      } else {
        showToast(book ? `Saved "${book.title}" to Wishlist` : 'Saved to Wishlist');
        return [...prev, bookId];
      }
    });
  };

  const isInWishlist = (bookId: string) => wishlist.includes(bookId);

  // Checkout & Place Order
  const placeOrder = (shippingAddress: any, paymentMethod: string): Order => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date().toISOString().split('T')[0];

    const orderItems = cart.map((c) => ({
      bookId: c.bookId,
      title: c.book.title,
      author: c.book.author,
      cover: c.book.cover,
      format: c.format,
      price: c.price,
      quantity: c.quantity,
      isDigital: c.isDigital
    }));

    const newOrder: Order = {
      id: orderId,
      date: today,
      status: 'Confirmed',
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      total: cartTotal,
      isDigitalOnly: isDigitalOnlyCart,
      shippingAddress: isDigitalOnlyCart ? undefined : shippingAddress,
      paymentMethod,
      estimatedDelivery: isDigitalOnlyCart
        ? 'Instant Library Access'
        : 'Estimated delivery in 3-5 business days'
    };

    // DIGITAL RULE:
    // Only items purchased in eBook or Audiobook format are added to My Library.
    // Physical purchases (Paperback, Hardcover) must NOT unlock eBook reader!
    const digitalPurchases = cart.filter((item) => item.isDigital);
    if (digitalPurchases.length > 0) {
      setLibrary((prevLibrary) => {
        let updated = [...prevLibrary];
        digitalPurchases.forEach((item) => {
          const format = item.format as 'eBook' | 'Audiobook';
          // Check if already in library
          const existsIndex = updated.findIndex(
            (lib) => lib.bookId === item.bookId && lib.format === format
          );
          if (existsIndex === -1) {
            updated.push({
              id: `lib-${Date.now()}-${item.bookId}`,
              bookId: item.bookId,
              book: item.book,
              format,
              purchasedDate: today,
              readingProgress: 0,
              lastReadDate: today,
              currentChapter: 1,
              audioPositionSeconds: 0,
              bookmarks: [],
              notes: []
            });
          }
        });
        return updated;
      });
    }

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Order ${orderId} placed successfully!`);
    return newOrder;
  };

  // Library actions
  const updateReadingProgress = (bookId: string, progress: number, currentChapter: number) => {
    setLibrary((prev) =>
      prev.map((item) =>
        item.bookId === bookId && item.format === 'eBook'
          ? {
              ...item,
              readingProgress: Math.min(100, Math.max(0, Math.round(progress))),
              currentChapter,
              lastReadDate: new Date().toISOString().split('T')[0]
            }
          : item
      )
    );
  };

  const addBookmark = (bookId: string, chapterNumber: number, title: string, note?: string) => {
    setLibrary((prev) =>
      prev.map((item) => {
        if (item.bookId === bookId && item.format === 'eBook') {
          const newBm = {
            id: `bm-${Date.now()}`,
            chapterNumber,
            title,
            date: new Date().toISOString().split('T')[0],
            note
          };
          return {
            ...item,
            bookmarks: [newBm, ...item.bookmarks]
          };
        }
        return item;
      })
    );
    showToast('Bookmark added');
  };

  const addNote = (bookId: string, chapterNumber: number, text: string, highlightedText?: string) => {
    setLibrary((prev) =>
      prev.map((item) => {
        if (item.bookId === bookId && item.format === 'eBook') {
          const newNote = {
            id: `note-${Date.now()}`,
            chapterNumber,
            text,
            highlightedText,
            date: new Date().toISOString().split('T')[0]
          };
          return {
            ...item,
            notes: [newNote, ...item.notes]
          };
        }
        return item;
      })
    );
    showToast('Annotation saved');
  };

  // Reader Modal
  const openEbookReader = (book: Book) => {
    setActiveReadingBook(book);
  };

  const closeEbookReader = () => {
    setActiveReadingBook(null);
  };

  // Audiobook Controls
  const openAudiobook = (book: Book, chapter: number = 1) => {
    setAudioState({
      book,
      isPlaying: true,
      currentChapter: chapter,
      positionSeconds: 0,
      playbackRate: 1.0
    });
  };

  const togglePlayAudiobook = () => {
    setAudioState((prev) => (prev ? { ...prev, isPlaying: !prev.isPlaying } : null));
  };

  const seekAudiobook = (seconds: number) => {
    setAudioState((prev) => (prev ? { ...prev, positionSeconds: Math.max(0, seconds) } : null));
  };

  const skipAudiobook = (deltaSeconds: number) => {
    setAudioState((prev) => {
      if (!prev) return null;
      const newPos = Math.max(0, prev.positionSeconds + deltaSeconds);
      return { ...prev, positionSeconds: newPos };
    });
  };

  const setAudiobookRate = (playbackRate: number) => {
    setAudioState((prev) => (prev ? { ...prev, playbackRate } : null));
  };

  const closeAudiobook = () => {
    setAudioState(null);
  };

  // Preview & Quickview
  const openPreview = (book: Book) => {
    setPreviewBook(book);
  };

  const closePreview = () => {
    setPreviewBook(null);
  };

  const openQuickView = (book: Book) => {
    setQuickViewBook(book);
  };

  const closeQuickView = () => {
    setQuickViewBook(null);
  };

  return (
    <BookstoreContext.Provider
      value={{
        currentView,
        navigateTo,
        selectedBookId,
        navigateToBookDetail,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        activeSpecialCollection,
        setActiveSpecialCollection,
        books: BOOKS_DATA,
        getBookById,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        moveToWishlist,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartDeliveryFee,
        cartTotal,
        isDigitalOnlyCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        library,
        updateReadingProgress,
        addBookmark,
        addNote,
        activeReadingBook,
        openEbookReader,
        closeEbookReader,
        audioState,
        openAudiobook,
        togglePlayAudiobook,
        seekAudiobook,
        skipAudiobook,
        setAudiobookRate,
        closeAudiobook,
        previewBook,
        openPreview,
        closePreview,
        quickViewBook,
        openQuickView,
        closeQuickView,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isChatOpen,
        setIsChatOpen,
        openChat,
        toastMessage,
        showToast
      }}
    >
      {children}
    </BookstoreContext.Provider>
  );
};

export const useBookstore = () => {
  const context = useContext(BookstoreContext);
  if (!context) {
    throw new Error('useBookstore must be used within a BookstoreProvider');
  }
  return context;
};
