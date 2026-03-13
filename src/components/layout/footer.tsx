import Link from "next/link"
import { MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Marka */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-emerald-800">GeoHub TR</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Türkiye&apos;nin Jeodezi &amp; Haritacılık Hizmetleri Platformu. Rölöve&apos;den drone haritalamaya kadar tüm çözümler.
            </p>
          </div>

          {/* Firmalar */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Firmalar</h3>
            <ul className="space-y-3">
              {[
                { ad: "Tüm Firmalar", href: "/firmalar" },
                { ad: "Rölöve Firmaları", href: "/firmalar?hizmet=rolove" },
                { ad: "Lazer Tarama", href: "/firmalar?hizmet=lazer-tarama" },
                { ad: "Drone Haritalama", href: "/firmalar?hizmet=drone-haritalama" },
              ].map((item) => (
                <li key={item.ad}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.ad}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {[
                { ad: "Talep Merkezi", href: "/talep-merkezi" },
                { ad: "Bilgi Merkezi", href: "/bilgi-merkezi" },
                { ad: "Üyelik Planları", href: "/uyelik" },
                { ad: "Firma Ekle", href: "/auth/register" },
              ].map((item) => (
                <li key={item.ad}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.ad}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-3">
              {[
                { ad: "Hakkımızda", href: "#" },
                { ad: "İletişim", href: "#" },
                { ad: "Gizlilik Politikası", href: "#" },
                { ad: "Kullanım Koşulları", href: "#" },
              ].map((item) => (
                <li key={item.ad}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.ad}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GeoHub TR. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Gizlilik</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Koşullar</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Çerezler</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
