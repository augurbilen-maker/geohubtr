"use client"

/**
 * /dashboard/firma-duzenle — Firma Profil Düzenleme Sayfası
 *
 * Bölümler:
 * 1. Temel Bilgiler (ad, açıklama, kuruluş yılı)
 * 2. İletişim & Konum (il, ilçe, adres, tel, web, e-posta)
 * 3. Hizmetler (checkbox, max 8)
 * 4. Hizmet Kapsamı (yerel / bölgesel / ulusal + il seçimi)
 * 5. Etiketler (TagInput)
 * 6. Ekipman & Yazılım (serbest metin listesi)
 * 7. Kaydet butonu + önizleme linki
 */

import { useState, useCallback } from "react"
import Link from "next/link"
import TagInput from "@/components/geo/TagInput"

// ─── VERİ ─────────────────────────────────────────────────────────────────────

const TUM_HIZMETLER = [
  { slug: "lazer-tarama",           label: "Lazer Tarama",           icon: "📡" },
  { slug: "bim-modelleme",          label: "BIM Modelleme",          icon: "🏗️" },
  { slug: "rolove",                 label: "Rölöve",                 icon: "📐" },
  { slug: "drone-iha",              label: "Drone / İHA",            icon: "🚁" },
  { slug: "cbs-gis",                label: "CBS / GIS",              icon: "🗺️" },
  { slug: "halihazir-harita",       label: "Halihazır Harita",       icon: "📏" },
  { slug: "fotogrametri",           label: "Fotogrametri",           icon: "📷" },
  { slug: "gayrimenkul-degerleme",  label: "Gayrimenkul Değerleme",  icon: "🏢" },
  { slug: "koordnat-sistemi",       label: "Koordinat Sistemi",      icon: "🧭" },
  { slug: "zemin-etud",             label: "Zemin Etüdü",            icon: "⛏️" },
  { slug: "altyapi-haritasi",       label: "Altyapı Haritası",       icon: "🔧" },
  { slug: "egitim-kurumu",          label: "Eğitim Kurumu",          icon: "🎓" },
]

const BOLGE_ILLER: Record<string, string[]> = {
  "Marmara":       ["İstanbul","Bursa","Kocaeli","Sakarya","Tekirdağ","Edirne","Kırklareli","Çanakkale","Balıkesir","Yalova","Bilecik"],
  "Ege":           ["İzmir","Manisa","Aydın","Denizli","Muğla","Afyonkarahisar","Uşak","Kütahya"],
  "Akdeniz":       ["Antalya","Mersin","Adana","Hatay","Isparta","Burdur","Kahramanmaraş","Osmaniye"],
  "İç Anadolu":   ["Ankara","Konya","Eskişehir","Kayseri","Sivas","Yozgat","Aksaray","Niğde","Nevşehir","Kırşehir","Kırıkkale","Karaman","Çankırı"],
  "Karadeniz":     ["Trabzon","Samsun","Ordu","Giresun","Rize","Artvin","Zonguldak","Bartın","Kastamonu","Sinop","Bolu","Düzce","Karabük","Amasya","Tokat","Çorum","Bayburt","Gümüşhane"],
  "Doğu Anadolu": ["Erzurum","Van","Malatya","Elazığ","Diyarbakır","Şanlıurfa","Gaziantep","Adıyaman","Şırnak","Siirt","Batman","Mardin","Kilis","Ağrı","Kars","Ardahan","Iğdır","Bingöl","Muş","Bitlis","Hakkari","Tunceli"],
  "Güneydoğu":    ["Gaziantep","Şanlıurfa","Diyarbakır","Mardin","Adıyaman","Kilis"],
}

// Tüm şehirler düz liste
const TUM_ILLER = Array.from(
  new Set(Object.values(BOLGE_ILLER).flat())
).sort((a, b) => a.localeCompare(b, "tr"))

// ─── MOK FİRMA VERİSİ ─────────────────────────────────────────────────────────

interface FirmaFormu {
  ad: string
  aciklama: string
  kurulisYili: string
  sehir: string
  ilce: string
  adres: string
  telefon: string
  email: string
  website: string
  hizmetler: string[]
  kapsam: "local" | "regional" | "national"
  hizmetIlleri: string[]
  etiketler: string[]
  ekipman: string
  yazilim: string
}

