import React from 'react';
import { BookOpen, ShieldCheck, Truck, Headphones, Sparkles, Heart } from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';
import { CATEGORIES_DATA } from '../../data/categoriesData';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory } = useBookstore();

  return (
    <footer className="bg-[#1C1917] text-[#D8CEBE] pt-16 pb-12 border-t border-[#312B26]">
      {/* Editorial Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#312B26]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#2B2520] rounded-sm text-[#D4A373]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-title font-semibold text-sm text-[#FAF8F5]">Pan-India Shipping</h4>
              <p className="text-xs text-[#9E9485] mt-1 leading-relaxed">
                Complimentary delivery on orders above ₹499. Carefully padded in archival eco-packaging.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#2B2520] rounded-sm text-[#D4A373]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-title font-semibold text-sm text-[#FAF8F5]">Multi-Format Editions</h4>
              <p className="text-xs text-[#9E9485] mt-1 leading-relaxed">
                Paperbacks, heirloom hardcovers, instant DRM-free eBooks, and immersive audiobooks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#2B2520] rounded-sm text-[#D4A373]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-title font-semibold text-sm text-[#FAF8F5]">Integrated Reader & Audio</h4>
              <p className="text-xs text-[#9E9485] mt-1 leading-relaxed">
                Read purchased eBooks with custom typography or listen to full narrated audio chapters directly in-browser.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#2B2520] rounded-sm text-[#D4A373]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-title font-semibold text-sm text-[#FAF8F5]">Curatorial Integrity</h4>
              <p className="text-xs text-[#9E9485] mt-1 leading-relaxed">
                Every title hand-verified with exact ISBN metadata, authentic publishers, and reader-first previews.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Mission & Tagline */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xs bg-[#FAF8F5] text-[#1C1917] flex items-center justify-center font-display-brand font-bold text-sm">
              IS
            </span>
            <span className="font-display-brand text-lg font-bold tracking-[0.14em] text-[#FAF8F5]">
              THE INFINITE SHELF
            </span>
          </div>
          <p className="text-xs italic font-reading text-[#D4A373] tracking-wide">
            “Discover Beyond the Shelf.”
          </p>
          <p className="text-xs text-[#9E9485] leading-relaxed pr-6">
            A quiet sanctuary for those who cherish the written word. We curate enduring literature, pivotal historical chronicles, philosophical treatises, and modern masterpieces across physical and digital formats.
          </p>
        </div>

        {/* Categories Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#FAF8F5] font-semibold">
            Literary Categories
          </h4>
          <ul className="space-y-1.5 text-xs text-[#A89E90]">
            {CATEGORIES_DATA.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    navigateTo('explore');
                  }}
                  className="hover:text-[#D4A373] transition-colors cursor-pointer"
                >
                  {cat.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  navigateTo('explore');
                }}
                className="text-[#D4A373] hover:underline cursor-pointer"
              >
                Browse All 12 Collections →
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Experience & Format Policy */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#FAF8F5] font-semibold">
            Formats & Service
          </h4>
          <ul className="space-y-1.5 text-xs text-[#A89E90]">
            <li>
              <button onClick={() => navigateTo('library')} className="hover:text-[#D4A373]">
                Digital Library
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('orders')} className="hover:text-[#D4A373]">
                Track Orders
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('wishlist')} className="hover:text-[#D4A373]">
                Saved Books
              </button>
            </li>
            <li>
              <span className="text-[#7C7267] cursor-default">Paperback & Hardcover</span>
            </li>
            <li>
              <span className="text-[#7C7267] cursor-default">EPUB & PDF Reader</span>
            </li>
            <li>
              <span className="text-[#7C7267] cursor-default">Audiobook Player</span>
            </li>
          </ul>
        </div>

        {/* Literary Newsletter / Dispatch */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#FAF8F5] font-semibold">
            The Reader’s Dispatch
          </h4>
          <p className="text-xs text-[#9E9485] leading-relaxed">
            Receive our weekly curatorial letter featuring forgotten classics, new releases, and rare literary discounts.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-[#29231E] border border-[#423932] text-xs text-[#FAF8F5] placeholder-[#786D60] px-3 py-2 rounded-l-sm focus:outline-none focus:border-[#D4A373] flex-1"
            />
            <button className="bg-[#8B2635] hover:bg-[#A32E3F] text-white text-xs px-3.5 py-2 rounded-r-sm font-medium transition-colors cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#29231E] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#786D60] gap-4">
        <p>© 2026 The Infinite Shelf. All rights reserved. Prices shown in Indian Rupees (₹).</p>
        <p className="flex items-center gap-1">
          Handcrafted for discerning readers and collectors with <Heart className="w-3 h-3 text-[#8B2635] inline" />
        </p>
      </div>
    </footer>
  );
};
