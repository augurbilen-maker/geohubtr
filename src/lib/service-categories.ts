/**
 * GeoHub TR — Hizmet & Kurum Kategorileri Tam Taksonomisi
 *
 * Ana kategoriler Prisma enum ile eşleşir.
 * Alt kategoriler string olarak Listing.dynamicAttributes ve
 * ServiceRequest.details JSONB alanlarında saklanır.
 *
 * Yeni ana kategori eklemek için:
 *   1. Buraya ekle
 *   2. prisma/schema.prisma ServiceCategory enum'una ekle
 *   3. `npx prisma migrate dev` çalıştır
 */

export interface AltKategori {
  slug: string
  ad: string
  aciklama?: string
}

export interface HizmetKategorisi {
  /** Prisma enum değeriyle birebir eşleşmeli */
  enum: string
  slug: string
  ad: string
  aciklama: string
  icon: string
  /** Tailwind renk sınıfları */
  renk: string
  bg: string
  /** Kategori grubu — arayüz filtrelemesi için */
  grup: "klasik" | "3d" | "gis" | "ticari" | "ekipman" | "egitim"
  anahtarKelimeler: string[]
  altKategoriler: AltKategori[]
}

export const HIZMET_KATEGORİLERİ: HizmetKategorisi[] = [

  // ═══════════════════════════════════════════════════════════
  // GRUP: KLASİK JEODEZİ & KADASTRO
  // ═══════════════════════════════════════════════════════════

  {
    enum: "ROLOVE",
    slug: "rolove",
    ad: "Rölöve",
    aciklama: "Mevcut yapı ve alanların ölçülerek çizime aktarılması",
    icon: "📐",
    renk: "text-blue-700",
    bg: "bg-blue-50",
    grup: "klasik",
    anahtarKelimeler: ["rölöve", "mimari rölöve", "yapı ölçüm", "mevcut durum planı"],
    altKategoriler: [
      { slug: "mimari-rolove",    ad: "Mimari Rölöve",              aciklama: "Bina cephe, plan ve kesit çizimleri" },
      { slug: "yapisal-rolove",   ad: "Yapısal / Betonarme Rölöve", aciklama: "Kolon, kiriş, döşeme tespiti" },
      { slug: "mekanik-rolove",   ad: "Mekanik-Elektrik Tesisat",   aciklama: "Boru, kanal, pano tespiti" },
      { slug: "as-built",         ad: "As-Built (Yapıldığı Gibi)",  aciklama: "İnşaat sonrası kesin proje" },
      { slug: "zemin-rolove",     ad: "Zemin Kat Planı Rölöve",     aciklama: "Kat planı ve krokileri" },
    ],
  },

  {
    enum: "ESKI_ESER",
    slug: "eski-eser",
    ad: "Eski Eser Rölövesi",
    aciklama: "Tarihi yapı ve arkeolojik alanlarda uzman belgeleme",
    icon: "🏛️",
    renk: "text-purple-700",
    bg: "bg-purple-50",
    grup: "klasik",
    anahtarKelimeler: ["eski eser", "tarihi yapı", "restorasyon", "restitüsyon", "anıt"],
    altKategoriler: [
      { slug: "cami-tarihi",       ad: "Cami & Dini Yapı Rölövesi",  aciklama: "Osmanlı ve öncesi yapılar" },
      { slug: "arkeolojik",        ad: "Arkeolojik Alan Belgeleme",  aciklama: "Kazı alanı dokümantasyonu" },
      { slug: "restitusyon",       ad: "Restitüsyon Projesi",        aciklama: "Özgün hali araştırma ve çizim" },
      { slug: "restorasyon-prj",   ad: "Restorasyon Projesi",        aciklama: "Koruma amaçlı proje çizimi" },
      { slug: "fotogrametrik-bel", ad: "Fotogrametrik Belgeleme",    aciklama: "Fotoğraftan 3D model/çizim" },
    ],
  },

  {
    enum: "HALIHAZIR_HARITA",
    slug: "halihazir-harita",
    ad: "Halihazır Harita",
    aciklama: "Arazinin güncel durumunu gösteren büyük ölçekli harita üretimi",
    icon: "🗺️",
    renk: "text-teal-700",
    bg: "bg-teal-50",
    grup: "klasik",
    anahtarKelimeler: ["halihazır harita", "topoğrafik harita", "imar planı altlığı"],
    altKategoriler: [
      { slug: "1-500",           ad: "1/500 Ölçek",             aciklama: "Yerleşim alanı detay harita" },
      { slug: "1-1000",          ad: "1/1000 Ölçek",            aciklama: "İmar planı altlığı standard ölçek" },
      { slug: "1-5000",          ad: "1/5000 Ölçek",            aciklama: "Nazım imar planı altlığı" },
      { slug: "1-25000",         ad: "1/25000 ve üzeri",        aciklama: "Bölgesel planlama altlığı" },
      { slug: "kentsel-tasarim", ad: "Kentsel Tasarım Altlığı", aciklama: "Kentsel dönüşüm projeleri için" },
    ],
  },

  {
    enum: "APLIKASYON",
    slug: "aplikasyon",
    ad: "Aplikasyon & İfraz",
    aciklama: "Parsel sınırlarının araziye aktarılması, kadastral işlemler",
    icon: "📏",
    renk: "text-orange-700",
    bg: "bg-orange-50",
    grup: "klasik",
    anahtarKelimeler: ["aplikasyon", "ifraz", "tevhit", "kadastro", "parsel", "yola terk", "ruhsat"],
    altKategoriler: [
      { slug: "parsel-aplikasyon",   ad: "Parsel Aplikasyonu",     aciklama: "Tapu sınırlarının araziye uygulanması" },
      { slug: "insaat-aplikasyon",   ad: "İnşaat Aplikasyonu",     aciklama: "Bina köşe noktası yerleşimi" },
      { slug: "ifraz",               ad: "İfraz (Parsel Bölme)",   aciklama: "Tek parselin ikiye ya da fazlaya bölünmesi" },
      { slug: "tevhit",              ad: "Tevhit (Birleştirme)",   aciklama: "Komşu parsellerin birleştirilmesi" },
      { slug: "yola-terk",           ad: "Yola Terk & Bağış",      aciklama: "Belediyeye terk ve bağış işlemleri" },
      { slug: "altyapi-aplikasyon",  ad: "Altyapı Aplikasyonu",    aciklama: "Boru hattı, kanal aks tayini" },
    ],
  },

  {
    enum: "LIHKAB",
    slug: "lihkab",
    ad: "LİHKAB",
    aciklama: "Lisanslı Harita ve Kadastro Mühendisleri Büroları — resmi kadastral işlemler",
    icon: "🏢",
    renk: "text-rose-700",
    bg: "bg-rose-50",
    grup: "klasik",
    anahtarKelimeler: ["lihkab", "lisanslı harita kadastro", "tapu", "kadastro müdürlüğü", "tkgm"],
    altKategoriler: [
      { slug: "tapu-tescil",      ad: "Tapu Tescil İşlemleri",     aciklama: "Kadastro müdürlüğüne sunulacak tescil evrakı" },
      { slug: "kadastral-calisma",ad: "Kadastral Çalışma",         aciklama: "TKGM onaylı kadastro güncelleme" },
      { slug: "cins-degisikligi", ad: "Cins Değişikliği",          aciklama: "Arsa/arazi/bina cins tashihi" },
      { slug: "irtifak-hakki",    ad: "İrtifak Hakkı Tesisi",      aciklama: "Geçit, su alma, üst hakkı vb." },
      { slug: "tashih",           ad: "Kadastro Tashihi",          aciklama: "Hatalı parsel sınırı düzeltme" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GRUP: 3D TEKNOLOJİ
  // ═══════════════════════════════════════════════════════════

  {
    enum: "LAZER_TARAMA",
    slug: "lazer-tarama",
    ad: "Lazer Tarama",
    aciklama: "3D nokta bulutu ile yüksek hassasiyetli mekânsal belgeleme",
    icon: "🔦",
    renk: "text-red-700",
    bg: "bg-red-50",
    grup: "3d",
    anahtarKelimeler: ["lazer tarama", "3d tarama", "nokta bulutu", "point cloud", "leica", "faro"],
    altKategoriler: [
      { slug: "mimari-tarama",      ad: "Mimari & Yapı Tarama",      aciklama: "Bina iç/dış lazer tarama" },
      { slug: "endustriyel",        ad: "Endüstriyel Tesis",         aciklama: "Fabrika, rafineri, santral" },
      { slug: "tunel-yol",          ad: "Tünel & Yol Tarama",        aciklama: "Tünel deformasyon, yol profili" },
      { slug: "kopru-altyapi",      ad: "Köprü & Altyapı",          aciklama: "Köprü, viyadük, baraj" },
      { slug: "magara-doga",        ad: "Mağara & Doğal Alan",       aciklama: "Karst, mağara ve jeolojik oluşumlar" },
      { slug: "arkeolojik-tarama",  ad: "Arkeolojik Kazı Tarama",   aciklama: "Kazı alanı periyodik nokta bulutu" },
    ],
  },

  {
    enum: "BIM_MODELLEME",
    slug: "bim-modelleme",
    ad: "BIM Modelleme",
    aciklama: "Bina Bilgi Modellemesi — Revit, IFC, dijital ikiz",
    icon: "🏗️",
    renk: "text-indigo-700",
    bg: "bg-indigo-50",
    grup: "3d",
    anahtarKelimeler: ["bim", "revit", "ifc", "dijital ikiz", "navisworks", "lod"],
    altKategoriler: [
      { slug: "mimari-bim",      ad: "Mimari BIM (LOD 200–300)",  aciklama: "Tasarım aşaması modelleme" },
      { slug: "yapisal-bim",     ad: "Yapısal BIM",               aciklama: "Statik sistem modelleme" },
      { slug: "mep-bim",         ad: "MEP Modelleme",             aciklama: "Mekanik, elektrik, tesisat" },
      { slug: "as-built-bim",    ad: "As-Built BIM (LOD 400)",    aciklama: "Teslim sonrası kesin model" },
      { slug: "dijital-ikiz",    ad: "Dijital İkiz",              aciklama: "IoT entegrasyon, gerçek zamanlı model" },
      { slug: "clash-detection", ad: "Clash Detection",           aciklama: "Çakışma analizi ve raporlama" },
    ],
  },

  {
    enum: "FOTOGRAMETRI",
    slug: "fotogrametri",
    ad: "Fotogrametri",
    aciklama: "Fotoğraflardan 3D model, ortofoto ve ölçüm üretimi",
    icon: "📸",
    renk: "text-pink-700",
    bg: "bg-pink-50",
    grup: "3d",
    anahtarKelimeler: ["fotogrametri", "sfm", "3d model", "agisoft", "pix4d"],
    altKategoriler: [
      { slug: "hava-fotogrametri",   ad: "Hava Fotogrametrisi",   aciklama: "Uçak ya da drone ile büyük alan" },
      { slug: "yersel-fotogrametri", ad: "Yersel Fotogrametri",   aciklama: "Zemin kamerası ile detay ölçüm" },
      { slug: "yapi-belgeleme",      ad: "Yapı Belgeleme",        aciklama: "Bina cephesi fotogrametri" },
      { slug: "kaya-yuzu",           ad: "Kaya Yüzü Analizi",     aciklama: "Süreksizlik ölçümü, şev stabilitesi" },
      { slug: "mimari-3d",           ad: "Mimari 3D Modelleme",   aciklama: "Gerçekçi doku haritalı 3D model" },
    ],
  },

  {
    enum: "DRONE_HARITALAMA",
    slug: "drone-haritalama",
    ad: "Drone / İHA Haritalama",
    aciklama: "İnsansız hava aracıyla hassas harita, fotoğraf ve veri üretimi",
    icon: "🚁",
    renk: "text-sky-700",
    bg: "bg-sky-50",
    grup: "3d",
    anahtarKelimeler: ["drone", "iha", "ortofoto", "dsm", "dem", "dji"],
    altKategoriler: [
      { slug: "ortofoto-dsm",   ad: "Ortofoto & DSM Üretimi",  aciklama: "Yüksek çözünürlüklü hava fotoğrafı" },
      { slug: "kubaj-hacim",    ad: "Hacim & Kübaj Hesabı",    aciklama: "Hafriyat, depo, maden stoğu" },
      { slug: "tarim-iha",      ad: "Tarım & Bağ/Bahçe İHA",  aciklama: "NDVI, ilaçlama, alan analizi" },
      { slug: "termal-iha",     ad: "Termal İHA Çekimi",       aciklama: "Isı köprüsü, güneş paneli, yangın" },
      { slug: "insaat-takip",   ad: "İnşaat İlerleme Takibi",  aciklama: "Periyodik drone ile ilerleme raporu" },
      { slug: "enerji-hat",     ad: "Enerji Hattı & Altyapı",  aciklama: "Elektrik hattı, boru hattı inceleme" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GRUP: CBS / GIS
  // ═══════════════════════════════════════════════════════════

  {
    enum: "CBS_GIS",
    slug: "cbs-gis",
    ad: "CBS / GIS Hizmetleri",
    aciklama: "Coğrafi Bilgi Sistemleri — veri üretimi, analiz ve WebGIS",
    icon: "🌐",
    renk: "text-cyan-700",
    bg: "bg-cyan-50",
    grup: "gis",
    anahtarKelimeler: ["cbs", "gis", "arcgis", "qgis", "webgis", "kent bilgi sistemi"],
    altKategoriler: [
      { slug: "sayisal-harita",     ad: "Sayısal Harita Üretimi",      aciklama: "Vektör ve raster harita üretimi" },
      { slug: "mekansal-vt",        ad: "Mekânsal Veri Tabanı",        aciklama: "PostGIS, Oracle Spatial" },
      { slug: "webgis",             ad: "WebGIS Uygulama Geliştirme",  aciklama: "Web tabanlı harita platformu" },
      { slug: "yonetim-haritasi",   ad: "Yönetim Haritası (Kent/OSB)", aciklama: "Belediye, OSB, organize sanayi" },
      { slug: "uzaktan-algilama",   ad: "Uzaktan Algılama Analizi",    aciklama: "Uydu görüntüsü işleme" },
      { slug: "cbs-danismanlik",    ad: "CBS Danışmanlık & Eğitim",    aciklama: "Sistem kurulum ve eğitim" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GRUP: TİCARİ / DEĞERLEME
  // ═══════════════════════════════════════════════════════════

  {
    enum: "GAYRIMENKUL_DEGERLEME",
    slug: "gayrimenkul-degerleme",
    ad: "Gayrimenkul Değerleme",
    aciklama: "SPK lisanslı ekspertiz, banka değerleme ve kira tespiti",
    icon: "🏠",
    renk: "text-emerald-700",
    bg: "bg-emerald-50",
    grup: "ticari",
    anahtarKelimeler: ["gayrimenkul değerleme", "ekspertiz", "spk", "banka değerleme", "kira tespiti", "taşınmaz"],
    altKategoriler: [
      { slug: "spk-degerleme",      ad: "SPK Lisanslı Değerleme",      aciklama: "Sermaye piyasası kurulu onaylı rapor" },
      { slug: "banka-ekspertiz",    ad: "Banka Ekspertizi",            aciklama: "Konut ve ticari krediler için" },
      { slug: "ticari-gayrimenkul", ad: "Ticari Gayrimenkul",          aciklama: "İş yeri, plaza, alışveriş merkezi" },
      { slug: "kira-tespit",        ad: "Kira Tespit & Güncelleme",    aciklama: "Rayiç kira değer tespiti" },
      { slug: "tasınmaz-hakedis",   ad: "Taşınmaz Hakediş & Kamulaştırma", aciklama: "Kamulaştırma bedel tespiti" },
      { slug: "arsa-arazi",         ad: "Arsa & Arazi Değerleme",      aciklama: "Ham arazi ve imar parseli" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GRUP: EKİPMAN
  // ═══════════════════════════════════════════════════════════

  {
    enum: "CIHAZ_SATIS",
    slug: "cihaz-satis",
    ad: "Cihaz Satış & Kiralama",
    aciklama: "Jeodezi ekipmanı kurumsal/bireysel satış, ikinci el ve kiralama",
    icon: "🔭",
    renk: "text-violet-700",
    bg: "bg-violet-50",
    grup: "ekipman",
    anahtarKelimeler: ["totalstation", "gnss", "gps", "lazer tarayıcı", "cihaz satış", "bayii", "distribütör", "ikinci el"],
    altKategoriler: [
      { slug: "kurumsal-satis",    ad: "Kurumsal Satış (Bayii/Distribütör)", aciklama: "Resmi bayii ve distribütörler — Leica, Trimble, Topcon, Sokkia vb." },
      { slug: "bireysel-satis",    ad: "Bireysel & İkinci El Satış",          aciklama: "Garantili ikinci el ve bireysel satış" },
      { slug: "kira-gunluk",       ad: "Kiralama (Günlük / Haftalık)",        aciklama: "Kısa süreli proje kiralamaları" },
      { slug: "servis-kalibrasyon",ad: "Servis & Kalibrasyon",                aciklama: "Yetkili servis, bakım, kalibrasyon belgesi" },
      { slug: "totalstation",      ad: "Totalstation",                        aciklama: "Mekanik ve robotik totalstation" },
      { slug: "gnss-gps",          ad: "GPS / GNSS Alıcısı",                  aciklama: "RTK, statik, ağ GNSS sistemleri" },
      { slug: "lazer-tarayici",    ad: "Lazer Tarayıcı",                      aciklama: "Faro, Leica, Riegl, Trimble" },
      { slug: "drone-satis",       ad: "Drone / İHA",                         aciklama: "DJI, senseFly ve harita drone'ları" },
      { slug: "yazilim-lisans",    ad: "Yazılım & Lisans",                    aciklama: "AutoCAD, Revit, Agisoft, Cyclone vb." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GRUP: EĞİTİM KURUMLARI
  // ═══════════════════════════════════════════════════════════

  {
    enum: "EGITIM_KURUMU",
    slug: "egitim-kurumu",
    ad: "Eğitim Kurumları",
    aciklama: "Harita, geomatik ve kadastro alanında eğitim veren üniversite, MYO ve liseler",
    icon: "🎓",
    renk: "text-amber-700",
    bg: "bg-amber-50",
    grup: "egitim",
    anahtarKelimeler: ["üniversite", "geomatik mühendisliği", "harita mühendisliği", "myo", "kadastro önlisans", "harita lisesi"],
    altKategoriler: [
      {
        slug: "lisans-4-yil",
        ad: "Lisans (4 Yıl)",
        aciklama: "Harita Mühendisliği & Geomatik Mühendisliği bölümleri",
      },
      {
        slug: "onlisans-2-yil",
        ad: "Ön Lisans (2 Yıl — MYO)",
        aciklama: "Harita Kadastro, Tapu ve Kadastro, Coğrafi Bilgi Sistemleri programları",
      },
      {
        slug: "meslek-lisesi",
        ad: "Meslek Lisesi",
        aciklama: "Harita-Kadastro Teknik Programı olan mesleki ve teknik Anadolu liseleri",
      },
      {
        slug: "sertifika-kurs",
        ad: "Sertifika & Kurs",
        aciklama: "Özel AutoCAD, GNSS, BIM, CBS kurs merkezleri",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GRUP: SAHA & MÜHENDİSLİK
  // ═══════════════════════════════════════════════════════════

  {
    enum: "INSAAT_KONTROL",
    slug: "insaat-kontrol",
    ad: "İnşaat Kontrol & Metraj",
    aciklama: "Şantiye aplikasyonu, ilerleme kontrolü ve hafriyat metrajı",
    icon: "🏚️",
    renk: "text-stone-700",
    bg: "bg-stone-50",
    grup: "klasik",
    anahtarKelimeler: ["inşaat kontrol", "metraj", "hafriyat", "aplikasyon kontrol", "deformasyon"],
    altKategoriler: [
      { slug: "aplikasyon-kontrol", ad: "Aplikasyon Kontrol",      aciklama: "Bina köşe noktası kontrol ölçümü" },
      { slug: "kaba-imalat",        ad: "Kaba İmalat Kontrol",     aciklama: "Duvar, döşeme, kolon kot kontrolü" },
      { slug: "hafriyat-hacim",     ad: "Hafriyat Hacim Hesabı",   aciklama: "Kesim/dolgu hacim hesabı" },
      { slug: "altyapi-metraj",     ad: "Altyapı Metrajı",         aciklama: "Boru hattı, kanal metraj raporu" },
      { slug: "deformasyon",        ad: "Deformasyon Ölçümü",      aciklama: "Yapı oturma ve yatay deplasman" },
    ],
  },

  {
    enum: "MADEN_OCAK",
    slug: "maden-ocak",
    ad: "Maden & Ocak Ölçümü",
    aciklama: "Maden ocağı, taş ocağı ve tünel ölçüm hizmetleri",
    icon: "⛰️",
    renk: "text-gray-700",
    bg: "bg-gray-100",
    grup: "klasik",
    anahtarKelimeler: ["maden ölçümü", "ocak ölçümü", "tünel ölçümü", "rezerv hesabı"],
    altKategoriler: [
      { slug: "rezerv-hesabi",  ad: "Rezerv & Stok Hesabı",      aciklama: "Hacim ve kütlesel rezerv raporu" },
      { slug: "ocak-haritasi",  ad: "Ocak Haritası Güncelleme",  aciklama: "Periyodik ilerleme haritası" },
      { slug: "tunel-olcum",    ad: "Tünel Ölçüm & Profil",      aciklama: "Tünel galeri profil çekimi" },
      { slug: "cokme-izleme",   ad: "Çökme & Subsidence İzleme", aciklama: "Yüzey deformasyon takibi" },
    ],
  },
]

// ─── Grup tanımları ───────────────────────────────────────────────────────────

export const KATEGORİ_GRUPLARI = [
  { slug: "klasik",  ad: "Klasik Jeodezi & Kadastro", icon: "📐" },
  { slug: "3d",      ad: "3D Teknoloji",               icon: "🔦" },
  { slug: "gis",     ad: "CBS / GIS",                  icon: "🌐" },
  { slug: "ticari",  ad: "Ticari & Değerleme",         icon: "🏠" },
  { slug: "ekipman", ad: "Ekipman",                    icon: "🔭" },
  { slug: "egitim",  ad: "Eğitim Kurumları",           icon: "🎓" },
] as const

// ─── Yardımcı fonksiyonlar ────────────────────────────────────────────────────

export function getKategoriByEnum(enumDegeri: string) {
  return HIZMET_KATEGORİLERİ.find((k) => k.enum === enumDegeri)
}

export function getKategoriBySlug(slug: string) {
  return HIZMET_KATEGORİLERİ.find((k) => k.slug === slug)
}

export function getKategoriByGrup(grup: string) {
  return HIZMET_KATEGORİLERİ.filter((k) => k.grup === grup)
}

export function tumAltKategoriler() {
  return HIZMET_KATEGORİLERİ.flatMap((k) =>
    k.altKategoriler.map((alt) => ({
      ...alt,
      anaKategoriEnum: k.enum,
      anaKategoriAd: k.ad,
    }))
  )
}

export const KATEGORI_ISTATISTIK = {
  anaKategoriSayisi: HIZMET_KATEGORİLERİ.length,
  altKategoriSayisi: HIZMET_KATEGORİLERİ.reduce((acc, k) => acc + k.altKategoriler.length, 0),
}
