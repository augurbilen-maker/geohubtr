// GeoHub TR — Firma Profil Sayfası
// Kişisel iletişim gizli; ofis telefonu & info@ görünür
import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckCircle2, MapPin, Globe, Phone, Mail, Lock, MessageCircle, Star, FileText, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Statik örnek — üretimde prisma.company.findUnique({ where: { slug } })
const FIRMALAR: Record<string, {
  slug: string; ad: string; logo?: string
  sehir: string; ilce: string; adres: string; website: string
  officePhone: string; infoEmail: string; whatsappVar: boolean
  tier: string; onaylı: boolean; doğrulandı: boolean
  aciklama: string; hizmetler: string[]
  ilanlar: { baslik: string; tur: string; aciklama: string }[]
  projeler: { baslik: string; sehir: string; yıl: string }[]
}> = {
  "geodezik-muhendislik": {
    slug: "geodezik-muhendislik",
    ad: "Geodezik Mühendislik Ltd. Şti.",
    sehir: "İstanbul", ilce: "Sarıyer",
    adres: "Maslak Mah. Büyükdere Cad. No:123, Sarıyer / İstanbul",
    website: "https://geodezik.com.tr",
    officePhone: "+90 212 555 10 20",
    infoEmail: "info@geodezik.com.tr",
    whatsappVar: true,
    tier: "PREMIUM",
    onaylı: true,
    doğrulandı: true,
    aciklama:
      "İstanbul merkezli, 15 yıllık deneyimimizle rölöve, halihazır harita ve lazer tarama hizmetleri sunuyoruz. Leica ve Trimble ekipmanlarıyla çalışıyor, kentsel dönüşüm ve restorasyon projelerinde uzmanlaşıyoruz. TKGM onaylı lisanslı harita mühendisleri.",
    hizmetler: ["Rölöve", "Eski Eser Rölövesi", "Halihazır Harita", "Lazer Tarama"],
    ilanlar: [
      {
        baslik: "Mimari Rölöve — Tarihi Yapılar ve Konutlar",
        tur: "Hizmet",
        aciklama: "Leica totalstation ile mimari rölöve. AutoCAD & Revit formatı. 3–10 iş günü.",
      },
      {
        baslik: "3D Lazer Tarama & Nokta Bulutu Üretimi",
        tur: "Hizmet",
        aciklama: "Leica RTC360. E57/LAS/RCP çıktısı. Endüstriyel & tarihi yapılar.",
      },
    ],
    projeler: [
      { baslik: "Kapalıçarşı Restorasyon Rölövesi", sehir: "İstanbul", yıl: "2024" },
      { baslik: "M7 Metrosu İstasyon Lazer Taraması", sehir: "İstanbul", yıl: "2023" },
      { baslik: "Galata Kulesi Çevre Düzenlemesi Haritası", sehir: "İstanbul", yıl: "2023" },
    ],
  },
  "izmir-lazer-tarama": {
    slug: "izmir-lazer-tarama",
    ad: "İzmir Lazer Tarama Teknolojileri",
    sehir: "İzmir", ilce: "Konak",
    adres: "Konak Mah. Anafartalar Cad. No:67, Konak / İzmir",
    website: "https://izmirlazer.com.tr",
    officePhone: "+90 232 666 77 88",
    infoEmail: "info@izmirlazer.com.tr",
    whatsappVar: true,
    tier: "PREMIUM",
    onaylı: true,
    doğrulandı: true,
    aciklama:
      "Ege bölgesinin önde gelen lazer tarama ve BIM modelleme firması. Faro Focus ve Leica RTC360 ile endüstriyel tesisler, tarihi yapılar ve altyapı projeleri için nokta bulutu ve BIM modelleri üretiyoruz.",
    hizmetler: ["Lazer Tarama", "BIM Modelleme"],
    ilanlar: [
      {
        baslik: "BIM Modelleme & Revit Çizim Hizmetleri",
        tur: "Hizmet",
        aciklama: "Revit, Navisworks. LOD 200/300/400. IFC + RVT teslim.",
      },
    ],
    projeler: [
      { baslik: "SOCAR Rafinerisi Lazer Tarama", sehir: "İzmir", yıl: "2025" },
      { baslik: "Bergama Akropolü Belgeleme", sehir: "İzmir", yıl: "2024" },
    ],
  },
}

interface Props {
  params: { slug: string }
}

