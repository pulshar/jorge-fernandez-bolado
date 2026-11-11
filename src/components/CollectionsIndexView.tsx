import React from 'react';
import { Link } from 'react-router-dom';
import { Collection } from '../data/portfolioData';
import { ArrowRight } from 'lucide-react';

interface CollectionsIndexViewProps {
  collections: Collection[];
}

export const CollectionsIndexView: React.FC<CollectionsIndexViewProps> = ({
  collections,
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] mt-16 px-4 sm:px-6 py-4 pb-16 sm:py-16 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Editorial Header */}
      {/* <div className="pb-5 mb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          {collections.length} series catalogadas · 1968 — Actualidad
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Colecciones
        </h2>
      </div> */}

      {/* Collections Grid with Unique URLs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {collections.map((col) => {
          const coverSrc = col.coverImage || col.items[0]?.src;
          const totalPhotos = col.items.length;

          return (
            <Link
              key={col.id}
              to={`/colecciones/${col.id}`}
              className="group cursor-pointer flex flex-col focus-visible:outline-none"
            >
              {/* Cover Preview Image */}
              <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden rounded-xs border border-black/[0.08] dark:border-white/[0.08] group-hover:border-neutral-400 dark:group-hover:border-neutral-500 transition-all duration-300">
                <img
                  src={coverSrc}
                  alt={col.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest">
                    <span>Ver colección</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Collection Name & Total Photos */}
              <div className="mt-3.5 flex flex-col">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:underline">
                    {col.name}
                  </h3>
                  {/* <span className="text-xs font-mono tabular-nums text-neutral-400 dark:text-neutral-500 shrink-0">
                    {col.yearSpan}
                  </span> */}
                  <span className="text-xs font-mono font-semibold tabular-nums text-neutral-900 dark:text-neutral-100 shrink-0">
                    {String(totalPhotos).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-2 space-y-0.5 text-xs">
                  <p className="text-neutral-600 dark:text-neutral-300">
                    {col.tagline}
                    <span className='ml-1 font-mono text-neutral-400'>
                      ({col.yearSpan})
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
