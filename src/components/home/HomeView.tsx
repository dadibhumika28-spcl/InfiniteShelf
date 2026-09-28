import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Clock, 
  Headphones, 
  ChevronRight,
  Bookmark,
  Compass,
  Star
} from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';
import { BookCard } from '../books/BookCard';
import { CATEGORIES_DATA, SPECIAL_COLLECTIONS_META } from '../../data/categoriesData';
import { POPULAR_AUTHORS } from '../../data/booksData';

export const HomeView: React.FC = () => {
  const {
    books,
    library,
    navigateTo,
    navigateToBookDetail,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    openEbookReader,
    openAudiobook
  } = useBookstore();

  const [activeCollectionTab, setActiveCollectionTab] = useState<string>('classics-everyone-should-read');
  const [heroSearchInput, setHeroSearchInput] = useState('');

  // 1. Featured Books (Curator's Spotlight)
  const featuredBooks = books.filter((b) => b.specialCollections.includes('featured') || b.rating >= 4.8).slice(0, 4);

  // 2. Best Sellers
  const bestSellers = books.filter((b) => b.specialCollections.includes('bestseller') || b.reviewCount >= 500).slice(0, 4);

  // 3. New Arrivals & Rare Editions
  const newArrivals = books.slice(4, 8);

  // 4. Recommended For You (Personalized mix)
  const recommendedBooks = books.slice(2, 6);

  // 5. Special Collections filtered by active tab
  const activeCollectionMeta = SPECIAL_COLLECTIONS_META.find((c) => c.id === activeCollectionTab);
  const collectionBooks = books.filter((b) => b.specialCollections.includes(activeCollectionTab));

  // 6. User's In-Progress Reading/Listening (ONLY rendered when user has reading activity)
  const activeReadingItems = library.filter(
    (item) => (item.readingProgress > 0 && item.readingProgress < 100) || (item.audioPositionSeconds && item.audioPositionSeconds > 0)
  );

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      setSearchQuery(heroSearchInput.trim());
      navigateTo('explore');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      
      {/* 1. ELEGANT BRAND HERO */}
      <section className="relative overflow-hidden bg-[#F6F1EA] border-b border-[#E8DEC0]/60 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle Archival Texture background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1E1B18_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#DDD3C2] text-[#8B2635] text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-widest shadow-xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#8B2635]" />
            <span>The Infinite Shelf Curatorial Archive</span>
          </div>

          {/* Main Literary Headline */}
          <h1 className="font-serif-title text-4xl sm:text-6xl font-bold text-[#1E1B18] tracking-tight leading-[1.12]">
            Discover Beyond the Shelf.
          </h1>

          <p className="font-reading text-lg sm:text-xl text-[#595044] max-w-2xl mx-auto mt-4 leading-relaxed italic">
            A sanctuary for discerning bibliophiles. Hand-curated paperbacks, heirloom clothbound hardcovers, pristine eBooks, and evocative narrated audiobooks.
          </p>

          {/* 2. HERO SEARCH BAR */}
          <div className="max-w-2xl mx-auto mt-8 sm:mt-10">
            <form onSubmit={handleHeroSearch} className="relative flex items-center shadow-lg rounded-full">
              <input
                type="text"
                value={heroSearchInput}
                onChange={(e) => setHeroSearchInput(e.target.value)}
                placeholder="Search books, authors, genres, or ISBN..."
                className="w-full bg-white border-2 border-[#D8CEBE] focus:border-[#8B2635] text-sm sm:text-base text-[#1E1B18] placeholder-[#8A8175] rounded-full py-4 pl-12 pr-32 transition-all focus:outline-none focus:ring-2 focus:ring-[#8B2635]/20"
              />
              <Search className="w-5 h-5 text-[#8A8175] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#23201D] hover:bg-[#8B2635] text-white text-xs sm:text-sm font-semibold py-2.5 px-6 rounded-full transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Quick search tags */}
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#7A7063] flex-wrap">
              <span className="font-medium text-[#4A4237]">Popular:</span>
              {['Meditations', 'Shadow of the Wind', 'Jane Austen', 'Harari', 'Stoicism'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    navigateTo('explore');
                  }}
                  className="hover:text-[#8B2635] underline decoration-[#DDD3C2] hover:decoration-[#8B2635] cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTINUE READING / LISTENING (ONLY SHOWN WHEN USER HAS READING ACTIVITY) */}
      {activeReadingItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 bg-[#F3EFE9] border border-[#DDD3C2] rounded-md shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#8B2635]" />
                <h3 className="font-serif-title font-bold text-lg text-[#1E1B18]">
                  Continue Your Journey
                </h3>
              </div>
              <button
                onClick={() => navigateTo('library')}
                className="text-xs font-semibold text-[#8B2635] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Library</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeReadingItems.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#FAF8F5] border border-[#E5DDCF] rounded-xs flex items-center gap-4 hover:shadow-sm transition-all"
                >
                  <img
                    src={item.book.cover}
                    alt={item.book.title}
                    className="w-14 h-20 object-cover rounded-xs shadow-xs"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B2635]">
                        {item.format}
                      </span>
                      <span className="text-xs text-[#847B6F]">
                        {item.format === 'eBook' ? `${item.readingProgress}% read` : 'Listening session'}
                      </span>
                    </div>
                    <h4 className="font-serif-title font-bold text-sm text-[#1E1B18] truncate mt-0.5">
                      {item.book.title}
                    </h4>
                    <p className="text-xs text-[#6B6154] truncate">by {item.book.author}</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-[#E8E0D2] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[#8B2635] h-full rounded-full"
                        style={{ width: `${item.readingProgress}%` }}
                      />
                    </div>
                  </div>

                  {item.format === 'eBook' ? (
                    <button
                      onClick={() => openEbookReader(item.book)}
                      className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-medium px-3.5 py-2 rounded-xs shrink-0 transition-colors cursor-pointer"
                    >
                      Resume
                    </button>
                  ) : (
                    <button
                      onClick={() => openAudiobook(item.book)}
                      className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-medium px-3.5 py-2 rounded-xs shrink-0 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. FEATURED BOOKS (Curator's Spotlight) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E8DEC0]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
              Curator’s Selection
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-1">
              Featured Books
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              navigateTo('explore');
            }}
            className="text-xs sm:text-sm font-semibold text-[#8B2635] hover:text-[#5E1521] flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E8DEC0]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
              Reader Favorites
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-1">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              navigateTo('explore');
            }}
            className="text-xs sm:text-sm font-semibold text-[#8B2635] hover:text-[#5E1521] flex items-center gap-1 cursor-pointer"
          >
            <span>Explore Bestsellers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 6. EXPLORE CATEGORIES (70% Consistent Brand + 30% Category Personality) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
            Curated Genres
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-1">
            Explore Categories
          </h2>
          <p className="font-reading text-sm text-[#6B6154] mt-2 italic">
            Each discipline possesses its unique rhythm, archival cadence, and depth.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES_DATA.map((cat) => {
            const { theme } = cat;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  navigateTo('explore');
                }}
                className={`text-left p-4 rounded-sm border ${theme.borderAccent} ${theme.bgLight} hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.textAccent}`}>
                      {cat.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-xs text-[#52493E] font-reading line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-[11px] text-[#7A7063]">
                  <span>{cat.subcategories.length} Sub-genres</span>
                  <span className="font-medium group-hover:underline">Browse →</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 10. SPECIAL COLLECTIONS TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 bg-[#F4EFE9] border border-[#DDD3C2] rounded-md">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
                Thematic Shelves
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-1">
                Special Collections
              </h2>
              {activeCollectionMeta && (
                <p className="text-xs text-[#6B6154] font-reading italic mt-1">
                  {activeCollectionMeta.subtitle}
                </p>
              )}
            </div>
            
            <button
              onClick={() => {
                setSelectedCategory(null);
                navigateTo('explore');
              }}
              className="text-xs font-semibold text-[#8B2635] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Special Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Collection Tab Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
            {SPECIAL_COLLECTIONS_META.map((col) => {
              const isSelected = activeCollectionTab === col.id;
              return (
                <button
                  key={col.id}
                  onClick={() => setActiveCollectionTab(col.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#8B2635] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#52493E] hover:bg-white border border-[#DDD3C2]'
                  }`}
                >
                  {col.title}
                </button>
              );
            })}
          </div>

          {/* Books in this Special Collection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collectionBooks.length > 0 ? (
              collectionBooks.slice(0, 4).map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <div className="col-span-4 text-center py-8 text-sm text-[#7A7063]">
                Books currently being archived into this special collection.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E8DEC0]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
              Fresh Off The Press
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              navigateTo('explore');
            }}
            className="text-xs sm:text-sm font-semibold text-[#8B2635] hover:text-[#5E1521] flex items-center gap-1 cursor-pointer"
          >
            <span>See Recent Additions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 7. RECOMMENDED FOR YOU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E8DEC0]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
              Tailored For You
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-1">
              Recommended For You
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              navigateTo('explore');
            }}
            className="text-xs sm:text-sm font-semibold text-[#8B2635] hover:text-[#5E1521] flex items-center gap-1 cursor-pointer"
          >
            <span>More Suggestions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 8. POPULAR AUTHORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
            Voices of Significance
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-1">
            Popular Authors
          </h2>
          <p className="font-reading text-sm text-[#6B6154] mt-1 italic">
            Meet the chroniclers, novelists, and thinkers whose works populate our shelves.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_AUTHORS.map((author) => (
            <div
              key={author.id}
              className="p-5 bg-[#FAF8F5] border border-[#E6DDD0] hover:border-[#D0C2AF] rounded-sm transition-all hover:shadow-md text-center flex flex-col items-center justify-between"
            >
              <div className="flex flex-col items-center">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-20 h-20 rounded-full object-cover shadow-sm border-2 border-[#E6DDD0] mb-3"
                />
                <h3 className="font-serif-title font-bold text-base text-[#1E1B18]">
                  {author.name}
                </h3>
                <span className="text-[11px] font-medium text-[#8B2635] uppercase tracking-wider mt-0.5">
                  {author.role}
                </span>
                <p className="text-xs text-[#5C5346] font-reading leading-relaxed mt-2.5 line-clamp-3">
                  {author.bio}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#ECE3D5] w-full text-[11px] text-[#786D60]">
                <p>Notable: <span className="font-semibold text-[#1E1B18]">{author.notableWork}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
