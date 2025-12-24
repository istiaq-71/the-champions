'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { Clock, Users, GraduationCap, Check, ArrowRight, BookOpen } from 'lucide-react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  titleBn?: string
  description: string
  descriptionBn?: string
  thumbnail?: string
  price: number
  duration: number
  courseType: string
  level?: string
  teacher: {
    user: {
      name: string
      image?: string
    }
  }
  content: Array<{
    id: string
    title: string
    type: string
    order: number
  }>
}

export default function CourseDetailPage() {
  const params = useParams()
  const { data: session } = useSession()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  const fetchCourse = useCallback(async () => {
    if (!params.id) return
    
    try {
      const response = await fetch(`/api/courses/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setCourse(data)
      } else {
        toast.error('Course not found')
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      toast.error('Failed to load course')
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchCourse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCourse])

  const handleEnroll = async () => {
    if (!session) {
      toast.error('Please sign in to enroll')
      return
    }

    setEnrolling(true)
    try {
      const response = await fetch('/api/enrollments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course?.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || 'Failed to enroll')
        return
      }

      toast.success('Successfully enrolled!')
      // Redirect to student dashboard or course page
    } catch (error) {
      toast.error('Failed to enroll')
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-neutral-200 rounded w-3/4" />
            <div className="h-64 bg-neutral-200 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Course not found</h1>
          <Link href="/courses" className="text-primary-600 hover:underline">
            Browse all courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
                {course.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-neutral-600 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration} days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.content.length} lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>{course.teacher.user.name}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">About This Course</h2>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.content.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-lg hover:border-primary-500 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                      <p className="text-sm text-neutral-600 capitalize">{item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24 bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  ৳{Number(course.price).toLocaleString()}
                </div>
                <p className="text-neutral-600">One-time payment</p>
              </div>

              <button
                onClick={handleEnroll}
                disabled={enrolling || !session}
                className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center space-x-2"
              >
                {enrolling ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enroll Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {!session && (
                <Link
                  href="/auth/signin"
                  className="block w-full py-3 text-center border border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Sign In to Enroll
                </Link>
              )}

              <div className="mt-6 space-y-4 pt-6 border-t border-neutral-200">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Lifetime access</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Certificate of completion</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Expert instructor support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

