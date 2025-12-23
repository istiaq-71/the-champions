'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Award, Star } from 'lucide-react'
import Image from 'next/image'

// Mock data - will be replaced with real data from API
const teachers = [
  {
    id: '1',
    name: 'Dr. Ahmed Rahman',
    nameBn: 'ড. আহমেদ রহমান',
    qualification: 'PhD in Physics, DU',
    specialization: 'Physics & Mathematics',
    experience: 15,
    students: 500,
    rating: 4.9,
    image: '/images/teacher-1.jpg',
  },
  {
    id: '2',
    name: 'Prof. Fatima Khan',
    nameBn: 'প্রফেসর ফাতিমা খান',
    qualification: 'MSc in Chemistry, BUET',
    specialization: 'Chemistry & Biology',
    experience: 12,
    students: 450,
    rating: 4.8,
    image: '/images/teacher-2.jpg',
  },
  {
    id: '3',
    name: 'Mr. Hasan Ali',
    nameBn: 'মিঃ হাসান আলী',
    qualification: 'MSc in Mathematics, RU',
    specialization: 'Mathematics & Statistics',
    experience: 10,
    students: 380,
    rating: 4.9,
    image: '/images/teacher-3.jpg',
  },
]

export function TeacherShowcase() {
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
            Meet Our Expert Teachers
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Learn from experienced educators dedicated to your success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="relative h-64 bg-gradient-to-br from-primary-500 to-primary-700">
                {/* Placeholder for teacher image */}
                <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center">
                  <GraduationCap className="w-24 h-24 text-white/20" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
                  <span className="text-sm font-semibold text-neutral-900">{teacher.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                  {teacher.name}
                </h3>
                <div className="flex items-center space-x-2 text-neutral-600 mb-4">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">{teacher.qualification}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-neutral-600 text-sm">
                    <Award className="w-4 h-4 text-primary-500" />
                    <span>{teacher.specialization}</span>
                  </div>
                  <div className="text-neutral-600 text-sm">
                    <span className="font-semibold">{teacher.experience}+</span> years of experience
                  </div>
                  <div className="text-neutral-600 text-sm">
                    <span className="font-semibold">{teacher.students}+</span> students taught
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

