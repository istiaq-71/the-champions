import { NextRequest, NextResponse } from 'next/server'

// Ensure dynamic server-side rendering for this dynamic route
export const dynamic = 'force-dynamic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const program = await prisma.course.findUnique({
      where: { id: params.id },
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Delete the program (cascade will handle related records)
    await prisma.course.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Program deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting program:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete program' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const program = await prisma.course.findUnique({
      where: { id: params.id },
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
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      program: {
        id: program.id,
        title: program.title,
        titleBn: program.titleBn,
        slug: program.slug,
        description: program.description,
        descriptionBn: program.descriptionBn,
        price: program.price,
        priceType: program.priceType,
        courseType: program.courseType,
        courseClass: program.courseClass,
        features: program.features,
        duration: program.duration,
        level: program.level,
        status: program.status,
        order: program.order,
        thumbnail: program.thumbnail,
        teacherId: program.teacherId,
        teacher: program.teacher.user.name,
      },
    })
  } catch (error: any) {
    console.error('Error fetching program:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch program' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Check if program exists
    const existing = await prisma.course.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Update the program
    const updated = await prisma.course.update({
      where: { id: params.id },
      data: {
        title: body.title,
        titleBn: body.titleBn,
        slug: body.slug,
        description: body.description,
        descriptionBn: body.descriptionBn,
        price: body.price,
        priceType: body.priceType,
        courseType: body.courseType,
        courseClass: body.courseClass,
        features: body.features || [],
        duration: body.duration,
        level: body.level,
        status: body.status,
        order: body.order || 0,
        thumbnail: body.thumbnail,
        teacherId: body.teacherId,
      },
    })

    return NextResponse.json({
      success: true,
      program: {
        id: updated.id,
        title: updated.title,
        slug: updated.slug,
      },
    })
  } catch (error: any) {
    console.error('Error updating program:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update program' },
      { status: 500 }
    )
  }
}

