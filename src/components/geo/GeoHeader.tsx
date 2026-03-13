import Link from "next/link"

const NAV_LINKS = [
  { href: "/firmalar", label: "Firmalar" },
  { href: "/harita", label: "🗺️ Harita" },
  { href: "/lokasyon", label: "Şehirler" },
  { href: "/talep-merkezi", label: "Talep Merkezi" },
  { href: "/is-ilanlari", label: "İş İlanları" },
  { href: "/bilgi-merkezi", label: "Bilgi Merkezi" },
]

export default function GeoHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A2540] shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white font-bold text-sm shadow">
              G
            </div>
            <span className="font-bold text-white text-[15px] tracking-tight">
              GeoHub<span className="text-blue-400">TR</span>
            </span>
          </Link>

          {/* Nav (masaüstü) */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Sağ butonlar */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/giris"
              className="text-sm text-blue-200 hover:text-white transition-colors hidden sm:block"
            >
              Giriş Yap
            </Link>
            <Link
              href="/talep-olustur"
              className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-colors"
            >
              + Talep Oluştur
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
