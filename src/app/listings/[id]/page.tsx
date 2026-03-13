import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Building2, Tag, DollarSign, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { auth } from "@/lib/auth"

const listingTypeLabel: Record<string, string> = {
  SALE_NEW: "For Sale — New",
  SALE_USED: "For Sale — Used",
  RENT: "For Rent / day",
  SERVICE: "Service",
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const [listing, session] = await Promise.all([
    prisma.listing.findUnique({
      where: { id: params.id },
      include: {
        company: { select: { id: true, name: true, slug: true, isVerified: true, website: true } },
        category: { select: { name: true, slug: true, customFieldsSchema: true } },
      },
    }),
    auth(),
  ])

  if (!listing || listing.status !== "ACTIVE") notFound()

  // Increment click count
  prisma.listing.update({ where: { id: listing.id }, data: { clickCount: { increment: 1 } } }).catch(() => {})

  const dynamicAttrs = listing.dynamicAttributes as Record<string, unknown>
  const schema = listing.category.customFieldsSchema as Array<{ name: string; type: string; unit?: string }>

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header session={session} />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <Link href="/directory" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 w-fit">
          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {listing.isPromoted && (
              <div className="flex items-center gap-2 text-amber-700 text-sm font-medium">
                <Star className="h-4 w-4" />
                Featured listing
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                  {listingTypeLabel[listing.listingType]}
                </span>
                <span className="text-xs text-muted-foreground">{listing.category.name}</span>
              </div>
              <h1 className="text-2xl font-bold">{listing.title}</h1>
              {listing.price && (
                <p className="text-3xl font-bold text-primary mt-2">
                  {listing.currency} {Number(listing.price).toLocaleString()}
                </p>
              )}
            </div>

            <div className="prose prose-sm max-w-none">
              <h3 className="font-semibold text-base mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{listing.description}</p>
            </div>

            {/* Dynamic attributes */}
            {Object.keys(dynamicAttrs).length > 0 && (
              <div>
                <h3 className="font-semibold text-base mb-3">Technical Specifications</h3>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {schema.filter((f) => dynamicAttrs[f.name] !== undefined && dynamicAttrs[f.name] !== "").map((field, idx) => (
                        <tr key={field.name} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                          <td className="px-4 py-3 font-medium text-muted-foreground w-40">{field.name}</td>
                          <td className="px-4 py-3">
                            <span className="font-medium">
                              {Array.isArray(dynamicAttrs[field.name])
                                ? (dynamicAttrs[field.name] as string[]).join(", ")
                                : typeof dynamicAttrs[field.name] === "boolean"
                                  ? (dynamicAttrs[field.name] ? "Yes" : "No")
                                  : String(dynamicAttrs[field.name])}
                            </span>
                            {field.unit && <span className="text-muted-foreground ml-1">{field.unit}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Company card */}
            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Sold by</p>
                <Link href={`/companies/${listing.company.slug}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                    {listing.company.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{listing.company.name}</p>
                    {listing.company.isVerified && (
                      <p className="text-xs text-green-600">✓ Verified company</p>
                    )}
                  </div>
                </Link>
                <div className="mt-4 space-y-2">
                  <Link href={`/companies/${listing.company.slug}`}>
                    <Button variant="outline" className="w-full" size="sm">View company</Button>
                  </Link>
                  {listing.company.website && (
                    <a href={listing.company.website} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full" size="sm">Contact seller</Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick info */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{listing.category.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{listingTypeLabel[listing.listingType]}</span>
                </div>
                {listing.price && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium text-primary">{listing.currency} {Number(listing.price).toLocaleString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
