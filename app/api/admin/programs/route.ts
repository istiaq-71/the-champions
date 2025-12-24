import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const programSchema = z.object({
  title: z.string().min(1),
  titleBn: z.string().optional(),
  slug: z.string().min(1),
  description: z.string().min(1),
  descriptionBn: z.string().optional(),
  price: z.number().min(0),
  priceType: z.enum(['PAID', 'FREE']),
  courseType: z.enum(['ONLINE', 'OFFLINE', 'HYBRID']),
  courseClass: z.enum(['FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'MODEL_TEST', 'ADMISSION', 'OTHER']),
  features: z.array(z.string()).optional().default([]),
  duration: z.number().min(1),
  level: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  order: z.number().optional().default(0),
  thumbnail: z.string().optional(),
  teacherId: z.string().min(1),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const programs = await prisma.course.findMany({
      include: {
        teacher: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
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

    return NextResponse.json({
      success: true,
      programs: programs.map((p) => ({
        id: p.id,
        title: p.title,
        titleBn: p.titleBn,
        slug: p.slug,
        description: p.description,
        descriptionBn: p.descriptionBn,
        price: p.price,
        priceType: p.priceType,
        courseType: p.courseType,
        courseClass: p.courseClass,
        features: p.features,
        status: p.status,
        order: p.order,
        duration: p.duration,
        level: p.level,
        thumbnail: p.thumbnail,
        teacher: p.teacher.user.name,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
    })
  } catch (error: any) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch programs', programs: [] },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = programSchema.parse(body)

    // Check if slug already exists
    const existing = await prisma.course.findUnique({
      where: { slug: validatedData.slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A program with this slug already exists' },
        { status: 400 }
      )
    }

    // Verify teacher exists
    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: validatedData.teacherId },
    })

    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
    }

    const program = await prisma.course.create({
      data: {
        title: validatedData.title,
        titleBn: validatedData.titleBn,
        slug: validatedData.slug,
        description: validatedData.description,
        descriptionBn: validatedData.descriptionBn,
        price: validatedData.price,
        priceType: validatedData.priceType,
        courseType: validatedData.courseType,
        courseClass: validatedData.courseClass,
        features: validatedData.features || [],
        duration: validatedData.duration,
        level: validatedData.level,
        status: validatedData.status,
        order: validatedData.order || 0,
        thumbnail: validatedData.thumbnail,
        teacherId: validatedData.teacherId,
      },
      include: {
        teacher: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      program: {
        id: program.id,
        title: program.title,
        slug: program.slug,
      },
    })
  } catch (error: any) {
    console.error('Error creating program:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create program' },
      { status: 500 }
    )
  }
}
