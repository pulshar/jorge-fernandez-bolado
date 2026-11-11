import React from 'react';
import { Collection } from '../data/portfolioData';

interface OverviewViewProps {
  collection: Collection;
  activeItemIndex: number;
  onSelectPhoto: (itemIndex: number) => void;
  onClose?: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  collection,
  activeItemIndex,
  onSelectPhoto,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-12 animate-in fade-in duration-200">
      {/* Top Header inside Overview */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            {collection.name}
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
          Colección de {collection.items.length} fotografías
        </span>
      </div>

      {/* Grid of Thumbnails of THIS Collection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {collection.items.map((item, idx) => {
          const isCurrentlyActive = idx === activeItemIndex;

          return (
            <div
              key={item.id}
              onClick={() => onSelectPhoto(idx)}
              className="group cursor-pointer flex flex-col focus-visible:outline-none"
            >
              <div
                className={`relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden rounded-xs border transition-all duration-200 group-hover:shadow-md border-black/[0.08] dark:border-white/[0.08] group-hover:border-neutral-400 dark:group-hover:border-neutral-600'}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-mono tracking-widest uppercase opacity-80">
                    Abrir en visor →
                  </span>
                </div>
              </div>

              <div className="mt-2 text-left">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-black dark:group-hover:text-white">
                    {item.title}
                  </h4>
                  <span className="text-[11px] font-mono tabular-nums text-neutral-400 dark:text-neutral-500 shrink-0">
                    {item.year}
                  </span>
                </div>
                {/* <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                  {item.medium}
                </p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
