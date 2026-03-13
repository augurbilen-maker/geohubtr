// GeoHub TR — İş İlanı Oluştur
// Sadece ONAYLI veya PREMIUM firma sahipleri erişebilir.
// FREE firma → "Üyeliğinizi Yükseltin" banner'ı görür, form disabled olur.
// Gerçek uygulamada: getServerSession ile tier kontrolü yapılır.
import Link from "next/link"
import { ArrowLeft, Briefcase, AlertCircle, ChevronRight, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Demo amaçlı — gerçekte session'dan okunur
const MOCk_FIRMA = {
  ad: "GeoVizyon Mühendislik Ltd.",
  tier: "ONAYLI" as "FREE" | "ONAYLI" | "PREMIUM",
  kalanIlanHakki: 3, // Onaylı: aylık 5, kullanılan 2 → kalan 3
}

const UZMANLIK_ALANLARI = [
  { value: "ROLOVE",               label: "📐 Rölöve & Halihazır Harita" },
  { value: "LAZER_TARAMA",         label: "🔦 Lazer Tarama" },
  { value: "DRONE_HARITALAMA",     label: "🚁 Drone / İHA Haritalama" },
  { value: "BIM_MODELLEME",        label: "🏗️ BIM Modelleme" },
  { value: "CBS_GIS",              label: "🌐 CBS / GIS" },
  { value: "FOTOGRAMETRI",         label: "📸 Fotogrametri" },
  { value: "GAYRIMENKUL_DEGERLEME",label: "🏠 Gayrimenkul Değerleme" },
  { value: "INSAAT_KONTROL",       label: "🏚️ İnşaat Kontrol" },
  { value: "MADEN_OCAK",           label: "⛰️ Maden & Ocak Ölçümü" },
  { value: "LIHKAB",               label: "📜 LİHKAB" },
  { value: "CIHAZ_SATIS",          label: "🔭 Cihaz Satış & Kiralama" },
  { value: "GENEL",                label: "🔧 Genel / Diğer" },
]

const ÖNERİLEN_BECERİLER = [
  "AutoCAD", "Civil 3D", "Revit", "Navisworks", "ArcGIS Pro", "QGIS",
  "Leica Totalstation", "Trimble GNSS", "DJI Drone", "Pix4D",
  "Agisoft Metashape", "Leica Cyclone", "FARO Scene", "Python", "PostGIS",
  "SİHAB Lisansı", "SPK Lisansı", "Rölöve", "BIM", "IFC",
]

// ─── Üyelik uyarı banner'ı ────────────────────────────────────────────────────

function TierBanner({ tier, kalan }: { tier: "FREE" | "ONAYLI" | "PREMIUM"; kalan: number }) {
  if (tier === "FREE") {
    return (
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex gap-4 items-start mb-6">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-bold text-sm text-amber-900 mb-1">
            İş İlanı Açmak için Onaylı veya Premium Üyelik Gereklidir
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Şu anki ücretsiz planınızla iş ilanı açamazsınız. Onaylı Üye (₺500/ay) planıyla
            aylık <strong>5 iş ilanı</strong>, Premium (₺1.500/ay) planıyla{" "}
            <strong>sınırsız iş ilanı</strong> açabilirsiniz.
          </p>
        </div>
        <Link href="/uyelik">
          <Button
            size="sm"
            className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-xs h-8"
          >
            Yükselt →
          </Button>
        </Link>
      </div>
    )
  }

  if (tier === "ONAYLI") {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-3 mb-6">
        <Badge className="bg-blue-100 text-blue-700 border-blue-200">✓ Onaylı Üye</Badge>
        <span className="text-xs text-blue-700">
          Bu ay <strong>{kalan} iş ilanı</strong> hakkınız kaldı (aylık 5 ilan).
        </span>
        <Link href="/uyelik" className="ml-auto text-xs text-blue-600 hover:underline flex items-center gap-0.5">
          Sınırsız için Premium&apos;a geç <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3 mb-6">
      <Badge className="bg-amber-100 text-amber-800 border-amber-200">⭐ Premium Üye</Badge>
      <span className="text-xs text-amber-800">Sınırsız iş ilanı hakkınız mevcut.</span>
    </div>
  )
}

// ─── Adım göstergesi ─────────────────────────────────────────────────────────

function AdimGostergesi({ aktif }: { aktif: 1 | 2 | 3 | 4 }) {
  const adimlar = [
    { no: 1, ad: "Pozisyon" },
    { no: 2, ad: "Gereksinimler" },
    { no: 3, ad: "Maaş & Tarih" },
    { no: 4, ad: "Yayınla" },
  ]
  return (
    <div className="grid grid-cols-4 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden mb-8">
      {adimlar.map((a) => (
        <div
          key={a.no}
          className={`py-3 text-center text-xs font-semibold transition-colors ${
            a.no === aktif
              ? "bg-sky-600 text-white"
              : a.no < aktif
              ? "bg-sky-100 text-sky-700"
              : "text-slate-400"
          }`}
        >
          {a.no} · {a.ad}
        </div>
      ))}
    </div>
  )
}

// ─── Beceri etiketi seçici (görsel) ──────────────────────────────────────────

function BeceriSecici() {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        Teknik Beceriler <span className="text-slate-400 font-normal">(zorunlu değil)</span>
      </label>
      {/* Seçili beceriler */}
      <div className="border border-slate-200 rounded-lg p-2.5 flex flex-wrap gap-1.5 bg-slate-50 min-h-[44px] mb-2">
        {["Leica RTC360", "Leica Cyclone", "FARO Scene", "AutoCAD"].map((b) => (
          <span
            key={b}
            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-sky-600 text-white"
          >
            {b}
            <X className="w-2.5 h-2.5 cursor-pointer opacity-70 hover:opacity-100" />
          </span>
        ))}
        <input
          className="border-none outline-none bg-transparent text-xs text-slate-600 min-w-[120px] placeholder:text-slate-400"
          placeholder="+ Beceri ara veya yaz..."
        />
      </div>
      {/* Öneri etiketleri */}
      <div className="flex flex-wrap gap-1.5">
        {ÖNERİLEN_BECERİLER.slice(0, 12).map((b) => (
          <button
            key={b}
            className="text-[10px] px-2 py-0.5 rounded border border-slate-200 bg-white text-slate-600 hover:border-sky-400 hover:text-sky-600 transition-colors"
          >
            + {b}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Ana sayfa ────────────────────────────────────────────────────────────────

export default function IlanVerPage() {
  const { tier, kalan, ad: firmaAd } = MOCk_FIRMA
  const disabled = tier === "FREE"

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Geri bağlantısı */}
        <Link
          href="/is-ilanlari"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> İş İlanlarına Dön
        </Link>

        {/* Başlık */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-600" /> Yeni İş İlanı Oluştur
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            <span className="font-medium text-slate-700">{firmaAd}</span> adına ilan açılıyor.
            Oluşturulan ilan onaylandıktan sonra yayına alınır (ort. 2 saat).
          </p>
        </div>

        {/* Tier banner */}
        <TierBanner tier={tier} kalan={kalan} />

        {/* Adım göstergesi */}
        <AdimGostergesi aktif={1} />

        {/* Form kartı */}
        <Card className={disabled ? "opacity-60 pointer-events-none" : ""}>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-slate-800">
              1 — Pozisyon Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">

            {/* İlan başlığı */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                İlan Başlığı <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors"
                placeholder="Örn: Kıdemli Harita Mühendisi, Drone Operatörü, GIS Analisti..."
                defaultValue="Lazer Tarama Uzmanı"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Aday arama motorlarında ön plana çıkan kısımdır; açıklayıcı yazın.
              </p>
            </div>

            {/* Uzmanlık & Çalışma tipi */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Uzmanlık Alanı <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sky-400 bg-white">
                  {UZMANLIK_ALANLARI.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Çalışma Tipi <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sky-400 bg-white">
                  <option value="FULL_TIME">Tam Zamanlı</option>
                  <option value="PART_TIME">Yarı Zamanlı</option>
                  <option value="FREELANCE" selected>Proje Bazlı / Freelance</option>
                  <option value="INTERNSHIP">Staj</option>
                </select>
              </div>
            </div>

            {/* Şehir & Çalışma modeli */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Şehir <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sky-400 bg-white">
                  {["İstanbul", "Ankara", "İzmir", "Bursa", "Trabzon", "Antalya", "Konya", "Kocaeli", "Tüm Türkiye"].map(
                    (s) => (
                      <option key={s}>{s}</option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Çalışma Modeli <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sky-400 bg-white">
                  <option value="ON_SITE">🏢 Ofis / Saha</option>
                  <option value="REMOTE">🖥️ Uzaktan (Remote)</option>
                  <option value="HYBRID">🔄 Hibrit</option>
                </select>
              </div>
            </div>

            {/* Pozisyon tanımı */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Pozisyon Tanımı <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sky-400 resize-y leading-relaxed"
                defaultValue="3D lazer tarama ekipmanlarını (Leica RTC360, FARO Focus) kullanarak saha ölçümü yapacak, elde edilen nokta bulutu verilerini işleyecek ve proje raporlarını hazırlayacak uzman aranmaktadır."
              />
            </div>

            {/* Aranan nitelikler */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Aranan Nitelikler <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sky-400 resize-y leading-relaxed"
                defaultValue={`• Harita, Geomatik veya İnşaat Mühendisliği mezunu\n• En az 3 yıl lazer tarama deneyimi\n• Leica Cyclone veya FARO Scene yazılımı kullanım bilgisi\n• Seyahat engeli olmayan\n• AutoCAD ile teknik çizim hazırlama yetkinliği`}
              />
            </div>

            {/* Beceri seçici */}
            <BeceriSecici />

            {/* Minimum deneyim */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Minimum Deneyim
              </label>
              <select className="w-48 border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sky-400 bg-white">
                <option value="0">Deneyim aranmıyor (Staj)</option>
                <option value="1">1 yıl ve üzeri</option>
                <option value="2">2 yıl ve üzeri</option>
                <option value="3" selected>3 yıl ve üzeri</option>
                <option value="5">5 yıl ve üzeri</option>
                <option value="8">8 yıl ve üzeri (Senior)</option>
              </select>
            </div>

          </CardContent>
        </Card>

        {/* Gizli ilan uyarısı */}
        {!disabled && (
          <div className="mt-4 bg-sky-50 border border-sky-200 rounded-lg p-3 text-xs text-sky-700 flex items-start gap-2">
            <span className="text-base leading-none mt-0.5">ℹ️</span>
            <span>
              İlan başvuruları yalnızca <strong>GeoHub TR hesabı olan bireysel kullanıcılar</strong> tarafından gönderilebilir.
              Firma sahibi kullanıcılar başvuramaz. Tüm başvurular Firma Paneli'nden yönetilebilir.
            </span>
          </div>
        )}

        {/* Form alt butonları */}
        <div className="flex justify-between items-center mt-6">
          <Link href="/is-ilanlari">
            <Button variant="outline" className="text-sm">
              ← Vazgeç
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" className="text-sm" disabled={disabled}>
              Taslak Kaydet
            </Button>
            <Button
              className="text-sm bg-sky-600 hover:bg-sky-700"
              disabled={disabled}
            >
              Devam Et → Maaş & Tarih
            </Button>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
