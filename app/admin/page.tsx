'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Users, BookOpen, DollarSign, TrendingUp, GraduationCap, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface AdminStats {
  totalStudents: number
  totalTeachers: number
  totalCourses: number
  totalRevenue: number
  totalEnrollments: number
  pendingPayments: number
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<AdminStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalEnrollments: 0,
    pendingPayments: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/users?role=STUDENT',
    },
    {
      title: 'Total Teachers',
      value: stats.totalTeachers,
      icon: GraduationCap,
      color: 'bg-green-500',
      link: '/admin/users?role=TEACHER',
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'bg-primary-500',
      link: '/admin/courses',
    },
    {
      title: 'Total Revenue',
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-accent-500',
      link: '/admin/payments',
    },
    {
      title: 'Total Enrollments',
      value: stats.totalEnrollments,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: CreditCard,
      color: 'bg-orange-500',
      link: '/admin/payments?status=PENDING',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-neutral-600">Welcome, {session?.user?.name}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-neutral-200 rounded w-1/2 mb-4" />
              <div className="h-8 bg-neutral-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-neutral-600 mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
              </motion.div>
            )

            return stat.link ? (
              <Link key={stat.title} href={stat.link}>
                {CardContent}
              </Link>
            ) : (
              <div key={stat.title}>{CardContent}</div>
            )
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-neutral-900">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            <div className="text-center py-8 text-neutral-500">
              <p>No recent activity</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/users/new"
              className="block p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Add New User</div>
                  <div className="text-sm text-neutral-600">Create a new student or teacher account</div>
                </div>
              </div>
            </Link>
            <Link
              href="/admin/courses/new"
              className="block p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Create Course</div>
                  <div className="text-sm text-neutral-600">Add a new course to the platform</div>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

