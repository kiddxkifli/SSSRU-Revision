export interface SubjectInfo {
  id: string;
  nameJawi: string;
  nameRumi: string;
  category: 'Tauhid' | 'Fiqh' | 'Sejarah' | 'Akhlak' | 'Tajwid';
  topics: {
    id: string;
    titleJawi: string;
    titleRumi: string;
    subtopics: string[];
  }[];
  description: string;
  iconName: string;
  totalPastQuestions: number;
}

export interface QuestionOption {
  key: 'ا' | 'ب' | 'ج' | 'د';
  textJawi: string;
  textRumi: string;
}

export interface Question {
  id: string;
  subjectId: string;
  topicJawi: string;
  topicRumi: string;
  subtopic: string;
  bahagian: 1 | 2; // 1 = Objektif (1 Markah), 2 = Subjektif (2-4 Markah)
  tahun: number; // 2017 - 2023
  markah: number;
  soalanJawi: string;
  soalanRumi: string;
  subQuestions?: {
    numeral: string;
    textJawi: string;
    textRumi: string;
    markah: number;
    skemaJawapanJawi: string;
    skemaJawapanRumi: string;
    rubrik: string[];
  }[];
  options?: QuestionOption[];
  jawapanBetulKey?: 'ا' | 'ب' | 'ج' | 'د';
  skemaJawapanJawi: string;
  skemaJawapanRumi: string;
  huraianRujukan: string;
  pdfPageCitation: string;
  rubrikKriteria?: string[];
  audioSample?: {
    title: string;
    type: 'tajwid_harkat' | 'saktah' | 'tafkhim_tarqiq';
    description: string;
  };
}

