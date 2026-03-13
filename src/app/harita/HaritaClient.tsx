"use client"

/**
 * HaritaClient — Harita sayfasının tüm interaktif mantığı
 *
 * - Filtre paneli (hizmet, şehir, tip, kapsam)
 * - Harita / Liste görünüm toggle
 * - Seçili firmada sidebar detayı
 */

import { useState, useMemo } from "react"
import Link from "next/link"
import GeoMapWrapper from "@/components/geo/GeoMapWrapper"
import type { MapFirma } from "@/components/geo/GeoMap"

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Service {
  id: number
  slug: string
  name: string
  icon: string
}

interface City {
  id: number
  name: string
  slug: string
}

interface Props {
  firmalar: MapFirma[]
  services: Service[]
  cities: City[]
}

const SERVICE_NAMES: Record<string, string> = {
  "rolove": "Rölöve", "eski-eser-rolovesi": "Eski Eser Rölövesi",
  "halihazir-harita": "Halihazır Harita", "aplikasyon-ifraz": "Aplikasyon & İfraz",
  "lihkab": "LİHKAB", "insaat-kontrol": "İnşaat Kontrol", "maden-ocak": "Maden & Ocak",
  "lazer-tarama": "Lazer Tarama", "bim-modelleme": "BIM Modelleme",
  "fotogrametri": "Fotogrametri", "drone-iha": "Drone / İHA", "cbs-gis": "CBS / GIS",
  "gayrimenkul-degerleme": "Gayrimenkul Değerleme",
  "cihaz-satis-kiralama": "Cihaz Satış & Kiralama", "egitim-kurumu": "Eğitim Kurumu",
}

function TierBadge({ type }: { type: string }) {
  if (type === "Premium")
    return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold border border-amber-200">⭐ Premium</span>
  if (type === "Onaylı")
    return <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">✓ Onaylı</span>
  return <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">Üye</span>
}

function CoverageTag({ coverage }: { coverage: string }) {
  const map: Record<string, string> = {
    national: "🌍 Ulusal", regional: "🔵 Bölgesel", local: "📍 Yerel"
  }
  return (
    <span className="text-xs text-slate-500">{map[coverage] || coverage}</span>
  )
}

// ─── ANA BİLEŞEN ─────────────────────────────────────────────────────────────

