import React, { useState } from 'react';
import { X, BookOpen, Lock, Sparkles, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';
import { Book } from '../../types/book';

interface SamplePreviewModalProps {
  book: Book | null;
  onClose: () => void;
}

export const SamplePreviewModal: React.FC<SamplePreviewModalProps> = ({ book, onClose }) => {
  const { addToCart, navigateToBookDetail } = useBookstore();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  if (!book) return null;

  const hasSample = book.sampleContent && book.sampleContent.length > 0;
  const currentChapter = hasSample ? book.sampleContent![currentChapterIndex] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] w-full max-w-2xl max-h-[90vh] rounded-md shadow-2xl border border-[#DFD5C6] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-[#E8E0D2] bg-[#F5EFEB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-[#8B2635]/10 text-[#8B2635] rounded">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#8B2635] text-white px-2 py-0.5 rounded-xs">
                  Legal Excerpt
                </span>
                <span className="text-xs text-[#7B7165]">Chapters 1-2 Sample Only</span>
              </div>
              <h3 className="font-serif-title font-bold text-base sm:text-lg text-[#1C1917] leading-tight mt-0.5">
                {book.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7B7165] hover:text-[#1C1917] hover:bg-[#EAE2D5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 font-reading text-[#2A241F]">
          {!hasSample ? (
            <div className="text-center py-16 px-4">
              <Lock className="w-12 h-12 text-[#9A8F82] mx-auto mb-3" />
              <h4 className="font-serif-title font-bold text-lg text-[#1C1917]">
                Publisher Preview Unavailable
              </h4>
              <p className="text-sm text-[#706659] mt-2 max-w-md mx-auto">
                The publisher has not authorized a digital sample for this edition. You may purchase the physical or digital copy with our 100% authenticity guarantee.
              </p>
            </div>
          ) : (
            <div>
              {/* Chapter Header */}
              <div className="text-center mb-8 border-b border-[#EBE4D8] pb-6">
                <span className="text-xs font-semibold tracking-widest text-[#8B2635] uppercase">
                  Chapter {currentChapter?.chapterNumber}
                </span>
                <h4 className="font-serif-title text-xl sm:text-2xl font-bold text-[#1E1B18] mt-1">
                  {currentChapter?.title}
                </h4>
                <p className="text-xs text-[#8A7F73] mt-1 font-reading italic">
                  by {book.author}
                </p>
              </div>

              {/* Sample Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#2C2722]">
                {currentChapter?.paragraphs.map((para, idx) => (
                  <p key={idx} className="first-letter:font-serif-title first-letter:text-2xl first-letter:font-bold">
                    {para}
                  </p>
                ))}
              </div>

              {/* End of Sample Notice */}
              <div className="mt-12 p-5 bg-[#F2ECE1] border border-[#DDD3C3] rounded-sm text-center">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B2635] mb-1">
                  <Lock className="w-3.5 h-3.5" /> End of Free Sample Excerpt
                </div>
                <p className="text-xs text-[#63594D] max-w-md mx-auto">
                  To continue reading the complete manuscript and unlock all {book.pageCount} pages, purchase the physical or digital edition below.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  <button
                    onClick={() => {
                      onClose();
                      addToCart(book, book.formats[0].type, 1);
                    }}
                    className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs px-4 py-2 rounded-xs font-medium transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy Full Edition (₹{book.formats[0].price})</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      navigateToBookDetail(book.id);
                    }}
                    className="bg-[#FAF8F5] border border-[#C9BFAة] text-[#332C24] hover:bg-[#EAE2D5] text-xs px-4 py-2 rounded-xs font-medium transition-colors cursor-pointer"
                  >
                    View Product Page
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Chapter Pagination */}
        {hasSample && book.sampleContent!.length > 1 && (
          <div className="p-4 bg-[#F5EFEB] border-t border-[#E8E0D2] flex items-center justify-between">
            <button
              disabled={currentChapterIndex === 0}
              onClick={() => setCurrentChapterIndex((prev) => Math.max(0, prev - 1))}
              className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                currentChapterIndex === 0
                  ? 'text-[#AEA394] cursor-not-allowed'
                  : 'text-[#4A4238] hover:bg-[#EAE2D5] cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous Chapter
            </button>
            <span className="text-xs text-[#7B7165]">
              Chapter {currentChapterIndex + 1} of {book.sampleContent!.length}
            </span>
            <button
              disabled={currentChapterIndex >= book.sampleContent!.length - 1}
              onClick={() => setCurrentChapterIndex((prev) => Math.min(book.sampleContent!.length - 1, prev + 1))}
              className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                currentChapterIndex >= book.sampleContent!.length - 1
                  ? 'text-[#AEA394] cursor-not-allowed'
                  : 'text-[#4A4238] hover:bg-[#EAE2D5] cursor-pointer'
              }`}
            >
              Next Chapter <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
