import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  X, 
  Minimize2, 
  Maximize2, 
  Headphones, 
  ChevronRight, 
  List,
  Sparkles
} from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';

export const AudiobookPlayerModal: React.FC = () => {
  const { 
    audioState, 
    togglePlayAudiobook, 
    seekAudiobook, 
    skipAudiobook, 
    setAudiobookRate, 
    closeAudiobook 
  } = useBookstore();

  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isChapterListOpen, setIsChapterListOpen] = useState(false);

  // Simulated total duration per chapter (e.g. 15 minutes = 900 seconds)
  const totalChapterDuration = 900;

  // Real interval ticker when audio is playing
  useEffect(() => {
    if (!audioState || !audioState.isPlaying) return;

    const interval = setInterval(() => {
      seekAudiobook((audioState.positionSeconds + 1 * audioState.playbackRate) % totalChapterDuration);
    }, 1000);

    return () => clearInterval(interval);
  }, [audioState?.isPlaying, audioState?.playbackRate, audioState?.positionSeconds]);

  if (!audioState) return null;

  const { book, isPlaying, currentChapter, positionSeconds, playbackRate } = audioState;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (positionSeconds / totalChapterDuration) * 100;

  // If minimized, display persistent floating mini player bar at the bottom!
  if (isMinimized) {
    return (
      <aside 
        aria-label="Audiobook mini player"
        className="fixed bottom-24 right-4 sm:right-6 z-40 bg-[#1E1B18] text-[#FAF8F5] border border-[#3E3834] rounded-md shadow-2xl p-3 flex items-center gap-3.5 max-w-md w-full animate-slideUp backdrop-blur-md"
      >
        <img
          src={book.cover}
          alt={book.title}
          className="w-10 h-14 object-cover rounded-xs shadow-xs shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] text-[#D4A373] uppercase font-bold tracking-wider">
            <Headphones className="w-3 h-3 animate-pulse" />
            <span>Ch. {currentChapter} · {formatTime(positionSeconds)}</span>
          </div>
          <p className="font-serif-title font-semibold text-xs truncate mt-0.5">{book.title}</p>
          <p className="text-[11px] text-[#9A8F82] truncate">Narrated by {book.audioNarrator || 'Master Narrator'}</p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => skipAudiobook(-15)}
            className="p-1.5 text-[#C4B9AA] hover:text-white transition-colors"
            title="Skip back 15s"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={togglePlayAudiobook}
            className="p-2 bg-[#8B2635] text-white rounded-full hover:bg-[#A32E3F] transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          <button
            onClick={() => skipAudiobook(15)}
            className="p-1.5 text-[#C4B9AA] hover:text-white transition-colors"
            title="Skip forward 15s"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsMinimized(false)}
            className="p-1.5 text-[#C4B9AA] hover:text-white transition-colors ml-1"
            title="Expand player"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={closeAudiobook}
            className="p-1.5 text-[#C4B9AA] hover:text-red-400 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  // Expanded Full Audiobook Modal Player
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#1C1917] text-[#FAF8F5] border border-[#3E3834] w-full max-w-lg rounded-md shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#312B26] bg-[#24201D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-[#D4A373]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A373]">
              The Infinite Shelf Audio Edition
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 text-[#9A8F82] hover:text-white rounded hover:bg-white/10 transition-colors"
              title="Minimize to background mini-player"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeAudiobook}
              className="p-1.5 text-[#9A8F82] hover:text-white rounded hover:bg-white/10 transition-colors"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Presentation: Album Art & Ambient Waves */}
        <div className="p-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#24201D] to-[#1C1917]">
          
          {/* Cover Art with subtle rotating aura */}
          <div className="relative w-44 sm:w-52 aspect-[2/3] rounded-xs shadow-2xl overflow-hidden mb-6 book-cover-shadow border border-[#3A332C]">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                <div className="flex items-center gap-1">
                  {[40, 70, 30, 90, 50, 80, 45].map((height, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#D4A373] rounded-full animate-pulse"
                      style={{
                        height: `${height}%`,
                        animationDuration: `${0.6 + i * 0.15}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Title & Author */}
          <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-center text-[#FAF8F5] leading-snug">
            {book.title}
          </h3>
          <p className="text-xs text-[#C5BAAA] font-reading italic mt-1">
            by {book.author}
          </p>
          <p className="text-[11px] text-[#D4A373] mt-1">
            Narrated by {book.audioNarrator || 'Jonathan Davis'} · Unabridged
          </p>
        </div>

        {/* Audio Controls & Scrubbing Bar */}
        <div className="p-6 bg-[#231F1C] border-t border-[#312B26] space-y-5">
          
          {/* Scrubber Timeline */}
          <div>
            <div className="relative w-full h-1.5 bg-[#3B342E] rounded-full overflow-hidden cursor-pointer">
              <div
                className="bg-[#8B2635] h-full rounded-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#A69B8D] mt-1.5 font-mono">
              <span>{formatTime(positionSeconds)}</span>
              <span>Chapter {currentChapter} · Total {formatTime(totalChapterDuration)}</span>
            </div>
          </div>

          {/* Playback Controls (15s Skip, Play/Pause, 15s Forward) */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => skipAudiobook(-15)}
              className="p-2.5 rounded-full hover:bg-white/10 text-[#C4B9AA] hover:text-white transition-colors cursor-pointer flex flex-col items-center text-[10px]"
              title="Rewind 15 seconds"
            >
              <RotateCcw className="w-5 h-5 mb-0.5" />
              <span>15s</span>
            </button>

            <button
              onClick={togglePlayAudiobook}
              className="w-14 h-14 bg-[#8B2635] hover:bg-[#A32E3F] text-white rounded-full flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>

            <button
              onClick={() => skipAudiobook(15)}
              className="p-2.5 rounded-full hover:bg-white/10 text-[#C4B9AA] hover:text-white transition-colors cursor-pointer flex flex-col items-center text-[10px]"
              title="Fast forward 15 seconds"
            >
              <RotateCw className="w-5 h-5 mb-0.5" />
              <span>15s</span>
            </button>
          </div>

          {/* Speed Presets & Volume */}
          <div className="flex items-center justify-between pt-3 border-t border-[#312B26] text-xs text-[#A69B8D]">
            
            {/* Speed Presets */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] mr-1">Speed:</span>
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setAudiobookRate(rate)}
                  className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                    playbackRate === rate
                      ? 'bg-[#8B2635] text-white font-bold'
                      : 'hover:bg-white/10 text-[#C4B9AA]'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Mute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
