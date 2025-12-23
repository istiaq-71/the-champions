import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user counts
    const [totalStudents, totalTeachers, totalCourses, enrollments, payments, pendingPayments] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'TEACHER' } }),
      prisma.course.count(),
      prisma.enrollment.count(),
      prisma.payment.findMany({ where: { status: 'COMPLETED' } }),
      prisma.payment.count({ where: { status: 'PENDING' } }),
    ])

    const totalRevenue = payments.reduce((acc, p) => acc + Number(p.amount), 0)

    return NextResponse.json({
      totalStudents,
      totalTeachers,
      totalCourses,
      totalRevenue,
      totalEnrollments: enrollments,
      pendingPayments,
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

