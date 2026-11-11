/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { COLLECTIONS, SELECTION_ITEMS } from './data/portfolioData';
import { Header } from './components/Header';
import { SelectionView } from './components/SelectionView';
import { CollectionsIndexView } from './components/CollectionsIndexView';
import { CollectionView } from './components/CollectionView';
import { InfoModal } from './components/InfoModal';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  // Theme synchronization
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const isBiographyOpen = location.pathname === '/biografia';

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#fcfcfc] dark:bg-[#0c0c0d] text-[#141416] dark:text-[#f2f2f3] transition-colors duration-200 flex flex-col justify-between">
      {/* Fixed Navigation Header with React Router integration */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      {/* Main View Area with Unique URLs for sections, collections, and photos */}
      <main className="flex-1 w-full">
        <Routes>
          {/* Default redirect to Selección photo 1 */}
          <Route path="/" element={<Navigate to="/seleccion/1" replace />} />
          <Route path="/seleccion" element={<Navigate to="/seleccion/1" replace />} />

          {/* 1. Selección (Home): Each photo has a unique URL /seleccion/1, /seleccion/2, ... */}
          <Route
            path="/seleccion/:photoIndex"
            element={<SelectionView items={SELECTION_ITEMS} />}
          />

          {/* 2. Colecciones (Index view): Unique URL /colecciones */}
          <Route
            path="/colecciones"
            element={<CollectionsIndexView collections={COLLECTIONS} />}
          />

          {/* 3. Colección individual y fotos:
                 - /colecciones/:collectionId
                 - /colecciones/:collectionId/:photoId
                 - /colecciones/:collectionId/overview
          */}
          <Route
            path="/colecciones/:collectionId"
            element={<CollectionView collections={COLLECTIONS} />}
          />
          <Route
            path="/colecciones/:collectionId/:photoId"
            element={<CollectionView collections={COLLECTIONS} />}
          />

          {/* Fallback route if route is unknown or if directly on /biografia */}
          <Route
            path="/biografia"
            element={<SelectionView items={SELECTION_ITEMS} />}
          />
          <Route path="*" element={<Navigate to="/seleccion/1" replace />} />
        </Routes>
      </main>

      {/* Biografía Info Modal at /biografia URL */}
      <InfoModal
        isOpen={isBiographyOpen}
        onClose={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate('/seleccion/1');
          }
        }}
      />
    </div>
  );
}
