import React, { useState } from 'react';
import { Delete, CornerDownLeft, Keyboard, ChevronDown, ChevronUp } from 'lucide-react';

interface JawiVirtualKeyboardProps {
  onInsertChar: (char: string) => void;
  onBackspace: () => void;
  onEnter?: () => void;
  isOpen?: boolean;
  onToggleOpen?: () => void;
}

export const JAWI_SPECIAL_CHARS = [
  { char: 'ڠ', name: 'Nga (ڠ)' },
  { char: 'چ', name: 'Ca (چ)' },
  { char: 'ڤ', name: 'Pa (ڤ)' },
  { char: 'ڽ', name: 'Nya (ڽ)' },
  { char: 'ݢ', name: 'Ga (ݢ)' },
  { char: 'ۏ', name: 'Va (ۏ)' },
  { char: 'ة', name: 'Ta Marbutah (ة)' },
  { char: 'ء', name: 'Hamzah (ء)' }
];

export const JawiVirtualKeyboard: React.FC<JawiVirtualKeyboardProps> = ({
  onInsertChar,
  onBackspace,
  onEnter,
  isOpen = true,
  onToggleOpen
}) => {
  const [activeTab, setActiveTab] = useState<'huruf' | 'nombor' | 'baris'>('huruf');

  // Standard Jawi keyboard row layout
  const rowsHuruf = [
    ['ض', 'ص', 'ث', 'ق', 'ف', 'ڤ', 'غ', 'ڠ', 'ع', 'ه', 'خ', 'ح', 'ج', 'چ'],
    ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ة', 'ن', 'ڽ', 'م', 'ك', 'ݢ', 'ط'],
    ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ۏ', 'ز', 'ظ', 'ذ', 'د']
  ];

  const rowsNombor = [
    ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'],
    ['(ا)', '(ب)', '(ج)', '(د)', '،', '؛', '؟', '.', ':', '«', '»']
  ];

  const rowsBaris = [
    ['َ', 'ِ', 'ُ', 'ً', 'ٍ', 'ٌ', 'ْ', 'ّ', 'ـٰ', 'ﷺ', 'ﷻ']
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-6 z-40">
        <button
          onClick={onToggleOpen}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D3B3E] hover:bg-[#164e52] text-[#FBFBF9] rounded-xl shadow-lg border border-[#D4AF37]/40 text-sm font-medium transition-all"
        >
          <Keyboard className="w-4 h-4 text-[#D4AF37]" />
          <span>ڤاڤن ككونچي جاوي (Papan Kekunci Jawi)</span>
          <ChevronUp className="w-4 h-4 ml-1 text-slate-300" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] dark:bg-[#0d2224] border-t-2 border-[#D4AF37] shadow-2xl p-3 select-none transition-all">
      <div className="max-w-4xl mx-auto">
        {/* Header toolbar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200 dark:border-stone-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#0D3B3E] dark:text-[#D4AF37] flex items-center gap-1.5 font-jawi text-sm">
              <Keyboard className="w-4 h-4 text-[#D4AF37]" />
              ڤاڤن ككونچي جاوي بروني (Papan Kekunci Jawi SSSRU)
            </span>
            <div className="hidden sm:flex items-center gap-1 bg-stone-200 dark:bg-stone-800 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('huruf')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === 'huruf'
                    ? 'bg-white dark:bg-[#133336] text-[#0D3B3E] dark:text-[#FBFBF9] font-medium shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                }`}
              >
                حروف (Huruf)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('nombor')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === 'nombor'
                    ? 'bg-white dark:bg-[#133336] text-[#0D3B3E] dark:text-[#FBFBF9] font-medium shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                }`}
              >
                ١٢٣ (Nombor & Simbol)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('baris')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === 'baris'
                    ? 'bg-white dark:bg-[#133336] text-[#0D3B3E] dark:text-[#FBFBF9] font-medium shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                }`}
              >
                تَشْكِيل (Baris & Harakat)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleOpen && (
              <button
                type="button"
                onClick={onToggleOpen}
                className="p-1 rounded text-stone-500 hover:text-stone-900 dark:hover:text-stone-200"
                title="Tutup Papan Kekunci"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Jawi special letters strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 border-b border-stone-200 dark:border-stone-800">
          <span className="text-[11px] text-stone-600 dark:text-stone-400 font-medium whitespace-nowrap pl-1">
            حروف خاص ملايو / بروني:
          </span>
          {JAWI_SPECIAL_CHARS.map((item) => (
            <button
              key={item.char}
              type="button"
              onClick={() => onInsertChar(item.char)}
              title={item.name}
              className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20 text-[#0D3B3E] dark:text-[#FFF176] rounded-md font-jawi text-lg font-bold transition-transform active:scale-95 shadow-xs"
            >
              {item.char}
            </button>
          ))}
        </div>

        {/* Keyboard Keys Layout */}
        <div className="flex flex-col gap-1.5" dir="rtl">
          {activeTab === 'huruf' &&
            rowsHuruf.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
                {row.map((char) => (
                  <button
                    key={char}
                    type="button"
                    onClick={() => onInsertChar(char)}
                    className="flex-1 max-w-[48px] h-10 sm:h-11 bg-white dark:bg-[#153437] hover:bg-[#f1f5f5] dark:hover:bg-[#1a4044] border border-stone-300 dark:border-stone-700 text-[#0D3B3E] dark:text-[#FBFBF9] rounded-md font-jawi text-xl sm:text-2xl font-medium shadow-xs transition-transform active:scale-90 flex items-center justify-center"
                  >
                    {char}
                  </button>
                ))}
              </div>
            ))}

          {activeTab === 'nombor' &&
            rowsNombor.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1.5">
                {row.map((char) => (
                  <button
                    key={char}
                    type="button"
                    onClick={() => onInsertChar(char)}
                    className="flex-1 max-w-[56px] h-11 bg-white dark:bg-[#153437] hover:bg-[#f1f5f5] dark:hover:bg-[#1a4044] border border-stone-300 dark:border-stone-700 text-[#0D3B3E] dark:text-[#FBFBF9] rounded-md font-jawi text-xl font-medium shadow-xs transition-transform active:scale-90 flex items-center justify-center"
                  >
                    {char}
                  </button>
                ))}
              </div>
            ))}

          {activeTab === 'baris' &&
            rowsBaris.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-2">
                {row.map((char) => (
                  <button
                    key={char}
                    type="button"
                    onClick={() => onInsertChar(char)}
                    className="px-4 h-11 bg-white dark:bg-[#153437] hover:bg-[#f1f5f5] dark:hover:bg-[#1a4044] border border-stone-300 dark:border-stone-700 text-[#0D3B3E] dark:text-[#FBFBF9] rounded-md font-jawi text-2xl font-medium shadow-xs transition-transform active:scale-90 flex items-center justify-center"
                  >
                    {char}
                  </button>
                ))}
              </div>
            ))}

          {/* Action Row: Space, Backspace, Enter */}
          <div className="flex items-center gap-1.5 mt-1">
            <button
              type="button"
              onClick={onBackspace}
              className="px-3.5 h-10 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 rounded-md flex items-center justify-center gap-1 text-xs font-medium hover:bg-rose-100 transition-colors"
              title="Padam Huruf"
            >
              <Delete className="w-4 h-4" />
              <span className="hidden sm:inline">ڤادم</span>
            </button>

            <button
              type="button"
              onClick={() => onInsertChar(' ')}
              className="flex-1 h-10 bg-white dark:bg-[#153437] hover:bg-stone-100 dark:hover:bg-[#1a4044] border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-md text-xs font-medium flex items-center justify-center shadow-xs"
            >
              جاراوق (Ruang Kosong)
            </button>

            {onEnter && (
              <button
                type="button"
                onClick={onEnter}
                className="px-4 h-10 bg-[#0D3B3E] hover:bg-[#164e52] text-[#FBFBF9] rounded-md flex items-center justify-center gap-1 text-xs font-medium transition-colors"
                title="Baris Baharu"
              >
                <CornerDownLeft className="w-4 h-4 text-[#D4AF37]" />
                <span className="hidden sm:inline">ماسوق</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
