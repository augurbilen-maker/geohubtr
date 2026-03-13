import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Eye, MousePointerClick, TrendingUp, List } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getAnalytics(userId: string) {
  const company = await prisma.company.findFirst({
    where: { ownerId: userId },
    include: {
      listings: {
        select: { id: true, title: true, viewCount: true, clickCount: true, status: true, isPromoted: true },
        orderBy: { viewCount: "desc" },
        take: 10,
      },
    },
  })
  return company
}

export default async function AnalyticsPage() {
  const session = await auth()
  const company = await getAnalytics(session!.user.id)

  if (!company) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-20" />
        <p className="font-medium">No data yet</p>
        <p className="text-sm mt-1">Create a company profile to see analytics</p>
      </div>
    )
  }

  const totalViews = company.listings.reduce((sum, l) => sum + l.viewCount, 0)
  const totalClicks = company.listings.reduce((sum, l) => sum + l.clickCount, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Performance overview for {company.name}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Eye className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{company.viewCount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Profile views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                <MousePointerClick className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalClicks.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Listing clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                <List className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Listing views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Listings */}
      {company.listings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Performing Listings</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-slate-50">
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Listing</th>
                  <th className="text-right px-6 py-3 font-medium text-muted-foreground">Views</th>
                  <th className="text-right px-6 py-3 font-medium text-muted-foreground">Clicks</th>
                  <th className="text-right px-6 py-3 font-medium text-muted-foreground">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {company.listings.map((listing) => {
                  const ctr = listing.viewCount > 0 ? ((listing.clickCount / listing.viewCount) * 100).toFixed(1) : "0.0"
                  return (
                    <tr key={listing.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          {listing.isPromoted && <span className="text-amber-500 text-xs">⭐</span>}
                          <span className="font-medium">{listing.title}</span>
                          <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs ${listing.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-700"}`}>
                            {listing.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-right">{listing.viewCount}</td>
                      <td className="px-6 py-3 text-right">{listing.clickCount}</td>
                      <td className="px-6 py-3 text-right text-muted-foreground">{ctr}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Upgrade CTA */}
      {company.subscriptionTier === "FREE" && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Get detailed analytics with Pro</p>
              <p className="text-sm text-muted-foreground mt-1">See traffic trends over time, lead sources, and demographic data</p>
            </div>
            <button className="flex-shrink-0 rounded-md bg-primary text-primary-foreground text-sm font-medium px-4 py-2 hover:bg-primary/90 transition-colors">
              Upgrade to Pro
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
