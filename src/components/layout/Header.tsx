import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  BookOpen, 
  Menu, 
  X, 
  ChevronDown, 
  Package, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useBookstore, AppView } from '../../context/BookstoreContext';
import { CATEGORIES_DATA } from '../../data/categoriesData';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    navigateToBookDetail,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    cartCount,
    wishlist,
    setIsCartOpen,
    books
  } = useBookstore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter books for instant search preview
  const searchSuggestions = searchQuery.trim()
    ? books.filter((b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.isbn.includes(searchQuery.trim())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigateTo('explore');
    }
  };

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    setIsCategoryMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigateTo('explore');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-all">
      {/* Top Editorial Banner */}
      <div className="bg-[#23201D] text-[#ECE6DE] text-xs py-1.5 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
        <span className="hidden sm:inline">Complimentary shipping across India on orders over ₹499</span>
        <span className="hidden sm:inline text-[#D4A373]">•</span>
        <span>Instant reading access on all digital editions</span>
        <button 
          onClick={() => {
            setSelectedCategory(null);
            navigateTo('explore');
          }}
          className="ml-2 underline hover:text-[#D4A373] text-[11px] cursor-pointer"
        >
          Explore Catalog →
        </button>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigateTo('home')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-sm bg-[#23201D] text-[#FAF8F5] flex items-center justify-center font-display-brand font-bold text-lg shadow-sm group-hover:bg-[#8B2635] transition-colors">
                  IS
                </span>
                <div>
                  <h1 className="font-display-brand text-xl sm:text-2xl font-bold tracking-[0.16em] text-[#1E1B18] group-hover:text-[#8B2635] transition-colors leading-none">
                    THE INFINITE SHELF
                  </h1>
                  <p className="text-[10px] sm:text-[11px] font-reading italic text-[#7C7267] tracking-wider mt-1">
                    Discover Beyond the Shelf.
                  </p>
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#4A4238]">
              <button
                onClick={() => navigateTo('home')}
                className={`transition-colors hover:text-[#1E1B18] cursor-pointer ${
                  currentView === 'home' ? 'text-[#8B2635] font-semibold' : ''
                }`}
              >
                Home
              </button>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                  onMouseEnter={() => setIsCategoryMenuOpen(true)}
                  className={`flex items-center gap-1 transition-colors hover:text-[#1E1B18] cursor-pointer ${
                    currentView === 'explore' ? 'text-[#8B2635] font-semibold' : ''
                  }`}
                >
                  Categories
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoryMenuOpen && (
                  <div
                    onMouseLeave={() => setIsCategoryMenuOpen(false)}
                    className="absolute top-full left-0 mt-2 w-80 bg-[#FAF8F5] border border-[#E2D8C9] rounded-sm shadow-xl p-3 grid grid-cols-2 gap-1.5 z-50 animate-fadeIn"
                  >
                    <button
                      onClick={() => handleSelectCategory('All')}
                      className="col-span-2 text-left px-3 py-1.5 text-xs font-semibold text-[#8B2635] hover:bg-[#F2ECE1] rounded transition-colors flex items-center justify-between"
                    >
                      <span>Browse All Categories</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <div className="col-span-2 h-[1px] bg-[#E8E1D5] my-1" />
                    {CATEGORIES_DATA.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.name)}
                        className="text-left px-2.5 py-1.5 text-xs text-[#4A4238] hover:text-[#1E1B18] hover:bg-[#F2ECE1] rounded transition-colors truncate"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  navigateTo('explore');
                }}
                className={`transition-colors hover:text-[#1E1B18] cursor-pointer ${
                  currentView === 'explore' ? 'text-[#8B2635] font-semibold' : ''
                }`}
              >
                Catalog
              </button>

              <button
                onClick={() => navigateTo('library')}
                className={`flex items-center gap-1.5 transition-colors hover:text-[#1E1B18] cursor-pointer ${
                  currentView === 'library' ? 'text-[#8B2635] font-semibold' : ''
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#8B2635]" />
                <span>My Library</span>
              </button>

              <button
                onClick={() => navigateTo('orders')}
                className={`transition-colors hover:text-[#1E1B18] cursor-pointer ${
                  currentView === 'orders' ? 'text-[#8B2635] font-semibold' : ''
                }`}
              >
                Orders
              </button>
            </nav>
          </div>

          {/* Central Search Bar */}
          <div ref={searchContainerRef} className="flex-1 max-w-md hidden md:block relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search books, authors, genres, or ISBN..."
                className="w-full bg-[#F3EFEA] border border-[#DDD3C4] focus:border-[#8B2635] text-sm text-[#1E1B18] placeholder-[#8A8175] rounded-full py-2 pl-10 pr-4 transition-all focus:outline-none focus:ring-1 focus:ring-[#8B2635]/40"
              />
              <Search className="w-4 h-4 text-[#8A8175] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A8175] hover:text-[#1E1B18]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Instant Search Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#FAF8F5] border border-[#E2D8C9] rounded-lg shadow-xl overflow-hidden z-50">
                <div className="p-2 border-b border-[#ECE3D5] text-[11px] text-[#7C7267] font-medium tracking-wide">
                  MATCHING TITLES & AUTHORS
                </div>
                <div className="divide-y divide-[#F0EAE0]">
                  {searchSuggestions.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => {
                        navigateToBookDetail(book.id);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-3 hover:bg-[#F4EFE7] flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-9 h-12 object-cover rounded-xs shadow-xs"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-serif-title font-semibold text-[#1E1B18] truncate">
                          {book.title}
                        </p>
                        <p className="text-xs text-[#6B6256] truncate">
                          {book.author} · <span className="text-[#8B2635]">{book.category}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-[#1E1B18]">
                          ₹{book.formats[0]?.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setIsSearchFocused(false);
                    navigateTo('explore');
                  }}
                  className="w-full text-center py-2 bg-[#F2ECE1] hover:bg-[#EBE2D5] text-xs font-medium text-[#8B2635] transition-colors"
                >
                  View all results for "{searchQuery}" →
                </button>
              </div>
            )}
          </div>

          {/* Action Icons (Wishlist, Bag, Mobile Menu) */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Wishlist Icon */}
            <button
              onClick={() => navigateTo('wishlist')}
              className={`relative p-2 text-[#4A4238] hover:text-[#8B2635] transition-colors cursor-pointer ${
                currentView === 'wishlist' ? 'text-[#8B2635]' : ''
              }`}
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B2635] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#23201D] hover:bg-[#38312B] text-[#FAF8F5] px-3.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4A373]" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="bg-[#8B2635] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A4238] hover:text-[#1E1B18] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (visible on small screens) */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, genres, or ISBN..."
              className="w-full bg-[#F3EFEA] border border-[#DDD3C4] text-xs text-[#1E1B18] placeholder-[#8A8175] rounded-full py-2 pl-9 pr-3 focus:outline-none focus:border-[#8B2635]"
            />
            <Search className="w-4 h-4 text-[#8A8175] absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E2D8C9] px-4 py-4 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#3A3229]">
            <button
              onClick={() => {
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-[#F2ECE1]"
            >
              Home
            </button>
            <button
              onClick={() => {
                setSelectedCategory(null);
                navigateTo('explore');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-[#F2ECE1]"
            >
              Explore Catalog
            </button>
            <button
              onClick={() => {
                navigateTo('library');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-[#F2ECE1] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#8B2635]" /> My Digital Library
              </span>
              <span className="text-xs text-[#7C7267]">eBooks & Audio</span>
            </button>
            <button
              onClick={() => {
                navigateTo('orders');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-[#F2ECE1] flex items-center gap-2"
            >
              <Package className="w-4 h-4 text-[#7F5539]" /> Orders & Shipments
            </button>
            <button
              onClick={() => {
                navigateTo('wishlist');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-[#F2ECE1] flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-[#8B2635]" /> Saved Wishlist ({wishlist.length})
            </button>
          </div>

          <div className="pt-3 border-t border-[#E8E1D5]">
            <p className="text-xs font-semibold text-[#8B2635] tracking-wider uppercase mb-2">
              Explore By Genre
            </p>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {CATEGORIES_DATA.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.name)}
                  className="text-left py-1 px-2 rounded hover:bg-[#F2ECE1] text-[#554D43] truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
