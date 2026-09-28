import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sliders, 
  Edit3, 
  Check, 
  Trash2,
  List
} from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';
import { Book } from '../../types/book';

interface EbookReaderModalProps {
  book: Book | null;
  onClose: () => void;
}

type ReadingTheme = 'parchment' | 'white' | 'sepia' | 'dark';
type LineHeight = 'compact' | 'normal' | 'relaxed';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export const EbookReaderModal: React.FC<EbookReaderModalProps> = ({ book, onClose }) => {
  const { library, updateReadingProgress, addBookmark, addNote } = useBookstore();

  if (!book) return null;

  const libraryItem = library.find((i) => i.bookId === book.id && i.format === 'eBook');

  // Chapters list (use sampleContent or generated literary chapters)
  const chapters = book.sampleContent && book.sampleContent.length > 0 ? book.sampleContent : [
    {
      chapterNumber: 1,
      title: 'Prologue: The Awakening of Words',
      paragraphs: [
        'The morning light poured across the room, illuminating decades of collected volumes. To read is to live a thousand lives before one dies; the person who never reads lives only one.',
        'In every quiet corridor of this archive, stories breathed beneath cloth and calfskin. They waited with the infinite patience of words recorded for posterity.'
      ]
    },
    {
      chapterNumber: 2,
      title: 'Chapter One: Into the Labyrinth',
      paragraphs: [
        'Step by step, the architecture of ideas reveals itself to those willing to listen. Nothing that has been thoughtfully composed ever truly perishes.',
        'We turn pages not to escape the world, but to return to it with eyes awakened to wonder.'
      ]
    }
  ];

  const [currentChapterIdx, setCurrentChapterIdx] = useState(
    libraryItem ? Math.min(chapters.length - 1, Math.max(0, libraryItem.currentChapter - 1)) : 0
  );

  // Reader Settings
  const [theme, setTheme] = useState<ReadingTheme>('parchment');
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [lineHeight, setLineHeight] = useState<LineHeight>('normal');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  // New Note state
  const [newNoteText, setNewNoteText] = useState('');

  const currentChapter = chapters[currentChapterIdx];
  const progressPercent = Math.round(((currentChapterIdx + 1) / chapters.length) * 100);

  // Synchronize progress
  useEffect(() => {
    updateReadingProgress(book.id, progressPercent, currentChapterIdx + 1);
  }, [currentChapterIdx, progressPercent, book.id]);

  const handleAddBookmark = () => {
    addBookmark(
      book.id,
      currentChapter.chapterNumber,
      currentChapter.title,
      `Bookmarked on ${new Date().toLocaleDateString()}`
    );
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addNote(book.id, currentChapter.chapterNumber, newNoteText.trim());
    setNewNoteText('');
  };

  // Theme styling maps
  const themeClasses = {
    parchment: 'bg-[#FAF8F5] text-[#24201D] selection:bg-[#E2D5C3]',
    white: 'bg-white text-[#111111] selection:bg-gray-200',
    sepia: 'bg-[#F4ECD8] text-[#3B2F2F] selection:bg-[#DBCBB1]',
    dark: 'bg-[#181615] text-[#E0D8CE] selection:bg-[#3E3834]'
  }[theme];

  const navThemeClasses = {
    parchment: 'bg-[#F2ECE1] border-[#DDD3C2] text-[#24201D]',
    white: 'bg-gray-50 border-gray-200 text-gray-900',
    sepia: 'bg-[#ECE2C8] border-[#DACDB0] text-[#3B2F2F]',
    dark: 'bg-[#221F1D] border-[#38332F] text-[#E0D8CE]'
  }[theme];

  const fontSizeClasses = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl'
  }[fontSize];

  const lineHeightClasses = {
    compact: 'leading-normal',
    normal: 'leading-relaxed',
    relaxed: 'leading-loose'
  }[lineHeight];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div 
        className={`w-full max-w-4xl h-full sm:h-[94vh] sm:rounded-md shadow-2xl flex flex-col overflow-hidden relative ${themeClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <header className={`p-3.5 sm:px-6 border-b flex items-center justify-between shrink-0 ${navThemeClasses}`}>
          <div className="flex items-center gap-3">
            {/* Table of contents toggle */}
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Table of Contents"
            >
              <List className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h2 className="font-serif-title font-bold text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
                {book.title}
              </h2>
              <p className="text-[11px] opacity-75 truncate">
                Chapter {currentChapter.chapterNumber}: {currentChapter.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={handleAddBookmark}
              className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Bookmark this chapter"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Notes button */}
            <button
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Margin Notes & Annotations"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Reader Settings button */}
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Typography & Appearance"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Settings Drawer Panel */}
        {isSettingsOpen && (
          <div className={`p-4 border-b text-xs space-y-4 shadow-sm animate-fadeIn ${navThemeClasses}`}>
            {/* Reading Theme */}
            <div className="flex items-center justify-between">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Theme</span>
              <div className="flex gap-2">
                {[
                  { id: 'parchment', name: 'Warm Paper', bg: 'bg-[#FAF8F5]', border: 'border-[#DDD3C2]' },
                  { id: 'white', name: 'White', bg: 'bg-white', border: 'border-gray-300' },
                  { id: 'sepia', name: 'Sepia', bg: 'bg-[#F4ECD8]', border: 'border-[#DACDB0]' },
                  { id: 'dark', name: 'Dark Ink', bg: 'bg-[#181615]', border: 'border-gray-700' }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setTheme(th.id as any)}
                    className={`px-2.5 py-1 rounded-xs border text-[11px] font-medium cursor-pointer ${th.bg} ${th.border} ${
                      theme === th.id ? 'ring-2 ring-[#8B2635]' : ''
                    }`}
                  >
                    {th.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="flex items-center justify-between">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Font Size</span>
              <div className="flex gap-2">
                {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    className={`px-3 py-1 rounded-xs border text-[11px] cursor-pointer ${
                      fontSize === sz ? 'font-bold bg-[#8B2635] text-white border-[#8B2635]' : 'border-current/20'
                    }`}
                  >
                    {sz.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Spacing */}
            <div className="flex items-center justify-between">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Line Height</span>
              <div className="flex gap-2">
                {(['compact', 'normal', 'relaxed'] as const).map((lh) => (
                  <button
                    key={lh}
                    onClick={() => setLineHeight(lh)}
                    className={`px-3 py-1 rounded-xs border text-[11px] cursor-pointer capitalize ${
                      lineHeight === lh ? 'font-bold bg-[#8B2635] text-white border-[#8B2635]' : 'border-current/20'
                    }`}
                  >
                    {lh}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Table of Contents Overlay */}
        {isTocOpen && (
          <div className={`absolute top-14 left-0 bottom-12 w-72 border-r shadow-xl z-20 overflow-y-auto p-4 ${navThemeClasses}`}>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-current/10">
              <h3 className="font-serif-title font-bold text-xs uppercase tracking-wider">Chapters</h3>
              <button onClick={() => setIsTocOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 text-xs">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentChapterIdx(idx);
                    setIsTocOpen(false);
                  }}
                  className={`w-full text-left py-2 px-2.5 rounded-xs transition-colors cursor-pointer truncate ${
                    idx === currentChapterIdx ? 'bg-[#8B2635] text-white font-bold' : 'hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  Chapter {ch.chapterNumber}: {ch.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Notes & Annotations Overlay */}
        {isNotesOpen && (
          <div className={`absolute top-14 right-0 bottom-12 w-80 border-l shadow-xl z-20 overflow-y-auto p-4 flex flex-col justify-between ${navThemeClasses}`}>
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-current/10">
                <h3 className="font-serif-title font-bold text-xs uppercase tracking-wider">
                  Margin Notes & Highlights
                </h3>
                <button onClick={() => setIsNotesOpen(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Saved Notes List */}
              <div className="space-y-2 mb-4 max-h-[50vh] overflow-y-auto">
                {libraryItem?.notes && libraryItem.notes.length > 0 ? (
                  libraryItem.notes.map((note) => (
                    <div key={note.id} className="p-2.5 bg-black/5 dark:bg-white/5 rounded-xs text-xs space-y-1">
                      <div className="flex justify-between text-[10px] opacity-75">
                        <span>Ch. {note.chapterNumber}</span>
                        <span>{note.date}</span>
                      </div>
                      <p className="font-reading leading-snug">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs opacity-60 text-center py-6">No annotations recorded yet.</p>
                )}
              </div>
            </div>

            {/* Note writing form */}
            <form onSubmit={handleSaveNote} className="space-y-2 pt-2 border-t border-current/10">
              <label className="text-[11px] font-semibold block">Add Marginal Note</label>
              <textarea
                rows={3}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Type your reflection or quote annotation..."
                className="w-full bg-white/70 dark:bg-black/40 border border-current/20 p-2 text-xs rounded-xs focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-[#8B2635] text-white text-xs font-semibold py-1.5 rounded-xs cursor-pointer"
              >
                Save Note
              </button>
            </form>
          </div>
        )}

        {/* Main Reading Canvas */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-14 max-w-3xl mx-auto w-full">
          {/* Chapter Heading */}
          <div className="text-center mb-10 pb-6 border-b border-current/10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B2635]">
              Chapter {currentChapter.chapterNumber}
            </span>
            <h1 className="font-serif-title font-bold text-2xl sm:text-3xl mt-1">
              {currentChapter.title}
            </h1>
            <p className="text-xs opacity-70 italic font-reading mt-1">
              by {book.author}
            </p>
          </div>

          {/* Body Paragraphs */}
          <div className={`space-y-6 font-reading ${fontSizeClasses} ${lineHeightClasses}`}>
            {currentChapter.paragraphs.map((para, i) => (
              <p key={i} className="first-letter:font-serif-title first-letter:text-3xl first-letter:font-bold">
                {para}
              </p>
            ))}
          </div>

          {/* Bookmarks for this Chapter indicator */}
          {libraryItem?.bookmarks && libraryItem.bookmarks.filter((b) => b.chapterNumber === currentChapter.chapterNumber).length > 0 && (
            <div className="mt-12 p-3 bg-black/5 dark:bg-white/5 rounded-xs text-xs flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#8B2635]" />
              <span>Chapter bookmarked for your personal study records.</span>
            </div>
          )}
        </main>

        {/* Bottom Pagination & Progress Bar */}
        <footer className={`p-3 sm:px-6 border-t flex items-center justify-between shrink-0 ${navThemeClasses}`}>
          <button
            disabled={currentChapterIdx === 0}
            onClick={() => setCurrentChapterIdx((p) => Math.max(0, p - 1))}
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded transition-colors ${
              currentChapterIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Chapter</span>
          </button>

          {/* Progress Indicator */}
          <div className="flex flex-col items-center max-w-[200px] w-full px-4">
            <div className="flex justify-between w-full text-[10px] opacity-75 mb-1 font-mono">
              <span>Ch. {currentChapter.chapterNumber} of {chapters.length}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-current/10 h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#8B2635] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            disabled={currentChapterIdx >= chapters.length - 1}
            onClick={() => setCurrentChapterIdx((p) => Math.min(chapters.length - 1, p + 1))}
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded transition-colors ${
              currentChapterIdx >= chapters.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer'
            }`}
          >
            <span className="hidden sm:inline">Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>

      </div>
    </div>
  );
};
