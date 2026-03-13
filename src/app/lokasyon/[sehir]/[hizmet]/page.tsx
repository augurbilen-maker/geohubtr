/**
 * /lokasyon/[sehir]/[hizmet]
 *
 * 81 şehir × 15 hizmet = 1.215 statik SEO sayfası
 * Örn: /lokasyon/istanbul/lazer-tarama
 *      /lokasyon/eskisehir/lihkab
 */

import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import GeoHeader from "@/components/geo/GeoHeader"
import GeoFooter from "@/components/geo/GeoFooter"
import FirmaKarti, { Firma } from "@/components/geo/FirmaKarti"
import { getCompaniesByCityAndService, getCompaniesByCity } from "@/lib/db/companies"
import { sortFirmalar, lihkabAyir } from "@/lib/sort"
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

interface Service {
  id: number
  slug: string
  name: string
  icon: string
  group: string
  groupName: string
  description: string
  keywords: string[]
  subServices: { slug: string; name: string }[]
}

interface Props {
  params: { sehir: string; hizmet: string }
}

// ─── STATIC PARAMS — 81 × 15 = 1.215 sayfa ───────────────────────────────────

export function generateStaticParams() {
  const params: { sehir: string; hizmet: string }[] = []
  for (const city of cities as City[]) {
    for (const service of services as Service[]) {
      params.push({ sehir: city.slug, hizmet: service.slug })
    }
  }
  return params
}

// ─── YARDIMCI ────────────────────────────────────────────────────────────────

function getCity(slug: string): City | undefined {
  return (cities as City[]).find((c) => c.slug === slug)
}

function getService(slug: string): Service | undefined {
  return (services as Service[]).find((s) => s.slug === slug)
}

/** Sayfa başlığı için şehir tamlama eki */
function yerelHal(ad: string): string {
  const map: Record<string, string> = {
    İstanbul: "İstanbul'da", Ankara: "Ankara'da", İzmir: "İzmir'de",
    Bursa: "Bursa'da", Antalya: "Antalya'da", Trabzon: "Trabzon'da",
    Kocaeli: "Kocaeli'de", Samsun: "Samsun'da", Eskişehir: "Eskişehir'de",
    Adana: "Adana'da", Gaziantep: "Gaziantep'te", Konya: "Konya'da",
    Mersin: "Mersin'de", Kayseri: "Kayseri'de",
  }
  return map[ad] || `${ad}'de`
}

// ─── METADATA ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity(params.sehir)
  const service = getService(params.hizmet)
  if (!city || !service) return { title: "Sayfa bulunamadı" }

  const title = `${city.name} ${service.name} Firmaları`
  const description = `${city.name} bölgesinde ${service.name.toLowerCase()} hizmeti veren firmaları bulun. ${service.description} Hızlı teklif alın, karşılaştırın.`
  const canonical = `https://geohub.com.tr/lokasyon/${city.slug}/${service.slug}`

  return {
    title,
    description,
    keywords: [
      ...service.keywords.map((k) => `${city.name} ${k}`),
      `${city.name} ${service.name.toLowerCase()} firması`,
      `${city.name} ${service.name.toLowerCase()} fiyat`,
    ],
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: canonical,
      title: `${title} | GeoHub TR`,
      description,
    },
  }
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

