import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';
import { BookCard } from '../books/BookCard';

export const WishlistView: React.FC = () => {
  const { wishlist, getBookById, toggleWishlist, addToCart, navigateTo } = useBookstore();

  const wishlistedBooks = wishlist
    .map((id) => getBookById(id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#E8DEC0] mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
            Saved For Later
          </span>
          <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#1E1B18] mt-1">
            Personal Wishlist ({wishlistedBooks.length})
          </h1>
          <p className="text-xs text-[#7A7063] font-reading italic mt-1">
            Titles you intend to add to your personal library or physical study shelf.
          </p>
        </div>

        {wishlistedBooks.length > 0 && (
          <button
            onClick={() => {
              wishlistedBooks.forEach((book) => addToCart(book, book.formats[0].type, 1));
            }}
            className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-2.5 px-4 rounded-xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add All Available to Bag</span>
          </button>
        )}
      </div>

      {wishlistedBooks.length === 0 ? (
        <div className="text-center py-24 bg-[#FAF8F5] border border-[#DDD3C2] rounded-sm p-8 max-w-lg mx-auto">
          <Heart className="w-12 h-12 text-[#9A8F82] mx-auto mb-3" />
          <h3 className="font-serif-title font-bold text-lg text-[#1E1B18]">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-[#706659] mt-2 leading-relaxed">
            Click the heart icon on any title across our catalog to bookmark it for future reading or gifting.
          </p>
          <button
            onClick={() => navigateTo('explore')}
            className="mt-5 bg-[#23201D] text-white text-xs px-5 py-2.5 rounded-xs font-semibold hover:bg-[#8B2635] transition-colors cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

    </div>
  );
};
