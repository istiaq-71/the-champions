'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Users, BarChart3, Video, User, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/teacher', label: 'Dashboard', icon: Home },
  { href: '/teacher/courses', label: 'My Courses', icon: BookOpen },
  { href: '/teacher/students', label: 'Students', icon: Users },
  { href: '/teacher/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/teacher/profile', label: 'Profile', icon: User },
]

export function TeacherSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-neutral-700 hover:bg-neutral-100'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

