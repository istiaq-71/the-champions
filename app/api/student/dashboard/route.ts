import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Get enrollments
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: userId },
      include: { course: true },
    })

    const enrolledCourses = enrollments.length
    const completedCourses = enrollments.filter(e => e.status === 'COMPLETED').length
    const averageProgress = enrollments.length > 0
      ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
      : 0

    // Get payments
    const payments = await prisma.payment.findMany({
      where: {
        userId,
        status: 'COMPLETED',
      },
    })

    const totalPayments = payments.reduce((acc, p) => acc + Number(p.amount), 0)

    // Get upcoming assignments
    const now = new Date()
    const upcomingAssignments = await prisma.assignment.findMany({
      where: {
        course: {
          enrollments: {
            some: {
              studentId: userId,
              status: 'ACTIVE',
            },
          },
        },
        dueDate: {
          gt: now,
        },
      },
    })

    const assignmentsDue = upcomingAssignments.length

    return NextResponse.json({
      enrolledCourses,
      completedCourses,
      totalPayments,
      upcomingClasses: 0, // TODO: Implement class schedule
      averageProgress,
      assignmentsDue,
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

