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
  { id: 1, label: "Category", description: "Select a category" },
  { id: 2, label: "Details", description: "Add listing details" },
  { id: 3, label: "Attributes", description: "Fill technical specs" },
]

const listingTypes = [
  { value: "SALE_NEW", label: "For Sale — New", description: "Brand new, unused equipment or software" },
  { value: "SALE_USED", label: "For Sale — Used", description: "Pre-owned equipment in working condition" },
  { value: "RENT", label: "For Rent", description: "Equipment available for rental periods" },
  { value: "SERVICE", label: "Service / Software", description: "Professional service or SaaS offering" },
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
    currency: "USD",
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
      setError("Please fill in all required fields")
      return
    }
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: selectedCategory.id,
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
        setError(data.error || "Failed to create listing")
        return
      }
      router.push("/dashboard/listings")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Listing</h1>
        <p className="text-muted-foreground mt-1">Follow the steps to create your listing</p>
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
            <CardTitle>Select a Category</CardTitle>
            <CardDescription>Choose the category that best fits your listing</CardDescription>
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
              <Label>Listing Type *</Label>
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
            <CardTitle>Listing Details</CardTitle>
            <CardDescription>Provide the main information about your listing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Leica RTC360 3D Laser Scanner"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                placeholder="Describe your listing in detail — condition, features, what's included..."
                rows={5}
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (optional)</Label>
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
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => setFormData((p) => ({ ...p, currency: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CHF">CHF</option>
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
            <CardTitle>Technical Specifications</CardTitle>
            <CardDescription>
              Fill in the specific attributes for {selectedCategory?.name}
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
                    placeholder={field.min !== undefined ? `${field.min} – ${field.max}` : "Enter value"}
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
                    <option value="">Select {field.name}</option>
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
                    <span className="text-sm">Yes</span>
                  </label>
                )}
                {field.type === "text" && (
                  <Input
                    id={field.name}
                    type="text"
                    placeholder={`Enter ${field.name}`}
                    value={(dynamicAttributes[field.name] as string) || ""}
                    onChange={(e) => handleAttrChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}
            {(!selectedCategory?.customFieldsSchema || selectedCategory.customFieldsSchema.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-4">No additional attributes for this category.</p>
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
          {step === 1 ? "Cancel" : "Back"}
        </Button>
        {step < 3 ? (
          <Button
            onClick={() => {
              if (step === 1 && (!selectedCategory || !formData.listingType)) {
                setError("Please select a category and listing type")
                return
              }
              if (step === 2 && (!formData.title || !formData.description)) {
                setError("Please fill in the title and description")
                return
              }
              setError(null)
              setStep(step + 1)
            }}
          >
            Continue
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Publishing...</>
            ) : (
              "Publish listing"
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
