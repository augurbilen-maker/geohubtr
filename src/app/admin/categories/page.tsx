import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { listings: true } },
    },
  })
}

const typeColor: Record<string, string> = {
  EQUIPMENT: "bg-blue-100 text-blue-800",
  SERVICE: "bg-green-100 text-green-800",
  SOFTWARE: "bg-purple-100 text-purple-800",
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground mt-1">Manage categories and their dynamic field schemas</p>
        </div>
        <Link href="/admin/categories/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat) => {
          const schema = cat.customFieldsSchema as Array<{ name: string; type: string; filterable?: boolean }>
          return (
            <Card key={cat.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{cat.name}</h3>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${typeColor[cat.type]}`}>
                        {cat.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {cat._count.listings} listings
                      </span>
                    </div>
                    {cat.description && (
                      <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
                    )}
                    {/* JSONB Schema Preview */}
                    <div className="flex flex-wrap gap-2">
                      {schema.map((field) => (
                        <div key={field.name} className="flex items-center gap-1.5 text-xs bg-slate-100 rounded-md px-2 py-1">
                          <span className="font-medium">{field.name}</span>
                          <span className="text-muted-foreground">({field.type})</span>
                          {field.filterable && (
                            <span className="text-blue-600">• filterable</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link href={`/directory?category=${cat.slug}`} className="text-xs text-muted-foreground hover:text-foreground underline">
                      View
                    </Link>
                    <Link href={`/admin/categories/${cat.id}`} className="text-xs text-primary hover:underline">
                      Edit
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
