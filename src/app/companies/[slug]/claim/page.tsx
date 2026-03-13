"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShieldCheck, Building2, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Header } from "@/components/layout/header"

interface PageProps {
  params: { slug: string }
}

export default function ClaimPage({ params }: PageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/companies/${params.slug}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          router.push(`/auth/login?callbackUrl=/companies/${params.slug}/claim`)
          return
        }
        setError(data.error || "Failed to submit claim. Please try again.")
        return
      }

      setSuccess(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Claim submitted!</h1>
          <p className="text-muted-foreground">
            We've received your claim request. If your email domain matches the company website, it will be automatically approved. Otherwise, our team will review it within 1-2 business days.
          </p>
          <Link href={`/companies/${params.slug}`}>
            <Button className="mt-4">Return to company page</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Claim Your Company Profile</h1>
          <p className="text-muted-foreground mt-2">
            Claiming your profile lets you manage listings, respond to inquiries, and verify your company.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 rounded-lg border border-border bg-white p-4">
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Instant approval</p>
              <p className="text-xs text-muted-foreground">If your email matches the company domain (e.g., user@company.com claiming company.com), you'll be approved instantly.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border bg-white p-4">
            <ShieldCheck className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Manual review</p>
              <p className="text-xs text-muted-foreground">If your email doesn't match, our team will manually verify your claim within 1-2 business days.</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit a claim request</CardTitle>
            <CardDescription>You must be logged in to claim a company profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="message">Why are you claiming this company? (optional)</Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="I am the owner/marketing manager of this company..."
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>
                ) : (
                  <>Submit claim request</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
