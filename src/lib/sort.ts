/**
 * GeoHub TR — Firma Sıralama Yardımcısı
 *
 * Sıralama önceliği:
 *  1. Abonelik kademesi  : Premium (0) → Onaylı (10) → Free (20)
 *  2. Hizmet önceliği    : LİHKAB (0) → halihazır/klasik harita (3) → diğer
 *  3. Aktif kategori eşleşmesi (opsiyonel, client-side filtreler için)
 *  4. Puan              : yüksekten düşüğe
 */

// ─── TİP TANIMI ────────────────────────────────────────────────────────────────

export interface SiralanabilirFirma {
  /** "Premium" | "Onaylı" | "Free" — veya Supabase enum değerleri */
  type?: string
  tier?: string
  /** Hizmet slug dizisi */
  services?: string[]
  /** Puan (0-5) */
  rating?: number | null
  /** Doğrulanmış mı? */
  verified?: boolean
}

// ─── SABİTLER ──────────────────────────────────────────────────────────────────

/** Öncelikli olarak listelenmesi gereken hizmet slug'ları (sıra önemli) */
const ONCELIKLI_HIZMETLER: string[] = [
  "lihkab",           // LİHKAB — her zaman ilk
  "lihkab-sorgu",     // LİHKAB sorgulama
  "halihazirhrita",   // halihazır harita
  "klasik-harita",    // klasik harita
  "kadastro",         // kadastro
]

/**
 * Oncelikli hizmetler için bonus skoru:
 * En küçük değer = en üstte listelenir.
 */
function hizmetBonusu(services: string[] = []): number {
  for (let i = 0; i < ONCELIKLI_HIZMETLER.length; i++) {
    if (services.includes(ONCELIKLI_HIZMETLER[i])) {
      return i // 0 = LİHKAB (en iyi), 1 = lihkab-sorgu, vb.
    }
  }
  return ONCELIKLI_HIZMETLER.length // öncelikli hizmet yok → en sona
}

// ─── ANA SIRALAMA FONKSİYONU ───────────────────────────────────────────────────

/**
 * Bir firmanın sıralama skorunu döndürür.
 * **Düşük puan = üst sıra**
 *
 * @param firma   Sıralanacak firma objesi
 * @param aktifKategori  Kullanıcının seçtiği aktif kategori slug'ı (opsiyonel)
 */
export function firmaSiraSkoru(
  firma: SiralanabilirFirma,
  aktifKategori?: string
): number {
  // --- 1. Kademe skoru ---
  const kademeStr = (firma.type ?? firma.tier ?? "").toLowerCase()
  let kademeSkoru: number
  if (kademeStr === "premium") {
    kademeSkoru = 0
  } else if (kademeStr === "onaylı" || kademeStr === "onayli") {
    kademeSkoru = 10
  } else {
    kademeSkoru = 20
  }

  // --- 2. Hizmet önceliği ---
  const services = firma.services ?? []
  const hizmetSkoru = hizmetBonusu(services) // 0–6

  // --- 3. Aktif kategori eşleşmesi (sadece istenirse) ---
  let kategoriSkoru = 0
  if (aktifKategori && !services.includes(aktifKategori)) {
    kategoriSkoru = 15 // kategori eşleşmiyor → aşağı it
  }

  // --- 4. Puan (ters sıralı: düşük puan = üst sıra için 5-rating) ---
  const puan = typeof firma.rating === "number" ? firma.rating : 0
  const puanSkoru = parseFloat((5 - puan).toFixed(2))

  return kademeSkoru + hizmetSkoru + kategoriSkoru + puanSkoru
}

/**
 * Firmaları GeoHub sıralama kuralına göre sıralar (yerinde değil, yeni dizi).
 *
 * @param firmalar        Sıralanacak firma listesi
 * @param aktifKategori   Kullanıcının seçtiği aktif kategori (opsiyonel)
 */
export function sortFirmalar<T extends SiralanabilirFirma>(
  firmalar: T[],
  aktifKategori?: string
): T[] {
  return [...firmalar].sort(
    (a, b) => firmaSiraSkoru(a, aktifKategori) - firmaSiraSkoru(b, aktifKategori)
  )
}

// ─── YARDIMCI: LİHKAB OLAN / OLMAYAN FİRMALARI AYIR ──────────────────────────

/**
 * Listeyi LİHKAB firmalar ve diğerleri olarak ayırır.
 * LİHKAB firmalar: kendi içinde kademe + puana göre sıralanır.
 * Diğerleri:       aynı şekilde sıralanır.
 */
export function lihkabAyir<T extends SiralanabilirFirma>(
  firmalar: T[]
): { lihkablar: T[]; diger: T[] } {
  const lihkablar = sortFirmalar(
    firmalar.filter((f) => (f.services ?? []).includes("lihkab"))
  )
  const diger = sortFirmalar(
    firmalar.filter((f) => !(f.services ?? []).includes("lihkab"))
  )
  return { lihkablar, diger }
}

// ─── YARDIMCI: KADEMELERİNE GÖRE GRUPLAMA ────────────────────────────────────

export interface GrupluFirmalar<T> {
  premium:  T[]
  onayli:   T[]
  ucretsiz: T[]
}

export function kademeGrupla<T extends SiralanabilirFirma>(
  firmalar: T[]
): GrupluFirmalar<T> {
  const isMatch = (f: T, ...values: string[]) => {
    const k = (f.type ?? f.tier ?? "").toLowerCase()
    return values.some((v) => k === v)
  }
  return {
    premium:  sortFirmalar(firmalar.filter((f) => isMatch(f, "premium"))),
    onayli:   sortFirmalar(firmalar.filter((f) => isMatch(f, "onaylı", "onayli"))),
    ucretsiz: sortFirmalar(firmalar.filter((f) => !isMatch(f, "premium", "onaylı", "onayli"))),
  }
}
