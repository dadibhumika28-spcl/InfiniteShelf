import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  BookOpen, 
  Headphones, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Share2, 
  Check, 
  ArrowLeft,
  ChevronRight,
  Plus,
  Quote,
  Sparkles,
  Play,
  Pause
} from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';
import { Book, FormatType, Review } from '../../types/book';
import { BookCard } from './BookCard';
import { CATEGORIES_DATA } from '../../data/categoriesData';

interface BookDetailViewProps {
  bookId: string;
}

export const BookDetailView: React.FC<BookDetailViewProps> = ({ bookId }) => {
  const {
    getBookById,
    books,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openPreview,
    openAudiobook,
    audioState,
    navigateTo,
    navigateToBookDetail,
    setIsCartOpen,
    showToast
  } = useBookstore();

  const book = getBookById(bookId);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="font-serif-title text-2xl font-bold text-[#1E1B18]">Book Not Found</h2>
        <p className="text-sm text-[#786D60] mt-2">The selected title could not be located in our catalog.</p>
        <button
          onClick={() => navigateTo('explore')}
          className="mt-6 bg-[#23201D] text-white text-xs px-5 py-2.5 rounded font-medium cursor-pointer"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Selected format state (defaults to first available format)
  const [selectedFormat, setSelectedFormat] = useState<FormatType>(book.formats[0].type);
  const [activeTab, setActiveTab] = useState<'about' | 'author' | 'details' | 'reviews'>('about');
  const [bundleAdded, setBundleAdded] = useState(false);

  // Review submission state
  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: 'rev-1',
      userName: 'Dr. Siddharth Sen',
      rating: 5,
      date: 'September 12, 2026',
      title: 'A monumental achievement in literary craftsmanship',
      comment: 'The prose carries a rare, atmospheric gravity. You can smell the wet stone of old libraries. One of the finest works I have read this decade.',
      verifiedPurchase: true
    },
    {
      id: 'rev-2',
      userName: 'Meera Kapur',
      rating: 5,
      date: 'August 28, 2026',
      title: 'Exquisite edition and flawless translation',
      comment: 'Purchased the clothbound hardcover. The paper weight, typography, and binding are museum grade. A true collector piece.',
      verifiedPurchase: true
    },
    {
      id: 'rev-3',
      userName: 'Rohan V.',
      rating: 4,
      date: 'August 04, 2026',
      title: 'Deeply moving and unforgettable',
      comment: 'Captivating from the opening page. The audio version narration is equally brilliant.',
      verifiedPurchase: true
    }
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const currentFormatOption = book.formats.find((f) => f.type === selectedFormat) || book.formats[0];
  const isWishlisted = isInWishlist(book.id);

  // Category theme
  const categoryMeta = CATEGORIES_DATA.find((c) => c.name.toLowerCase() === book.category.toLowerCase());
  const theme = categoryMeta?.theme;

  // Frequently bought together books
  const bundleBooks = (book.frequentlyBoughtTogetherIds || [])
    .map((id) => getBookById(id))
    .filter((b): b is Book => Boolean(b));

  const bundleTotal = book.formats[0].price + bundleBooks.reduce((sum, b) => sum + b.formats[0].price, 0);
  const bundleDiscountedTotal = Math.round(bundleTotal * 0.9); // 10% bundle saving

  // Similar books
  const similarBooks = (book.similarBookIds || [])
    .map((id) => getBookById(id))
    .filter((b): b is Book => Boolean(b))
    .slice(0, 4);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewTitle.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle.trim(),
      comment: newReviewComment.trim(),
      verifiedPurchase: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Your reader review has been published!');
  };

  const handleBuyBundle = () => {
    addToCart(book, book.formats[0].type, 1);
    bundleBooks.forEach((b) => addToCart(b, b.formats[0].type, 1));
    setBundleAdded(true);
    setIsCartOpen(true);
    showToast('Complete 3-Book Bundle added to bag with 10% discount!');
  };

  return (
    <div className="bg-[#FAF8F5] pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#EBE4D8] text-xs text-[#7A7063]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => navigateTo('home')} className="hover:text-[#1E1B18] cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => {
              navigateTo('explore');
            }}
            className="hover:text-[#1E1B18] cursor-pointer"
          >
            Catalog
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className={`${theme?.textAccent || 'text-[#8B2635]'} font-semibold`}>
            {book.category}
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#332C24] font-medium truncate max-w-[200px]">{book.title}</span>
        </div>
      </div>

      {/* Main Product Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Large Book Cover & Spine Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-28 w-full max-w-sm flex flex-col items-center">
              
              {/* Cover Art Box with realistic book spine */}
              <div className="relative w-full aspect-[2/3] max-w-[340px] rounded-xs overflow-hidden book-cover-shadow bg-[#F2ECE3]">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                {/* 3D Realistic Spine Effect */}
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/35 via-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_12px_rgba(0,0,0,0.15)] pointer-events-none" />
              </div>

              {/* Action Buttons under Cover */}
              <div className="mt-6 w-full max-w-[340px] flex flex-col gap-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Legal Sample Read Button */}
                  <button
                    onClick={() => openPreview(book)}
                    className="flex items-center justify-center gap-2 bg-[#FAF8F5] hover:bg-white text-[#23201D] border border-[#DDD3C2] py-2.5 px-3 rounded-xs text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#8B2635]" />
                    <span>Read Sample</span>
                  </button>

                  {/* Audiobook Preview */}
                  {book.hasAudioSample ? (
                    <button
                      onClick={() => openAudiobook(book)}
                      className="flex items-center justify-center gap-2 bg-[#23201D] hover:bg-[#3D352E] text-[#FAF8F5] py-2.5 px-3 rounded-xs text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
                    >
                      <Headphones className="w-4 h-4 text-[#D4A373]" />
                      <span>Audio Excerpt</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-[#9E9485] border border-[#EAE3D6] py-2.5 px-3 rounded-xs">
                      <span>Physical Audio N/A</span>
                    </div>
                  )}
                </div>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(book.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-xs border text-xs font-medium transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-[#8B2635] bg-[#8B2635]/10 text-[#8B2635]'
                      : 'border-[#DDD3C2] hover:bg-white text-[#52493E]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Your Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Curatorial Guarantee Badges */}
              <div className="mt-8 w-full max-w-[340px] border-t border-[#EAE3D6] pt-5 space-y-2 text-[11px] text-[#7A7063]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>Verified ISBN edition with guaranteed authentic provenance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8B2635] shrink-0" />
                  <span>Complimentary pan-India delivery over ₹499 (₹49 standard)</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#6A5E51] shrink-0" />
                  <span>7-day replacement guarantee on defective physical copies</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Metadata, Formats, Buy Options */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Category Banner with 30% Personality Accent */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2">
              <span className={`px-2.5 py-0.5 rounded-xs ${theme?.badgeBg || 'bg-[#8B2635]/10'} ${theme?.badgeText || 'text-[#8B2635]'}`}>
                {book.category}
              </span>
              <span className="text-[#C2B7A8]">/</span>
              <span className="text-[#7A7063] font-medium lowercase first-letter:uppercase">{book.subcategory}</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#1E1B18] tracking-tight leading-tight">
              {book.title}
            </h1>
            {book.subtitle && (
              <h2 className="text-sm sm:text-base font-reading italic text-[#695F52] mt-1">
                {book.subtitle}
              </h2>
            )}

            {/* Author */}
            <div className="mt-2.5 flex items-center gap-2 text-sm text-[#4A4237]">
              <span>by</span>
              <span className="font-serif-title font-bold text-base text-[#1E1B18] hover:text-[#8B2635] transition-colors cursor-pointer">
                {book.author}
              </span>
            </div>

            {/* Ratings & Key Stats */}
            <div className="flex items-center gap-4 mt-3 pb-5 border-b border-[#EAE3D6] text-xs">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-[#C59B27]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating) ? 'fill-current' : 'text-[#D9CEBF]'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-[#1E1B18]">{book.rating}</span>
                <span className="text-[#847B6F]">({book.reviewCount} reviews)</span>
              </div>
              <span className="text-[#CFC4B5]">|</span>
              <span className="text-[#6E6457]">{book.pageCount} Pages</span>
              <span className="text-[#CFC4B5]">|</span>
              <span className="text-[#6E6457]">{book.language}</span>
            </div>

            {/* Featured Literary Quote (if present) */}
            {book.featuredQuote && (
              <div className="mt-5 p-4 bg-[#F5EFEB] border-l-2 border-[#8B2635] rounded-r-xs italic font-reading text-sm text-[#3E362D] leading-relaxed flex items-start gap-3">
                <Quote className="w-4 h-4 text-[#8B2635] shrink-0 mt-0.5" />
                <p>"{book.featuredQuote}"</p>
              </div>
            )}

            {/* FORMAT SELECTOR SECTION */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider">
                  Select Format ({book.formats.length} Available):
                </label>
                <span className="text-xs text-[#7A7063]">
                  {currentFormatOption.isDigital ? '⚡ Instant Delivery to Library' : '📦 Dispatched in 24 hours'}
                </span>
              </div>

              {/* Format Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {book.formats.map((fmt) => {
                  const isSelected = selectedFormat === fmt.type;
                  return (
                    <button
                      key={fmt.type}
                      onClick={() => setSelectedFormat(fmt.type)}
                      className={`text-left p-3 rounded-xs border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#8B2635] bg-[#F8EFF1]/50 ring-1 ring-[#8B2635]'
                          : 'border-[#DDD3C2] bg-[#FAF8F5] hover:border-[#B5A794]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1E1B18] flex items-center gap-1">
                            {fmt.type === 'Audiobook' && <Headphones className="w-3.5 h-3.5 text-[#8B2635]" />}
                            {fmt.type === 'eBook' && <BookOpen className="w-3.5 h-3.5 text-[#8B2635]" />}
                            {fmt.type}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#8B2635]" />}
                        </div>
                        <p className="text-[10px] text-[#7A7063] mt-1 line-clamp-2">
                          {fmt.details || (fmt.isDigital ? 'Digital instant file' : 'Physical copy')}
                        </p>
                      </div>
                      <div className="mt-3">
                        <span className="font-serif-title font-bold text-sm text-[#1E1B18] block">
                          ₹{fmt.price}
                        </span>
                        {fmt.originalPrice && (
                          <span className="text-[10px] text-[#9E9485] line-through block">
                            ₹{fmt.originalPrice}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Notice regarding digital vs physical independence */}
              <p className="text-[11px] text-[#84796B] mt-2 italic">
                * Note: Physical and digital editions are sold independently. Purchasing a physical copy does not include an automatic eBook license.
              </p>
            </div>

            {/* Price Callout & Cart Actions */}
            <div className="mt-6 p-5 bg-[#F2ECE1] border border-[#DDD3C2] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#736759] font-medium block">
                  Edition Price ({selectedFormat})
                </span>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="font-serif-title font-bold text-3xl text-[#1E1B18]">
                    ₹{currentFormatOption.price}
                  </span>
                  {currentFormatOption.originalPrice && (
                    <span className="text-sm text-[#8A7E70] line-through">
                      ₹{currentFormatOption.originalPrice}
                    </span>
                  )}
                  {currentFormatOption.originalPrice && (
                    <span className="text-xs font-semibold text-[#8B2635]">
                      Save {Math.round(((currentFormatOption.originalPrice - currentFormatOption.price) / currentFormatOption.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#695F52] mt-1">
                  Inclusive of all taxes. {currentFormatOption.isDigital ? 'Zero shipping fee.' : 'Free delivery above ₹499.'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(book, selectedFormat, 1)}
                  className="w-full sm:w-auto bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-3 px-6 rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {selectedFormat} to Bag</span>
                </button>
              </div>
            </div>

            {/* Key Themes tags */}
            {book.keyThemes && book.keyThemes.length > 0 && (
              <div className="mt-6 flex items-center gap-2 flex-wrap text-xs">
                <span className="font-semibold text-[#544B3F]">Key Themes:</span>
                {book.keyThemes.map((themeTag) => (
                  <span
                    key={themeTag}
                    className="bg-[#ECE4D8] text-[#4A4237] px-2.5 py-1 rounded-xs text-[11px]"
                  >
                    {themeTag}
                  </span>
                ))}
              </div>
            )}

            {/* FREQUENTLY BOUGHT TOGETHER BUNDLE */}
            {bundleBooks.length > 0 && (
              <div className="mt-10 p-5 bg-[#FAF8F5] border border-[#DDD3C2] rounded-xs shadow-xs">
                <h3 className="font-serif-title font-bold text-base text-[#1E1B18]">
                  Frequently Bought Together
                </h3>
                <p className="text-xs text-[#7A7063] mt-0.5">
                  Curated bundle recommended by literary enthusiasts
                </p>

                <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
                  {/* Covers row */}
                  <div className="flex items-center gap-2">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-14 h-20 object-cover rounded-xs shadow-xs"
                    />
                    <Plus className="w-4 h-4 text-[#8C8275]" />
                    {bundleBooks.map((bb, index) => (
                      <React.Fragment key={bb.id}>
                        <img
                          src={bb.cover}
                          alt={bb.title}
                          className="w-14 h-20 object-cover rounded-xs shadow-xs"
                        />
                        {index < bundleBooks.length - 1 && (
                          <Plus className="w-4 h-4 text-[#8C8275]" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Bundle summary & 1-click CTA */}
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xs text-[#4A4237] leading-snug">
                      <span className="font-semibold">{book.title}</span> + {bundleBooks.map((b) => b.title).join(' + ')}
                    </p>
                    <div className="flex items-baseline justify-center md:justify-start gap-2 mt-1">
                      <span className="font-serif-title font-bold text-lg text-[#1E1B18]">
                        ₹{bundleDiscountedTotal}
                      </span>
                      <span className="text-xs text-[#8C8275] line-through">
                        ₹{bundleTotal}
                      </span>
                      <span className="text-[11px] font-semibold text-[#8B2635]">
                        (10% Bundle Savings)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleBuyBundle}
                    className="w-full md:w-auto bg-[#FAF8F5] hover:bg-[#8B2635] text-[#1E1B18] hover:text-white border border-[#1E1B18] hover:border-[#8B2635] text-xs font-semibold py-2 px-4 rounded-xs transition-colors cursor-pointer shrink-0"
                  >
                    Add All 3 to Bag
                  </button>
                </div>
              </div>
            )}

            {/* TABBED DETAILS NAVIGATION (About Book, About Author, Specs, Reader Reviews) */}
            <div className="mt-12">
              <div className="flex border-b border-[#DDD3C2] gap-6 text-sm font-medium">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`pb-3 relative cursor-pointer ${
                    activeTab === 'about'
                      ? 'text-[#8B2635] font-semibold border-b-2 border-[#8B2635]'
                      : 'text-[#6B6154] hover:text-[#1E1B18]'
                  }`}
                >
                  About the Book
                </button>
                <button
                  onClick={() => setActiveTab('author')}
                  className={`pb-3 relative cursor-pointer ${
                    activeTab === 'author'
                      ? 'text-[#8B2635] font-semibold border-b-2 border-[#8B2635]'
                      : 'text-[#6B6154] hover:text-[#1E1B18]'
                  }`}
                >
                  About the Author
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-3 relative cursor-pointer ${
                    activeTab === 'details'
                      ? 'text-[#8B2635] font-semibold border-b-2 border-[#8B2635]'
                      : 'text-[#6B6154] hover:text-[#1E1B18]'
                  }`}
                >
                  Product Details
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 relative cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'text-[#8B2635] font-semibold border-b-2 border-[#8B2635]'
                      : 'text-[#6B6154] hover:text-[#1E1B18]'
                  }`}
                >
                  Reader Reviews ({reviewsList.length})
                </button>
              </div>

              {/* Tab 1: About Book */}
              {activeTab === 'about' && (
                <div className="py-6 space-y-4 font-reading text-[#3A3228] text-base leading-relaxed animate-fadeIn">
                  <p>{book.description}</p>
                  {book.aboutBook && <p>{book.aboutBook}</p>}
                </div>
              )}

              {/* Tab 2: About Author */}
              {activeTab === 'author' && (
                <div className="py-6 space-y-3 animate-fadeIn">
                  <h4 className="font-serif-title font-bold text-lg text-[#1E1B18]">
                    {book.author}
                  </h4>
                  <p className="font-reading text-sm text-[#4A4237] leading-relaxed">
                    {book.aboutAuthor || book.authorBio || 'Accomplished author celebrated for their profound literary contribution.'}
                  </p>
                </div>
              )}

              {/* Tab 3: Specs Table */}
              {activeTab === 'details' && (
                <div className="py-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-xs border border-[#EAE3D6] rounded-xs p-4 bg-[#FBF9F6]">
                    <div className="flex justify-between py-1 border-b border-[#EAE3D6]">
                      <span className="text-[#7A7063]">Publisher</span>
                      <span className="font-semibold text-[#1E1B18]">{book.publisher}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#EAE3D6]">
                      <span className="text-[#7A7063]">Publication Date</span>
                      <span className="font-semibold text-[#1E1B18]">{book.publicationDate}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#EAE3D6]">
                      <span className="text-[#7A7063]">Language</span>
                      <span className="font-semibold text-[#1E1B18]">{book.language}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#EAE3D6]">
                      <span className="text-[#7A7063]">Print Length</span>
                      <span className="font-semibold text-[#1E1B18]">{book.pageCount} Pages</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#EAE3D6]">
                      <span className="text-[#7A7063]">ISBN-13</span>
                      <span className="font-mono text-[#1E1B18]">{book.isbn}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#EAE3D6]">
                      <span className="text-[#7A7063]">Category / Genre</span>
                      <span className="font-semibold text-[#1E1B18]">{book.category}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Reader Reviews */}
              {activeTab === 'reviews' && (
                <div className="py-6 space-y-8 animate-fadeIn">
                  
                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviewsList.map((rev) => (
                      <div key={rev.id} className="p-4 bg-[#F8F5F0] border border-[#EAE3D6] rounded-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-serif-title font-semibold text-sm text-[#1E1B18]">
                              {rev.userName}
                            </span>
                            {rev.verifiedPurchase && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                                Verified Reader
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#8A7F73]">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-[#C59B27] mt-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-current' : 'text-[#D9CEBF]'
                              }`}
                            />
                          ))}
                        </div>
                        <h5 className="text-xs font-bold text-[#1E1B18] mt-2">{rev.title}</h5>
                        <p className="text-xs text-[#4A4237] mt-1 font-reading leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <form onSubmit={handleAddReview} className="p-5 bg-[#F2ECE1] border border-[#DDD3C2] rounded-xs space-y-3">
                    <h4 className="font-serif-title font-bold text-sm text-[#1E1B18]">
                      Write a Reader Review
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-[#635A4F] block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="e.g. Radhika Sharma"
                          className="w-full bg-[#FAF8F5] border border-[#DDD3C2] text-xs p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#635A4F] block mb-1">Rating</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full bg-[#FAF8F5] border border-[#DDD3C2] text-xs p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                        >
                          <option value={5}>5 Stars - Masterpiece</option>
                          <option value={4}>4 Stars - Great Read</option>
                          <option value={3}>3 Stars - Good</option>
                          <option value={2}>2 Stars - Fair</option>
                          <option value={1}>1 Star - Poor</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[#635A4F] block mb-1">Review Headline</label>
                      <input
                        type="text"
                        required
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        placeholder="Sum up your experience in one sentence"
                        className="w-full bg-[#FAF8F5] border border-[#DDD3C2] text-xs p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#635A4F] block mb-1">Detailed Review</label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="What did you think of the writing style, themes, and pacing?"
                        className="w-full bg-[#FAF8F5] border border-[#DDD3C2] text-xs p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-2 px-5 rounded-xs transition-colors cursor-pointer"
                    >
                      Publish Review
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Similar Books Section */}
        {similarBooks.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#EAE3D6]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
                  Curated Companions
                </span>
                <h3 className="font-serif-title font-bold text-2xl text-[#1E1B18]">
                  Readers Also Explored
                </h3>
              </div>
              <button
                onClick={() => navigateTo('explore')}
                className="text-xs font-semibold text-[#8B2635] hover:underline cursor-pointer"
              >
                Browse All in {book.category} →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similarBooks.map((simBook) => (
                <BookCard key={simBook.id} book={simBook} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
