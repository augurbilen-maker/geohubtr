/**
 * /lokasyon — Tüm 81 il dizin sayfası
 * SEO: Türkiye'nin tüm illeri için iç linkleme hub'ı
 */

import { Metadata } from "next"
import Link from "next/link"
import GeoHeader from "@/components/geo/GeoHeader"
import GeoFooter from "@/components/geo/GeoFooter"
import cities from "@/data/cities.json"

export const metadata: Metadata = {
  title: "Türkiye'nin 81 İlinde Jeodezi ve Harita Firmaları",
  description:
    "İstanbul'dan Hakkari'ye Türkiye'nin tüm 81 ilinde jeodezi, harita, lazer tarama ve rölöve hizmeti veren firmaları bulun. Şehrinizi seçin, anında teklif alın.",
  alternates: {
    canonical: "https://geohub.com.tr/lokasyon",
  },
}

const BOLGE_RENK: Record<string, string> = {
  marmara: "bg-blue-50 border-blue-200 text-blue-800",
  ege: "bg-cyan-50 border-cyan-200 text-cyan-800",
  akdeniz: "bg-orange-50 border-orange-200 text-orange-800",
  ic_anadolu: "bg-emerald-50 border-emerald-200 text-emerald-800",
  karadeniz: "bg-teal-50 border-teal-200 text-teal-800",
  dogu_anadolu: "bg-purple-50 border-purple-200 text-purple-800",
  guneydogu_anadolu: "bg-rose-50 border-rose-200 text-rose-800",
}

const BOLGE_EMOJI: Record<string, string> = {
  marmara: "🔵", ege: "🩵", akdeniz: "🟠", ic_anadolu: "🟢",
  karadeniz: "🩵", dogu_anadolu: "🟣", guneydogu_anadolu: "🔴",
}

// Şehirleri bölgeye göre grupla
function gruplareBol() {
  const gruplar: Record<string, typeof cities> = {}
  for (const city of cities) {
    if (!gruplar[city.bolge]) gruplar[city.bolge] = []
    gruplar[city.bolge].push(city)
  }
  return gruplar
}

export default function LokasyonIndexSayfasi() {
  const bolgeler = gruplareBol()
  const bolgeKeys = [
    "marmara", "ege", "akdeniz", "ic_anadolu",
    "karadeniz", "dogu_anadolu", "guneydogu_anadolu",
  ]

  return (
    <>
      <GeoHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A2540] to-[#1a4a7a] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex gap-2 text-xs text-blue-300 mb-4">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">Şehirler</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            🗺️ Türkiye&apos;nin 81 İlinde<br />
            <span className="text-blue-300">Jeodezi & Harita Firmaları</span>
          </h1>
          <p className="text-blue-200 text-base max-w-xl leading-relaxed">
            Şehrinizi seçin, bölgenizdeki yetkili jeodezi, harita ve lazer tarama
            firmalarını bulun. Anında teklif alın, karşılaştırın.
          </p>
        </div>
      </section>

      {/* Bölge grupları */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="space-y-10">
          {bolgeKeys.map((bolge) => {
            const iller = bolgeler[bolge] || []
            const bolgeAd = iller[0]?.bolgeAd || bolge
            const renk = BOLGE_RENK[bolge] || "bg-slate-50 border-slate-200 text-slate-800"
            const emoji = BOLGE_EMOJI[bolge] || "📍"
            return (
              <section key={bolge}>
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold mb-4 ${renk}`}>
                  {emoji} {bolgeAd} Bölgesi
                  <span className="text-xs font-normal opacity-70">({iller.length} il)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {iller.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/lokasyon/${city.slug}`}
                      className="group flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white p-3 text-center hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                        {city.name}
                      </span>
                      <span className="text-xs text-slate-400">{String(city.plaka).padStart(2, "0")}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Alt CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#1a4a7a] p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            Şehrinizde Firma Bulamadınız mı?
          </h2>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto">
            Talep oluşturun, GeoHub TR&apos;deki firmalar size ulaşsın. Türkiye genelinde
            hizmet veren firmalar da teklifinizi yanıtlayabilir.
          </p>
          <Link
            href="/talep-olustur"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-400 transition-colors"
          >
            ✏️ Talep Oluştur
          </Link>
        </div>
      </main>

      <GeoFooter />
    </>
  )
}
