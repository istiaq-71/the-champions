'use client'

import { motion } from 'framer-motion'
import { 
  Monitor, 
  Users, 
  BookOpen, 
  Lightbulb, 
  ClipboardCheck, 
  MessageCircle, 
  Bell, 
  BarChart3 
} from 'lucide-react'

const services = [
  {
    icon: Monitor,
    title: 'অফলাইন/অনলাইন প্রোগ্রাম',
    titleEn: 'Offline/Online Programs',
    description: 'Choose between offline and online learning options',
  },
  {
    icon: Users,
    title: 'মেধাবী ও অভিজ্ঞ শিক্ষক',
    titleEn: 'Talented & Experienced Teachers',
    description: 'Learn from the best educators in the field',
  },
  {
    icon: BookOpen,
    title: 'মানসম্মত স্টাডি ম্যাটেরিয়ালস',
    titleEn: 'Quality Study Materials',
    description: 'Comprehensive and high-quality study resources',
  },
  {
    icon: Lightbulb,
    title: 'কনসেপ্ট বেইজড ক্লাস',
    titleEn: 'Concept-Based Classes',
    description: 'Focus on understanding concepts deeply',
  },
  {
    icon: ClipboardCheck,
    title: 'ইউনিক এক্সাম সিস্টেম',
    titleEn: 'Unique Exam System',
    description: 'Comprehensive testing and evaluation system',
  },
  {
    icon: MessageCircle,
    title: 'সার্বক্ষণিক Q&A সেবা',
    titleEn: '24/7 Q&A Service',
    description: 'Get your questions answered anytime',
  },
  {
    icon: Bell,
    title: 'Auto SMS রেজাল্ট',
    titleEn: 'Auto SMS Results',
    description: 'Receive exam results via SMS automatically',
  },
  {
    icon: BarChart3,
    title: 'এক্সাম এনালাইসিস রিপোর্ট',
    titleEn: 'Exam Analysis Report',
    description: 'Detailed performance analysis and reports',
  },
]

export function ServicesSection() {
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
          <h2 className="text-4xl md:text-5xl font-bengali font-bold text-neutral-900 mb-4">
            অনন্য সব সেবা পরিক্রমা
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Unique Service Portfolio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <div className="inline-flex p-4 bg-primary-50 rounded-full mb-4 group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-bengali font-bold text-neutral-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

