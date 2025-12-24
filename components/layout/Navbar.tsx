'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, BookOpen, GraduationCap, Settings, ChevronDown, Phone } from 'lucide-react'
import { Logo } from '@/components/Logo'

export function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const userLinks = session?.user?.role === 'ADMIN' 
    ? [{ href: '/admin', label: 'Admin Dashboard', icon: Settings }]
    : session?.user?.role === 'TEACHER'
    ? [{ href: '/teacher', label: 'Teacher Dashboard', icon: GraduationCap }]
    : [{ href: '/student', label: 'Student Dashboard', icon: BookOpen }]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo size="md" showText={true} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Home
            </Link>
            
            {/* Programs Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setProgramsDropdownOpen(true)}
                onMouseLeave={() => setProgramsDropdownOpen(false)}
                className="flex items-center space-x-1 text-neutral-700 hover:text-primary-600 transition-colors font-medium"
              >
                <span>প্রোগ্রামসমূহ</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${programsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {programsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => setProgramsDropdownOpen(true)}
                  onMouseLeave={() => setProgramsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 z-50"
                >
                  <Link
                    href="/courses?class=FIVE"
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Class Five (পঞ্চম শ্রেণী)
                  </Link>
                  <Link
                    href="/courses?class=SIX"
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Class Six (ষষ্ঠ শ্রেণী)
                  </Link>
                  <Link
                    href="/courses?class=SEVEN"
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Class Seven (সপ্তম শ্রেণী)
                  </Link>
                  <Link
                    href="/courses?class=EIGHT"
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Class Eight (অষ্টম শ্রেণী)
                  </Link>
                  <Link
                    href="/courses?class=NINE"
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Class Nine (নবম শ্রেণী)
                  </Link>
                  <Link
                    href="/courses?class=TEN"
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Class Ten (দশম শ্রেণী)
                  </Link>
                  <Link
                    href="/courses?class=ELEVEN"
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Class Eleven (একাদশ শ্রেণী)
                  </Link>
                  <Link
                    href="/courses?class=TWELVE"
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Class Twelve (দ্বাদশ শ্রেণী)
                  </Link>
                  <div className="border-t border-neutral-200 my-2" />
                  <Link
                    href="/courses?class=MODEL_TEST"
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Model Test (মডেল টেস্ট)
                  </Link>
                  <Link
                    href="/courses?class=ADMISSION"
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Admission (ভর্তি)
                  </Link>
                  <div className="border-t border-neutral-200 my-2" />
                  <Link
                    href="/courses"
                    className="block px-4 py-2 text-primary-600 hover:bg-primary-50 font-semibold transition-colors"
                  >
                    View All Programs
                  </Link>
                </motion.div>
              )}
            </div>

            <Link href="/branches" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              শাখাসমূহ
            </Link>
            <Link href="/about" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Contact
            </Link>
            
            {/* Contact Number */}
            <a
              href="tel:+8801234567890"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>09666775566</span>
            </a>

            {session ? (
              <div className="flex items-center space-x-4">
                {userLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-700 font-medium">{session.user.name}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-200 bg-white"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="block text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/about"
                className="block text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {session ? (
                <>
                  {userLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{link.label}</span>
                      </Link>
                    )
                  })}
                  <div className="flex items-center space-x-2 pt-2 border-t border-neutral-200">
                    <User className="w-5 h-5 text-neutral-500" />
                    <span className="text-neutral-700 font-medium">{session.user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      handleSignOut()
                    }}
                    className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="block text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

