import Link from "next/link"

export interface Firma {
  id: number
  name: string
  slug: string
  type: "Premium" | "Onaylı" | "Üye"
  avatar: string
  city_slug: string
  district?: string
  services: string[]
  description: string
  verified?: boolean
  rating?: number
  reviewCount?: number
  projectCount?: number
}

interface FirmaKartiProps {
  firma: Firma
  hizmetSlug?: string // hangi hizmet sayfasındayız
  cityName: string
}

const SERVICE_NAMES: Record<string, string> = {
  "rolove": "Rölöve",
  "eski-eser-rolovesi": "Eski Eser Rölövesi",
  "halihazir-harita": "Halihazır Harita",
  "aplikasyon-ifraz": "Aplikasyon & İfraz",
  "lihkab": "LİHKAB",
  "insaat-kontrol": "İnşaat Kontrol",
  "maden-ocak": "Maden & Ocak",
  "lazer-tarama": "Lazer Tarama",
  "bim-modelleme": "BIM Modelleme",
  "fotogrametri": "Fotogrametri",
  "drone-iha": "Drone / İHA",
  "cbs-gis": "CBS / GIS",
  "gayrimenkul-degerleme": "Gayrimenkul Değerleme",
  "cihaz-satis-kiralama": "Cihaz Satış & Kiralama",
  "egitim-kurumu": "Eğitim Kurumu",
}

const AVATAR_COLORS: Record<string, string> = {
  G: "bg-amber-100 text-amber-700",
  S: "bg-emerald-100 text-emerald-700",
  A: "bg-blue-100 text-blue-700",
  İ: "bg-violet-100 text-violet-700",
  B: "bg-cyan-100 text-cyan-700",
  E: "bg-teal-100 text-teal-700",
  T: "bg-orange-100 text-orange-700",
  K: "bg-rose-100 text-rose-700",
  L: "bg-indigo-100 text-indigo-700",
}

function TierBadge({ type, verified }: { type: string; verified?: boolean }) {
  if (type === "Premium") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
        ⭐ Premium
      </span>
    )
  }
  if (type === "Onaylı") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
        ✓ Onaylı
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
      Üye
    </span>
  )
}

export default function FirmaKarti({ firma, cityName }: FirmaKartiProps) {
  const isPremium = firma.type === "Premium"
  const avatarColor =
    AVATAR_COLORS[firma.avatar] || "bg-slate-100 text-slate-600"

  return (
    <article
      className={[
        "group relative flex gap-4 rounded-xl border bg-white p-5 transition-all duration-200",
        isPremium
          ? "border-amber-200 bg-gradient-to-br from-amber-50/60 to-white shadow-sm hover:shadow-md hover:border-amber-300"
          : "border-slate-200 hover:border-blue-200 hover:shadow-sm",
      ].join(" ")}
    >
      {/* Premium sol kenar çizgisi */}
      {isPremium && (
        <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-amber-400" />
      )}

      {/* Avatar */}
      <div
        className={[
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl font-bold",
          avatarColor,
        ].join(" ")}
      >
        {firma.avatar}
      </div>

      {/* İçerik */}
      <div className="min-w-0 flex-1">
        {/* Başlık satırı */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Link
            href={`/firma/${firma.slug}`}
            className="font-bold text-slate-900 hover:text-blue-700 transition-colors text-[15px] leading-snug"
          >
            {firma.name}
          </Link>
          <TierBadge type={firma.type} verified={firma.verified} />
          {firma.verified && (
            <span className="inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
              ✔ Doğrulandı
            </span>
          )}
        </div>

        {/* Konum & Rating */}
        <div className="flex flex-wrap items-center gap-3 mb-2 text-xs text-slate-500">
          <span>
            📍 {cityName}
            {firma.district ? `, ${firma.district}` : ""}
          </span>
          {firma.rating && (
            <span className="flex items-center gap-0.5">
              ⭐ {firma.rating.toFixed(1)}
              <span className="text-slate-400">({firma.reviewCount} yorum)</span>
            </span>
          )}
          {firma.projectCount && (
            <span>🗂️ {firma.projectCount.toLocaleString("tr-TR")}+ proje</span>
          )}
        </div>

        {/* Açıklama */}
        <p className="text-sm text-slate-600 leading-relaxed mb-3 line-clamp-2">
          {firma.description}
        </p>

        {/* Hizmet etiketleri */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {firma.services.slice(0, 5).map((svc) => (
            <span
              key={svc}
              className="text-xs px-2 py-0.5 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-medium"
            >
              {SERVICE_NAMES[svc] || svc}
            </span>
          ))}
          {firma.services.length > 5 && (
            <span className="text-xs px-2 py-0.5 rounded-full border border-slate-100 bg-slate-50 text-slate-500">
              +{firma.services.length - 5} hizmet
            </span>
          )}
        </div>

        {/* Butonlar */}
        <div className="flex gap-2">
          <Link
            href={`/firma/${firma.slug}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0A2540] text-white hover:bg-blue-800 transition-colors"
          >
            Profili Gör →
          </Link>
          <Link
            href={`/talep-olustur?firma=${firma.slug}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
          >
            ✉️ Teklif İste
          </Link>
        </div>
      </div>
    </article>
  )
}
