import React, { useState } from 'react';
import { 
  FileUp, 
  Layers, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  Plus, 
  Trash2, 
  Edit3, 
  UploadCloud,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { Question } from '../data/sssruData';

interface PdfIngestionEngineProps {
  onPublishQuestions: (newQuestions: Question[]) => void;
}

interface ParsedItem {
  id: string;
  topicJawi: string;
  topicRumi: string;
  soalanJawi: string;
  soalanRumi: string;
  bahagian: 1 | 2;
  tahun: number;
  markah: number;
  jawapanBetulKey?: 'ا' | 'ب' | 'ج' | 'د';
  skemaJawapanJawi: string;
  skemaJawapanRumi: string;
}

export const PdfIngestionEngine: React.FC<PdfIngestionEngineProps> = ({
  onPublishQuestions
}) => {
  const [pipelineStep, setPipelineStep] = useState<1 | 2 | 3 | 4>(1);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Extracted mock items from the uploaded paper
  const [parsedItems, setParsedItems] = useState<ParsedItem[]>([
    {
      id: 'ingested_tauhid_2023_01',
      topicJawi: 'أهل السنة والجماعة',
      topicRumi: 'Ahlus Sunnah wal Jama\'ah',
      soalanJawi: 'حكوم برڤݢڠ دڠن عقيدة أهل السنة والجماعة باݢي ستياڤ اومت اسلام اياله ________.',
      soalanRumi: 'Hukum berpegang dengan akidah Ahlus Sunnah wal Jama\'ah bagi setiap umat Islam ialah ________.',
      bahagian: 1,
      tahun: 2023,
      markah: 1,
      jawapanBetulKey: 'ا',
      skemaJawapanJawi: '(ا) واجب - كران اي مروڤاكن عقيدة يڠ بنر يڠ دباوا اوليه رسول الله ﷺ دان ڤارا صحابة.',
      skemaJawapanRumi: '(a) Wajib - Kerana ia akidah yang sahih berlandaskan sunnah Rasulullah SAW.'
    },
    {
      id: 'ingested_tajwid_2023_02',
      topicJawi: 'مد فرعي دان سكتة',
      topicRumi: 'Mad Far\'i & Saktah',
      soalanJawi: 'جلسكن دوا شرط ترجادينڽ مد صلة طويله سرتا قدر ڤنجڠ باچاءنڽ.',
      soalanRumi: 'Jelaskan dua syarat terjadinya Mad Silah Thawilah serta kadar panjang bacaannya.',
      bahagian: 2,
      tahun: 2023,
      markah: 3,
      skemaJawapanJawi: 'هاء ضمير برتمو دڠن همزة قطع برباريس دالم دوا كليمه، قدر باچاءن: 4 اتاو 5 حركة.',
      skemaJawapanRumi: 'Ha dhamir bertemu huruf Hamzah Qatha\' dalam dua kalimah berasingan, kadar bacaan 4 atau 5 harakat.'
    }
  ]);

  const handleSimulateUpload = (filename: string) => {
    setUploadedFileName(filename);
    setIsProcessing(true);
    setPipelineStep(2);

    // Simulate layout detection & OCR pipeline
    setTimeout(() => {
      setPipelineStep(3);
      setTimeout(() => {
        setIsProcessing(false);
        setPipelineStep(4);
      }, 1200);
    }, 1200);
  };

  const handleCommitPublish = () => {
    const formatted: Question[] = parsedItems.map((item) => ({
      id: item.id,
      subjectId: 'tauhid',
      topicJawi: item.topicJawi,
      topicRumi: item.topicRumi,
      subtopic: 'Kertas Baharu Diimbas',
      bahagian: item.bahagian,
      tahun: item.tahun,
      markah: item.markah,
      soalanJawi: item.soalanJawi,
      soalanRumi: item.soalanRumi,
      jawapanBetulKey: item.jawapanBetulKey,
      skemaJawapanJawi: item.skemaJawapanJawi,
      skemaJawapanRumi: item.skemaJawapanRumi,
      huraianRujukan: 'Dimuat naik melalui Enjin Imbasan PDF Guru SSSRU Ikhtibar.',
      pdfPageCitation: `${uploadedFileName || 'Kertas Peperiksaan'} - M/S 1`
    }));

    onPublishQuestions(formatted);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#0D3B3E] dark:text-[#FBFBF9] flex items-center gap-2">
              <FileUp className="w-5 h-5 text-[#D4AF37]" />
              <span>اينجين اينݢيسي كرتس ڤڤريقساءن پي.دي.اف (Dynamic PDF Paper Ingestion Engine)</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Muat naik naskhah PDF peperiksaan SSSRU terkini untuk diekstrak secara automatik ke dalam pangkalan soalan
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400">Mod Guru / Pentadbir Sistem</span>
          </div>
        </div>

        {/* 4 Pipeline Step Progress */}
        <div className="grid grid-cols-4 gap-2 pt-6">
          {[
            { step: 1, label: '1. Muat Naik PDF', icon: UploadCloud },
            { step: 2, label: '2. Pengesanan Jadual', icon: Layers },
            { step: 3, label: '3. OCR Tulisan Jawi', icon: FileText },
            { step: 4, label: '4. Semak & Terbitkan', icon: FileCheck }
          ].map((st) => {
            const Icon = st.icon;
            const isDone = pipelineStep > st.step;
            const isCurrent = pipelineStep === st.step;

            return (
              <div
                key={st.step}
                className={`p-3 rounded-lg border text-center transition-all ${
                  isCurrent
                    ? 'bg-[#0D3B3E] text-[#FBFBF9] border-[#D4AF37] shadow-sm'
                    : isDone
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-400'
                    : 'bg-stone-50 dark:bg-stone-800/40 text-stone-400 border-stone-200 dark:border-stone-700'
                }`}
              >
                <Icon className={`w-4 h-4 mx-auto mb-1 ${isCurrent ? 'text-[#D4AF37]' : ''}`} />
                <span className="text-xs font-semibold block">{st.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Upload Dropzone */}
      {pipelineStep === 1 && (
        <div className="bg-white dark:bg-[#0f2426] border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#D4AF37] rounded-xl p-10 text-center space-y-4 transition-colors">
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/50 text-[#0D3B3E] dark:text-[#D4AF37] mx-auto flex items-center justify-center">
            <UploadCloud className="w-8 h-8 text-[#D4AF37]" />
          </div>

          <div>
            <h3 className="font-bold text-stone-800 dark:text-stone-200 text-base">
              Tarik & Lepaskan Fail PDF Kertas Peperiksaan SSSRU
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Sistem menyokong imbasan berkualiti tinggi jadual 4-kolum [Topik | Soalan | Bahagian | Tahun]
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => handleSimulateUpload('SSSRU_Tauhid_2023_Kertas1dan2.pdf')}
              className="px-4 py-2 bg-[#0D3B3E] hover:bg-[#15464a] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2"
            >
              <FileUp className="w-4 h-4 text-[#D4AF37]" />
              <span>Muat Naik: SSSRU_Tauhid_2023_Kertas1dan2.pdf (Contoh)</span>
            </button>
            <button
              type="button"
              onClick={() => handleSimulateUpload('SSSRU_Tajwid_Teori_2023_Rasmi.pdf')}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg text-xs font-semibold"
            >
              Muat Naik: SSSRU_Tajwid_Teori_2023_Rasmi.pdf
            </button>
          </div>
        </div>
      )}

      {/* Step 2 & 3: Processing Animation */}
      {(pipelineStep === 2 || pipelineStep === 3) && (
        <div className="bg-white dark:bg-[#0f2426] border border-stone-200 dark:border-stone-800 rounded-xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#0D3B3E] border-t-[#D4AF37] animate-spin mx-auto" />
          <div>
            <h3 className="font-bold text-[#0D3B3E] dark:text-[#FFF176] text-base">
              {pipelineStep === 2
                ? 'Sedang Mengesan Struktur Jadual 4-Kolum...'
                : 'Mengekstrak Ortografi Teks Jawi & Model Jawapan (OCR Engine)...'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Memproses: {uploadedFileName}
            </p>
          </div>
        </div>
      )}

      {/* Step 4: Draft Preview & Schema Validation */}
      {pipelineStep === 4 && (
        <div className="bg-white dark:bg-[#0f2426] border-2 border-[#D4AF37] rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded text-xs font-bold">
                  Selesai Diekstrak (2 Soalan Ditemui)
                </span>
                <span className="text-xs text-stone-500">{uploadedFileName}</span>
              </div>
              <h3 className="font-bold text-[#0D3B3E] dark:text-[#FBFBF9] text-base mt-1">
                Semakan Deraf Soalan Sebelum Diterbitkan ke Bank Soalan Murid
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPipelineStep(1)}
                className="px-3.5 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg text-xs font-medium hover:bg-stone-200"
              >
                Muat Naik Semula
              </button>

              <button
                type="button"
                onClick={handleCommitPublish}
                className="px-5 py-2 bg-[#0D3B3E] hover:bg-[#164e52] text-[#FBFBF9] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Terbitkan ke Bank Soalan Murid</span>
              </button>
            </div>
          </div>

          {publishSuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 text-emerald-900 dark:text-emerald-200 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Soalan berjaya diterbitkan! Murid kini boleh melihat soalan ini dalam Mod Ulangkaji Bertajuk dan Peperiksaan Simulasi.
              </span>
            </div>
          )}

          {/* Table Preview mirroring the source PDF */}
          <div className="border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
            <div className="bg-[#0D3B3E] text-white grid grid-cols-12 text-xs font-bold p-3 border-b border-[#D4AF37] text-center">
              <div className="col-span-2">تأصيل / Topik</div>
              <div className="col-span-6">سوءالن / Soalan (Jawi & Rumi)</div>
              <div className="col-span-2">بهݢين / Bahagian</div>
              <div className="col-span-2">سكيما جواڤن (Skema)</div>
            </div>

            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {parsedItems.map((item, idx) => (
                <div key={item.id} className="grid grid-cols-12 text-xs p-4 items-center gap-2 bg-[#FAF9F6] dark:bg-[#12282a]">
                  <div className="col-span-2 text-center">
                    <span className="font-jawi font-bold text-sm text-[#0D3B3E] dark:text-[#D4AF37] block">
                      {item.topicJawi}
                    </span>
                    <span className="text-[11px] text-stone-500">{item.topicRumi}</span>
                  </div>

                  <div className="col-span-6 space-y-1 text-right">
                    <p className="font-jawi text-base font-semibold text-stone-900 dark:text-stone-100 leading-relaxed">
                      {item.soalanJawi}
                    </p>
                    <p className="text-[11px] text-stone-500 italic text-left">{item.soalanRumi}</p>
                  </div>

                  <div className="col-span-2 text-center space-y-1">
                    <span className="px-2 py-0.5 bg-stone-200 dark:bg-stone-700 rounded font-semibold text-[11px]">
                      Bahagian {item.bahagian}
                    </span>
                    <span className="block text-[11px] text-stone-500">[{item.markah} Markah]</span>
                  </div>

                  <div className="col-span-2 text-right">
                    <p className="font-jawi text-sm font-semibold text-[#0D3B3E] dark:text-[#FFF176] bg-[#FFF176]/30 dark:bg-[#FFF176]/10 p-2 rounded border border-[#D4AF37]/40">
                      {item.skemaJawapanJawi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
