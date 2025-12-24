import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Public API to get site settings (for frontend)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    if (key) {
      // Get specific setting
      const setting = await prisma.siteSettings.findUnique({
        where: { key },
      })

      if (!setting) {
        return NextResponse.json({ value: null })
      }

      return NextResponse.json({ value: setting.value })
    }

    // Get all settings (public ones only)
    const settings = await prisma.siteSettings.findMany({
      orderBy: { key: 'asc' },
    })

    const settingsObj: Record<string, any> = {}
    settings.forEach((setting) => {
      settingsObj[setting.key] = setting.value
    })

    return NextResponse.json({ settings: settingsObj })
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    )
  }
}