function HizmetCityJsonLd({
  city,
  service,
  companies,
}: {
  city: City
  service: Service
  companies: Firma[]
}) {
  const siteUrl = "https://geohub.com.tr"

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${city.name} ${service.name} Firmaları`,
    description: `${city.name}'deki ${service.name.toLowerCase()} firmaları`,
    url: `${siteUrl}/lokasyon/${city.slug}/${service.slug}`,
    numberOfItems: companies.length,
    itemListElement: companies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: c.name,
        description: c.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: city.name,
          addressCountry: "TR",
        },
        url: `${siteUrl}/firma/${c.slug}`,
      },
    })),
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Şehirler", item: `${siteUrl}/lokasyon` },
      { "@type": "ListItem", position: 3, name: city.name, item: `${siteUrl}/lokasyon/${city.slug}` },
      { "@type": "ListItem", position: 4, name: service.name, item: `${siteUrl}/lokasyon/${city.slug}/${service.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}

// ─── ANA BİLEŞEN ─────────────────────────────────────────────────────────────

export default async function SehirHizmetSayfasi({ params }: Props) {
  const city = getCity(params.sehir)
  const service = getService(params.hizmet)
  if (!city || !service) notFound()

  // ─── VERİ ÇEKME: Supabase → JSON fallback ───────────────────────────────
  let eslesmeFirmalari: Firma[] = []
  let sehirFirmalari: Firma[] = []

  try {
    // 1. Bu şehirde bu hizmeti veren firmalar (Supabase)
    const dbEslesen = await getCompaniesByCityAndService(city.slug, service.slug)
    if (dbEslesen.length > 0) {
      eslesmeFirmalari = dbEslesen.map((c) => ({
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
    }

    // 2. Şehirdeki tüm firmalar (Supabase) — fallback görüntülemek için
    const dbSehir = await getCompaniesByCity(city.slug)
    if (dbSehir.length > 0) {
      sehirFirmalari = dbSehir.map((c) => ({
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
    }
  } catch {
    // Supabase yokken JSON fallback
    eslesmeFirmalari = (allCompanies as Firma[]).filter(
      (c) => c.city_slug === city.slug && c.services.includes(service.slug)
    )
    sehirFirmalari = (allCompanies as Firma[]).filter(
      (c) => c.city_slug === city.slug
    )
  }

  // JSON fallback'te Supabase boş geldiyse
  if (eslesmeFirmalari.length === 0 && sehirFirmalari.length === 0) {
    eslesmeFirmalari = (allCompanies as Firma[]).filter(
      (c) => c.city_slug === city.slug && c.services.includes(service.slug)
    )
    sehirFirmalari = (allCompanies as Firma[]).filter(
      (c) => c.city_slug === city.slug
    )
  }

  // ─── AKILLI SIRALAMA ───────────────────────────────────────────────────────
  // Önce bu hizmete tam eşleşen firmalar, sonra şehirdeki diğerleri
  const hamFirmalar = eslesmeFirmalari.length > 0 ? eslesmeFirmalari : sehirFirmalari

  // LİHKAB sayfasıysa tüm firmalar LİHKAB bloğuna; değilse LİHKAB olanları ayır
  const isLihkabSayfasi = service.slug === "lihkab"
  const { lihkablar, diger: digerFirmalar } = lihkabAyir(hamFirmalar)

  // LİHKAB sayfasında displayFirmalar = lihkablar; diğer sayfalarda diger + lihkablar öne alınmış
  const displayFirmalar = isLihkabSayfasi
    ? lihkablar
    : [...lihkablar, ...digerFirmalar]  // lihkabAyir içinde her iki grup da sıralanmış

  // Bu hizmetle ilgili diğer şehirler (SEO iç linklemesi)
  const digerSehirler = (cities as City[])
    .filter((c) => c.slug !== city.slug)
    .slice(0, 8)

  // Bu şehirde diğer hizmetler (SEO iç linklemesi)
  const digerHizmetler = (services as Service[]).filter(
    (s) => s.slug !== service.slug
  )

  return (
    <>
      <HizmetCityJsonLd city={city} service={service} companies={displayFirmalar as any} />

      <GeoHeader />

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0A2540] via-[#0d2f50] to-[#1a4a7a] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-blue-300 mb-5">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/lokasyon" className="hover:text-white">Şehirler</Link>
            <span>/</span>
            <Link href={`/lokasyon/${city.slug}`} className="hover:text-white">{city.name}</Link>
            <span>/</span>
            <span className="text-white font-medium">{service.name}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="text-5xl shrink-0">{service.icon}</div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
                {city.name} {service.name} Firmaları
              </h1>
              <p className="text-blue-200 text-base max-w-2xl leading-relaxed">
                {yerelHal(city.name)} {service.description.toLowerCase()}.
                Yetkili ve onaylı firmaları karşılaştır, anında teklif al.
              </p>
              {isLihkabSayfasi && (
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs font-semibold">
                  🏅 Bu sayfa yalnızca LİHKAB yetkili firmaları listeler
                </div>
              )}
            </div>
          </div>

          {/* Alt hizmet linkleri */}
          <div className="mt-6 flex flex-wrap gap-2">
            {service.subServices.map((sub) => (
              <span
                key={sub.slug}
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-blue-200 border border-white/20 hover:bg-white/20 cursor-pointer transition-colors"
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ANA İÇERİK */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          {/* Sol: Firmalar */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-slate-800">
                {city.name}&apos;de{" "}
                <span className="text-blue-600">{service.name}</span> Hizmeti Veren Firmalar
                {displayFirmalar.length > 0 && (
                  <span className="ml-2 text-sm text-slate-400 font-normal">
                    ({displayFirmalar.length} firma)
                  </span>
                )}
              </h2>
            </div>

            {displayFirmalar.length > 0 ? (
              <div className="flex flex-col gap-6">

                {/* ── LİHKAB BLOĞU ─────────────────────────────────────── */}
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
                          hizmetSlug={service.slug}
                          cityName={city.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* ── DİĞER FİRMALAR (sadece LİHKAB sayfası değilse) ─── */}
                {!isLihkabSayfasi && digerFirmalar.length > 0 && (
                  <div>
                    {lihkablar.length > 0 && (
                      <div className="flex items-center gap-2 mb-3 mt-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Diğer Firmalar
                        </span>
                        <span className="text-xs text-slate-400">
                          ({digerFirmalar.length} firma)
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col gap-4">
                      {digerFirmalar.map((firma) => (
                        <FirmaKarti
                          key={firma.id}
                          firma={firma as Firma}
                          hizmetSlug={service.slug}
                          cityName={city.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-10 text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">
                  {city.name}&apos;de {service.name} için kayıtlı firma henüz yok
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  Bu hizmeti {city.name}&apos;de sunan ilk firma siz olun!
                </p>
                <Link
                  href="/uyelik"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A2540] text-white font-semibold text-sm hover:bg-blue-900 transition-colors"
                >
                  🏢 Firmanızı Kaydedin
                </Link>
              </div>
            )}

            {/* Bu hizmetin diğer şehirleri — iç linkleme */}
            <section className="mt-12">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Diğer Şehirlerde {service.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {digerSehirler.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/lokasyon/${c.slug}/${service.slug}`}
                    className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </section>

            {/* Bu şehirde diğer hizmetler — iç linkleme */}
            <section className="mt-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                {city.name}&apos;de Diğer Hizmetler
              </h2>
              <div className="flex flex-wrap gap-2">
                {digerHizmetler.slice(0, 8).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/lokasyon/${city.slug}/${s.slug}`}
                    className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all"
                  >
                    {s.icon} {s.name}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sağ: Sidebar */}
          <aside className="space-y-5">
            {/* Talep CTA */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <h3 className="font-bold text-emerald-900 mb-2 text-sm">⚡ Hızlı Teklif Al</h3>
              <p className="text-xs text-emerald-700 mb-4 leading-relaxed">
                {city.name}&apos;deki {service.name.toLowerCase()} firmalarından teklif alın.
                Ortalama yanıt süresi 4 saat.
              </p>
              <Link
                href={`/talep-olustur?sehir=${city.slug}&hizmet=${service.slug}`}
                className="block text-center py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                ✏️ {service.name} Talebi Oluştur
              </Link>
            </div>

            {/* Alt hizmetler */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-800 mb-3 text-sm">
                {service.icon} {service.name} Alt Kategorileri
              </h3>
              <ul className="space-y-1">
                {service.subServices.map((sub) => (
                  <li key={sub.slug}>
                    <span className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {sub.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hizmet açıklaması */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-800 mb-2 text-sm">
                {service.name} Nedir?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {service.description} GeoHub TR üzerinden {city.name}&apos;deki
                uzman firmalara ulaşın.
              </p>
            </div>

            {/* Firma kaydı */}
            <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-[#0A2540] to-[#1a4a7a] p-5">
              <h3 className="font-bold text-white mb-2 text-sm">🏢 Firma mısınız?</h3>
              <p className="text-xs text-blue-200 mb-4 leading-relaxed">
                {city.name}&apos;de {service.name.toLowerCase()} hizmeti veriyorsanız
                profilinizi oluşturun.
              </p>
              <Link
                href="/uyelik"
                className="block text-center py-2.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 transition-colors"
              >
                Ücretsiz Kayıt →
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <GeoFooter />
    </>
  )
}
