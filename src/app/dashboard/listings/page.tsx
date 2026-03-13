import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

async function getListings(userId: string) {
  const company = await prisma.company.findFirst({ where: { ownerId: userId } })
  if (!company) return []
  return prisma.listing.findMany({
    where: { companyId: company.id },
    orderBy: [{ isPromoted: "desc" }, { createdAt: "desc" }],
  })
}

const listingTypeLabel: Record<string, string> = {
  SALE_NEW: "For Sale (New)",
  SALE_USED: "For Sale (Used)",
  RENT: "For Rent",
  SERVICE: "Service",
}

const statusConfig: Record<string, { label: string; className: string }> = {
  ACTIVE: { label: "Active", className: "bg-green-100 text-green-800" },
  DRAFT: { label: "Draft", className: "bg-slate-100 text-slate-700" },
  ARCHIVED: { label: "Archived", className: "bg-red-100 text-red-700" },
}

export default async function DashboardListingsPage() {
  const session = await auth()
  const listings = await getListings(session!.user.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Listings</h1>
          <p className="text-muted-foreground mt-1">{listings.length} listing{listings.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link href="/dashboard/listings/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add listing
          </Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <Card className="border-dashed">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="font-semibold mb-1">No listings yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Start adding your products, equipment, or services to reach potential customers.
            </p>
            <Link href="/dashboard/listings/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add your first listing
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-slate-50">
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Listing</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Price</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Stats</th>
                  <th className="text-right px-6 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {listings.map((listing) => {
                  const status = statusConfig[listing.status]
                  return (
                    <tr key={listing.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {listing.isPromoted && <Star className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />}
                          <div>
                            <p className="font-medium line-clamp-1">{listing.title}</p>
                            <p className="text-xs text-muted-foreground">{listing.serviceCategory}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-muted-foreground">{listingTypeLabel[listing.listingType]}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {listing.price ? (
                          <span className="font-medium">${Number(listing.price).toLocaleString()}</span>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {listing.viewCount}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/listings/${listing.id}`} className="text-xs text-muted-foreground hover:text-foreground underline">
                            View
                          </Link>
                          <Link href={`/dashboard/listings/${listing.id}/edit`} className="text-xs text-primary hover:underline">
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
