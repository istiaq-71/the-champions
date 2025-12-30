import { NextRequest, NextResponse } from 'next/server'

// Enrollment creation uses session — ensure it's server-only
export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createEnrollmentSchema = z.object({
  courseId: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = createEnrollmentSchema.parse(body)

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: validatedData.courseId },
    })

    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      )
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: session.user.id,
          courseId: validatedData.courseId,
        },
      },
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { message: 'Already enrolled in this course', enrollment: existingEnrollment },
        { status: 400 }
      )
    }

    // Create enrollment (will be activated after payment)
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: session.user.id,
        courseId: validatedData.courseId,
        status: 'ACTIVE', // For free courses, set to ACTIVE directly
        // For paid courses, this should be PENDING until payment is verified
      },
      include: {
        course: true,
      },
    })

    return NextResponse.json({
      enrollment,
      message: 'Successfully enrolled in course',
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Enrollment creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

