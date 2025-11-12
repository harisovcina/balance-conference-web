import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const submissions = await db.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    console.log('Received contact form submission:', { name, email, messageLength: message?.length })

    // Validate input
    if (!name || !email || !message) {
      console.log('Validation failed: missing fields')
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('Validation failed: invalid email')
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if db.contactSubmission exists
    if (!db.contactSubmission) {
      console.error('ERROR: db.contactSubmission is undefined - Prisma Client needs to be regenerated')
      return NextResponse.json(
        { error: 'Database configuration error. Please contact administrator.' },
        { status: 500 }
      )
    }

    console.log('Creating submission in database...')
    // Create contact submission
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        message,
      },
    })

    console.log('Submission created successfully:', submission.id)

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: `Failed to submit form: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}

