import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, BookOpen, Headphones } from 'lucide-react';
import { Book, FormatType } from '../../types/book';
import { useBookstore } from '../../context/BookstoreContext';
import { CATEGORIES_DATA } from '../../data/categoriesData';

interface BookCardProps {
  book: Book;
  showCategoryTag?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, showCategoryTag = true }) => {
  const {
    navigateToBookDetail,
    openQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useBookstore();

  const isFavorited = isInWishlist(book.id);

  // Find lowest price among available formats
  const lowestPrice = Math.min(...book.formats.map((f) => f.price));
  const defaultFormat = book.formats[0];

  // Match 30% category visual personality
  const categoryMeta = CATEGORIES_DATA.find(
    (c) => c.name.toLowerCase() === book.category.toLowerCase()
  );
  const theme = categoryMeta?.theme;

  return (
    <div className="group relative bg-[#FAF8F5] border border-[#EBE4D8] hover:border-[#D6CBB8] rounded-sm p-3.5 transition-all duration-300 hover:shadow-md flex flex-col justify-between">
      
      {/* Top Cover Container */}
      <div className="relative mb-3.5 overflow-hidden bg-[#F3EFE9] rounded-xs pt-[135%]">
        
        {/* Book Cover Image with spine lighting effect */}
        <button
          onClick={() => navigateToBookDetail(book.id)}
          className="absolute inset-0 w-full h-full cursor-pointer overflow-hidden group/img focus:outline-none"
        >
          <img
            src={book.cover}
            alt={book.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle realistic spine gradient overlay on the left */}
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none" />
          {/* Inner subtle page depth shadow */}
          <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] pointer-events-none" />
        </button>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(book.id);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${
            isFavorited
              ? 'bg-[#8B2635] text-white'
              : 'bg-[#FAF8F5]/90 text-[#4A4238] hover:text-[#8B2635] hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button (hover reveal) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openQuickView(book);
          }}
          className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#1C1917]/90 hover:bg-[#1C1917] text-[#FAF8F5] text-xs py-2 px-3 rounded-xs font-medium tracking-wide flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-xs cursor-pointer shadow-md"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>

        {/* Format indicators badge on top-left */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 pointer-events-none">
          {book.formats.some((f) => f.type === 'Audiobook') && (
            <span
              className="bg-[#23201D]/80 backdrop-blur-xs text-[#EAD8C3] p-1 rounded-xs"
              title="Audiobook available"
            >
              <Headphones className="w-3 h-3" />
            </span>
          )}
          {book.formats.some((f) => f.type === 'eBook') && (
            <span
              className="bg-[#23201D]/80 backdrop-blur-xs text-[#EAD8C3] p-1 rounded-xs"
              title="eBook available"
            >
              <BookOpen className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>

      {/* Book Metadata */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag with 30% distinct personality */}
          {showCategoryTag && (
            <div className="flex items-center gap-1.5 text-[11px] mb-1.5">
              <span
                className={`font-medium tracking-wider uppercase text-[10px] ${
                  theme ? theme.textAccent : 'text-[#8B2635]'
                }`}
              >
                {book.category}
              </span>
              <span className="text-[#C2B7A8]">·</span>
              <span className="text-[#847B6F] truncate">{book.subcategory}</span>
            </div>
          )}

          {/* Title */}
          <button
            onClick={() => navigateToBookDetail(book.id)}
            className="text-left w-full cursor-pointer focus:outline-none"
          >
            <h3 className="font-serif-title font-bold text-base text-[#1E1B18] group-hover:text-[#8B2635] transition-colors line-clamp-1 leading-snug">
              {book.title}
            </h3>
          </button>

          {/* Author */}
          <p className="text-xs text-[#6E6457] mt-0.5 font-reading italic truncate">
            by {book.author}
          </p>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-[#C59B27]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#2C2620]">{book.rating}</span>
            <span className="text-[11px] text-[#8C8377]">({book.reviewCount})</span>
          </div>

          {/* Formats List (unboxed / subtle badges) */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {book.formats.map((f) => (
              <span
                key={f.type}
                className="text-[10px] text-[#6E6457] bg-[#F1ECE3] px-1.5 py-0.5 rounded-xs font-medium"
              >
                {f.type}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Cart Action */}
        <div className="mt-3.5 pt-3 border-t border-[#EDE5D8] flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-[#8C8377] block uppercase tracking-wider">
              From
            </span>
            <span className="font-serif-title font-bold text-base text-[#1C1917]">
              ₹{lowestPrice}
            </span>
          </div>

          <button
            onClick={() => addToCart(book, defaultFormat.type, 1)}
            className="flex items-center gap-1.5 bg-[#23201D] hover:bg-[#8B2635] text-[#FAF8F5] text-xs px-3 py-1.5 rounded-xs font-medium transition-colors cursor-pointer"
            title={`Add ${defaultFormat.type} to Bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
