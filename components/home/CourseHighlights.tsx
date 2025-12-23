'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Users, Star } from 'lucide-react'
import Image from 'next/image'

// Mock data - will be replaced with real data from API
const courses = [
  {
    id: '1',
    title: 'HSC Preparation',
    titleBn: 'এইচএসসি প্রস্তুতি',
    description: 'Complete HSC preparation with expert guidance and comprehensive study materials.',
    thumbnail: '/images/course-1.jpg',
    price: 5000,
    duration: 180,
    students: 250,
    rating: 4.8,
    level: 'Intermediate',
  },
  {
    id: '2',
    title: 'SSC Preparation',
    titleBn: 'এসএসসি প্রস্তুতি',
    description: 'Master SSC curriculum with structured lessons and practice materials.',
    thumbnail: '/images/course-2.jpg',
    price: 4000,
    duration: 150,
    students: 320,
    rating: 4.9,
    level: 'Beginner',
  },
  {
    id: '3',
    title: 'University Admission Test',
    titleBn: 'বিশ্ববিদ্যালয় ভর্তি পরীক্ষা',
    description: 'Ace your university admission tests with our proven strategies.',
    thumbnail: '/images/course-3.jpg',
    price: 6000,
    duration: 120,
    students: 180,
    rating: 4.7,
    level: 'Advanced',
  },
]

export function CourseHighlights() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Explore our most popular courses and start your journey to success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-700">
                {/* Placeholder for course thumbnail */}
                <div className="absolute inset-0 bg-gradient-hero" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-600">
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 text-accent-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-neutral-500 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
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
                    ৳{course.price.toLocaleString()}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/courses"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

