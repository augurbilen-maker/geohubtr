/**
 * src/lib/db/cities.ts — Şehir sorgu fonksiyonları
 */

import { getServerClient, type City } from "@/lib/supabase"

export async function getAllCities(): Promise<City[]> {
  const sb = getServerClient()
  const { data, error } = await sb
    .from("cities")
    .select("*")
    .order("name", { ascending: true })

  if (error) { console.error("[db/cities] getAllCities:", error.message); return [] }
  return data ?? []
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const sb = getServerClient()
  const { data, error } = await sb
    .from("cities")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) return null
  return data
}
