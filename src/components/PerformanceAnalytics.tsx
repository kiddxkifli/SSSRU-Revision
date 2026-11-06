import React, { useState } from 'react';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Flame, 
  AlertCircle, 
  RefreshCw, 
  Bookmark, 
  Sparkles, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { SSSRU_SUBJECTS, SSSRU_QUESTIONS, MOCK_STUDENT_PROFILE, Question } from '../data/sssruData';

interface PerformanceAnalyticsProps {
  vaultQuestionIds: string[];
  onRemoveFromVault: (qId: string) => void;
  onPracticeQuestion: (q: Question) => void;
}

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
  vaultQuestionIds,
  onRemoveFromVault,
  onPracticeQuestion
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vault'>('overview');

  // Vault questions
  const vaultQuestions = SSSRU_QUESTIONS.filter((q) => vaultQuestionIds.includes(q.id));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Student Profile Hero Header */}
      <div className="bg-[#0D3B3E] text-[#FBFBF9] border-2 border-[#D4AF37] rounded-xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#FFF176] text-[#0D3B3E] font-bold text-xs rounded">
              {MOCK_STUDENT_PROFILE.grade}
            </span>
            <span className="text-xs text-stone-300">
              Sasaran Peperiksaan SSSRU {MOCK_STUDENT_PROFILE.targetExamYear}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-1 text-[#FBFBF9]">
            {MOCK_STUDENT_PROFILE.name}
          </h2>
          <p className="text-xs text-stone-300 mt-0.5">
            {MOCK_STUDENT_PROFILE.school}
          </p>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-stone-600 md:pl-6 pt-4 md:pt-0">
          <div>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>Hari Berturut</span>
            </div>
            <p className="text-2xl font-black text-[#FFF176] tabular-nums mt-0.5">
              {MOCK_STUDENT_PROFILE.studyStreakDays} Hari
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-stone-300 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Silibus Siap</span>
            </div>
            <p className="text-2xl font-black text-[#FBFBF9] tabular-nums mt-0.5">
              {MOCK_STUDENT_PROFILE.overallSyllabusProgress}%
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-stone-300 text-xs font-semibold">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Purata Markah</span>
            </div>
            <p className="text-2xl font-black text-[#D4AF37] tabular-nums mt-0.5">
              {MOCK_STUDENT_PROFILE.averageScorePercent}%
            </p>
          </div>
        </div>
      </div>

      {/* Segmented View Switcher: Prestasi vs Fokus Ulangkaji */}
      <div className="flex items-center gap-2 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'overview'
              ? 'bg-[#0D3B3E] text-white shadow-xs'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>اناليسيس ڤريستاسي (Analisis Penguasaan 10 Subjek)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('vault')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'vault'
              ? 'bg-[#0D3B3E] text-white shadow-xs'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
          }`}
        >
          <Bookmark className="w-4 h-4 text-[#D4AF37]" />
          <span>فوكوس اولڠكاجي (Revision Vault) [{vaultQuestions.length}]</span>
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6">
          {/* Weakness Spotter Card */}
          <div className="bg-amber-50/80 dark:bg-[#12282a] border border-[#D4AF37] rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-[#0D3B3E] dark:text-[#FFF176] font-bold text-sm mb-3">
              <AlertCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>ڤڠسن كليمهن (Weakness Spotter - Perlu Penumpuan Segera)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_STUDENT_PROFILE.weaknessAreas.map((weak, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-white dark:bg-[#153437] border border-amber-200 dark:border-amber-900/60 rounded-lg"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-stone-500">{weak.subject}</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                      Kadar Kesilapan: {weak.errorRate}%
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs text-stone-900 dark:text-stone-100 mb-2">
                    {weak.topic}
                  </h4>
                  <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full"
                      style={{ width: `${weak.errorRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 10 Core Subject Breakdown Bars */}
          <div className="bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-bold text-[#0D3B3E] dark:text-[#FBFBF9] text-base">
                  تَهَكُّمُ الْمَوَادِّ (Kadar Penguasaan Mengikut 10 Subjek SSSRU)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Berdasarkan latihan topikal dan peperiksaan simulasi yang telah disiapkan
                </p>
              </div>
              <span className="text-xs font-semibold text-stone-500">Ambang Sasaran: 80%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
              {SSSRU_SUBJECTS.map((subj) => {
                const mastery = (MOCK_STUDENT_PROFILE.masteryBySubject as Record<string, number>)[subj.id] || 70;
                const isHigh = mastery >= 80;

                return (
                  <div key={subj.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-jawi font-bold text-stone-900 dark:text-stone-100 text-sm">
                          {subj.nameJawi}
                        </span>
                        <span className="text-stone-500 text-[11px]">({subj.nameRumi})</span>
                      </div>
                      <span className={`font-bold tabular-nums ${isHigh ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {mastery}%
                      </span>
                    </div>

                    <div className="w-full bg-stone-100 dark:bg-stone-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isHigh ? 'bg-[#0D3B3E] dark:bg-emerald-500' : 'bg-[#D4AF37]'
                        }`}
                        style={{ width: `${mastery}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Revision Vault (Fokus Ulangkaji) */
        <div className="bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
            <div>
              <h3 className="font-bold text-[#0D3B3E] dark:text-[#FBFBF9] text-base">
                فوكوس اولڠكاجي (Revision Vault & Spaced Repetition)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Soalan yang memerlukan ulangkaji berulang sehingga berjaya dikuasai sekurang-kurangnya dua kali
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-[#0D3B3E] dark:text-[#FFF176] rounded text-xs font-bold tabular-nums">
              {vaultQuestions.length} Soalan Dalam Senarai
            </span>
          </div>

          {vaultQuestions.length === 0 ? (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-stone-300" />
              <p className="text-xs">
                Tiada soalan dalam Fokus Ulangkaji buat masa ini. Gunakan butang penanda buku pada mana-mana soalan yang ingin diulang kaji kemudian.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {vaultQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 bg-[#FAF9F6] dark:bg-[#12282a] border border-stone-200 dark:border-stone-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-bold text-[#0D3B3E] dark:text-[#D4AF37]">
                        {q.topicRumi}
                      </span>
                      <span>·</span>
                      <span>{q.tahun}</span>
                      <span>·</span>
                      <span>{q.bahagian === 1 ? 'Objektif' : 'Subjektif'}</span>
                    </div>

                    <p className="font-jawi text-base text-stone-900 dark:text-stone-100 font-medium text-right line-clamp-2">
                      {q.soalanJawi}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onPracticeQuestion(q)}
                      className="px-3.5 py-1.5 bg-[#0D3B3E] hover:bg-[#164e52] text-[#FBFBF9] rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>Latih Semula</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveFromVault(q.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded transition-colors"
                      title="Keluarkan dari senarai"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
