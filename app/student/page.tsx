'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { BookOpen, Clock, TrendingUp, DollarSign, Calendar, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface DashboardStats {
  enrolledCourses: number
  completedCourses: number
  totalPayments: number
  upcomingClasses: number
  averageProgress: number
  assignmentsDue: number
}

export default function StudentDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    enrolledCourses: 0,
    completedCourses: 0,
    totalPayments: 0,
    upcomingClasses: 0,
    averageProgress: 0,
    assignmentsDue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/student/dashboard')
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
      title: 'Enrolled Courses',
      value: stats.enrolledCourses,
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/student/courses',
    },
    {
      title: 'Average Progress',
      value: `${stats.averageProgress}%`,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Total Payments',
      value: `৳${stats.totalPayments.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-primary-500',
      link: '/student/payments',
    },
    {
      title: 'Assignments Due',
      value: stats.assignmentsDue,
      icon: Calendar,
      color: 'bg-accent-500',
      link: '/student/assignments',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-neutral-600">Here's your learning progress overview</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-neutral-200 rounded w-1/2 mb-4" />
              <div className="h-8 bg-neutral-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Recent Courses</h2>
          <div className="space-y-4">
            <div className="text-center py-8 text-neutral-500">
              <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No courses yet. <Link href="/courses" className="text-primary-600 hover:underline">Browse courses</Link></p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Upcoming Assignments</h2>
          <div className="space-y-4">
            <div className="text-center py-8 text-neutral-500">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No upcoming assignments</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

