'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

// Logo image URL - Update this with your actual logo URL from ImgBB
const LOGO_IMAGE_URL = process.env.NEXT_PUBLIC_LOGO_URL || 'https://i.ibb.co/21wTbXJz/logo.png'

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const [imageError, setImageError] = useState(false)
  
  const sizes = {
    sm: { container: 'w-8 h-8', image: 32 },
    md: { container: 'w-12 h-12', image: 48 },
    lg: { container: 'w-16 h-16', image: 64 },
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  const currentSize = sizes[size]

  return (
    <Link href="/" className={`flex items-center space-x-3 group ${className}`}>
      <div className={`relative ${currentSize.container} flex-shrink-0`}>
        {!imageError && LOGO_IMAGE_URL ? (
          <Image
            src={LOGO_IMAGE_URL}
            alt="The Champions Logo"
            width={currentSize.image}
            height={currentSize.image}
            className="object-contain w-full h-full"
            priority
            onError={() => setImageError(true)}
            unoptimized={LOGO_IMAGE_URL.startsWith('https://i.ibb.co') || LOGO_IMAGE_URL.startsWith('https://ibb.co')}
          />
        ) : (
          // Fallback: Logo with "1", Trophy, and Wings design
          <div className="w-full h-full relative">
            {/* Wings background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative overflow-hidden rounded-lg">
                {/* Colorful wings stripes */}
                <div className="absolute inset-0 flex">
                  <div className="flex-1 bg-gradient-to-b from-blue-500 via-green-500 to-yellow-500 opacity-20"></div>
                  <div className="flex-1 bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 opacity-20"></div>
                </div>
              </div>
            </div>
            
            {/* Main logo content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center bg-primary-600 rounded-lg">
              {/* Red "1" */}
              <div className="text-2xl md:text-3xl font-black text-white leading-none">1</div>
              {/* Trophy icon - simplified */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-3 h-2 bg-accent-500 rounded-sm"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-bold text-primary-600 leading-tight ${textSizes[size]}`}>
            The Champions
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-neutral-600 leading-tight">
              Academic & Admission Care
            </span>
          )}
        </div>
      )}
    </Link>
  )
}

