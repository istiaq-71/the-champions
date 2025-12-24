'use client'

import { motion } from 'framer-motion'
import { MapPin, CheckCircle } from 'lucide-react'

export function BranchesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex p-3 bg-primary-50 rounded-full mb-6">
              <MapPin className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bengali font-bold text-neutral-900 mb-6">
              দেশব্যাপী সকল শাখায় সমান সেবা
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Same Service Across All Branches Nationwide
            </p>
            <p className="text-neutral-700 leading-relaxed mb-6">
              দেশব্যাপী The Champions এর সকল শাখায় সমান সেবা প্রদান করা হয়। অভিন্ন প্রশ্নপত্রে সকল শাখায় পরীক্ষা নেওয়া হয়। সকল উত্তরপত্র মূল্যায়ন করা হয় এক জায়গা থেকে এবং একই Solve Sheet সকল শিক্ষার্থীকে প্রদান করা হয়।
            </p>
            <ul className="space-y-3">
              {[
                'একই টিচার সকল শাখায় ঘুরে ঘুরে ক্লাস নিয়ে থাকেন',
                'অনলাইন Software-এর মাধ্যমে সকল শিক্ষার্থীর মেধাতালিকা প্রণয়ন করা হয়',
                'যেকোনো শাখা থেকে পরীক্ষা দিয়েই দেশব্যাপী সকল শিক্ষার্থীর মধ্যে নিজের অবস্থান জানতে পারা যায়',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-24 h-24 text-primary-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Multiple Locations
                </h3>
                <p className="text-neutral-700">
                  আমাদের শাখাসমূহ দেখুন
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

