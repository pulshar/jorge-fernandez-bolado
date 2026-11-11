import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PhotoItem } from '../data/portfolioData';

interface SelectionViewProps {
  items: PhotoItem[];
}

export const SelectionView: React.FC<SelectionViewProps> = ({ items }) => {
  const { photoIndex } = useParams<{ photoIndex?: string }>();
  const navigate = useNavigate();

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = items.length;
  // Parse index from 1-based URL parameter (default 1)
  const parsedIndex = photoIndex ? parseInt(photoIndex, 10) - 1 : 0;
  const safeIndex = isNaN(parsedIndex)
    ? 0
    : ((parsedIndex % total) + total) % total;

  const currentPhoto = items[safeIndex] || items[0];

  const goToIndex = (newIndex: number) => {
    const wrapped = ((newIndex % total) + total) % total;
    navigate(`/seleccion/${wrapped + 1}`);
  };

  const handlePrev = () => {
    goToIndex(safeIndex - 1);
  };

  const handleNext = () => {
    goToIndex(safeIndex + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIndex, total]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="relative w-full h-[calc(100vh-4rem)] h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] mt-16 flex flex-col justify-between select-none overflow-hidden touch-pan-y page-enter"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Central Viewport Stage */}
      <div className="relative flex-1 min-h-0 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-16 flex items-center justify-center overflow-hidden">
        {/* Invisible Left Click Zone */}
        <div
          onClick={handlePrev}
          className="absolute inset-y-0 left-0 w-1/2 z-20 cursor-w-resize"
          title="Foto anterior (o tecla ←)"
        />

        {/* Invisible Right Click Zone */}
        <div
          onClick={handleNext}
          className="absolute inset-y-0 right-0 w-1/2 z-20 cursor-e-resize"
          title="Siguiente foto (o tecla →)"
        />

        {/* Photographic Canvas with subtle dissolve */}
        <div className="relative z-10 w-full h-full max-h-full flex items-start justify-center pointer-events-none">
          <img
            key={currentPhoto.id}
            src={currentPhoto.src}
            alt={currentPhoto.title || currentPhoto.collectionName}
            referrerPolicy="no-referrer"
            className="max-h-[calc(100dvh-8.5rem)] sm:max-h-[75vh] w-auto max-w-[92vw] sm:max-w-[88vw] object-contain shadow-sm photo-transition"
          />
        </div>
      </div>

      {/* Bottom Editorial Caption & Counter (Exact format requested) */}
      <footer className="relative z-30 w-full bg-[#fcfcfc]/95 dark:bg-[#0c0c0d]/95 border-t border-black/[0.06] dark:border-white/[0.08] px-4 sm:px-6 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] transition-colors shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Collection Name & Photo Title */}
          <div className="flex items-baseline gap-2 sm:gap-3 min-w-0">
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-100 truncate">
              {currentPhoto.collectionName}
            </span>
            {currentPhoto.title && (
              <div className='hidden md:inline'>
                <span className="text-neutral-300 dark:text-neutral-700">·</span>
                <span className="text-xs text-neutral-600 dark:text-neutral-300 truncate">
                  {currentPhoto.title}
                </span>
                <span className="hidden md:inline text-xs font-mono text-neutral-400 shrink-0">
                  {' '} ({currentPhoto.year})
                </span>
              </div>
            )}
          </div>

          {/* Right: Counter with unique URL representation */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono tabular-nums tracking-widest text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold text-neutral-900 dark:text-white">
                {String(safeIndex + 1).padStart(2, '0')}
              </span>
              {' | '}
              {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
