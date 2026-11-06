import React, { useState } from 'react';
import { CheckCircle2, Bookmark, CheckSquare, Square, Award, AlertCircle } from 'lucide-react';
import { Question } from '../data/sssruData';

interface ModelAnswerComparisonProps {
  question: Question;
  studentTextAttempt?: string;
  studentCanvasSnapshot?: string | null;
  onGraded?: (marksAwarded: number, totalMarks: number) => void;
}

export const ModelAnswerComparison: React.FC<ModelAnswerComparisonProps> = ({
  question,
  studentTextAttempt,
  studentCanvasSnapshot,
  onGraded
}) => {
  const rubrics = question.rubrikKriteria || [
    'Menyatakan konsep utama secara tepat mengikut sukatan SSSRU',
    'Menyertakan rujukan atau fakta pensyariatan',
    'Memenuhi format jawapan peperiksaan bertulis'
  ];

  const [checkedRubrics, setCheckedRubrics] = useState<Record<number, boolean>>({});

  const toggleRubric = (index: number) => {
    const updated = { ...checkedRubrics, [index]: !checkedRubrics[index] };
    setCheckedRubrics(updated);

    const checkedCount = Object.values(updated).filter(Boolean).length;
    const computedMarks = Math.min(
      question.markah,
      Math.round((checkedCount / rubrics.length) * question.markah)
    );
    if (onGraded) {
      onGraded(computedMarks, question.markah);
    }
  };

  const awardedMarks = Math.min(
    question.markah,
    Math.round((Object.values(checkedRubrics).filter(Boolean).length / rubrics.length) * question.markah)
  );

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#0c2022] border-2 border-[#D4AF37] rounded-xl overflow-hidden shadow-lg my-4">
      {/* Header Bar */}
      <div className="bg-[#0D3B3E] text-[#FBFBF9] px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#D4AF37]">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">
              ڤربنديڠن جواڤن دان سكيما راسمي (Model Answer Benchmark)
            </h3>
            <p className="text-xs text-stone-300">
              {question.pdfPageCitation} · Jumlah Markah: {question.markah}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-300">Markah Diperoleh:</span>
          <span className="px-2.5 py-0.5 bg-[#FFF176] text-[#0D3B3E] font-bold rounded text-sm tabular-nums">
            {awardedMarks} / {question.markah}
          </span>
        </div>
      </div>

      {/* Side-by-Side Split View */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-stone-300 dark:md:divide-stone-700">
        {/* Left Column: Student's Attempt */}
        <div className="p-4 bg-white dark:bg-[#102729] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wide">
                چوبيئن اندا (Student's Submission)
              </span>
              <span className="text-xs text-stone-400">
                {studentCanvasSnapshot ? 'Tulisan Digital Stylus' : 'Teks Jawi'}
              </span>
            </div>

            {studentCanvasSnapshot ? (
              <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-2 bg-[#FBFBF9] dark:bg-[#0a1b1d] overflow-hidden">
                <img
                  src={studentCanvasSnapshot}
                  alt="Tangkapan Tulisan Stylus Pelajar"
                  referrerPolicy="no-referrer"
                  className="max-h-56 mx-auto object-contain"
                />
              </div>
            ) : studentTextAttempt && studentTextAttempt.trim().length > 0 ? (
              <div className="p-3.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg">
                <p className="font-jawi text-lg text-stone-900 dark:text-stone-100 leading-loose">
                  {studentTextAttempt}
                </p>
              </div>
            ) : (
              <div className="p-6 text-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-lg text-stone-600 dark:text-stone-400">
                <AlertCircle className="w-6 h-6 mx-auto mb-1 text-stone-500" />
                <p className="text-xs">Tiada jawapan dimasukkan. Sila bandingkan terus dengan skema rasmi di sebelah kanan.</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Tip Penilaian: Semak ejaan Jawi, ketepatan fakta fiqh/tauhid, serta kelengkapan dalil al-Quran mengikut rujukan guru.
            </p>
          </div>
        </div>

        {/* Right Column: Official Model Answer with Revision Yellow Highlighter */}
        <div className="p-4 bg-amber-50/40 dark:bg-[#0f2426] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#0D3B3E] dark:text-[#D4AF37] flex items-center gap-1.5 uppercase tracking-wide">
                <Bookmark className="w-3.5 h-3.5 text-[#D4AF37]" />
                سكيما جواڤن راسمي (Official Marking Key)
              </span>
              <span className="text-[11px] px-2 py-0.5 bg-[#FFF176] text-[#0D3B3E] font-semibold rounded">
                M/S Asal PDF
              </span>
            </div>

            {/* Official Jawi Model Answer with Yellow Highlighter effect */}
            <div className="p-3.5 bg-white dark:bg-[#142e31] border border-[#D4AF37]/50 rounded-lg shadow-xs">
              <div className="bg-[#FFF176]/50 dark:bg-[#FFF176]/25 px-2.5 py-1.5 rounded border-r-4 border-[#0D3B3E] dark:border-[#D4AF37] mb-2.5">
                <p className="font-jawi text-lg sm:text-xl text-[#0D3B3E] dark:text-[#FFF176] font-semibold leading-relaxed">
                  {question.skemaJawapanJawi}
                </p>
              </div>

              {/* Rumi Translation / Notes */}
              <div className="text-xs text-stone-700 dark:text-stone-300 mt-2 space-y-1">
                <p className="font-medium text-stone-900 dark:text-stone-100">
                  Transliterasi & Huraian:
                </p>
                <p className="italic leading-relaxed">{question.skemaJawapanRumi}</p>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                  {question.huraianRujukan}
                </p>
              </div>
            </div>
          </div>

          {/* Self-Assessment Rubric Checklist */}
          <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800">
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block mb-2">
              سناراي سيمق ڤنيلاين كينديري (Self-Assessment Rubric):
            </span>
            <div className="space-y-1.5">
              {rubrics.map((rubricItem, idx) => {
                const isChecked = !!checkedRubrics[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleRubric(idx)}
                    className="w-full flex items-start gap-2 text-left p-1.5 rounded hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-xs ${isChecked ? 'text-emerald-900 dark:text-emerald-300 font-medium' : 'text-stone-600 dark:text-stone-400'}`}>
                      {rubricItem}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
