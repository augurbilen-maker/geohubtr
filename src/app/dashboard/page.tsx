import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Building2, List, Eye, MousePointerClick, ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { redirect } from "next/navigation"

const serviceCategoryLabel: Record<string, string> = {
  ROLOVE: "Rölöve", ESKI_ESER: "Eski Eser", HALIHAZIR_HARITA: "Halihazır Harita",
  APLIKASYON: "Aplikasyon", LIHKAB: "LİHKAB", INSAAT_KONTROL: "İnşaat Kontrol",
  MADEN_OCAK: "Maden & Ocak", LAZER_TARAMA: "Lazer Tarama", BIM_MODELLEME: "BIM Modelleme",
  FOTOGRAMETRI: "Fotogrametri", DRONE_HARITALAMA: "Drone/İHA", CBS_GIS: "CBS/GIS",
  GAYRIMENKUL_DEGERLEME: "Gayrimenkul", CIHAZ_SATIS: "Cihaz Satış", EGITIM_KURUMU: "Eğitim",
}

async function getDashboardData(userId: string) {
  const [company, recentListings] = await Promise.all([
    prisma.company.findFirst({
      where: { ownerId: userId },
      include: { _count: { select: { listings: true } } },
    }),
    prisma.listing.findMany({
      where: { company: { ownerId: userId } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ])
  return { company, recentListings }
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { company, recentListings } = await getDashboardData(session.user.id)

  const statusColor: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-800",
    DRAFT: "bg-slate-100 text-slate-700",
    ARCHIVED: "bg-red-100 text-red-700",
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Hoş geldiniz{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">Profil ve ilanlarınıza genel bakış.</p>
        </div>
        <Link href="/dashboard/listings/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            İlan Ekle
          </Button>
        </Link>
      </div>

      {/* Company Profile Card */}
      {company ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary text-xl font-bold">
                  {company.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-semibold text-lg">{company.name}</h2>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${company.subscriptionTier === "PREMIUM" ? "bg-amber-100 text-amber-800" : company.subscriptionTier === "ONAYLI" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-700"}`}>
                      {company.subscriptionTier}
                    </span>
                    {company.isVerified && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Doğrulandı
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">geohubtr.vercel.app/firma/{company.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/firma/${company.slug}`}>
                  <Button variant="outline" size="sm">Profilimi Gör</Button>
                </Link>
                <Link href="/dashboard/firma-duzenle">
                  <Button variant="outline" size="sm">Düzenle</Button>
                </Link>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              {[
                { icon: Eye, label: "Profil görüntüleme", value: company.viewCount.toLocaleString() },
                { icon: List, label: "Toplam ilan", value: company._count.listings.toString() },
                { icon: MousePointerClick, label: "İletişim tıklaması", value: company.contactClickCount.toLocaleString() },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <div className="flex justify-center mb-1">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {company.subscriptionTier === "FREE" && (
              <div className="mt-4 rounded-lg bg-primary/5 border border-primary/20 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Onaylı üyeliğe geç — daha fazla görünürlük</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Arama sonuçlarında öne çık, analytics ve rozet kazan</p>
                </div>
                <Link href="/uyelik">
                  <Button size="sm">Yükselt</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
            <h3 className="font-semibold mb-1">Henüz firma profiliniz yok</h3>
            <p className="text-sm text-muted-foreground mb-4">Firma profilinizi oluşturarak ilan ekleyebilirsiniz.</p>
            <Link href="/dashboard/firma-duzenle">
              <Button>Firma Profili Oluştur</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Recent Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Son İlanlar</h2>
          <Link href="/dashboard/listings" className="text-sm text-primary hover:underline flex items-center gap-1">
            Tümünü gör <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {recentListings.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <List className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
              <p className="text-sm text-muted-foreground">Henüz ilan yok.</p>
              <Link href="/dashboard/listings/new">
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus className="h-4 w-4 mr-1.5" />
                  İlk ilanınızı ekleyin
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <div className="divide-y divide-border">
              {recentListings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[listing.status]}`}>
                        {listing.status}
                      </span>
                      <p className="text-sm font-medium truncate">{listing.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {serviceCategoryLabel[listing.serviceCategory] ?? listing.serviceCategory} · {listing.listingType}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {listing.price && (
                      <span className="text-sm font-medium">{listing.currency} {Number(listing.price).toLocaleString()}</span>
                    )}
                    <Link href={`/listings/${listing.id}`} className="text-xs text-primary hover:underline">Gör</Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
