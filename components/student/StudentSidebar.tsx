'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, CreditCard, FileText, MessageSquare, User, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/student', label: 'Dashboard', icon: Home },
  { href: '/student/courses', label: 'My Courses', icon: BookOpen },
  { href: '/student/payments', label: 'Payments', icon: CreditCard },
  { href: '/student/assignments', label: 'Assignments', icon: FileText },
  { href: '/student/messages', label: 'Messages', icon: MessageSquare },
  { href: '/student/profile', label: 'Profile', icon: User },
]

export function StudentSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
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

