'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, Mail } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Become a Champion?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students and start your journey to academic excellence today
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/auth/signup"
              className="group px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-neutral-100 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/courses"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Browse Courses
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
            <a
              href="tel:+8801234567890"
              className="flex items-center space-x-2 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>+880 1234 567890</span>
            </a>
            <a
              href="mailto:info@thechampions.edu"
              className="flex items-center space-x-2 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>info@thechampions.edu</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

