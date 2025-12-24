'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProgramFilters, ClassFilter, ProgramTypeFilter, PriceFilter } from './ProgramFilters'
import { ProgramCard } from './ProgramCard'

interface Program {
  id: string
  title: string
  titleBn?: string
  description?: string
  descriptionBn?: string
  thumbnail?: string
  price: number
  priceType: 'PAID' | 'FREE'
  courseType: 'ONLINE' | 'OFFLINE' | 'HYBRID'
  features: string[]
  slug: string
}

export function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState<ClassFilter>('ALL')
  const [selectedProgramType, setSelectedProgramType] = useState<ProgramTypeFilter>('ALL')
  const [selectedPrice, setSelectedPrice] = useState<PriceFilter>('ALL')

  useEffect(() => {
    fetchPrograms()
  }, [selectedClass, selectedProgramType, selectedPrice])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedClass !== 'ALL') params.append('class', selectedClass)
      if (selectedProgramType !== 'ALL') params.append('type', selectedProgramType)
      if (selectedPrice !== 'ALL') params.append('price', selectedPrice)

      const response = await fetch(`/api/programs?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setPrograms(data.programs || [])
      } else {
        console.error('Failed to fetch programs:', response.statusText)
        // Show empty state on error
        setPrograms([])
      }
    } catch (error) {
      console.error('Error fetching programs:', error)
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bengali font-bold text-neutral-900 mb-4">
            সময়োপযোগী প্রোগ্রামসমূহ
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Time-Appropriate Programs
          </p>
        </motion.div>

        {/* Filters */}
        <ProgramFilters
          selectedClass={selectedClass}
          selectedProgramType={selectedProgramType}
          selectedPrice={selectedPrice}
          onClassChange={setSelectedClass}
          onProgramTypeChange={setSelectedProgramType}
          onPriceChange={setSelectedPrice}
        />

        {/* Programs Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-neutral-600">Loading programs...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-neutral-600 mb-4">No programs found</p>
            <p className="text-sm text-neutral-500">
              Please add programs through the admin panel or seed the database.
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              Run: <code className="bg-neutral-100 px-2 py-1 rounded">npm run db:seed</code>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <ProgramCard key={program.id} {...program} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