export const SSSRU_SUBJECTS: SubjectInfo[] = [
  {
    id: 'tauhid',
    nameJawi: 'توحيد',
    nameRumi: 'Tauhid',
    category: 'Tauhid',
    description: 'Akidah Islamiah, Mengenal Allah, Ahlus Sunnah wal Jama\'ah dan Memelihara Pegangan daripada Ajaran Sesat.',
    iconName: 'ShieldCheck',
    totalPastQuestions: 48,
    topics: [
      {
        id: 'ahlus_sunnah',
        titleJawi: 'أهل السنة والجماعة',
        titleRumi: 'Ahlus Sunnah wal Jama\'ah',
        subtopics: ['Pengasas & Tokoh Terkenal', 'Prinsip Akidah Asy\'ariyah & Maturidiyah', 'Kelebihan Berpegang']
      },
      {
        id: 'ajaran_sesat',
        titleJawi: 'أجيرن مست دنگارا بروني دارالسلام',
        titleRumi: 'Ajaran Sesat di Brunei Darussalam',
        subtopics: ['Qadiani (Ahmadiyah)', 'Baha\'i', 'Si-Hussin', 'Ciri-ciri & Bahaya Ajaran Sesat']
      }
    ]
  },
  {
    id: 'fiqh1_solah',
    nameJawi: 'فقه I: صلاة',
    nameRumi: 'Fiqh I: Solah',
    category: 'Fiqh',
    description: 'Hukum-hakam Fardhu Ain berkaitan Solah, Rukun, Syarat Sah, Sunat Ab\'adh & Hai\'at, serta Solah-Solah Sunat.',
    iconName: 'Compass',
    totalPastQuestions: 54,
    topics: [
      {
        id: 'rukun_syarat',
        titleJawi: 'شرط دان روكون صلاة',
        titleRumi: 'Syarat & Rukun Solah',
        subtopics: ['Syarat Wajib & Sah', '13 Rukun Solah', 'Sujud Sahwi']
      },
      {
        id: 'batal_sunat',
        titleJawi: 'سنة صلاة & ڤركارا يڠ ممبطلكن',
        titleRumi: 'Sunat Solah & Perkara Membatalkan',
        subtopics: ['Sunat Ab\'adh vs Sunat Hai\'at', 'Perkara Membatalkan Solah', 'Tertib Bacaan']
      },
      {
        id: 'solah_sunat',
        titleJawi: 'صلاة سنة',
        titleRumi: 'Solah Sunat',
        subtopics: ['Solat Rawatib (Muakkad & Ghairu Muakkad)', 'Solat Dhuha & Witir', 'Solat Tahajjud & Hajat']
      }
    ]
  },
  {
    id: 'fiqh1_zakat',
    nameJawi: 'فقه I: زكاة',
    nameRumi: 'Fiqh I: Zakat',
    category: 'Fiqh',
    description: 'Kewajipan Zakat Fitrah dan Zakat Harta, Kategori 8 Asnaf Penerima, dan Tatacara Agihan Zakat.',
    iconName: 'Coins',
    totalPastQuestions: 42,
    topics: [
      {
        id: 'asnaf_zakat',
        titleJawi: 'اورڠ يڠ برحق منريما زكاة',
        titleRumi: 'Golongan Asnaf Zakat',
        subtopics: ['8 Asnaf (Fakir, Miskin, Amil, Muallaf, Riqab, Gharimin, Fisabilillah, Ibnu Sabil)', 'Syarat Penerima']
      },
      {
        id: 'pembahagian_hukum',
        titleJawi: 'ڤمباݢين زكاة & حكوم مميندهكن زكاة',
        titleRumi: 'Pembahagian & Pemindahan Zakat',
        subtopics: ['Kadar Nisab & Haul', 'Hukum Memindahkan Zakat ke Luar Negeri', 'Peranan Majlis Ugama Islam']
      }
    ]
  },
  {
    id: 'fiqh2_haji',
    nameJawi: 'فقه II: حج دان عمرة',
    nameRumi: 'Fiqh II: Haji & Umrah',
    category: 'Fiqh',
    description: 'Ibadah Haji dan Umrah, Miqat, Tawaf, Sa\'i, Wukuf, Qurban dan Aqiqah.',
    iconName: 'MapPin',
    totalPastQuestions: 46,
    topics: [
      {
        id: 'haji_manasik',
        titleJawi: 'طواف الوداع دان جنس٢ عبادة حج',
        titleRumi: 'Tawaf Wada\' & Jenis Haji',
        subtopics: ['Haji Ifrad, Tamattu\', Qiran', 'Tawaf Wada\' & Larangan Ihram', 'Al-Ihsar & Pembayaran Dam']
      },
      {
        id: 'qurban_aqiqah',
        titleJawi: 'قربان دان عقيقة',
        titleRumi: 'Qurban & Aqiqah',
        subtopics: ['Syarat Sah Binatang Sembelihan', 'Waktu Penyembelihan', 'Hukum Mengagihkan Daging']
      }
    ]
  },
  {
    id: 'fiqh2_muamalat',
    nameJawi: 'فقه II: معاملات',
    nameRumi: 'Fiqh II: Muamalat',
    category: 'Fiqh',
    description: 'Muamalat Islam merangkumi Rahn (Gadaian), \'Ariyah (Pinjaman), Hibah, Sedekah, Hadiah dan Wasiat.',
    iconName: 'Handshake',
    totalPastQuestions: 38,
    topics: [
      {
        id: 'rahn_pinjaman',
        titleJawi: 'ݢادين (Rahn) دان فيمن (\'Ariyah)',
        titleRumi: 'Gadaian (Rahn) & Pinjaman (\'Ariyah)',
        subtopics: ['Rukun & Syarat Rahn', 'Kewajipan Penjagaan Barang Pinjaman', 'Larangan Riba']
      },
      {
        id: 'hibah_wasiat',
        titleJawi: 'فمبيرين (Hibah), صدقة & وصية',
        titleRumi: 'Hibah, Sedekah & Wasiat',
        subtopics: ['Perbezaan Hibah, Hadiah & Sedekah', 'Syarat Wasiat 1/3 Harta', 'Masa Pelaksanaan Wasiat']
      }
    ]
  },
  {
    id: 'fiqh3_jenayat',
    nameJawi: 'فقه III: جنايات',
    nameRumi: 'Fiqh III: Jenayat',
    category: 'Fiqh',
    description: 'Undang-undang Jenayah Islam: Qisas, Diyat, Hudud, Ta\'zir, Riddah dan Bughat.',
    iconName: 'Scale',
    totalPastQuestions: 40,
    topics: [
      {
        id: 'qisas_hudud',
        titleJawi: 'قصاص, دية دان حدود',
        titleRumi: 'Qisas, Diyat & Hudud',
        subtopics: ['Kesalahan Zina & Qazaf', 'Minum Arak & Mencuri (Sariqah)', 'Kategori Diyat (Mughallazah & Mukhaffafah)']
      },
      {
        id: 'tazir_riddah',
        titleJawi: 'تعزير, مرتد دان درهاك (Buhat)',
        titleRumi: 'Ta\'zir, Riddah & Bughat',
        subtopics: ['Kuasa Hakim dalam Hukuman Ta\'zir', 'Kesan Murtad terhadap Hak Harta & Nikah', 'Syarat Bughat']
      }
    ]
  },
  {
    id: 'fiqh3_munakahat',
    nameJawi: 'فقه III: مناكحات',
    nameRumi: 'Fiqh III: Munakahat',
    category: 'Fiqh',
    description: 'Perkahwinan dalam Islam: Rukun Nikah, Syarat Wali, Khitbah, Talaq, Khulu\', Fasakh, \'Iddah dan Ruju\'.',
    iconName: 'HeartHandshake',
    totalPastQuestions: 45,
    topics: [
      {
        id: 'nikah_wali',
        titleJawi: 'نكاح, ركون نكاح دان شرط ولي',
        titleRumi: 'Nikah, Rukun & Syarat Wali',
        subtopics: ['5 Rukun Nikah', 'Tertib Wali Nasab', 'Wali Hakim & Syarat Pinangan (Khitbah)']
      },
      {
        id: 'talaq_iddah',
        titleJawi: 'طلاق, خلع, فسخ, عدة دان رجوع',
        titleRumi: 'Talaq, Khulu\', Fasakh, \'Iddah & Ruju\'',
        subtopics: ['Jenis Talaq (Raj\'i & Ba\'in)', 'Tempoh \'Iddah (Kematian Suami, Bercerai, Hamil)', 'Syarat Sah Ruju\'']
      }
    ]
  },
  {
    id: 'sejarah_islam',
    nameJawi: 'سجاره اسلام',
    nameRumi: 'Sejarah Islam',
    category: 'Sejarah',
    description: 'Sirah Nabawiyyah: Peristiwa Hijrah, Peperangan Utama dalam Islam, dan Zaman Khulafa\' Ar-Rasyidin.',
    iconName: 'ScrollText',
    totalPastQuestions: 50,
    topics: [
      {
        id: 'hijrah_perang',
        titleJawi: 'هجرة رسول الله دان ڤراڠن درسم اسلام',
        titleRumi: 'Hijrah & Peperangan Islam',
        subtopics: ['Sebab & Perjalanan Hijrah ke Madinah', 'Masjid Quba\' & Nabawi', 'Perang Badar, Uhud, Khandaq, Fathu Makkah']
      },
      {
        id: 'khulafa_rasyidin',
        titleJawi: 'خلافة الراشدين',
        titleRumi: 'Khulafa\' Ar-Rasyidin',
        subtopics: ['Saidina Abu Bakar As-Siddiq', 'Saidina Umar Al-Khattab', 'Saidina Uthman bin Affan', 'Saidina Ali bin Abi Talib']
      }
    ]
  },
  {
    id: 'akhlak',
    nameJawi: 'اخلاق',
    nameRumi: 'Akhlak',
    category: 'Akhlak',
    description: 'Sifat-sifat Terpuji (Mahmudah): Taubat, Khauf, Sabar, Syukur, Ikhlas, Tawakkal, Redha dan Mengingati Mati.',
    iconName: 'Sparkles',
    totalPastQuestions: 42,
    topics: [
      {
        id: 'mahmudah_hati',
        titleJawi: 'طاعة باطن, توبة دان تاكوت كڤد الله',
        titleRumi: 'Ketaatan Batin, Taubat & Khauf',
        subtopics: ['Rukun & Syarat Taubat Nasuha', 'Taraf Khauf dan Raja\'', 'Ikhlas dalam Beramal']
      },
      {
        id: 'tawakkal_mati',
        titleJawi: 'توكل, رضا دان اءيڠتكن ماتي',
        titleRumi: 'Tawakkal, Redha & Ingat Mati',
        subtopics: ['Tiga Tingkatan Tawakkal', 'Hikmah Mengingati Mati', 'Menghadapi Ujian dengan Redha']
      }
    ]
  },
  {
    id: 'tajwid_teori',
    nameJawi: 'تجويد تيوري',
    nameRumi: 'Tajwid Teori',
    category: 'Tajwid',
    description: 'Kaidah Ilmu Tajwid: Lam Ta\'rif, Hukum Lam & Ra\' (Tafkhim/Tarqiq), Mad Far\'i, Saktah, Waqaf & Ibtida\'.',
    iconName: 'BookOpen',
    totalPastQuestions: 60,
    topics: [
      {
        id: 'lam_raa',
        titleJawi: 'لام التعريف دان حكم راء',
        titleRumi: 'Lam Ta\'rif & Hukum Ra\'',
        subtopics: ['Al-Qamariyyah & Al-Syamsiyyah', 'Hukum Ra\' Tafkhim (Tebal) & Tarqiq (Nipis)', 'Lam Jalalah']
      },
      {
        id: 'mad_waqaf',
        titleJawi: 'مد فرعي, سكتة دان وقف & ابتداء',
        titleRumi: 'Mad Far\'i, Saktah & Waqaf',
        subtopics: ['Mad Muttasil & Munfasil', 'Mad Lazim Kilmi & Harfi', 'Pengertian Saktah & 4 Tempat Saktah Riwayat Hafs', 'Jenis Waqaf']
      }
    ]
  }
];

