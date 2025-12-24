'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface ProgramFormData {
  title: string
  titleBn: string
  slug: string
  description: string
  descriptionBn: string
  price: number
  priceType: 'PAID' | 'FREE'
  courseType: 'ONLINE' | 'OFFLINE' | 'HYBRID'
  courseClass: string
  features: string[]
  duration: number
  level: string
  status: string
  order: number
  thumbnail: string
  teacherId: string
}

export default function NewProgramPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [teachers, setTeachers] = useState<any[]>([])
  const [newFeature, setNewFeature] = useState('')
  const [formData, setFormData] = useState<ProgramFormData>({
    title: '',
    titleBn: '',
    slug: '',
    description: '',
    descriptionBn: '',
    price: 0,
    priceType: 'PAID',
    courseType: 'ONLINE',
    courseClass: 'OTHER',
    features: [],
    duration: 30,
    level: 'Beginner',
    status: 'draft',
    order: 0,
    thumbnail: '',
    teacherId: '',
  })

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/admin/teachers')
      if (response.ok) {
        const data = await response.json()
        setTeachers(data.teachers || [])
        if (data.teachers.length > 0) {
          setFormData((prev) => ({ ...prev, teacherId: data.teachers[0].id }))
        }
      }
    } catch (error) {
      console.error('Error fetching teachers:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate slug from title if not provided
      const slug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

      const response = await fetch('/api/admin/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          slug,
        }),
      })

      if (response.ok) {
        toast.success('Program created successfully!')
        router.push('/admin/programs')
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to create program')
      }
    } catch (error) {
      console.error('Error creating program:', error)
      toast.error('Error creating program')
    } finally {
      setLoading(false)
    }
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/programs"
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Create New Program</h1>
            <p className="text-neutral-600 mt-1">Add a new program to the platform</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const newTitle = e.target.value
                    setFormData((prev) => ({
                      ...prev,
                      title: newTitle,
                      slug: prev.slug || generateSlug(newTitle),
                    }))
                  }}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Title (Bengali)
                </label>
                <input
                  type="text"
                  value={formData.titleBn}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, titleBn: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="auto-generated-from-title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Course Class *
                </label>
                <select
                  required
                  value={formData.courseClass}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, courseClass: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="FIVE">Class Five (পঞ্চম)</option>
                  <option value="SIX">Class Six (ষষ্ঠ)</option>
                  <option value="SEVEN">Class Seven (সপ্তম)</option>
                  <option value="EIGHT">Class Eight (অষ্টম)</option>
                  <option value="NINE">Class Nine (নবম)</option>
                  <option value="TEN">Class Ten (দশম)</option>
                  <option value="ELEVEN">Class Eleven (একাদশ)</option>
                  <option value="TWELVE">Class Twelve (দ্বাদশ)</option>
                  <option value="MODEL_TEST">Model Test (মডেল টেস্ট)</option>
                  <option value="ADMISSION">Admission (ভর্তি)</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Description (English) *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Description (Bengali)
            </label>
            <textarea
              rows={4}
              value={formData.descriptionBn}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, descriptionBn: e.target.value }))
              }
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Features/Benefits
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addFeature()
                  }
                }}
                placeholder="Add a feature and press Enter"
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 bg-neutral-50 rounded-lg"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Type */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Pricing & Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Price Type *
                </label>
                <select
                  required
                  value={formData.priceType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      priceType: e.target.value as 'PAID' | 'FREE',
                      price: e.target.value === 'FREE' ? 0 : prev.price,
                    }))
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="PAID">Paid</option>
                  <option value="FREE">Free</option>
                </select>
              </div>

              {formData.priceType === 'PAID' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Price (BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Course Type *
                </label>
                <select
                  required
                  value={formData.courseType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      courseType: e.target.value as 'ONLINE' | 'OFFLINE' | 'HYBRID',
                    }))
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="ONLINE">Online</option>
                  <option value="OFFLINE">Offline</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Additional Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Duration (Days) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, duration: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Level
                </label>
                <select
                  value={formData.level}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, level: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, order: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Teacher */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Teacher *
            </label>
            <select
              required
              value={formData.teacherId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, teacherId: e.target.value }))
              }
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Thumbnail URL
            </label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))
              }
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            href="/admin/programs"
            className="px-6 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Creating...' : 'Create Program'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

