import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Search, CheckCircle2, Building2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface SearchParams {
  q?: string
  category?: string
  tier?: string
  page?: string
}

// ServiceCategory enum değerleri — schema ile senkron
const CATEGORIES = [
  { key: "ROLOVE",                 label: "Rölöve" },
  { key: "ESKI_ESER",              label: "Eski Eser Rölövesi" },
  { key: "HALIHAZIR_HARITA",       label: "Halihazır Harita" },
  { key: "APLIKASYON",             label: "Aplikasyon, İfraz, Tevhit" },
  { key: "LIHKAB",                 label: "LİHKAB" },
  { key: "INSAAT_KONTROL",         label: "İnşaat Kontrol" },
  { key: "MADEN_OCAK",             label: "Maden & Ocak" },
  { key: "LAZER_TARAMA",           label: "Lazer Tarama" },
  { key: "BIM_MODELLEME",          label: "BIM Modelleme" },
  { key: "FOTOGRAMETRI",           label: "Fotogrametri" },
  { key: "DRONE_HARITALAMA",       label: "Drone / İHA Haritalama" },
  { key: "CBS_GIS",                label: "CBS / GIS" },
  { key: "GAYRIMENKUL_DEGERLEME",  label: "Gayrimenkul Değerleme" },
  { key: "CIHAZ_SATIS",            label: "Cihaz Satış & Kiralama" },
  { key: "EGITIM_KURUMU",          label: "Eğitim Kurumu" },
]

async function getDirectoryData(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || "1")
  const perPage = 12
  const skip = (page - 1) * perPage

  const companyWhere: Record<string, unknown> = {}
  if (searchParams.q) {
    companyWhere.OR = [
      { name: { contains: searchParams.q, mode: "insensitive" } },
      { description: { contains: searchParams.q, mode: "insensitive" } },
    ]
  }
  if (searchParams.tier) companyWhere.subscriptionTier = searchParams.tier
  if (searchParams.category) {
    // serviceCategories JSON array içinde ara
    companyWhere.serviceCategories = { string_contains: searchParams.category }
  }

  const [companies, total] = await Promise.all([
    prisma.company.findMany({
      where: companyWhere,
      orderBy: [
        { subscriptionTier: "desc" },
        { promotedUntil: { sort: "desc", nulls: "last" } },
        { createdAt: "desc" },
      ],
      include: {
        _count: { select: { listings: true } },
      },
      take: perPage,
      skip,
    }),
    prisma.company.count({ where: companyWhere }),
  ])

  return { companies, total, page, perPage }
}

const tierBadge: Record<string, { label: string; className: string }> = {
  PREMIUM: { label: "Premium", className: "bg-amber-100 text-amber-800 border-amber-200" },
  ONAYLI: { label: "Onaylı", className: "bg-blue-100 text-blue-800 border-blue-200" },
  FREE: { label: "", className: "" },
}

export default async function DirectoryPage({ searchParams }: { searchParams: SearchParams }) {
  const { companies, total, page, perPage } = await getDirectoryData(searchParams)
  const totalPages = Math.ceil(total / perPage)
  const selectedCategory = CATEGORIES.find((c) => c.key === searchParams.category)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="border-b border-border bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <h1 className="text-2xl font-bold text-foreground">
            {searchParams.q ? `"${searchParams.q}" için sonuçlar` : "Firma Rehberi"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {total.toLocaleString()} firma bulundu
            {selectedCategory ? ` — ${selectedCategory.label}` : ""}
          </p>

          <form className="mt-4 flex gap-2 max-w-xl" method="GET">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                name="q"
                defaultValue={searchParams.q}
                placeholder="Firma ara..."
                className="pl-9"
              />
            </div>
            <Button type="submit">Ara</Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Hizmet Kategorisi</h3>
                <div className="space-y-1">
                  <Link
                    href={`/directory${searchParams.q ? `?q=${searchParams.q}` : ""}`}
                    className={`flex items-center text-sm px-3 py-2 rounded-md transition-colors ${!searchParams.category ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"}`}
                  >
                    Tüm Kategoriler
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.key}
                      href={`/directory?category=${cat.key}${searchParams.q ? `&q=${searchParams.q}` : ""}`}
                      className={`flex items-center text-sm px-3 py-2 rounded-md transition-colors ${searchParams.category === cat.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"}`}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Üyelik Tipi</h3>
                <div className="space-y-1">
                  {["PREMIUM", "ONAYLI", "FREE"].map((tier) => (
                    <Link
                      key={tier}
                      href={`/directory?${searchParams.category ? `category=${searchParams.category}&` : ""}tier=${tier}`}
                      className={`flex items-center text-sm px-3 py-2 rounded-md transition-colors ${searchParams.tier === tier ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-slate-100"}`}
                    >
                      {tier === "PREMIUM" ? "Premium" : tier === "ONAYLI" ? "Onaylı" : "Ücretsiz"}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Company grid */}
          <div className="flex-1 min-w-0">
            {companies.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Building2 className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="font-medium text-lg">Firma bulunamadı</p>
                <p className="text-sm mt-1">Arama veya filtrelerinizi değiştirmeyi deneyin</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {companies.map((company) => {
                    const tier = tierBadge[company.subscriptionTier] ?? { label: "", className: "" }
                    const isPromoted = company.promotedUntil && new Date(company.promotedUntil) > new Date()
                    return (
                      <Link key={company.id} href={`/companies/${company.slug}`}>
                        <Card className={`hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer h-full ${isPromoted ? "border-amber-200 bg-amber-50/30" : ""}`}>
                          <CardContent className="p-5 flex flex-col h-full">
                            {isPromoted && (
                              <div className="text-xs text-amber-700 font-medium mb-2">Öne Çıkan</div>
                            )}
                            <div className="flex items-start gap-3 mb-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                                {company.name[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold text-sm truncate">{company.name}</h3>
                                  {tier.label && (
                                    <span className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-xs font-medium ${tier.className}`}>
                                      {tier.label}
                                    </span>
                                  )}
                                </div>
                                {company.isVerified && (
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-600">Doğrulandı</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                              {company.description || "Açıklama mevcut değil."}
                            </p>
                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                              <span>{company.city ?? ""}</span>
                              <span>{company._count.listings} ilan</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    {page > 1 && (
                      <Link href={`/directory?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}>
                        <Button variant="outline" size="sm">Önceki</Button>
                      </Link>
                    )}
                    <span className="text-sm text-muted-foreground px-4">
                      {page} / {totalPages}
                    </span>
                    {page < totalPages && (
                      <Link href={`/directory?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}>
                        <Button variant="outline" size="sm">Sonraki</Button>
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
