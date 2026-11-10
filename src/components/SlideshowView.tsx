import React, { useEffect, useRef } from 'react';
import { PhotoItem, Collection } from '../data/portfolioData';
import { Grid } from 'lucide-react';

interface SlideshowViewProps {
  collection: Collection;
  activeItemIndex: number;
  onNavigate: (newIndex: number) => void;
  onOpenOverview: () => void;
}

export const SlideshowView: React.FC<SlideshowViewProps> = ({
  collection,
  activeItemIndex,
  onNavigate,
  onOpenOverview,
}) => {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const totalItems = collection.items.length;
  const safeIndex = ((activeItemIndex % totalItems) + totalItems) % totalItems;
  const currentItem: PhotoItem = collection.items[safeIndex] || collection.items[0];

  const handlePrev = () => {
    onNavigate((safeIndex - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    onNavigate((safeIndex + 1) % totalItems);
  };

  // Keyboard navigation for Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'o') {
        e.preventDefault();
        onOpenOverview();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIndex, totalItems, onOpenOverview]);

  // Mobile Touch Swipe Handling
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
      className="relative w-full h-[calc(100vh-4rem)] mt-16 flex flex-col justify-between select-none overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Central Viewport Stage */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 py-2 sm:py-6 flex items-center justify-center">
        {/* Invisible Left Click Zone (click anywhere on left to go prev) */}
        <div
          onClick={handlePrev}
          className="absolute inset-y-0 left-0 w-1/2 z-20 cursor-w-resize"
          title="Foto anterior (o tecla ←)"
        />

        {/* Invisible Right Click Zone (click anywhere on right to go next) */}
        <div
          onClick={handleNext}
          className="absolute inset-y-0 right-0 w-1/2 z-20 cursor-e-resize"
          title="Siguiente foto (o tecla →)"
        />

        {/* The Photographic Art Container (No circular arrow buttons) */}
        <div className="relative z-10 max-h-[74vh] sm:max-h-[78vh] flex items-center justify-center pointer-events-none">
          <img
            key={currentItem.id}
            src={currentItem.src}
            alt={currentItem.title}
            referrerPolicy="no-referrer"
            className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-[94vw] sm:max-w-[88vw] object-contain shadow-sm transition-opacity duration-200"
          />
        </div>
      </div>

      {/* Bottom Editorial Caption & Overview Strip */}
      <footer className="relative z-30 w-full bg-[#fcfcfc]/95 dark:bg-[#0c0c0d]/95 border-t border-black/[0.06] dark:border-white/[0.08] px-4 sm:px-6 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Collection Name, Photo Title, Year */}
          <div className="flex items-baseline gap-2 sm:gap-3 min-w-0">
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-100 truncate">
              {collection.name}
            </span>
            {currentItem.title && (
              <>
                <span className="text-neutral-300 dark:text-neutral-700">·</span>
                <span className="text-xs text-neutral-600 dark:text-neutral-300 truncate">
                  {currentItem.title}
                </span>
              </>
            )}
            <span className="hidden md:inline text-xs font-mono text-neutral-400 shrink-0">
              ({currentItem.year})
            </span>
          </div>

          {/* Right: Counter and OVERVIEW Button for this collection */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Counter */}
            <span className="text-xs font-mono tabular-nums tracking-widest text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold text-neutral-900 dark:text-white">
                {String(safeIndex + 1).padStart(2, '0')}
              </span>
              {' | '}
              {String(totalItems).padStart(2, '0')}
            </span>

            {/* Overview Trigger Button for this collection */}
            <button
              onClick={onOpenOverview}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 rounded-xs transition-colors cursor-pointer"
              title="Abrir Overview de esta colección (Tecla O)"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
