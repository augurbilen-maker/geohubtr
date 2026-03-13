// GeoHub TR — İş İlanları
// Bireysel kullanıcılar tüm ilanları görebilir ve başvurabilir
// Onaylı/Premium firmalar ilan açabilir
import Link from "next/link"
import {
  Briefcase, MapPin, Clock, ChevronRight, Search,
  Filter, Bookmark, Send, Building2, Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// ─── Tip tanımları ────────────────────────────────────────────────────────────

type JobType = "FULL_TIME" | "PART_TIME" | "FREELANCE" | "INTERNSHIP"
type WorkModel = "ON_SITE" | "REMOTE" | "HYBRID"

interface JobListing {
  id: string
  sirketAd: string
  sirketSlug: string
  sirketTier: "FREE" | "ONAYLI" | "PREMIUM"
  sirketSehir: string
  baslik: string
  aciklama: string
  uzmanlik: string
  jobType: JobType
  workModel: WorkModel
  sehir: string
  maasMin?: number
  maasMax?: number
  maasGizli?: boolean
  beceriler: string[]
  deneyimYil?: number
  eklenme: string
  sonBasvuru?: string
  basvuruSayisi: number
}

// ─── Yardımcı haritalar ───────────────────────────────────────────────────────

const JOB_TYPE_LABEL: Record<JobType, { label: string; color: string; bg: string }> = {
  FULL_TIME:   { label: "Tam Zamanlı",   color: "text-blue-700",   bg: "bg-blue-50" },
  PART_TIME:   { label: "Yarı Zamanlı",  color: "text-purple-700", bg: "bg-purple-50" },
  FREELANCE:   { label: "Proje Bazlı",   color: "text-orange-700", bg: "bg-orange-50" },
  INTERNSHIP:  { label: "Staj",          color: "text-violet-700", bg: "bg-violet-50" },
}

const WORK_MODEL_LABEL: Record<WorkModel, { label: string; emoji: string }> = {
  ON_SITE: { label: "Ofis / Saha", emoji: "🏢" },
  REMOTE:  { label: "Uzaktan",     emoji: "🖥️" },
  HYBRID:  { label: "Hibrit",      emoji: "🔄" },
}

// ─── Statik örnek verisi ──────────────────────────────────────────────────────
// Gerçekte: prisma ile db'den çekilecek, `?uzmanlik=&sehir=&tip=` query param ile filtrelenecek

const İLANLAR: JobListing[] = [
  {
    id: "1",
    sirketAd: "GeoVizyon Mühendislik Ltd.",
    sirketSlug: "geodezik-muhendislik",
    sirketTier: "PREMIUM",
    sirketSehir: "İstanbul",
    baslik: "Kıdemli Harita Mühendisi",
    aciklama:
      "Kentsel dönüşüm ve restorasyon projelerinde çalışacak kıdemli harita mühendisi aranmaktadır. Leica totalstation ve Trimble GNSS ekipman bilgisi tercih sebebidir. Proje takibi, arazi ölçümü ve rapor hazırlama görevleri yürütülecektir.",
    uzmanlik: "Rölöve & Halihazır Harita",
    jobType: "FULL_TIME",
    workModel: "HYBRID",
    sehir: "İstanbul",
    maasMin: 45000,
    maasMax: 65000,
    beceriler: ["AutoCAD", "Civil 3D", "Leica", "Trimble", "Rölöve"],
    deneyimYil: 4,
    eklenme: "3 gün önce",
    sonBasvuru: "31 Mar 2026",
    basvuruSayisi: 12,
  },
  {
    id: "2",
    sirketAd: "SkyMap Drone Teknolojileri",
    sirketSlug: "skymap-drone",
    sirketTier: "ONAYLI",
    sirketSehir: "İstanbul",
    baslik: "İHA / Drone Operatörü — Saha",
    aciklama:
      "DJI Matrice 300 ve Phantom 4 RTK operatörü aranıyor. Tarım, madencilik ve inşaat projelerinde saha çalışması yapılacak. Türkiye genelinde seyahat gerekmektedir. SİHAB A2 veya A3 lisansı zorunludur.",
    uzmanlik: "Drone / İHA Haritalama",
    jobType: "FREELANCE",
    workModel: "ON_SITE",
    sehir: "Tüm Türkiye",
    maasGizli: true,
    beceriler: ["DJI", "Pix4D", "Agisoft Metashape", "SİHAB Lisansı"],
    deneyimYil: 1,
    eklenme: "1 gün önce",
    sonBasvuru: "20 Mar 2026",
    basvuruSayisi: 7,
  },
  {
    id: "3",
    sirketAd: "Ankara Topografya A.Ş.",
    sirketSlug: "ankara-topografya",
    sirketTier: "ONAYLI",
    sirketSehir: "Ankara",
    baslik: "CBS / GIS Uzmanı — Uzaktan",
    aciklama:
      "Belediye altyapı projelerinde ArcGIS ve QGIS kullanarak mekânsal veri analizi yapacak uzman aranmaktadır. Python veya SQL bilgisi avantajlıdır. Tam uzaktan çalışma imkânı sunulmaktadır.",
    uzmanlik: "CBS / GIS Hizmetleri",
    jobType: "FULL_TIME",
    workModel: "REMOTE",
    sehir: "Ankara (Remote)",
    maasMin: 35000,
    maasMax: 50000,
    beceriler: ["ArcGIS Pro", "QGIS", "Python", "PostGIS", "SQL"],
    deneyimYil: 2,
    eklenme: "5 gün önce",
    sonBasvuru: "28 Mar 2026",
    basvuruSayisi: 19,
  },
  {
    id: "4",
    sirketAd: "İzmir Lazer Tarama Teknolojileri",
    sirketSlug: "izmir-lazer-tarama",
    sirketTier: "PREMIUM",
    sirketSehir: "İzmir",
    baslik: "Harita Mühendisliği Stajyeri",
    aciklama:
      "Lazer tarama & nokta bulutu işleme projelerinde deneyim kazanmak isteyen 3. veya 4. sınıf öğrenci aranmaktadır. Staj süresi 3-6 ay, ücret asgari ücretin üzerindedir.",
    uzmanlik: "Lazer Tarama",
    jobType: "INTERNSHIP",
    workModel: "ON_SITE",
    sehir: "İzmir",
    maasGizli: false,
    maasMin: 12000,
    beceriler: ["Leica Cyclone", "Autodesk ReCap", "AutoCAD"],
    deneyimYil: 0,
    eklenme: "2 gün önce",
    sonBasvuru: "25 Mar 2026",
    basvuruSayisi: 34,
  },
  {
    id: "5",
    sirketAd: "Metropol Değerleme A.Ş.",
    sirketSlug: "metropol-degerleme",
    sirketTier: "ONAYLI",
    sirketSehir: "İstanbul",
    baslik: "SPK Lisanslı Gayrimenkul Değerleme Uzmanı",
    aciklama:
      "Konut, ticari gayrimenkul ve arazi değerleme raporları hazırlayacak SPK Lisanslı uzman aranmaktadır. Harita veya geomatik mühendisliği mezunlarına öncelik verilecektir. Yoğun proje yükü nedeniyle hızlı başlayabilecek adaylar tercih edilir.",
    uzmanlik: "Gayrimenkul Değerleme",
    jobType: "FULL_TIME",
    workModel: "HYBRID",
    sehir: "İstanbul",
    maasMin: 55000,
    maasMax: 80000,
    beceriler: ["SPK Lisansı", "UDES", "Tapu Takip", "Rapor Yazımı"],
    deneyimYil: 3,
    eklenme: "Bugün",
    sonBasvuru: "15 Mar 2026",
    basvuruSayisi: 5,
  },
  {
    id: "6",
    sirketAd: "BIM Mühendislik ve Danışmanlık",
    sirketSlug: "bim-muhendislik",
    sirketTier: "ONAYLI",
    sirketSehir: "İstanbul",
    baslik: "BIM / Revit Uzmanı — İnşaat Sektörü",
    aciklama:
      "Büyük ölçekli inşaat projelerinde Revit ile BIM modelleme yapacak, nokta bulutu verilerinden as-built model üretecek uzman aranmaktadır. Navisworks ve IFC formatlarına hakimiyet beklenmektedir.",
    uzmanlik: "BIM Modelleme",
    jobType: "FULL_TIME",
    workModel: "ON_SITE",
    sehir: "İstanbul",
    maasMin: 40000,
    maasMax: 60000,
    beceriler: ["Revit", "Navisworks", "IFC", "AutoCAD", "Dynamo"],
    deneyimYil: 3,
    eklenme: "4 gün önce",
    sonBasvuru: "30 Mar 2026",
    basvuruSayisi: 22,
  },
]

// ─── Alt bileşenler ───────────────────────────────────────────────────────────

function TierBadge({ tier }: { tier: "FREE" | "ONAYLI" | "PREMIUM" }) {
  if (tier === "PREMIUM")
    return (
      <Badge className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px]">
        ⭐ Premium
      </Badge>
    )
  if (tier === "ONAYLI")
    return (
      <Badge className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px]">
        ✓ Onaylı
      </Badge>
    )
  return null
}

