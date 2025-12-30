import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const classFilter = searchParams.get('class')
    const typeFilter = searchParams.get('type')
    const priceFilter = searchParams.get('price')

    // Build where clause
    const where: any = {
      status: 'published',
    }

    if (classFilter && classFilter !== 'ALL') {
      where.courseClass = classFilter
    }

    if (typeFilter && typeFilter !== 'ALL') {
      where.courseType = typeFilter
    }

    if (priceFilter && priceFilter !== 'ALL') {
      if (priceFilter === 'FREE') {
        where.price = 0
        where.priceType = 'FREE'
      } else {
        where.priceType = 'PAID'
        where.price = { gt: 0 }
      }
    }

    let programs
    try {
      programs = await prisma.course.findMany({
        where,
        include: {
          teacher: {
            include: {
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' },
        ],
      })
    } catch (dbError: any) {
      console.error('Database error:', dbError)
      // Return empty array if database connection fails or schema mismatch
      return NextResponse.json({
        success: true,
        programs: [],
        count: 0,
        message: 'Database connection issue. Please check your database connection.',
      })
    }

    // Transform data for frontend
    const transformedPrograms = programs.map((program) => ({
      id: program.id,
      title: program.title,
      titleBn: program.titleBn,
      description: program.description,
      descriptionBn: program.descriptionBn,
      thumbnail: program.thumbnail,
      price: program.price,
      priceType: program.priceType,
      courseType: program.courseType,
      features: program.features || [],
      slug: program.slug,
      duration: program.duration,
      level: program.level,
      teacher: program.teacher.user.name,
    }))

    return NextResponse.json({
      success: true,
      programs: transformedPrograms,
      count: transformedPrograms.length,
    })
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch programs',
        programs: [],
      },
      { status: 500 }
    )
  }
}