const MOK_FIRMA: FirmaFormu = {
  ad: "GeoVizyon Mühendislik",
  aciklama:
    "Lazer tarama, BIM modelleme ve fotogrametri alanlarında uzman, 10+ yıllık deneyime sahip mühendislik firması.",
  kurulisYili: "2013",
  sehir: "İstanbul",
  ilce: "Beşiktaş",
  adres: "Balmumcu Mah. Barbaros Bulvarı No: 12/A",
  telefon: "+90 212 555 00 11",
  email: "info@geovizyon.com.tr",
  website: "https://www.geovizyon.com.tr",
  hizmetler: ["lazer-tarama", "bim-modelleme", "fotogrametri"],
  kapsam: "national",
  hizmetIlleri: ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"],
  etiketler: ["nokta bulutu", "as-built", "endüstriyel tesis", "TKGM lisanslı"],
  ekipman: "Leica RTC360\nFARO Focus S70\nDJI Matrice 300 RTK",
  yazilim: "Autodesk Revit\nPix4D\nAutoCAD Civil 3D",
}

// ─── BÖLÜM BAŞLIĞI ─────────────────────────────────────────────────────────────

function BolumBaslik({ no, baslik, aciklama }: { no: number; baslik: string; aciklama: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow">
        {no}
      </div>
      <div>
        <h2 className="text-base font-bold text-slate-800">{baslik}</h2>
        <p className="text-xs text-slate-500 mt-0.5">{aciklama}</p>
      </div>
    </div>
  )
}

// ─── FORM ALANI SARMALAYICI ─────────────────────────────────────────────────────