function MaasLabel({ ilan }: { ilan: JobListing }) {
  if (ilan.maasGizli) return <span className="text-sm text-slate-400">Maaş gizli</span>
  if (ilan.maasMin && ilan.maasMax)
    return (
      <span className="text-sm font-bold text-emerald-700">
        {ilan.maasMin.toLocaleString("tr-TR")} – {ilan.maasMax.toLocaleString("tr-TR")} ₺/ay
      </span>
    )
  if (ilan.maasMin)
    return (
      <span className="text-sm font-bold text-emerald-700">
        {ilan.maasMin.toLocaleString("tr-TR")} ₺/ay+
      </span>
    )
  return <span className="text-sm text-slate-400">Proje bazlı ücret</span>
}

function IlanKarti({ ilan }: { ilan: JobListing }) {
  const jt = JOB_TYPE_LABEL[ilan.jobType]
  const wm = WORK_MODEL_LABEL[ilan.workModel]
  const isPremium = ilan.sirketTier === "PREMIUM"

  return (
    <Card
      className={`mb-3 hover:shadow-md transition-shadow cursor-pointer border-l-4 ${
        isPremium ? "border-l-amber-400" : "border-l-slate-200"
      }`}
    >
      <CardContent className="p-5">
        <div className="flex gap-4">
          {/* Şirket avatarı */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style={{
              background: isPremium
                ? "linear-gradient(135deg,#fbbf24,#f59e0b)"
                : "linear-gradient(135deg,#0ea5e9,#0284c7)",
            }}
          >
            {ilan.sirketAd.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            {/* Başlık satırı */}
            <div className="flex items-start justify-between gap-3 mb-1">
              <div>
                <h3 className="font-bold text-[15px] text-slate-900 leading-tight">
                  {ilan.baslik}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Link
                    href={`/firma/${ilan.sirketSlug}`}
                    className="text-[12px] text-slate-500 hover:text-sky-600 hover:underline"
                  >
                    {ilan.sirketAd}
                  </Link>
                  <TierBadge tier={ilan.sirketTier} />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <MaasLabel ilan={ilan} />
                <div className="text-[11px] text-slate-400 mt-0.5">{ilan.eklenme}</div>
              </div>
            </div>

            {/* Etiketler */}
            <div className="flex flex-wrap gap-1.5 my-2.5">
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${jt.color} ${jt.bg}`}
              >
                {jt.label}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {wm.emoji} {wm.label}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" /> {ilan.sehir}
              </span>
              {ilan.deneyimYil !== undefined && (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {ilan.deneyimYil === 0
                    ? "Deneyim aranmıyor"
                    : `${ilan.deneyimYil}+ yıl deneyim`}
                </span>
              )}
            </div>

            {/* Açıklama */}
            <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-2 mb-3">
              {ilan.aciklama}
            </p>

            {/* Beceri etiketleri */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {ilan.beceriler.slice(0, 4).map((b) => (
                  <span
                    key={b}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500"
                  >
                    {b}
                  </span>
                ))}
                {ilan.beceriler.length > 4 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-400">
                    +{ilan.beceriler.length - 4} daha
                  </span>
                )}
              </div>

              {/* Aksiyon butonları */}
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" className="h-7 text-[11px]">
                  <Bookmark className="w-3 h-3 mr-1" /> Kaydet
                </Button>
                <Link href={`/is-ilanlari/${ilan.id}`}>
                  <Button size="sm" className="h-7 text-[11px] bg-sky-600 hover:bg-sky-700">
                    <Send className="w-3 h-3 mr-1" /> Başvur
                  </Button>
                </Link>
              </div>
            </div>

            {/* Alt bilgi */}
            {ilan.sonBasvuru && (
              <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Son başvuru: {ilan.sonBasvuru}
                </span>
                <span>{ilan.basvuruSayisi} başvuru</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Ana sayfa bileşeni ───────────────────────────────────────────────────────

export default function IsIlanlariPage() {
  // Gerçekte: searchParams ile filter uygulanacak
  const toplamIlan = İLANLAR.length
  const acikIlan   = İLANLAR.filter((i) => i.jobType !== "INTERNSHIP").length
  const stajIlan   = İLANLAR.filter((i) => i.jobType === "INTERNSHIP").length
  const remoteIlan = İLANLAR.filter((i) => i.workModel === "REMOTE").length

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-indigo-200/20 text-indigo-200 text-[11px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide border border-indigo-400/30">
            Sektöre Özel İş Piyasası
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3">
            💼 Jeodezi & Haritacılık İş İlanları
          </h1>
          <p className="text-indigo-300 text-sm max-w-lg mx-auto mb-8">
            Türkiye&apos;nin tek sektörel iş platformu. Firmalar ilan açar, bireyler başvurur.
          </p>

          {/* Arama kutusu */}
          <div className="bg-white rounded-xl p-1 flex gap-2 max-w-2xl mx-auto shadow-lg">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                className="flex-1 text-sm outline-none placeholder:text-slate-400"
                placeholder="Pozisyon, beceri veya şirket..."
              />
            </div>
            <div className="w-px bg-slate-200 my-1" />
            <div className="flex items-center gap-2 px-3">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                className="w-28 text-sm outline-none placeholder:text-slate-400"
                placeholder="Şehir..."
              />
            </div>
            <Button className="bg-sky-600 hover:bg-sky-700 rounded-lg text-sm h-9 px-5">
              Ara
            </Button>
          </div>

          {/* İstatistikler */}
          <div className="flex justify-center gap-8 mt-8">
            {[
              { val: `${toplamIlan}`, lbl: "Aktif İlan" },
              { val: `${acikIlan}`,   lbl: "Tam / Part / Freelance" },
              { val: `${stajIlan}`,   lbl: "Staj İlanı" },
              { val: `${remoteIlan}`, lbl: "Remote / Uzaktan" },
            ].map((s) => (
              <div key={s.lbl} className="text-center">
                <div className="text-2xl font-extrabold text-sky-300">{s.val}</div>
                <div className="text-[11px] text-indigo-400 mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ana İçerik ───────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Üst eylem çubuğu */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{toplamIlan} ilan</span> bulundu
            </p>
            {/* Hızlı filtre etiketleri */}
            <div className="flex gap-2">
              {["Tümü", "Tam Zamanlı", "Remote", "Staj"].map((f) => (
                <button
                  key={f}
                  className={`text-[11px] px-3 py-1 rounded-full border transition-colors ${
                    f === "Tümü"
                      ? "bg-sky-600 text-white border-sky-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-sky-400"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
              <Filter className="w-3 h-3" /> Filtrele
            </Button>
            <Link href="/is-ilanlari/ilan-ver">
              <Button size="sm" className="text-xs h-8 gap-1.5 bg-indigo-600 hover:bg-indigo-700">
                <Briefcase className="w-3 h-3" /> İlan Ver
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

          {/* İlan listesi */}
          <div>
            {İLANLAR.map((ilan) => (
              <IlanKarti key={ilan.id} ilan={ilan} />
            ))}

            {/* Daha fazla yükle */}
            <div className="text-center py-6">
              <Button variant="outline" className="text-sm px-8">
                Daha Fazla Yükle (41 ilan daha)
              </Button>
            </div>
          </div>

          {/* Sağ kenar çubuğu */}
          <aside className="space-y-4">

            {/* Bildirim kutusu */}
            <Card className="border-indigo-100 bg-indigo-50/50">
              <CardContent className="p-4">
                <div className="font-semibold text-sm text-indigo-900 mb-1.5">
                  🔔 Yeni İlan Bildirimi
                </div>
                <p className="text-[12px] text-indigo-700 leading-relaxed mb-3">
                  Aradığınız pozisyonda yeni ilan açıldığında e-posta ile haberdar olun.
                </p>
                <input
                  className="w-full text-xs border border-indigo-200 rounded-lg px-3 py-2 mb-2 outline-none focus:border-indigo-400 bg-white"
                  placeholder="E-posta adresiniz"
                />
                <Button size="sm" className="w-full text-xs bg-indigo-600 hover:bg-indigo-700">
                  Bildirim Kur
                </Button>
              </CardContent>
            </Card>

            {/* İlan tipi dağılımı */}
            <Card>
              <CardContent className="p-4">
                <div className="font-semibold text-sm text-slate-900 mb-3">📊 İlan Dağılımı</div>
                {[
                  { label: "Tam Zamanlı",  count: 3, color: "bg-blue-500" },
                  { label: "Proje Bazlı",  count: 1, color: "bg-orange-500" },
                  { label: "Staj",         count: 1, color: "bg-violet-500" },
                  { label: "Yarı Zamanlı", count: 1, color: "bg-purple-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
                    <span className="text-[12px] text-slate-600 flex-1">{item.label}</span>
                    <span className="text-[12px] font-semibold text-slate-800">{item.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popüler beceriler */}
            <Card>
              <CardContent className="p-4">
                <div className="font-semibold text-sm text-slate-900 mb-3">🔧 Aranan Beceriler</div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "AutoCAD", "Revit", "ArcGIS", "QGIS", "Leica",
                    "DJI", "Pix4D", "Civil 3D", "Python", "BIM",
                  ].map((b) => (
                    <span
                      key={b}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 cursor-pointer hover:bg-sky-100 hover:text-sky-700 transition-colors"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* İlan ver kutusu */}
            <Card className="border-amber-200 bg-amber-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-amber-700" />
                  <span className="font-semibold text-sm text-amber-900">Firma misiniz?</span>
                </div>
                <p className="text-[12px] text-amber-800 leading-relaxed mb-3">
                  Onaylı veya Premium üyeler aylık 5 veya sınırsız iş ilanı açabilir.
                </p>
                <Link href="/is-ilanlari/ilan-ver">
                  <Button
                    size="sm"
                    className="w-full text-xs bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    İlan Ver →
                  </Button>
                </Link>
              </CardContent>
            </Card>

          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
