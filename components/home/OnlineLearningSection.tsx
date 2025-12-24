'use client'

import { motion } from 'framer-motion'
import { Laptop, Wifi, Book, Users } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function OnlineLearningSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-white rounded-2xl shadow-xl flex items-center justify-center p-8">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-primary-50 rounded-xl p-6 text-center">
                  <Laptop className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <p className="text-sm font-semibold text-neutral-900">Online Platform</p>
                </div>
                <div className="bg-accent-50 rounded-xl p-6 text-center">
                  <Wifi className="w-12 h-12 text-accent-600 mx-auto mb-4" />
                  <p className="text-sm font-semibold text-neutral-900">Live Classes</p>
                </div>
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <Book className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-sm font-semibold text-neutral-900">Study Materials</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-sm font-semibold text-neutral-900">Interactive Learning</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bengali font-bold text-neutral-900 mb-6 leading-tight">
              যেমনই হোক পরিস্থিতি<br />
              থেমে থাকবে না প্রস্তুতি
            </h2>
            <p className="text-xl text-neutral-700 mb-6">
              No Matter the Situation, Preparation Won&apos;t Stop
            </p>
            <p className="text-neutral-700 leading-relaxed mb-8">
              নিজস্ব সফট্ওয়্যার টিমের সার্বক্ষণিক তত্ত্বাবধানে The Champions এর রয়েছে দেশসেরা অনলাইন লার্নিং প্ল্যাটফর্ম। যেকোনো সরকারি বিধি-নিষেধের কারণে শিক্ষা প্রতিষ্ঠান বন্ধ থাকলে সকল কার্যক্রম অনলাইনে চলমান থাকবে। ফলে শিক্ষার্থীদের ধারাবাহিক প্রস্তুতিতে কোনো প্রকার বিঘ্ন ঘটবে না।
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses?type=ONLINE"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors group"
              >
                <span>Explore Online Programs</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-neutral-50 transition-colors border-2 border-primary-600"
              >
                <span>View All Programs</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