function FormRow({ label, required, children, hint }: {
  label: string
  required?: boolean
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white"

const textareaCls = inputCls + " resize-none"

// ─── ANA BİLEŞEN ───────────────────────────────────────────────────────────────

export default function FirmaDuzenlePage() {
  const [form, setForm] = useState<FirmaFormu>(MOK_FIRMA)
  const [kaydedildi, setKaydedildi] = useState(false)
  const [aktifBolum, setAktifBolum] = useState<number | null>(null)

  const guncelle = useCallback(<K extends keyof FirmaFormu>(key: K, val: FirmaFormu[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }))
    setKaydedildi(false)
  }, [])

  // Hizmet toggle
  const hizmetToggle = (slug: string) => {
    const mevcut = form.hizmetler
    if (mevcut.includes(slug)) {
      guncelle("hizmetler", mevcut.filter((s) => s !== slug))
    } else if (mevcut.length < 8) {
      guncelle("hizmetler", [...mevcut, slug])
    }
  }

  // Hizmet ili toggle
  const hizmetIliToggle = (il: string) => {
    const mevcut = form.hizmetIlleri
    if (mevcut.includes(il)) {
      guncelle("hizmetIlleri", mevcut.filter((s) => s !== il))
    } else {
      guncelle("hizmetIlleri", [...mevcut, il])
    }
  }

  // Formu kaydet (mock)
  const handleKaydet = (e: React.FormEvent) => {
    e.preventDefault()
    // Gerçek uygulamada: await fetch('/api/firma/guncelle', { method:'PUT', body: JSON.stringify(form) })
    setKaydedildi(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Üst bar ── */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-slate-400 hover:text-slate-700 transition-colors text-xl leading-none"
              title="Dashboard'a dön"
            >
              ←
            </Link>
            <div>
              <span className="font-bold text-slate-800 text-sm">Firma Profilini Düzenle</span>
              <span className="text-xs text-slate-400 ml-2">· {form.ad}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/firmalar/${form.ad.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors hidden sm:block"
              target="_blank"
            >
              👁️ Profili Görüntüle
            </Link>
            <button
              type="submit"
              form="firma-form"
              className="text-sm font-semibold px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
            >
              💾 Kaydet
            </button>
          </div>
        </div>
      </div>

      {/* ── Kaydedildi bildirimi ── */}
      {kaydedildi && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-4">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-700 text-sm font-medium">
            <span className="text-lg">✅</span>
            Değişiklikler başarıyla kaydedildi! Profiliniz güncellendi.
          </div>
        </div>
      )}

      {/* ── İlerleme çubuğu ── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-6">
        <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
          {[
            "Temel Bilgiler", "İletişim", "Hizmetler",
            "Kapsam", "Etiketler", "Donanım",
          ].map((label, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setAktifBolum(i + 1)
                document.getElementById(`bolum-${i + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className={[
                "flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap",
                aktifBolum === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600",
              ].join(" ")}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Form ── */}
      <form id="firma-form" onSubmit={handleKaydet}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-20 space-y-6">

          {/* ─── 1. Temel Bilgiler ─────────────────────────────────────────── */}
          <section id="bolum-1" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <BolumBaslik
              no={1}
              baslik="Temel Bilgiler"
              aciklama="Firmanızın adı, tanıtım metni ve kuruluş yılı"
            />
            <div className="space-y-4">
              <FormRow label="Firma Adı" required hint="Ticaret siciline kayıtlı tam unvan">
                <input
                  type="text"
                  value={form.ad}
                  onChange={(e) => guncelle("ad", e.target.value)}
                  className={inputCls}
                  placeholder="ör. GeoVizyon Mühendislik Ltd. Şti."
                  required
                />
              </FormRow>

              <FormRow
                label="Firma Açıklaması"
                required
                hint="300 karaktere kadar. Hizmetlerinizi, uzmanlığınızı ve güçlü yanlarınızı öne çıkarın."
              >
                <textarea
                  rows={4}
                  value={form.aciklama}
                  onChange={(e) => guncelle("aciklama", e.target.value.slice(0, 300))}
                  className={textareaCls}
                  placeholder="Firmanızı ve sunduğunuz hizmetleri kısaca açıklayın..."
                />
                <p className="mt-1 text-right text-xs text-slate-400">
                  {form.aciklama.length} / 300
                </p>
              </FormRow>

              <FormRow label="Kuruluş Yılı" hint="4 haneli yıl (ör. 2015)">
                <input
                  type="number"
                  value={form.kurulisYili}
                  onChange={(e) => guncelle("kurulisYili", e.target.value)}
                  className={inputCls}
                  placeholder="2015"
                  min="1950"
                  max={new Date().getFullYear()}
                  style={{ maxWidth: 180 }}
                />
              </FormRow>
            </div>
          </section>

          {/* ─── 2. İletişim & Konum ──────────────────────────────────────── */}
          <section id="bolum-2" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <BolumBaslik
              no={2}
              baslik="İletişim & Konum"
              aciklama="Müşterilerin sizi bulması için adres ve iletişim bilgileri"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormRow label="İl" required>
                <select
                  value={form.sehir}
                  onChange={(e) => guncelle("sehir", e.target.value)}
                  className={inputCls}
                >
                  {TUM_ILLER.map((il) => (
                    <option key={il} value={il}>{il}</option>
                  ))}
                </select>
              </FormRow>

              <FormRow label="İlçe">
                <input
                  type="text"
                  value={form.ilce}
                  onChange={(e) => guncelle("ilce", e.target.value)}
                  className={inputCls}
                  placeholder="ör. Kadıköy"
                />
              </FormRow>

              <FormRow label="Adres" hint="Sokak, mahalle, bina no">
                <input
                  type="text"
                  value={form.adres}
                  onChange={(e) => guncelle("adres", e.target.value)}
                  className={inputCls}
                  placeholder="Mahalle, Sokak No..."
                />
              </FormRow>

              <FormRow label="Telefon" required>
                <input
                  type="tel"
                  value={form.telefon}
                  onChange={(e) => guncelle("telefon", e.target.value)}
                  className={inputCls}
                  placeholder="+90 212 000 00 00"
                />
              </FormRow>

              <FormRow label="E-posta" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => guncelle("email", e.target.value)}
                  className={inputCls}
                  placeholder="info@firmaadi.com.tr"
                />
              </FormRow>

              <FormRow label="Web Sitesi" hint="https:// ile başlayın">
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => guncelle("website", e.target.value)}
                  className={inputCls}
                  placeholder="https://www.firmaadi.com.tr"
                />
              </FormRow>
            </div>
          </section>

          {/* ─── 3. Hizmetler ─────────────────────────────────────────────── */}
          <section id="bolum-3" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <BolumBaslik
              no={3}
              baslik="Sunduğunuz Hizmetler"
              aciklama="Firmanızın verdiği hizmet kategorileri. Maksimum 8 seçebilirsiniz."
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
              {TUM_HIZMETLER.map(({ slug, label, icon }) => {
                const secili = form.hizmetler.includes(slug)
                const dolu = !secili && form.hizmetler.length >= 8
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => hizmetToggle(slug)}
                    disabled={dolu}
                    className={[
                      "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left",
                      secili
                        ? "bg-blue-50 border-blue-400 text-blue-700 shadow-sm"
                        : dolu
                        ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50",
                    ].join(" ")}
                  >
                    <span className="text-base">{icon}</span>
                    <span className="leading-tight">{label}</span>
                    {secili && <span className="ml-auto text-blue-500 text-xs font-bold">✓</span>}
                  </button>
                )
              })}
            </div>

            <p className="text-xs text-slate-400">
              {form.hizmetler.length} / 8 hizmet seçildi
              {form.hizmetler.length >= 8 && (
                <span className="text-amber-600 ml-1">· Maksimuma ulaştınız</span>
              )}
            </p>
          </section>

          {/* ─── 4. Hizmet Kapsamı ────────────────────────────────────────── */}
          <section id="bolum-4" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <BolumBaslik
              no={4}
              baslik="Hizmet Kapsamı"
              aciklama="Firmanızın hizmet verdiği coğrafi alan ve iller"
            />

            {/* Kapsam tipi */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {([
                { val: "local",    label: "Yerel",    desc: "Tek ilde hizmet",         icon: "📍" },
                { val: "regional", label: "Bölgesel", desc: "Birkaç ilde hizmet",      icon: "🗺️" },
                { val: "national", label: "Ulusal",   desc: "Türkiye genelinde hizmet", icon: "🇹🇷" },
              ] as const).map(({ val, label, desc, icon }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => guncelle("kapsam", val)}
                  className={[
                    "flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all text-center",
                    form.kapsam === val
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-200",
                  ].join(" ")}
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="font-bold text-sm text-slate-800">{label}</span>
                  <span className="text-xs text-slate-500">{desc}</span>
                </button>
              ))}
            </div>

            {/* İl seçimi — sadece regional/national için göster */}
            {form.kapsam !== "local" && (
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">
                  Hizmet Verilen İller
                  <span className="text-slate-400 font-normal ml-1.5">
                    ({form.hizmetIlleri.length} seçili)
                  </span>
                </p>

                {Object.entries(BOLGE_ILLER).map(([bolge, iller]) => (
                  <div key={bolge} className="mb-4">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {bolge}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {iller.map((il) => {
                        const secili = form.hizmetIlleri.includes(il)
                        return (
                          <button
                            key={il}
                            type="button"
                            onClick={() => hizmetIliToggle(il)}
                            className={[
                              "text-xs px-2.5 py-1 rounded-lg border font-medium transition-all",
                              secili
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600",
                            ].join(" ")}
                          >
                            {il}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {/* Hızlı seç: Tümü / Temizle */}
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => guncelle("hizmetIlleri", TUM_ILLER)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Tümünü Seç
                  </button>
                  <button
                    type="button"
                    onClick={() => guncelle("hizmetIlleri", [])}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Temizle
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* ─── 5. Etiketler ─────────────────────────────────────────────── */}
          <section id="bolum-5" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <BolumBaslik
              no={5}
              baslik="Firma Etiketleri"
              aciklama="Firmanızı tanımlayan anahtar kelimeler. Arama sonuçlarında görünürlüğünüzü artırır."
            />

            <TagInput
              value={form.etiketler}
              onChange={(tags) => guncelle("etiketler", tags)}
              activeServices={form.hizmetler}
              maxTags={20}
            />

            {/* İpucu kutusu */}
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3">
              <p className="text-xs text-amber-700 font-semibold mb-1">💡 Etiket İpuçları</p>
              <ul className="text-xs text-amber-600 space-y-0.5 list-disc list-inside">
                <li>Kullandığınız cihaz markalarını ekleyin (ör. Leica RTC360, FARO Focus)</li>
                <li>Uzmanlık alanlarınızı belirtin (ör. tarihi yapı, endüstriyel tesis)</li>
                <li>Sahip olduğunuz lisans/sertifikaları yazın (ör. TKGM lisanslı, SPK lisanslı)</li>
                <li>Yazılımlarınızı ekleyin (ör. Autodesk Revit, Pix4D)</li>
              </ul>
            </div>
          </section>

          {/* ─── 6. Ekipman & Yazılım ─────────────────────────────────────── */}
          <section id="bolum-6" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <BolumBaslik
              no={6}
              baslik="Ekipman & Yazılım"
              aciklama="Kullandığınız profesyonel cihaz ve yazılımlar. Her satıra bir adet yazın."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormRow
                label="Ekipmanlar"
                hint="Her satıra bir ekipman (ör. Leica RTC360)"
              >
                <textarea
                  rows={5}
                  value={form.ekipman}
                  onChange={(e) => guncelle("ekipman", e.target.value)}
                  className={textareaCls}
                  placeholder={"Leica RTC360\nFARO Focus S70\nDJI Matrice 300 RTK"}
                />
              </FormRow>

              <FormRow
                label="Yazılımlar"
                hint="Her satıra bir yazılım (ör. Autodesk Revit)"
              >
                <textarea
                  rows={5}
                  value={form.yazilim}
                  onChange={(e) => guncelle("yazilim", e.target.value)}
                  className={textareaCls}
                  placeholder={"Autodesk Revit\nPix4D\nAutoCAD Civil 3D"}
                />
              </FormRow>
            </div>
          </section>

          {/* ─── Alt eylem çubuğu ─────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-400 text-center sm:text-left">
              Değişiklikler kaydedildiğinde profiliniz anında güncellenir. Onaylı statüsü korunur.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => { setForm(MOK_FIRMA); setKaydedildi(false) }}
                className="text-sm px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Değişiklikleri Sıfırla
              </button>
              <button
                type="submit"
                className="text-sm font-semibold px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
              >
                💾 Değişiklikleri Kaydet
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
