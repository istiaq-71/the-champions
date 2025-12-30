import { NextRequest, NextResponse } from 'next/server'

// This route uses session/headers; ensure it's always server-rendered
export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Get teacher profile
    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
      include: {
        courses: {
          include: {
            enrollments: true,
            content: true,
          },
        },
      },
    })

    if (!teacherProfile) {
      return NextResponse.json(
        { message: 'Teacher profile not found' },
        { status: 404 }
      )
    }

    const totalCourses = teacherProfile.courses.length
    const totalStudents = teacherProfile.courses.reduce(
      (acc, course) => acc + course.enrollments.filter(e => e.status === 'ACTIVE').length,
      0
    )
    const totalContent = teacherProfile.courses.reduce(
      (acc, course) => acc + course.content.length,
      0
    )

    // TODO: Calculate average rating from reviews/feedback
    const averageRating = 0

    return NextResponse.json({
      totalCourses,
      totalStudents,
      totalContent,
      averageRating,
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

