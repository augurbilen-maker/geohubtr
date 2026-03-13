import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Globe, Mail, Phone, MapPin, Star, ArrowRight, ShieldCheck, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { auth } from "@/lib/auth"
import { Separator } from "@/components/ui/separator"

interface PageProps {
  params: { slug: string }
}

const listingTypeLabel: Record<string, string> = {
  SALE_NEW: "New",
  SALE_USED: "Used",
  RENT: "Rental",
  SERVICE: "Service",
}

const tierConfig: Record<string, { label: string; color: string }> = {
  PREMIUM: { label: "Premium", color: "bg-amber-100 text-amber-800" },
  PRO: { label: "Pro", color: "bg-blue-100 text-blue-800" },
  FREE: { label: "Free", color: "bg-slate-100 text-slate-700" },
}

export async function generateMetadata({ params }: PageProps) {
  const company = await prisma.company.findUnique({ where: { slug: params.slug }, select: { name: true, description: true } })
  return {
    title: company?.name || "Company",
    description: company?.description?.slice(0, 160),
  }
}

export default async function CompanyPage({ params }: PageProps) {
  const [company, session] = await Promise.all([
    prisma.company.findUnique({
      where: { slug: params.slug },
      include: {
        listings: {
          where: { status: "ACTIVE" },
          orderBy: [{ isPromoted: "desc" }, { createdAt: "desc" }],
          include: { category: { select: { name: true, slug: true } } },
          take: 12,
        },
        projects: { orderBy: { createdAt: "desc" }, take: 6 },
        _count: { select: { listings: true, projects: true } },
      },
    }),
    auth(),
  ])

  if (!company) notFound()

  // Increment view count (fire and forget)
  prisma.company.update({ where: { id: company.id }, data: { viewCount: { increment: 1 } } }).catch(() => {})

  const isOwner = session?.user?.id === company.ownerId
  const isAdmin = session?.user?.role === "ADMIN"
  const canManage = isOwner || isAdmin
  const tier = tierConfig[company.subscriptionTier]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header session={session} />

      {/* Company Header */}
      <div className="border-b border-border bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo */}
            <div className="flex-shrink-0 flex h-20 w-20 items-center justify-center rounded-xl bg-primary/10 text-primary text-3xl font-bold">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="h-20 w-20 rounded-xl object-contain" />
              ) : (
                company.name[0]
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold">{company.name}</h1>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tier.color}`}>
                  {tier.label}
                </span>
                {company.isVerified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
              </div>
              
              {company.description && (
                <p className="mt-2 text-muted-foreground max-w-2xl">{company.description}</p>
              )}
              
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <Globe className="h-4 w-4" />
                    {company.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
                {company.email && (
                  <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <Mail className="h-4 w-4" />
                    {company.email}
                  </a>
                )}
                {company.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4" />
                    {company.phone}
                  </span>
                )}
                {(company.city || company.country) && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {[company.city, company.country].filter(Boolean).join(", ")}
                  </span>
                )}
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              {canManage && (
                <Link href="/dashboard">
                  <Button size="sm" variant="outline">Manage Profile</Button>
                </Link>
              )}
              {!company.isClaimed && !canManage && (
                <Link href={`/companies/${company.slug}/claim`}>
                  <Button size="sm" variant="outline">
                    <ShieldCheck className="h-4 w-4 mr-1.5" />
                    Claim this company
                  </Button>
                </Link>
              )}
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="w-full">
                    Visit website
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </a>
              )}
            </div>
          </div>
          
          {/* Unclaimed banner */}
          {!company.isClaimed && (
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800">This profile hasn't been claimed yet</p>
                  <p className="text-xs text-blue-700 mt-0.5">Are you from {company.name}? Claim this profile to manage it and add your listings.</p>
                </div>
              </div>
              <Link href={`/companies/${company.slug}/claim`}>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 whitespace-nowrap">
                  Claim profile
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8">
        {/* Listings */}
        {company.listings.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-4">
              Listings <span className="text-muted-foreground font-normal text-base">({company._count.listings})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.listings.map((listing) => (
                <Link key={listing.id} href={`/listings/${listing.id}`}>
                  <Card className="hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer h-full">
                    <CardContent className="p-5 flex flex-col h-full">
                      {listing.isPromoted && (
                        <div className="text-xs text-amber-700 font-medium mb-2">Featured listing</div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs">
                          {listingTypeLabel[listing.listingType]}
                        </span>
                        <span className="text-xs text-muted-foreground">{listing.category.name}</span>
                      </div>
                      <h3 className="font-medium text-sm line-clamp-2 flex-1">{listing.title}</h3>
                      {listing.price && (
                        <p className="mt-2 font-semibold text-primary">
                          ${Number(listing.price).toLocaleString()}
                          {listing.listingType === "RENT" && <span className="text-xs font-normal text-muted-foreground"> /day</span>}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {company.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">
              Projects <span className="text-muted-foreground font-normal text-base">({company._count.projects})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {company.projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-5">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{project.description}</p>
                    {project.completedAt && (
                      <p className="text-xs text-muted-foreground mt-3">
                        Completed {new Date(project.completedAt).getFullYear()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
        
        {company.listings.length === 0 && company.projects.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium">No listings or projects yet</p>
            {company.isClaimed ? (
              <p className="text-sm mt-1">The company owner hasn't added any content yet.</p>
            ) : (
              <Link href={`/companies/${company.slug}/claim`}>
                <Button variant="outline" className="mt-4">Claim to add listings</Button>
              </Link>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
