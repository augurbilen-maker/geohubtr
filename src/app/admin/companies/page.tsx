import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Building2, Plus, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PageProps {
  searchParams: { q?: string; tier?: string; claimed?: string }
}

async function getCompanies(searchParams: PageProps["searchParams"]) {
  const where: Record<string, unknown> = {}
  
  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q, mode: "insensitive" } },
      { website: { contains: searchParams.q, mode: "insensitive" } },
    ]
  }
  if (searchParams.tier) where.subscriptionTier = searchParams.tier
  if (searchParams.claimed === "true") where.isClaimed = true
  if (searchParams.claimed === "false") where.isClaimed = false
  
  return prisma.company.findMany({
    where,
    orderBy: [
      { subscriptionTier: "desc" },
      { createdAt: "desc" },
    ],
    include: {
      _count: { select: { listings: true } },
      owner: { select: { name: true, email: true } },
    },
    take: 50,
  })
}

const tierColor: Record<string, string> = {
  PREMIUM: "bg-amber-100 text-amber-800",
  PRO: "bg-blue-100 text-blue-800",
  FREE: "bg-slate-100 text-slate-700",
}

export default async function AdminCompaniesPage({ searchParams }: PageProps) {
  const companies = await getCompanies(searchParams)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Companies</h1>
          <p className="text-muted-foreground mt-1">{companies.length} companies in the directory</p>
        </div>
        <Link href="/admin/companies/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </Link>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Link href="/admin/companies" className="text-xs px-3 py-1.5 rounded-full border hover:bg-slate-50 transition-colors">All</Link>
        <Link href="?claimed=false" className="text-xs px-3 py-1.5 rounded-full border hover:bg-slate-50 transition-colors">Unclaimed</Link>
        <Link href="?claimed=true" className="text-xs px-3 py-1.5 rounded-full border hover:bg-slate-50 transition-colors">Claimed</Link>
        <Link href="?tier=PREMIUM" className="text-xs px-3 py-1.5 rounded-full border hover:bg-slate-50 transition-colors">Premium</Link>
        <Link href="?tier=PRO" className="text-xs px-3 py-1.5 rounded-full border hover:bg-slate-50 transition-colors">Pro</Link>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-slate-50">
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Company</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Tier</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Owner</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Listings</th>
                <th className="text-right px-6 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                        {company.name[0]}
                      </div>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-xs text-muted-foreground">{company.website || company.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tierColor[company.subscriptionTier]}`}>
                      {company.subscriptionTier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {company.isClaimed ? (
                        <><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /><span className="text-xs">Claimed</span></>
                      ) : (
                        <><XCircle className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">Unclaimed</span></>
                      )}
                      {company.isVerified && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-800">Verified</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {company.owner ? (
                      <div>
                        <p className="text-xs font-medium">{company.owner.name}</p>
                        <p className="text-xs text-muted-foreground">{company.owner.email}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs">{company._count.listings}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/companies/${company.slug}`} className="text-xs text-muted-foreground hover:text-foreground underline">
                        View
                      </Link>
                      <Link href={`/admin/companies/${company.id}`} className="text-xs text-primary hover:underline">
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