export default function HaritaClient({ firmalar, services, cities }: Props) {
  const [view, setView] = useState<"harita" | "liste">("harita")
  const [selectedFirmaId, setSelectedFirmaId] = useState<number | null>(null)
  const [filterHizmet, setFilterHizmet] = useState("")
  const [filterSehir, setFilterSehir] = useState("")
  const [filterTip, setFilterTip] = useState("")
  const [filterKapsam, setFilterKapsam] = useState("")
  const [searchText, setSearchText] = useState("")
  const [showFilters, setShowFilters] = useState(true)

  // Filtrelenmiş firma listesi
  const filtrelenmis = useMemo(() => {
    return firmalar.filter((f) => {
      if (filterHizmet && !f.services.includes(filterHizmet)) return false
      if (filterSehir && f.city_slug !== filterSehir && !f.serviceAreas?.includes(filterSehir)) return false
      if (filterTip && f.type !== filterTip) return false
      if (filterKapsam && f.coverage !== filterKapsam) return false
      if (searchText) {
        const q = searchText.toLowerCase()
        if (
          !f.name.toLowerCase().includes(q) &&
          !f.description.toLowerCase().includes(q) &&
          !(f.tags || []).some((t) => t.toLowerCase().includes(q))
        ) return false
      }
      return true
    })
  }, [firmalar, filterHizmet, filterSehir, filterTip, filterKapsam, searchText])

  const selectedFirma = firmalar.find((f) => f.id === selectedFirmaId) || null

  const hasFilter = filterHizmet || filterSehir || filterTip || filterKapsam || searchText

  const clearFilters = () => {
    setFilterHizmet(""); setFilterSehir(""); setFilterTip("")
    setFilterKapsam(""); setSearchText("")
  }

  return (
    <div className="flex flex-col">
      {/* Kontrol çubuğu */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center gap-3">
        {/* Liste/Harita toggle */}
        <div className="flex items-center gap-0 border border-slate-200 rounded-lg overflow-hidden shrink-0">
          <button
            onClick={() => setView("harita")}
            className={[
              "px-3 py-1.5 text-sm font-semibold transition-colors",
              view === "harita" ? "bg-[#0A2540] text-white" : "bg-white text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            🗺️ Harita
          </button>
          <button
            onClick={() => setView("liste")}
            className={[
              "px-3 py-1.5 text-sm font-semibold transition-colors",
              view === "liste" ? "bg-[#0A2540] text-white" : "bg-white text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            📋 Liste
          </button>
        </div>

        {/* Arama */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Firma veya etiket ara..."
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-800"
          />
        </div>

        {/* Filtre toggle */}
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={[
            "text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors shrink-0",
            showFilters ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600",
          ].join(" ")}
        >
          ⚙️ Filtreler {hasFilter ? `(${[filterHizmet, filterSehir, filterTip, filterKapsam, searchText].filter(Boolean).length})` : ""}
        </button>

        {/* Sonuç sayısı */}
        <span className="text-xs text-slate-500 ml-auto">
          <strong className="text-slate-800">{filtrelenmis.length}</strong> firma gösteriliyor
          {hasFilter && (
            <button onClick={clearFilters} className="ml-2 text-red-500 hover:text-red-700 font-medium">
              ✕ Temizle
            </button>
          )}
        </span>
      </div>

      {/* Filtre paneli */}
      {showFilters && (
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={filterHizmet}
              onChange={(e) => setFilterHizmet(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Tüm Hizmetler</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>{s.icon} {s.name}</option>
              ))}
            </select>

            <select
              value={filterSehir}
              onChange={(e) => setFilterSehir(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Tüm Şehirler</option>
              {cities.sort((a, b) => a.name.localeCompare(b.name, "tr")).map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>

            <select
              value={filterTip}
              onChange={(e) => setFilterTip(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Tüm Tipler</option>
              <option value="Premium">⭐ Premium</option>
              <option value="Onaylı">✓ Onaylı</option>
              <option value="Üye">Üye</option>
            </select>

            <select
              value={filterKapsam}
              onChange={(e) => setFilterKapsam(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Tüm Kapsam</option>
              <option value="national">🌍 Ulusal</option>
              <option value="regional">🔵 Bölgesel</option>
              <option value="local">📍 Yerel</option>
            </select>
          </div>
        </div>
      )}

      {/* Harita görünümü */}
      {view === "harita" && (
        <div className="flex" style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>
          {/* Sol: Firma listesi (mini) */}
          <div className="w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-white">
            <div className="p-3 border-b border-slate-100 bg-slate-50">
              <span className="text-xs font-semibold text-slate-600">
                {filtrelenmis.length} firma listelendi
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {filtrelenmis.map((firma) => (
                <button
                  key={firma.id}
                  onClick={() => setSelectedFirmaId(firma.id === selectedFirmaId ? null : firma.id)}
                  className={[
                    "w-full text-left p-3 hover:bg-blue-50 transition-colors",
                    firma.id === selectedFirmaId ? "bg-blue-50 border-l-2 border-blue-500" : "",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ background: firma.type === "Premium" ? "#f59e0b" : firma.type === "Onaylı" ? "#10b981" : "#94a3b8" }}
                    >
                      {firma.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">{firma.name}</div>
                      <div className="text-xs text-slate-400 truncate">📍 {firma.city_slug}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {firma.services.slice(0, 2).map((s) => (
                      <span key={s} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">
                        {SERVICE_NAMES[s]?.slice(0, 12) || s}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
              {filtrelenmis.length === 0 && (
                <div className="p-6 text-center text-slate-400 text-sm">
                  Filtre kriterlerinize uygun firma bulunamadı
                </div>
              )}
            </div>
          </div>

          {/* Sağ: Harita */}
          <div className="flex-1 relative">
            <GeoMapWrapper
              firmalar={filtrelenmis}
              height="100%"
              selectedFirmaId={selectedFirmaId}
              onFirmaSelect={(f) => setSelectedFirmaId(f?.id ?? null)}
            />

            {/* Seçili firma detay overlay */}
            {selectedFirma && (
              <div className="absolute bottom-4 left-4 w-72 bg-white/98 backdrop-blur-sm rounded-xl border border-slate-200 shadow-xl p-4 z-[900]">
                <button
                  onClick={() => setSelectedFirmaId(null)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 text-lg leading-none"
                >×</button>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ background: selectedFirma.type === "Premium" ? "#f59e0b" : "#10b981" }}
                  >
                    {selectedFirma.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{selectedFirma.name}</div>
                    <TierBadge type={selectedFirma.type} />
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">
                  {selectedFirma.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <CoverageTag coverage={selectedFirma.coverage} />
                  {selectedFirma.rating && (
                    <span className="text-xs text-slate-500">⭐ {selectedFirma.rating}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {selectedFirma.services.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {SERVICE_NAMES[s] || s}
                    </span>
                  ))}
                </div>
                <div className="mb-2.5">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Hizmet Alanları ({selectedFirma.serviceAreas?.length || 0} il)
                  </div>
                  <div className="text-xs text-slate-600 line-clamp-2">
                    {selectedFirma.serviceAreas?.slice(0, 8).join(", ")}
                    {(selectedFirma.serviceAreas?.length || 0) > 8 ? "..." : ""}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/firma/${selectedFirma.slug}`}
                    className="flex-1 text-center py-2 rounded-lg bg-[#0A2540] text-white text-xs font-semibold hover:bg-blue-900 transition-colors"
                  >
                    Profil →
                  </Link>
                  <Link
                    href={`/talep-olustur?firma=${selectedFirma.slug}`}
                    className="flex-1 text-center py-2 rounded-lg border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Teklif İste
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Liste görünümü */}
      {view === "liste" && (
        <div className="mx-auto w-full max-w-5xl px-4 py-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtrelenmis.map((firma) => (
              <div
                key={firma.id}
                className={[
                  "rounded-xl border bg-white p-4 hover:shadow-md transition-all cursor-pointer",
                  firma.type === "Premium" ? "border-amber-200 bg-gradient-to-br from-amber-50/60 to-white" : "border-slate-200 hover:border-blue-200",
                ].join(" ")}
                onClick={() => { setView("harita"); setSelectedFirmaId(firma.id) }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ background: firma.type === "Premium" ? "#f59e0b" : firma.type === "Onaylı" ? "#10b981" : "#94a3b8" }}
                  >
                    {firma.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-900 truncate">{firma.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <TierBadge type={firma.type} />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mb-2 flex items-center gap-3">
                  <span>📍 {firma.city_slug}</span>
                  <CoverageTag coverage={firma.coverage} />
                  {firma.rating && <span>⭐ {firma.rating}</span>}
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 mb-3">{firma.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {firma.services.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {SERVICE_NAMES[s]?.slice(0, 14) || s}
                    </span>
                  ))}
                </div>
                <button className="w-full text-xs font-semibold py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  🗺️ Haritada Göster
                </button>
              </div>
            ))}
          </div>
          {filtrelenmis.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>Filtre kriterlerinize uygun firma bulunamadı.</p>
              <button onClick={clearFilters} className="mt-3 text-blue-600 text-sm hover:underline">Filtreleri temizle</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
