'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Users, Star, Search } from 'lucide-react'
import Image from 'next/image'

interface Course {
  id: string
  title: string
  titleBn?: string
  description: string
  thumbnail?: string
  price: number
  duration: number
  courseType: string
  level?: string
  teacher: {
    user: {
      name: string
    }
  }
  enrollments: Array<{ id: string }>
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses?status=published')
      if (response.ok) {
        const data = await response.json()
        setCourses(data.courses || [])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.titleBn?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            All Courses
          </h1>
          <p className="text-xl text-neutral-600">
            Explore our comprehensive course offerings
          </p>
        </motion.div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-48 bg-neutral-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                  <div className="h-4 bg-neutral-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">No courses found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-700">
                  <div className="absolute inset-0 bg-gradient-hero" />
                  {course.level && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-600">
                      {course.level}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary-600 uppercase">
                      {course.courseType}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-1 text-neutral-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration} days</span>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      ৳{Number(course.price).toLocaleString()}
                    </div>
                  </div>

                  <Link
                    href={`/courses/${course.id}`}
                    className="block w-full py-3 bg-primary-600 text-white text-center rounded-lg font-semibold hover:bg-primary-700 transition-colors group/link"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>View Course</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

