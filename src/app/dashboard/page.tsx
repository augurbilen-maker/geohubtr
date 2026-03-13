import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Building2, List, Eye, MousePointerClick, ShieldCheck, ArrowRight, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

async function getDashboardData(userId: string) {
  const [company, recentListings] = await Promise.all([
    prisma.company.findFirst({
      where: { ownerId: userId },
      include: { _count: { select: { listings: true, projects: true } } },
    }),
    prisma.listing.findMany({
      where: { company: { ownerId: userId } },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { category: { select: { name: true } } },
    }),
  ])
  return { company, recentListings }
}

export default async function DashboardPage() {
  const session = await auth()
  const { company, recentListings } = await getDashboardData(session!.user.id)

  const statusColor: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-800",
    DRAFT: "bg-slate-100 text-slate-700",
    ARCHIVED: "bg-red-100 text-red-700",
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}! 👋</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s an overview of your profile and listings.</p>
        </div>
        <Link href="/dashboard/listings/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add listing
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
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${company.subscriptionTier === "PREMIUM" ? "bg-amber-100 text-amber-800" : company.subscriptionTier === "PRO" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-700"}`}>
                      {company.subscriptionTier}
                    </span>
                    {company.isVerified && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{company.slug}.b2bconnect.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/companies/${company.slug}`}>
                  <Button variant="outline" size="sm">View public page</Button>
                </Link>
                <Link href="/dashboard/settings">
                  <Button variant="outline" size="sm">Edit profile</Button>
                </Link>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border">
              {[
                { icon: Eye, label: "Profile views", value: company.viewCount.toLocaleString() },
                { icon: List, label: "Total listings", value: company._count.listings.toString() },
                { icon: FolderOpen, label: "Projects", value: company._count.projects.toString() },
                { icon: MousePointerClick, label: "Listing clicks", value: "—" },
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

            {/* Upgrade CTA */}
            {company.subscriptionTier === "FREE" && (
              <div className="mt-4 rounded-lg bg-primary/5 border border-primary/20 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Upgrade to Pro for more visibility</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Get featured in search results and unlock premium analytics</p>
                </div>
                <Button size="sm">Upgrade</Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
            <h3 className="font-semibold mb-1">No company profile yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Create your company profile to start listing products and services.</p>
            <Link href="/dashboard/settings">
              <Button>Create company profile</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Recent Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Listings</h2>
          <Link href="/dashboard/listings" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {recentListings.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <List className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
              <p className="text-sm text-muted-foreground">No listings yet.</p>
              <Link href="/dashboard/listings/new">
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus className="h-4 w-4 mr-1.5" />
                  Add your first listing
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
                    <p className="text-xs text-muted-foreground mt-0.5">{listing.category.name} · {listing.listingType.replace("_", " ")}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {listing.price && (
                      <span className="text-sm font-medium">${Number(listing.price).toLocaleString()}</span>
                    )}
                    <Link href={`/dashboard/listings/${listing.id}/edit`} className="text-xs text-primary hover:underline">Edit</Link>
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
