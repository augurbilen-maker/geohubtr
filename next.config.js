/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["tile.openstreetmap.org", "mt1.google.com", "unpkg.com"],
  },
  // Leaflet CSS import'ı için transpile
  transpilePackages: ["leaflet", "react-leaflet"],
  webpack: (config, { isServer }) => {
    // Leaflet server-side'da import edilmemesi için
    if (isServer) {
      config.externals = [...(config.externals || []), "leaflet"]
    }
    return config
  },
}

module.exports = nextConfig
