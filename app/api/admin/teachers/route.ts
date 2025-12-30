import { NextRequest, NextResponse } from 'next/server'

// Uses headers/session — force server rendering
export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const teachers = await prisma.teacherProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        user: {
          name: 'asc',
        },
      },
    })

    return NextResponse.json({
      success: true,
      teachers: teachers.map((t) => ({
        id: t.id,
        name: t.user.name,
        email: t.user.email,
        image: t.user.image,
        qualification: t.qualification,
        specialization: t.specialization,
        experience: t.experience,
      })),
    })
  } catch (error: any) {
    console.error('Error fetching teachers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch teachers', teachers: [] },
      { status: 500 }
    )
  }
}

