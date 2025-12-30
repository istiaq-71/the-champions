'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    titleBn: 'সময়োপযোগী প্রোগ্রামসমূহ',
    titleEn: 'Time-Appropriate Programs',
    description: 'The Champions - Academic & Admission Care',
    bgClass: 'bg-gradient-to-br from-primary-600 to-primary-800',
  },
  {
    id: 2,
    titleBn: 'মেধাবী শিক্ষকদের সাথে',
    titleEn: 'Expert Teachers & Guidance',
    description: 'Learn from the best educators in Bangladesh',
    bgClass: 'bg-gradient-to-br from-blue-600 to-blue-800',
  },
  {
    id: 3,
    titleBn: 'অনলাইন ও অফলাইন',
    titleEn: 'Online & Offline Classes',
    description: 'Flexible learning options for every student',
    bgClass: 'bg-gradient-to-br from-green-600 to-green-800',
  },
] as const

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Animated Background with Slides */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className={`absolute inset-0 ${currentSlideData.bgClass}`}
          >
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
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
                className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-accent-400/10 rounded-full blur-3xl"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center min-h-[70vh]">
          {/* Left Side - Image/Visual Area (60%) */}
          <div className="lg:col-span-3 relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Placeholder for images - you can add actual images here */}
                <div className="w-full h-full flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl">
                  <div className="text-center p-8">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md"
                    >
                      <span className="text-6xl font-bold text-white">1</span>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/90 text-lg"
                    >
                      Premium Education Platform
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Text Content (40%) */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Main Bengali Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bengali font-bold text-primary-600 leading-tight"
                >
                  {currentSlideData.titleBn}
                </motion.h1>
                
                {/* English Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl text-neutral-700 font-medium"
                >
                  {currentSlideData.titleEn}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-lg text-neutral-600 leading-relaxed"
                >
                  {currentSlideData.description}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
                >
                  <Link
                    href="/courses"
                    className="group inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>Explore Courses</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="inline-flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                      <Play className="w-5 h-5 ml-1 text-neutral-600 group-hover:text-primary-600" />
                    </div>
                    <span className="font-medium">Watch Video</span>
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white transition-colors text-neutral-700 hover:text-primary-600"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white transition-colors text-neutral-700 hover:text-primary-600"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

