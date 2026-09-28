import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';
import { BookCard } from '../books/BookCard';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { FormatType } from '../../types/book';

export const ExploreView: React.FC = () => {
  const {
    books,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useBookstore();

  // Filter States
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<'all' | 'under-299' | '299-499' | '499-999' | 'above-1000'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedFormat, setSelectedFormat] = useState<FormatType | 'all'>('all');
  const [availability, setAvailability] = useState<'all' | 'in-stock' | 'digital-only'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'popularity' | 'rating' | 'newest' | 'price-asc' | 'price-desc'>('relevance');

  // Mobile Filter Drawer State
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Extract unique filter options from books
  const allAuthors = useMemo(() => Array.from(new Set(books.map((b) => b.author))), [books]);
  const allGenres = useMemo(() => Array.from(new Set(books.flatMap((b) => b.genre))), [books]);
  const allLanguages = useMemo(() => Array.from(new Set(books.map((b) => b.language.split(' ')[0]))), [books]);

  // Current category metadata for subcategories and 30% theme
  const currentCategoryData = CATEGORIES_DATA.find(
    (c) => c.name.toLowerCase() === (selectedCategory || '').toLowerCase()
  );

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedGenre(null);
    setSelectedAuthor(null);
    setPriceRange('all');
    setMinRating(0);
    setSelectedFormat('all');
    setAvailability('all');
    setSelectedLanguage(null);
    setSearchQuery('');
  };

  // Filter Logic
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // 1. Search Query (across title, author, category, ISBN, genre)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = book.title.toLowerCase().includes(query);
        const matchesAuthor = book.author.toLowerCase().includes(query);
        const matchesCategory = book.category.toLowerCase().includes(query);
        const matchesIsbn = book.isbn.toLowerCase().includes(query);
        const matchesGenre = book.genre.some((g) => g.toLowerCase().includes(query));
        if (!matchesTitle && !matchesAuthor && !matchesCategory && !matchesIsbn && !matchesGenre) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory && selectedCategory !== 'All') {
        if (book.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // 3. Subcategory
      if (selectedSubcategory) {
        if (book.subcategory.toLowerCase() !== selectedSubcategory.toLowerCase()) {
          return false;
        }
      }

      // 4. Genre
      if (selectedGenre) {
        if (!book.genre.includes(selectedGenre)) {
          return false;
        }
      }

      // 5. Author
      if (selectedAuthor) {
        if (book.author !== selectedAuthor) {
          return false;
        }
      }

      // 6. Format
      if (selectedFormat !== 'all') {
        if (!book.formats.some((f) => f.type === selectedFormat)) {
          return false;
        }
      }

      // 7. Price
      const minPrice = Math.min(...book.formats.map((f) => f.price));
      if (priceRange === 'under-299' && minPrice >= 299) return false;
      if (priceRange === '299-499' && (minPrice < 299 || minPrice > 499)) return false;
      if (priceRange === '499-999' && (minPrice < 499 || minPrice > 999)) return false;
      if (priceRange === 'above-1000' && minPrice < 1000) return false;

      // 8. Rating
      if (minRating > 0 && book.rating < minRating) {
        return false;
      }

      // 9. Availability
      if (availability === 'in-stock') {
        if (!book.formats.some((f) => f.inStock)) return false;
      }
      if (availability === 'digital-only') {
        if (!book.formats.some((f) => f.isDigital)) return false;
      }

      // 10. Language
      if (selectedLanguage) {
        if (!book.language.includes(selectedLanguage)) return false;
      }

      return true;
    });
  }, [
    books,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedGenre,
    selectedAuthor,
    selectedFormat,
    priceRange,
    minRating,
    availability,
    selectedLanguage
  ]);

  // Sort Logic
  const sortedBooks = useMemo(() => {
    const list = [...filteredBooks];
    switch (sortBy) {
      case 'popularity':
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'price-asc':
        return list.sort((a, b) => Math.min(...a.formats.map((f) => f.price)) - Math.min(...b.formats.map((f) => f.price)));
      case 'price-desc':
        return list.sort((a, b) => Math.min(...b.formats.map((f) => f.price)) - Math.min(...a.formats.map((f) => f.price)));
      case 'newest':
        return list.sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
      case 'relevance':
      default:
        return list;
    }
  }, [filteredBooks, sortBy]);

  const activeFiltersCount = 
    (selectedCategory && selectedCategory !== 'All' ? 1 : 0) +
    (selectedSubcategory ? 1 : 0) +
    (selectedGenre ? 1 : 0) +
    (selectedAuthor ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (selectedFormat !== 'all' ? 1 : 0) +
    (availability !== 'all' ? 1 : 0) +
    (selectedLanguage ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8DEC0]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
              Literary Archive
            </span>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#1E1B18] mt-1">
              {selectedCategory && selectedCategory !== 'All' ? selectedCategory : 'Browse Catalog'}
            </h1>
            {currentCategoryData ? (
              <p className="text-xs font-reading italic text-[#6B6154] mt-1">
                {currentCategoryData.description}
              </p>
            ) : (
              <p className="text-xs font-reading italic text-[#6B6154] mt-1">
                Explore thousands of curated titles across physical print, digital eBook, and narrated audio.
              </p>
            )}
          </div>

          {/* Active Filter Counter & Clear Button */}
          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 text-xs text-[#8B2635] hover:text-[#5E1521] font-semibold py-1 px-3 bg-[#8B2635]/10 rounded-full cursor-pointer self-start md:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset {activeFiltersCount} Active Filters</span>
            </button>
          )}
        </div>

        {/* Search Bar & Sorting Controls Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, author, genre, or ISBN..."
              className="w-full bg-[#FAF8F5] border border-[#DDD3C2] text-xs text-[#1E1B18] rounded-full py-2.5 pl-9 pr-8 focus:outline-none focus:border-[#8B2635]"
            />
            <Search className="w-4 h-4 text-[#8A8175] absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A8175] hover:text-[#1E1B18]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sorting Dropdown & Mobile Filter Button */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 text-xs font-semibold bg-[#F2ECE1] border border-[#DDD3C2] py-2 px-3.5 rounded-xs text-[#2C2620] cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#786D60] hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#FAF8F5] border border-[#DDD3C2] text-[#1E1B18] text-xs font-medium py-2 px-3 rounded-xs focus:outline-none focus:border-[#8B2635] cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="popularity">Popularity / Review Count</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Quick Chips / Personality Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mt-4 scrollbar-none">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
              !selectedCategory || selectedCategory === 'All'
                ? 'bg-[#23201D] text-white'
                : 'bg-[#F2ECE1] text-[#554C41] hover:bg-[#EAE2D5]'
            }`}
          >
            All Genres
          </button>
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? `${cat.theme.badgeBg} ${cat.theme.badgeText} font-bold ring-1 ring-current`
                    : 'bg-[#F2ECE1] text-[#554C41] hover:bg-[#EAE2D5]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid with Sidebar Filter Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block space-y-6 bg-[#FAF8F5] border border-[#E8DEC0] rounded-sm p-5 self-start sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC0]">
            <h3 className="font-serif-title font-bold text-sm text-[#1E1B18] flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#8B2635]" />
              <span>Refine Catalog</span>
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-[11px] text-[#8B2635] hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Subcategories (if a category is selected) */}
          {currentCategoryData && currentCategoryData.subcategories.length > 0 && (
            <div>
              <label className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider block mb-2">
                Sub-genre ({currentCategoryData.name})
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`w-full text-left py-1 px-2 rounded-xs transition-colors ${
                    !selectedSubcategory ? 'font-bold text-[#8B2635] bg-[#F2ECE1]' : 'text-[#5C5346] hover:bg-[#F2ECE1]'
                  }`}
                >
                  All Sub-genres
                </button>
                {currentCategoryData.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`w-full text-left py-1 px-2 rounded-xs transition-colors truncate ${
                      selectedSubcategory === sub ? 'font-bold text-[#8B2635] bg-[#F2ECE1]' : 'text-[#5C5346] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Format Filter */}
          <div className="pt-4 border-t border-[#E8DEC0]">
            <label className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider block mb-2">
              Edition Format
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {(['all', 'Paperback', 'Hardcover', 'eBook', 'Audiobook'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`py-1.5 px-2 rounded-xs border text-center transition-colors cursor-pointer ${
                    selectedFormat === fmt
                      ? 'border-[#8B2635] bg-[#8B2635]/10 text-[#8B2635] font-semibold'
                      : 'border-[#DDD3C2] text-[#554C41] hover:border-[#BDB09E]'
                  }`}
                >
                  {fmt === 'all' ? 'All Formats' : fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="pt-4 border-t border-[#E8DEC0]">
            <label className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider block mb-2">
              Price Range
            </label>
            <div className="space-y-1.5 text-xs text-[#52493E]">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under-299', label: 'Under ₹299 (Budget Friendly)' },
                { id: '299-499', label: '₹299 – ₹499' },
                { id: '499-999', label: '₹499 – ₹999' },
                { id: 'above-1000', label: 'Above ₹1,000 (Deluxe)' }
              ].map((p) => (
                <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priceRangeDesktop"
                    checked={priceRange === p.id}
                    onChange={() => setPriceRange(p.id as any)}
                    className="accent-[#8B2635]"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="pt-4 border-t border-[#E8DEC0]">
            <label className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider block mb-2">
              Minimum Rating
            </label>
            <div className="space-y-1.5 text-xs text-[#52493E]">
              {[
                { val: 0, label: 'Any Rating' },
                { val: 4.8, label: '4.8 ★ & Above (Masterpieces)' },
                { val: 4.5, label: '4.5 ★ & Above' },
                { val: 4.0, label: '4.0 ★ & Above' }
              ].map((r) => (
                <label key={r.val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="ratingDesktop"
                    checked={minRating === r.val}
                    onChange={() => setMinRating(r.val)}
                    className="accent-[#8B2635]"
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="pt-4 border-t border-[#E8DEC0]">
            <label className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider block mb-2">
              Availability
            </label>
            <div className="space-y-1.5 text-xs text-[#52493E]">
              {[
                { id: 'all', label: 'All Editions' },
                { id: 'in-stock', label: 'Physical Print in Stock' },
                { id: 'digital-only', label: 'Instant Digital Access' }
              ].map((av) => (
                <label key={av.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="availabilityDesktop"
                    checked={availability === av.id}
                    onChange={() => setAvailability(av.id as any)}
                    className="accent-[#8B2635]"
                  />
                  <span>{av.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* BOOK LIST GRID (3 columns on desktop) */}
        <main className="lg:col-span-3">
          
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E8DEC0] text-xs text-[#7A7063]">
            <span>
              Showing <strong className="text-[#1E1B18]">{sortedBooks.length}</strong> {sortedBooks.length === 1 ? 'book' : 'books'}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>

          {sortedBooks.length === 0 ? (
            <div className="text-center py-20 bg-[#F6F2EC] rounded-sm border border-[#DDD3C2] p-8">
              <Sparkles className="w-10 h-10 text-[#8B2635] mx-auto mb-3" />
              <h3 className="font-serif-title font-bold text-xl text-[#1E1B18]">
                No Books Match Your Criteria
              </h3>
              <p className="text-xs text-[#706659] mt-2 max-w-sm mx-auto">
                Try widening your price range, clearing subcategory filters, or searching with another keyword.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-5 bg-[#23201D] text-white text-xs font-semibold py-2 px-5 rounded-xs hover:bg-[#8B2635] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTERS SHEET MODAL */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] w-full max-w-md h-full flex flex-col shadow-2xl overflow-hidden animate-slideIn">
            
            {/* Sheet Header */}
            <div className="p-4 border-b border-[#E8DEC0] flex items-center justify-between bg-[#F4EFE9]">
              <h3 className="font-serif-title font-bold text-base text-[#1E1B18] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#8B2635]" />
                <span>Filters & Refinements</span>
              </h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 rounded text-[#706659] hover:text-[#1E1B18]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sheet Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
              
              {/* Category picker */}
              <div>
                <label className="font-bold text-[#1E1B18] uppercase tracking-wider block mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory || 'All'}
                  onChange={(e) => setSelectedCategory(e.target.value === 'All' ? null : e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES_DATA.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="font-bold text-[#1E1B18] uppercase tracking-wider block mb-2">
                  Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['all', 'Paperback', 'Hardcover', 'eBook', 'Audiobook'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`p-2 rounded-xs border text-center ${
                        selectedFormat === fmt
                          ? 'border-[#8B2635] bg-[#8B2635]/10 text-[#8B2635] font-bold'
                          : 'border-[#DDD3C2] text-[#554C41]'
                      }`}
                    >
                      {fmt === 'all' ? 'All Formats' : fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="font-bold text-[#1E1B18] uppercase tracking-wider block mb-2">
                  Price
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-299', label: 'Under ₹299' },
                    { id: '299-499', label: '₹299 – ₹499' },
                    { id: '499-999', label: '₹499 – ₹999' },
                    { id: 'above-1000', label: 'Above ₹1,000' }
                  ].map((p) => (
                    <label key={p.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="priceRangeMobile"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id as any)}
                        className="accent-[#8B2635]"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="font-bold text-[#1E1B18] uppercase tracking-wider block mb-2">
                  Rating
                </label>
                <div className="space-y-2">
                  {[
                    { val: 0, label: 'Any Rating' },
                    { val: 4.8, label: '4.8 ★ & Above' },
                    { val: 4.5, label: '4.5 ★ & Above' },
                    { val: 4.0, label: '4.0 ★ & Above' }
                  ].map((r) => (
                    <label key={r.val} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="ratingMobile"
                        checked={minRating === r.val}
                        onChange={() => setMinRating(r.val)}
                        className="accent-[#8B2635]"
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="p-4 border-t border-[#E8DEC0] bg-[#F4EFE9] flex items-center gap-3">
              <button
                onClick={handleClearFilters}
                className="w-1/3 py-2.5 px-3 border border-[#DDD3C2] text-xs font-semibold rounded-xs text-[#4A4237]"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-2/3 py-2.5 px-3 bg-[#23201D] text-white text-xs font-semibold rounded-xs"
              >
                Show {sortedBooks.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
