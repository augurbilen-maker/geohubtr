// GeoHub TR — Ana Sayfa
import Link from "next/link"
import { Search, ArrowRight, CheckCircle2, Shield, Zap, MessageCircle, Star, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Hizmet kategorileri — service-categories.ts ile senkron
import { HIZMET_KATEGORİLERİ } from "@/lib/service-categories"

// Ana sayfada gösterilecek sekiz öne çıkan kategori (tüm 15'ten seçme)
const hizmetKategorileri = [
  { slug: "rolove",          icon: "📐", ad: "Rölöve",                  aciklama: "Mimari, yapısal & as-built",      firmaCount: 186, yeni: false },
  { slug: "halihazir-harita",icon: "🗺️", ad: "Halihazır Harita",        aciklama: "1/500–1/25000 ölçek harita",      firmaCount: 312, yeni: false },
  { slug: "aplikasyon",      icon: "📏", ad: "Aplikasyon & İfraz",      aciklama: "Parsel, tevhit, yola terk",        firmaCount: 278, yeni: false },
  { slug: "lazer-tarama",    icon: "🔦", ad: "Lazer Tarama",            aciklama: "3D nokta bulutu & belgeleme",      firmaCount: 127, yeni: false },
  { slug: "drone-haritalama",icon: "🚁", ad: "Drone / İHA Haritalama",  aciklama: "Ortofoto, DSM, kübaj hesabı",      firmaCount: 154, yeni: false },
  { slug: "bim-modelleme",   icon: "🏗️", ad: "BIM Modelleme",           aciklama: "Revit, IFC & dijital ikiz",        firmaCount: 89,  yeni: false },
  { slug: "fotogrametri",    icon: "📸", ad: "Fotogrametri",            aciklama: "SfM, hava & yersel belgeleme",     firmaCount: 0,   yeni: true  },
  { slug: "cbs-gis",         icon: "🌐", ad: "CBS / GIS Hizmetleri",   aciklama: "Sayısal harita & WebGIS",           firmaCount: 0,   yeni: true  },
  { slug: "lihkab",          icon: "📜", ad: "LİHKAB",                  aciklama: "Lisanslı Harita & Kadastro Büroları", firmaCount: 0, yeni: true  },
  { slug: "gayrimenkul-degerleme", icon: "🏠", ad: "Gayrimenkul Değerleme", aciklama: "SPK lisanslı ekspertiz hizmeti", firmaCount: 0, yeni: true  },
]

// Toplam kategori sayısı (istatistik için)
const toplamKategoriSayisi = HIZMET_KATEGORİLERİ.length

// Örnek öne çıkan firmalar (seed verisinden)
const oneCikanFirmalar = [
  {
    slug: "geodezik-muhendislik",
    ad: "Geodezik Mühendislik Ltd. Şti.",
    sehir: "İstanbul",
    hizmetler: ["Rölöve", "Lazer Tarama", "Halihazır Harita"],
    tier: "PREMIUM",
    onaylı: true,
    aciklama: "15 yıllık deneyim, Leica & Trimble ekipmanlarıyla kentsel dönüşüm ve restorasyon projeleri.",
  },
  {
    slug: "izmir-lazer-tarama",
    ad: "İzmir Lazer Tarama Teknolojileri",
    sehir: "İzmir",
    hizmetler: ["Lazer Tarama", "BIM Modelleme"],
    tier: "PREMIUM",
    onaylı: true,
    aciklama: "Faro Focus ve Leica RTC360 ile endüstriyel tesisler ve tarihi yapı belgeleme.",
  },
  {
    slug: "skymap-drone",
    ad: "SkyMap Drone Haritalama",
    sehir: "İstanbul",
    hizmetler: ["Drone Haritalama", "Halihazır Harita"],
    tier: "PREMIUM",
    onaylı: false,
    aciklama: "DJI Phantom 4 RTK ile cm hassasiyetinde ortofoto, DSM ve DEM üretimi. Tüm Türkiye.",
  },
  {
    slug: "ankara-topografya",
    ad: "Ankara Topografya & Harita A.Ş.",
    sehir: "Ankara",
    hizmetler: ["Aplikasyon", "Halihazır Harita", "Rölöve"],
    tier: "ONAYLI",
    onaylı: true,
    aciklama: "Kamu projelerinde 20+ yıl tecrübe. Ankara ve İç Anadolu bölgesi.",
  },
]

// Açık talepler (örnek)
const aciTalepler = [
  { sehir: "İstanbul / Kadıköy", hizmet: "Rölöve",           baslik: "3 katlı bina rölövesi", sure: "2 saat önce" },
  { sehir: "Manisa / Akhisar",   hizmet: "Drone Haritalama", baslik: "120 dönüm tarım arazisi ortofoto", sure: "5 saat önce" },
  { sehir: "Bursa / Osmangazi",  hizmet: "Lazer Tarama",     baslik: "Tarihi konak restorasyon taraması", sure: "1 gün önce" },
  { sehir: "Ankara / Etimesgut", hizmet: "Aplikasyon",       baslik: "3 parselin aplikasyonu", sure: "1 gün önce" },
]

const istatistikler = [
  { deger: "1.240+", etiket: "Kayıtlı Firma" },
  { deger: "81",     etiket: "İl Kapsamı" },
  { deger: "15",     etiket: "Hizmet Kategorisi" },
  { deger: "1.200+", etiket: "Tamamlanan Talep" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ─── Hero ────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-emerald-50 to-white pt-20 pb-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 text-center">
          {/* Üst etiket */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm text-emerald-700 shadow-sm mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            Türkiye&apos;nin Jeodezi &amp; Haritacılık Platformu
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
            Haritacılık Hizmeti mi{" "}
            <span className="text-emerald-700">Arıyorsunuz?</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Rölöve, lazer tarama, drone haritalama ve daha fazlası için Türkiye genelinde
            onaylı firmalar ile doğrudan iletişime geçin — ya da herkese açık talep oluşturun.
          </p>

          {/* Arama */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="flex gap-2 bg-white border border-border rounded-xl p-2 shadow-sm">
              <div className="flex-1 flex items-center gap-2 px-2">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Hizmet, il veya firma adı arayın..."
                  className="w-full border-0 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Link href="/firmalar">
                <Button size="default" className="rounded-lg bg-emerald-700 hover:bg-emerald-800">
                  Ara
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Popüler:{" "}
              <Link href="/firmalar?hizmet=lazer-tarama" className="text-emerald-700 hover:underline">Lazer Tarama</Link>{", "}
              <Link href="/firmalar?hizmet=drone-haritalama" className="text-emerald-700 hover:underline">Drone Haritalama</Link>{", "}
              <Link href="/firmalar?hizmet=rolove" className="text-emerald-700 hover:underline">Rölöve</Link>
            </p>
          </div>

          {/* İstatistikler */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {istatistikler.map((s) => (
              <div key={s.etiket} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{s.deger}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.etiket}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hizmet Kategorileri ──────────────────────────────────────────────── */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Hizmet Kategorileri</h2>
              <p className="text-muted-foreground mt-1">İhtiyacınız olan hizmeti seçin</p>
            </div>
            <Link href="/firmalar" className="text-sm font-medium text-emerald-700 hover:underline flex items-center gap-1">
              Tüm firmalar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {hizmetKategorileri.map((kat) => (
              <Link key={kat.slug} href={`/firmalar?hizmet=${kat.slug}`}>
                <Card className="hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="text-3xl mb-3">{kat.icon}</div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground group-hover:text-emerald-700 transition-colors text-sm leading-tight">
                        {kat.ad}
                      </h3>
                      {kat.yeni && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">YENİ</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{kat.aciklama}</p>
                    <p className="mt-3 text-xs font-medium text-emerald-700">
                      {kat.yeni ? "Yakında" : `${kat.firmaCount} firma`}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Öne Çıkan Firmalar ──────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Öne Çıkan Firmalar</h2>
              <p className="text-muted-foreground mt-1">Premium ve Onaylı üye firmalar</p>
            </div>
            <Link href="/firmalar" className="text-sm font-medium text-emerald-700 hover:underline flex items-center gap-1">
              Tümünü gör <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {oneCikanFirmalar.map((firma) => (
              <Link key={firma.slug} href={`/firma/${firma.slug}`}>
                <Card className="hover:border-emerald-500/50 hover:shadow-md transition-all h-full cursor-pointer">
                  <CardContent className="p-5 flex flex-col h-full">
                    {/* Avatar & badges */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-bold text-lg flex-shrink-0">
                        {firma.ad[0]}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {firma.tier === "PREMIUM" && (
                          <Badge className="text-xs bg-amber-100 text-amber-800 border-amber-200 px-1.5">Premium</Badge>
                        )}
                        {firma.tier === "ONAYLI" && (
                          <Badge variant="secondary" className="text-xs px-1.5">Onaylı</Badge>
                        )}
                        {firma.onaylı && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        )}
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm text-foreground leading-tight">{firma.ad}</h3>
                    <p className="text-xs text-muted-foreground mt-1 flex-1 line-clamp-2">{firma.aciklama}</p>
                    <div className="mt-3 text-xs text-muted-foreground">📍 {firma.sehir}</div>
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                      {firma.hizmetler.slice(0, 2).map((h) => (
                        <span key={h} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                          {h}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Talep Merkezi Önizleme ───────────────────────────────────────────── */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Talep Merkezi</h2>
              <p className="text-muted-foreground mt-1">Herkese açık son hizmet talepleri</p>
            </div>
            <Link href="/talep-merkezi" className="text-sm font-medium text-emerald-700 hover:underline flex items-center gap-1">
              Tüm talepler <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {aciTalepler.map((talep, i) => (
              <Card key={i} className="hover:border-emerald-500/30 transition-all">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{talep.baslik}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      📍 {talep.sehir} &nbsp;·&nbsp;
                      <span className="text-emerald-700">{talep.hizmet}</span> &nbsp;·&nbsp; {talep.sure}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700 flex-shrink-0">Açık</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/talep-olustur">
              <Button className="bg-emerald-700 hover:bg-emerald-800 gap-2">
                <FileText className="h-4 w-4" />
                Talep Oluştur — Ücretsiz
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Neden GeoHub TR ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight">Neden GeoHub TR?</h2>
            <p className="text-muted-foreground mt-2">Jeodezi &amp; haritacılık sektörü için özel platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                baslik: "Onaylı Firmalar",
                acik: "Onaylı Üye rozetli firmalar belgeli ve doğrulanmış. Güvenle iletişime geçin.",
              },
              {
                icon: MessageCircle,
                baslik: "WhatsApp Bildirimi",
                acik: "Premium firmalar, bölgelerindeki yeni talepler için WhatsApp bildirimi alır. Hiçbir iş fırsatını kaçırmayın.",
              },
              {
                icon: Star,
                baslik: "Sektöre Özgü",
                acik: "EuroPages tarzı hizmet odaklı dizin. Rölöve'den BIM'e kadar tüm jeodezi hizmetleri tek platformda.",
              },
            ].map(({ icon: Icon, baslik, acik }) => (
              <div key={baslik} className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                    <Icon className="h-6 w-6 text-emerald-700" />
                  </div>
                </div>
                <h3 className="font-semibold">{baslik}</h3>
                <p className="text-sm text-muted-foreground">{acik}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-emerald-700">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Firmanız listede mi?
          </h2>
          <p className="mt-3 text-emerald-100 max-w-lg mx-auto">
            Ücretsiz profil oluşturun veya sahipsiz firmanızı sahiplenin. Aylık yüzlerce iş talebine ulaşın.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold">
                Firma Ekle — Ücretsiz
              </Button>
            </Link>
            <Link href="/uyelik">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                Üyelik Planlarını Gör
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
