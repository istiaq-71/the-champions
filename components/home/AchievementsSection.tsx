'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Users, Target } from 'lucide-react'

const achievements = [
  {
    icon: Trophy,
    number: '1800+',
    description: '২০২৪ ঢাবি ক ইউনিটে প্রথম ১০ এ ১০ জনসহ ১৮৯৬ আসনের মধ্যে চান্স',
    descriptionEn: '10 out of top 10 in DU A Unit 2024, 1800+ placements out of 1896 seats',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Award,
    number: '1250+',
    description: '২০২৪ ঢাবি খ ইউনিটে প্রথম ১০ এ ৭ জনসহ ২৯৩৪ আসনের মধ্যে চান্স',
    descriptionEn: '7 out of top 10 in DU B Unit 2024, 1250+ placements out of 2934 seats',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Users,
    number: '50000+',
    description: 'সর্বমোট সফল শিক্ষার্থী',
    descriptionEn: 'Total successful students',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Target,
    number: '95%',
    description: 'সাফল্যের হার',
    descriptionEn: 'Success rate',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
]

export function AchievementsSection() {
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
          <h2 className="text-4xl md:text-5xl font-bengali font-bold text-neutral-900 mb-4">
            আমাদের সাফল্য
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Our Achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex p-4 ${achievement.bgColor} rounded-full mb-4`}>
                  <Icon className={`w-8 h-8 ${achievement.color}`} />
                </div>
                <div className={`text-4xl md:text-5xl font-bold ${achievement.color} mb-4`}>
                  {achievement.number}
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

