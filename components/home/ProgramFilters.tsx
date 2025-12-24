'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type ClassFilter = 'ALL' | 'FIVE' | 'SIX' | 'SEVEN' | 'EIGHT' | 'NINE' | 'TEN' | 'ELEVEN' | 'TWELVE' | 'MODEL_TEST' | 'ADMISSION'
export type ProgramTypeFilter = 'ALL' | 'ONLINE' | 'OFFLINE'
export type PriceFilter = 'ALL' | 'PAID' | 'FREE'

interface ProgramFiltersProps {
  selectedClass: ClassFilter
  selectedProgramType: ProgramTypeFilter
  selectedPrice: PriceFilter
  onClassChange: (value: ClassFilter) => void
  onProgramTypeChange: (value: ProgramTypeFilter) => void
  onPriceChange: (value: PriceFilter) => void
}

const classOptions: { value: ClassFilter; label: string; labelBn: string }[] = [
  { value: 'ALL', label: 'All Classes', labelBn: 'সকল ক্লাস' },
  { value: 'FIVE', label: 'Class Five', labelBn: 'পঞ্চম শ্রেণী' },
  { value: 'SIX', label: 'Class Six', labelBn: 'ষষ্ঠ শ্রেণী' },
  { value: 'SEVEN', label: 'Class Seven', labelBn: 'সপ্তম শ্রেণী' },
  { value: 'EIGHT', label: 'Class Eight', labelBn: 'অষ্টম শ্রেণী' },
  { value: 'NINE', label: 'Class Nine', labelBn: 'নবম শ্রেণী' },
  { value: 'TEN', label: 'Class Ten', labelBn: 'দশম শ্রেণী' },
  { value: 'ELEVEN', label: 'Class Eleven', labelBn: 'একাদশ শ্রেণী' },
  { value: 'TWELVE', label: 'Class Twelve', labelBn: 'দ্বাদশ শ্রেণী' },
  { value: 'MODEL_TEST', label: 'Model Test', labelBn: 'মডেল টেস্ট' },
  { value: 'ADMISSION', label: 'Admission', labelBn: 'ভর্তি' },
]

const programTypeOptions: { value: ProgramTypeFilter; label: string; labelBn: string }[] = [
  { value: 'ALL', label: 'All Programs', labelBn: 'সকল প্রোগ্রাম' },
  { value: 'ONLINE', label: 'Online', labelBn: 'অনলাইন' },
  { value: 'OFFLINE', label: 'Offline', labelBn: 'অফলাইন' },
]

const priceOptions: { value: PriceFilter; label: string; labelBn: string }[] = [
  { value: 'ALL', label: 'All', labelBn: 'সকল' },
  { value: 'PAID', label: 'Paid', labelBn: 'পেইড' },
  { value: 'FREE', label: 'Free', labelBn: 'ফ্রি' },
]

export function ProgramFilters({
  selectedClass,
  selectedProgramType,
  selectedPrice,
  onClassChange,
  onProgramTypeChange,
  onPriceChange,
}: ProgramFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Class Filter */}
        <div className="relative">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            ক্লাস / Class
          </label>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'class' ? null : 'class')}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:border-primary-500 transition-colors flex items-center justify-between"
            >
              <span className="text-neutral-900">
                {classOptions.find(opt => opt.value === selectedClass)?.labelBn || 'সকল ক্লাস'}
              </span>
              <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform ${openDropdown === 'class' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'class' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                {classOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onClassChange(option.value)
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors ${
                      selectedClass === option.value ? 'bg-primary-100 text-primary-600 font-semibold' : 'text-neutral-700'
                    }`}
                  >
                    {option.labelBn}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Program Type Filter */}
        <div className="relative">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            প্রোগ্রাম টাইপ / Program Type
          </label>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:border-primary-500 transition-colors flex items-center justify-between"
            >
              <span className="text-neutral-900">
                {programTypeOptions.find(opt => opt.value === selectedProgramType)?.labelBn || 'সকল প্রোগ্রাম'}
              </span>
              <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform ${openDropdown === 'type' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'type' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg"
              >
                {programTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onProgramTypeChange(option.value)
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors ${
                      selectedProgramType === option.value ? 'bg-primary-100 text-primary-600 font-semibold' : 'text-neutral-700'
                    }`}
                  >
                    {option.labelBn}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Price Filter */}
        <div className="relative">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            প্রাইস / Price
          </label>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:border-primary-500 transition-colors flex items-center justify-between"
            >
              <span className="text-neutral-900">
                {priceOptions.find(opt => opt.value === selectedPrice)?.labelBn || 'সকল'}
              </span>
              <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'price' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg"
              >
                {priceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onPriceChange(option.value)
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors ${
                      selectedPrice === option.value ? 'bg-primary-100 text-primary-600 font-semibold' : 'text-neutral-700'
                    }`}
                  >
                    {option.labelBn}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  )
}

