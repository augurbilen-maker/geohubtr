// GeoHub TR — Üyelik Planları
import Link from "next/link"
import { Check, MessageCircle, Star, Shield, Zap, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const PLANLAR = [
  {
    ad: "Ücretsiz",
    fiyat: 0,
    aciklama: "Firmayı dizine ekle, taleplere bak.",
    renk: "border-border",
    buton: "Ücretsiz Başla",
    butonVariant: "outline" as const,
    ozellikler: [
      { var: true,  metin: "Firma profili oluşturma" },
      { var: true,  metin: "Hizmet listesi (max 2 ilan)" },
      { var: true,  metin: "Talep Merkezi'ni görüntüleme" },
      { var: true,  metin: "Firmaya mesaj gönderme" },
      { var: false, metin: "Onaylı Üye rozeti" },
      { var: false, metin: "Gelişmiş iletişim bilgileri" },
      { var: false, metin: "Arama sonuçlarında öncelik" },
      { var: false, metin: "Talep bildirimleri (e-posta)" },
      { var: false, metin: "WhatsApp bildirim" },
      { var: false, metin: "İstatistik & analitik" },
      { var: false, metin: "Sponsorlu içerik" },
    ],
  },
  {
    ad: "Onaylı Üye",
    fiyat: 500,
    aciklama: "Onay rozeti, daha fazla görünürlük.",
    renk: "border-emerald-300",
    buton: "Onaylı Üye Ol",
    butonVariant: "secondary" as const,
    ozellikler: [
      { var: true,  metin: "Firma profili oluşturma" },
      { var: true,  metin: "Hizmet listesi (max 10 ilan)" },
      { var: true,  metin: "Talep Merkezi'ni görüntüleme" },
      { var: true,  metin: "Firmaya mesaj gönderme" },
      { var: true,  metin: "Onaylı Üye rozeti ✓" },
      { var: true,  metin: "Gelişmiş iletişim bilgileri" },
      { var: true,  metin: "Arama sonuçlarında öncelik" },
      { var: true,  metin: "Talep bildirimleri (e-posta)" },
      { var: false, metin: "WhatsApp bildirim" },
      { var: false, metin: "İstatistik & analitik" },
      { var: false, metin: "Sponsorlu içerik" },
    ],
  },
  {
    ad: "Premium",
    fiyat: 1500,
    aciklama: "WhatsApp bildirim, tam görünürlük ve analitik.",
    renk: "border-amber-400",
    buton: "Premium Üye Ol",
    butonVariant: "default" as const,
    popüler: true,
    ozellikler: [
      { var: true,  metin: "Firma profili oluşturma" },
      { var: true,  metin: "Hizmet listesi (sınırsız ilan)" },
      { var: true,  metin: "Talep Merkezi'ni görüntüleme" },
      { var: true,  metin: "Firmaya mesaj gönderme" },
      { var: true,  metin: "Onaylı Üye rozeti ✓" },
      { var: true,  metin: "Gelişmiş iletişim bilgileri" },
      { var: true,  metin: "Arama sonuçlarında 1. öncelik" },
      { var: true,  metin: "Talep bildirimleri (e-posta)" },
      { var: true,  metin: "WhatsApp anlık bildirim 🔔" },
      { var: true,  metin: "İstatistik & analitik paneli" },
      { var: true,  metin: "Sponsorlu Bilgi Merkezi içeriği" },
    ],
  },
]

export default function UyelikPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Başlık */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 text-center">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Üyelik Planları</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            İhtiyacınıza uygun planı seçin. Tüm planlar aylık, taahhütsüz.
          </p>
        </div>
      </section>

      {/* Planlar */}
      <section className="py-12">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANLAR.map((plan) => (
              <Card key={plan.ad} className={`border-2 ${plan.renk} relative`}>
                {plan.popüler && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-400 text-amber-900 border-0 text-xs px-3 py-1">En Popüler</Badge>
                  </div>
                )}
                <CardHeader className="pb-4 pt-6 px-6">
                  <h3 className="text-lg font-bold">{plan.ad}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.aciklama}</p>
                  <div className="mt-4">
                    {plan.fiyat === 0 ? (
                      <span className="text-3xl font-bold text-foreground">Ücretsiz</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-foreground">
                          ₺{plan.fiyat.toLocaleString("tr-TR")}
                        </span>
                        <span className="text-muted-foreground text-sm">/ay</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <Link href="/auth/register">
                    <Button
                      variant={plan.butonVariant}
                      className={`w-full mb-6 ${plan.popüler ? "bg-amber-500 hover:bg-amber-600 text-white border-0" : plan.fiyat > 0 ? "bg-emerald-700 hover:bg-emerald-800 text-white border-0" : ""}`}
                    >
                      {plan.buton}
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {plan.ozellikler.map((oz) => (
                      <li key={oz.metin} className={`flex items-start gap-2.5 text-sm ${oz.var ? "text-foreground" : "text-muted-foreground/50"}`}>
                        <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${oz.var ? "text-emerald-600" : "text-muted-foreground/30"}`} />
                        {oz.metin}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp özelliği açıklaması */}
      <section className="py-14 bg-emerald-50 border-t border-emerald-100">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 mb-5">
            <MessageCircle className="h-7 w-7 text-emerald-700" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">WhatsApp Anlık Bildirim</h2>
          <p className="mt-3 text-muted-foreground">
            Premium üyeler, kendi hizmet kategorilerinde ve seçili illerinde yeni bir talep açıldığında
            <strong className="text-foreground"> WhatsApp'a anlık bildirim</strong> alır.
            Hiçbir iş fırsatını kaçırmayın; rakiplerinizden önce teklif verin.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 border border-emerald-200 text-sm text-emerald-800 font-medium">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
            Şu an 47 Premium firma bu özelliği kullanıyor
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="py-14 border-t border-border">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Sıkça Sorulan Sorular</h2>
          <div className="space-y-5">
            {[
              {
                s: "Taahhüt var mı?",
                c: "Hayır. Tüm planlar aylık olup istediğiniz zaman iptal edebilirsiniz.",
              },
              {
                s: "Firma verilerim güvende mi? Kişisel iletişim bilgilerim görünür mü?",
                c: "Kişisel telefon ve e-postalar gizlenir; yalnızca ofis telefonu ve info@ adresi görüntülenir. WhatsApp numaranız sadece size iletilen bildirimlerde kullanılır, ziyaretçilere gösterilmez.",
              },
              {
                s: "WhatsApp bildirimi nasıl çalışır?",
                c: "Kendi seçtiğiniz il ve hizmet kategorilerine ait yeni talepler anında WhatsApp mesajı olarak iletilir. Bildirimleri her an duraksatabilirsiniz.",
              },
              {
                s: "Onaylı rozet ne anlama geliyor?",
                c: "Belge doğrulama sürecinden geçmiş firmalar Onaylı rozeti alır. Bu rozet arama sonuçlarında güven artırmak için gösterilir.",
              },
            ].map(({ s, c }) => (
              <div key={s} className="border-b border-border pb-5">
                <p className="font-semibold text-foreground">{s}</p>
                <p className="text-sm text-muted-foreground mt-2">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
