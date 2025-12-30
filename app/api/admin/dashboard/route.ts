import { NextRequest, NextResponse } from 'next/server'

// Mark as dynamic to prevent static prerender attempts during build
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    // Guard against missing runtime env during builds (Vercel may not expose runtime vars at build time)
    if (!process.env.DATABASE_URL || !process.env.NEXTAUTH_SECRET) {
      console.warn('Missing DATABASE_URL or NEXTAUTH_SECRET during build/runtime')
      return NextResponse.json({ message: 'Server not configured' }, { status: 503 })
    }

    // Import auth and prisma lazily only at runtime (avoid import-time side-effects during build)
    let getServerSession: any
    let authOptions: any
    let prisma: any

    try {
      ;({ getServerSession } = await import('next-auth'))
      ;({ authOptions } = await import('@/lib/auth'))
      ;({ prisma } = await import('@/lib/prisma'))
    } catch (err) {
      console.error('Runtime import error for auth/prisma:', err)
      return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }

    let session
    try {
      session = await getServerSession(authOptions)
    } catch (err) {
      console.error('getServerSession error:', err)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
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

    const totalRevenue = payments.reduce((acc: number, p: any) => acc + Number(p.amount), 0)

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

