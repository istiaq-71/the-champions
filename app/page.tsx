import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { CourseHighlights } from '@/components/home/CourseHighlights'
import { TeacherShowcase } from '@/components/home/TeacherShowcase'
import { Testimonials } from '@/components/home/Testimonials'
import { CTA } from '@/components/home/CTA'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <CourseHighlights />
      <TeacherShowcase />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}

