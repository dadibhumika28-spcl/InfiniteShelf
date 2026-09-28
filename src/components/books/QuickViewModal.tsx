import React, { useState } from 'react';
import { X, Star, Heart, BookOpen, Headphones, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';
import { Book, FormatType } from '../../types/book';

interface QuickViewModalProps {
  book: Book | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ book, onClose }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openPreview, 
    navigateToBookDetail 
  } = useBookstore();

  if (!book) return null;

  // Selected format state (default to first available format)
  const [selectedFormat, setSelectedFormat] = useState<FormatType>(book.formats[0].type);

  const currentFormatOption = book.formats.find((f) => f.type === selectedFormat) || book.formats[0];
  const isWishlisted = isInWishlist(book.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] w-full max-w-3xl max-h-[92vh] rounded-md shadow-2xl border border-[#DFD5C6] flex flex-col md:flex-row overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-[#F2ECE1]/80 hover:bg-[#E8DFD0] text-[#4A4238] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Book Cover & Preview action */}
        <div className="md:w-5/12 bg-[#F3EFE9] p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#E5DDD0]">
          <div className="relative w-44 sm:w-52 shadow-xl rounded-xs overflow-hidden group">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-auto object-cover aspect-[2/3]"
            />
            {/* Spine lighting overlay */}
            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none" />
          </div>

          {/* Sample Read Button */}
          <button
            onClick={() => {
              onClose();
              openPreview(book);
            }}
            className="mt-6 w-full max-w-[210px] flex items-center justify-center gap-2 bg-[#FAF8F5] hover:bg-white text-[#2C2620] border border-[#D5CABB] py-2 px-3 rounded-xs text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#8B2635]" />
            <span>Read Sample Excerpt</span>
          </button>
        </div>

        {/* Right: Metadata & Format Picker */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
          <div>
            {/* Category & Subcategory */}
            <div className="flex items-center gap-2 text-xs text-[#8B2635] font-semibold uppercase tracking-wider mb-1.5">
              <span>{book.category}</span>
              <span className="text-[#C2B7A8]">·</span>
              <span className="text-[#7C7267] font-normal lowercase first-letter:uppercase">{book.subcategory}</span>
            </div>

            {/* Title & Author */}
            <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#1E1B18] leading-snug">
              {book.title}
            </h3>
            {book.subtitle && (
              <p className="text-xs text-[#7A7064] font-reading italic mt-0.5">
                {book.subtitle}
              </p>
            )}
            <p className="text-xs text-[#524A40] mt-1.5 font-reading italic">
              by <span className="font-semibold text-[#1E1B18]">{book.author}</span>
            </p>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-[#C59B27]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(book.rating) ? 'fill-current' : 'text-[#D9CEBF]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#2C2620]">{book.rating}</span>
              <span className="text-xs text-[#847B6F]">({book.reviewCount} customer reviews)</span>
            </div>

            {/* Brief Description */}
            <p className="text-xs text-[#635A4F] mt-3.5 line-clamp-3 leading-relaxed">
              {book.description}
            </p>

            {/* FORMAT SELECTOR (Important: shows only available formats for this book) */}
            <div className="mt-5">
              <label className="text-xs font-semibold text-[#2C2620] uppercase tracking-wider block mb-2">
                Available Formats ({book.formats.length}):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {book.formats.map((fmt) => {
                  const isSelected = selectedFormat === fmt.type;
                  return (
                    <button
                      key={fmt.type}
                      onClick={() => setSelectedFormat(fmt.type)}
                      className={`text-left p-2.5 rounded-xs border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#8B2635] bg-[#F7ECEE]/40 ring-1 ring-[#8B2635]'
                          : 'border-[#DDD4C6] bg-[#FAF8F5] hover:border-[#BDB09E]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1B18] flex items-center gap-1.5">
                          {fmt.type === 'Audiobook' && <Headphones className="w-3.5 h-3.5 text-[#8B2635]" />}
                          {fmt.type === 'eBook' && <BookOpen className="w-3.5 h-3.5 text-[#8B2635]" />}
                          {fmt.type}
                        </span>
                        <span className="text-xs font-bold text-[#8B2635]">
                          ₹{fmt.price}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#7A7064] truncate mt-1">
                        {fmt.details || (fmt.isDigital ? 'Instant Digital Download' : 'Physical print')}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Format Price Callout */}
            <div className="mt-4 p-3 bg-[#F2ECE1] rounded-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#786D60] block">
                  Price for {selectedFormat} edition:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-title font-bold text-xl text-[#1E1B18]">
                    ₹{currentFormatOption.price}
                  </span>
                  {currentFormatOption.originalPrice && (
                    <span className="text-xs text-[#9E9485] line-through">
                      ₹{currentFormatOption.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                {currentFormatOption.isDigital ? 'Instant Access' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-[#E8E0D2] flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                addToCart(book, selectedFormat, 1);
                onClose();
              }}
              className="w-full sm:flex-1 bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-2.5 px-4 rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add {selectedFormat} to Bag</span>
            </button>

            <button
              onClick={() => toggleWishlist(book.id)}
              className={`p-2.5 rounded-xs border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'border-[#8B2635] bg-[#8B2635] text-white'
                  : 'border-[#D9CFBE] bg-[#FAF8F5] text-[#4A4238] hover:border-[#8B2635]'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => {
                onClose();
                navigateToBookDetail(book.id);
              }}
              className="text-xs font-semibold text-[#8B2635] hover:underline flex items-center gap-1 cursor-pointer py-1"
            >
              <span>Full Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
