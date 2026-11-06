import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  Clock, 
  BarChart3, 
  Users, 
  FileUp, 
  Sparkles, 
  CheckCircle2, 
  Bookmark, 
  ArrowRight,
  ShieldCheck,
  Compass,
  FileCheck
} from 'lucide-react';
import { Navbar, NavigationTab } from './components/Navbar';
import { AnyflipBookViewer } from './components/AnyflipBookViewer';
import { TopicalPractice } from './components/TopicalPractice';
import { MockExamSimulator } from './components/MockExamSimulator';
import { PerformanceAnalytics } from './components/PerformanceAnalytics';
import { TeacherParentPortal } from './components/TeacherParentPortal';
import { PdfIngestionEngine } from './components/PdfIngestionEngine';
import { SSSRU_QUESTIONS, SSSRU_SUBJECTS, Question } from './data/sssruData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('flipbook');
  const [typeScale, setTypeScale] = useState<number>(105);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  
  // Stored state for Revision Vault
  const [vaultQuestionIds, setVaultQuestionIds] = useState<string[]>([
    'tajwid_2019_b1_q1',
    'fiqh3_munakahat_2020_b2_q1'
  ]);

  // Questions database
  const [questions, setQuestions] = useState<Question[]>(SSSRU_QUESTIONS);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleVault = (qId: string) => {
    if (vaultQuestionIds.includes(qId)) {
      setVaultQuestionIds((prev) => prev.filter((id) => id !== qId));
      showToast('Soalan telah dikeluarkan dari Fokus Ulangkaji');
    } else {
      setVaultQuestionIds((prev) => [...prev, qId]);
      showToast('Soalan telah ditambah ke Fokus Ulangkaji (Revision Vault)');
    }
  };

  const handlePublishQuestions = (newQList: Question[]) => {
    setQuestions((prev) => [...newQList, ...prev]);
    showToast(`${newQList.length} soalan baharu berjaya dimuat naik ke pangkalan data!`);
    setCurrentTab('practice');
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isHighContrast
          ? 'bg-white dark:bg-[#071315]'
          : 'bg-arabesque-pattern'
      }`}
    >
      {/* 3-Zone Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        typeScale={typeScale}
        onChangeTypeScale={setTypeScale}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 right-6 z-50 bg-[#0D3B3E] text-[#FFF176] border border-[#D4AF37] px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Academic Heritage Kicker & Title Banner (Shown only on practice view) */}
        {currentTab === 'practice' && (
          <div className="mb-6 p-6 bg-gradient-to-r from-[#0D3B3E] to-[#124b4f] text-[#FBFBF9] border-2 border-[#D4AF37] rounded-2xl shadow-sm relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 bg-[#D4AF37] text-[#0D3B3E] font-bold rounded">
                  2017 – 2023
                </span>
                <span className="text-stone-300">
                  Himpunan Soalan Peperiksaan Sijil Sekolah-Sekolah Rendah Ugama (SSSRU)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FBFBF9]">
                ڤرتوبوهن اختبار سسرو (SSSRU Ikhtibar)
              </h1>
              
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
                Platform digitalisasi format peperiksaan Jawi tradisi 4-kolum dengan semakan automatik soalan objektif, kanvas stylus bergaris, dan skema jawapan kuning berautoriti.
              </p>

              {/* Quick stats badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>10 Subjek Fiqh, Tauhid, Akhlak, Sejarah & Tajwid</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-[#FFF176]" />
                  <span>Skema Model Answer Berpandukan Sukatan Rasmi</span>
                </div>
              </div>
            </div>

            {/* Subtle background arabesque emblem */}
            <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none">
              <span className="font-jawi text-[160px] text-white">اختبار</span>
            </div>
          </div>
        )}

        {/* Tab Routing */}
        {currentTab === 'flipbook' && (
          <AnyflipBookViewer
            typeScale={typeScale}
            onPracticeQuestion={(q) => {
              setCurrentTab('practice');
            }}
          />
        )}

        {currentTab === 'practice' && (
          <TopicalPractice
            initialSubjectId="tauhid"
            onSaveToVault={handleToggleVault}
            vaultQuestionIds={vaultQuestionIds}
            typeScale={typeScale}
          />
        )}

        {currentTab === 'mock_exam' && (
          <MockExamSimulator
            typeScale={typeScale}
            onExamCompleted={(score, total) => {
              showToast(`Tahniah! Simulasi peperiksaan selesai: ${score}/${total} Markah`);
            }}
            onExit={() => setCurrentTab('practice')}
          />
        )}

        {currentTab === 'analytics' && (
          <PerformanceAnalytics
            vaultQuestionIds={vaultQuestionIds}
            onRemoveFromVault={handleToggleVault}
            onPracticeQuestion={(q) => {
              setCurrentTab('practice');
            }}
          />
        )}

        {currentTab === 'portal' && <TeacherParentPortal />}

        {currentTab === 'ingestion' && (
          <PdfIngestionEngine onPublishQuestions={handlePublishQuestions} />
        )}
      </main>

      {/* Quiet Academic Footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-stone-800 bg-[#FAF9F5] dark:bg-[#091b1d] py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0D3B3E] dark:text-[#D4AF37]">
              SSSRU Ikhtibar (اختبار)
            </span>
            <span>·</span>
            <span>Digitalisasi Siri Peperiksaan SSSRU Negara Brunei Darussalam</span>
          </div>

          <div className="flex items-center gap-4 text-stone-500">
            <span>Sukatan Darjah 6 Sekolah Rendah Ugama</span>
            <span>·</span>
            <span>Pematuhan Tulisan Jawi Standard Dewan Bahasa & Pustaka</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
