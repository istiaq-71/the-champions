import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params

    const setting = await prisma.siteSettings.findUnique({
      where: { key },
    })

    if (!setting) {
      return NextResponse.json(
        { error: 'Setting not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ setting })
  } catch (error) {
    console.error('Error fetching site setting:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site setting' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { key } = params
    const body = await req.json()
    const { value } = body

    const setting = await prisma.siteSettings.upsert({
      where: { key },
      update: { value: value as any },
      create: { key, value: value as any },
    })

    return NextResponse.json({ setting })
  } catch (error) {
    console.error('Error updating site setting:', error)
    return NextResponse.json(
      { error: 'Failed to update site setting' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { key } = params

    await prisma.siteSettings.delete({
      where: { key },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting site setting:', error)
    return NextResponse.json(
      { error: 'Failed to delete site setting' },
      { status: 500 }
    )
  }
}

