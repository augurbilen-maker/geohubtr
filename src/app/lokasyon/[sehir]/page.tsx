import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import GeoHeader from "@/components/geo/GeoHeader"
import GeoFooter from "@/components/geo/GeoFooter"
import FirmaKarti, { Firma } from "@/components/geo/FirmaKarti"
import { getCompaniesByCity } from "@/lib/db/companies"
import { sortFirmalar, lihkabAyir } from "@/lib/sort"
// JSON fallback (Supabase yokken)
import cities from "@/data/cities.json"
import services from "@/data/services.json"
import allCompanies from "@/data/companies.json"

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface City {
  id: number
  name: string
  slug: string
  plaka: number
  bolge: string
  bolgeAd: string
}

interface Props {
  params: { sehir: string }
}

// ─── STATIC PARAMS — 81 şehir × derleme zamanında üretilir ──────────────────

export function generateStaticParams() {
  return cities.map((city: City) => ({ sehir: city.slug }))
}

// ─── YARDIMCI FONKSİYONLAR ──────────────────────────────────────────────────

function getCityData(slug: string): City | undefined {
  return cities.find((c: City) => c.slug === slug)
}

/** Türkçe eklemeli hal: İstanbul'da, Ankara'da, Eskişehir'de … */
function yerelHal(ad: string): string {
  const sesliMap: Record<string, string> = {
    İstanbul: "İstanbul'da",
    Ankara: "Ankara'da",
    İzmir: "İzmir'de",
    Bursa: "Bursa'da",
    Antalya: "Antalya'da",
    Trabzon: "Trabzon'da",
    Kocaeli: "Kocaeli'de",
    Samsun: "Samsun'da",
    Eskişehir: "Eskişehir'de",
    Adana: "Adana'da",
    Gaziantep: "Gaziantep'te",
    Konya: "Konya'da",
    Mersin: "Mersin'de",
    Kayseri: "Kayseri'de",
    Erzurum: "Erzurum'da",
    Trabzon: "Trabzon'da",
    Malatya: "Malatya'da",
    Diyarbakır: "Diyarbakır'da",
  }
  return sesliMap[ad] || `${ad}'de`
}

function localFirmaCount(citySlug: string): number {
  // Demo: büyük şehirlerde daha fazla firma
  const counts: Record<string, number> = {
    istanbul: 342, ankara: 178, izmir: 134, bursa: 89, kocaeli: 74,
    antalya: 67, trabzon: 52, samsun: 48, eskisehir: 41, gaziantep: 38,
    konya: 36, mersin: 33, adana: 31, kayseri: 29, erzurum: 24,
  }
  return counts[citySlug] ?? Math.floor(Math.random() * 15) + 5
}

