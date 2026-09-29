/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookstoreProvider, useBookstore } from './context/BookstoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/home/HomeView';
import { ExploreView } from './components/explore/ExploreView';
import { BookDetailView } from './components/books/BookDetailView';
import { OrdersView } from './components/orders/OrdersView';
import { LibraryView } from './components/library/LibraryView';
import { WishlistView } from './components/wishlist/WishlistView';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { QuickViewModal } from './components/books/QuickViewModal';
import { SamplePreviewModal } from './components/books/SamplePreviewModal';
import { EbookReaderModal } from './components/reader/EbookReaderModal';
import { AudiobookPlayerModal } from './components/audiobook/AudiobookPlayerModal';
import { N8nChatWidget } from './components/chat/N8nChatWidget';

const AppContent: React.FC = () => {
  const {
    currentView,
    selectedBookId,
    quickViewBook,
    closeQuickView,
    previewBook,
    closePreview,
    activeReadingBook,
    closeEbookReader,
    toastMessage
  } = useBookstore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#23201D] selection:bg-[#E2D5C3] selection:text-[#1F1C18]">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1E1B18] text-[#FAF8F5] text-xs font-medium px-4 py-2.5 rounded-full shadow-2xl border border-[#3E3834] flex items-center gap-2 animate-bounceIn"
        >
          <span className="w-2 h-2 rounded-full bg-[#8B2635]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Persistent Header */}
      <Header />

      {/* Active View Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'book-detail' && (
          <BookDetailView bookId={selectedBookId || 'book-1'} />
        )}
        {currentView === 'library' && <LibraryView />}
        {currentView === 'orders' && <OrdersView />}
        {currentView === 'wishlist' && <WishlistView />}
      </main>

      {/* Global Modals & Persistent Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <QuickViewModal book={quickViewBook} onClose={closeQuickView} />
      <SamplePreviewModal book={previewBook} onClose={closePreview} />
      <EbookReaderModal book={activeReadingBook} onClose={closeEbookReader} />
      <AudiobookPlayerModal />
      <N8nChatWidget />

      {/* Main Persistent Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BookstoreProvider>
      <AppContent />
    </BookstoreProvider>
  );
}
