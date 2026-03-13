import { prisma } from "@/lib/prisma"
import { Building2, List, Users, FileCheck, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

async function getStats() {
  const [companies, listings, users, pendingClaims, recentCompanies, recentClaims] = await Promise.all([
    prisma.company.count(),
    prisma.listing.count({ where: { status: "ACTIVE" } }),
    prisma.user.count(),
    prisma.claimRequest.count({ where: { status: "PENDING" } }),
    prisma.company.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, slug: true, isClaimed: true, subscriptionTier: true, createdAt: true },
    }),
    prisma.claimRequest.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: { select: { name: true, email: true } },
        company: { select: { name: true, slug: true } },
      },
    }),
  ])
  return { companies, listings, users, pendingClaims, recentCompanies, recentClaims }
}

export default async function AdminPage() {
  const { companies, listings, users, pendingClaims, recentCompanies, recentClaims } = await getStats()
  
  const statsCards = [
    { title: "Total Companies", value: companies.toLocaleString(), icon: Building2, href: "/admin/companies", color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Active Listings", value: listings.toLocaleString(), icon: List, href: "/admin/companies", color: "text-green-500", bg: "bg-green-50" },
    { title: "Registered Users", value: users.toLocaleString(), icon: Users, href: "/admin/users", color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Pending Claims", value: pendingClaims.toLocaleString(), icon: FileCheck, href: "/admin/claims", color: "text-amber-500", bg: "bg-amber-50" },
  ]
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening on the platform.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Pending Claims Alert */}
      {pendingClaims > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800">
                {pendingClaims} claim request{pendingClaims > 1 ? "s" : ""} awaiting review
              </p>
              <p className="text-sm text-amber-700">Review and approve or reject company ownership claims</p>
            </div>
          </div>
          <Link
            href="/admin/claims"
            className="text-sm font-medium text-amber-800 hover:text-amber-900 underline"
          >
            Review now →
          </Link>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Companies */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Recently Added Companies</CardTitle>
              <Link href="/admin/companies" className="text-xs text-primary hover:underline">View all</Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentCompanies.map((company) => (
                <div key={company.id} className="flex items-center justify-between px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-bold">
                      {company.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{company.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {company.isClaimed ? "Claimed" : "Unclaimed"} · {company.subscriptionTier}
                      </p>
                    </div>
                  </div>
                  <Link href={`/admin/companies/${company.id}`} className="text-xs text-primary hover:underline">
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Pending Claims */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Pending Claim Requests</CardTitle>
              <Link href="/admin/claims" className="text-xs text-primary hover:underline">View all</Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recentClaims.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                No pending claims. All caught up!
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentClaims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between px-6 py-3">
                    <div>
                      <p className="text-sm font-medium">{claim.company.name}</p>
                      <p className="text-xs text-muted-foreground">
                        by {claim.user.email}
                      </p>
                    </div>
                    <Link href="/admin/claims" className="text-xs text-primary hover:underline">
                      Review
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
