import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const conference = await db.conference.findUnique({
      where: { id },
    })

    if (!conference) {
      return NextResponse.json({ error: "Conference not found" }, { status: 404 })
    }

    return NextResponse.json(conference)
  } catch (error) {
    console.error("Error fetching conference:", error)
    return NextResponse.json(
      { error: "Failed to fetch conference" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const {
      title,
      slug,
      location,
      date,
      description,
      eyebrow,
      howTitle,
      howDescription,
      nextChapterText,
      participants,
      speakersCount,
      mediaOutlets,
      influencers,
      featured,
      published,
    } = body

    // Check if slug already exists for another conference
    if (slug) {
      const existing = await db.conference.findUnique({
        where: { slug },
      })

      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "Conference with this slug already exists" },
          { status: 400 }
        )
      }
    }

    const conference = await db.conference.update({
      where: { id },
      data: {
        title,
        slug,
        location,
        date: date ? new Date(date) : null,
        description,
        eyebrow,
        howTitle,
        howDescription,
        nextChapterText,
        participants: participants ?? 0,
        speakersCount: speakersCount ?? 0,
        mediaOutlets: mediaOutlets ?? 0,
        influencers: influencers ?? 0,
        featured: featured ?? false,
        published: published ?? true,
      },
    })

    return NextResponse.json(conference)
  } catch (error) {
    console.error("Error updating conference:", error)
    return NextResponse.json(
      { error: "Failed to update conference" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await db.conference.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting conference:", error)
    return NextResponse.json(
      { error: "Failed to delete conference" },
      { status: 500 }
    )
  }
}

