import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || 'published'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const courses = await prisma.course.findMany({
      where: {
        status: status as string,
      },
      include: {
        teacher: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        enrollments: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await prisma.course.count({
      where: {
        status: status as string,
      },
    })

    return NextResponse.json({
      courses,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Courses fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

