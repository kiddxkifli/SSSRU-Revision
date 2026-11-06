import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Highlighter, 
  ExternalLink, 
  Search, 
  Bookmark, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Sparkles, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  HelpCircle,
  Maximize2
} from 'lucide-react';
import { SSSRU_SUBJECTS, SSSRU_QUESTIONS, Question } from '../data/sssruData';

interface AnyflipBookViewerProps {
  onPracticeQuestion?: (q: Question) => void;
  typeScale?: number;
}

interface BookPage {
  pageNumber: number;
  type: 'cover' | 'toc' | 'exam_sheet';
  title: string;
  subjectId?: string;
  topicJawi?: string;
  topicRumi?: string;
  tahun?: number;
  bahagian?: 1 | 2;
  questions?: Question[];
}

export const AnyflipBookViewer: React.FC<AnyflipBookViewerProps> = ({
  onPracticeQuestion,
  typeScale = 100
}) => {
  // Page number state (1 to 260)
  const [currentPage, setCurrentPage] = useState<number>(3); // start at Page 3 (Isi Kandungan) or Page 5
  const [highlightAnswers, setHighlightAnswers] = useState<boolean>(true); // default true like the source AnyFlip document
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [selectedOptionByQ, setSelectedOptionByQ] = useState<Record<string, string>>({});

  // Virtual Page Directory replicating the AnyFlip document:
  const bookPages: BookPage[] = useMemo(() => {
    const pages: BookPage[] = [];

    // Page 1: Cover
    pages.push({
      pageNumber: 1,
      type: 'cover',
      title: 'Muka Hadapan (Cover)'
    });

    // Page 2: Kata Pengantar & Panduan
    pages.push({
      pageNumber: 2,
      type: 'cover',
      title: 'Prakata & Panduan Modul'
    });

    // Page 3: Isi Kandungan (Table of Contents)
    pages.push({
      pageNumber: 3,
      type: 'toc',
      title: 'إيسي كاندوڠن (Isi Kandungan)'
    });

    // Page 4 - 260+: Tabular Exam Sheets mapped by subjects
    // Tauhid (M/S 4 - 25)
    pages.push({
      pageNumber: 5,
      type: 'exam_sheet',
      title: 'توحيد: أهل السنة والجماعة (2017)',
      subjectId: 'tauhid',
      topicJawi: 'أهل السنة والجماعة',
      topicRumi: "Ahlus Sunnah wal Jama'ah",
      tahun: 2017,
      bahagian: 1,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'tauhid_2017_b1_q1')
    });

    pages.push({
      pageNumber: 18,
      type: 'exam_sheet',
      title: 'توحيد: أجيرن مست (2019)',
      subjectId: 'tauhid',
      topicJawi: 'أجيرن مست دنگارا بروني دارالسلام',
      topicRumi: 'Ajaran Sesat di Brunei Darussalam',
      tahun: 2019,
      bahagian: 2,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'tauhid_2019_b2_q2')
    });

    // Fiqh I: Solah (M/S 26 - 55)
    pages.push({
      pageNumber: 42,
      type: 'exam_sheet',
      title: 'فقه I: سنة صلاة & ڤركارا يڠ ممبطلكن (2021)',
      subjectId: 'fiqh1_solah',
      topicJawi: 'سنة صلاة & ڤركارا يڠ ممبطلكن',
      topicRumi: 'Sunat Solah & Perkara Membatalkan',
      tahun: 2021,
      bahagian: 1,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'fiqh1_solah_2021_b1_q1')
    });

    pages.push({
      pageNumber: 57,
      type: 'exam_sheet',
      title: 'فقه I: صلاة سنة رواةب (2022)',
      subjectId: 'fiqh1_solah',
      topicJawi: 'صلاة سنة',
      topicRumi: 'Solah Sunat',
      tahun: 2022,
      bahagian: 2,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'fiqh1_solah_2022_b2_q1')
    });

    // Fiqh I: Zakat (M/S 56 - 80)
    pages.push({
      pageNumber: 76,
      type: 'exam_sheet',
      title: 'فقه I: اصناف زكاة (2020)',
      subjectId: 'fiqh1_zakat',
      topicJawi: 'اورڠ يڠ برحق منريما زكاة',
      topicRumi: 'Golongan Asnaf Zakat',
      tahun: 2020,
      bahagian: 1,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'fiqh1_zakat_2020_b1_q1')
    });

    // Fiqh II: Haji & Umrah (M/S 81 - 110)
    pages.push({
      pageNumber: 98,
      type: 'exam_sheet',
      title: 'فقه II: طواف الوداع (2023)',
      subjectId: 'fiqh2_haji',
      topicJawi: 'طواف الوداع دان جنس٢ عبادة حج',
      topicRumi: "Tawaf Wada' & Jenis Haji",
      tahun: 2023,
      bahagian: 1,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'fiqh2_haji_2023_b1_q1')
    });

    // Fiqh II: Muamalat (M/S 111 - 135)
    pages.push({
      pageNumber: 124,
      type: 'exam_sheet',
      title: 'فقه II: وصية هرت (2018)',
      subjectId: 'fiqh2_muamalat',
      topicJawi: 'فمبيرين (Hibah), صدقة & وصية',
      topicRumi: 'Hibah, Sedekah & Wasiat',
      tahun: 2018,
      bahagian: 2,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'fiqh2_muamalat_2018_b2_q1')
    });

    // Fiqh III: Jenayat (M/S 136 - 160)
    pages.push({
      pageNumber: 149,
      type: 'exam_sheet',
      title: 'فقه III: كساكتن قذف (2022)',
      subjectId: 'fiqh3_jenayat',
      topicJawi: 'قصاص, دية دان حدود',
      topicRumi: 'Qisas, Diyat & Hudud',
      tahun: 2022,
      bahagian: 1,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'fiqh3_jenayat_2022_b1_q1')
    });

    // Fiqh III: Munakahat (M/S 161 - 180)
    pages.push({
      pageNumber: 168,
      type: 'exam_sheet',
      title: 'فقه III: عدة ڤرمڤوان حاميل (2020)',
      subjectId: 'fiqh3_munakahat',
      topicJawi: 'طلاق, خلع, فسخ, عدة دان رجوع',
      topicRumi: "Talaq, Khulu', Fasakh, 'Iddah & Ruju'",
      tahun: 2020,
      bahagian: 2,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'fiqh3_munakahat_2020_b2_q1')
    });

    // Sejarah Islam (M/S 181 - 205)
    pages.push({
      pageNumber: 182,
      type: 'exam_sheet',
      title: 'سجاره اسلام: مسجد قباء دالم هجرة (2021)',
      subjectId: 'sejarah_islam',
      topicJawi: 'هجرة رسول الله دان ڤراڠن درسم اسلام',
      topicRumi: 'Hijrah & Peperangan Islam',
      tahun: 2021,
      bahagian: 1,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'sejarah_2021_b1_q1')
    });

    // Akhlak (M/S 206 - 230)
    pages.push({
      pageNumber: 191,
      type: 'exam_sheet',
      title: 'اخلاق: مرتبة توكل كتيݢ (2023)',
      subjectId: 'akhlak',
      topicJawi: 'توكل, رضا دان اءيڠتكن ماتي',
      topicRumi: 'Tawakkal, Redha & Ingat Mati',
      tahun: 2023,
      bahagian: 2,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'akhlak_2023_b2_q1')
    });

    // Tajwid Teori (M/S 231 - 260)
    pages.push({
      pageNumber: 243,
      type: 'exam_sheet',
      title: 'تجويد: حكم راء ترقيق (2019)',
      subjectId: 'tajwid_teori',
      topicJawi: 'لام التعريف دان حكم راء',
      topicRumi: "Lam Ta'rif & Hukum Ra'",
      tahun: 2019,
      bahagian: 1,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'tajwid_2019_b1_q1')
    });

    pages.push({
      pageNumber: 252,
      type: 'exam_sheet',
      title: 'تجويد: سكتة رواية حفص (2021)',
      subjectId: 'tajwid_teori',
      topicJawi: 'مد فرعي, سكتة دان وقف & ابتداء',
      topicRumi: "Mad Far'i, Saktah & Waqaf",
      tahun: 2021,
      bahagian: 2,
      questions: SSSRU_QUESTIONS.filter((q) => q.id === 'tajwid_2021_b2_q1')
    });

    return pages;
  }, []);

  // Find current book page or closest
  const activePage = useMemo(() => {
    const found = bookPages.find((p) => p.pageNumber === currentPage);
    if (found) return found;
    // Find closest page
    return bookPages[0];
  }, [bookPages, currentPage]);

  const handleNextPage = () => {
    const currentIndex = bookPages.findIndex((p) => p.pageNumber === activePage.pageNumber);
    if (currentIndex < bookPages.length - 1) {
      setCurrentPage(bookPages[currentIndex + 1].pageNumber);
    }
  };

  const handlePrevPage = () => {
    const currentIndex = bookPages.findIndex((p) => p.pageNumber === activePage.pageNumber);
    if (currentIndex > 0) {
      setCurrentPage(bookPages[currentIndex - 1].pageNumber);
    }
  };

  const handleJumpToSubject = (pageNo: number) => {
    setCurrentPage(pageNo);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Top AnyFlip Viewer Toolbar */}
      <div className="bg-[#0D3B3E] text-[#FBFBF9] border-2 border-[#D4AF37] rounded-xl p-3.5 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-[#FBFBF9]">
                بوكو سيلق ديجيتل سسرو (AnyFlip Digital Flipbook Reader)
              </h2>
              <span className="text-[11px] px-2 py-0.5 bg-[#FFF176] text-[#0D3B3E] font-bold rounded">
                2017 – 2023
              </span>
            </div>
            <p className="text-[11px] text-stone-300">
              Format asal naskhah AnyFlip: "Himpunan SSSRU 2017 - 2023 [Soalan & Jawapan]"
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Yellow Highlighter Toggle */}
          <button
            type="button"
            onClick={() => setHighlightAnswers(!highlightAnswers)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold border transition-all ${
              highlightAnswers
                ? 'bg-[#FFF176] text-[#0D3B3E] border-[#D4AF37] shadow-xs'
                : 'bg-black/30 text-stone-300 border-stone-600 hover:text-white'
            }`}
            title="Togol Paparan Jawapan Kuning Asal AnyFlip"
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span>
              {highlightAnswers ? 'Jawapan Kuning: Dipaparkan (AnyFlip)' : 'Mod Ujian: Disembunyikan'}
            </span>
          </button>

          {/* Direct link to original AnyFlip */}
          <a
            href="https://online.anyflip.com/wcnjw/buqb/mobile/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 rounded-lg font-medium transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Buka AnyFlip Rasmi</span>
          </a>
        </div>
      </div>

      {/* Page Navigation Strip */}
      <div className="bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xs text-xs">
        {/* Page selector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={bookPages.findIndex((p) => p.pageNumber === activePage.pageNumber) === 0}
            className="p-1.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 disabled:opacity-30 hover:bg-stone-200"
            title="Muka Surat Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 font-medium text-stone-800 dark:text-stone-200">
            <span>موك سورت:</span>
            <select
              value={activePage.pageNumber}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="bg-stone-50 dark:bg-[#142e31] border border-stone-300 dark:border-stone-700 rounded px-2 py-1 font-bold text-[#0D3B3E] dark:text-[#FFF176]"
            >
              {bookPages.map((p) => (
                <option key={p.pageNumber} value={p.pageNumber}>
                  M/S {p.pageNumber}: {p.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={
              bookPages.findIndex((p) => p.pageNumber === activePage.pageNumber) ===
              bookPages.length - 1
            }
            className="p-1.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 disabled:opacity-30 hover:bg-stone-200"
            title="Muka Surat Seterusnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick jump to Isi Kandungan button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded font-medium hover:bg-stone-200"
          >
            📑 M/S 3: Isi Kandungan
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded font-medium hover:bg-stone-200"
          >
            📘 M/S 1: Kulit Hadapan
          </button>
        </div>
      </div>

      {/* Main Page Canvas Display */}
      <div className="bg-[#FAF9F5] dark:bg-[#071719] border-2 border-stone-300 dark:border-stone-700 rounded-2xl shadow-xl p-4 sm:p-8 min-h-[640px] flex flex-col justify-between transition-all">
        {/* Top Header of the Page Sheet (Running header found in the SSSRU book) */}
        <div className="border-b-2 border-[#0D3B3E] dark:border-[#D4AF37] pb-3 mb-6 flex flex-wrap items-center justify-between text-xs text-stone-600 dark:text-stone-400">
          <div className="font-semibold flex items-center gap-2">
            <span className="font-jawi text-sm text-[#0D3B3E] dark:text-[#D4AF37]">
              همڤونن سوءالن ڤڤريقساءن سسرو (2017 - 2023)
            </span>
            <span>·</span>
            <span className="hidden sm:inline">Kementerian Hal Ehwal Ugama Brunei</span>
          </div>

          <div className="font-bold text-[#0D3B3E] dark:text-[#FFF176] tabular-nums">
            [ Muka Surat: {activePage.pageNumber} ]
          </div>
        </div>

        {/* CONTENT RENDER BY PAGE TYPE */}
        {activePage.type === 'cover' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-12 border-4 border-double border-[#D4AF37] rounded-xl bg-white dark:bg-[#0e2325]">
            <div className="w-20 h-20 rounded-full bg-[#0D3B3E] text-[#D4AF37] flex items-center justify-center mx-auto mb-4 border-2 border-[#D4AF37]">
              <BookOpen className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">
              Kementerian Hal Ehwal Ugama · Negara Brunei Darussalam
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3B3E] dark:text-[#FBFBF9] mt-3 font-serif">
              HIMPUNAN SOALAN PEPERIKSAAN
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] font-serif">
              SIJIL SEKOLAH-SEKOLAH RENDAH UGAMA (SSSRU)
            </h2>
            <p className="text-lg font-bold text-stone-800 dark:text-stone-200 mt-1">
              2017 – 2023 [SOALAN & JAWAPAN]
            </p>

            <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-[#D4AF37] max-w-lg">
              <p className="font-jawi text-lg text-[#0D3B3E] dark:text-[#FFF176] font-semibold leading-relaxed">
                كوليكسي سوءالن دان جواڤن سسرو اونتوق كݢوناٴن التيهن موريد درجه انم
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Disusun oleh: MNurakmal MN · Sumber Dokumen AnyFlip (online.anyflip.com/wcnjw/buqb)
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className="mt-8 px-6 py-2.5 bg-[#0D3B3E] hover:bg-[#164e52] text-[#FBFBF9] rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              Buka Isi Kandungan (M/S 3) →
            </button>
          </div>
        )}

        {activePage.type === 'toc' && (
          <div className="flex-1 p-4 sm:p-6 bg-white dark:bg-[#0e2325] rounded-xl border border-stone-200 dark:border-stone-800">
            <div className="text-center border-b border-stone-200 dark:border-stone-800 pb-4 mb-4">
              <h2 className="text-xl font-bold text-[#0D3B3E] dark:text-[#FBFBF9] font-jawi text-2xl">
                إيسي كاندوڠن (ISI KANDUNGAN)
              </h2>
              <p className="text-xs text-stone-500">
                Klik mana-mana subjek di bawah untuk melompat terus ke muka surat peperiksaan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {[
                { no: 1, jawi: 'توحيد', rumi: 'Tauhid', pages: 'M/S 4 – 25', jump: 5 },
                { no: 2, jawi: 'فقه I: صلاة', rumi: 'Fiqh I: Solah', pages: 'M/S 26 – 55', jump: 42 },
                { no: 3, jawi: 'فقه I: زكاة', rumi: 'Fiqh I: Zakat', pages: 'M/S 56 – 80', jump: 76 },
                { no: 4, jawi: 'فقه II: حج دان عمرة', rumi: 'Fiqh II: Haji & Umrah', pages: 'M/S 81 – 110', jump: 98 },
                { no: 5, jawi: 'فقه II: معاملات', rumi: 'Fiqh II: Muamalat', pages: 'M/S 111 – 135', jump: 124 },
                { no: 6, jawi: 'فقه III: جنايات', rumi: 'Fiqh III: Jenayat', pages: 'M/S 136 – 160', jump: 149 },
                { no: 7, jawi: 'فقه III: مناكحات', rumi: 'Fiqh III: Munakahat', pages: 'M/S 161 – 180', jump: 168 },
                { no: 8, jawi: 'سجاره اسلام', rumi: 'Sejarah Islam', pages: 'M/S 181 – 205', jump: 182 },
                { no: 9, jawi: 'اخلاق', rumi: 'Akhlak', pages: 'M/S 206 – 230', jump: 191 },
                { no: 10, jawi: 'تجويد تيوري', rumi: 'Tajwid Teori', pages: 'M/S 231 – 260', jump: 243 }
              ].map((subj) => (
                <button
                  key={subj.no}
                  type="button"
                  onClick={() => handleJumpToSubject(subj.jump)}
                  className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 hover:border-[#D4AF37] hover:bg-amber-50/50 dark:hover:bg-[#133336] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0D3B3E] text-[#D4AF37] text-xs font-bold flex items-center justify-center shrink-0">
                      {subj.no}
                    </span>
                    <div>
                      <span className="font-jawi font-bold text-base text-[#0D3B3E] dark:text-[#FFF176] block">
                        {subj.jawi}
                      </span>
                      <span className="text-xs text-stone-500">{subj.rumi}</span>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-stone-400 group-hover:text-[#0D3B3E] dark:group-hover:text-[#FFF176] tabular-nums">
                    {subj.pages} →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activePage.type === 'exam_sheet' && (
          <div className="flex-1 space-y-4">
            {/* The 4-Column Header Table exactly as in the AnyFlip document:
                [تأصيل / Topik] | [سوءالن / Soalan] | [بهݢين / Bahagian] | [تاهون / Tahun] */}
            <div className="border-2 border-[#0D3B3E] dark:border-stone-700 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#0D3B3E] text-[#FBFBF9] grid grid-cols-12 text-xs font-bold p-3 border-b-2 border-[#D4AF37] text-center">
                <div className="col-span-3">تأصيل / Topik</div>
                <div className="col-span-6">سوءالن / Soalan</div>
                <div className="col-span-1">بهݢين</div>
                <div className="col-span-2">تاهون</div>
              </div>

              {/* Table Row */}
              <div className="grid grid-cols-12 text-xs bg-white dark:bg-[#12282a] divide-x divide-stone-200 dark:divide-stone-700 min-h-[360px]">
                {/* 1. Topik column */}
                <div className="col-span-3 p-4 bg-stone-50/60 dark:bg-[#0e2325] flex flex-col justify-between text-right">
                  <div>
                    <span className="font-bold text-stone-500 text-[11px] block">سبجيك & تاجوق:</span>
                    <h3 className="font-jawi text-lg font-bold text-[#0D3B3E] dark:text-[#D4AF37] mt-1 leading-relaxed">
                      {activePage.topicJawi}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                      {activePage.topicRumi}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800">
                    <span className="text-[11px] text-stone-400 block">Rujukan Dokumen:</span>
                    <span className="font-mono text-[11px] font-semibold text-stone-600 dark:text-stone-300">
                      SSSRU Himpunan M/S {activePage.pageNumber}
                    </span>
                  </div>
                </div>

                {/* 2. Soalan column (Question stem + Options + Yellow Highlighter Marking) */}
                <div className="col-span-6 p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    {activePage.questions?.map((q) => (
                      <div key={q.id} className="space-y-4">
                        {/* Question Stem in Jawi */}
                        <div>
                          <p
                            style={{ fontSize: `${(21 * typeScale) / 100}px` }}
                            className="font-jawi text-stone-900 dark:text-stone-100 font-semibold leading-loose text-right"
                          >
                            {q.soalanJawi}
                          </p>
                          <p className="text-xs text-stone-500 italic mt-1">{q.soalanRumi}</p>
                        </div>

                        {/* BAHAGIAN 1: MCQ with Yellow Highlighter */}
                        {q.bahagian === 1 && q.options && (
                          <div className="space-y-2 pt-2" dir="rtl">
                            {q.options.map((opt) => {
                              const isCorrect = opt.key === q.jawapanBetulKey;
                              const isYellowHighlighted = highlightAnswers && isCorrect;

                              return (
                                <div
                                  key={opt.key}
                                  className={`p-2.5 rounded-lg border text-right flex items-center justify-between gap-3 transition-colors ${
                                    isYellowHighlighted
                                      ? 'bg-[#FFF176] dark:bg-[#FFF176]/90 text-[#0D3B3E] font-bold border-[#D4AF37] shadow-xs'
                                      : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-jawi font-bold text-base shrink-0">
                                      ({opt.key})
                                    </span>
                                    <span className="font-jawi text-base font-medium">
                                      {opt.textJawi}
                                    </span>
                                    <span className="text-[11px] opacity-75 font-normal">
                                      ({opt.textRumi})
                                    </span>
                                  </div>

                                  {isYellowHighlighted && (
                                    <span className="text-[11px] bg-[#0D3B3E] text-white px-2 py-0.5 rounded font-bold">
                                      ✓ Jawapan Kuning Asal
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* BAHAGIAN 2: Subjektif with Model Answer Yellow Highlighter */}
                        {q.bahagian === 2 && (
                          <div className="space-y-3 pt-2">
                            {q.subQuestions &&
                              q.subQuestions.map((sq) => (
                                <div
                                  key={sq.numeral}
                                  className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-lg border border-stone-200 dark:border-stone-700 text-right space-y-1.5"
                                >
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-stone-500 tabular-nums">
                                      [{sq.markah} Markah]
                                    </span>
                                    <span className="font-bold text-[#0D3B3E] dark:text-[#D4AF37]">
                                      ({sq.numeral})
                                    </span>
                                  </div>
                                  <p className="font-jawi text-base font-semibold text-stone-900 dark:text-stone-100">
                                    {sq.textJawi}
                                  </p>

                                  {/* Yellow Model Answer line */}
                                  {highlightAnswers ? (
                                    <div className="mt-2 p-2 bg-[#FFF176] dark:bg-[#FFF176]/90 text-[#0D3B3E] rounded border border-[#D4AF37] font-jawi text-base font-bold leading-relaxed">
                                      جواڤن موديل: {sq.skemaJawapanJawi}
                                    </div>
                                  ) : (
                                    <div className="mt-2 h-10 border-b border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-end text-xs text-stone-400">
                                      (Ruang Jawapan Pelajar - Jawapan kuning disembunyikan dalam mod ujian)
                                    </div>
                                  )}
                                </div>
                              ))}

                            {/* Overall summary answer line */}
                            {highlightAnswers && !q.subQuestions && (
                              <div className="p-3 bg-[#FFF176] dark:bg-[#FFF176]/90 text-[#0D3B3E] rounded-lg border-2 border-[#0D3B3E] font-jawi text-base font-bold leading-relaxed text-right">
                                {q.skemaJawapanJawi}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Practice button link */}
                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">
                      Ingin menjawab dengan stylus atau semakan automatik?
                    </span>
                    {onPracticeQuestion && activePage.questions?.[0] && (
                      <button
                        type="button"
                        onClick={() => onPracticeQuestion(activePage.questions![0])}
                        className="px-3 py-1 bg-[#0D3B3E] hover:bg-[#164e52] text-white rounded text-xs font-semibold flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Buka Dalam Kanvas Interaktif</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Bahagian column */}
                <div className="col-span-1 p-3 text-center flex flex-col justify-center items-center bg-stone-50/30 dark:bg-[#0e2325]">
                  <span className="text-xl font-bold font-mono text-[#0D3B3E] dark:text-[#FFF176]">
                    {activePage.bahagian}
                  </span>
                  <span className="text-[10px] text-stone-500 uppercase mt-0.5">
                    {activePage.bahagian === 1 ? 'Objektif' : 'Subjektif'}
                  </span>
                </div>

                {/* 4. Tahun column */}
                <div className="col-span-2 p-3 text-center flex flex-col justify-center items-center">
                  <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                    {activePage.tahun}
                  </span>
                  <span className="text-[10px] text-stone-500 mt-0.5">SSSRU Rasmi</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Page Navigation Buttons */}
        <div className="border-t-2 border-stone-200 dark:border-stone-800 pt-4 mt-6 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={bookPages.findIndex((p) => p.pageNumber === activePage.pageNumber) === 0}
            className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 rounded-lg font-medium hover:bg-stone-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>◄ Selak M/S Sebelumnya</span>
          </button>

          <div className="text-stone-500 font-semibold tabular-nums">
            Halaman {activePage.pageNumber} daripada 260
          </div>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={
              bookPages.findIndex((p) => p.pageNumber === activePage.pageNumber) ===
              bookPages.length - 1
            }
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0D3B3E] text-white rounded-lg font-medium hover:bg-[#164e52] disabled:opacity-40"
          >
            <span>Selak M/S Seterusnya ►</span>
            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </div>
  );
};
