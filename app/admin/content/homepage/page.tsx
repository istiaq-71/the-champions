'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { ArrowLeft, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function HomepageContentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Hero Section
  const [heroTitle, setHeroTitle] = useState('')
  const [heroTitleBn, setHeroTitleBn] = useState('')
  const [heroDescription, setHeroDescription] = useState('')
  
  // Features Section
  const [featuresTitle, setFeaturesTitle] = useState('')
  const [featuresDescription, setFeaturesDescription] = useState('')
  const [features, setFeatures] = useState<any[]>([])
  
  // CTA Section
  const [ctaTitle, setCtaTitle] = useState('')
  const [ctaDescription, setCtaDescription] = useState('')
  const [ctaButtonText, setCtaButtonText] = useState('')
  const [ctaPhone, setCtaPhone] = useState('')
  const [ctaEmail, setCtaEmail] = useState('')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/site-settings')
      if (response.ok) {
        const data = await response.json()
        const settings = data.settings || {}
        
        // Load homepage settings
        if (settings['homepage:hero']) {
          const hero = settings['homepage:hero']
          setHeroTitle(hero.title || '')
          setHeroTitleBn(hero.titleBn || '')
          setHeroDescription(hero.description || '')
        }
        
        if (settings['homepage:features']) {
          const feat = settings['homepage:features']
          setFeaturesTitle(feat.title || '')
          setFeaturesDescription(feat.description || '')
          setFeatures(feat.items || [])
        }
        
        if (settings['homepage:cta']) {
          const cta = settings['homepage:cta']
          setCtaTitle(cta.title || '')
          setCtaDescription(cta.description || '')
          setCtaButtonText(cta.buttonText || '')
          setCtaPhone(cta.phone || '')
          setCtaEmail(cta.email || '')
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error)
      toast.error('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const settings = {
        'homepage:hero': {
          title: heroTitle,
          titleBn: heroTitleBn,
          description: heroDescription,
        },
        'homepage:features': {
          title: featuresTitle,
          description: featuresDescription,
          items: features,
        },
        'homepage:cta': {
          title: ctaTitle,
          description: ctaDescription,
          buttonText: ctaButtonText,
          phone: ctaPhone,
          email: ctaEmail,
        },
      }

      const response = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })

      if (response.ok) {
        toast.success('Homepage content saved successfully!')
      } else {
        toast.error('Failed to save content')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      toast.error('Failed to save content')
    } finally {
      setSaving(false)
    }
  }

  const addFeature = () => {
    setFeatures([...features, { title: '', description: '', icon: 'BookOpen' }])
  }

  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...features]
    updated[index][field] = value
    setFeatures(updated)
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <button
                  onClick={() => router.back()}
                  className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <h1 className="text-3xl font-bold text-neutral-900">
                  Homepage Content Management
                </h1>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>{saving ? 'Saving...' : 'Save All'}</span>
              </button>
            </div>

            {/* Hero Section */}
            <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Hero Section
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Title (Bengali)
                  </label>
                  <input
                    type="text"
                    value={heroTitleBn}
                    onChange={(e) => setHeroTitleBn(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="শিরোনাম লিখুন"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter description"
                  />
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Features Section
                </h2>
                <button
                  onClick={addFeature}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
                >
                  Add Feature
                </button>
              </div>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={featuresTitle}
                    onChange={(e) => setFeaturesTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Why Choose The Champions?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Section Description
                  </label>
                  <textarea
                    value={featuresDescription}
                    onChange={(e) => setFeaturesDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-medium text-neutral-700">
                        Feature {index + 1}
                      </span>
                      <button
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={feature.title || ''}
                        onChange={(e) => updateFeature(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                        placeholder="Feature title"
                      />
                      <textarea
                        value={feature.description || ''}
                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                        placeholder="Feature description"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Call to Action Section
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={ctaTitle}
                    onChange={(e) => setCtaTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Ready to Become a Champion?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={ctaDescription}
                    onChange={(e) => setCtaDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={ctaButtonText}
                    onChange={(e) => setCtaButtonText(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Get Started Now"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={ctaPhone}
                      onChange={(e) => setCtaPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="+880 1234 567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={ctaEmail}
                      onChange={(e) => setCtaEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="info@thechampions.edu"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}