// ─── METADATA ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityData(params.sehir)
  if (!city) return { title: "Şehir bulunamadı" }

  const title = `${city.name} Jeodezi, Harita ve Lazer Tarama Firmaları`
  const description = `${city.name} bölgesindeki rölöve, BIM modelleme, lazer tarama ve halihazır harita hizmeti veren en iyi firmaları bulun. Anında teklif alın, karşılaştırın.`
  const canonical = `https://geohub.com.tr/lokasyon/${city.slug}`

  return {
    title,
    description,
    keywords: [
      `${city.name} jeodezi`,
      `${city.name} harita mühendisi`,
      `${city.name} lazer tarama`,
      `${city.name} rölöve`,
      `${city.name} BIM modelleme`,
      `${city.name} halihazır harita`,
      `${city.name} drone haritalama`,
      `${city.name} LİHKAB`,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: canonical,
      title: `${title} | GeoHub TR`,
      description,
      images: [
        {
          url: `https://geohub.com.tr/og/lokasyon-${city.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${city.name} Jeodezi Firmaları — GeoHub TR`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | GeoHub TR`,
      description,
    },
  }
}

// ─── SCHEMA.ORG JSON-LD ───────────────────────────────────────────────────────

function CityJsonLd({ city, companies }: { city: City; companies: Firma[] }) {
  const siteUrl = "https://geohub.com.tr"

  // ItemList schema — firma listesi
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${city.name} Jeodezi ve Harita Firmaları`,
    description: `${city.name}'deki jeodezi, harita ve lazer tarama firmalarının listesi`,
    url: `${siteUrl}/lokasyon/${city.slug}`,
    numberOfItems: companies.length,
    itemListElement: companies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/firma/${c.slug}`,
        name: c.name,
        description: c.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: city.name,
          addressRegion: city.name,
          addressCountry: "TR",
        },
        url: `${siteUrl}/firma/${c.slug}`,
        ...(c.rating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: c.rating,
                reviewCount: c.reviewCount,
                bestRating: 5,
              },
            }
          : {}),
      },
    })),
  }

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Şehirler", item: `${siteUrl}/lokasyon` },
      { "@type": "ListItem", position: 3, name: city.name, item: `${siteUrl}/lokasyon/${city.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

// ─── SAYFA BİLEŞENLERİ ───────────────────────────────────────────────────────

function StatKart({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-blue-100 bg-white px-5 py-4 shadow-sm">
      <span className="text-2xl">{icon}</span>
      <span className="text-2xl font-extrabold text-[#0A2540]">{value}</span>
      <span className="text-xs text-slate-500 text-center">{label}</span>
    </div>
  )
}

function HeroAramaBar({ cityName }: { cityName: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
        <input
          type="text"
          placeholder={`${cityName}'de hizmet veya firma ara...`}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          readOnly
        />
      </div>
      <select className="py-3 px-4 rounded-xl border border-blue-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm min-w-[160px]">
        <option value="">Tüm Hizmetler</option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.icon} {s.name}
          </option>
        ))}
      </select>
      <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm shrink-0">
        Ara
      </button>
    </div>
  )
}

function SonTalepler({ cityName }: { cityName: string }) {
  const talepler = [
    { id: 1, icon: "🔦", baslik: "Lazer Tarama", detay: `${cityName} / Endüstriyel tesis`, sure: "2 sa önce", teklifSayisi: 3 },
    { id: 2, icon: "📐", baslik: "Rölöve", detay: `${cityName} / 4 katlı yapı`, sure: "5 sa önce", teklifSayisi: 5 },
    { id: 3, icon: "🗺️", baslik: "Halihazır Harita", detay: `${cityName} / 50 dönüm arazi`, sure: "Dün", teklifSayisi: 2 },
    { id: 4, icon: "🚁", baslik: "Drone Haritalama", detay: `${cityName} / Tarım arazisi`, sure: "Dün", teklifSayisi: 7 },
  ]

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          📋 {cityName} Son Açılan Talepler
        </h2>
        <Link
          href="/talep-merkezi"
          className="text-sm text-blue-600 hover:underline"
        >
          Tümünü gör →
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {talepler.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-200 hover:shadow-sm transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-xl shrink-0">
              {t.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-slate-900">{t.baslik}</p>
              <p className="text-xs text-slate-500 truncate">{t.detay}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="block text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                {t.teklifSayisi} teklif
              </span>
              <span className="block text-xs text-slate-400 mt-0.5">{t.sure}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/talep-olustur"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A2540] text-white font-semibold text-sm hover:bg-blue-900 transition-colors"
        >
          ✏️ Bu Şehir İçin Talep Oluştur
        </Link>
      </div>
    </section>
  )
}

function DigerSehirler({ currentSlug }: { currentSlug: string }) {
  const diger = cities
    .filter((c) => c.slug !== currentSlug)
    .slice(0, 12)

  return (
    <section className="mt-12">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Diğer Şehirlere Göz At
      </h2>
      <div className="flex flex-wrap gap-2">
        {diger.map((c) => (
          <Link
            key={c.slug}
            href={`/lokasyon/${c.slug}`}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all"
          >
            {c.name}
          </Link>
        ))}
        <Link
          href="/lokasyon"
          className="text-xs px-3 py-1.5 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium transition-all"
        >
          Tüm 81 İl →
        </Link>
      </div>
    </section>
  )
}

// ─── ANA SAYFA BİLEŞENİ ──────────────────────────────────────────────────────

export default async function SehirSayfasi({ params }: Props) {
  const city = getCityData(params.sehir)
  if (!city) notFound()

  // Supabase'den canlı veri çek, hata durumunda JSON fallback
  let gosterilenFirmalar: Firma[] = []
  try {
    const dbFirmalar = await getCompaniesByCity(params.sehir)
    if (dbFirmalar.length > 0) {
      gosterilenFirmalar = dbFirmalar.map((c) => ({
        id:           String(c.id),
        name:         c.name,
        slug:         c.slug,
        type:         c.tier === "PREMIUM" ? "Premium" : c.tier === "ONAYLI" ? "Onaylı" : "Free",
        avatar:       c.avatar ?? c.name[0],
        city_slug:    c.city_slug,
        district:     c.district ?? "",
        services:     c.services,
        description:  c.description ?? "",
        phone:        c.phone ?? "",
        email:        c.email ?? "",
        website:      c.website ?? "",
        verified:     c.verified,
        rating:       c.rating,
        reviewCount:  c.review_count,
        projectCount: c.project_count,
        tags:         c.tags,
      })) as unknown as Firma[]
    } else {
      // Supabase boşsa JSON fallback
      gosterilenFirmalar = (allCompanies as Firma[]).filter((c) => c.city_slug === city.slug)
    }
  } catch {
    gosterilenFirmalar = (allCompanies as Firma[]).filter((c) => c.city_slug === city.slug)
  }

  // ─── AKILLI SIRALAMA ───────────────────────────────────────────────────────
  // 1. LİHKAB firmalarını ayır ve kendi içinde sırala
  // 2. Diğerlerini: Premium → Onaylı → Free → puan sırasına göre
  const { lihkablar, diger: digerFirmalar } = lihkabAyir(gosterilenFirmalar)
  const siraliDigerFirmalar = digerFirmalar  // lihkabAyir içinde zaten sortFirmalar çağrılır

  const toplamFirmaSayisi = gosterilenFirmalar.length > 0
    ? gosterilenFirmalar.length
    : localFirmaCount(city.slug)
  const toplamHizmetSayisi = 15

  // Hizmet bağlantıları bu şehir için
  const hizmetBaglantilari = services.slice(0, 8)

  return (
    <>
      {/* JSON-LD */}
      <CityJsonLd city={city} companies={gosterilenFirmalar as any} />

      <GeoHeader />

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0A2540] via-[#0d2f50] to-[#1a4a7a] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-blue-300 mb-6">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/lokasyon" className="hover:text-white">Şehirler</Link>
            <span>/</span>
            <span className="text-white font-medium">{city.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            Doğru Jeodezi &amp; Harita Firmasını
            <br />
            <span className="text-blue-300">{city.name}</span> Şehrinde Anında Bul
          </h1>

          <p className="text-blue-200 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
            {city.name} ve çevresinde rölöve, lazer tarama, BIM modelleme, drone haritalama
            ve daha fazlası için yetkili firmaları karşılaştır, anında teklif al.
          </p>

          {/* Arama Barı */}
          <HeroAramaBar cityName={city.name} />
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatKart value={toplamFirmaSayisi.toString()} label={`${city.name} Firma`} icon="🏢" />
            <StatKart value={toplamHizmetSayisi.toString()} label="Hizmet Kategorisi" icon="⚙️" />
            <StatKart value="24sa" label="Teklif Süresi" icon="⚡" />
            <StatKart value="%98" label="Müşteri Memnuniyeti" icon="⭐" />
          </div>
        </div>
      </div>

      {/* ANA İÇERİK */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Sol: Firma listesi */}
          <div>
            {/* Filtre şeridi */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <h2 className="text-base font-bold text-slate-800 mr-2">
                {yerelHal(city.name)}{" "}
                <span className="text-blue-600">{toplamFirmaSayisi} Firma</span>
              </h2>
              <span className="ml-auto text-xs text-slate-500 flex items-center gap-2">
                Sırala:
                <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-400">
                  <option>Önerilen</option>
                  <option>En Yüksek Puanlı</option>
                  <option>En Fazla Proje</option>
                  <option>A → Z</option>
                </select>
              </span>
            </div>

            {/* Firma Kartları */}
            {gosterilenFirmalar.length > 0 ? (
              <div className="flex flex-col gap-6">

                {/* ── LİHKAB BLOĞU (varsa) ───────────────────────────────── */}
                {lihkablar.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold">
                        🏅 LİHKAB Yetkili Firmalar
                      </span>
                      <span className="text-xs text-slate-400">
                        {lihkablar.length} firma
                      </span>
                    </div>
                    <div className="flex flex-col gap-4 pl-1 border-l-4 border-amber-300">
                      {lihkablar.map((firma) => (
                        <FirmaKarti
                          key={firma.id}
                          firma={firma as Firma}
                          cityName={city.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* ── DİĞER FİRMALAR (Premium → Onaylı → Free sırası) ────── */}
                {siraliDigerFirmalar.length > 0 && (
                  <div>
                    {lihkablar.length > 0 && (
                      <div className="flex items-center gap-2 mb-3 mt-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Diğer Firmalar
                        </span>
                        <span className="text-xs text-slate-400">
                          ({siraliDigerFirmalar.length} firma)
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col gap-4">
                      {siraliDigerFirmalar.map((firma) => (
                        <FirmaKarti
                          key={firma.id}
                          firma={firma as Firma}
                          cityName={city.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* "Daha fazla yükle" CTA */}
                <div className="mt-2 text-center">
                  <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm hover:border-blue-300 hover:text-blue-700 transition-colors">
                    Daha Fazla Firma Yükle ({toplamFirmaSayisi - gosterilenFirmalar.length} firma daha)
                  </button>
                </div>
              </div>
            ) : (
              /* Şehirde kayıtlı örnek firma yoksa CTA */
              <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-10 text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="font-bold text-slate-800 mb-2">
                  {city.name}&apos;de kayıtlı firma henüz yok
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  {city.name} bölgesinde hizmet veren ilk firma siz olun!
                </p>
                <Link
                  href="/uyelik"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A2540] text-white font-semibold text-sm hover:bg-blue-900 transition-colors"
                >
                  🏢 Firmanızı Kaydedin
                </Link>
              </div>
            )}

            {/* Son Talepler */}
            <SonTalepler cityName={city.name} />

            {/* Diğer Şehirler */}
            <DigerSehirler currentSlug={city.slug} />
          </div>

          {/* Sağ: Sidebar */}
          <aside className="space-y-5">
            {/* Hizmet kategorileri */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-800 mb-3 text-sm">
                {city.name}&apos;de Hizmet Kategorileri
              </h3>
              <ul className="space-y-1">
                {hizmetBaglantilari.map((svc) => (
                  <li key={svc.slug}>
                    <Link
                      href={`/lokasyon/${city.slug}/${svc.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                    >
                      <span>
                        {svc.icon} {svc.name}
                      </span>
                      <span className="text-xs text-slate-400 group-hover:text-blue-500">→</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/firmalar?sehir=${city.slug}`}
                    className="flex items-center justify-center px-3 py-2 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-100 mt-2 transition-colors"
                  >
                    Tüm Hizmetleri Gör →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Talep oluştur CTA */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <h3 className="font-bold text-emerald-900 mb-2 text-sm">
                🚀 Hızlı Teklif Al
              </h3>
              <p className="text-xs text-emerald-700 mb-4 leading-relaxed">
                Talebinizi oluşturun, {city.name}&apos;deki firmalar size teklif
                göndersin. Ortalama yanıt süresi 4 saat.
              </p>
              <Link
                href={`/talep-olustur?sehir=${city.slug}`}
                className="block text-center py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                ✏️ Talep Oluştur
              </Link>
            </div>

            {/* Firma sahipliği CTA */}
            <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-[#0A2540] to-[#1a4a7a] p-5">
              <h3 className="font-bold text-white mb-2 text-sm">
                🏢 Firma mısınız?
              </h3>
              <p className="text-xs text-blue-200 mb-4 leading-relaxed">
                {city.name}&apos;deki potansiyel müşterilere ulaşın. Ücretsiz profil
                oluşturun, talepleri görün.
              </p>
              <Link
                href="/uyelik"
                className="block text-center py-2.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 transition-colors"
              >
                Ücretsiz Kayıt →
              </Link>
            </div>

            {/* Şehir bilgisi */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-800 mb-3 text-sm">
                📍 {city.name} Hakkında
              </h3>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Bölge</dt>
                  <dd className="font-medium text-slate-700">{city.bolgeAd}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Plaka</dt>
                  <dd className="font-medium text-slate-700">{city.plaka.toString().padStart(2, "0")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Kayıtlı Firma</dt>
                  <dd className="font-medium text-emerald-700">{toplamFirmaSayisi} firma</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </main>

      <GeoFooter />
    </>
  )
}
