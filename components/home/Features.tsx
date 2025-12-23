'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Award, Clock, Globe, Shield } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Courses',
    description: 'Wide range of courses covering all academic levels and competitive exams.',
  },
  {
    icon: Users,
    title: 'Expert Teachers',
    description: 'Learn from experienced educators who are passionate about your success.',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Join thousands of successful students who achieved their goals with us.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Learn at your own pace with both online and offline options available.',
  },
  {
    icon: Globe,
    title: 'Bilingual Support',
    description: 'Full support in both Bangla and English for your comfort.',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Safe and secure payment system with multiple payment options.',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            Why Choose The Champions?
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            We provide everything you need to achieve academic excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-neutral-50 rounded-2xl hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

