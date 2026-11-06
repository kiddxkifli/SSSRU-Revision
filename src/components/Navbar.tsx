import React, { useState } from 'react';
import { Settings, Sliders, Moon, Sun, Type, Sparkles } from 'lucide-react';

export type NavigationTab = 
  | 'flipbook'
  | 'practice' 
  | 'mock_exam' 
  | 'analytics' 
  | 'portal' 
  | 'ingestion';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  typeScale: number;
  onChangeTypeScale: (scale: number) => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  typeScale,
  onChangeTypeScale,
  isHighContrast,
  onToggleHighContrast,
  isDark,
  onToggleDark
}) => {
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'flipbook', label: 'Buku AnyFlip SSSRU' },
    { id: 'practice', label: 'Ulangkaji Bertajuk' },
    { id: 'mock_exam', label: 'Simulasi Peperiksaan' },
    { id: 'analytics', label: 'Prestasi & Ulangkaji' },
    { id: 'portal', label: 'Portal Pendidik' },
    { id: 'ingestion', label: 'Pengimbas PDF' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0D3B3E] text-[#FBFBF9] border-b-2 border-[#D4AF37] shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('practice');
            }}
            className="text-lg font-bold tracking-tight text-[#FBFBF9] flex items-center gap-2 whitespace-nowrap shrink-0 hover:text-[#FFF176] transition-colors"
          >
            <span className="font-bold">SSSRU Ikhtibar</span>
            <span className="font-jawi text-xl text-[#D4AF37]">اختبار</span>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-stone-200">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`hover:text-[#FFF176] transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                    isActive
                      ? 'text-[#FFF176] border-[#D4AF37]'
                      : 'border-transparent text-stone-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#0D3B3E] bg-[#D4AF37] hover:bg-[#c4a132] rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
              title="Aksesibiliti & Saiz Fon"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Tetapan Fon & Tema</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-stone-700/60 no-scrollbar bg-[#0a2f32]">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0D3B3E] font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Settings Modal Drawer */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#0f2426] border-2 border-[#D4AF37] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-[#0D3B3E] dark:text-[#FBFBF9] text-base flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#D4AF37]" />
                <span>Tetapan Aksesibiliti & Paparan</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowSettingsDrawer(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Dynamic Type Scaling (100% to 200%) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                  <Type className="w-4 h-4 text-[#D4AF37]" />
                  <span>Skala Saiz Tulisan Jawi (100% – 200%):</span>
                </span>
                <span className="text-[#0D3B3E] dark:text-[#FFF176] font-bold tabular-nums">
                  {typeScale}%
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="200"
                step="10"
                value={typeScale}
                onChange={(e) => onChangeTypeScale(Number(e.target.value))}
                className="w-full accent-[#0D3B3E]"
              />
              <p className="text-[11px] text-stone-500">
                Memudahkan bacaan bagi murid-murid sekolah rendah tanpa memecahkan susunan jadual 4-kolum.
              </p>
            </div>

            {/* High Contrast Arabesque Mode Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
              <div>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  Mod Kontras Tinggi (High Contrast)
                </span>
                <span className="text-[11px] text-stone-500">
                  Membuang tekstur corak arabesque untuk kebolehbacaan maksimum
                </span>
              </div>
              <button
                type="button"
                onClick={onToggleHighContrast}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  isHighContrast ? 'bg-[#0D3B3E]' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isHighContrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
              <div>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  Tema Gelap (Dark Mode)
                </span>
                <span className="text-[11px] text-stone-500">
                  Sesuai untuk mengulang kaji pada waktu malam
                </span>
              </div>
              <button
                type="button"
                onClick={onToggleDark}
                className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowSettingsDrawer(false)}
              className="w-full py-2.5 bg-[#0D3B3E] hover:bg-[#164e52] text-white rounded-xl text-xs font-semibold"
            >
              Simpan & Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};
