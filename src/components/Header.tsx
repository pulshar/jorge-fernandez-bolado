import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Moon, Sun, Menu, ArrowRight } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isSelection =
    location.pathname === '/' || location.pathname.startsWith('/seleccion');
  const isCollections = location.pathname.startsWith('/colecciones');
  const isBiography = location.pathname.startsWith('/biografia');

  // Prevent background scrolling when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#fcfcfc]/92 dark:bg-[#0c0c0d]/92 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Wordmark (Link to Selección / Home) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/seleccion"
              className="text-left group cursor-pointer focus-visible:outline-none"
              title="Volver a Selección (Inicio)"
            >
              <span className="block text-sm sm:text-base font-semibold tracking-wide uppercase text-neutral-900 dark:text-neutral-100 group-hover:opacity-75 transition-opacity">
                Jorge Fernández Bolado
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-mono">
                Fotografía · Santander
              </span>
            </Link>
          </div>

          {/* Zone 2: Navigation Links with Unique Routes (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs tracking-wide font-medium text-neutral-600 dark:text-neutral-300">
            {/* 1. Selección */}
            <Link
              to="/seleccion"
              className={`relative py-1.5 transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none ${isSelection
                ? 'text-neutral-950 dark:text-white font-semibold'
                : 'hover:text-neutral-950 dark:hover:text-white'
                }`}
            >
              Selección
              {isSelection && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-950 dark:bg-white animate-in fade-in duration-200" />
              )}
            </Link>

            {/* 2. Colecciones (URL directa /colecciones) */}
            <Link
              to="/colecciones"
              className={`relative py-1.5 transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none ${isCollections
                ? 'text-neutral-950 dark:text-white font-semibold'
                : 'hover:text-neutral-950 dark:hover:text-white'
                }`}
            >
              Colecciones
              {isCollections && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-950 dark:bg-white animate-in fade-in duration-200" />
              )}
            </Link>

            {/* 3. Biografía Info (URL directa /biografia) */}
            <Link
              to="/biografia"
              className={`py-1.5 transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none ${isBiography
                ? 'text-neutral-950 dark:text-white font-semibold underline underline-offset-4'
                : 'hover:text-neutral-950 dark:hover:text-white'
                }`}
            >
              Biografía
            </Link>
          </nav>

          {/* Zone 3: Dark/Light Mode + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-200 cursor-pointer focus-visible:outline-none rounded-xs"
              title={isDark ? 'Cambiar a modo claro' : 'Cambiar a sala oscura'}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Drawer (Slides from Right to Left) */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-[#fcfcfc] dark:bg-[#0c0c0d] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between p-6 sm:p-8 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
          }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Mobile Top Bar */}
        <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-5">
          <div>
            <span className="block text-sm font-semibold tracking-wide uppercase text-neutral-900 dark:text-neutral-100">
              Jorge Fernández Bolado
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-mono">
              Fotografía · Santander
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors cursor-pointer rounded-xs"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer rounded-xs"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Items (Editorial, Generous Typographic Presence) */}
        <nav className="my-auto py-8 space-y-6 mt-0">
          {/* 1. Selección */}
          <Link
            to="/seleccion"
            onClick={() => setMobileMenuOpen(false)}
            className={`group flex items-center justify-between py-3 transition-colors ${isSelection
              ? 'text-neutral-950 dark:text-white'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono text-neutral-400">01</span>
              <span className="text-2xl sm:text-3xl font-medium tracking-tight">
                Selección
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Inicio
              </span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          {/* 2. Colecciones */}
          <Link
            to="/colecciones"
            onClick={() => setMobileMenuOpen(false)}
            className={`group flex items-center justify-between py-3 transition-colors ${isCollections
              ? 'text-neutral-950 dark:text-white'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono text-neutral-400">02</span>
              <span className="text-2xl sm:text-3xl font-medium tracking-tight">
                Colecciones
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                6 Series
              </span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          {/* 3. Biografía Info */}
          <Link
            to="/biografia"
            onClick={() => setMobileMenuOpen(false)}
            className={`group flex items-center justify-between py-3 transition-colors ${isBiography
              ? 'text-neutral-950 dark:text-white'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono text-neutral-400">03</span>
              <span className="text-2xl sm:text-3xl font-medium tracking-tight">
                Biografía
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Estudio Nadar
              </span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        </nav>

        {/* Mobile Footer */}
        <div className="border-t border-black/[0.08] dark:border-white/[0.08] pt-6 flex flex-col gap-1 text-xs font-mono text-neutral-400 dark:text-neutral-500">
          <div className="flex items-center justify-between">
            <span>Estudio Nadar Santander</span>
            <span>Calle Frontón, 1</span>
          </div>
        </div>
      </div>
    </>
  );
};
