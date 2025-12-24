import type { Metadata } from 'next'
import { Inter, Playfair_Display, Noto_Sans_Bengali } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali', 'latin'],
  variable: '--font-bengali',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'The Champions - Academic and Admission Care',
  description: 'World-class education platform for students who want to become champions',
  keywords: 'education, coaching, courses, learning, Bangladesh',
  authors: [{ name: 'The Champions' }],
  openGraph: {
    title: 'The Champions - Academic and Admission Care',
    description: 'World-class education platform for students who want to become champions',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'bn_BD',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${playfair.variable} ${notoSansBengali.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

