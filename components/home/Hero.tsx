'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const heroSlides = [
  {
    title: 'Become a Champion',
    subtitle: 'World-Class Education Platform',
    description: 'Join thousands of students achieving their dreams with our premium coaching programs.',
    image: '/images/hero-1.jpg',
  },
  {
    title: 'Expert Teachers',
    subtitle: 'Learn from the Best',
    description: 'Get guidance from experienced educators dedicated to your success.',
    image: '/images/hero-2.jpg',
  },
  {
    title: 'Flexible Learning',
    subtitle: 'Online & Offline',
    description: 'Choose the learning style that works best for you, anytime, anywhere.',
    image: '/images/hero-3.jpg',
  },
]

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="absolute inset-0 w-full h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-800/90" />
            {/* Placeholder for background image */}
            <div className="absolute inset-0 bg-gradient-hero" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white"
          >
            The Champions
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          >
            Academic and Admission Care
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            World-class education platform for students who want to become champions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/courses"
              className="group px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-neutral-100 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Video</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

