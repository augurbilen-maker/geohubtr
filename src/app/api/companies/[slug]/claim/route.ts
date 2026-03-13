import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const company = await prisma.company.findUnique({
    where: { slug: params.slug },
  })
  
  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 })
  }
  
  if (company.isClaimed) {
    return NextResponse.json({ error: "This company has already been claimed" }, { status: 400 })
  }
  
  // Check for existing pending claim
  const existingClaim = await prisma.claimRequest.findFirst({
    where: { userId: session.user.id, companyId: company.id, status: "PENDING" },
  })
  
  if (existingClaim) {
    return NextResponse.json({ error: "You already have a pending claim for this company" }, { status: 400 })
  }
  
  const { message } = await req.json()
  
  // Domain matching check
  const userDomain = session.user.email?.split("@")[1]
  const companyDomain = company.website?.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "")
  const domainMatch = userDomain && companyDomain && userDomain === companyDomain
  
  if (domainMatch) {
    // Auto-approve
    await prisma.$transaction([
      prisma.claimRequest.create({
        data: {
          userId: session.user.id,
          companyId: company.id,
          status: "APPROVED",
          message,
          reviewedAt: new Date(),
        },
      }),
      prisma.company.update({
        where: { id: company.id },
        data: { ownerId: session.user.id, isClaimed: true },
      }),
    ])
    
    return NextResponse.json({ 
      message: "Claim approved automatically based on email domain match.",
      autoApproved: true,
    })
  }
  
  // Create pending claim for manual review
  await prisma.claimRequest.create({
    data: {
      userId: session.user.id,
      companyId: company.id,
      status: "PENDING",
      message,
    },
  })
  
  return NextResponse.json({ 
    message: "Claim submitted for review.",
    autoApproved: false,
  })
}
