-- ============================================================
-- GeoHub TR — Supabase Initial Schema
-- Tablo: companies (GIS destekli firma veritabanı)
-- Run: Supabase SQL Editor'da çalıştırın
-- ============================================================

-- PostGIS uzantısı (coğrafi sorgular için)
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── ENUM'lar ─────────────────────────────────────────────────────────────────

CREATE TYPE subscription_tier AS ENUM ('FREE', 'ONAYLI', 'PREMIUM');
CREATE TYPE coverage_type     AS ENUM ('local', 'regional', 'national');

-- ─── FİRMALAR ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS companies (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Temel kimlik
  name          TEXT        NOT NULL,
  slug          TEXT        NOT NULL UNIQUE,
  tier          subscription_tier NOT NULL DEFAULT 'FREE',
  avatar        TEXT,                              -- 1-2 harf veya logo URL
  -- Konum
  city_slug     TEXT        NOT NULL,              -- şehir slug (istanbul, ankara...)
  district      TEXT,                              -- ilçe
  address       TEXT,
  -- GIS Koordinatlar
  lat           DOUBLE PRECISION,
  lng           DOUBLE PRECISION,
  -- PostGIS geometry — otomatik hesaplanır (trigger)
  location      GEOGRAPHY(POINT, 4326),
  -- Kapsam & hizmet illeri
  coverage      coverage_type NOT NULL DEFAULT 'local',
  service_areas TEXT[]       NOT NULL DEFAULT '{}',  -- ['istanbul','ankara',...]
  -- Hizmet kategorileri
  services      TEXT[]       NOT NULL DEFAULT '{}',  -- ['lazer-tarama','bim-modelleme',...]
  -- İçerik
  description   TEXT,
  phone         TEXT,
  email         TEXT,
  website       TEXT,
  -- Sosyal medya
  instagram     TEXT,
  linkedin      TEXT,
  -- Durum & istatistik
  verified      BOOLEAN      NOT NULL DEFAULT FALSE,
  is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
  rating        NUMERIC(3,2) NOT NULL DEFAULT 0.0,
  review_count  INT          NOT NULL DEFAULT 0,
  project_count INT          NOT NULL DEFAULT 0,
  year_founded  INT,
  -- Yapısal array alanlar
  equipment     TEXT[]       NOT NULL DEFAULT '{}',
  software      TEXT[]       NOT NULL DEFAULT '{}',
  tags          TEXT[]       NOT NULL DEFAULT '{}',
  -- Audit
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ─── TRIGGER: lat/lng değişince location güncelle ─────────────────────────────

CREATE OR REPLACE FUNCTION update_company_location()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.lat IS NOT NULL AND NEW.lng IS NOT NULL THEN
    NEW.location := ST_SetSRID(ST_MakePoint(NEW.lng, NEW.lat), 4326)::GEOGRAPHY;
  END IF;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_company_location
  BEFORE INSERT OR UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_company_location();

-- ─── İNDEKSLER ───────────────────────────────────────────────────────────────

CREATE INDEX idx_companies_city_slug  ON companies (city_slug);
CREATE INDEX idx_companies_tier       ON companies (tier);
CREATE INDEX idx_companies_coverage   ON companies (coverage);
CREATE INDEX idx_companies_verified   ON companies (verified);
CREATE INDEX idx_companies_active     ON companies (is_active);
CREATE INDEX idx_companies_location   ON companies USING GIST (location);
CREATE INDEX idx_companies_services   ON companies USING GIN (services);
CREATE INDEX idx_companies_tags       ON companies USING GIN (tags);
CREATE INDEX idx_companies_service_areas ON companies USING GIN (service_areas);

-- ─── ŞEHİRLER ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS cities (
  id       INT  PRIMARY KEY,
  name     TEXT NOT NULL,
  slug     TEXT NOT NULL UNIQUE,
  plaka    INT,
  bolge    TEXT,       -- 'marmara', 'ege', 'akdeniz', 'ic_anadolu', 'karadeniz', 'dogu', 'guneydogu'
  bolge_ad TEXT,       -- 'Marmara', 'Ege', ...
  lat      DOUBLE PRECISION,
  lng      DOUBLE PRECISION,
  location GEOGRAPHY(POINT, 4326)
);

CREATE INDEX idx_cities_slug     ON cities (slug);
CREATE INDEX idx_cities_bolge    ON cities (bolge);
CREATE INDEX idx_cities_location ON cities USING GIST (location);

-- ─── HİZMETLER ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS services (
  id          INT  PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  icon        TEXT,
  service_group     TEXT,   -- 'klasik','3d','gis','ticari','ekipman','egitim'
  group_name  TEXT,
  description TEXT,
  keywords    TEXT[] DEFAULT '{}',
  sub_services JSONB  DEFAULT '[]'  -- [{slug, name}]
);

-- ─── FİRMA-HİZMET TABLOSU (arama optimizasyonu) ──────────────────────────────

CREATE TABLE IF NOT EXISTS company_services (
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  service_slug TEXT NOT NULL,
  PRIMARY KEY (company_id, service_slug)
);

-- ─── ANA ARAMA VIEW'u ─────────────────────────────────────────────────────────
-- Harita ve liste sayfaları bu view'u kullanır

CREATE OR REPLACE VIEW companies_map_view AS
SELECT
  c.id,
  c.name,
  c.slug,
  c.tier,
  c.avatar,
  c.city_slug,
  c.district,
  c.lat,
  c.lng,
  c.coverage,
  c.service_areas,
  c.services,
  c.description,
  c.phone,
  c.email,
  c.website,
  c.verified,
  c.rating,
  c.review_count,
  c.project_count,
  c.year_founded,
  c.equipment,
  c.software,
  c.tags,
  ci.name      AS city_name,
  ci.bolge_ad  AS bolge
FROM companies c
LEFT JOIN cities ci ON ci.slug = c.city_slug
WHERE c.is_active = TRUE
ORDER BY
  CASE c.tier
    WHEN 'PREMIUM' THEN 1
    WHEN 'ONAYLI'  THEN 2
    ELSE                3
  END,
  c.rating DESC;

-- ─── YAKINDAKI FİRMALAR FONKSIYONU ───────────────────────────────────────────
-- Belirli koordinattan km içindeki firmaları getirir

CREATE OR REPLACE FUNCTION companies_near(
  p_lat      DOUBLE PRECISION,
  p_lng      DOUBLE PRECISION,
  p_radius_km DOUBLE PRECISION DEFAULT 100
)
RETURNS TABLE (
  id            UUID,
  name          TEXT,
  slug          TEXT,
  tier          subscription_tier,
  city_slug     TEXT,
  lat           DOUBLE PRECISION,
  lng           DOUBLE PRECISION,
  distance_km   DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id, c.name, c.slug, c.tier, c.city_slug,
    c.lat, c.lng,
    ROUND((ST_Distance(
      c.location,
      ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::GEOGRAPHY
    ) / 1000)::NUMERIC, 1)::DOUBLE PRECISION AS distance_km
  FROM companies c
  WHERE
    c.is_active = TRUE
    AND c.location IS NOT NULL
    AND ST_DWithin(
      c.location,
      ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::GEOGRAPHY,
      p_radius_km * 1000
    )
  ORDER BY c.location <-> ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::GEOGRAPHY;
END;
$$ LANGUAGE plpgsql STABLE;

-- ─── BİR ŞEHİRDE HİZMET VEREN FİRMALAR ──────────────────────────────────────
-- service_areas dizisine bakarak şehirde aktif firma sayısını döner

CREATE OR REPLACE FUNCTION companies_in_city(p_city_slug TEXT)
RETURNS SETOF companies_map_view AS $$
  SELECT * FROM companies_map_view
  WHERE city_slug = p_city_slug
     OR p_city_slug = ANY(service_areas);
$$ LANGUAGE sql STABLE;

-- ─── updated_at TRİGGERI ─────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- ─── RLS (Row Level Security) ────────────────────────────────────────────────
-- Herkese okuma, yazma sadece auth kullanıcılarına

ALTER TABLE companies  ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities     ENABLE ROW LEVEL SECURITY;
ALTER TABLE services   ENABLE ROW LEVEL SECURITY;

-- Herkese okuma (public)
CREATE POLICY "public_read_companies"  ON companies  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_cities"     ON cities     FOR SELECT USING (TRUE);
CREATE POLICY "public_read_services"   ON services   FOR SELECT USING (TRUE);

-- Service role tüm işlemleri yapabilir (admin / seed)
CREATE POLICY "service_role_all_companies" ON companies
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_all_cities" ON cities
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_all_services" ON services
  FOR ALL USING (auth.role() = 'service_role');

-- ─── GRANTs ──────────────────────────────────────────────────────────────────

GRANT SELECT ON companies_map_view TO anon, authenticated;
GRANT EXECUTE ON FUNCTION companies_near TO anon, authenticated;
GRANT EXECUTE ON FUNCTION companies_in_city TO anon, authenticated;
