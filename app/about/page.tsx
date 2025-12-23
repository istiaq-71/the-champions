import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { Target, Award, Users, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            About The Champions
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Empowering students to achieve their dreams through world-class education
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-neutral-900">Our Mission</h2>
            <p className="text-neutral-700 leading-relaxed text-lg">
              The Champions is dedicated to providing world-class academic and admission care 
              to students who aspire to become leaders in their fields. We believe that every 
              student has the potential to achieve greatness, and we're here to guide them 
              every step of the way.
            </p>
            <p className="text-neutral-700 leading-relaxed text-lg">
              Our comprehensive approach combines expert teaching, modern learning resources, 
              and personalized support to ensure that each student reaches their full potential.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-neutral-900">Our Values</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Target className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Excellence</h3>
                  <p className="text-neutral-600">We strive for excellence in everything we do.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Heart className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Dedication</h3>
                  <p className="text-neutral-600">We're committed to our students' success.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Community</h3>
                  <p className="text-neutral-600">Building a supportive learning community.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Award className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Achievement</h3>
                  <p className="text-neutral-600">Celebrating every student's achievements.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Start your journey to becoming a champion. We're here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/courses"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              Browse Courses
            </a>
            <a
              href="/auth/signup"
              className="px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Sign Up
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

