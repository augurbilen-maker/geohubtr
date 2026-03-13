import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const SITE_NAME = "GeoHub TR"
const SITE_DESCRIPTION =
  "Türkiye'nin En Kapsamlı Jeodezi & Harita Platformu — Rölöve, BIM Modelleme, Lazer Tarama, Halihazır Harita ve daha fazlası için yetkili firmalar."
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://geohub.com.tr"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Jeodezi, Harita ve Lazer Tarama Firmalarını Bul`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "jeodezi",
    "harita mühendisliği",
    "lazer tarama",
    "rölöve",
    "BIM modelleme",
    "fotogrametri",
    "drone haritalama",
    "CBS GIS",
    "halihazır harita",
    "aplikasyon ifraz",
    "LİHKAB",
    "gayrimenkul değerleme",
    "harita firması",
    "Türkiye",
  ],
  authors: [{ name: "GeoHub TR", url: SITE_URL }],
  creator: "GeoHub TR",
  publisher: "GeoHub TR",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Jeodezi, Harita ve Lazer Tarama Firmalarını Bul`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GeoHub TR — Türkiye Jeodezi Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Jeodezi & Harita Platformu`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "tr-TR": SITE_URL,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: "technology",
}

export const viewport: Viewport = {
  themeColor: "#0A2540",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Canonical domain */}
        <link rel="canonical" href={SITE_URL} />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={cn(
          inter.variable,
          "font-sans antialiased min-h-screen bg-white text-slate-900"
        )}
      >
        {children}
      </body>
    </html>
  )
}