export default function FirmaProfilPage({ params }: Props) {
  const firma = FIRMALAR[params.slug]

  if (!firma) {
    notFound()
  }

  const tierRenk =
    firma.tier === "PREMIUM"
      ? "bg-amber-100 text-amber-800 border-amber-200"
      : firma.tier === "ONAYLI"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : "bg-gray-100 text-gray-600 border-gray-200"

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6">
        {/* Geri */}
        <Link href="/firmalar" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Tüm Firmalar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ─── Ana içerik ────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Profil başlık kartı */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-2xl">
                    {firma.ad[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-xl font-bold text-foreground">{firma.ad}</h1>
                      {firma.tier !== "FREE" && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${tierRenk}`}>
                          {firma.tier === "PREMIUM" ? "Premium" : "Onaylı"}
                        </span>
                      )}
                      {firma.doğrulandı && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {firma.sehir} / {firma.ilce}
                    </p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {firma.hizmetler.map((h) => (
                        <span key={h} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{firma.aciklama}</p>
              </CardContent>
            </Card>

            {/* Hizmet ilanları */}
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Hizmet İlanları</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-3">
                {firma.ilanlar.map((ilan) => (
                  <div key={ilan.baslik} className="border border-border rounded-lg p-4 hover:border-emerald-300 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{ilan.baslik}</h3>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{ilan.tur}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{ilan.aciklama}</p>
                    <p className="text-xs text-emerald-700 mt-2 font-medium">
                      Fiyat bilgisi için iletişime geçin →
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Projeler */}
            {firma.projeler.length > 0 && (
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Tamamlanan Projeler</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-3">
                    {firma.projeler.map((proje) => (
                      <div key={proje.baslik} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm text-foreground">{proje.baslik}</span>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {proje.sehir} · {proje.yıl}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* ─── Sağ kolon (iletişim) ─────────────────────────────────── */}
          <div className="space-y-5">

            {/* İletişim kartı */}
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">İletişim</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                {/* Ofis telefonu */}
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Ofis Telefonu</p>
                    <p className="text-sm font-medium text-foreground">{firma.officePhone}</p>
                  </div>
                </div>

                {/* Genel e-posta */}
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">E-posta</p>
                    <p className="text-sm font-medium text-foreground">{firma.infoEmail}</p>
                  </div>
                </div>

                {/* Web sitesi */}
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Web Sitesi</p>
                    <a
                      href={firma.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-emerald-700 hover:underline"
                    >
                      {firma.website.replace("https://", "")}
                    </a>
                  </div>
                </div>

                {/* WhatsApp — gizli (sadece firma sahibi görebilir) */}
                <div className="flex items-center gap-3 opacity-50">
                  <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <p className="text-sm font-medium text-muted-foreground">
                      •••••••••••{" "}
                      <span className="text-xs">(yalnızca firma sahibi)</span>
                    </p>
                  </div>
                </div>

                {/* Adres */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Adres</p>
                    <p className="text-sm text-foreground">{firma.adres}</p>
                  </div>
                </div>

                {/* CTA butonları */}
                <div className="pt-2 space-y-2">
                  <a href={`mailto:${firma.infoEmail}`}>
                    <Button className="w-full bg-emerald-700 hover:bg-emerald-800 gap-2">
                      <Mail className="h-4 w-4" /> E-posta Gönder
                    </Button>
                  </a>
                  <a href={`tel:${firma.officePhone}`}>
                    <Button variant="outline" className="w-full gap-2 border-emerald-200 text-emerald-700">
                      <Phone className="h-4 w-4" /> Ara
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Talep oluştur kutusu */}
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-emerald-800 mb-2">Bu Firmadan Teklif İsteyin</h3>
                <p className="text-xs text-emerald-700 mb-4">
                  Talep oluşturun — bu firma ve benzer firmalar size teklif versin.
                </p>
                <Link href="/talep-olustur">
                  <Button size="sm" className="w-full bg-emerald-700 hover:bg-emerald-800 gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> Talep Oluştur
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Sahiplenme kutusu — sahipsiz firmalar için */}
            {!firma.doğrulandı && (
              <Card className="border-dashed border-border">
                <CardContent className="p-5 text-center">
                  <p className="text-sm text-muted-foreground mb-3">Bu firmanın sahibi misiniz?</p>
                  <Link href={`/firma/${firma.slug}/sahiplen`}>
                    <Button size="sm" variant="outline" className="w-full">
                      Profili Sahiplen
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
