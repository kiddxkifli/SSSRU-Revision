import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Send, 
  RotateCcw,
  BookOpen,
  Award,
  ListFilter,
  Check,
  AlertCircle
} from 'lucide-react';
import { SSSRU_QUESTIONS, Question, SSSRU_SUBJECTS } from '../data/sssruData';
import { DigitalInkCanvas } from './DigitalInkCanvas';
import { ModelAnswerComparison } from './ModelAnswerComparison';

interface MockExamSimulatorProps {
  onExamCompleted?: (score: number, totalMarks: number) => void;
  onExit?: () => void;
  typeScale?: number;
}

export const MockExamSimulator: React.FC<MockExamSimulatorProps> = ({
  onExamCompleted,
  onExit,
  typeScale = 100
}) => {
  // 45 minutes default official paper duration (2700 seconds)
  const TOTAL_TIME = 2700;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isExamActive, setIsExamActive] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Question selection (Combines Bahagian 1 and Bahagian 2)
  const examQuestions: Question[] = SSSRU_QUESTIONS.slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Answers & flags
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, 'ا' | 'ب' | 'ج' | 'د'>>({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<Record<string, string>>({});
  const [canvasSnapshots, setCanvasSnapshots] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  // Countdown timer effect
  useEffect(() => {
    if (!isExamActive || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamActive, isSubmitted]);

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = examQuestions[currentIndex];

  const handleSelectOption = (key: 'ا' | 'ب' | 'ج' | 'د') => {
    if (isSubmitted) return;
    setMcqAnswers((prev) => ({
      ...prev,
      [currentQ.id]: key
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleSubmitExam = () => {
    setIsExamActive(false);
    setIsSubmitted(true);
  };

  // Calculate scores
  const scoreReport = React.useMemo(() => {
    let earnedMarks = 0;
    let totalPossibleMarks = 0;
    let mcqCorrect = 0;
    let mcqTotal = 0;

    examQuestions.forEach((q) => {
      totalPossibleMarks += q.markah;
      if (q.bahagian === 1) {
        mcqTotal++;
        if (mcqAnswers[q.id] === q.jawapanBetulKey) {
          earnedMarks += q.markah;
          mcqCorrect++;
        }
      } else {
        // For subjective, estimate based on text or canvas presence
        if (canvasSnapshots[q.id] || (subjectiveAnswers[q.id] && subjectiveAnswers[q.id].length > 10)) {
          earnedMarks += Math.round(q.markah * 0.75); // Provisional self-assessment
        }
      }
    });

    const percent = Math.round((earnedMarks / totalPossibleMarks) * 100);
    return {
      earnedMarks,
      totalPossibleMarks,
      percent,
      mcqCorrect,
      mcqTotal
    };
  }, [mcqAnswers, subjectiveAnswers, canvasSnapshots, examQuestions]);

  // Timer alert levels
  const is15MinAlert = timeLeft <= 900 && timeLeft > 300;
  const is5MinAlert = timeLeft <= 300;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Simulation Exam Top Bar with Timer */}
      <div className="bg-[#0D3B3E] text-[#FBFBF9] border-2 border-[#D4AF37] rounded-xl p-4 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-base sm:text-lg font-bold">
              ڤڤريقساءن سيمولاسي سسرو (SSSRU Mock Exam Simulation)
            </h2>
          </div>
          <p className="text-xs text-stone-300 mt-0.5">
            Kertas Peperiksaan Percubaan Bersepadu: Bahagian 1 (Objektif) & Bahagian 2 (Subjektif)
          </p>
        </div>

        {/* Live Timer Display with 15m & 5m warning states */}
        {!isSubmitted ? (
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-base font-bold transition-all ${
                is5MinAlert
                  ? 'bg-rose-600/30 border-rose-500 text-rose-300 animate-pulse ring-2 ring-rose-500/40'
                  : is15MinAlert
                  ? 'bg-amber-600/30 border-[#D4AF37] text-[#FFF176]'
                  : 'bg-black/30 border-stone-600 text-[#FBFBF9]'
              }`}
            >
              <Clock className={`w-4 h-4 ${is5MinAlert ? 'text-rose-400' : 'text-[#D4AF37]'}`} />
              <span>⏱ {formatTime(timeLeft)}</span>
            </div>

            <button
              type="button"
              onClick={handleSubmitExam}
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#c4a132] text-[#0D3B3E] font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>هنتر كرتس (Hantar)</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-600/30 border border-emerald-500 text-emerald-300 rounded-lg text-xs font-semibold">
              Peperiksaan Tamat
            </span>
            {onExit && (
              <button
                type="button"
                onClick={onExit}
                className="px-3.5 py-1.5 bg-stone-700 hover:bg-stone-600 text-white rounded-lg text-xs font-medium"
              >
                Kembali ke Utama
              </button>
            )}
          </div>
        )}
      </div>

      {/* Warning Banners at 15m and 5m */}
      {!isSubmitted && (is15MinAlert || is5MinAlert) && (
        <div
          className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-medium ${
            is5MinAlert
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
              : 'bg-amber-50 dark:bg-amber-950/40 border-[#D4AF37] text-amber-900 dark:text-amber-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            {is5MinAlert
              ? 'PERINGATAN 5 MINIT TERAKHIR: Masa hampir tamat! Sila semak semula semua jawapan sebelum penyerahan automatik.'
              : 'PERINGATAN 15 MINIT: Anda mempunyai 15 minit lagi. Pastikan bahagian soalan subjektif telah lengkap dijawab.'}
          </span>
        </div>
      )}

      {/* Main Layout: Question Canvas & Side Navigator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Cols: Question Area or Exam Results Report */}
        <div className="lg:col-span-3 space-y-6">
          {isSubmitted ? (
            /* Post-Exam Evaluation Report */
            <div className="bg-white dark:bg-[#0f2426] border-2 border-[#D4AF37] rounded-xl p-6 shadow-sm space-y-6">
              <div className="text-center py-4 border-b border-stone-200 dark:border-stone-800">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 text-[#0D3B3E] dark:text-[#FFF176] mx-auto flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-[#0D3B3E] dark:text-[#FBFBF9]">
                  كڤوتوسن ڤڤريقساءن سيمولاسي (Keputusan Simulasi SSSRU)
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Analisis Pemarkahan Berdasarkan Skema Rasmi Kementerian Hal Ehwal Ugama Brunei
                </p>

                <div className="mt-6 inline-flex items-center gap-6 bg-[#FAF9F5] dark:bg-[#0c2022] px-8 py-4 rounded-2xl border border-stone-200 dark:border-stone-700">
                  <div>
                    <span className="text-xs text-stone-500 block">Peratusan Markah:</span>
                    <span className="text-3xl font-black text-[#0D3B3E] dark:text-[#FFF176] tabular-nums">
                      {scoreReport.percent}%
                    </span>
                  </div>
                  <div className="h-10 w-px bg-stone-300 dark:bg-stone-700" />
                  <div>
                    <span className="text-xs text-stone-500 block">Jumlah Markah:</span>
                    <span className="text-2xl font-bold text-stone-800 dark:text-stone-200 tabular-nums">
                      {scoreReport.earnedMarks} / {scoreReport.totalPossibleMarks}
                    </span>
                  </div>
                  <div className="h-10 w-px bg-stone-300 dark:bg-stone-700" />
                  <div>
                    <span className="text-xs text-stone-500 block">Objektif Betul:</span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {scoreReport.mcqCorrect} / {scoreReport.mcqTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review All Questions with Model Answers */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-[#0D3B3E] dark:text-[#D4AF37] flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>اولڠكاجي سكيما جواڤن كستلوروهن (Semakan Skema Lengkap):</span>
                </h4>

                {examQuestions.map((q, idx) => {
                  const studentChoice = mcqAnswers[q.id];
                  const isCorrect = q.bahagian === 1 && studentChoice === q.jawapanBetulKey;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-[#FAF9F6] dark:bg-[#12282a] space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-600 dark:text-stone-400">
                          Soalan {idx + 1} · {q.topicRumi} ({q.tahun})
                        </span>
                        {q.bahagian === 1 && (
                          <span
                            className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                              isCorrect
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                            }`}
                          >
                            {isCorrect ? 'Betul (+1)' : 'Salah (0)'}
                          </span>
                        )}
                      </div>

                      <p className="font-jawi text-lg text-stone-900 dark:text-stone-100 text-right leading-loose">
                        {q.soalanJawi}
                      </p>

                      {/* Official Key Highlighter */}
                      <div className="bg-[#FFF176]/40 dark:bg-[#FFF176]/20 p-3 rounded-lg border-r-4 border-[#0D3B3E] dark:border-[#D4AF37]">
                        <p className="font-jawi text-base text-[#0D3B3E] dark:text-[#FFF176] font-semibold text-right">
                          {q.skemaJawapanJawi}
                        </p>
                        <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 italic">
                          {q.skemaJawapanRumi}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active Question Screen */
            <div className="bg-[#FAF9F6] dark:bg-[#0a1e20] border-2 border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden shadow-sm">
              {/* Question Metadata Header */}
              <div className="bg-[#0D3B3E] text-[#FBFBF9] px-4 py-3 border-b-2 border-[#D4AF37] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#FFF176] font-jawi text-base">
                    {currentQ.topicJawi}
                  </span>
                  <span>·</span>
                  <span>Bahagian {currentQ.bahagian === 1 ? '1 (Objektif)' : '2 (Subjektif)'}</span>
                  <span>·</span>
                  <span className="tabular-nums">{currentQ.tahun}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-[#FFF176] text-[#0D3B3E] px-2 py-0.5 font-bold rounded tabular-nums">
                    {currentQ.markah} Markah
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`p-1.5 rounded transition-colors ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-amber-500 text-white'
                        : 'text-stone-300 hover:text-white'
                    }`}
                    title="Tanda untuk Semakan Semula"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6 space-y-6">
                <div>
                  <span className="text-xs font-semibold text-stone-500 block mb-1">
                    Soalan {currentIndex + 1} daripada {examQuestions.length}:
                  </span>
                  <p
                    style={{ fontSize: `${(22 * typeScale) / 100}px` }}
                    className="font-jawi text-stone-900 dark:text-stone-100 font-semibold text-right leading-loose"
                  >
                    {currentQ.soalanJawi}
                  </p>
                  <p className="text-xs text-stone-500 italic mt-1">{currentQ.soalanRumi}</p>
                </div>

                {/* Bahagian 1 MCQ Options */}
                {currentQ.bahagian === 1 && currentQ.options && (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-medium text-stone-500">Pilih satu jawapan:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="rtl">
                      {currentQ.options.map((opt) => {
                        const isSelected = mcqAnswers[currentQ.id] === opt.key;
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => handleSelectOption(opt.key)}
                            className={`p-4 rounded-xl border text-right transition-all flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-amber-50 dark:bg-stone-800 border-[#0D3B3E] dark:border-[#D4AF37] ring-2 ring-[#0D3B3E]/20 text-[#0D3B3E] dark:text-[#FFF176]'
                                : 'bg-white dark:bg-[#12282a] border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-800 dark:text-stone-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-[#0D3B3E] dark:text-[#D4AF37] font-jawi font-bold text-lg flex items-center justify-center shrink-0 border border-stone-300 dark:border-stone-700">
                                ({opt.key})
                              </span>
                              <div>
                                <p
                                  style={{ fontSize: `${(20 * typeScale) / 100}px` }}
                                  className="font-jawi font-medium"
                                >
                                  {opt.textJawi}
                                </p>
                                <p className="text-[11px] text-stone-500 mt-0.5">{opt.textRumi}</p>
                              </div>
                            </div>
                            {isSelected && <Check className="w-5 h-5 text-[#0D3B3E] dark:text-[#FFF176]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Bahagian 2 Subjective Input */}
                {currentQ.bahagian === 2 && (
                  <div className="space-y-4">
                    {currentQ.subQuestions && (
                      <div className="space-y-2 mb-3">
                        {currentQ.subQuestions.map((sq) => (
                          <div
                            key={sq.numeral}
                            className="p-3 bg-white dark:bg-[#12282a] border border-stone-200 dark:border-stone-800 rounded-lg text-right"
                          >
                            <span className="text-xs font-bold text-[#0D3B3E] dark:text-[#D4AF37] block">
                              ({sq.numeral}) [{sq.markah} Markah]
                            </span>
                            <p className="font-jawi text-base text-stone-900 dark:text-stone-100 font-medium">
                              {sq.textJawi}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden">
                      <div className="p-2 bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-600 dark:text-stone-300">
                        Ruang Jawapan Pelajar (Tulis dengan Stylus atau Teks):
                      </div>
                      <DigitalInkCanvas
                        height={220}
                        onSaveSnapshot={(dataUrl) =>
                          setCanvasSnapshots((prev) => ({ ...prev, [currentQ.id]: dataUrl }))
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div className="bg-stone-100 dark:bg-[#0f2426] px-6 py-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1 px-4 py-2 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-lg text-xs font-medium disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <div className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                  {currentIndex + 1} / {examQuestions.length}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))
                  }
                  disabled={currentIndex === examQuestions.length - 1}
                  className="flex items-center gap-1 px-4 py-2 bg-[#0D3B3E] text-white rounded-lg text-xs font-medium disabled:opacity-40"
                >
                  <span>Seterusnya</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Question Grid Navigator Drawer */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-xs">
            <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-3">
              نَافِذَةُ الأَسْئِلَة (Petak Soalan)
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {examQuestions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered =
                  q.bahagian === 1 ? !!mcqAnswers[q.id] : !!canvasSnapshots[q.id];
                const isFlagged = !!flaggedQuestions[q.id];

                let btnClass = 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700';
                if (isAnswered) {
                  btnClass = 'bg-emerald-600 text-white border-emerald-700';
                }
                if (isFlagged) {
                  btnClass = 'bg-amber-500 text-white border-amber-600';
                }
                if (isCurrent) {
                  btnClass += ' ring-2 ring-[#0D3B3E] dark:ring-[#D4AF37] ring-offset-2';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-lg text-xs font-bold border transition-all flex flex-col items-center justify-center relative ${btnClass}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 space-y-1.5 text-[11px] text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600 shrink-0 inline-block" />
                <span>Telah Dijawab</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500 shrink-0 inline-block" />
                <span>Ditanda untuk Semakan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-stone-200 dark:bg-stone-700 shrink-0 inline-block" />
                <span>Belum Dijawab</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