export const SSSRU_QUESTIONS: Question[] = [
  // 1. TAUHID - Bahagian 1 (2017)
  {
    id: 'tauhid_2017_b1_q1',
    subjectId: 'tauhid',
    topicJawi: 'أهل السنة والجماعة',
    topicRumi: 'Ahlus Sunnah wal Jama\'ah',
    subtopic: 'Pengasas Mazhab',
    bahagian: 1,
    tahun: 2017,
    markah: 1,
    soalanJawi: 'كولوڠن أهل السنة والجماعة دأساسكن اوليه ________ اورڠ امام يڠ مشهور.',
    soalanRumi: 'Golongan Ahlus Sunnah wal Jama\'ah diasaskan oleh ________ orang Imam yang masyhur.',
    options: [
      { key: 'ا', textJawi: 'امڤت', textRumi: 'Empat' },
      { key: 'ب', textJawi: 'تيݢ', textRumi: 'Tiga' },
      { key: 'ج', textJawi: 'دوا', textRumi: 'Dua' },
      { key: 'د', textJawi: 'ليم', textRumi: 'Lima' }
    ],
    jawapanBetulKey: 'ج',
    skemaJawapanJawi: '(ج) دوا - ياءيت امام ابو الحسن الأشعري دان امام ابو منصور الماتريدي.',
    skemaJawapanRumi: '(c) Dua - iaitu Imam Abu Hasan Al-Asy\'ari dan Imam Abu Mansur Al-Maturidi.',
    huraianRujukan: 'Menurut sukatan SSSRU Tauhid (Himpunan Soalan M/S 5), iktikad Ahlus Sunnah wal Jama\'ah diasaskan oleh dua orang Imam terkemuka.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 5, Bahagian 1 Soalan 1'
  },
  // 2. TAUHID - Bahagian 2 (2019)
  {
    id: 'tauhid_2019_b2_q2',
    subjectId: 'tauhid',
    topicJawi: 'أجيرن مست دنگارا بروني دارالسلام',
    topicRumi: 'Ajaran Sesat di Brunei Darussalam',
    subtopic: 'Ajaran Qadiani',
    bahagian: 2,
    tahun: 2019,
    markah: 4,
    soalanJawi: 'اجيرن قادياني (احمديه) اداله انتارا اجيرن يڠ دهارامكن دنگارا بروني دارالسلام.',
    soalanRumi: 'Ajaran Qadiani (Ahmadiyah) adalah antara ajaran yang diharamkan di Negara Brunei Darussalam.',
    subQuestions: [
      {
        numeral: 'i',
        textJawi: 'سياڤاكه ڤڠاسس اجيرn قادياني ترسبوت؟',
        textRumi: 'Siapakah pengasas ajaran Qadiani tersebut?',
        markah: 1,
        skemaJawapanJawi: 'مرزا غلام احمد (Mirza Ghulam Ahmad)',
        skemaJawapanRumi: 'Mirza Ghulam Ahmad',
        rubrik: ['Menyebut nama Mirza Ghulam Ahmad dengan betul']
      },
      {
        numeral: 'ii',
        textJawi: 'ڽاتاكن دوا چيري كستن اجيرن قادياني.',
        textRumi: 'Nyatakan dua ciri kesesatan ajaran Qadiani.',
        markah: 2,
        skemaJawapanJawi: '1. منداقوا مرزا غلام احمد سباݢاي نبي دان رسول سلفس نبي محمد ﷺ. 2. منداقوا منريما وحي دان ممڤوڽاءي كتاب سوچي ترسنديري.',
        skemaJawapanRumi: '1. Mendakwa Mirza Ghulam Ahmad sebagai nabi selepas Nabi Muhammad SAW. 2. Mendakwa menerima wahyu dan mempunyai kitab tersendiri (Tazkirah).',
        rubrik: ['Menyatakan dakwaan kenabian palsu', 'Menyatakan dakwaan kitab/wahyu baharu atau mengubah rukun Islam']
      },
      {
        numeral: 'iii',
        textJawi: 'مڠاڤاكه اومت اسلام واجب منجاءوهي اجيرن مست؟',
        textRumi: 'Mengapakah umat Islam wajib menjauhi ajaran sesat?',
        markah: 1,
        skemaJawapanJawi: 'كران بوليه مروسقكن عقيدة دان ممباوا كڤد ككفورن سرتا ممڤچه بلهكن مشاركت اسلام.',
        skemaJawapanRumi: 'Kerana boleh merosakkan akidah, membawa kepada kekufuran, serta memecahbelahkan masyarakat Islam.',
        rubrik: ['Menyebut kesan kerosakan akidah / murtad / perpecahan ummah']
      }
    ],
    skemaJawapanJawi: 'ڤڠاسس: مرزا غلام احمد. چيري٢: منداقوا سباݢاي نبي باهارو، منداقوا منريما وحي. كواجبن منجاءوهي: اݢر تيدق كلوار دري ضياءن عقيدة يڠ بنر.',
    skemaJawapanRumi: 'Pengasas: Mirza Ghulam Ahmad. Ciri-ciri: Mendakwa menjadi nabi/rasul, menukar syariat. Kewajipan: Mengelak kerosakan akidah.',
    huraianRujukan: 'Ketetapan Fatwa Mufti Kerajaan Brunei Darussalam: Ajaran Qadiani bercanggah dengan akidah Ahlus Sunnah wal Jama\'ah kerana menafikan Nabi Muhammad SAW sebagai Khatamun Nabiyyin.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 18, Bahagian 2 Soalan 3',
    rubrikKriteria: [
      'Menyatakan pengasas Mirza Ghulam Ahmad dengan tepat',
      'Menyebut sekurang-kurangnya 2 ciri kesesatan yang sah',
      'Memberikan alasan penjagaan akidah tauhid dan keselamatan ummah'
    ]
  },
  // 3. FIQH I: SOLAH - Bahagian 1 (2021)
  {
    id: 'fiqh1_solah_2021_b1_q1',
    subjectId: 'fiqh1_solah',
    topicJawi: 'سنة صلاة & ڤركارا يڠ ممبطلكن',
    topicRumi: 'Sunat Solah & Perkara Membatalkan',
    subtopic: 'Sunat Ab\'adh',
    bahagian: 1,
    tahun: 2021,
    markah: 1,
    soalanJawi: 'مڠحاصيلكن سجود سهوي كران ترتيڠݢل ساله ساتو درڤد ________.',
    soalanRumi: 'Disunatkan melakukan sujud sahwi kerana tertinggal salah satu daripada ________.',
    options: [
      { key: 'ا', textJawi: 'سنة هيئة', textRumi: 'Sunat Hai\'at' },
      { key: 'ب', textJawi: 'سنة أبعاض', textRumi: 'Sunat Ab\'adh' },
      { key: 'ج', textJawi: 'شرط صح', textRumi: 'Syarat Sah' },
      { key: 'د', textJawi: 'روكون فعلي', textRumi: 'Rukun Fi\'li' }
    ],
    jawapanBetulKey: 'ب',
    skemaJawapanJawi: '(ب) سنة أبعاض - سڤرتي تشهد اول اتاو دعاء قنوت دالم صلاة صبح.',
    skemaJawapanRumi: '(b) Sunat Ab\'adh - seperti tahiyyat awal atau doa qunut dalam solat subuh.',
    huraianRujukan: 'Sunat Ab\'adh ialah amalan sunat yang dituntut dalam solah. Jika ditinggalkan sama ada sengaja atau terlupa, disunatkan sujud sahwi sebelum salam.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 42, Bahagian 1 Soalan 4'
  },
  // 4. FIQH I: SOLAH - Bahagian 2 (2022)
  {
    id: 'fiqh1_solah_2022_b2_q1',
    subjectId: 'fiqh1_solah',
    topicJawi: 'صلاة سنة',
    topicRumi: 'Solah Sunat',
    subtopic: 'Solat Sunat Rawatib & Dhuha',
    bahagian: 2,
    tahun: 2022,
    markah: 3,
    soalanJawi: 'صلاة سنة رواةب اياله صلاة سنة يڠ دلاكوكن سبلوم اتاو سلفس صلاة فرض.',
    soalanRumi: 'Solah sunat rawatib ialah solah sunat yang dilakukan sebelum atau selepas solat fardhu.',
    subQuestions: [
      {
        numeral: 'i',
        textJawi: 'اڤاكه مقصود رواةب مؤكدة؟',
        textRumi: 'Apakah maksud Rawatib Muakkadah?',
        markah: 1,
        skemaJawapanJawi: 'صلاة سنة رواةب يڠ امت دتونتوت دان سنتياس دعملكن اوليه رسول الله ﷺ.',
        skemaJawapanRumi: 'Solah sunat rawatib yang sangat dituntut dan sentiasa diamalkan oleh Rasulullah SAW.',
        rubrik: ['Menyebut tuntutan yang sangat digalakkan / sentiasa diamalkan Nabi SAW']
      },
      {
        numeral: 'ii',
        textJawi: 'بريكن دوا چونتوه صلاة سنة رواةب يڠ مؤكدة.',
        textRumi: 'Berikan dua contoh solat sunat rawatib yang muakkadah.',
        markah: 2,
        skemaJawapanJawi: '1. دوا ركعة سبلوم صلاة صبح (قَبْلِيَّة). 2. دوا ركعة سبلوم / سلفس صلاة ظهر.',
        skemaJawapanRumi: '1. Dua rakaat sebelum Subuh. 2. Dua rakaat sebelum/selepas Zohor (atau selepas Maghrib/Isya\').',
        rubrik: ['Menyatakan 2 contoh dengan tepat']
      }
    ],
    skemaJawapanJawi: 'رواةب مؤكدة: صلاة سنة ڤڠيرين فرض يڠ سنتياس دعملكن اوليه نبي محمد ﷺ. چونتوه: 2 ركعة سبلوم صبح، 2 ركعة سبلوم ظهر، 2 ركعة سلفس مغرب.',
    skemaJawapanRumi: 'Rawatib Muakkadah: Solah sunat pengiring fardhu yang sentiasa dilakukan oleh Rasulullah SAW. Contoh: 2 rakaat qabliyyah Subuh, ba\'diyyah Maghrib.',
    huraianRujukan: 'Kitab Fiqh Mazhab Syafi\'i: 10 atau 12 rakaat rawatib muakkadah memiliki keutamaan membina mahligai di syurga.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 57, Bahagian 2 Soalan 2',
    rubrikKriteria: [
      'Menyatakan pengertian Muakkadah (sangat dituntut)',
      'Menyebut contoh 2 waktu solat rawatib muakkadah dengan betul'
    ]
  },
  // 5. FIQH I: ZAKAT - Bahagian 1 (2020)
  {
    id: 'fiqh1_zakat_2020_b1_q1',
    subjectId: 'fiqh1_zakat',
    topicJawi: 'اورڠ يڠ برحق منريما زكاة',
    topicRumi: 'Golongan Asnaf Zakat',
    subtopic: 'Asnaf Al-Gharimin',
    bahagian: 1,
    tahun: 2020,
    markah: 1,
    soalanJawi: 'اصناف يڠ برهوتڠ اونتوق كڤرلوان هيدوڤ يڠ هاروس دان تيدق ممڤو ممبايرڽ دكنلي سباݢاي ________.',
    soalanRumi: 'Asnaf yang berhutang untuk keperluan hidup yang harus dan tidak mampu membayarnya dikenali sebagai ________.',
    options: [
      { key: 'ا', textJawi: 'ابن السبيل', textRumi: 'Ibnu Sabil' },
      { key: 'ب', textJawi: 'الرقاب', textRumi: 'Ar-Riqab' },
      { key: 'ج', textJawi: 'الغارمين', textRumi: 'Al-Gharimin' },
      { key: 'د', textJawi: 'المؤلفة قلوبهم', textRumi: 'Al-Muallafah Qulubuhum' }
    ],
    jawapanBetulKey: 'ج',
    skemaJawapanJawi: '(ج) الغارمين - اورڠ يڠ ممندوڠ هوتڠ كران معصيت تيدق برحق، تتاڤي هوتڠ اونتوق كڤرلوان سبنر دراكن.',
    skemaJawapanRumi: '(c) Al-Gharimin - Orang yang terbeban dengan hutang yang halal.',
    huraianRujukan: 'Surah At-Taubah ayat 60 menyenaraikan lapan asnaf zakat termasuk Al-Gharimin.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 76, Bahagian 1 Soalan 3'
  },
  // 6. FIQH II: HAJI DAN UMRAH - Bahagian 1 (2023)
  {
    id: 'fiqh2_haji_2023_b1_q1',
    subjectId: 'fiqh2_haji',
    topicJawi: 'طواف الوداع دان جنس٢ عبادة حج',
    topicRumi: 'Tawaf Wada\' & Jenis Haji',
    subtopic: 'Tawaf Wada\'',
    bahagian: 1,
    tahun: 2023,
    markah: 1,
    soalanJawi: 'حكوم ملاكوكن طواف الوداع باݢي اورڠ يڠ هندق منليڠݢلكن كوتا مكة مكرّمة اياله ________.',
    soalanRumi: 'Hukum melakukan Tawaf Wada\' bagi orang yang hendak meninggalkan kota Makkah Mukarramah ialah ________.',
    options: [
      { key: 'ا', textJawi: 'واجب', textRumi: 'Wajib' },
      { key: 'ب', textJawi: 'سنة مؤكد', textRumi: 'Sunat Muakkad' },
      { key: 'ج', textJawi: 'هاروس', textRumi: 'Harus' },
      { key: 'د', textJawi: 'روكون', textRumi: 'Rukun' }
    ],
    jawapanBetulKey: 'ا',
    skemaJawapanJawi: '(ا) واجب - جك دتيڠݢلكن تنڤا عذور شرعي واجب دكنكن دم (دم ترتيب دان تقدير).',
    skemaJawapanRumi: '(a) Wajib - Jika ditinggalkan tanpa keuzuran syar\'i dikenakan dam.',
    huraianRujukan: 'Tawaf Wada\' ialah tawaf perpisahan yang berstatus wajib haji menurut mazhab Syafi\'i. Wanita haid atau nifas dimaafkan.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 98, Bahagian 1 Soalan 2'
  },
  // 7. FIQH II: MUAMALAT - Bahagian 2 (2018)
  {
    id: 'fiqh2_muamalat_2018_b2_q1',
    subjectId: 'fiqh2_muamalat',
    topicJawi: 'فمبيرين (Hibah), صدقة & وصية',
    topicRumi: 'Hibah, Sedekah & Wasiat',
    subtopic: 'Wasiat Harta',
    bahagian: 2,
    tahun: 2018,
    markah: 3,
    soalanJawi: 'وصية اياله ڤسانن منريناكن هرت سلفس منيڠݢل دنيا.',
    soalanRumi: 'Wasiat ialah pesanan menyerahkan harta selepas meninggal dunia.',
    subQuestions: [
      {
        numeral: 'i',
        textJawi: 'براڤاكه قدر قدر هرت يڠ دبنركن اونتوق دوصيتكن؟',
        textRumi: 'Berapakah kadar had harta yang dibenarkan untuk diwasiatkan?',
        markah: 1,
        skemaJawapanJawi: 'تيدق ملبيهي ساتو ڤرتيݢ (1/3) درڤد جومله هرت ڤوساك.',
        skemaJawapanRumi: 'Tidak melebihi satu pertiga (1/3) daripada jumlah harta pusaka.',
        rubrik: ['Menyebut 1/3 (satu pertiga) harta']
      },
      {
        numeral: 'ii',
        textJawi: 'سياڤاكه يڠ تيدق بوليه منريما وصية سالين درڤد اءيذين اهلي واريث؟',
        textRumi: 'Siapakah yang tidak boleh menerima wasiat selain daripada izin ahli waris?',
        markah: 2,
        skemaJawapanJawi: 'اهلي واريث تيدق بوليه منريما وصية كران رسول الله ﷺ برسبدا: "لاَ وَصِيَّةَ لِوَارِثٍ" (تياد وصية اونتوق اهلي واريث).',
        skemaJawapanRumi: 'Ahli waris yang berhak menerima pusaka (berdasarkan hadis: Tiada wasiat bagi waris kecuali dipersetujui waris lain).',
        rubrik: ['Menyebut ahli waris / waris faraid', 'Menyatakan alasan larangan / hadis']
      }
    ],
    skemaJawapanJawi: 'قدر وصية: 1/3 هرت برسيق. ڤنريما: اورڠ بوكن واريث، كران اهلي واريث سوداه ممڤوڽاءي بهاݢين فرائض.',
    skemaJawapanRumi: 'Kadar wasiat: Maksimum 1/3 harta pusaka. Penerima: Bukan ahli waris (kecuali diredhai oleh seluruh waris).',
    huraianRujukan: 'Wasiat disyariatkan bertujuan memberi peluang berbuat kebajikan, tetapi syarak menghadkan 1/3 bagi memelihara hak waris terdekat.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 124, Bahagian 2 Soalan 1',
    rubrikKriteria: [
      'Menyatakan had 1/3 harta secara tepat',
      'Menjelaskan ahli waris tidak boleh menerima wasiat tanpa keizinan waris lain'
    ]
  },
  // 8. FIQH III: JENAYAT - Bahagian 1 (2022)
  {
    id: 'fiqh3_jenayat_2022_b1_q1',
    subjectId: 'fiqh3_jenayat',
    topicJawi: 'قصاص, دية دان حدود',
    topicRumi: 'Qisas, Diyat & Hudud',
    subtopic: 'Kesalahan Qazaf',
    bahagian: 1,
    tahun: 2022,
    markah: 1,
    soalanJawi: 'منودوه وانيتا يڠ باءيق ملاكوكن زنا تنڤا امڤت اورڠ سقسي دعوكوم دباوه ساله ساتو كساكتن ________.',
    soalanRumi: 'Menuduh wanita yang baik melakukan zina tanpa empat orang saksi dihukum di bawah salah satu kesalahan ________.',
    options: [
      { key: 'ا', textJawi: 'زنا', textRumi: 'Zina' },
      { key: 'ب', textJawi: 'قذف', textRumi: 'Qazaf' },
      { key: 'ج', textJawi: 'سرقة', textRumi: 'Sariqah (Mencuri)' },
      { key: 'د', textJawi: 'بغاة', textRumi: 'Bughat (Penderhaka)' }
    ],
    jawapanBetulKey: 'ب',
    skemaJawapanJawi: '(ب) قذف - دان حكومنڽ اياله سبات 80 كالي سرتا تيدق دتريما كستكسينڽ.',
    skemaJawapanRumi: '(b) Qazaf - Hukuman sebat 80 kali dan gugur kelayakan saksi.',
    huraianRujukan: 'Qazaf ialah membuat tuduhan palsu berzina kepada orang Islam yang muhsan/suci maruah. Dalil: Surah An-Nur ayat 4.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 149, Bahagian 1 Soalan 5'
  },
  // 9. FIQH III: MUNAKAHAT - Bahagian 2 (2020)
  {
    id: 'fiqh3_munakahat_2020_b2_q1',
    subjectId: 'fiqh3_munakahat',
    topicJawi: 'طلاق, خلع, فسخ, عدة دان رجوع',
    topicRumi: 'Talaq, Khulu\', Fasakh, \'Iddah & Ruju\'',
    subtopic: '\'Iddah Perempuan Hamil & Kematian Suami',
    bahagian: 2,
    tahun: 2020,
    markah: 4,
    soalanJawi: 'عدة اياله تيمڤوه باݢي وانيتا يڠ برچراي اتاو كماتين سوامي منوڠݢو درڤد بركهوين لاݢي.',
    soalanRumi: '\'Iddah ialah tempoh bagi wanita yang bercerai atau kematian suami menunggu daripada berkahwin lagi.',
    subQuestions: [
      {
        numeral: 'i',
        textJawi: 'براڤاكه تيمڤوه عدة باݢي ڤرمڤوان يڠ كماتين سوامي سكيراڽ تيدق حاميل؟',
        textRumi: 'Berapakah tempoh \'iddah bagi perempuan yang kematian suami sekiranya tidak hamil?',
        markah: 1,
        skemaJawapanJawi: 'امڤت بولن سڤولوه هاري (4 بولن 10 هاري).',
        skemaJawapanRumi: 'Empat bulan sepuluh hari (4 bulan 10 hari).',
        rubrik: ['Menyebut 4 bulan 10 hari dengan tepat']
      },
      {
        numeral: 'ii',
        textJawi: 'براڤاكه تيمڤوه عدة باݢي ڤرمڤوان يڠ حاميل؟',
        textRumi: 'Berapakah tempoh \'iddah bagi perempuan yang hamil sama ada bercerai atau kematian suami?',
        markah: 1,
        skemaJawapanJawi: 'سهيڠݢ ديريڽ ملاهيركن انق (كاندوڠنڽ).',
        skemaJawapanRumi: 'Sehingga melahirkan kandungannya (anak).',
        rubrik: ['Menyebut sehingga melahirkan anak / bersalin']
      },
      {
        numeral: 'iii',
        textJawi: 'ڽاتاكن دوا حكمه دشرعكن عدة دالم اسلام.',
        textRumi: 'Nyatakan dua hikmah disyariatkan \'iddah dalam Islam.',
        markah: 2,
        skemaJawapanJawi: '1. ممستيكن كبرسيهن رحيم درڤد بينيه بكاس سوامي. 2. ممبري ڤلواڠ باݢي سوامي استري برفيکير اونتوق برجوع سمولا (باݢي طلاق رجعي).',
        skemaJawapanRumi: '1. Memastikan rahim bersih daripada benih bekas suami. 2. Memberi peluang suami isteri berdamai dan merujuk semula.',
        rubrik: ['Menyebut kebersihan rahim / nasab keturunan', 'Menyebut peluang ruju\' atau tanda berkabung / ihdad']
      }
    ],
    skemaJawapanJawi: 'عدة كماتين سوامي: 4 بولن 10 هاري. عدة وانيتا حاميل: سهيڠݢ ملاهيركن انق. حكمه: ممتستيکن نسب قريبه دان ممبريكن تيمڤوه برفيکير سمولا.',
    skemaJawapanRumi: '\'Iddah kematian suami: 4 bulan 10 hari. \'Iddah wanita hamil: Sehingga bersalin. Hikmah: Menjaga nasab dan memberi ruang perdamaian.',
    huraianRujukan: 'Firman Allah Taala: (وَالَّذِينَ يُتَوَفَّوْنَ مِنكُمْ وَيَذَرُونَ أَزْوَاجًا يَتَرَبَّصْنَ بِأَنفُسِهِنَّ أَرْبَعَةَ أَشْهُرٍ وَعَشْرًا). Surah Al-Baqarah ayat 234.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 168, Bahagian 2 Soalan 4',
    rubrikKriteria: [
      'Menyatakan 4 bulan 10 hari untuk kematian suami tidak hamil',
      'Menyatakan sehingga bersalin bagi wanita hamil',
      'Menyatakan 2 hikmah pensyariatan \'iddah (kesucian rahim, peluang ruju\')'
    ]
  },
  // 10. SEJARAH ISLAM - Bahagian 1 (2021)
  {
    id: 'sejarah_2021_b1_q1',
    subjectId: 'sejarah_islam',
    topicJawi: 'هجرة رسول الله دان ڤراڠن درسم اسلام',
    topicRumi: 'Hijrah & Peperangan Islam',
    subtopic: 'Masjid Pertama Dibina',
    bahagian: 1,
    tahun: 2021,
    markah: 1,
    soalanJawi: 'مسجد يڠ ڤرتام دبينا اوليه رسول الله ﷺ دالم ڤريستيوا هجرة كمدينة المنورة اياله ________.',
    soalanRumi: 'Masjid yang pertama dibina oleh Rasulullah SAW dalam peristiwa hijrah ke Madinah Munawwarah ialah ________.',
    options: [
      { key: 'ا', textJawi: 'مسجد قباء', textRumi: 'Masjid Quba\'' },
      { key: 'ب', textJawi: 'مسجد النبوي', textRumi: 'Masjid Nabawi' },
      { key: 'ج', textJawi: 'مسجد القبلتين', textRumi: 'Masjid Qiblatain' },
      { key: 'د', textJawi: 'مسجد الحرام', textRumi: 'Masjidil Haram' }
    ],
    jawapanBetulKey: 'ا',
    skemaJawapanJawi: '(ا) مسجد قباء - دبينا سماس بݢيندا صلي الله عليه وسلم سمڤاي دڤراين قباء سبلوم ماسوق كڤوست كوتا مدينة.',
    skemaJawapanRumi: '(a) Masjid Quba\' - Dibina semasa Nabi SAW singgah di Quba\'.',
    huraianRujukan: 'Rasulullah SAW singgah selama beberapa hari di perkampungan Quba\' dan membina masjid atas dasar taqwa (Surah At-Taubah ayat 108).',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 182, Bahagian 1 Soalan 1'
  },
  // 11. AKHLAK - Bahagian 2 (2023)
  {
    id: 'akhlak_2023_b2_q1',
    subjectId: 'akhlak',
    topicJawi: 'توكل, رضا دان اءيڠتكن ماتي',
    topicRumi: 'Tawakkal, Redha & Ingat Mati',
    subtopic: 'Tingkatan Tawakkal',
    bahagian: 2,
    tahun: 2023,
    markah: 4,
    soalanJawi: 'هورايكن مقصود مرتبة توكل يڠ کتيݢ ياءيت برسره کڤد الله سبحانه وتعالى ...',
    soalanRumi: 'Huraikan maksud martabat tawakkal yang ketiga iaitu berserah kepada Allah Subhanahu wa Ta\'ala...',
    subQuestions: [
      {
        numeral: 'i',
        textJawi: 'ڽاتاكن ڤرومڤاماءن يڠ دبريكن اوليه امام الغزالي باݢي مرتبة توكل كتيݢ.',
        textRumi: 'Nyatakan perumpamaan yang diberikan oleh Imam Al-Ghazali bagi martabat tawakkal ketiga.',
        markah: 2,
        skemaJawapanJawi: 'سڤرتي كادأن سأورڠ ميت دتڠن اورڠ يڠ ممنديكنڽ، يڠ منا ديريڽ تيدق برݢرق دان منيرهكن بركوتكڽ سمواڽ كڤد اورڠ يڠ ممنديكن.',
        skemaJawapanRumi: 'Seperti keadaan mayat di tangan orang yang memandikannya, di mana tiada daya upaya dan menyerah sepenuhnya.',
        rubrik: ['Menyebut perumpamaan mayat di tangan orang memandikannya', 'Menyebut tiada daya pergerakan / penyerahan total']
      },
      {
        numeral: 'ii',
        textJawi: 'اداكه برسره بوست كڤد الله منداهولوكن اوسها اتاو منيڠݢلكن اوسها؟ جلسكن.',
        textRumi: 'Adakah berserah bulat kepada Allah mendahulukan usaha atau meninggalkan usaha? Jelaskan.',
        markah: 2,
        skemaJawapanJawi: 'برتوكل مستيله دمولاكن دڠن برأوسها دان براختيار، كران رسول الله ﷺ مپوره صحابة مڠيكت اونتاڽ تلبيه دهولو سبلوم برتوكل.',
        skemaJawapanRumi: 'Bertawakkal mestilah didahului dengan usaha dan ikhtiar. Rasulullah SAW menyuruh sahabat menambat unta dahulu kemudian bertawakkal.',
        rubrik: ['Menjelaskan usaha/ikhtiar wajib mendahului tawakkal', 'Menyebut dalil/kisah menambat unta']
      }
    ],
    skemaJawapanJawi: 'اورڠ يڠ برتوكل ايت مپرهكن ديرين دان هاتيڽ كڤد الله سڤرت كأداءن ميت دمنديكن. توكل سچارا بينر تيدق منيڠݢلكن سبب دان اوسها دالم كهيدوڤن.',
    skemaJawapanRumi: 'Orang yang bertawakkal menyerah hatinya kepada Allah seperti mayat dimandikan. Tawakkal yang sebenar sentiasa berserta ikhtiar.',
    huraianRujukan: 'Kitab Ihya\' Ulumiddin karya Hujjatul Islam Imam Al-Ghazali membahagikan tawakkal kepada tiga darjat.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 191, Bahagian 2 Soalan 2',
    rubrikKriteria: [
      'Menyebut perumpamaan mayat dimandikan',
      'Menyebut tiada daya upaya diri sendiri',
      'Menjelaskan ikhtiar/usaha mendahului tawakkal'
    ]
  },
  // 12. TAJWID TEORI - Bahagian 1 (2019)
  {
    id: 'tajwid_2019_b1_q1',
    subjectId: 'tajwid_teori',
    topicJawi: 'لام التعريف دان حكم راء',
    topicRumi: 'Lam Ta\'rif & Hukum Ra\'',
    subtopic: 'Hukum Ra\' Tarqiq',
    bahagian: 1,
    tahun: 2019,
    markah: 1,
    soalanJawi: 'حكوم باچاءن راء (ر) ڤد ڤوتوڠن اية (فِي الْأَمْرِ) كتيك وصل اياله ________.',
    soalanRumi: 'Hukum bacaan Ra\' (ر) pada potongan ayat (فِي الْأَمْرِ) ketika wasal ialah ________.',
    options: [
      { key: 'ا', textJawi: 'تفخيم (تبل)', textRumi: 'Tafkhim (Tebal)' },
      { key: 'ب', textJawi: 'ترقيق (نيڤيس)', textRumi: 'Tarqiq (Nipis)' },
      { key: 'ج', textJawi: 'جواز الوجهين', textRumi: 'Jawaz Al-Wajhain' },
      { key: 'د', textJawi: 'اشمام', textRumi: 'Isymam' }
    ],
    jawapanBetulKey: 'ب',
    skemaJawapanJawi: '(ب) ترقيق (نيڤيس) - كران حرف راء برباريس دباوه (كسرة) سچارا اصلي كتيك وصل.',
    skemaJawapanRumi: '(b) Tarqiq (Nipis) - Kerana huruf Ra\' berbaris bawah (kasrah) asli.',
    huraianRujukan: 'Setiap huruf Ra\' yang berbaris kasrah atau disukunkan dengan huruf sebelumnya berbaris kasrah asli dibaca tarqiq.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 243, Bahagian 1 Soalan 3',
    audioSample: {
      title: 'Hukum Ra\' Tarqiq vs Tafkhim',
      type: 'tafkhim_tarqiq',
      description: 'Perbezaan bunyi sebutan Ra\' nipis (Tarqiq) pada فِي الْأَمْرِ berbanding tebal (Tafkhim).'
    }
  },
  // 13. TAJWID TEORI - Bahagian 2 (2021)
  {
    id: 'tajwid_2021_b2_q1',
    subjectId: 'tajwid_teori',
    topicJawi: 'مد فرعي, سكتة دان وقف & ابتداء',
    topicRumi: 'Mad Far\'i, Saktah & Waqaf',
    subtopic: 'Pengertian & Tempat Saktah',
    bahagian: 2,
    tahun: 2021,
    markah: 4,
    soalanJawi: 'سكتة اياله ساله ساتو قاعده باچاءن يڠ ترداڤت دالم رواية حفص عن عاصم.',
    soalanRumi: 'Saktah ialah salah satu kaedah bacaan yang terdapat dalam Riwayat Hafs \'an \'Asim.',
    subQuestions: [
      {
        numeral: 'i',
        textJawi: 'بريكن ڤڠرتين سكتة ڤد اصطلاح تجويد.',
        textRumi: 'Berikan pengertian Saktah pada istilah tajwid.',
        markah: 2,
        skemaJawapanJawi: 'مموتوسكن سوارا سقدر دوا حركة تنڤا برنفس، كمودين مپامبوڠ سمولا باچاءن دڠن نفس يڠ سام.',
        skemaJawapanRumi: 'Memutuskan suara sekadar dua harakat tanpa bernafas, kemudian menyambung semula bacaan dengan nafas yang sama.',
        rubrik: ['Memutuskan suara sekadar 2 harakat', 'Menyatakan tanpa menarik nafas baharu', 'Menyambung dengan nafas yang sama']
      },
      {
        numeral: 'ii',
        textJawi: 'ڽاتاكن دوا تمڤت سكتة واجبه دالم القرءان رواية حفص.',
        textRumi: 'Nyatakan dua tempat Saktah wajib dalam al-Quran riwayat Hafs.',
        markah: 2,
        skemaJawapanJawi: '1. سورة الكهف اية 1-2: (عِوَجًا ۜ قَيِّمًا). 2. سورة يس اية 52: (مِّن مَّرْقَدِنَا ۜ هَٰذَا). 3. سورة القيامة: (وَقِيلَ مَنْ ۜ رَاقٍ). 4. سورة المطففين: (كَلَّا بَلْ ۜ رَانَ).',
        skemaJawapanRumi: '1. Surah Al-Kahf (عِوَجًا ۜ قَيِّمًا). 2. Surah Yasin (مِّن مَّرْقَدِنَا ۜ هَٰذَا). (atau Surah Al-Qiyamah / Al-Muthaffifin).',
        rubrik: ['Menyebut 2 tempat saktah wajib dengan ayat atau surah yang tepat']
      }
    ],
    skemaJawapanJawi: 'ڤڠرتين: منرهنتيكن سوارا 2 حركة تنڤا برنفس سرتا منروسكن باچاءن دڠن نفس سام. تمڤت٢: الكهف (عوجا قيما)، يس (مرقدنا هذا)، القيامة (من راق)، المطففين (بل ران).',
    skemaJawapanRumi: 'Pengertian: Berhenti sejenak 2 harakat tanpa bernafas. Tempat: Surah Al-Kahfi, Surah Yasin, Surah Al-Qiyamah, Surah Al-Muthaffifin.',
    huraianRujukan: 'Kitab Matan Jazariyyah & Tuhfatul Athfal menerangkan empat tempat saktah wajib mengikut Toriq Asy-Syatibiyyah.',
    pdfPageCitation: 'Himpunan Soalan SSSRU, M/S 252, Bahagian 2 Soalan 1',
    rubrikKriteria: [
      'Menyatakan pemberhentian 2 harakat tanpa nafas',
      'Menyebut menyambung bacaan dengan nafas yang sama',
      'Menyebut sekurang-kurangnya 2 tempat surah ber-saktah dengan tepat'
    ],
    audioSample: {
      title: 'Contoh Saktah: Surah Al-Kahf & Surah Yasin',
      type: 'saktah',
      description: 'Demonstrasi audio jeda senyap 2 harakat tanpa menarik nafas baharu.'
    }
  }
];

