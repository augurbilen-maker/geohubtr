/**
 * src/lib/supabase.ts
 *
 * Supabase istemci konfigürasyonu — GeoHub TR
 *
 * İki istemci türü:
 * - createBrowserClient  → Client Component, tarayıcıda çalışır (anon key)
 * - createServerClient   → Server Component / API Route (service role key)
 */

import { createClient } from "@supabase/supabase-js"

// ─── Tip Tanımları ────────────────────────────────────────────────────────────

export type SubscriptionTier = "FREE" | "ONAYLI" | "PREMIUM"
export type CoverageType     = "local" | "regional" | "national"

export interface Company {
  id:            string
  name:          string
  slug:          string
  tier:          SubscriptionTier
  avatar:        string | null
  city_slug:     string
  district:      string | null
  address:       string | null
  lat:           number | null
  lng:           number | null
  coverage:      CoverageType
  service_areas: string[]
  services:      string[]
  description:   string | null
  phone:         string | null
  email:         string | null
  website:       string | null
  instagram:     string | null
  linkedin:      string | null
  verified:      boolean
  is_active:     boolean
  rating:        number
  review_count:  number
  project_count: number
  year_founded:  number | null
  equipment:     string[]
  software:      string[]
  tags:          string[]
  created_at:    string
  updated_at:    string
}

// companies_map_view — city_name ve bolge eklendi
export interface CompanyMapView extends Company {
  city_name: string | null
  bolge:     string | null
}

export interface City {
  id:       number
  name:     string
  slug:     string
  plaka:    number
  bolge:    string
  bolge_ad: string
  lat:      number | null
  lng:      number | null
}

export interface Service {
  id:           number
  slug:         string
  name:         string
  icon:         string | null
  service_group: string | null
  group_name:   string | null
  description:  string | null
  keywords:     string[]
  sub_services: Array<{ slug: string; name: string }>
}

// ─── Tip Güvenli Supabase DB Şeması ──────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      companies: { Row: Company; Insert: Partial<Company>; Update: Partial<Company> }
      cities:    { Row: City;    Insert: Partial<City>;    Update: Partial<City>    }
      services:  { Row: Service; Insert: Partial<Service>; Update: Partial<Service> }
    }
    Views: {
      companies_map_view: { Row: CompanyMapView }
    }
    Functions: {
      companies_near: {
        Args: { p_lat: number; p_lng: number; p_radius_km?: number }
        Returns: Array<{
          id: string; name: string; slug: string; tier: SubscriptionTier
          city_slug: string; lat: number; lng: number; distance_km: number
        }>
      }
      companies_in_city: {
        Args: { p_city_slug: string }
        Returns: CompanyMapView[]
      }
    }
  }
}

// ─── ENV Kontrolü ─────────────────────────────────────────────────────────────

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SUPABASE_SRK  = process.env.SUPABASE_SERVICE_ROLE_KEY // sadece server'da

if (!SUPABASE_URL || !SUPABASE_ANON) {
  if (typeof window === "undefined") {
    // Build time'da uyar ama çökme
    console.warn("⚠️  NEXT_PUBLIC_SUPABASE_URL veya NEXT_PUBLIC_SUPABASE_ANON_KEY eksik!")
  }
}

// ─── Browser İstemcisi (Singleton) ────────────────────────────────────────────
// Client Component'larda kullanın

let _browserClient: ReturnType<typeof createClient<Database>> | null = null

export function getBrowserClient() {
  if (!_browserClient) {
    _browserClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  }
  return _browserClient
}

// ─── Server İstemcisi ─────────────────────────────────────────────────────────
// Server Component, API Route, Server Action'larda kullanın
// Service Role Key ile RLS'yi bypass eder (sadece güvenilir server kodunda!)

export function getServerClient() {
  const key = SUPABASE_SRK || SUPABASE_ANON // SRK yoksa anon key ile çalış
  return createClient<Database>(SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

// ─── Varsayılan İhracat ────────────────────────────────────────────────────────
// Geriye dönük uyumluluk + kolay import

/** Server ve build-time kullanımı için */
export const supabase = getServerClient()
