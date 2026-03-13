// GeoHub TR — Firma Dizini
// URL params: ?kategori=lihkab&sehir=eskisehir&bolge=ic_anadolu&tip=PREMIUM&q=jeodezi
// Kategori + şehir kombinasyonu = "Eskişehir'deki LİHKAB Büroları" gibi güçlü sorgular

import Link from "next/link"
import { Search, MapPin, Filter, ChevronDown, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
  TÜM_İLLER,
  BOLGE_ADLARI,
  BOLGE_RENK,
  getBolgeGrubu,
  getOneCikanIller,
  getIlBySlug,
  type BolgeKey,
} from "@/lib/provinces"
import { HIZMET_KATEGORİLERİ, KATEGORİ_GRUPLARI } from "@/lib/service-categories"

// ─── Tip tanımları ────────────────────────────────────────────────────────────

interface FirmaKarti {
  slug: string
  ad: string
  sehir: string
  ilce?: string
  sehirSlug: string
  tier: "FREE" | "ONAYLI" | "PREMIUM"
  onaylı: boolean
  aciklama: string
  hizmetler: string[]
  kategoriler: string[]
  viewCount: number
}

// ─── Örnek veri ───────────────────────────────────────────────────────────────

const TÜM_FİRMALAR: FirmaKarti[] = [
  {
    slug: "geodezik-muhendislik",
    ad: "Geodezik Mühendislik Ltd. Şti.",
    sehir: "İstanbul", ilce: "Kadıköy", sehirSlug: "istanbul",
    tier: "PREMIUM", onaylı: true,
    aciklama: "15 yıllık deneyim, Leica & Trimble ekipmanlarıyla kentsel dönüşüm ve restorasyon projeleri. Tüm Türkiye'ye hizmet.",
    hizmetler: ["Rölöve", "Lazer Tarama", "BIM Modelleme", "Halihazır Harita"],
    kategoriler: ["ROLOVE", "LAZER_TARAMA", "BIM_MODELLEME", "HALIHAZIR_HARITA"],
    viewCount: 1240,
  },
  {
    slug: "izmir-lazer-tarama",
    ad: "İzmir Lazer Tarama Teknolojileri A.Ş.",
    sehir: "İzmir", ilce: "Konak", sehirSlug: "izmir",
    tier: "PREMIUM", onaylı: true,
    aciklama: "Endüstriyel tesis, tarihi yapı ve altyapı projelerinde 3D lazer tarama. Leica RTC360 & FARO Focus filosu.",
    hizmetler: ["Lazer Tarama", "Nokta Bulutu", "BIM Modelleme", "Fotogrametri"],
    kategoriler: ["LAZER_TARAMA", "BIM_MODELLEME", "FOTOGRAMETRI"],
    viewCount: 980,
  },
  {
    slug: "skymap-drone",
    ad: "SkyMap Drone Teknolojileri",
    sehir: "İstanbul", ilce: "Maltepe", sehirSlug: "istanbul",
    tier: "PREMIUM", onaylı: true,
    aciklama: "Tarım, madencilik ve altyapı projelerinde insansız hava aracı haritalama. DJI Matrice & Phantom 4 RTK filosu.",
    hizmetler: ["Drone Haritalama", "Ortofoto", "DSM Üretimi", "Kübaj Hesabı"],
    kategoriler: ["DRONE_HARITALAMA", "FOTOGRAMETRI"],
    viewCount: 870,
  },
  {
    slug: "ankara-topografya",
    ad: "Ankara Topografya A.Ş.",
    sehir: "Ankara", ilce: "Çankaya", sehirSlug: "ankara",
    tier: "ONAYLI", onaylı: true,
    aciklama: "Kamu ve özel sektör projelerinde halihazır harita, aplikasyon ve kadastro hizmetleri.",
    hizmetler: ["Halihazır Harita", "Aplikasyon", "Kadastro", "CBS/GIS"],
    kategoriler: ["HALIHAZIR_HARITA", "APLIKASYON", "CBS_GIS"],
    viewCount: 540,
  },
  {
    slug: "bursa-kadastro",
    ad: "Bursa Kadastro & Harita Bürosu",
    sehir: "Bursa", ilce: "Osmangazi", sehirSlug: "bursa",
    tier: "FREE", onaylı: false,
    aciklama: "20 yıllık kadastro ve tapu tescil deneyimi. LİHKAB yetkili büro.",
    hizmetler: ["LİHKAB", "Tapu Tescil", "Aplikasyon", "Kadastro"],
    kategoriler: ["LIHKAB", "APLIKASYON"],
    viewCount: 210,
  },
  {
    slug: "eskisehir-lihkab",
    ad: "Eskişehir LİHKAB — Doğu Harita Bürosu",
    sehir: "Eskişehir", ilce: "Odunpazarı", sehirSlug: "eskisehir",
    tier: "ONAYLI", onaylı: true,
    aciklama: "Eskişehir'de TKGM yetkili lisanslı harita ve kadastro bürosu. Tapu tescil, cins değişikliği, irtifak hakkı tesisi.",
    hizmetler: ["LİHKAB", "Tapu Tescil", "Cins Değişikliği", "İrtifak Hakkı"],
    kategoriler: ["LIHKAB", "APLIKASYON"],
    viewCount: 185,
  },
  {
    slug: "eskisehir-geotek",
    ad: "Eskişehir GeoTek Mühendislik",
    sehir: "Eskişehir", ilce: "Tepebaşı", sehirSlug: "eskisehir",
    tier: "ONAYLI", onaylı: true,
    aciklama: "Eskişehir ve çevresinde rölöve, aplikasyon, halihazır harita ve drone haritalama hizmetleri.",
    hizmetler: ["Rölöve", "Aplikasyon", "Drone Haritalama", "Halihazır Harita"],
    kategoriler: ["ROLOVE", "APLIKASYON", "DRONE_HARITALAMA", "HALIHAZIR_HARITA"],
    viewCount: 320,
  },
  {
    slug: "trabzon-harita",
    ad: "Trabzon Harita ve Mühendislik",
    sehir: "Trabzon", ilce: "Ortahisar", sehirSlug: "trabzon",
    tier: "FREE", onaylı: false,
    aciklama: "Karadeniz bölgesinde harita mühendisliği hizmetleri.",
    hizmetler: ["Rölöve", "Aplikasyon", "Halihazır Harita"],
    kategoriler: ["ROLOVE", "APLIKASYON", "HALIHAZIR_HARITA"],
    viewCount: 92,
  },
  {
    slug: "konya-insaat-olcum",
    ad: "Konya İnşaat Ölçüm Ltd.",
    sehir: "Konya", ilce: "Selçuklu", sehirSlug: "konya",
    tier: "FREE", onaylı: false,
    aciklama: "İnşaat kontrol, aplikasyon ve metraj hizmetleri. Konya ve çevre illere hizmet.",
    hizmetler: ["İnşaat Kontrol", "Aplikasyon", "Metraj"],
    kategoriler: ["INSAAT_KONTROL", "APLIKASYON"],
    viewCount: 145,
  },
  {
    slug: "ankara-gis-cozumleri",
    ad: "Ankara GIS Çözümleri A.Ş.",
    sehir: "Ankara", ilce: "Yenimahalle", sehirSlug: "ankara",
    tier: "PREMIUM", onaylı: true,
    aciklama: "Belediye, kamu ve özel sektör için mekânsal veri analizi, WebGIS ve mobil haritalama çözümleri.",
    hizmetler: ["CBS/GIS", "WebGIS", "Mekânsal Analiz", "Drone"],
    kategoriler: ["CBS_GIS", "DRONE_HARITALAMA"],
    viewCount: 670,
  },
  {
    slug: "metropol-degerleme",
    ad: "Metropol Gayrimenkul Değerleme",
    sehir: "İstanbul", ilce: "Şişli", sehirSlug: "istanbul",
    tier: "ONAYLI", onaylı: true,
    aciklama: "SPK lisanslı gayrimenkul değerleme firması. Konut, ticari gayrimenkul, arsa ve arazi ekspertizi.",
    hizmetler: ["SPK Lisanslı", "Konut Ekspertizi", "Ticari GYO", "Arsa Değerleme"],
    kategoriler: ["GAYRIMENKUL_DEGERLEME"],
    viewCount: 430,
  },
  {
    slug: "ankara-lihkab-merkez",
    ad: "Ankara LİHKAB Merkez Bürosu",
    sehir: "Ankara", ilce: "Altındağ", sehirSlug: "ankara",
    tier: "ONAYLI", onaylı: true,
    aciklama: "Ankara merkez ve ilçelerinde TKGM yetkili LİHKAB bürosu. Tüm kadastral işlemler.",
    hizmetler: ["LİHKAB", "Tapu Tescil", "Cins Değişikliği", "Kadastro Tashihi"],
    kategoriler: ["LIHKAB"],
    viewCount: 295,
  },
]

