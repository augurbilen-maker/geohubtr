"use client"

/**
 * TagInput — Firma etiketi yönetim bileşeni
 *
 * Özellikler:
 * - Yazıp Enter/virgül ile etiket ekle
 * - × ile etiket sil
 * - Hizmet kategorisine göre önerilen etiketler
 * - Türkçe normalizasyon (küçük harf, boşluk trim)
 * - Max etiket sayısı + karakter limiti
 * - Duplicate engelleme
 * - Klavye navigasyonu (Backspace son etiketi siler)
 */

import { useState, useRef, KeyboardEvent, useCallback } from "react"

// ─── ÖNERİLEN ETİKETLER ──────────────────────────────────────────────────────

const ONERI_ETIKETLER: Record<string, string[]> = {
  genel: [
    "TKGM lisanslı", "ISO 9001", "SPK lisanslı", "drone operatörü",
    "yurt dışı proje", "acil hizmet", "online rapor", "saha ekibi",
    "7/24 destek", "ödüllü firma", "10+ yıl deneyim", "ulusal hizmet",
  ],
  "lazer-tarama": [
    "Leica RTC360", "FARO Focus", "nokta bulutu", "as-built",
    "tersine mühendislik", "endüstriyel tesis", "tarihi yapı",
    "tank ölçümü", "boru hattı", "deformasyon izleme",
  ],
  "bim-modelleme": [
    "Autodesk Revit", "ArchiCAD", "Navisworks", "BIM 360",
    "LOD 300", "LOD 400", "MEP koordinasyonu", "clash detection",
    "dijital ikiz", "4D BIM",
  ],
  "rolove": [
    "mimari rölöve", "yapısal rölöve", "cephe ölçümü",
    "vaziyet planı", "kesit çizimi", "restorasyon",
  ],
  "drone-iha": [
    "DJI Matrice", "DJI Phantom RTK", "termal kamera",
    "BVLOS izinli", "SHY-İHA Seviye 1", "enerji hattı",
    "tarım ilaçlama", "3D model", "ortofoto",
  ],
  "cbs-gis": [
    "ArcGIS Pro", "QGIS", "web GIS", "PostGIS",
    "uzaktan algılama", "uydu görüntüsü", "belediye projesi",
    "altyapı yönetimi", "mekansal analiz",
  ],
  "halihazir-harita": [
    "imar planı", "1/500 ölçek", "1/1000 ölçek",
    "topoğrafik harita", "sayısal arazi modeli",
    "NetCAD", "tarım arazisi", "orman alanı",
  ],
  "fotogrametri": [
    "Agisoft Metashape", "Pix4D", "ContextCapture",
    "yakın fotogrametri", "hava fotogrametrisi",
    "DEM üretimi", "ortofoto", "3D mesh",
  ],
  "gayrimenkul-degerleme": [
    "konut değerleme", "ticari değerleme", "arazi değerleme",
    "kamulaştırma", "SPK raporu", "banka ekspertizi",
    "ipotekli değerleme", "miras taksimi",
  ],
  "egitim-kurumu": [
    "lisans", "yüksek lisans", "doktora", "MYO",
    "sertifika programı", "online eğitim", "ÖSYM puanı",
    "staj imkânı", "yurt içi burs",
  ],
}

function onerilerAl(hizmetler: string[], mevcutEtiketler: string[]): string[] {
  const set = new Set<string>(ONERI_ETIKETLER.genel)
  for (const h of hizmetler) {
    for (const tag of ONERI_ETIKETLER[h] || []) set.add(tag)
  }
  // Zaten eklenmiş olanları çıkar
  return Array.from(set).filter((t) => !mevcutEtiketler.includes(t))
}

// ─── NORMALIZASYON ────────────────────────────────────────────────────────────

function normaliz(s: string): string {
  return s.trim().toLowerCase().slice(0, 32)  // max 32 karakter/etiket
}

// ─── PROPS ────────────────────────────────────────────────────────────────────

interface TagInputProps {
  /** Mevcut etiket listesi */
  value: string[]
  /** Etiket listesi değiştiğinde */
  onChange: (tags: string[]) => void
  /** Firmanın aktif hizmet slug'ları — önerileri filtrelemek için */
  activeServices?: string[]
  /** Max etiket sayısı, default 20 */
  maxTags?: number
  /** Readonly mod */
  disabled?: boolean
  placeholder?: string
}

// ─── BİLEŞEN ─────────────────────────────────────────────────────────────────

