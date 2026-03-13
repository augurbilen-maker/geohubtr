/**
 * GeoHub TR — Otomatik Sitemap
 *
 * Derleme zamanında üretilen URL'ler:
 *   - Ana sayfalar (statik)
 *   - /lokasyon           → 1 URL
 *   - /lokasyon/[sehir]   → 81 URL
 *   - /lokasyon/[sehir]/[hizmet] → 81 × 15 = 1.215 URL
 *
 * Toplam: ~1.300+ URL
 *
 * Vercel'de `output: 'export'` ya da varsayılan SSG modunda
 * /sitemap.xml olarak servis edilir.
 */

import { MetadataRoute } from "next"
import cities from "@/data/cities.json"
import services from "@/data/services.json"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://geohub.com.tr"

// Öncelik ve güncelleme sıklığı sabitleri
const PRIORITY = {
  home: 1.0,
  lokasyonIndex: 0.9,
  sehir: 0.85,
  sehirHizmet: 0.8,
  hizmet: 0.85,
  static: 0.6,
} as const

const CHANGE_FREQ = {
  daily: "daily" as const,
  weekly: "weekly" as const,
  monthly: "monthly" as const,
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Statik sayfalar ──────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.daily,
      priority: PRIORITY.home,
    },
    {
      url: `${SITE_URL}/lokasyon`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.weekly,
      priority: PRIORITY.lokasyonIndex,
    },
    {
      url: `${SITE_URL}/firmalar`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.daily,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/talep-merkezi`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.daily,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/is-ilanlari`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.daily,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/bilgi-merkezi`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.weekly,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/uyelik`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.monthly,
      priority: PRIORITY.static,
    },
    {
      url: `${SITE_URL}/hakkimizda`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.monthly,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/iletisim`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.monthly,
      priority: 0.5,
    },
  ]

  // ── Hizmet ana sayfaları (/hizmet/[slug]) ────────────────────────────────
  const hizmetPages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/hizmet/${service.slug}`,
    lastModified: now,
    changeFrequency: CHANGE_FREQ.weekly,
    priority: PRIORITY.hizmet,
  }))

  // ── Şehir sayfaları (/lokasyon/[sehir]) — 81 URL ─────────────────────────
  const sehirPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/lokasyon/${city.slug}`,
    lastModified: now,
    changeFrequency: CHANGE_FREQ.weekly,
    priority: PRIORITY.sehir,
  }))

  // ── Şehir × Hizmet kombinasyonları — 81 × 15 = 1.215 URL ─────────────────
  const kombinasyonPages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    services.map((service) => ({
      url: `${SITE_URL}/lokasyon/${city.slug}/${service.slug}`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.weekly,
      priority: PRIORITY.sehirHizmet,
    }))
  )

  return [
    ...staticPages,
    ...hizmetPages,
    ...sehirPages,
    ...kombinasyonPages,
  ]
}
