'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { 
  Home, 
  FileText, 
  MessageSquare, 
  Award, 
  Building2, 
  Globe,
  Settings,
  Users,
  Phone,
  Mail
} from 'lucide-react'

interface ContentSection {
  id: string
  title: string
  description: string
  icon: any
  href: string
  count?: number
}

export default function ContentManagementPage() {
  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: 'homepage',
      title: 'Homepage Content',
      description: 'Manage Hero, Features, Testimonials, CTA sections',
      icon: Home,
      href: '/admin/content/homepage',
    },
    {
      id: 'achievements',
      title: 'Achievements Section',
      description: 'Manage achievements and statistics',
      icon: Award,
      href: '/admin/content/achievements',
    },
    {
      id: 'services',
      title: 'Services Section',
      description: 'Manage services offered',
      icon: Globe,
      href: '/admin/content/services',
    },
    {
      id: 'branches',
      title: 'Branches Section',
      description: 'Manage branch locations',
      icon: Building2,
      href: '/admin/content/branches',
    },
    {
      id: 'testimonials',
      title: 'Testimonials',
      description: 'Manage student testimonials',
      icon: MessageSquare,
      href: '/admin/content/testimonials',
    },
    {
      id: 'pages',
      title: 'Static Pages',
      description: 'Manage About, Contact page content',
      icon: FileText,
      href: '/admin/content/pages',
    },
    {
      id: 'site-settings',
      title: 'Site Settings',
      description: 'Logo, Contact Info, Social Media, Footer',
      icon: Settings,
      href: '/admin/content/site-settings',
    },
  ])

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Content Management
              </h1>
              <p className="text-neutral-600">
                Manage all website content from here. A to Z everything can be edited.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <Link
                    key={section.id}
                    href={section.href}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-neutral-200 hover:border-primary-300 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


