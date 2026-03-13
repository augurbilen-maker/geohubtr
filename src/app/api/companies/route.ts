/**
 * GET /api/companies
 *
 * Firma listesini döner. Query parametreleri:
 * - q        : metin araması
 * - city     : şehir slug
 * - service  : hizmet slug
 * - tier     : FREE | ONAYLI | PREMIUM
 * - coverage : local | regional | national
 * - page     : sayfa (varsayılan 1)
 * - limit    : sayfa başına kayıt (varsayılan 20, maks 100)
 * - format   : "map" → sadece GIS alanları, "full" → tüm alanlar
 *
 * Harita ve API tüketicileri bu endpoint'i kullanır.
 */

import { NextRequest, NextResponse } from "next/server"
import { searchCompanies, getAllCompaniesForMap } from "@/lib/db/companies"

// Cache: 60 saniye (ISR uyumlu)
export const revalidate = 60

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const format = searchParams.get("format") ?? "full"
  const limit  = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100)

  // Hiç filtre yoksa harita formatı istenmişse hızlı yol
  const noFilter =
    !searchParams.get("q") &&
    !searchParams.get("city") &&
    !searchParams.get("service") &&
    !searchParams.get("tier") &&
    !searchParams.get("coverage")

  if (noFilter && format === "map") {
    const data = await getAllCompaniesForMap()
    // Harita için sadece gerekli alanlar
    const slim = data.map((c) => ({
      id:            c.id,
      name:          c.name,
      slug:          c.slug,
      tier:          c.tier,
      avatar:        c.avatar,
      city_slug:     c.city_slug,
      city_name:     c.city_name,
      district:      c.district,
      lat:           c.lat,
      lng:           c.lng,
      coverage:      c.coverage,
      service_areas: c.service_areas,
      services:      c.services,
      description:   c.description,
      phone:         c.phone,
      email:         c.email,
      website:       c.website,
      verified:      c.verified,
      rating:        c.rating,
      review_count:  c.review_count,
      tags:          c.tags,
      equipment:     c.equipment,
    }))
    return NextResponse.json({ data: slim, count: slim.length }, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    })
  }

  // Filtreli arama
  const result = await searchCompanies({
    q:        searchParams.get("q")        ?? undefined,
    city:     searchParams.get("city")     ?? undefined,
    service:  searchParams.get("service")  ?? undefined,
    tier:     searchParams.get("tier")     ?? undefined,
    coverage: searchParams.get("coverage") ?? undefined,
    page:     parseInt(searchParams.get("page") ?? "1"),
    limit,
  })

  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" },
  })
}
