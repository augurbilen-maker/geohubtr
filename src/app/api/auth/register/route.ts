import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json()
    
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }
    
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 })
    }
    
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const validRoles: UserRole[] = ["INDIVIDUAL", "COMPANY_OWNER"]
    const userRole: UserRole = validRoles.includes(role) ? role : "INDIVIDUAL"
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: userRole,
      },
    })
    
    return NextResponse.json({ 
      message: "Account created successfully",
      userId: user.id 
    }, { status: 201 })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
