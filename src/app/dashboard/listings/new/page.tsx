"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  type: string
  customFieldsSchema: Array<{
    name: string
    type: string
    unit?: string
    options?: string[]
    min?: number
    max?: number
  }>
}

const steps = [
  { id: 1, label: "Kategori", description: "Kategori seçin" },
  { id: 2, label: "Detaylar", description: "İlan bilgilerini girin" },
  { id: 3, label: "Özellikler", description: "Teknik özellikleri doldurun" },
]

const listingTypes = [
  { value: "SERVICE",  label: "Hizmet",       description: "Mesleki hizmet teklifi" },
  { value: "SALE",     label: "Satış",         description: "Ekipman veya ürün satışı" },
  { value: "RENTAL",   label: "Kiralama",      description: "Ekipman kiralama" },
]

export default function NewListingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    listingType: "",
    title: "",
    description: "",
    price: "",
    currency: "TRY",
  })
  const [dynamicAttributes, setDynamicAttributes] = useState<Record<string, string | boolean | string[]>>({})

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error)
  }, [])

  function handleAttrChange(name: string, value: string | boolean | string[]) {
    setDynamicAttributes((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit() {
    if (!selectedCategory || !formData.listingType || !formData.title) {
      setError("Lütfen tüm zorunlu alanları doldurun")
      return
    }
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceCategory: selectedCategory.id,
          listingType: formData.listingType,
          title: formData.title,
          description: formData.description,
          price: formData.price ? parseFloat(formData.price) : null,
          currency: formData.currency,
          dynamicAttributes,
          status: "ACTIVE",
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "İlan oluşturulamadı")
        return
      }
      router.push("/dashboard/listings")
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Yeni İlan Ekle</h1>
        <p className="text-muted-foreground mt-1">İlanınızı oluşturmak için adımları takip edin</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors flex-shrink-0",
              step > s.id ? "bg-primary text-primary-foreground" :
              step === s.id ? "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground"
            )}>
              {step > s.id ? <Check className="h-4 w-4" /> : s.id}
            </div>
            <div className="hidden sm:block">
              <p className={cn("text-xs font-medium", step >= s.id ? "text-foreground" : "text-muted-foreground")}>{s.label}</p>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-px ml-2", step > s.id ? "bg-primary" : "bg-border")} />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Step 1: Category */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Kategori Seçin</CardTitle>
            <CardDescription>İlanınıza en uygun kategoriyi seçin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-4 text-left transition-all hover:border-primary/50",
                    selectedCategory?.id === cat.id ? "border-primary bg-primary/5" : "border-border"
                  )}
                >
                  <div>
                    <p className="font-medium text-sm">{cat.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.type}</p>
                  </div>
                  {selectedCategory?.id === cat.id && (
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
            <div className="space-y-2 pt-2">
              <Label>İlan Türü *</Label>
              <div className="grid grid-cols-1 gap-2">
                {listingTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, listingType: type.value }))}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 text-left transition-all hover:border-primary/50",
                      formData.listingType === type.value ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{type.label}</p>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                    {formData.listingType === type.value && (
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>İlan Detayları</CardTitle>
            <CardDescription>İlanınız hakkında temel bilgileri girin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Başlık *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                placeholder="Örn: Leica RTC360 3D Lazer Tarama Hizmeti"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                placeholder="İlanınızı detaylı açıklayın..."
                rows={5}
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Fiyat (opsiyonel)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Para Birimi</Label>
                <select
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => setFormData((p) => ({ ...p, currency: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="TRY">TRY (₺)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Dynamic Attributes */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Teknik Özellikler</CardTitle>
            <CardDescription>
              {selectedCategory?.name} için ek özellikleri doldurun
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedCategory?.customFieldsSchema.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>
                  {field.name}
                  {field.unit && <span className="text-muted-foreground ml-1 text-xs">({field.unit})</span>}
                </Label>
                {field.type === "number" && (
                  <Input
                    id={field.name}
                    type="number"
                    placeholder={field.min !== undefined ? `${field.min} – ${field.max}` : "Değer girin"}
                    value={(dynamicAttributes[field.name] as string) || ""}
                    onChange={(e) => handleAttrChange(field.name, e.target.value)}
                    min={field.min}
                    max={field.max}
                  />
                )}
                {field.type === "select" && field.options && (
                  <select
                    id={field.name}
                    value={(dynamicAttributes[field.name] as string) || ""}
                    onChange={(e) => handleAttrChange(field.name, e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Seçin</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
                {field.type === "boolean" && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(dynamicAttributes[field.name] as boolean) || false}
                      onChange={(e) => handleAttrChange(field.name, e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-sm">Evet</span>
                  </label>
                )}
                {field.type === "text" && (
                  <Input
                    id={field.name}
                    type="text"
                    placeholder={`${field.name} girin`}
                    value={(dynamicAttributes[field.name] as string) || ""}
                    onChange={(e) => handleAttrChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}
            {(!selectedCategory?.customFieldsSchema || selectedCategory.customFieldsSchema.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-4">Bu kategori için ek özellik bulunmuyor.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => step > 1 ? setStep(step - 1) : router.back()}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {step === 1 ? "İptal" : "Geri"}
        </Button>
        {step < 3 ? (
          <Button
            onClick={() => {
              if (step === 1 && (!selectedCategory || !formData.listingType)) {
                setError("Lütfen kategori ve ilan türü seçin")
                return
              }
              if (step === 2 && (!formData.title || !formData.description)) {
                setError("Lütfen başlık ve açıklama girin")
                return
              }
              setError(null)
              setStep(step + 1)
            }}
          >
            Devam
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Yayınlanıyor...</>
            ) : (
              "İlanı Yayınla"
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
