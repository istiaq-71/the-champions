'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { ArrowLeft, Save, Upload, Globe, Mail, Phone, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SiteSettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Site Info
  const [siteName, setSiteName] = useState('')
  const [siteLogo, setSiteLogo] = useState('')
  const [favicon, setFavicon] = useState('')
  
  // Contact Info
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [addressBn, setAddressBn] = useState('')
  
  // Social Media
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')
  const [linkedin, setLinkedin] = useState('')
  
  // Footer
  const [footerText, setFooterText] = useState('')
  const [footerTextBn, setFooterTextBn] = useState('')
  const [copyrightText, setCopyrightText] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/site-settings')
      if (response.ok) {
        const data = await response.json()
        const settings = data.settings || {}
        
        if (settings['site:info']) {
          const info = settings['site:info']
          setSiteName(info.name || '')
          setSiteLogo(info.logo || '')
          setFavicon(info.favicon || '')
        }
        
        if (settings['site:contact']) {
          const contact = settings['site:contact']
          setPhone(contact.phone || '')
          setEmail(contact.email || '')
          setAddress(contact.address || '')
          setAddressBn(contact.addressBn || '')
        }
        
        if (settings['site:social']) {
          const social = settings['site:social']
          setFacebook(social.facebook || '')
          setTwitter(social.twitter || '')
          setInstagram(social.instagram || '')
          setYoutube(social.youtube || '')
          setLinkedin(social.linkedin || '')
        }
        
        if (settings['site:footer']) {
          const footer = settings['site:footer']
          setFooterText(footer.text || '')
          setFooterTextBn(footer.textBn || '')
          setCopyrightText(footer.copyright || '')
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const settings = {
        'site:info': {
          name: siteName,
          logo: siteLogo,
          favicon: favicon,
        },
        'site:contact': {
          phone: phone,
          email: email,
          address: address,
          addressBn: addressBn,
        },
        'site:social': {
          facebook: facebook,
          twitter: twitter,
          instagram: instagram,
          youtube: youtube,
          linkedin: linkedin,
        },
        'site:footer': {
          text: footerText,
          textBn: footerTextBn,
          copyright: copyrightText,
        },
      }

      const response = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })

      if (response.ok) {
        toast.success('Site settings saved successfully!')
      } else {
        toast.error('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading settings...</p>
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
                  onClick={() => router.push('/admin/content')}
                  className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <h1 className="text-3xl font-bold text-neutral-900">
                  Site Settings
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

            {/* Site Info */}
            <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Site Information</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="The Champions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    value={siteLogo}
                    onChange={(e) => setSiteLogo(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="text"
                    value={favicon}
                    onChange={(e) => setFavicon(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>
            </section>

            {/* Contact Info */}
            <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Contact Information</span>
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="info@thechampions.edu"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Address (English)
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Address (Bengali)
                  </label>
                  <textarea
                    value={addressBn}
                    onChange={(e) => setAddressBn(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="ঠিকানা লিখুন"
                  />
                </div>
              </div>
            </section>

            {/* Social Media */}
            <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Social Media Links</span>
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Facebook
                    </label>
                    <input
                      type="url"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Footer Content
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Footer Text (English)
                  </label>
                  <textarea
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Footer Text (Bengali)
                  </label>
                  <textarea
                    value={footerTextBn}
                    onChange={(e) => setFooterTextBn(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Copyright Text
                  </label>
                  <input
                    type="text"
                    value={copyrightText}
                    onChange={(e) => setCopyrightText(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="© 2024 The Champions. All rights reserved."
                  />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}


