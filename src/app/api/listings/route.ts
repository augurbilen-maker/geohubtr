import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const company = await prisma.company.findFirst({
      where: { ownerId: session.user.id },
    })

    if (!company) {
      return NextResponse.json({ error: "You must have a company profile to create listings" }, { status: 403 })
    }

    const body = await req.json()
    const { serviceCategory, listingType, title, description, price, currency, dynamicAttributes, status } = body

    if (!serviceCategory || !listingType || !title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Map incoming listingType values to schema enum (SERVICE | RENTAL | SALE)
    const listingTypeMap: Record<string, "SERVICE" | "RENTAL" | "SALE"> = {
      SERVICE:   "SERVICE",
      SALE_NEW:  "SALE",
      SALE_USED: "SALE",
      RENT:      "RENTAL",
      RENTAL:    "RENTAL",
      SALE:      "SALE",
    }
    const mappedListingType = listingTypeMap[listingType] ?? "SERVICE"

    const listing = await prisma.listing.create({
      data: {
        companyId: company.id,
        serviceCategory,
        listingType: mappedListingType,
        title,
        description,
        price: price ? price : null,
        currency: currency || "TRY",
        dynamicAttributes: dynamicAttributes || {},
        images: [],
        status: status || "DRAFT",
      },
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (error) {
    console.error("Create listing error:", error)
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 })
  }
}