// ─── Filtre & sıralama ────────────────────────────────────────────────────────

interface SearchParams {
  q?: string
  kategori?: string
  sehir?: string
  bolge?: string
  tip?: string
}

function firmalariFiltrele(firmalar: FirmaKarti[], p: SearchParams): FirmaKarti[] {
  let r = [...firmalar]
  if (p.q) {
    const q = p.q.toLowerCase()
    r = r.filter(f =>
      f.ad.toLowerCase().includes(q) ||
      f.aciklama.toLowerCase().includes(q) ||
      f.hizmetler.some(h => h.toLowerCase().includes(q))
    )
  }
  if (p.kategori) {
    const e = p.kategori.toUpperCase().replace(/-/g,"_")
    r = r.filter(f => f.kategoriler.includes(e))
  }
  if (p.sehir)  r = r.filter(f => f.sehirSlug === p.sehir)
  if (p.bolge && !p.sehir) {
    const slugs = TÜM_İLLER.filter(il => il.bolge === p.bolge).map(il => il.slug)
    r = r.filter(f => slugs.includes(f.sehirSlug))
  }
  if (p.tip)    r = r.filter(f => f.tier === p.tip)
  const skor = (t: string) => t === "PREMIUM" ? 3 : t === "ONAYLI" ? 2 : 1
  r.sort((a,b) => skor(b.tier) - skor(a.tier) || b.viewCount - a.viewCount)
  return r
}

