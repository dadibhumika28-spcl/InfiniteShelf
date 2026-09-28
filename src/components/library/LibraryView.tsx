import React, { useState } from 'react';
import { 
  BookOpen, 
  Headphones, 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  Play, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';
import { UserLibraryItem } from '../../types/book';

export const LibraryView: React.FC = () => {
  const { library, openEbookReader, openAudiobook, navigateTo } = useBookstore();
  const [filterTab, setFilterTab] = useState<'all' | 'ebooks' | 'audiobooks' | 'reading' | 'completed'>('all');

  const filteredItems = library.filter((item) => {
    if (filterTab === 'ebooks') return item.format === 'eBook';
    if (filterTab === 'audiobooks') return item.format === 'Audiobook';
    if (filterTab === 'reading') return item.readingProgress > 0 && item.readingProgress < 100;
    if (filterTab === 'completed') return item.readingProgress >= 100;
    return true;
  });

  const currentlyReading = library.filter((i) => i.readingProgress > 0 && i.readingProgress < 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#E8DEC0] mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
          Your Digital Sanctum
        </span>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#1E1B18] mt-1">
          My Digital Library
        </h1>
        <p className="text-xs text-[#7A7063] font-reading italic mt-1">
          All purchased eBooks and Audiobooks with synchronised bookmarks, chapter progress, and personal margin notes.
        </p>
      </div>

      {/* Currently Reading Hero Shelf (if any) */}
      {currentlyReading.length > 0 && filterTab === 'all' && (
        <div className="mb-12 p-6 bg-[#F4EFE9] border border-[#DDD3C2] rounded-md shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#8B2635]" />
            <h2 className="font-serif-title font-bold text-lg text-[#1E1B18]">
              Continue Where You Left Off
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentlyReading.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-[#FAF8F5] border border-[#E5DDCF] rounded-xs flex gap-4 items-center shadow-xs"
              >
                <img
                  src={item.book.cover}
                  alt={item.book.title}
                  className="w-16 h-24 object-cover rounded-xs shadow-xs shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8B2635]">
                    {item.format === 'eBook' ? <BookOpen className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
                    <span>{item.format} · Chapter {item.currentChapter}</span>
                  </div>
                  <h3 className="font-serif-title font-bold text-base text-[#1E1B18] truncate mt-0.5">
                    {item.book.title}
                  </h3>
                  <p className="text-xs text-[#6B6154] font-reading italic truncate">
                    by {item.book.author}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-2.5">
                    <div className="flex justify-between text-[11px] text-[#7A7063] mb-1">
                      <span>{item.readingProgress}% Completed</span>
                      <span>Last read: {item.lastReadDate}</span>
                    </div>
                    <div className="w-full bg-[#E5DDCF] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#8B2635] h-full rounded-full transition-all duration-300"
                        style={{ width: `${item.readingProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {item.format === 'eBook' ? (
                    <button
                      onClick={() => openEbookReader(item.book)}
                      className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-2 px-3.5 rounded-xs transition-colors cursor-pointer"
                    >
                      Read
                    </button>
                  ) : (
                    <button
                      onClick={() => openAudiobook(item.book)}
                      className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-2 px-3.5 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs navigation */}
      <div className="flex border-b border-[#E8DEC0] gap-2 sm:gap-6 text-xs sm:text-sm font-medium mb-8 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: `All Digital (${library.length})` },
          { id: 'ebooks', label: `eBooks (${library.filter((i) => i.format === 'eBook').length})` },
          { id: 'audiobooks', label: `Audiobooks (${library.filter((i) => i.format === 'Audiobook').length})` },
          { id: 'reading', label: 'Currently Reading' },
          { id: 'completed', label: 'Completed' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id as any)}
            className={`pb-2 whitespace-nowrap cursor-pointer transition-colors ${
              filterTab === tab.id
                ? 'text-[#8B2635] font-bold border-b-2 border-[#8B2635]'
                : 'text-[#695F52] hover:text-[#1E1B18]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF8F5] border border-[#DDD3C2] rounded-sm p-8">
          <BookOpen className="w-12 h-12 text-[#9A8F82] mx-auto mb-3" />
          <h3 className="font-serif-title font-bold text-lg text-[#1E1B18]">
            No Titles in this Shelf
          </h3>
          <p className="text-xs text-[#706659] mt-2 max-w-sm mx-auto">
            Purchasing digital eBook or Audiobook editions from our catalog automatically licenses them here.
          </p>
          <button
            onClick={() => navigateTo('explore')}
            className="mt-5 bg-[#23201D] text-white text-xs px-5 py-2 rounded-xs font-semibold hover:bg-[#8B2635] transition-colors cursor-pointer"
          >
            Browse Digital Editions
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF8F5] border border-[#E8DEC0] rounded-sm p-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-4">
                  <div className="w-20 h-28 shrink-0 overflow-hidden rounded-xs bg-[#F2ECE3] shadow-xs">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B2635] block">
                      {item.format}
                    </span>
                    <h3 className="font-serif-title font-bold text-base text-[#1E1B18] truncate mt-0.5">
                      {item.book.title}
                    </h3>
                    <p className="text-xs text-[#6B6154] font-reading italic truncate">
                      by {item.book.author}
                    </p>
                    <span className="text-[11px] text-[#8C8275] block mt-1">
                      Added: {item.purchasedDate}
                    </span>

                    {/* Bookmarks or Notes Count */}
                    {(item.bookmarks.length > 0 || item.notes.length > 0) && (
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-[#695F52]">
                        {item.bookmarks.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Bookmark className="w-3 h-3 text-[#8B2635]" /> {item.bookmarks.length} Bookmarks
                          </span>
                        )}
                        {item.notes.length > 0 && (
                          <span>· {item.notes.length} Notes</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 pt-3 border-t border-[#F0EAE0]">
                  <div className="flex justify-between text-[11px] text-[#7A7063] mb-1">
                    <span>Progress: {item.readingProgress}%</span>
                    <span>Ch. {item.currentChapter}</span>
                  </div>
                  <div className="w-full bg-[#E5DDCF] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#8B2635] h-full rounded-full"
                      style={{ width: `${item.readingProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-[#F0EAE0] flex items-center justify-between">
                <span className="text-[11px] text-[#7A7063]">
                  {item.format === 'eBook' ? 'EPUB / PDF' : 'Narrated Audio'}
                </span>
                {item.format === 'eBook' ? (
                  <button
                    onClick={() => openEbookReader(item.book)}
                    className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-1.5 px-4 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Reader</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openAudiobook(item.book)}
                    className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-1.5 px-4 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
