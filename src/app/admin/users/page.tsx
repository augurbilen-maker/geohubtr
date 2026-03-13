import { prisma } from "@/lib/prisma"
import { Users, Shield, Briefcase, User } from "lucide-react"
import { Card } from "@/components/ui/card"

async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      companies: { select: { id: true, name: true } },
    },
    take: 100,
  })
}

const roleConfig: Record<string, { label: string; icon: typeof User; color: string }> = {
  ADMIN: { label: "Admin", icon: Shield, color: "text-red-600 bg-red-50" },
  COMPANY_OWNER: { label: "Company Owner", icon: Briefcase, color: "text-blue-600 bg-blue-50" },
  INDIVIDUAL: { label: "Individual", icon: User, color: "text-slate-600 bg-slate-100" },
}

export default async function AdminUsersPage() {
  const users = await getUsers()
  
  const roleCount = {
    ADMIN: users.filter((u) => u.role === "ADMIN").length,
    COMPANY_OWNER: users.filter((u) => u.role === "COMPANY_OWNER").length,
    INDIVIDUAL: users.filter((u) => u.role === "INDIVIDUAL").length,
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-1">{users.length} registered users</p>
      </div>
      
      {/* Role breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(roleCount).map(([role, count]) => {
          const config = roleConfig[role]
          const Icon = config.icon
          return (
            <div key={role} className="rounded-lg border border-border bg-white p-4 flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${config.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground">{config.label}s</p>
              </div>
            </div>
          )
        })}
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-slate-50">
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">User</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Companies</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => {
                const roleConf = roleConfig[user.role]
                const Icon = roleConf.icon
                return (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {(user.name || user.email)[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{user.name || "—"}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${roleConf.color}`}>
                        <Icon className="h-3 w-3" />
                        {roleConf.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.companies.length > 0 ? (
                        <span className="text-xs">{user.companies.map(c => c.name).join(", ")}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