export default function TagInput({
  value = [],
  onChange,
  activeServices = [],
  maxTags = 20,
  disabled = false,
  placeholder = "Etiket yaz, Enter'a bas...",
}: TagInputProps) {
  const [input, setInput] = useState("")
  const [focused, setFocused] = useState(false)
  const [showOneriler, setShowOneriler] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addTag = useCallback(
    (raw: string) => {
      const tag = normaliz(raw)
      if (!tag || tag.length < 2) return
      if (value.includes(tag)) return // duplicate
      if (value.length >= maxTags) return
      onChange([...value, tag])
      setInput("")
    },
    [value, onChange, maxTags]
  )

  const removeTag = useCallback(
    (tag: string) => {
      onChange(value.filter((t) => t !== tag))
    },
    [value, onChange]
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(input)
    } else if (e.key === "Backspace" && input === "" && value.length > 0) {
      // Son etiketi sil
      removeTag(value[value.length - 1])
    }
  }

  const oneriler = onerilerAl(activeServices, value)
  const filtreliOneriler = input
    ? oneriler.filter((o) => o.toLowerCase().includes(input.toLowerCase()))
    : oneriler

  return (
    <div className="space-y-3">
      {/* Tag input kutusu */}
      <div
        className={[
          "min-h-[52px] w-full flex flex-wrap gap-1.5 p-2.5 rounded-xl border transition-all cursor-text",
          disabled
            ? "bg-slate-50 border-slate-200 cursor-not-allowed"
            : focused
            ? "border-blue-400 bg-white ring-2 ring-blue-100"
            : "border-slate-200 bg-white hover:border-slate-300",
        ].join(" ")}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {/* Mevcut etiketler */}
        {value.map((tag) => (
          <span
            key={tag}
            className={[
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-medium transition-colors",
              disabled
                ? "bg-slate-100 text-slate-600"
                : "bg-blue-50 text-blue-800 border border-blue-200",
            ].join(" ")}
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
                className="ml-0.5 text-blue-400 hover:text-red-500 transition-colors leading-none text-base"
                title={`"${tag}" etiketini kaldır`}
              >
                ×
              </button>
            )}
          </span>
        ))}

        {/* Input */}
        {!disabled && value.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { setFocused(true); setShowOneriler(true) }}
            onBlur={() => {
              setFocused(false)
              setTimeout(() => setShowOneriler(false), 150)
            }}
            placeholder={value.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[140px] bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
          />
        )}
      </div>

      {/* Sayaç ve ipucu */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          {value.length < maxTags ? (
            <>
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono text-[10px]">Enter</kbd>
              {" veya "}
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono text-[10px]">,</kbd>
              {" ile etiket ekle · "}
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono text-[10px]">⌫</kbd>
              {" son etiketi sil"}
            </>
          ) : (
            <span className="text-amber-600">Maksimum {maxTags} etiket doldu</span>
          )}
        </span>
        <span className={value.length >= maxTags ? "text-amber-600 font-medium" : ""}>
          {value.length} / {maxTags}
        </span>
      </div>

      {/* Önerilen etiketler */}
      {!disabled && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => setShowOneriler((v) => !v)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              💡 Önerilen Etiketler
              <span className="text-blue-400">{showOneriler ? "▲" : "▼"}</span>
            </button>
            {activeServices.length === 0 && (
              <span className="text-xs text-slate-400">
                (Hizmet seçince özelleşir)
              </span>
            )}
          </div>

          {showOneriler && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              {/* Gruplu öneriler */}
              {input ? (
                // Arama modunda filtrelenmiş
                <div className="flex flex-wrap gap-2">
                  {filtreliOneriler.length > 0 ? (
                    filtreliOneriler.slice(0, 20).map((tag) => (
                      <OneriBadge key={tag} tag={tag} onAdd={addTag} disabled={value.length >= maxTags} />
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">
                      &quot;{input}&quot; için öneri yok — Enter&apos;a bas ve ekle
                    </span>
                  )}
                </div>
              ) : (
                // Kategorilere göre gruplu
                <div className="space-y-3">
                  {/* Genel */}
                  <OnerilerGrubu
                    baslik="Genel"
                    etiketler={ONERI_ETIKETLER.genel}
                    mevcutlar={value}
                    onAdd={addTag}
                    disabled={value.length >= maxTags}
                  />
                  {/* Aktif hizmetlere göre */}
                  {activeServices.map((srv) =>
                    ONERI_ETIKETLER[srv] ? (
                      <OnerilerGrubu
                        key={srv}
                        baslik={srv.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        etiketler={ONERI_ETIKETLER[srv]}
                        mevcutlar={value}
                        onAdd={addTag}
                        disabled={value.length >= maxTags}
                      />
                    ) : null
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── YARDIMCI BİLEŞENLER ─────────────────────────────────────────────────────

function OneriBadge({
  tag,
  onAdd,
  disabled,
  eklendi = false,
}: {
  tag: string
  onAdd: (t: string) => void
  disabled: boolean
  eklendi?: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => onAdd(tag)}
      disabled={disabled || eklendi}
      className={[
        "text-xs px-2.5 py-1 rounded-lg border font-medium transition-all",
        eklendi
          ? "bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default"
          : disabled
          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
          : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 cursor-pointer",
      ].join(" ")}
    >
      {eklendi ? "✓ " : "+ "}
      {tag}
    </button>
  )
}

function OnerilerGrubu({
  baslik,
  etiketler,
  mevcutlar,
  onAdd,
  disabled,
}: {
  baslik: string
  etiketler: string[]
  mevcutlar: string[]
  onAdd: (t: string) => void
  disabled: boolean
}) {
  return (
    <div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
        {baslik}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {etiketler.map((tag) => (
          <OneriBadge
            key={tag}
            tag={tag}
            onAdd={onAdd}
            disabled={disabled && !mevcutlar.includes(tag)}
            eklendi={mevcutlar.includes(tag)}
          />
        ))}
      </div>
    </div>
  )
}