function sayfaBasligi(p: SearchParams): string {
  const kat = HIZMET_KATEGORİLERİ.find(k => k.slug === p.kategori)
  const il  = p.sehir ? getIlBySlug(p.sehir) : null
  const bolge = p.bolge ? BOLGE_ADLARI[p.bolge as BolgeKey] : null
  if (kat && il)   return `${il.il}'deki ${kat.ad} Firmaları`
  if (kat && bolge) return `${bolge} — ${kat.ad}`
  if (kat)          return `${kat.icon} ${kat.ad} Firmaları`
  if (il)           return `📍 ${il.il} — Jeodezi Firmaları`
  if (bolge)        return `🗺️ ${bolge} Bölgesi`
  return "Tüm Firmalar"
}

// ─── Bileşenler ───────────────────────────────────────────────────────────────

function TierBadge({ tier, onaylı }: { tier: string; onaylı: boolean }) {
  if (tier === "PREMIUM")
    return <Badge className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px]">⭐ Premium</Badge>
  if (onaylı)
    return <Badge className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px]">✓ Onaylı</Badge>
  return null
}

function FirmaCard({ firma }: { firma: FirmaKarti }) {
  const isPremium = firma.tier === "PREMIUM"
  return (
    <Link href={`/firma/${firma.slug}`}>
      <Card className={`mb-3 hover:shadow-md transition-all cursor-pointer border-l-4 ${
        isPremium ? "border-l-amber-400" : firma.tier === "ONAYLI" ? "border-l-blue-400" : "border-l-slate-200"
      }`}>
        <CardContent className="p-5">
          <div className="flex gap-4 items-start">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ background: isPremium ? "linear-gradient(135deg,#fbbf24,#f59e0b)"
                : firma.tier === "ONAYLI" ? "linear-gradient(135deg,#0ea5e9,#0284c7)"
                : "linear-gradient(135deg,#94a3b8,#64748b)" }}
            >
              {firma.ad.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[15px] text-slate-900">{firma.ad}</span>
                  <TierBadge tier={firma.tier} onaylı={firma.onaylı} />
                </div>
                <span className="text-[12px] text-slate-400 flex items-center gap-0.5 flex-shrink-0">
                  <MapPin className="w-3 h-3" />
                  {firma.sehir}{firma.ilce ? `, ${firma.ilce}` : ""}
                </span>
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 mb-3">{firma.aciklama}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {firma.hizmetler.slice(0,4).map(h => (
                    <span key={h} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{h}</span>
                  ))}
                  {firma.hizmetler.length > 4 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">+{firma.hizmetler.length - 4}</span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400">{firma.viewCount.toLocaleString("tr-TR")} görüntüleme</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Kategori sidebar
function KategoriSidebar({ p }: { p: SearchParams }) {
  function katUrl(slug: string | null) {
    const params = new URLSearchParams()
    if (p.sehir) params.set("sehir", p.sehir)
    if (p.tip)   params.set("tip", p.tip!)
    if (slug)    params.set("kategori", slug)
    return `/firmalar?${params.toString()}`
  }

  const grupAd: Record<string, string> = {
    klasik: "Klasik Jeodezi & Kadastro",
    "3d": "3D Teknoloji",
    gis: "CBS / GIS",
    ticari: "Ticari & Değerleme",
    ekipman: "Ekipman",
    egitim: "Eğitim",
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sticky top-20">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Hizmet Kategorisi</div>
      <Link href={katUrl(null)}
        className={`flex items-center px-2.5 py-1.5 rounded-lg text-sm mb-2 transition-colors ${
          !p.kategori ? "bg-emerald-600 text-white font-semibold" : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        🔧 Tüm Kategoriler
      </Link>
      {Object.entries(KATEGORİ_GRUPLARI).map(([gk, kats]) => (
        <div key={gk} className="mb-2">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1 mt-1">{grupAd[gk] ?? gk}</div>
          {kats.map(kat => (
            <Link key={kat.slug} href={katUrl(kat.slug)}
              className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-[12px] mb-0.5 transition-colors ${
                p.kategori === kat.slug
                  ? "bg-emerald-600 text-white font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{kat.icon}</span>
              <span className="flex-1 leading-tight">{kat.ad}</span>
              {kat.yeni && <span className="text-[8px] bg-amber-400 text-white px-1 rounded font-bold">YENİ</span>}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

// Şehir sidebar — 81 il, bölge gruplu, <details> ile açılır/kapanır
function SehirSidebar({ p }: { p: SearchParams }) {
  const bolgeGrubu = getBolgeGrubu()
  const oneCikanlar = getOneCikanIller()

  function sehirUrl(slug: string | null) {
    const params = new URLSearchParams()
    if (p.kategori) params.set("kategori", p.kategori)
    if (p.tip)      params.set("tip", p.tip!)
    if (slug)       params.set("sehir", slug)
    return `/firmalar?${params.toString()}`
  }
  function bolgeUrl(slug: string) {
    const params = new URLSearchParams()
    if (p.kategori) params.set("kategori", p.kategori)
    if (p.tip)      params.set("tip", p.tip!)
    params.set("bolge", slug)
    return `/firmalar?${params.toString()}`
  }

  return (
    <aside className="space-y-2 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-0.5">
      {/* Büyük şehirler */}
      <div className="bg-white border border-slate-200 rounded-xl p-3">
        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Büyük Şehirler</div>
        <Link href={sehirUrl(null)}
          className={`flex px-2 py-1 rounded text-[12px] mb-0.5 transition-colors ${
            !p.sehir && !p.bolge ? "bg-sky-600 text-white font-semibold" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          📍 Tüm Türkiye
        </Link>
        {oneCikanlar.map(il => (
          <Link key={il.slug} href={sehirUrl(il.slug)}
            className={`flex px-2 py-1 rounded text-[12px] mb-0.5 transition-colors ${
              p.sehir === il.slug ? "bg-sky-600 text-white font-semibold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {il.il}
          </Link>
        ))}
      </div>

      {/* Bölge grupları */}
      {(Object.keys(BOLGE_ADLARI) as BolgeKey[]).map(bolge => {
        const iller = bolgeGrubu.get(bolge) ?? []
        const r = BOLGE_RENK[bolge]
        const isOpen = p.bolge === bolge || iller.some(il => il.slug === p.sehir)
        return (
          <details key={bolge} open={isOpen}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <summary className={`flex items-center gap-1.5 px-3 py-2.5 cursor-pointer select-none font-semibold text-[12px] list-none ${
              isOpen ? `${r.bg} ${r.text}` : "text-slate-700 hover:bg-slate-50"
            }`}>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${r.dot}`} />
              {BOLGE_ADLARI[bolge]}
              <span className="ml-auto text-[10px] font-normal text-slate-400">{iller.length}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </summary>
            <div className="px-2 pb-2 pt-1">
              <Link href={bolgeUrl(bolge)}
                className={`flex px-2 py-1 rounded text-[11px] font-semibold mb-1 transition-colors ${
                  p.bolge === bolge && !p.sehir ? `${r.bg} ${r.text}` : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                ↳ Tüm {BOLGE_ADLARI[bolge]} ({iller.length})
              </Link>
              <div className="grid grid-cols-2 gap-0.5">
                {iller.map(il => (
                  <Link key={il.slug} href={sehirUrl(il.slug)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors ${
                      p.sehir === il.slug ? `${r.bg} ${r.text} font-semibold` : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {il.il}
                  </Link>
                ))}
              </div>
            </div>
          </details>
        )
      })}
    </aside>
  )
}

// ─── Ana sayfa ────────────────────────────────────────────────────────────────

export default function FirmalarPage({ searchParams }: { searchParams: SearchParams }) {
  const firmalar = firmalariFiltrele(TÜM_FİRMALAR, searchParams)
  const baslik   = sayfaBasligi(searchParams)
  const aktifIl  = searchParams.sehir ? getIlBySlug(searchParams.sehir) : null
  const aktifKat = HIZMET_KATEGORİLERİ.find(k => k.slug === searchParams.kategori)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero şerit */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-extrabold text-white mb-1">{baslik}</h1>
          <p className="text-emerald-200 text-sm mb-6">
            {aktifIl ? `${aktifIl.il}'de` : "Türkiye genelinde"} {firmalar.length} firma
            {aktifKat && ` · ${aktifKat.icon} ${aktifKat.ad}`}
          </p>

          {/* Arama */}
          <div className="flex gap-2 max-w-xl">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                className="flex-1 text-sm outline-none placeholder:text-slate-400"
                placeholder={`${aktifIl ? aktifIl.il + "'de" : "Türkiye'de"} firma, hizmet ara...`}
                defaultValue={searchParams.q}
              />
            </div>
            <Button className="bg-white text-emerald-700 hover:bg-emerald-50 h-11 px-5 text-sm gap-1.5">
              <Filter className="w-4 h-4" /> Filtrele
            </Button>
          </div>

          {/* Aktif filtre chip'leri */}
          {(aktifKat || aktifIl || searchParams.bolge || searchParams.tip) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {aktifKat && (
                <Link href={`/firmalar${searchParams.sehir ? `?sehir=${searchParams.sehir}` : ""}`}>
                  <span className="inline-flex items-center gap-1 text-xs bg-white/20 text-white px-3 py-1 rounded-full border border-white/30 hover:bg-white/30 cursor-pointer">
                    {aktifKat.icon} {aktifKat.ad} ×
                  </span>
                </Link>
              )}
              {aktifIl && (
                <Link href={`/firmalar${searchParams.kategori ? `?kategori=${searchParams.kategori}` : ""}`}>
                  <span className="inline-flex items-center gap-1 text-xs bg-white/20 text-white px-3 py-1 rounded-full border border-white/30 hover:bg-white/30 cursor-pointer">
                    📍 {aktifIl.il} ×
                  </span>
                </Link>
              )}
              {searchParams.tip && (
                <Link href={`/firmalar?${new URLSearchParams({...(searchParams.kategori&&{kategori:searchParams.kategori}), ...(searchParams.sehir&&{sehir:searchParams.sehir})}).toString()}`}>
                  <span className="inline-flex items-center gap-1 text-xs bg-white/20 text-white px-3 py-1 rounded-full border border-white/30 hover:bg-white/30 cursor-pointer">
                    {searchParams.tip === "PREMIUM" ? "⭐ Premium" : "✓ Onaylı"} ×
                  </span>
                </Link>
              )}
              <Link href="/firmalar">
                <span className="inline-flex items-center gap-1 text-xs bg-red-500/80 text-white px-3 py-1 rounded-full hover:bg-red-500 cursor-pointer">
                  Temizle ×
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 3 kolonlu layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_180px] gap-5">

          {/* Sol: Kategori */}
          <KategoriSidebar p={searchParams} />

          {/* Orta: Firma listesi */}
          <div>
            {/* Üst çubuk */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-600">
                <strong className="text-slate-900">{firmalar.length}</strong> firma
              </p>
              <div className="flex items-center gap-2">
                {[
                  { val: undefined,  label: "Tümü" },
                  { val: "PREMIUM",  label: "⭐ Premium" },
                  { val: "ONAYLI",   label: "✓ Onaylı" },
                ].map(({ val, label }) => (
                  <Link key={label} href={`/firmalar?${new URLSearchParams({
                    ...(searchParams.kategori && { kategori: searchParams.kategori }),
                    ...(searchParams.sehir && { sehir: searchParams.sehir }),
                    ...(val && { tip: val }),
                  }).toString()}`}>
                    <button className={`text-[11px] px-3 py-1 rounded-full border transition-colors ${
                      searchParams.tip === val || (!searchParams.tip && !val)
                        ? "bg-slate-800 text-white border-slate-800"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}>{label}</button>
                  </Link>
                ))}
                <Button variant="outline" size="sm" className="text-xs h-7 gap-1">
                  <SlidersHorizontal className="w-3 h-3" /> Sırala
                </Button>
              </div>
            </div>

            {/* Bağlam banner'ı */}
            {(aktifKat || aktifIl) && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 mb-4 text-sm text-slate-700 flex gap-2">
                <span className="text-base leading-none mt-0.5">ℹ️</span>
                <div>
                  {aktifKat && aktifIl
                    ? <><strong>{aktifIl.il}</strong>&apos;de <strong>{aktifKat.ad}</strong> firmaları.{" "}<Link href={`/firmalar?kategori=${aktifKat.slug}`} className="text-emerald-700 underline">Tüm Türkiye&apos;de ara →</Link></>
                    : aktifKat
                    ? <>Tüm <strong>{aktifKat.ad}</strong> firmaları. Soldan şehir seçerek daraltın.</>
                    : <><strong>{aktifIl!.il}</strong>&apos;deki tüm firmalar. Soldan kategori seçin.</>
                  }
                </div>
              </div>
            )}

            {firmalar.length === 0 ? (
              <Card className="text-center p-12">
                <CardContent>
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="font-bold text-lg mb-2">Sonuç bulunamadı</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {aktifIl ? `${aktifIl.il}'de${aktifKat ? ` ${aktifKat.ad}` : ""} henüz kayıtlı firma yok.` : "Farklı filtreler deneyin."}
                  </p>
                  <Link href="/firmalar"><Button variant="outline" size="sm">Tüm Firmalara Dön</Button></Link>
                </CardContent>
              </Card>
            ) : (
              firmalar.map(f => <FirmaCard key={f.slug} firma={f} />)
            )}
          </div>

          {/* Sağ: 81 il şehir filtresi */}
          <SehirSidebar p={searchParams} />
        </div>
      </div>

      <Footer />
    </div>
  )
}
