"use client"

/**
 * GeoMap — Leaflet.js tabanlı interaktif harita bileşeni
 *
 * Özellikler:
 * - Firma konumlarını (lat/lng) haritada pin olarak gösterir
 * - Firma tipine göre renkli markerlar (Premium=altın, Onaylı=yeşil, Üye=gri)
 * - Hizmet alanlarını (serviceAreas) circle overlay ile gösterir
 * - Popup'ta firma detayı + profil linki
 * - Filtre: hizmet, şehir, tip
 * - Tile: OpenStreetMap (ücretsiz) veya Google Maps (API key ile)
 * - SSR-safe: dynamic import ile yüklenir
 */

import { useEffect, useRef, useState } from "react"

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface MapFirma {
  id: number
  name: string
  slug: string
  type: "Premium" | "Onaylı" | "Üye"
  lat: number
  lng: number
  city_slug: string
  district?: string
  services: string[]
  description: string
  rating?: number
  reviewCount?: number
  verified?: boolean
  coverage: "local" | "regional" | "national"
  serviceAreas: string[]
  tags?: string[]
}

interface GeoMapProps {
  firmalar: MapFirma[]
  /** Haritanın başlangıç merkezi; default Türkiye merkezi */
  center?: [number, number]
  zoom?: number
  /** Google Maps API key (boş bırakılırsa OpenStreetMap kullanılır) */
  googleMapsApiKey?: string
  height?: string
  /** Seçili firma ID'si — dışarıdan kontrol için */
  selectedFirmaId?: number | null
  onFirmaSelect?: (firma: MapFirma | null) => void
}

// ─── YARDIMCI: Şehir → koordinat (serviceArea overlay için) ─────────────────

const CITY_COORDS: Record<string, [number, number]> = {
  istanbul: [41.015, 28.979], ankara: [39.933, 32.860], izmir: [38.419, 27.129],
  bursa: [40.183, 29.067], antalya: [36.897, 30.713], trabzon: [41.002, 39.718],
  kocaeli: [40.767, 29.918], samsun: [41.287, 36.330], eskisehir: [39.767, 30.526],
  adana: [37.000, 35.321], gaziantep: [37.066, 37.383], konya: [37.871, 32.484],
  mersin: [36.812, 34.641], kayseri: [38.734, 35.467], erzurum: [39.900, 41.267],
  diyarbakir: [37.925, 40.216], malatya: [38.357, 38.317], hatay: [36.202, 36.160],
  kirikkale: [39.845, 33.514], aksaray: [38.369, 34.036], nevsehir: [38.625, 34.714],
  kirsehir: [39.145, 34.160], yozgat: [39.820, 34.808], cankiri: [40.599, 33.612],
  karaman: [37.178, 33.216], sivas: [39.748, 37.017], ordu: [40.984, 37.879],
  giresun: [40.912, 38.390], rize: [41.021, 40.523], artvin: [41.182, 41.818],
  gumushane: [40.460, 39.481], bayburt: [40.261, 40.224], sinop: [42.025, 35.151],
  kastamonu: [41.376, 33.776], bartin: [41.635, 32.337], karabuk: [41.200, 32.634],
  bolu: [40.735, 31.606], duzce: [40.844, 31.157], zonguldak: [41.456, 31.789],
  sakarya: [40.684, 30.427], kocaeli_alt: [40.767, 29.918], bilecik: [40.142, 30.066],
  yalova: [40.655, 29.275], tekirdag: [40.977, 27.515], kirklareli: [41.735, 27.225],
  edirne: [41.677, 26.556], canakkale: [40.148, 26.406], balikesir: [39.649, 27.889],
  aydin: [37.855, 27.840], denizli: [37.773, 29.089], mugla: [37.215, 28.363],
  manisa: [38.619, 27.426], afyonkarahisar: [38.757, 30.541], kutahya: [39.415, 29.984],
  usak: [38.682, 29.408], isparta: [37.764, 30.556], burdur: [37.720, 30.291],
  kahramanmaras: [37.586, 36.937], osmaniye: [37.074, 36.247], adiyaman: [37.764, 38.277],
  sanliurfa: [37.159, 38.796], mardin: [37.312, 40.733], batman: [37.882, 41.133],
  sirnak: [37.519, 42.462], siirt: [37.930, 41.942], kilis: [36.718, 37.116],
  van: [38.501, 43.381], mus: [38.745, 41.500], bitlis: [38.401, 42.107],
  elazig: [38.680, 39.226], tunceli: [39.108, 39.547], bingol: [38.886, 40.499],
  hakkari: [37.574, 43.741], agri: [39.719, 43.061], kars: [40.601, 43.097],
  ardahan: [41.112, 42.703], igdir: [39.888, 44.012], erzincan: [39.750, 39.500],
  nigde: [37.969, 34.679], niğde: [37.969, 34.679],
}

