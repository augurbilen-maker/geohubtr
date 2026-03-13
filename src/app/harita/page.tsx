/**
 * /harita — GeoHub TR Ana GIS Harita Sayfası
 *
 * - Sol panel: filtre (hizmet, şehir, tip, kapsam)
 * - Sağ/Ana alan: Leaflet harita ile 15 firma pini
 * - Altta: liste görünümüne geçiş
 * - SEO: LocalBusiness JSON-LD
 */

import { Metadata } from "next"
import GeoHeader from "@/components/geo/GeoHeader"
import GeoFooter from "@/components/geo/GeoFooter"
import HaritaClient from "./HaritaClient"
import { getAllCompaniesForMap } from "@/lib/db/companies"
import { getAllCities } from "@/lib/db/cities"
import { getServerClient } from "@/lib/supabase"
import type { MapFirma } from "@/components/geo/GeoMap"

// Supabase yoksa JSON fallback
import allCompaniesJson from "@/data/companies.json"
import servicesJson from "@/data/services.json"
import citiesJson from "@/data/cities.json"

export const metadata: Metadata = {
  title: "Türkiye Jeodezi Firmaları Haritası",
  description:
    "Türkiye genelindeki jeodezi, harita, lazer tarama ve rölöve firmalarını interaktif harita üzerinde keşfedin. Hizmet alanlarını görün, konum bazlı filtreleyin.",
  alternates: {
    canonical: "https://geohub.com.tr/harita",
  },
  openGraph: {
    title: "GeoHub TR — Jeodezi Firmaları Haritası",
    description: "Türkiye'nin 81 ilinde jeodezi ve harita firmalarını harita üzerinde keşfedin.",
    type: "website",
    locale: "tr_TR",
  },
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

function MapJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Map",
    name: "GeoHub TR — Türkiye Jeodezi Firmaları Haritası",
    description: "Türkiye genelindeki jeodezi ve harita firmalarının interaktif haritası",
    url: "https://geohub.com.tr/harita",
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Server Component: Supabase'den canlı veri çeker
export default async function HaritaSayfasi() {
  // ── Supabase'den veri çek; hata durumunda JSON fallback ──
  let firmalar: MapFirma[] = []
  let services = servicesJson
  let cities   = citiesJson as any[]

  try {
    const [dbFirmalar, dbCities] = await Promise.all([
      getAllCompaniesForMap(),
      getAllCities(),
    ])
    // Supabase şemasını MapFirma tipine dönüştür
    if (dbFirmalar.length > 0) {
      firmalar = dbFirmalar.map((c) => ({
        id:           String(c.id),
        name:         c.name,
        slug:         c.slug,
        type:         c.tier === "PREMIUM" ? "Premium" : c.tier === "ONAYLI" ? "Onaylı" : "Free",
        avatar:       c.avatar ?? c.name[0],
        city_slug:    c.city_slug,
        district:     c.district ?? "",
        lat:          c.lat ?? 0,
        lng:          c.lng ?? 0,
        coverage:     c.coverage,
        serviceAreas: c.service_areas,
        services:     c.services,
        description:  c.description ?? "",
        phone:        c.phone ?? "",
        email:        c.email ?? "",
        website:      c.website ?? "",
        verified:     c.verified,
        rating:       c.rating,
        reviewCount:  c.review_count,
        projectCount: c.project_count,
        yearFounded:  c.year_founded ?? 0,
        equipment:    c.equipment,
        software:     c.software,
        tags:         c.tags,
      }))
    }
    if (dbCities.length > 0) cities = dbCities
  } catch (e) {
    // Supabase bağlantısı yoksa JSON dosyalarına düş
    console.warn("[harita] Supabase bağlantısı yok, JSON fallback kullanılıyor:", e)
    firmalar = allCompaniesJson as unknown as MapFirma[]
  }

  // İstatistikler
  const stats = {
    toplamFirma: firmalar.length,
    premium:     firmalar.filter((f) => f.type === "Premium").length,
    onaylı:      firmalar.filter((f) => f.type === "Onaylı").length,
    sehirSayisi: new Set(firmalar.map((f) => f.city_slug)).size,
  }

  return (
    <>
      <MapJsonLd />
      <GeoHeader />

      {/* Sub-header */}
      <div className="bg-[#0A2540] border-b border-blue-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">
                🗺️ GeoHub TR — Firma Haritası
              </h1>
              <p className="text-blue-300 text-xs mt-0.5">
                Türkiye genelinde jeodezi, harita ve lazer tarama firmalarını haritada keşfedin
              </p>
            </div>
            {/* Özet istatistikler */}
            <div className="flex gap-4 text-center">
              {[
                { v: stats.toplamFirma, l: "Kayıtlı Firma" },
                { v: stats.sehirSayisi, l: "Şehir" },
                { v: stats.premium,     l: "Premium" },
                { v: stats.onaylı,      l: "Onaylı" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div className="text-lg font-extrabold text-white">{v}</div>
                  <div className="text-xs text-blue-300">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ana içerik — Client bileşeni (harita + filtre + toggle) */}
      <main className="mx-auto max-w-7xl px-0 sm:px-0">
        <HaritaClient
          firmalar={firmalar}
          services={services}
          cities={cities}
        />
      </main>

      <GeoFooter />
    </>
  )
}
