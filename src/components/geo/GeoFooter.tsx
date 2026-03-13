import Link from "next/link"
import cities from "@/data/cities.json"

// Büyük şehirler
const ONE_CIKAN = ["istanbul", "ankara", "izmir", "bursa", "antalya", "trabzon", "kocaeli", "samsun"]
const oneCikanIller = cities.filter((c) => ONE_CIKAN.includes(c.slug))

export default function GeoFooter() {
  return (
    <footer className="bg-[#0A2540] text-blue-200 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Marka */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white font-bold text-sm">
                G
              </div>
              <span className="font-bold text-white text-base">
                GeoHub<span className="text-blue-400">TR</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-blue-300">
              Türkiye&apos;nin En Kapsamlı Jeodezi &amp; Harita Platformu. 81 ilde
              doğru firmayı bulun, anında teklif alın.
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Hizmetler</h4>
            <ul className="space-y-1.5 text-sm">
              {["Rölöve", "Lazer Tarama", "BIM Modelleme", "Drone / İHA", "CBS / GIS", "Halihazır Harita"].map(
                (h) => (
                  <li key={h}>
                    <Link
                      href={`/hizmet/${h.toLowerCase().replace(/ \/ /g, "-").replace(/ /g, "-")}`}
                      className="hover:text-white transition-colors"
                    >
                      {h}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Şehirler */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Öne Çıkan Şehirler</h4>
            <ul className="space-y-1.5 text-sm">
              {oneCikanIller.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/lokasyon/${city.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Platform</h4>
            <ul className="space-y-1.5 text-sm">
              {[
                { href: "/firmalar", label: "Tüm Firmalar" },
                { href: "/talep-merkezi", label: "Talep Merkezi" },
                { href: "/is-ilanlari", label: "İş İlanları" },
                { href: "/bilgi-merkezi", label: "Bilgi Merkezi" },
                { href: "/uyelik", label: "Üyelik Planları" },
                { href: "/hakkimizda", label: "Hakkımızda" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alt çizgi */}
        <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400">
          <p>© {new Date().getFullYear()} GeoHub TR. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/gizlilik" className="hover:text-white">Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari" className="hover:text-white">Kullanım Koşulları</Link>
            <Link href="/iletisim" className="hover:text-white">İletişim</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