// ─── RENK & İKON YARDIMCILARI ─────────────────────────────────────────────────

function getTierColor(type: string): string {
  if (type === "Premium") return "#f59e0b"   // amber
  if (type === "Onaylı")  return "#10b981"   // emerald
  return "#94a3b8"                            // slate
}

function getCoverageRadius(coverage: string): number {
  if (coverage === "national")  return 250000  // 250 km
  if (coverage === "regional")  return 150000  // 150 km
  return 80000                                  // 80 km local
}

// ─── ANA BİLEŞEN ─────────────────────────────────────────────────────────────

export default function GeoMap({
  firmalar,
  center = [39.1, 35.4], // Türkiye ortası
  zoom = 6,
  googleMapsApiKey,
  height = "600px",
  selectedFirmaId,
  onFirmaSelect,
}: GeoMapProps) {
  const mapRef = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<Map<number, any>>(new Map())
  const circlesRef = useRef<Map<number, any[]>>(new Map())
  const [isLoaded, setIsLoaded] = useState(false)
  const [showServiceAreas, setShowServiceAreas] = useState(false)
  const [leaflet, setLeaflet] = useState<any>(null)

  // Leaflet'i sadece client'ta yükle (SSR-safe)
  useEffect(() => {
    let isMounted = true
    Promise.all([
      import("leaflet"),
      import("leaflet/dist/leaflet.css" as any),
    ]).then(([L]) => {
      if (!isMounted) return
      // Default icon fix
      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      })
      L.Marker.prototype.options.icon = icon
      setLeaflet(L)
    }).catch(console.error)
    return () => { isMounted = false }
  }, [])

  // Haritayı başlat
  useEffect(() => {
    if (!leaflet || !mapRef.current || mapInstanceRef.current) return

    // Tile seçimi: Google Maps (API key varsa) veya OpenStreetMap
    const tileUrl = googleMapsApiKey
      ? `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${googleMapsApiKey}`
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

    const attribution = googleMapsApiKey
      ? "© Google Maps"
      : '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

    const map = leaflet.map(mapRef.current, {
      center,
      zoom,
      zoomControl: true,
    })

    leaflet.tileLayer(tileUrl, {
      attribution,
      maxZoom: 18,
    }).addTo(map)

    mapInstanceRef.current = map
    setIsLoaded(true)

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [leaflet])

  // Markerları güncelle
  useEffect(() => {
    if (!leaflet || !mapInstanceRef.current || !isLoaded) return
    const map = mapInstanceRef.current

    // Eski markerları temizle
    markersRef.current.forEach((m) => m.remove())
    markersRef.current.clear()
    circlesRef.current.forEach((circles) => circles.forEach((c) => c.remove()))
    circlesRef.current.clear()

    firmalar.forEach((firma) => {
      if (!firma.lat || !firma.lng) return

      const isSelected = firma.id === selectedFirmaId
      const color = getTierColor(firma.type)

      // Özel SVG marker ikonu
      const svgIcon = leaflet.divIcon({
        className: "",
        html: `
          <div style="
            width:${isSelected ? 40 : 32}px;
            height:${isSelected ? 40 : 32}px;
            background:${color};
            border:${isSelected ? "3px" : "2px"} solid white;
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            box-shadow:0 2px 8px rgba(0,0,0,0.3);
            transition:all .2s;
            cursor:pointer;
          ">
            <div style="
              width:100%;height:100%;
              display:flex;align-items:center;justify-content:center;
              transform:rotate(45deg);
              font-size:${isSelected ? 16 : 13}px;
              font-weight:700;
              color:white;
            ">${firma.name.charAt(0)}</div>
          </div>`,
        iconSize: [isSelected ? 40 : 32, isSelected ? 40 : 32],
        iconAnchor: [isSelected ? 20 : 16, isSelected ? 40 : 32],
        popupAnchor: [0, isSelected ? -42 : -34],
      })

      // Popup içeriği
      const popupContent = `
        <div style="font-family:system-ui,sans-serif;min-width:220px;max-width:280px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <div style="width:36px;height:36px;background:${color};border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:16px;flex-shrink:0">${firma.name.charAt(0)}</div>
            <div>
              <div style="font-weight:700;font-size:14px;color:#0f172a">${firma.name}</div>
              <div style="font-size:11px;margin-top:1px">
                <span style="background:${firma.type === "Premium" ? "#fef3c7" : firma.type === "Onaylı" ? "#d1fae5" : "#f1f5f9"};color:${firma.type === "Premium" ? "#92400e" : firma.type === "Onaylı" ? "#065f46" : "#475569"};padding:1px 6px;border-radius:10px;font-weight:600">${firma.type === "Premium" ? "⭐ Premium" : firma.type === "Onaylı" ? "✓ Onaylı" : "Üye"}</span>
                ${firma.verified ? '<span style="margin-left:4px;color:#2563eb;font-size:10px">✔ Doğrulandı</span>' : ""}
              </div>
            </div>
          </div>
          <p style="font-size:12px;color:#475569;line-height:1.5;margin:0 0 8px">${firma.description.slice(0, 120)}...</p>
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px">
            ${firma.services.slice(0, 3).map(s => `<span style="font-size:10px;padding:2px 8px;background:#eff6ff;color:#1d4ed8;border-radius:10px;border:1px solid #bfdbfe">${s.replace(/-/g, " ")}</span>`).join("")}
          </div>
          ${firma.rating ? `<div style="font-size:11px;color:#94a3b8;margin-bottom:8px">⭐ ${firma.rating} · ${firma.reviewCount} yorum</div>` : ""}
          <div style="display:flex;gap:6px">
            <a href="/firma/${firma.slug}" style="flex:1;text-align:center;padding:6px;background:#0A2540;color:white;border-radius:6px;font-size:11px;font-weight:600;text-decoration:none">Profil →</a>
            <a href="/talep-olustur?firma=${firma.slug}" style="flex:1;text-align:center;padding:6px;background:white;color:#0A2540;border:1px solid #bfdbfe;border-radius:6px;font-size:11px;font-weight:600;text-decoration:none">Teklif İste</a>
          </div>
        </div>`

      const marker = leaflet.marker([firma.lat, firma.lng], { icon: svgIcon })
        .addTo(map)
        .bindPopup(popupContent, { maxWidth: 300, className: "geohub-popup" })

      marker.on("click", () => onFirmaSelect?.(firma))
      markersRef.current.set(firma.id, marker)

      // Hizmet alanı daireleri
      if (showServiceAreas && firma.serviceAreas) {
        const circles: any[] = []

        // Ana konum büyük yarı saydam daire
        const mainCircle = leaflet.circle([firma.lat, firma.lng], {
          radius: getCoverageRadius(firma.coverage),
          color,
          fillColor: color,
          fillOpacity: 0.06,
          weight: 1.5,
          dashArray: "6 4",
        }).addTo(map)
        circles.push(mainCircle)

        // Hizmet verilen şehir noktaları
        firma.serviceAreas.forEach((areaSlug) => {
          const coords = CITY_COORDS[areaSlug]
          if (!coords || (coords[0] === firma.lat && coords[1] === firma.lng)) return
          const dot = leaflet.circleMarker(coords, {
            radius: 5,
            color,
            fillColor: color,
            fillOpacity: 0.5,
            weight: 1.5,
          }).addTo(map)
          dot.bindTooltip(areaSlug.charAt(0).toUpperCase() + areaSlug.slice(1), {
            permanent: false,
            direction: "top",
          })
          circles.push(dot)
        })

        circlesRef.current.set(firma.id, circles)
      }
    })
  }, [leaflet, isLoaded, firmalar, selectedFirmaId, showServiceAreas])

  // Seçili firmaya zoom
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedFirmaId) return
    const firma = firmalar.find((f) => f.id === selectedFirmaId)
    if (!firma?.lat) return
    mapInstanceRef.current.setView([firma.lat, firma.lng], 12, { animate: true })
    markersRef.current.get(selectedFirmaId)?.openPopup()
  }, [selectedFirmaId])

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ height }}>
      {/* Harita kontrolleri */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
        <button
          onClick={() => setShowServiceAreas((v) => !v)}
          className={[
            "text-xs px-3 py-2 rounded-lg font-semibold shadow-md transition-colors",
            showServiceAreas
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 hover:bg-blue-50 border border-slate-200",
          ].join(" ")}
          title="Hizmet alanı dairelerini göster/gizle"
        >
          🗺️ Hizmet Alanları
        </button>
        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setView(center, zoom, { animate: true })
            }
            onFirmaSelect?.(null)
          }}
          className="text-xs px-3 py-2 rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-md font-semibold transition-colors"
        >
          📍 Türkiye
        </button>
      </div>

      {/* Lejant */}
      <div className="absolute bottom-8 left-3 z-[1000] bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl px-3 py-2.5 shadow-md text-xs">
        <div className="font-semibold text-slate-700 mb-1.5">Firma Tipi</div>
        {[
          { color: "#f59e0b", label: "⭐ Premium" },
          { color: "#10b981", label: "✓ Onaylı" },
          { color: "#94a3b8", label: "Üye" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2 mb-0.5">
            <div className="w-3 h-3 rounded-full" style={{ background: color }} />
            <span className="text-slate-600">{label}</span>
          </div>
        ))}
      </div>

      {/* Yükleniyor */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center z-[999]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-slate-500">Harita yükleniyor...</span>
          </div>
        </div>
      )}

      {/* Leaflet container */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}
