import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const isAuth = !!token
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
  const isTeacherPage = req.nextUrl.pathname.startsWith('/teacher')
  const isStudentPage = req.nextUrl.pathname.startsWith('/student')

  if (isAuthPage) {
    if (isAuth) {
      // Redirect authenticated users away from auth pages
      const role = token?.role as string
      if (role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url))
      } else if (role === 'TEACHER') {
        return NextResponse.redirect(new URL('/teacher', req.url))
      } else {
        return NextResponse.redirect(new URL('/student', req.url))
      }
    }
    return NextResponse.next()
  }

  if (!isAuth && (isAdminPage || isTeacherPage || isStudentPage)) {
    let from = req.nextUrl.pathname
    if (req.nextUrl.search) {
      from += req.nextUrl.search
    }
    return NextResponse.redirect(new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.url))
  }

  // Role-based access control
  if (isAuth) {
    const role = token?.role as string
    if (isAdminPage && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
    if (isTeacherPage && role !== 'TEACHER' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
    if (isStudentPage && role !== 'STUDENT' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/teacher/:path*',
    '/student/:path*',
    '/auth/:path*',
  ],
}

