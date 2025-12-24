'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

interface ProgramCardProps {
  id: string
  title: string
  titleBn?: string
  description?: string
  descriptionBn?: string
  thumbnail?: string
  price: number
  priceType: 'PAID' | 'FREE'
  courseType: 'ONLINE' | 'OFFLINE' | 'HYBRID'
  features?: string[]
  slug: string
  index?: number
}

export function ProgramCard({
  id,
  title,
  titleBn,
  description,
  descriptionBn,
  thumbnail,
  price,
  priceType,
  courseType,
  features = [],
  slug,
  index = 0,
}: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-700 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-hero" />
        )}
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {priceType === 'FREE' && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
              Free
            </span>
          )}
          {courseType === 'ONLINE' && (
            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
              Online
            </span>
          )}
          {courseType === 'OFFLINE' && (
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
              Offline
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bengali font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
          {titleBn || title}
        </h3>
        
        {descriptionBn && (
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
            {descriptionBn}
          </p>
        )}

        {/* Features List */}
        {features.length > 0 && (
          <ul className="space-y-2 mb-4">
            {features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-neutral-700">
                <Check className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div>
            {priceType === 'FREE' ? (
              <span className="text-2xl font-bold text-green-600">Free</span>
            ) : (
              <span className="text-2xl font-bold text-primary-600">
                ৳{price.toLocaleString('bn-BD')}
              </span>
            )}
          </div>
          <Link
            href={`/courses/${slug}`}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors group/link"
          >
            <span className="text-sm font-semibold">Details</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

