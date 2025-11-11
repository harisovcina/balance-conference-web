import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { promises as fs } from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file")

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate type
    const allowed = ["image/jpeg", "image/png", "image/webp"]
    // @ts-ignore - Blob has type property in runtime
    const mime = file.type as string | undefined
    if (!mime || !allowed.includes(mime)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Prepare destination
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "speakers")
    await fs.mkdir(uploadsDir, { recursive: true })

    // Unique filename
    const ext = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg"
    const baseName = (formData.get("filename") as string | null) || "speaker"
    const safeBase = baseName.toLowerCase().replace(/[^a-z0-9\-]+/g, "-").replace(/(^-|-$)/g, "")
    const filename = `${Date.now()}-${safeBase || "speaker"}.${ext}`
    const filePath = path.join(uploadsDir, filename)

    await fs.writeFile(filePath, buffer)

    // Public URL path
    const publicPath = `/uploads/speakers/${filename}`

    return NextResponse.json({ url: publicPath }, { status: 201 })
  } catch (err) {
    console.error("Upload error:", err)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}


