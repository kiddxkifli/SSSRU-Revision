import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Share2, 
  QrCode, 
  Copy, 
  Check, 
  CheckCircle2, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Volume2, 
  HeartHandshake, 
  Clock, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SSSRU_SUBJECTS, SSSRU_QUESTIONS, Question } from '../data/sssruData';

export const TeacherParentPortal: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'teacher' | 'parent'>('teacher');

  // Teacher Quiz Builder State
  const [selectedSubject, setSelectedSubject] = useState('fiqh3_munakahat');
  const [selectedYears, setSelectedYears] = useState<number[]>([2020, 2021, 2022, 2023]);
  const [quizDuration, setQuizDuration] = useState(45);
  const [generatedLink, setGeneratedLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Parent Verbal Quiz helper state
  const [parentQuizIndex, setParentQuizIndex] = useState(0);
  const [showParentAnswer, setShowParentAnswer] = useState(false);

  const parentQuizPool = SSSRU_QUESTIONS;
  const currentParentQ = parentQuizPool[parentQuizIndex];

  const handleGenerateQuiz = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const link = `https://sssru-ikhtibar.gov.bn/t/${code}`;
    setGeneratedLink(link);
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleYear = (yr: number) => {
    setSelectedYears((prev) =>
      prev.includes(yr) ? prev.filter((y) => y !== yr) : [...prev, yr]
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Portal Role Switcher Tabs */}
      <div className="flex items-center justify-between bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#0D3B3E] dark:text-[#FBFBF9]">
            ڤورتل ڤنديديق دان ايبو باڤ (Educator & Parent Portal)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Pengurusan tugasan kelas, analitik kohort, dan bimbingan ulangkaji di rumah
          </p>
        </div>

        <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveRole('teacher')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeRole === 'teacher'
                ? 'bg-[#0D3B3E] text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
            <span>ڤنديديق (Ustazah Fatimah)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('parent')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeRole === 'parent'
                ? 'bg-[#0D3B3E] text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4 text-[#D4AF37]" />
            <span>ايبو باڤ (Hj. Razak)</span>
          </button>
        </div>
      </div>

      {activeRole === 'teacher' ? (
        /* Educator Portal (Ustazah Fatimah) */
        <div className="space-y-6">
          {/* Quiz Generator Form */}
          <div className="bg-white dark:bg-[#0f2426] border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs space-y-6">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-[#0D3B3E] dark:text-[#FBFBF9] text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>ڤمبينا كوءيز كوتيسيبر (Curated Class Quiz Generator)</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Bina set latihan mengikut subjek, tahun peperiksaan lepas, dan had masa yang ditentukan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Subject selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  ڤيليه سبجيك (Pilih Subjek):
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#12282a] border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 text-xs font-medium text-stone-900 dark:text-stone-100"
                >
                  {SSSRU_SUBJECTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nameJawi} ({s.nameRumi})
                    </option>
                  ))}
                </select>
              </div>

              {/* Years multiselect */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  تاهون سوءالن (Tahun Peperiksaan Lepas):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[2017, 2018, 2019, 2020, 2021, 2022, 2023].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => toggleYear(yr)}
                      className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                        selectedYears.includes(yr)
                          ? 'bg-[#0D3B3E] text-white border-[#D4AF37]'
                          : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time duration */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  تيمڤوه ماس (Masa Peperiksaan):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="15"
                    max="90"
                    step="15"
                    value={quizDuration}
                    onChange={(e) => setQuizDuration(Number(e.target.value))}
                    className="flex-1 accent-[#0D3B3E]"
                  />
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300 tabular-nums px-2 py-1 bg-stone-100 dark:bg-stone-800 rounded">
                    {quizDuration} Minit
                  </span>
                </div>
              </div>
            </div>

            {/* Action generate button */}
            <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
              <span className="text-xs text-stone-500">
                Format: 10 Soalan Objektif + 2 Soalan Subjektif Bertulis
              </span>
              <button
                type="button"
                onClick={handleGenerateQuiz}
                className="px-5 py-2.5 bg-[#0D3B3E] hover:bg-[#174e52] text-[#FBFBF9] rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#D4AF37]" />
                <span>جانا ڤاوتن دان كود كلس (Jana Pautan Kuiz)</span>
              </button>
            </div>

            {/* Generated Link / QR box */}
            {generatedLink && (
              <div className="p-4 bg-amber-50 dark:bg-[#12282a] border border-[#D4AF37] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#0D3B3E] dark:text-[#FFF176] block">
                    ڤاوتن تلوهن كلس اكتيف (Pautan Kuiz Sedia Diedarkan):
                  </span>
                  <p className="font-mono text-xs text-stone-800 dark:text-stone-200 select-all">
                    {generatedLink}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-stone-50"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Disalin!' : 'Salin Pautan'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowQrModal(true)}
                    className="px-3.5 py-1.5 bg-[#0D3B3E] text-white rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-[#164e52]"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Papar Kod QR</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Real-time Cohort Diagnostic Analytics */}
          <div className="bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-[#0D3B3E] dark:text-[#FBFBF9] text-base flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                <span>اناليتيك كوهورت كلس سسرو (Cohort Diagnostic Analytics - Darjah 6 Al-Ghazali)</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Dapatan diagnostik peperiksaan percubaan bagi merancang kelas pemulihan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* High mastery topic */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">
                    Kadar Kejayaan Cemerlang
                  </span>
                  <span className="font-black text-emerald-700 dark:text-emerald-400 tabular-nums">
                    85% Lulus
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  Khitbah & Syarat Wali Nasab (Munakahat)
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Majoriti 28 orang murid menguasai soalan objektif rukun nikah dan syarat sah wali hakim.
                </p>
              </div>

              {/* Remedial warning topic */}
              <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 rounded-xl">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-rose-800 dark:text-rose-300">
                    Memerlukan Kelas Pemulihan (Remedial)
                  </span>
                  <span className="font-black text-rose-700 dark:text-rose-400 tabular-nums">
                    40% Murid Keliru
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  Tempoh 'Iddah bagi Perempuan yang Hamil
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  14 orang murid tertukar antara tempoh 4 bulan 10 hari (kematian suami) dengan syarat melahirkan kandungan.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Parent Portal (Hj. Razak) */
        <div className="space-y-6">
          {/* Read-only Progress Transparency Overview */}
          <div className="bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-bold text-[#0D3B3E] dark:text-[#FBFBF9] text-base">
                  ڤانتوان كڤوتوسن انق (Pemantauan Persediaan Ahmad)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Laporan ringkas tanpa teknikal rumit untuk pemantauan ibu bapa
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold rounded text-xs">
                Status: Konsisten Mengulang Kaji
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 bg-[#FAF9F5] dark:bg-[#12282a] border border-stone-200 dark:border-stone-700 rounded-xl">
                <span className="text-xs text-stone-500 block">Masa Ulangkaji Minggu Ini</span>
                <span className="text-2xl font-black text-[#0D3B3E] dark:text-[#FFF176] tabular-nums">
                  6 Jam 45 Minit
                </span>
                <p className="text-[11px] text-stone-500 mt-1">Sasaran: 5 jam seminggu (Tercapai)</p>
              </div>

              <div className="p-4 bg-[#FAF9F5] dark:bg-[#12282a] border border-stone-200 dark:border-stone-700 rounded-xl">
                <span className="text-xs text-stone-500 block">Kertas Peperiksaan Lepas</span>
                <span className="text-2xl font-black text-[#0D3B3E] dark:text-[#FBFBF9] tabular-nums">
                  12 Kertas Siap
                </span>
                <p className="text-[11px] text-stone-500 mt-1">Tahun 2017–2023</p>
              </div>

              <div className="p-4 bg-[#FAF9F5] dark:bg-[#12282a] border border-stone-200 dark:border-stone-700 rounded-xl">
                <span className="text-xs text-stone-500 block">Subjek Paling Mantap</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  Fiqh I: Solah
                </span>
                <p className="text-[11px] text-stone-500 mt-1">Skor penguasaan 92%</p>
              </div>
            </div>
          </div>

          {/* Verbal Quiz Helper Mode for Parents */}
          <div className="bg-[#FAF9F6] dark:bg-[#0c2022] border-2 border-[#D4AF37] rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-3">
              <div>
                <h3 className="font-bold text-[#0D3B3E] dark:text-[#FFF176] text-base flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-[#D4AF37]" />
                  <span>مود سوءال جواب ليسن د رومه (Verbal Home Quiz Helper)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Ibu bapa membaca soalan kepada anak dan menyemak jawapan lisan menggunakan skema rujukan guru
                </p>
              </div>

              <span className="text-xs text-stone-500 font-semibold tabular-nums">
                Soalan {parentQuizIndex + 1} / {parentQuizPool.length}
              </span>
            </div>

            {/* Parent question card */}
            {currentParentQ && (
              <div className="space-y-4 pt-2">
                <div className="bg-white dark:bg-[#12282a] p-5 rounded-xl border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-bold text-[#0D3B3E] dark:text-[#D4AF37]">
                      {currentParentQ.topicRumi} ({currentParentQ.tahun})
                    </span>
                    <span className="bg-[#FFF176] text-[#0D3B3E] px-2 py-0.5 rounded font-bold">
                      {currentParentQ.markah} Markah
                    </span>
                  </div>

                  <p className="font-jawi text-xl text-stone-900 dark:text-stone-100 font-semibold text-right leading-loose mb-2">
                    {currentParentQ.soalanJawi}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                    Panduan sebutan Rumi untuk ibu bapa: "{currentParentQ.soalanRumi}"
                  </p>
                </div>

                {/* Model Answer peek for parents */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowParentAnswer(!showParentAnswer)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#0D3B3E] dark:text-[#FFF176] border border-[#D4AF37] rounded-xl text-xs font-bold transition-colors"
                  >
                    {showParentAnswer ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span>Sembunyi Skema Jawapan</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span>Lihat Skema Jawapan untuk Menyemak Jawapan Lisan Anak</span>
                      </>
                    )}
                  </button>

                  {showParentAnswer && (
                    <div className="mt-3 p-4 bg-white dark:bg-[#153437] border-r-4 border-[#0D3B3E] dark:border-[#D4AF37] rounded-xl shadow-xs space-y-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                        Skema Rasmi (Jawapan yang patut disebut oleh anak):
                      </span>
                      <p className="font-jawi text-lg text-stone-900 dark:text-stone-100 text-right leading-relaxed">
                        {currentParentQ.skemaJawapanJawi}
                      </p>
                      <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                        {currentParentQ.skemaJawapanRumi}
                      </p>
                    </div>
                  )}
                </div>

                {/* Next verbal question button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setParentQuizIndex((prev) => (prev + 1) % parentQuizPool.length);
                      setShowParentAnswer(false);
                    }}
                    className="px-5 py-2.5 bg-[#0D3B3E] hover:bg-[#164e52] text-[#FBFBF9] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Soalan Seterusnya</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#0f2426] border-2 border-[#D4AF37] rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-[#0D3B3E] dark:text-[#FBFBF9]">
              كود كلس سسرو (QR Code Kuiz Kelas)
            </h3>
            <p className="text-xs text-stone-500">
              Imbas menggunakan kamera telefon pintar atau tablet murid di bilik darjah
            </p>

            <div className="w-48 h-48 mx-auto bg-stone-100 dark:bg-stone-800 border-2 border-dashed border-[#D4AF37] rounded-xl flex items-center justify-center p-4">
              <QrCode className="w-36 h-36 text-[#0D3B3E] dark:text-[#FFF176]" />
            </div>

            <div className="font-mono text-xs bg-stone-100 dark:bg-stone-800 p-2 rounded text-stone-700 dark:text-stone-300 break-all">
              {generatedLink || 'https://sssru-ikhtibar.gov.bn/t/SSSRU2026'}
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 bg-[#0D3B3E] text-white rounded-lg text-xs font-semibold hover:bg-[#164e52]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
