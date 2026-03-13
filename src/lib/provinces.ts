// GeoHub TR — Türkiye 81 İl
// Bölge grupları ve firma/ilan sayısı için kullanılır
// URL slug'ı: Türkçe karakterler → ASCII (url safe)

export interface Province {
  il: string          // "Eskişehir"
  slug: string        // "eskisehir"
  plaka: number       // 26
  bolge: BolgeKey     // "ic_anadolu"
}

export type BolgeKey =
  | "marmara"
  | "ege"
  | "akdeniz"
  | "ic_anadolu"
  | "karadeniz"
  | "dogu_anadolu"
  | "guneydogu_anadolu"

export const BOLGE_ADLARI: Record<BolgeKey, string> = {
  marmara:             "Marmara",
  ege:                 "Ege",
  akdeniz:             "Akdeniz",
  ic_anadolu:          "İç Anadolu",
  karadeniz:           "Karadeniz",
  dogu_anadolu:        "Doğu Anadolu",
  guneydogu_anadolu:   "Güneydoğu Anadolu",
}

export const BOLGE_RENK: Record<BolgeKey, { bg: string; text: string; dot: string }> = {
  marmara:           { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500" },
  ege:               { bg: "bg-cyan-50",    text: "text-cyan-700",    dot: "bg-cyan-500" },
  akdeniz:           { bg: "bg-orange-50",  text: "text-orange-700",  dot: "bg-orange-500" },
  ic_anadolu:        { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  karadeniz:         { bg: "bg-teal-50",    text: "text-teal-700",    dot: "bg-teal-500" },
  dogu_anadolu:      { bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-500" },
  guneydogu_anadolu: { bg: "bg-red-50",     text: "text-red-700",     dot: "bg-red-500" },
}

// Tüm 81 il — plaka numarasına göre sıralı
export const TÜM_İLLER: Province[] = [
  { il: "Adana",          slug: "adana",          plaka: 1,  bolge: "akdeniz" },
  { il: "Adıyaman",       slug: "adiyaman",        plaka: 2,  bolge: "guneydogu_anadolu" },
  { il: "Afyonkarahisar", slug: "afyonkarahisar",  plaka: 3,  bolge: "ege" },
  { il: "Ağrı",           slug: "agri",            plaka: 4,  bolge: "dogu_anadolu" },
  { il: "Amasya",         slug: "amasya",          plaka: 5,  bolge: "karadeniz" },
  { il: "Ankara",         slug: "ankara",          plaka: 6,  bolge: "ic_anadolu" },
  { il: "Antalya",        slug: "antalya",         plaka: 7,  bolge: "akdeniz" },
  { il: "Artvin",         slug: "artvin",          plaka: 8,  bolge: "karadeniz" },
  { il: "Aydın",          slug: "aydin",           plaka: 9,  bolge: "ege" },
  { il: "Balıkesir",      slug: "balikesir",       plaka: 10, bolge: "marmara" },
  { il: "Bilecik",        slug: "bilecik",         plaka: 11, bolge: "marmara" },
  { il: "Bingöl",         slug: "bingol",          plaka: 12, bolge: "dogu_anadolu" },
  { il: "Bitlis",         slug: "bitlis",          plaka: 13, bolge: "dogu_anadolu" },
  { il: "Bolu",           slug: "bolu",            plaka: 14, bolge: "karadeniz" },
  { il: "Burdur",         slug: "burdur",          plaka: 15, bolge: "akdeniz" },
  { il: "Bursa",          slug: "bursa",           plaka: 16, bolge: "marmara" },
  { il: "Çanakkale",      slug: "canakkale",       plaka: 17, bolge: "marmara" },
  { il: "Çankırı",        slug: "cankiri",         plaka: 18, bolge: "ic_anadolu" },
  { il: "Çorum",          slug: "corum",           plaka: 19, bolge: "karadeniz" },
  { il: "Denizli",        slug: "denizli",         plaka: 20, bolge: "ege" },
  { il: "Diyarbakır",     slug: "diyarbakir",      plaka: 21, bolge: "guneydogu_anadolu" },
  { il: "Edirne",         slug: "edirne",          plaka: 22, bolge: "marmara" },
  { il: "Elazığ",         slug: "elazig",          plaka: 23, bolge: "dogu_anadolu" },
  { il: "Erzincan",       slug: "erzincan",        plaka: 24, bolge: "dogu_anadolu" },
  { il: "Erzurum",        slug: "erzurum",         plaka: 25, bolge: "dogu_anadolu" },
  { il: "Eskişehir",      slug: "eskisehir",       plaka: 26, bolge: "ic_anadolu" },
  { il: "Gaziantep",      slug: "gaziantep",       plaka: 27, bolge: "guneydogu_anadolu" },
  { il: "Giresun",        slug: "giresun",         plaka: 28, bolge: "karadeniz" },
  { il: "Gümüşhane",      slug: "gumushane",       plaka: 29, bolge: "karadeniz" },
  { il: "Hakkari",        slug: "hakkari",         plaka: 30, bolge: "dogu_anadolu" },
  { il: "Hatay",          slug: "hatay",           plaka: 31, bolge: "akdeniz" },
  { il: "Isparta",        slug: "isparta",         plaka: 32, bolge: "akdeniz" },
  { il: "Mersin",         slug: "mersin",          plaka: 33, bolge: "akdeniz" },
  { il: "İstanbul",       slug: "istanbul",        plaka: 34, bolge: "marmara" },
  { il: "İzmir",          slug: "izmir",           plaka: 35, bolge: "ege" },
  { il: "Kars",           slug: "kars",            plaka: 36, bolge: "dogu_anadolu" },
  { il: "Kastamonu",      slug: "kastamonu",       plaka: 37, bolge: "karadeniz" },
  { il: "Kayseri",        slug: "kayseri",         plaka: 38, bolge: "ic_anadolu" },
  { il: "Kırklareli",     slug: "kirklareli",      plaka: 39, bolge: "marmara" },
  { il: "Kırşehir",       slug: "kirsehir",        plaka: 40, bolge: "ic_anadolu" },
  { il: "Kocaeli",        slug: "kocaeli",         plaka: 41, bolge: "marmara" },
  { il: "Konya",          slug: "konya",           plaka: 42, bolge: "ic_anadolu" },
  { il: "Kütahya",        slug: "kutahya",         plaka: 43, bolge: "ege" },
  { il: "Malatya",        slug: "malatya",         plaka: 44, bolge: "dogu_anadolu" },
  { il: "Manisa",         slug: "manisa",          plaka: 45, bolge: "ege" },
  { il: "Kahramanmaraş",  slug: "kahramanmaras",   plaka: 46, bolge: "akdeniz" },
  { il: "Mardin",         slug: "mardin",          plaka: 47, bolge: "guneydogu_anadolu" },
  { il: "Muğla",          slug: "mugla",           plaka: 48, bolge: "ege" },
  { il: "Muş",            slug: "mus",             plaka: 49, bolge: "dogu_anadolu" },
  { il: "Nevşehir",       slug: "nevsehir",        plaka: 50, bolge: "ic_anadolu" },
  { il: "Niğde",          slug: "nigde",           plaka: 51, bolge: "ic_anadolu" },
  { il: "Ordu",           slug: "ordu",            plaka: 52, bolge: "karadeniz" },
  { il: "Rize",           slug: "rize",            plaka: 53, bolge: "karadeniz" },
  { il: "Sakarya",        slug: "sakarya",         plaka: 54, bolge: "marmara" },
  { il: "Samsun",         slug: "samsun",          plaka: 55, bolge: "karadeniz" },
  { il: "Siirt",          slug: "siirt",           plaka: 56, bolge: "guneydogu_anadolu" },
  { il: "Sinop",          slug: "sinop",           plaka: 57, bolge: "karadeniz" },
  { il: "Sivas",          slug: "sivas",           plaka: 58, bolge: "ic_anadolu" },
  { il: "Tekirdağ",       slug: "tekirdag",        plaka: 59, bolge: "marmara" },
  { il: "Tokat",          slug: "tokat",           plaka: 60, bolge: "karadeniz" },
  { il: "Trabzon",        slug: "trabzon",         plaka: 61, bolge: "karadeniz" },
  { il: "Tunceli",        slug: "tunceli",         plaka: 62, bolge: "dogu_anadolu" },
  { il: "Şanlıurfa",      slug: "sanliurfa",       plaka: 63, bolge: "guneydogu_anadolu" },
  { il: "Uşak",           slug: "usak",            plaka: 64, bolge: "ege" },
  { il: "Van",            slug: "van",             plaka: 65, bolge: "dogu_anadolu" },
  { il: "Yozgat",         slug: "yozgat",          plaka: 66, bolge: "ic_anadolu" },
  { il: "Zonguldak",      slug: "zonguldak",       plaka: 67, bolge: "karadeniz" },
  { il: "Aksaray",        slug: "aksaray",         plaka: 68, bolge: "ic_anadolu" },
  { il: "Bayburt",        slug: "bayburt",         plaka: 69, bolge: "karadeniz" },
  { il: "Karaman",        slug: "karaman",         plaka: 70, bolge: "ic_anadolu" },
  { il: "Kırıkkale",      slug: "kirikkale",       plaka: 71, bolge: "ic_anadolu" },
  { il: "Batman",         slug: "batman",          plaka: 72, bolge: "guneydogu_anadolu" },
  { il: "Şırnak",         slug: "sirnak",          plaka: 73, bolge: "guneydogu_anadolu" },
  { il: "Bartın",         slug: "bartin",          plaka: 74, bolge: "karadeniz" },
  { il: "Ardahan",        slug: "ardahan",         plaka: 75, bolge: "dogu_anadolu" },
  { il: "Iğdır",          slug: "igdir",           plaka: 76, bolge: "dogu_anadolu" },
  { il: "Yalova",         slug: "yalova",          plaka: 77, bolge: "marmara" },
  { il: "Karabük",        slug: "karabuk",         plaka: 78, bolge: "karadeniz" },
  { il: "Kilis",          slug: "kilis",           plaka: 79, bolge: "guneydogu_anadolu" },
  { il: "Osmaniye",       slug: "osmaniye",        plaka: 80, bolge: "akdeniz" },
  { il: "Düzce",          slug: "duzce",           plaka: 81, bolge: "marmara" },
]

// ─── Yardımcı fonksiyonlar ────────────────────────────────────────────────────

/** Slug → Province */
export function getIlBySlug(slug: string): Province | undefined {
  return TÜM_İLLER.find((p) => p.slug === slug)
}

/** İl adı → Province (case-insensitive) */
export function getIlByAd(ad: string): Province | undefined {
  return TÜM_İLLER.find((p) => p.il.toLowerCase() === ad.toLowerCase())
}

/** Bölgeye göre iller */
export function getIllerByBolge(bolge: BolgeKey): Province[] {
  return TÜM_İLLER.filter((p) => p.bolge === bolge)
}

/** Bölge gruplu Map */
export function getBolgeGrubu(): Map<BolgeKey, Province[]> {
  const map = new Map<BolgeKey, Province[]>()
  for (const il of TÜM_İLLER) {
    const list = map.get(il.bolge) ?? []
    list.push(il)
    map.set(il.bolge, list)
  }
  return map
}

/** Arama: ada göre filtrele */
export function searchIller(query: string): Province[] {
  if (!query.trim()) return TÜM_İLLER
  const q = query.toLowerCase().replace(/[ğ]/g, "g").replace(/[ş]/g, "s")
    .replace(/[ç]/g, "c").replace(/[ü]/g, "u").replace(/[ö]/g, "o").replace(/[ı]/g, "i")
  return TÜM_İLLER.filter((p) => {
    const name = p.il.toLowerCase()
      .replace(/[ğ]/g, "g").replace(/[ş]/g, "s").replace(/[ç]/g, "c")
      .replace(/[ü]/g, "u").replace(/[ö]/g, "o").replace(/[ı]/g, "i")
    return name.includes(q) || p.slug.includes(q)
  })
}

/** İstanbul, Ankara, İzmir öne — sonra alfabetik */
export const ÖNE_ÇIKAN_İLLER = ["istanbul", "ankara", "izmir", "bursa", "trabzon", "kocaeli", "antalya", "samsun"]

export function getOneCikanIller(): Province[] {
  return ÖNE_ÇIKAN_İLLER.map((s) => TÜM_İLLER.find((p) => p.slug === s)!).filter(Boolean)
}
