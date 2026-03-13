"use client"

/**
 * GeoMapWrapper — Server Component'ten güvenle çağrılabilir dinamik import sarmalayıcısı.
 * Leaflet SSR gerektirmediğinden sadece client'ta render edilir.
 */

import dynamic from "next/dynamic"
import type { MapFirma } from "./GeoMap"

const GeoMap = dynamic(() => import("./GeoMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200" style={{ height: "600px" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-slate-500 font-medium">GeoHub Harita yükleniyor...</span>
      </div>
    </div>
  ),
})

interface GeoMapWrapperProps {
  firmalar: MapFirma[]
  center?: [number, number]
  zoom?: number
  googleMapsApiKey?: string
  height?: string
  selectedFirmaId?: number | null
  onFirmaSelect?: (firma: MapFirma | null) => void
}

export default function GeoMapWrapper(props: GeoMapWrapperProps) {
  return <GeoMap {...props} />
}
