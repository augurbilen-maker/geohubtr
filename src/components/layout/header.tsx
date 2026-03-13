"use client"

import Link from "next/link"
import { useState } from "react"
import { MapPin, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/firmalar",       label: "Firmalar" },
  { href: "/talep-merkezi",  label: "Talep Merkezi" },
  { href: "/is-ilanlari",    label: "İş İlanları" },
  { href: "/bilgi-merkezi",  label: "Bilgi Merkezi" },
  { href: "/uyelik",         label: "Üyelik" },
]

export function Header({ session }: { session?: { user: { name?: string | null; role: string } } | null }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-foreground mr-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <span className="hidden sm:inline-block text-emerald-800">GeoHub TR</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {session ? (
            <>
              <Link href="/panel">
                <Button variant="ghost" size="sm">Panelim</Button>
              </Link>
              {session.user.role === "ADMIN" && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm">Admin</Button>
                </Link>
              )}
              <Link href="/api/auth/signout">
                <Button variant="outline" size="sm">Çıkış</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Giriş Yap</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800">Kayıt Ol</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="ml-auto md:hidden p-2 text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              {session ? (
                <Link href="/panel" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" size="sm">Panelim</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full" size="sm">Giriş Yap</Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-emerald-700 hover:bg-emerald-800" size="sm">Kayıt Ol</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
