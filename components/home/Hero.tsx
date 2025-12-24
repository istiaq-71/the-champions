'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Check, Star, Clock } from 'lucide-react'

interface Course {
  id: string
  title: string
  titleBn?: string
  description?: string
  descriptionBn?: string
  thumbnail?: string
  price: number
  priceType: 'PAID' | 'FREE'
  courseType: 'ONLINE' | 'OFFLINE' | 'HYBRID'
  features?: string[]
  slug: string
  duration?: number
  level?: string
}

export function Hero() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/programs?limit=10')
      if (response.ok) {
        const data = await response.json()
        setCourses(data.programs || [])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  // Auto-slide functionality
  useEffect(() => {
    if (courses.length === 0 || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % courses.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [courses.length, isHovered])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % courses.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentCourse = courses[currentIndex] || courses[0]

  // Background gradients that change with course
  const bgGradients = [
    'from-primary-600 via-primary-700 to-primary-800',
    'from-blue-600 via-blue-700 to-blue-800',
    'from-purple-600 via-purple-700 to-purple-800',
    'from-green-600 via-green-700 to-green-800',
    'from-orange-600 via-orange-700 to-orange-800',
  ]
  const currentBg = bgGradients[currentIndex % bgGradients.length]

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
          <p className="mt-4 text-white text-xl">Loading courses...</p>
        </div>
      </section>
    )
  }

  if (courses.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bengali font-bold mb-4">
            The Champions
          </h1>
          <p className="text-xl md:text-2xl mb-8">Academic & Admission Care</p>
          <Link
            href="/courses"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-neutral-100 transition-all transform hover:scale-105 shadow-xl"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${currentBg}`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 80, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-white/3 rounded-full blur-3xl"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Text Content - Centered */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-white space-y-6 text-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full"
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">Featured Program</span>
              </motion.div>

              {/* Main Heading - Bengali */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bengali font-bold leading-tight"
              >
                {currentCourse.titleBn || currentCourse.title}
              </motion.h1>

              {/* English Title */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-white/90 font-medium"
              >
                {currentCourse.title}
              </motion.p>

              {/* Description */}
              {(currentCourse.descriptionBn || currentCourse.description) && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto px-4"
                >
                  {currentCourse.descriptionBn || currentCourse.description}
                </motion.p>
              )}

              {/* Features */}
              {currentCourse.features && currentCourse.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2 flex flex-wrap justify-center gap-4"
                >
                  {currentCourse.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Check className="w-4 h-4 text-white flex-shrink-0" />
                      <span className="text-white/90 text-sm">{feature}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Course Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-6"
              >
                {currentCourse.duration && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-white/80" />
                    <span className="text-white/90">{currentCourse.duration} hours</span>
                  </div>
                )}
                {currentCourse.level && (
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-white/80" />
                    <span className="text-white/90">{currentCourse.level}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentCourse.courseType === 'ONLINE' 
                      ? 'bg-blue-500 text-white'
                      : currentCourse.courseType === 'OFFLINE'
                      ? 'bg-orange-500 text-white'
                      : 'bg-purple-500 text-white'
                  }`}>
                    {currentCourse.courseType}
                  </span>
                </div>
              </motion.div>

              {/* Price and CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
              >
                <div>
                  {currentCourse.priceType === 'FREE' ? (
                    <div className="text-4xl font-bold text-white">Free</div>
                  ) : (
                    <div className="text-4xl font-bold text-white">
                      ৳{currentCourse.price.toLocaleString('bn-BD')}
                    </div>
                  )}
                  <div className="text-white/70 text-sm">Full Course Access</div>
                </div>
                <Link
                  href={`/courses/${currentCourse.slug}`}
                  className="group inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-neutral-100 transition-all transform hover:scale-105 shadow-xl"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows - Positioned far from content */}
        {courses.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white/30 transition-all text-white hover:scale-110"
              aria-label="Previous course"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white/30 transition-all text-white hover:scale-110"
              aria-label="Next course"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {courses.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {courses.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-8 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 text-white/70"
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <ChevronRight className="w-5 h-5 rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
