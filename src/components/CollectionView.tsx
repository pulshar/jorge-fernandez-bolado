import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Collection, PhotoItem } from '../data/portfolioData';
import { OverviewView } from './OverviewView';
import { Grid, X, ArrowLeft } from 'lucide-react';

interface CollectionViewProps {
  collections: Collection[];
}

export const CollectionView: React.FC<CollectionViewProps> = ({ collections }) => {
  const { collectionId, photoId } = useParams<{ collectionId: string; photoId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const isOverview = location.pathname.endsWith('/overview');

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Find current collection by collectionId parameter
  const collection =
    collections.find((c) => c.id === collectionId) || collections[0];

  const totalItems = collection.items.length;

  // Find photo index by photoId parameter, defaulting to 0
  let activeIndex = 0;
  if (photoId && !isOverview) {
    const foundIdx = collection.items.findIndex((item) => item.id === photoId);
    if (foundIdx !== -1) {
      activeIndex = foundIdx;
    }
  }

  const safeIndex = ((activeIndex % totalItems) + totalItems) % totalItems;
  const currentItem: PhotoItem = collection.items[safeIndex] || collection.items[0];

  const navigateToPhoto = (newIndex: number) => {
    const wrapped = ((newIndex % totalItems) + totalItems) % totalItems;
    const targetItem = collection.items[wrapped];
    navigate(`/colecciones/${collection.id}/${targetItem.id}`);
  };

  const handlePrev = () => {
    navigateToPhoto(safeIndex - 1);
  };

  const handleNext = () => {
    navigateToPhoto(safeIndex + 1);
  };

  const handleToggleOverview = () => {
    if (isOverview) {
      // Close overview -> go back to current photo
      navigate(`/colecciones/${collection.id}/${currentItem.id}`);
    } else {
      // Open overview -> go to overview route
      navigate(`/colecciones/${collection.id}/overview`);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (!isOverview) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        }
      }

      if (e.key.toLowerCase() === 'o') {
        e.preventDefault();
        handleToggleOverview();
      } else if (e.key === 'Escape' && isOverview) {
        e.preventDefault();
        handleToggleOverview();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIndex, totalItems, isOverview, collection.id]);

  // Mobile Touch Swipe Handling (only in slideshow mode)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isOverview) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isOverview || touchStartX.current === null || touchStartY.current === null) return;
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
      className={`relative w-full mt-16 select-none touch-pan-y page-enter ${isOverview
        ? 'min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] pb-20'
        : 'h-[calc(100vh-4rem)] h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] flex flex-col justify-between overflow-hidden pb-14'
        }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Content: Slideshow OR Overview */}
      {isOverview ? (
        /* Overview Mode (Thumbnails of this collection) */
        <OverviewView
          collection={collection}
          activeItemIndex={safeIndex}
          onSelectPhoto={(idx) => {
            const selectedPhoto = collection.items[idx];
            navigate(`/colecciones/${collection.id}/${selectedPhoto.id}`);
          }}
          onClose={handleToggleOverview}
        />
      ) : (
        /* Slideshow Mode (Full photo with left/right click navigation, no circular buttons) */
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
              key={currentItem.id}
              src={currentItem.src}
              alt={currentItem.title}
              referrerPolicy="no-referrer"
              className="w-auto h-auto max-h-[calc(100dvh-8.5rem)] sm:max-h-[75vh] max-w-[92vw] sm:max-w-[88vw] object-contain shadow-sm photo-transition"
            />
          </div>
        </div>
      )}

      {/* Persistent Bottom Footer: Overview button switches to "Cerrar" when Overview is active */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-[#fcfcfc]/95 dark:bg-[#0c0c0d]/95 backdrop-blur-sm border-t border-black/[0.06] dark:border-white/[0.08] px-4 sm:px-6 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Collection Name & Status with Back Link */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <Link
              to="/colecciones"
              className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer shrink-0 -ml-1"
              title="Volver a todas las colecciones"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Colecciones</span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">/</span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-100 truncate">
              {collection.name}
            </span>
            {!isOverview ? (
              <div className='hidden md:inline'>
                {currentItem.title && (
                  <>
                    <span className="text-neutral-300 dark:text-neutral-700">·</span>
                    <span className="text-xs text-neutral-600 dark:text-neutral-300 truncate">
                      {currentItem.title}
                    </span>
                    <span className="hidden md:inline text-xs font-mono text-neutral-400 shrink-0">
                      {' '} ({currentItem.year})
                    </span>
                  </>
                )}
              </div>
            ) : (
              <div className='hidden md:inline'>
                <span className="text-neutral-300 dark:text-neutral-700">·</span>
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 truncate">
                  {collection.items.length} miniaturas
                </span>
              </div>
            )}
          </div>

          {/* Right: Counter and Overview / Cerrar Toggle Button */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Counter */}
            <span className="text-xs font-mono tabular-nums tracking-widest text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold text-neutral-900 dark:text-white">
                {String(safeIndex + 1).padStart(2, '0')}
              </span>
              {' | '}
              {String(totalItems).padStart(2, '0')}
            </span>

            {/* The Footer Button: switches between "Overview" and "Cerrar" */}
            <button
              onClick={handleToggleOverview}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-all cursor-pointer shadow-xs focus-visible:outline-none ${isOverview
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 border border-neutral-950 dark:border-white hover:opacity-90'
                : 'bg-transparent text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100'
                }`}
              title={isOverview ? 'Cerrar Overview (Tecla O o Esc)' : 'Abrir Overview (Tecla O)'}
            >
              {isOverview ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  <span className='hidden md:block'>Cerrar</span>
                </>
              ) : (
                <>
                  <Grid className="w-3.5 h-3.5" />
                  <span className='hidden md:block'>Overview</span>
                </>
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