export const MOCK_STUDENT_PROFILE = {
  id: 'ahmad_p6_2026',
  name: 'Ahmad bin Hj. Razak',
  school: 'Sekolah Ugama Pengiran Anak Puteri Hajah Rashidah Sa\'adatul Bolkiah',
  grade: 'Darjah 6 (Tahun Akhir SSSRU)',
  targetExamYear: 2026,
  studyStreakDays: 14,
  overallSyllabusProgress: 74,
  questionsAnswered: 136,
  averageScorePercent: 82,
  weaknessAreas: [
    { topic: 'Hukum Ra\' Tarqiq & Tafkhim', subject: 'Tajwid Teori', errorRate: 38 },
    { topic: 'Tempoh \'Iddah Perempuan Hamil', subject: 'Fiqh III: Munakahat', errorRate: 32 },
    { topic: 'Ciri-Ciri Ajaran Qadiani', subject: 'Tauhid', errorRate: 27 }
  ],
  masteryBySubject: {
    tauhid: 86,
    fiqh1_solah: 92,
    fiqh1_zakat: 80,
    fiqh2_haji: 75,
    fiqh2_muamalat: 70,
    fiqh3_jenayat: 78,
    fiqh3_munakahat: 68,
    sejarah_islam: 88,
    akhlak: 90,
    tajwid_teori: 65
  }
};
