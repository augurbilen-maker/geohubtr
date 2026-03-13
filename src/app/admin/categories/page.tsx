import { Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// ServiceCategory enum değerlerini insan okunabilir formata çevir
const CATEGORIES = [
  { key: "ROLOVE", label: "Rölöve", group: "Klasik Jeodezi & Kadastro" },
  { key: "ESKI_ESER", label: "Eski Eser Rölövesi & Restorasyon", group: "Klasik Jeodezi & Kadastro" },
  { key: "HALIHAZIR_HARITA", label: "Halihazır Harita", group: "Klasik Jeodezi & Kadastro" },
  { key: "APLIKASYON", label: "Aplikasyon, İfraz, Tevhit", group: "Klasik Jeodezi & Kadastro" },
  { key: "LIHKAB", label: "LİHKAB", group: "Klasik Jeodezi & Kadastro" },
  { key: "INSAAT_KONTROL", label: "İnşaat Kontrol & Metraj", group: "Klasik Jeodezi & Kadastro" },
  { key: "MADEN_OCAK", label: "Maden & Ocak Ölçümü", group: "Klasik Jeodezi & Kadastro" },
  { key: "LAZER_TARAMA", label: "Lazer Tarama & 3D Nokta Bulutu", group: "3D Teknoloji" },
  { key: "BIM_MODELLEME", label: "BIM Modelleme", group: "3D Teknoloji" },
  { key: "FOTOGRAMETRI", label: "Fotogrametri", group: "3D Teknoloji" },
  { key: "DRONE_HARITALAMA", label: "Drone / İHA Haritalama", group: "3D Teknoloji" },
  { key: "CBS_GIS", label: "CBS / GIS Hizmetleri", group: "CBS / GIS" },
  { key: "GAYRIMENKUL_DEGERLEME", label: "Gayrimenkul Değerleme", group: "Ticari & Değerleme" },
  { key: "CIHAZ_SATIS", label: "Cihaz Satış & Kiralama", group: "Ekipman" },
  { key: "EGITIM_KURUMU", label: "Eğitim Kurumu", group: "Eğitim" },
]

export default function AdminCategoriesPage() {
  const groups = Array.from(new Set(CATEGORIES.map((c) => c.group)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hizmet Kategorileri</h1>
          <p className="text-muted-foreground mt-1">
            Platformdaki {CATEGORIES.length} hizmet kategorisi — bunlar sistem enum değerleridir.
          </p>
        </div>
      </div>

      {groups.map((group) => (
        <div key={group}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {group}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {CATEGORIES.filter((c) => c.group === group).map((cat) => (
              <Card key={cat.key} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex items-center gap-3">
                  <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{cat.label}</p>
                    <p className="text-xs text-muted-foreground font-mono">{cat.key}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
