import { prisma } from "@/lib/prisma"
import { Clock, CheckCircle2, XCircle, Mail, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { revalidatePath } from "next/cache"

async function getClaims() {
  return prisma.claimRequest.findMany({
    orderBy: [
      { status: "asc" }, // PENDING first
      { createdAt: "desc" },
    ],
    include: {
      user: { select: { id: true, name: true, email: true } },
      company: { select: { id: true, name: true, slug: true, website: true, email: true } },
    },
  })
}

async function approveClaim(claimId: string, userId: string, companyId: string) {
  "use server"
  await prisma.$transaction([
    prisma.claimRequest.update({
      where: { id: claimId },
      data: { status: "APPROVED", reviewedAt: new Date() },
    }),
    prisma.company.update({
      where: { id: companyId },
      data: { ownerId: userId, isClaimed: true },
    }),
  ])
  revalidatePath("/admin/claims")
}

async function rejectClaim(claimId: string) {
  "use server"
  await prisma.claimRequest.update({
    where: { id: claimId },
    data: { status: "REJECTED", reviewedAt: new Date() },
  })
  revalidatePath("/admin/claims")
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  PENDING: { label: "Pending", color: "bg-amber-100 text-amber-800", icon: Clock },
  APPROVED: { label: "Approved", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
}

export default async function AdminClaimsPage() {
  const claims = await getClaims()
  const pending = claims.filter((c) => c.status === "PENDING")
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Claim Requests</h1>
        <p className="text-muted-foreground mt-1">
          {pending.length} pending · {claims.length} total requests
        </p>
      </div>
      
      <div className="space-y-4">
        {claims.map((claim) => {
          const config = statusConfig[claim.status]
          const Icon = config.icon
          
          // Domain matching logic
          const userDomain = claim.user.email.split("@")[1]
          const companyDomain = claim.company.website?.replace(/^https?:\/\//, "").split("/")[0] || ""
          const domainMatch = companyDomain && userDomain === companyDomain
          
          return (
            <Card key={claim.id} className={claim.status === "PENDING" ? "border-amber-200" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    {/* Status badge */}
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.color}`}>
                        <Icon className="h-3 w-3" />
                        {config.label}
                      </span>
                      {domainMatch && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                          Email domain matches
                        </span>
                      )}
                      {!domainMatch && claim.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                          Domain mismatch — manual review required
                        </span>
                      )}
                    </div>
                    
                    {/* Company & User info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Company</p>
                        <p className="font-semibold">{claim.company.name}</p>
                        {claim.company.website && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Globe className="h-3 w-3" />
                            {claim.company.website}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Claimant</p>
                        <p className="font-medium">{claim.user.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {claim.user.email}
                        </div>
                      </div>
                    </div>
                    
                    {claim.message && (
                      <div className="rounded-md bg-slate-50 border border-border p-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Message from claimant:</p>
                        <p className="text-sm">{claim.message}</p>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Submitted {new Date(claim.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  {claim.status === "PENDING" && (
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <form action={approveClaim.bind(null, claim.id, claim.user.id, claim.company.id)}>
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                          Approve
                        </Button>
                      </form>
                      <form action={rejectClaim.bind(null, claim.id)}>
                        <Button size="sm" variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                          <XCircle className="h-3.5 w-3.5 mr-1.5" />
                          Reject
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
        
        {claims.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium">No claim requests yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
