/**
 * src/lib/db/companies.ts
 *
 * Supabase üzerinden firma sorgu fonksiyonları.
 * Server Component / API Route'larda kullanılır.
 */

import { getServerClient, type Company, type CompanyMapView } from "@/lib/supabase"

// ─── Tüm firmalar (harita için) ───────────────────────────────────────────────

export async function getAllCompaniesForMap(): Promise<CompanyMapView[]> {
  const sb = getServerClient()
  const { data, error } = await sb
    .from("companies_map_view")
    .select("*")
    .eq("is_active", true)
    .order("tier", { ascending: false })
    .order("rating", { ascending: false })

  if (error) {
    console.error("[db/companies] getAllCompaniesForMap:", error.message)
    return []
  }
  return data ?? []
}

// ─── Şehire göre firmalar (pSEO lokasyon sayfası) ─────────────────────────────

export async function getCompaniesByCity(citySlug: string): Promise<CompanyMapView[]> {
  const sb = getServerClient()

  // Hem firma o şehirde kurulu, hem de service_areas'a dahil etmişse göster
  const { data, error } = await sb
    .from("companies_map_view")
    .select("*")
    .or(`city_slug.eq.${citySlug},service_areas.cs.{${citySlug}}`)
    .order("tier", { ascending: false })
    .order("rating", { ascending: false })
    .limit(50)

  if (error) {
    console.error("[db/companies] getCompaniesByCity:", error.message)
    return []
  }
  return data ?? []
}

// ─── Şehir + hizmet kombinasyonu (pSEO sehir/hizmet sayfası) ─────────────────

export async function getCompaniesByCityAndService(
  citySlug: string,
  serviceSlug: string
): Promise<CompanyMapView[]> {
  const sb = getServerClient()
  const { data, error } = await sb
    .from("companies_map_view")
    .select("*")
    .or(`city_slug.eq.${citySlug},service_areas.cs.{${citySlug}}`)
    .contains("services", [serviceSlug])
    .order("tier", { ascending: false })
    .order("rating", { ascending: false })
    .limit(30)

  if (error) {
    console.error("[db/companies] getCompaniesByCityAndService:", error.message)
    return []
  }
  return data ?? []
}

// ─── Slug ile tek firma ───────────────────────────────────────────────────────

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const sb = getServerClient()
  const { data, error } = await sb
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error) {
    console.error("[db/companies] getCompanyBySlug:", error.message)
    return null
  }
  return data
}

// ─── Arama (metin + filtre) ───────────────────────────────────────────────────

export interface CompanySearchParams {
  q?:        string   // metin araması (ad, açıklama, tag)
  city?:     string   // şehir slug
  service?:  string   // hizmet slug
  tier?:     string   // 'FREE' | 'ONAYLI' | 'PREMIUM'
  coverage?: string   // 'local' | 'regional' | 'national'
  page?:     number
  limit?:    number
}

export async function searchCompanies(params: CompanySearchParams = {}): Promise<{
  data: CompanyMapView[]
  count: number
}> {
  const { q, city, service, tier, coverage, page = 1, limit = 20 } = params
  const sb = getServerClient()
  let query = sb
    .from("companies_map_view")
    .select("*", { count: "exact" })

  if (q) {
    // Tam metin araması — ad + açıklama + tag
    query = query.or(
      `name.ilike.%${q}%,description.ilike.%${q}%,tags.cs.{${q.toLowerCase()}}`
    )
  }
  if (city) {
    query = query.or(`city_slug.eq.${city},service_areas.cs.{${city}}`)
  }
  if (service) {
    query = query.contains("services", [service])
  }
  if (tier) {
    query = query.eq("tier", tier.toUpperCase())
  }
  if (coverage) {
    query = query.eq("coverage", coverage)
  }

  const from = (page - 1) * limit
  query = query.range(from, from + limit - 1)
  query = query.order("tier", { ascending: false }).order("rating", { ascending: false })

  const { data, error, count } = await query
  if (error) {
    console.error("[db/companies] searchCompanies:", error.message)
    return { data: [], count: 0 }
  }
  return { data: data ?? [], count: count ?? 0 }
}

// ─── Yakındaki firmalar (PostGIS) ─────────────────────────────────────────────

export async function getNearbyCompanies(
  lat: number,
  lng: number,
  radiusKm = 100
) {
  const sb = getServerClient()
  const { data, error } = await sb.rpc("companies_near", {
    p_lat: lat,
    p_lng: lng,
    p_radius_km: radiusKm,
  })

  if (error) {
    console.error("[db/companies] getNearbyCompanies:", error.message)
    return []
  }
  return data ?? []
}

// ─── İstatistikler (dashboard / lokasyon sayfası için) ─────────────────────────

export async function getCityStats(citySlug: string): Promise<{
  total: number
  premium: number
  onayli: number
}> {
  const sb = getServerClient()
  const { data, error } = await sb
    .from("companies_map_view")
    .select("tier")
    .or(`city_slug.eq.${citySlug},service_areas.cs.{${citySlug}}`)

  if (error || !data) return { total: 0, premium: 0, onayli: 0 }
  return {
    total:   data.length,
    premium: data.filter((c) => c.tier === "PREMIUM").length,
    onayli:  data.filter((c) => c.tier === "ONAYLI").length,
  }
}
