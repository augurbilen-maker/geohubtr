import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Search, Filter, CheckCircle2, Building2, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface SearchParams {
  q?: string
  category?: string
  type?: string
  tier?: string
  page?: string
}

interface CustomField {
  name: string
  type: "number" | "select" | "multiselect" | "boolean" | "text"
  unit?: string
  options?: string[]
  min?: number
  max?: number
  filterable?: boolean
}

async function getDirectoryData(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || "1")
  const perPage = 12
  const skip = (page - 1) * perPage

  // Build where clause for companies
  const companyWhere: Record<string, unknown> = {}
  if (searchParams.q) {
    companyWhere.OR = [
      { name: { contains: searchParams.q, mode: "insensitive" } },
      { description: { contains: searchParams.q, mode: "insensitive" } },
    ]
  }
  if (searchParams.tier) companyWhere.subscriptionTier = searchParams.tier

  const [companies, total, categories] = await Promise.all([
    prisma.company.findMany({
      where: companyWhere,
      orderBy: [
        // Premium first, then by promoted date, then organic
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
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { listings: true } } },
    }),
  ])

  return { companies, total, categories, page, perPage }
}

const tierBadge: Record<string, { label: string; className: string }> = {
  PREMIUM: { label: "Premium", className: "bg-amber-100 text-amber-800 border-amber-200" },
  PRO: { label: "Pro", className: "bg-blue-100 text-blue-800 border-blue-200" },
  FREE: { label: "", className: "" },
}

export default async function DirectoryPage({ searchParams }: { searchParams: SearchParams }) {
  const { companies, total, categories, page, perPage } = await getDirectoryData(searchParams)
  const totalPages = Math.ceil(total / perPage)
  const selectedCategory = categories.find((c) => c.slug === searchParams.category)
  const customFields = (selectedCategory?.customFieldsSchema as CustomField[] | undefined) || []
  const filterableFields = customFields.filter((f) => f.filterable)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="border-b border-border bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <h1 className="text-2xl font-bold text-foreground">
            {searchParams.q ? `Results for "${searchParams.q}"` : "Company Directory"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {total.toLocaleString()} companies found
            {searchParams.category && selectedCategory ? ` in ${selectedCategory.name}` : ""}
          </p>

          {/* Search bar */}
          <form className="mt-4 flex gap-2 max-w-xl" method="GET">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                name="q"
                defaultValue={searchParams.q}
                placeholder="Search companies..."
                className="pl-9"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            {/* Categories */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Category</h3>
                <div className="space-y-1">
                  <Link
                    href={`/directory${searchParams.q ? `?q=${searchParams.q}` : ""}`}
                    className={`flex items-center justify-between text-sm px-3 py-2 rounded-md transition-colors ${!searchParams.category ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"}`}
                  >
                    <span>All Categories</span>
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/directory?category=${cat.slug}${searchParams.q ? `&q=${searchParams.q}` : ""}`}
                      className={`flex items-center justify-between text-sm px-3 py-2 rounded-md transition-colors ${searchParams.category === cat.slug ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"}`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-60">{cat._count.listings}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Dynamic JSONB Filters */}
              {filterableFields.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-3">Filters</h3>
                  <form method="GET">
                    {searchParams.category && (
                      <input type="hidden" name="category" value={searchParams.category} />
                    )}
                    <div className="space-y-4">
                      {filterableFields.map((field) => (
                        <div key={field.name}>
                          <label className="text-xs font-medium text-foreground mb-1.5 block">
                            {field.name}
                            {field.unit && <span className="text-muted-foreground ml-1">({field.unit})</span>}
                          </label>
                          {field.type === "select" && field.options && (
                            <div className="space-y-1">
                              {field.options.map((opt) => (
                                <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                                  <input type="checkbox" name={`f_${field.name}`} value={opt} className="rounded border-border" />
                                  <span className="text-muted-foreground">{opt}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          {field.type === "number" && (
                            <div className="flex gap-2 items-center">
                              <Input
                                type="number"
                                name={`f_${field.name}_min`}
                                placeholder={`${field.min ?? 0}`}
                                className="h-8 text-xs"
                              />
                              <span className="text-xs text-muted-foreground">–</span>
                              <Input
                                type="number"
                                name={`f_${field.name}_max`}
                                placeholder={`${field.max ?? "∞"}`}
                                className="h-8 text-xs"
                              />
                            </div>
                          )}
                          {field.type === "boolean" && (
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <input type="checkbox" name={`f_${field.name}`} value="true" className="rounded border-border" />
                              <span className="text-muted-foreground">Yes</span>
                            </label>
                          )}
                        </div>
                      ))}
                      <Button type="submit" size="sm" className="w-full">
                        <Filter className="h-3.5 w-3.5 mr-1.5" />
                        Apply filters
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Subscription tier filter */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Tier</h3>
                <div className="space-y-1">
                  {["PREMIUM", "PRO", "FREE"].map((tier) => (
                    <Link
                      key={tier}
                      href={`/directory?${searchParams.category ? `category=${searchParams.category}&` : ""}tier=${tier}`}
                      className={`flex items-center text-sm px-3 py-2 rounded-md transition-colors ${searchParams.tier === tier ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-slate-100"}`}
                    >
                      {tier.charAt(0) + tier.slice(1).toLowerCase()}
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
                <p className="font-medium text-lg">No companies found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {companies.map((company) => {
                    const tier = tierBadge[company.subscriptionTier]
                    const isPromoted = company.promotedUntil && new Date(company.promotedUntil) > new Date()
                    return (
                      <Link key={company.id} href={`/companies/${company.slug}`}>
                        <Card className={`hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer h-full ${isPromoted ? "border-amber-200 bg-amber-50/30" : ""}`}>
                          <CardContent className="p-5 flex flex-col h-full">
                            {isPromoted && (
                              <div className="text-xs text-amber-700 font-medium mb-2">Featured</div>
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
                                    <span className="text-xs text-green-600">Verified</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                              {company.description || "No description available."}
                            </p>
                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                              <span>
                                {company.city && company.country ? `${company.city}, ${company.country}` : ""}
                              </span>
                              <span>{company._count.listings} listing{company._count.listings !== 1 ? "s" : ""}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    {page > 1 && (
                      <Link href={`/directory?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}>
                        <Button variant="outline" size="sm">Previous</Button>
                      </Link>
                    )}
                    <span className="text-sm text-muted-foreground px-4">
                      Page {page} of {totalPages}
                    </span>
                    {page < totalPages && (
                      <Link href={`/directory?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}>
                        <Button variant="outline" size="sm">Next</Button>
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
