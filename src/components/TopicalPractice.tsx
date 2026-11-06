import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Bookmark, 
  BookmarkCheck, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  BookOpen,
  Keyboard as KeyboardIcon,
  PenLine
} from 'lucide-react';
import { SSSRU_SUBJECTS, SSSRU_QUESTIONS, Question } from '../data/sssruData';
import { DigitalInkCanvas } from './DigitalInkCanvas';
import { JawiVirtualKeyboard } from './JawiVirtualKeyboard';
import { ModelAnswerComparison } from './ModelAnswerComparison';
import { audioEngine } from '../utils/audioEngine';

interface TopicalPracticeProps {
  initialSubjectId?: string;
  onSaveToVault?: (questionId: string) => void;
  vaultQuestionIds?: string[];
  typeScale?: number;
}

export const TopicalPractice: React.FC<TopicalPracticeProps> = ({
  initialSubjectId = 'tauhid',
  onSaveToVault,
  vaultQuestionIds = [],
  typeScale = 100
}) => {
  // Filters
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId);
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedBahagian, setSelectedBahagian] = useState<number | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Interaction States
  const [selectedOption, setSelectedOption] = useState<'ا' | 'ب' | 'ج' | 'د' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isPeekAnswerOpen, setIsPeekAnswerOpen] = useState(false);
  
  // Subjective answers
  const [studentTextAnswers, setStudentTextAnswers] = useState<Record<string, string>>({});
  const [canvasSnapshot, setCanvasSnapshot] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'canvas' | 'text'>('canvas');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [activeTextInputId, setActiveTextInputId] = useState<string>('');

  // Audio playing indicator
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Available questions filtered
  const filteredQuestions = useMemo(() => {
    return SSSRU_QUESTIONS.filter((q) => {
      const matchSubj = q.subjectId === selectedSubjectId;
      const matchYear = selectedYear === 'all' || q.tahun === selectedYear;
      const matchBahagian = selectedBahagian === 'all' || q.bahagian === selectedBahagian;
      return matchSubj && matchYear && matchBahagian;
    });
  }, [selectedSubjectId, selectedYear, selectedBahagian]);

  const currentQ: Question | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  const currentSubject = SSSRU_SUBJECTS.find((s) => s.id === selectedSubjectId);

  // Reset answer states when navigating questions
  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsPeekAnswerOpen(false);
    setCanvasSnapshot(null);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      goToQuestion(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  };

  const handleSelectOption = (key: 'ا' | 'ب' | 'ج' | 'د') => {
    if (isAnswerSubmitted) return;
    setSelectedOption(key);
  };

  const handleSubmitMcq = () => {
    if (!selectedOption) return;
    setIsAnswerSubmitted(true);
  };

  // Keyboard text insertion
  const handleInsertChar = (char: string) => {
    if (!currentQ) return;
    const targetKey = activeTextInputId || currentQ.id;
    setStudentTextAnswers((prev) => ({
      ...prev,
      [targetKey]: (prev[targetKey] || '') + char
    }));
  };

  const handleBackspace = () => {
    if (!currentQ) return;
    const targetKey = activeTextInputId || currentQ.id;
    setStudentTextAnswers((prev) => ({
      ...prev,
      [targetKey]: (prev[targetKey] || '').slice(0, -1)
    }));
  };

  // Audio Playback
  const handlePlayAudio = () => {
    if (!currentQ?.audioSample) return;
    setIsPlayingAudio(true);
    if (currentQ.audioSample.type === 'saktah') {
      audioEngine.playSaktahDemo(() => setIsPlayingAudio(false));
    } else if (currentQ.audioSample.type === 'tafkhim_tarqiq') {
      audioEngine.playTafkhimTarqiqDemo('tarqiq');
      setTimeout(() => setIsPlayingAudio(false), 2500);
    } else {
      audioEngine.playHarakatMeter(4);
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  const isBookmarked = currentQ && vaultQuestionIds.includes(currentQ.id);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Filter & Subject Selector */}
      <div className="bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-lg font-bold text-[#0D3B3E] dark:text-[#FBFBF9]">
                مود أولڠكاجي برتاجوق (Topical Practice & Revision)
              </h2>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
              Soalan sebenar peperiksaan SSSRU (2017–2023) dengan format Jawi dan skema pemarkahan
            </p>
          </div>

          {/* Filters: Year and Bahagian */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-2.5 py-1.5 rounded-lg">
              <span className="text-stone-500 font-medium">تاهون (Tahun):</span>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value));
                  setCurrentIndex(0);
                }}
                className="bg-white dark:bg-[#142e31] text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded px-2 py-0.5 font-medium"
              >
                <option value="all">Semua Tahun (2017–2023)</option>
                {[2023, 2022, 2021, 2020, 2019, 2018, 2017].map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-2.5 py-1.5 rounded-lg">
              <span className="text-stone-500 font-medium">بهاݢين (Bahagian):</span>
              <select
                value={selectedBahagian}
                onChange={(e) => {
                  setSelectedBahagian(e.target.value === 'all' ? 'all' : Number(e.target.value));
                  setCurrentIndex(0);
                }}
                className="bg-white dark:bg-[#142e31] text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded px-2 py-0.5 font-medium"
              >
                <option value="all">Semua Bahagian</option>
                <option value={1}>Bahagian 1 (Objektif - 1 Markah)</option>
                <option value={2}>Bahagian 2 (Subjektif - 2-4 Markah)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 10 Subject Tabs Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar">
          {SSSRU_SUBJECTS.map((subj) => {
            const isSelected = subj.id === selectedSubjectId;
            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => {
                  setSelectedSubjectId(subj.id);
                  setCurrentIndex(0);
                  setSelectedOption(null);
                  setIsAnswerSubmitted(false);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#0D3B3E] text-[#FBFBF9] border-[#D4AF37] shadow-sm'
                    : 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span className="font-jawi text-sm">{subj.nameJawi}</span>
                <span className="opacity-80">({subj.nameRumi})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Container */}
      {!currentQ ? (
        <div className="bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl p-12 text-center">
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Tiada soalan ditemui untuk tapisan yang dipilih. Sila tukar tahun atau bahagian.
          </p>
          <button
            onClick={() => {
              setSelectedYear('all');
              setSelectedBahagian('all');
            }}
            className="mt-3 px-4 py-2 bg-[#0D3B3E] text-white rounded-lg text-xs font-medium hover:bg-[#15464a]"
          >
            Set Semula Tapisan
          </button>
        </div>
      ) : (
        <div className="bg-[#FAF9F6] dark:bg-[#0a1e20] border-2 border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden shadow-sm">
          {/* Authentic 4-Column Table Header: [Topik] | [Bahagian] | [Tahun] | [Markah] */}
          <div className="bg-[#0D3B3E] text-[#FBFBF9] px-4 py-3 border-b-2 border-[#D4AF37] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded">
                <span className="text-stone-300 font-jawi text-sm">تأصيل / Topik:</span>
                <span className="font-bold text-[#FFF176] font-jawi text-base">
                  {currentQ.topicJawi}
                </span>
                <span className="text-stone-300 text-[11px]">({currentQ.topicRumi})</span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded">
                <span className="text-stone-300">بهاݢين:</span>
                <span className="font-semibold text-[#FBFBF9]">
                  {currentQ.bahagian === 1 ? '1 (Objektif)' : '2 (Subjektif)'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded">
                <span className="text-stone-300">تاهون:</span>
                <span className="font-semibold text-[#FBFBF9] tabular-nums">{currentQ.tahun}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded">
                <span className="text-stone-300">مركه:</span>
                <span className="font-bold text-[#FFF176] tabular-nums">{currentQ.markah} Markah</span>
              </div>
            </div>

            {/* Quick Actions: Audio, Bookmark, Model Answer */}
            <div className="flex items-center gap-2">
              {currentQ.audioSample && (
                <button
                  type="button"
                  onClick={handlePlayAudio}
                  disabled={isPlayingAudio}
                  className="flex items-center gap-1 px-2.5 py-1 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#FFF176] border border-[#D4AF37]/40 rounded text-xs transition-colors"
                  title="Mainkan Demonstrasi Audio Tajwid"
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                      <span>Sedang Main...</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Sebutan Audio</span>
                    </>
                  )}
                </button>
              )}

              {onSaveToVault && (
                <button
                  type="button"
                  onClick={() => onSaveToVault(currentQ.id)}
                  className="p-1.5 text-stone-300 hover:text-[#FFF176] transition-colors rounded"
                  title={isBookmarked ? 'Dikeluarkan dari Fokus Ulangkaji' : 'Simpan ke Fokus Ulangkaji'}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-[#FFF176]" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 space-y-6">
            {/* Question Stem in Jawi with dynamic type scale */}
            <div className="bg-white dark:bg-[#102729] p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                  <span className="font-bold text-[#0D3B3E] dark:text-[#D4AF37]">
                    سوءالن {currentIndex + 1} درڤد {filteredQuestions.length}
                  </span>
                  <span>·</span>
                  <span>{currentQ.subtopic}</span>
                </div>
              </div>

              {/* Jawi Question Text */}
              <p
                style={{ fontSize: `${(22 * typeScale) / 100}px` }}
                className="font-jawi text-stone-900 dark:text-stone-100 font-semibold mt-3 mb-2 leading-loose text-right"
              >
                {currentQ.soalanJawi}
              </p>

              {/* Rumi Sub-text */}
              <p className="text-xs text-stone-600 dark:text-stone-400 italic pt-1 border-t border-stone-100 dark:border-stone-800/80">
                {currentQ.soalanRumi}
              </p>
            </div>

            {/* Interaction Area: BAHAGIAN 1 (MCQ) */}
            {currentQ.bahagian === 1 && currentQ.options && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                  ڤيليه ساتو جواڤن يڠ بتول (Pilih satu jawapan yang betul):
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="rtl">
                  {currentQ.options.map((option) => {
                    const isSelected = selectedOption === option.key;
                    const isCorrect = option.key === currentQ.jawapanBetulKey;
                    
                    let cardStyle = 'bg-white dark:bg-[#12282a] border-stone-200 dark:border-stone-800 hover:border-[#D4AF37] text-stone-900 dark:text-stone-100';
                    
                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        cardStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30';
                      } else if (isSelected && !isCorrect) {
                        cardStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/30';
                      }
                    } else if (isSelected) {
                      cardStyle = 'bg-amber-50/70 dark:bg-stone-800 border-[#0D3B3E] dark:border-[#D4AF37] ring-2 ring-[#0D3B3E]/20 text-[#0D3B3E] dark:text-[#FFF176]';
                    }

                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => handleSelectOption(option.key)}
                        className={`p-4 rounded-xl border text-right transition-all flex items-center justify-between gap-3 ${cardStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-[#0D3B3E] dark:text-[#D4AF37] font-jawi font-bold text-lg flex items-center justify-center shrink-0 border border-stone-300 dark:border-stone-700">
                            ({option.key})
                          </span>
                          <div>
                            <p
                              style={{ fontSize: `${(20 * typeScale) / 100}px` }}
                              className="font-jawi font-medium"
                            >
                              {option.textJawi}
                            </p>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                              {option.textRumi}
                            </p>
                          </div>
                        </div>

                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit MCQ Button */}
                {!isAnswerSubmitted ? (
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleSubmitMcq}
                      disabled={!selectedOption}
                      className="px-6 py-2.5 bg-[#0D3B3E] hover:bg-[#174e52] disabled:opacity-40 disabled:pointer-events-none text-[#FBFBF9] font-medium rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>هنتر دان سمق جواڤن (Hantar & Semak)</span>
                    </button>
                  </div>
                ) : (
                  /* Evaluated Rationale Box */
                  <div className="mt-4 p-4 rounded-xl bg-amber-50/70 dark:bg-[#12282a] border border-[#D4AF37] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0D3B3E] dark:text-[#FFF176] flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        هوراين & دليل سكيما سوسن سسرو (Rujukan Silibus)
                      </span>
                      <span className="text-[11px] px-2 py-0.5 bg-[#FFF176] text-[#0D3B3E] font-semibold rounded">
                        {currentQ.pdfPageCitation}
                      </span>
                    </div>

                    <p className="font-jawi text-lg text-stone-900 dark:text-stone-100 leading-relaxed text-right">
                      {currentQ.skemaJawapanJawi}
                    </p>

                    <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                      {currentQ.huraianRujukan}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Interaction Area: BAHAGIAN 2 (Subjektif) */}
            {currentQ.bahagian === 2 && (
              <div className="space-y-5">
                {/* Subquestions listing */}
                {currentQ.subQuestions && currentQ.subQuestions.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-[#0D3B3E] dark:text-[#D4AF37]">
                      سوءالن كچيل برستروكتور (Soalan Berstruktur):
                    </p>
                    <div className="space-y-2">
                      {currentQ.subQuestions.map((subQ) => (
                        <div
                          key={subQ.numeral}
                          className="p-3 bg-white dark:bg-[#12282a] border border-stone-200 dark:border-stone-800 rounded-lg flex items-start justify-between gap-3"
                        >
                          <div className="w-full text-right">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[11px] font-bold text-stone-500 tabular-nums">
                                [{subQ.markah} Markah]
                              </span>
                              <span className="text-xs font-bold text-[#0D3B3E] dark:text-[#D4AF37]">
                                ({subQ.numeral})
                              </span>
                            </div>
                            <p className="font-jawi text-base text-stone-900 dark:text-stone-100 font-medium">
                              {subQ.textJawi}
                            </p>
                            <p className="text-[11px] text-stone-500 italic mt-0.5 text-left">
                              {subQ.textRumi}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Method Switcher: Stylus Canvas vs Jawi Text */}
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
                      چارا منجواب (Kaedah Jawapan):
                    </span>
                    <div className="flex items-center bg-stone-200 dark:bg-stone-800 p-0.5 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setInputMode('canvas')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                          inputMode === 'canvas'
                            ? 'bg-[#0D3B3E] text-[#FBFBF9] font-medium shadow-xs'
                            : 'text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        <PenLine className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>ستيلوس / لوكيسن (Digital Stylus)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setInputMode('text')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                          inputMode === 'text'
                            ? 'bg-[#0D3B3E] text-[#FBFBF9] font-medium shadow-xs'
                            : 'text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        <KeyboardIcon className="w-3.5 h-3.5" />
                        <span>ككونچي جاوي (Teks Jawi)</span>
                      </button>
                    </div>
                  </div>

                  {inputMode === 'text' && (
                    <button
                      type="button"
                      onClick={() => setIsKeyboardOpen(!isKeyboardOpen)}
                      className="text-xs text-[#0D3B3E] dark:text-[#D4AF37] font-medium hover:underline flex items-center gap-1"
                    >
                      <KeyboardIcon className="w-3.5 h-3.5" />
                      <span>{isKeyboardOpen ? 'Sembunyi Papan Kekunci' : 'Buka Papan Kekunci Jawi'}</span>
                    </button>
                  )}
                </div>

                {/* Input Area */}
                {inputMode === 'canvas' ? (
                  <div className="space-y-2">
                    <DigitalInkCanvas
                      height={240}
                      onSaveSnapshot={(dataUrl) => setCanvasSnapshot(dataUrl)}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      dir="rtl"
                      rows={4}
                      value={studentTextAnswers[currentQ.id] || ''}
                      onChange={(e) =>
                        setStudentTextAnswers({
                          ...studentTextAnswers,
                          [currentQ.id]: e.target.value
                        })
                      }
                      onFocus={() => setActiveTextInputId(currentQ.id)}
                      placeholder="توليسكن جواڤن برستروكتور اندا دسين دالم توليسن جاوي..."
                      className="w-full p-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#12282a] font-jawi text-xl text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-[#D4AF37] focus:outline-hidden leading-relaxed shadow-inner"
                    />
                  </div>
                )}

                {/* Peek / Unmask Model Answer Toggle */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPeekAnswerOpen(!isPeekAnswerOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#0D3B3E] dark:text-[#FFF176] border border-[#D4AF37] rounded-xl text-xs font-semibold transition-colors"
                  >
                    {isPeekAnswerOpen ? (
                      <>
                        <EyeOff className="w-4 h-4 text-[#0D3B3E] dark:text-[#FFF176]" />
                        <span>توتوڤ سكيما جواڤن (Tutup Model Answer)</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-[#0D3B3E] dark:text-[#FFF176]" />
                        <span>بوك سكيما جواڤن & سيمق (Buka Model Answer & Rubrik)</span>
                      </>
                    )}
                  </button>

                  <span className="text-xs text-stone-500">
                    Bandingkan jawapan anda dengan skema rasmi PDF SSSRU
                  </span>
                </div>

                {/* Side-by-Side Model Answer Benchmark */}
                {isPeekAnswerOpen && (
                  <ModelAnswerComparison
                    question={currentQ}
                    studentTextAttempt={studentTextAnswers[currentQ.id]}
                    studentCanvasSnapshot={canvasSnapshot}
                  />
                )}
              </div>
            )}
          </div>

          {/* Footer Navigation Bar */}
          <div className="bg-stone-100 dark:bg-[#0f2426] px-6 py-3.5 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-lg text-xs font-medium hover:bg-stone-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>سوءالن لڤس (Sebelumnya)</span>
            </button>

            <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
              <span>{currentIndex + 1}</span>
              <span>/</span>
              <span>{filteredQuestions.length}</span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === filteredQuestions.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0D3B3E] hover:bg-[#174e52] text-[#FBFBF9] rounded-lg text-xs font-medium disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <span>سوءالن ستروسڽ (Seterusnya)</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      )}

      {/* Floating or Docked Jawi Virtual Keyboard */}
      {inputMode === 'text' && (
        <JawiVirtualKeyboard
          isOpen={isKeyboardOpen}
          onToggleOpen={() => setIsKeyboardOpen(!isKeyboardOpen)}
          onInsertChar={handleInsertChar}
          onBackspace={handleBackspace}
        />
      )}
    </div>
  );
};
