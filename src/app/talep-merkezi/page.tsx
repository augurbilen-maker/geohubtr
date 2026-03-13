// GeoHub TR — Talep Merkezi
// Tüm açık hizmet talepleri herkese görünür
import Link from "next/link"
import { FileText, MapPin, Clock, Users, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const HİZMET_ETİKETLERİ: Record<string, { renk: string; bg: string; ad: string }> = {
  ROLOVE:            { renk: "text-blue-700",   bg: "bg-blue-50",   ad: "Rölöve" },
  ESKI_ESER:         { renk: "text-purple-700", bg: "bg-purple-50", ad: "Eski Eser Rölövesi" },
  HALIHAZIR_HARITA:  { renk: "text-teal-700",   bg: "bg-teal-50",   ad: "Halihazır Harita" },
  APLIKASYON:        { renk: "text-orange-700", bg: "bg-orange-50", ad: "Aplikasyon" },
  LAZER_TARAMA:      { renk: "text-red-700",    bg: "bg-red-50",    ad: "Lazer Tarama" },
  BIM_MODELLEME:     { renk: "text-indigo-700", bg: "bg-indigo-50", ad: "BIM Modelleme" },
  DRONE_HARITALAMA:  { renk: "text-sky-700",    bg: "bg-sky-50",    ad: "Drone Haritalama" },
  CIHAZ_KIRALAMA:    { renk: "text-emerald-700",bg: "bg-emerald-50",ad: "Cihaz Kiralama" },
}

// Statik örnek — gerçekte prisma ile çekilecek
const TALEPLER = [
  {
    id: "1",
    baslik: "Kadıköy'de 3 katlı bina rölövesi",
    aciklama: "Yaklaşık 350 m² kapalı alana sahip 3 katlı binamın mimari rölövesinin çizdirilmesi gerekiyor. AutoCAD formatında teslim.",
    serviceCategory: "ROLOVE",
    sehir: "İstanbul",
    ilce: "Kadıköy",
    teklifSayisi: 3,
    sure: "2 saat önce",
    son_tarih: "16 Mar 2026",
    durum: "OPEN",
    detaylar: { katSayısı: 3, yaklaşıkAlan: "350 m²", çıktıFormatı: "AutoCAD .dwg" },
  },
  {
    id: "2",
    baslik: "120 dönüm tarım arazisi drone ortofoto",
    aciklama: "Manisa'da 120 dönüm tarım arazisi için cm hassasiyetinde ortofoto ve DSM istiyorum. Meyve bahçesi sulama projesi.",
    serviceCategory: "DRONE_HARITALAMA",
    sehir: "Manisa",
    ilce: "Akhisar",
    teklifSayisi: 5,
    sure: "5 saat önce",
    son_tarih: "23 Mar 2026",
    durum: "OPEN",
    detaylar: { alan: "120 dönüm", GSD: "Max 5cm", çıktı: "Ortofoto + DSM" },
  },
  {
    id: "3",
    baslik: "Tarihi konak restorasyon için lazer tarama",
    aciklama: "Bursa'da 19. yy yapısı konağımız için restorasyon öncesi lazer tarama. E57 formatında teslim.",
    serviceCategory: "LAZER_TARAMA",
    sehir: "Bursa",
    ilce: "Osmangazi",
    teklifSayisi: 2,
    sure: "1 gün önce",
    son_tarih: "Açık",
    durum: "OPEN",
    detaylar: { alan: "620 m²", format: "E57 + PDF" },
  },
  {
    id: "4",
    baslik: "Etimesgut'ta 3 parselin aplikasyonu",
    aciklama: "Etimesgut'ta 3 parselin aplikasyonu gerekiyor. Belediye inşaat ruhsatı için şart. 10 gün içinde.",
    serviceCategory: "APLIKASYON",
    sehir: "Ankara",
    ilce: "Etimesgut",
    teklifSayisi: 4,
    sure: "1 gün önce",
    son_tarih: "12 Mar 2026",
    durum: "OPEN",
    detaylar: { parselSayısı: 3, amaç: "İnşaat ruhsatı" },
  },
  {
    id: "5",
    baslik: "Sanayi tesisi için halihazır harita",
    aciklama: "Kocaeli'de 15 dönümlük sanayi arazisi için 1/1000 ölçekli halihazır harita.",
    serviceCategory: "HALIHAZIR_HARITA",
    sehir: "Kocaeli",
    ilce: "Gebze",
    teklifSayisi: 1,
    sure: "2 gün önce",
    son_tarih: "Açık",
    durum: "OPEN",
    detaylar: { alan: "15 dönüm", ölçek: "1/1000" },
  },
  {
    id: "6",
    baslik: "Osmanlı dönemi cami rölövesi ve restitüsyon",
    aciklama: "İzmir'de 18. yy Osmanlı camii için rölöve, restitüsyon ve restorasyon projesi çizimi.",
    serviceCategory: "ESKI_ESER",
    sehir: "İzmir",
    ilce: "Konak",
    teklifSayisi: 0,
    sure: "3 gün önce",
    son_tarih: "Açık",
    durum: "OPEN",
    detaylar: { yapıTipi: "Osmanlı camii", hizmetler: "Rölöve + Restitüsyon" },
  },
]

const HİZMETLER = Object.entries(HİZMET_ETİKETLERİ).map(([k, v]) => ({ slug: k, ad: v.ad }))

export default function TalepMerkeziPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Başlık */}
      <section className="bg-white border-b border-border py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Talep Merkezi</h1>
              <p className="text-muted-foreground mt-1">
                Tüm açık hizmet talepleri — herkes görebilir, firmalar teklif verebilir.
              </p>
            </div>
            <Link href="/talep-olustur">
              <Button className="bg-emerald-700 hover:bg-emerald-800 gap-2">
                <Plus className="h-4 w-4" />
                Talep Oluştur
              </Button>
            </Link>
          </div>

          {/* Özet istatistik */}
          <div className="mt-6 flex gap-6 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{TALEPLER.length} açık talep</span>
            <span>·</span>
            <span>81 il kapsanıyor</span>
            <span>·</span>
            <span>Teklif vermek ücretsiz</span>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex gap-8">

          {/* Sol filtre */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-border p-5 sticky top-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Hizmet Filtrele
              </h3>
              <div className="space-y-1">
                <button className="w-full text-left text-sm px-2 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
                  Tümü
                </button>
                {HİZMETLER.map((h) => (
                  <button
                    key={h.slug}
                    className="w-full text-left text-sm px-2 py-1.5 rounded-lg text-muted-foreground hover:bg-gray-50 hover:text-foreground transition-colors"
                  >
                    {h.ad}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Talepler */}
          <div className="flex-1 space-y-4">
            {TALEPLER.map((talep) => {
              const kat = HİZMET_ETİKETLERİ[talep.serviceCategory]
              return (
                <Card key={talep.id} className="hover:shadow-md transition-all bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* İkon */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${kat.bg} flex items-center justify-center mt-0.5`}>
                        <FileText className={`h-5 w-5 ${kat.renk}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Başlık & badge */}
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <h3 className="font-semibold text-foreground">{talep.baslik}</h3>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${kat.bg} ${kat.renk}`}>
                              {kat.ad}
                            </span>
                            <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700">Açık</Badge>
                          </div>
                        </div>

                        {/* Açıklama */}
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{talep.aciklama}</p>

                        {/* Detay JSONB */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {Object.entries(talep.detaylar).map(([k, v]) => (
                            <span key={k} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {k}: {String(v)}
                            </span>
                          ))}
                        </div>

                        {/* Meta bilgi */}
                        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {talep.sehir} / {talep.ilce}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {talep.sure}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {talep.teklifSayisi} teklif
                          </span>
                          {talep.son_tarih !== "Açık" && (
                            <span className="text-orange-600">Son: {talep.son_tarih}</span>
                          )}
                        </div>
                      </div>

                      {/* Teklif ver butonu */}
                      <div className="flex-shrink-0 hidden sm:block">
                        <Link href={`/talep/${talep.id}`}>
                          <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                            Teklif Ver
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Boş state */}
            {TALEPLER.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>Henüz talep bulunmuyor.</p>
                <Link href="/talep-olustur" className="mt-4 inline-block">
                  <Button className="bg-emerald-700 hover:bg-emerald-800">İlk Talebi Oluştur</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
